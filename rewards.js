const state = {
  source: "Todos",
  query: "ofertas",
  category: "Todos",
  items: [],
  nextOffset: null,
  visible: 6,
  sort: "relevance",
  saved: new Set(),
  savedOnly: false,
  catalogError: null,
  sourceStatus: [],
};

const categoryQueries = {
  Todos: "ofertas",
  Tecnologia: "eletrônicos",
  Casa: "casa cozinha",
  Moda: "moda beleza",
  Esporte: "esporte",
};

const grid = document.querySelector("#productsGrid");
const status = document.querySelector("#catalogStatus");
const loadMore = document.querySelector("#loadMore");
const savedCount = document.querySelector("#savedCount");
const savedButton = document.querySelector("#savedButton");
const searchInput = document.querySelector("#searchInput");
const loader = document.querySelector("#pageLoader");
const toast = document.querySelector("#toast");
const toastText = document.querySelector("#toastText");
let toastTimer;
let requestId = 0;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'\"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;",
  }[character]));
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function sourceKey(source) {
  const keys = {
    "Mercado Livre": "mercadolivre",
    Amazon: "amazon",
    Americanas: "americanas",
    Shopee: "shopee",
    "Magazine Luiza": "magalu",
    Shein: "shein",
    OLX: "olx",
  };
  return keys[source] || "all";
}

function filteredItems() {
  const items = state.savedOnly ? state.items.filter((item) => state.saved.has(String(item.id))) : state.items;
  return [...items].sort((a, b) => {
    if (state.sort === "lowest") return Number(a.price) - Number(b.price);
    if (state.sort === "discount") return Number(b.discount || 0) - Number(a.discount || 0);
    return Number(a.timing || 0) - Number(b.timing || 0);
  });
}

function productCard(product, index) {
  const saved = state.saved.has(String(product.id));
  const sourceClass = String(product.store || "").toLocaleLowerCase("pt-BR").replace(/[^a-z0-9]+/g, "-");
  const name = escapeHtml(product.name);
  const store = escapeHtml(product.store);
  const link = escapeHtml(product.url || "#");
  const hasDiscount = Number(product.oldPrice) > Number(product.price) && Number(product.discount) > 0;
  return `<article class="product-card" data-url="${link}" role="link" tabindex="0" aria-label="Abrir ${name} em ${store}" style="animation-delay:${index * 35}ms">
    <div class="product-image"><span class="product-badge ${product.badgeClass === "coupon" ? "pink" : ""}">${escapeHtml(product.badge || "AO VIVO")}</span><button class="save-product ${saved ? "is-saved" : ""}" data-save="${escapeHtml(product.id)}" aria-label="${saved ? "Remover" : "Salvar"} ${name}">${saved ? "♥" : "♡"}</button><img src="${escapeHtml(product.image)}" alt="${name}" loading="lazy" onerror="this.style.opacity='0'" /></div>
    <div class="product-content"><div class="product-source"><span class="source-logo ${sourceClass}">${store}</span><span>Atualizado agora</span></div><h3 class="product-title">${name}</h3><div class="product-price-line"><strong class="product-price">${formatPrice(product.price)}</strong>${hasDiscount ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span><span class="discount">-${escapeHtml(product.discount)}%</span>` : ""}</div><div class="product-meta"><span>${escapeHtml(product.delivery || "Consulte a loja")}</span><i></i><span>${product.tags?.includes("frete") ? "Frete grátis" : "Ver condições"}</span></div><a class="direct-offer" href="${link}" target="_blank" rel="noopener sponsored">Abrir na ${store} <span>↗</span></a></div>
  </article>`;
}

function renderProducts() {
  const items = filteredItems();
  const visible = items.slice(0, state.visible);
  if (!visible.length) {
    const selectedSource = state.source === "Todos" ? "as fontes conectadas" : state.source;
    const syncMessage = state.catalogError || `Ainda não há ofertas sincronizadas para ${selectedSource}.`;
    grid.innerHTML = `<div class="empty-state"><span>⌁</span><h3>Catálogo aguardando sincronização</h3><p>${escapeHtml(syncMessage)} Configure os conectores autorizados e execute a rotina de ingestão para preencher esta área com produtos reais.</p></div>`;
  } else {
    grid.innerHTML = visible.map(productCard).join("");
  }
  const hasClientMore = items.length > state.visible;
  loadMore.hidden = !hasClientMore && state.nextOffset === null;
  loadMore.innerHTML = state.nextOffset !== null && !hasClientMore ? "Buscar mais produtos reais <span>↓</span>" : "Carregar mais produtos <span>↓</span>";
  savedCount.textContent = state.saved.size;
  savedButton.classList.toggle("active", state.savedOnly);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastText.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

async function loadCatalog({ append = false } = {}) {
  const thisRequest = ++requestId;
  const offset = append ? state.items.length : 0;
  status.textContent = append ? "Buscando mais produtos reais…" : "Consultando catálogo ao vivo…";
  try {
    const url = new URL("/api/catalog", window.location.origin);
    url.searchParams.set("source", sourceKey(state.source));
    url.searchParams.set("q", state.query || categoryQueries[state.category] || "ofertas");
    url.searchParams.set("limit", "24");
    url.searchParams.set("offset", String(offset));
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    const payload = await response.json();
    if (thisRequest !== requestId) return;
    state.sourceStatus = payload.sources || [];
    if (!response.ok) {
      state.items = [];
      state.nextOffset = null;
      state.catalogError = payload.error || "O catálogo ainda não foi sincronizado.";
      status.textContent = "Aguardando a primeira sincronização do catálogo";
      renderProducts();
      return;
    }
    const incoming = Array.isArray(payload.items) ? payload.items : [];
    const known = new Set(append ? state.items.map((item) => String(item.id)) : []);
    state.items = append ? [...state.items, ...incoming.filter((item) => !known.has(String(item.id)))] : incoming;
    state.nextOffset = payload.paging?.nextOffset ?? null;
    state.visible = append ? state.items.length : 6;
    state.catalogError = null;
    const configured = state.sourceStatus.filter((connector) => connector.configured && !connector.error).map((connector) => connector.label);
    status.textContent = state.items.length
      ? `${state.items.length} produtos sincronizados · ${configured.join(" + ") || "fonte atualizada"}`
      : "Nenhuma oferta encontrada na sincronização atual";
    renderProducts();
  } catch {
    if (thisRequest !== requestId) return;
    state.items = [];
    state.nextOffset = null;
    state.catalogError = "Não foi possível consultar o catálogo local agora.";
    status.textContent = "Catálogo temporariamente indisponível";
    renderProducts();
  }
}

function setSource(source, button) {
  state.source = source;
  state.items = [];
  state.visible = 6;
  document.querySelectorAll(".source-tab").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  void loadCatalog();
}

function setCategory(category, button) {
  state.category = category;
  state.query = categoryQueries[category] || "ofertas";
  state.items = [];
  state.visible = 6;
  searchInput.value = "";
  document.querySelectorAll(".category-tile").forEach((tile) => tile.classList.toggle("active", tile === button));
  document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
  void loadCatalog();
}

document.querySelector("#catalogSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  state.category = "Todos";
  state.query = searchInput.value.trim() || "ofertas";
  state.items = [];
  state.visible = 6;
  document.querySelectorAll(".category-tile").forEach((tile) => tile.classList.toggle("active", tile.dataset.category === "Todos"));
  document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
  void loadCatalog();
});

document.querySelectorAll("[data-query]").forEach((button) => button.addEventListener("click", () => {
  searchInput.value = button.dataset.query;
  document.querySelector("#catalogSearch").requestSubmit();
}));

document.querySelectorAll(".category-tile").forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.category, button)));
document.querySelectorAll(".source-tab").forEach((button) => button.addEventListener("click", () => setSource(button.dataset.source, button)));

document.querySelector("#sortSelect").addEventListener("change", (event) => { state.sort = event.target.value; renderProducts(); });
savedButton.addEventListener("click", () => { state.savedOnly = !state.savedOnly; renderProducts(); showToast(state.savedOnly ? "Mostrando seus produtos salvos." : "Mostrando todas as oportunidades."); });

loadMore.addEventListener("click", () => {
  const count = filteredItems().length;
  if (state.nextOffset !== null && state.visible >= count) { void loadCatalog({ append: true }); return; }
  state.visible += 6;
  renderProducts();
});

grid.addEventListener("click", (event) => {
  const save = event.target.closest("[data-save]");
  if (save) {
    const id = save.dataset.save;
    if (state.saved.has(id)) { state.saved.delete(id); showToast("Produto removido dos salvos."); }
    else { state.saved.add(id); showToast("Produto salvo no seu radar."); }
    renderProducts();
    return;
  }
  if (event.target.closest("a")) return;
  const card = event.target.closest(".product-card");
  if (card?.dataset.url) window.open(card.dataset.url, "_blank", "noopener");
});
grid.addEventListener("keydown", (event) => { if ((event.key === "Enter" || event.key === " ") && event.target.closest(".product-card")) { event.preventDefault(); window.open(event.target.closest(".product-card").dataset.url, "_blank", "noopener"); } });

const modal = document.querySelector("#alertModal");
function openAlert() { modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); setTimeout(() => document.querySelector("#alertProduct").focus(), 150); }
function closeAlert() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); }
document.querySelector("#openAlert").addEventListener("click", openAlert);
document.querySelector("#closeAlert").addEventListener("click", closeAlert);
modal.addEventListener("click", (event) => { if (event.target === modal) closeAlert(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeAlert(); });
document.querySelector("#alertForm").addEventListener("submit", (event) => { event.preventDefault(); event.target.reset(); closeAlert(); showToast("Alerta criado! Você será avisado no momento certo."); });
document.querySelector("#newsletterForm").addEventListener("submit", (event) => { event.preventDefault(); event.target.reset(); showToast("Pronto! Seu e-mail entrou no radar."); });

document.querySelector("#navSearch").addEventListener("click", () => { searchInput.focus(); document.querySelector("#inicio").scrollIntoView({ behavior: "smooth" }); });
document.querySelector("#menuButton").addEventListener("click", () => { const header = document.querySelector(".topbar"); header.classList.toggle("menu-open"); });
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => document.querySelector(".topbar").classList.remove("menu-open")));

renderProducts();
void loadCatalog();
window.addEventListener("load", () => window.setTimeout(() => loader.classList.add("hidden"), 850));
window.setTimeout(() => loader.classList.add("hidden"), 2400);
