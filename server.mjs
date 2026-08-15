import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { getSourceDefinitions, sourceKeys } from "./catalog-providers.mjs";
import { querySnapshot, readSnapshot, syncCatalog } from "./catalog-store.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));

function loadLocalEnv() {
  const envFile = join(root, ".env");
  if (!existsSync(envFile)) return;
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!match || match[1] in process.env) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

loadLocalEnv();
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
};

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  response.end(JSON.stringify(body));
}

function clamp(value, minimum, maximum, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.floor(parsed), minimum), maximum);
}

async function catalogHandler(requestUrl, response) {
  const source = requestUrl.searchParams.get("source") || "all";
  const query = (requestUrl.searchParams.get("q") || "").trim().slice(0, 120);
  const limit = clamp(requestUrl.searchParams.get("limit"), 1, 50, 24);
  const offset = clamp(requestUrl.searchParams.get("offset"), 0, 100000, 0);
  if (!/[a-záàâãéêíóôõúüç0-9\s\-]+/i.test(query || "ofertas") || !["all", ...sourceKeys].includes(source)) {
    return sendJson(response, 400, { error: "Consulta ou fonte inválida." });
  }

  const snapshot = await readSnapshot();
  const result = querySnapshot(snapshot, { source, query, limit, offset });
  const sourceStatus = snapshot.sources.length ? snapshot.sources : getSourceDefinitions();
  const hasSnapshot = Boolean(snapshot.updatedAt);
  const noWorkingSource = !snapshot.offers.length && sourceStatus.every((item) => item.error || !item.configured);
  const available = hasSnapshot && !noWorkingSource;
  sendJson(response, available ? 200 : 503, {
    ...result,
    sources: sourceStatus,
    updatedAt: snapshot.updatedAt,
    error: available ? undefined : "Nenhuma fonte autorizada está sincronizada. Execute npm run sync em um ambiente com acesso às APIs e conectores configurados.",
  });
}

async function syncHandler(request, requestUrl, response) {
  const requiredSecret = process.env.SYNC_SECRET;
  const provided = request.headers.authorization?.replace(/^Bearer\s+/i, "") || requestUrl.searchParams.get("token");
  if (!requiredSecret || provided !== requiredSecret) return sendJson(response, 401, { error: "Não autorizado." });
  const requested = requestUrl.searchParams.get("sources");
  const sources = requested ? requested.split(",").filter((source) => sourceKeys.includes(source)) : sourceKeys;
  const snapshot = await syncCatalog({ sources: sources.length ? sources : sourceKeys });
  sendJson(response, 200, { updatedAt: snapshot.updatedAt, offers: snapshot.offers.length, sources: snapshot.sources });
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
    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream", "Cache-Control": extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600", "X-Content-Type-Options": "nosniff" });
    response.end(file);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo não encontrado.");
  }
}

createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
    if (request.method === "GET" && requestUrl.pathname === "/api/catalog") return catalogHandler(requestUrl, response);
    if (request.method === "GET" && requestUrl.pathname === "/api/sources") return sendJson(response, 200, { sources: (await readSnapshot()).sources });
    if (request.method === "GET" && requestUrl.pathname === "/api/health") return sendJson(response, 200, { status: "ok" });
    if (request.method === "POST" && requestUrl.pathname === "/api/internal/sync") return syncHandler(request, requestUrl, response);
    if (request.method !== "GET" && request.method !== "HEAD") return sendJson(response, 405, { error: "Método não permitido." });
    return staticHandler(requestUrl.pathname, response);
  } catch (error) {
    return sendJson(response, 500, { error: "Erro inesperado no servidor.", details: error.message });
  }
}).listen(port, "0.0.0.0", () => console.log(`Mavvri disponível em http://0.0.0.0:${port}`));
