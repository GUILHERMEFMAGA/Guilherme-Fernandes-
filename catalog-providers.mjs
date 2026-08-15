const sourceDefinitions = {
  mercadolivre: {
    key: "mercadolivre",
    label: "Mercado Livre",
    env: null,
  },
  amazon: { key: "amazon", label: "Amazon", env: "AMAZON_CATALOG_PROXY_URL" },
  americanas: { key: "americanas", label: "Americanas", env: "AMERICANAS_CATALOG_PROXY_URL" },
  shopee: { key: "shopee", label: "Shopee", env: "SHOPEE_CATALOG_PROXY_URL" },
  magalu: { key: "magalu", label: "Magazine Luiza", env: "MAGALU_CATALOG_PROXY_URL" },
  shein: { key: "shein", label: "Shein", env: "SHEIN_CATALOG_PROXY_URL" },
  olx: { key: "olx", label: "OLX", env: "OLX_CATALOG_PROXY_URL" },
};

export const sourceKeys = Object.keys(sourceDefinitions);

function classifyProduct(title = "") {
  const text = title.toLocaleLowerCase("pt-BR");
  if (/(notebook|celular|iphone|smartphone|fone|headphone|monitor|smartwatch|tv |tablet|teclado|mouse)/.test(text)) return "Tecnologia";
  if (/(air fryer|cafeteira|aspirador|liquidificador|panela|cozinha|cama|mesa|sofá|geladeira)/.test(text)) return "Casa";
  if (/(tênis|tenis|camiseta|bolsa|mochila|perfume|maquiagem|skincare|vestido)/.test(text)) return "Moda";
  if (/(bike|bicicleta|halter|corrida|futebol|academia|esporte)/.test(text)) return "Esporte";
  if (/(playstation|xbox|nintendo|switch|gamer|jogo|console)/.test(text)) return "Games";
  return "Outros";
}

function normalizeOffer(item, source, index) {
  const price = Number(item.price);
  const oldPrice = Number(item.original_price ?? item.oldPrice ?? item.originalPrice ?? price);
  const discount = Number(item.discount_percent ?? item.discount ?? (oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0));
  const image = item.thumbnail ?? item.image ?? item.image_url ?? item.imageUrl ?? "";
  const url = item.permalink ?? item.affiliate_url ?? item.affiliateUrl ?? item.product_url ?? item.productUrl ?? item.url;
  const shipping = Boolean(item.shipping?.free_shipping ?? item.free_shipping ?? item.freeShipping);
  return {
    id: `${source.key}-${item.id ?? item.asin ?? item.source_offer_id ?? index}`,
    source: source.key,
    name: item.title ?? item.name ?? "Produto sem título",
    category: item.category ?? classifyProduct(item.title ?? item.name),
    store: source.label,
    price: Number.isFinite(price) ? price : 0,
    oldPrice: Number.isFinite(oldPrice) ? oldPrice : 0,
    discount: Number.isFinite(discount) ? discount : 0,
    badge: shipping ? "FRETE GRÁTIS" : "AO VIVO",
    badgeClass: shipping ? "price-low" : "coupon",
    image: String(image).replace(/^http:/, "https:"),
    delivery: shipping ? "Frete grátis" : (item.delivery ?? "Consulte a loja"),
    tags: shipping ? ["frete"] : [],
    timing: -index,
    url,
    live: true,
    updatedAt: new Date().toISOString(),
  };
}

async function mercadoLivreProvider({ query, limit, offset }) {
  const url = new URL("https://api.mercadolibre.com/sites/MLB/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Mercado Livre respondeu ${response.status}`);
  const payload = await response.json();
  const items = (payload.results || []).map((item, index) => normalizeOffer(item, sourceDefinitions.mercadolivre, index));
  const total = Number(payload.paging?.total) || 0;
  return {
    source: "mercadolivre",
    items,
    paging: { offset, limit, total, nextOffset: offset + limit < total ? offset + limit : null },
    connector: { available: true, label: sourceDefinitions.mercadolivre.label },
  };
}

async function proxyProvider(source, { query, limit, offset }) {
  const definition = sourceDefinitions[source];
  const endpoint = process.env[definition.env];
  if (!endpoint) {
    return {
      source,
      items: [],
      paging: { offset, limit, total: 0, nextOffset: null },
      connector: { available: false, label: definition.label, message: "Conector ainda não configurado." },
    };
  }
  const url = new URL(endpoint);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  const token = process.env[`${source.toUpperCase()}_CATALOG_PROXY_TOKEN`];
  const response = await fetch(url, { headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  if (!response.ok) throw new Error(`${definition.label} respondeu ${response.status}`);
  const payload = await response.json();
  const rawItems = Array.isArray(payload.items) ? payload.items : [];
  return {
    source,
    items: rawItems.map((item, index) => normalizeOffer(item, definition, index)),
    paging: payload.paging || { offset, limit, total: rawItems.length, nextOffset: null },
    connector: { available: true, label: definition.label },
  };
}

export async function fetchSourceCatalog(source, params) {
  if (source === "mercadolivre") return mercadoLivreProvider(params);
  return proxyProvider(source, params);
}

export function getSourceDefinitions() {
  return sourceKeys.map((key) => ({ key, label: sourceDefinitions[key].label, configured: key === "mercadolivre" || Boolean(process.env[sourceDefinitions[key].env]) }));
}
