import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

function loadLocalEnv() {
  const envFile = join(root, ".env");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!match || match[1] in process.env) continue;
    process.env[match[1]] = match[2].replace(/^['\"]|['\"]$/g, "");
  }
}

loadLocalEnv();
const port = Number(process.env.PORT || 4173);
const ttl = Number(process.env.CATALOG_CACHE_TTL_MS || 300000);
const cache = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

function clamp(value, minimum, maximum, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.floor(parsed), minimum), maximum);
}

function classifyProduct(title = "") {
  const text = title.toLocaleLowerCase("pt-BR");
  if (/(notebook|celular|iphone|smartphone|fone|headphone|monitor|smartwatch|tv |tablet|teclado|mouse)/.test(text)) return "Tecnologia";
  if (/(air fryer|cafeteira|aspirador|liquidificador|panela|cozinha|cama|mesa|sofá|geladeira)/.test(text)) return "Casa";
  if (/(tênis|tenis|camiseta|bolsa|mochila|perfume|maquiagem|skincare|vestido)/.test(text)) return "Moda";
  if (/(bike|bicicleta|halter|corrida|futebol|academia|esporte)/.test(text)) return "Esporte";
  if (/(playstation|xbox|nintendo|switch|gamer|jogo|console)/.test(text)) return "Games";
  if (/(café|azeite|arroz|vinho|cerveja|chocolate|mercado)/.test(text)) return "Mercado";
  return "Outros";
}

function normalizeMeliItem(item, index) {
  const price = Number(item.price) || 0;
  const oldPrice = Number(item.original_price) || price;
  const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;
  const freeShipping = Boolean(item.shipping?.free_shipping);
  return {
    id: `meli-${item.id}`,
    name: item.title,
    category: classifyProduct(item.title),
    store: "Mercado Livre",
    price,
    oldPrice,
    discount,
    badge: freeShipping ? "FRETE GRÁTIS" : "AO VIVO",
    badgeClass: freeShipping ? "price-low" : "coupon",
    image: String(item.thumbnail || "").replace(/^http:/, "https:"),
    delivery: freeShipping ? "Frete grátis" : "Consulte o envio",
    tags: freeShipping ? ["frete"] : [],
    timing: -index,
    url: item.permalink,
    live: true,
    updatedAt: new Date().toISOString(),
  };
}

async function getMercadoLivreCatalog({ query, limit, offset }) {
  const url = new URL("https://api.mercadolibre.com/sites/MLB/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Mercado Livre respondeu ${response.status}`);
  const payload = await response.json();
  return {
    source: "mercadolivre",
    items: (payload.results || []).map(normalizeMeliItem),
    paging: {
      offset,
      limit,
      total: Number(payload.paging?.total) || 0,
      nextOffset: offset + limit < (Number(payload.paging?.total) || 0) ? offset + limit : null,
    },
    updatedAt: new Date().toISOString(),
  };
}

async function getAmazonCatalog({ query, limit, offset }) {
  const endpoint = process.env.AMAZON_CREATORS_PROXY_URL;
  if (!endpoint) {
    return {
      source: "amazon",
      items: [],
      paging: { offset, limit, total: 0, nextOffset: null },
      updatedAt: new Date().toISOString(),
      connector: {
        available: false,
        message: "Conector Amazon ainda não foi configurado no servidor.",
      },
    };
  }

  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  const headers = { Accept: "application/json" };
  if (process.env.AMAZON_CREATORS_PROXY_TOKEN) {
    headers.Authorization = `Bearer ${process.env.AMAZON_CREATORS_PROXY_TOKEN}`;
  }
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`Conector Amazon respondeu ${response.status}`);
  const payload = await response.json();
  return {
    source: "amazon",
    items: Array.isArray(payload.items) ? payload.items : [],
    paging: payload.paging || { offset, limit, total: 0, nextOffset: null },
    updatedAt: payload.updatedAt || new Date().toISOString(),
    connector: { available: true },
  };
}

async function fromCache(key, request) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.savedAt < ttl) return entry.value;
  const value = await request();
  cache.set(key, { savedAt: Date.now(), value });
  return value;
}

async function catalogHandler(requestUrl, response) {
  const source = requestUrl.searchParams.get("source") || "all";
  const query = (requestUrl.searchParams.get("q") || "ofertas").trim().slice(0, 120);
  const limit = clamp(requestUrl.searchParams.get("limit"), 1, 50, 24);
  const offset = clamp(requestUrl.searchParams.get("offset"), 0, 1000, 0);

  if (!/[a-záàâãéêíóôõúüç0-9\s\-]+/i.test(query)) {
    return sendJson(response, 400, { error: "Consulta inválida." });
  }
  if (!["all", "mercadolivre", "amazon"].includes(source)) {
    return sendJson(response, 400, { error: "Fonte inválida." });
  }

  const calls = [];
  if (source === "all" || source === "mercadolivre") {
    calls.push(fromCache(`meli:${query}:${limit}:${offset}`, () => getMercadoLivreCatalog({ query, limit, offset })));
  }
  if (source === "all" || source === "amazon") {
    calls.push(fromCache(`amazon:${query}:${limit}:${offset}`, () => getAmazonCatalog({ query, limit, offset })));
  }

  const settled = await Promise.allSettled(calls);
  const catalogs = settled.filter((result) => result.status === "fulfilled").map((result) => result.value);
  const failures = settled.filter((result) => result.status === "rejected").map((result) => result.reason?.message || "Fonte indisponível");
  const items = catalogs.flatMap((catalog) => catalog.items);
  const connectors = catalogs.map((catalog) => ({ source: catalog.source, ...(catalog.connector || { available: true }) }));

  if (!catalogs.length) {
    return sendJson(response, 502, { error: "Nenhuma fonte respondeu agora.", details: failures });
  }

  sendJson(response, 200, {
    items,
    paging: catalogs[0]?.paging || { offset, limit, total: items.length, nextOffset: null },
    connectors,
    partial: failures.length > 0,
    details: failures,
    updatedAt: new Date().toISOString(),
  });
}

async function staticHandler(pathname, response) {
  const requested = pathname === "/" ? "/index.html" : decodeURIComponent(pathname);
  const safePath = normalize(requested).replace(/^([/\\])+/, "");
  const filePath = join(root, safePath);
  if (!filePath.startsWith(root)) return sendJson(response, 403, { error: "Acesso negado." });

  try {
    const file = await readFile(filePath);
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo não encontrado.");
  }
}

createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (request.method === "GET" && requestUrl.pathname === "/api/catalog") {
      await catalogHandler(requestUrl, response);
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      sendJson(response, 405, { error: "Método não permitido." });
      return;
    }
    await staticHandler(requestUrl.pathname, response);
  } catch (error) {
    sendJson(response, 500, { error: "Erro inesperado no servidor de catálogo.", details: error.message });
  }
}).listen(port, "0.0.0.0", () => {
  console.log(`Mavvri disponível em http://0.0.0.0:${port}`);
});
