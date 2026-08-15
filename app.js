// Product data is supplied by authorized marketplace connectors through /api/catalog.
const products = [];

const state = {
  category: "Todos",
  query: "",
  maxPrice: 4000,
  stores: [],
  types: [],
  marketplace: "Todos",
  remoteProducts: [],
  nextOffset: null,
  sort: "relevance",
  visible: 6,
  saved: new Set(),
  savedOnly: false,
};

const siteLoader = document.querySelector("#siteLoader");
const grid = document.querySelector("#productsGrid");
const dealCount = document.querySelector("#dealCount");
const resultFor = document.querySelector("#resultFor");
const loadMore = document.querySelector("#loadMore");
const range = document.querySelector("#priceRange");
const rangeLabel = document.querySelector("#rangeLabel");
const toast = document.querySelector("#toast");
const toastText = document.querySelector("#toastText");
const savedCount = document.querySelector(".saved-count");
const mobileFilterCount = document.querySelector("#mobileFilterCount");
const dashboardSavedCount = document.querySelector("#dashboardSavedCount");
const catalogStatus = document.querySelector("#catalogStatus");
let toastTimer;

function currency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function getFilteredProducts() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase("pt-BR");
  const catalog = [...state.remoteProducts, ...products];
  const filtered = catalog.filter((product) => {
    const matchesCategory = state.category === "Todos" || product.category === state.category;
    const searchable = `${product.name} ${product.category} ${product.store}`.toLocaleLowerCase("pt-BR");
    const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery) || matchesSynonym(normalizedQuery, product);
    const matchesPrice = product.price <= state.maxPrice;
    const matchesStore = !state.stores.length || state.stores.includes(product.store);
    const matchesMarketplace = state.marketplace === "Todos" || product.store === state.marketplace;
    const matchesType = !state.types.length || state.types.every((type) => product.tags.includes(type));
    const matchesSaved = !state.savedOnly || state.saved.has(String(product.id));
    return matchesCategory && matchesSearch && matchesPrice && matchesStore && matchesMarketplace && matchesType && matchesSaved;
  });

  return filtered.sort((a, b) => {
    if (state.sort === "lowest") return a.price - b.price;
    if (state.sort === "discount") return b.discount - a.discount;
    if (state.sort === "latest") return a.timing - b.timing;
    return a.timing - b.timing;
  });
}

function matchesSynonym(query, product) {
  const aliases = {
    celular: ["iphone", "smartphone"],
    celulares: ["iphone", "smartphone"],
    notebook: ["mochila", "monitor"],
    notebooks: ["mochila", "monitor"],
    tênis: ["new balance"],
    tenis: ["new balance"],
    airfryer: ["air fryer"],
  };
  return (aliases[query] || []).some((term) => product.name.toLocaleLowerCase("pt-BR").includes(term));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'\"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;",
  }[character]));
}

function cardTemplate(product, index) {
  const saved = state.saved.has(String(product.id));
  const storeClass = product.store.toLocaleLowerCase("pt-BR").replace(" ", "-").replace("!", "");
  const safeName = escapeHtml(product.name);
  const safeUrl = escapeHtml(product.url || "#");
  const safeStore = escapeHtml(product.store);
  const updateLabel = product.live ? "Oferta ao vivo" : "Link verificado";
  return `
    <article class="product-card" data-product-url="${safeUrl}" role="link" tabindex="0" aria-label="Abrir ${safeName} na ${safeStore}" style="animation-delay:${index * 35}ms">
      <div class="product-image">
        <span class="product-badge ${product.badgeClass}">${escapeHtml(product.badge)}</span>
        <button class="save-product ${saved ? "is-saved" : ""}" data-save="${escapeHtml(product.id)}" aria-label="${saved ? "Remover" : "Salvar"} ${safeName}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
        <img src="${escapeHtml(product.image)}" alt="${safeName}" loading="lazy" onerror="this.style.opacity='0'" />
      </div>
      <div class="product-content">
        <div class="product-source"><span class="source-logo ${storeClass}">${safeStore}</span><span>${updateLabel}</span></div>
        <h3 class="product-title">${safeName}</h3>
        <div class="product-price-line"><strong class="product-price">${currency(product.price)}</strong>${product.oldPrice > product.price ? `<span class="product-old-price">${currency(product.oldPrice)}</span>` : ""}${product.discount ? `<span class="discount">-${product.discount}%</span>` : ""}</div>
        <div class="product-meta"><span>${escapeHtml(product.delivery)}</span><i class="sep"></i><span>${product.tags.includes("cupom") ? "Cupom disponível" : "Em até 10x"}</span>${product.tags.includes("historico") ? '<span class="history">mínima histórica</span>' : ""}</div>
        <a class="direct-offer" href="${safeUrl}" target="_blank" rel="noopener sponsored" aria-label="Abrir ${safeName} na ${safeStore}">Abrir na ${safeStore} <span>↗</span></a>
      </div>
    </article>`;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  const visibleProducts = filtered.slice(0, state.visible);
  dealCount.textContent = `${filtered.length} ${filtered.length === 1 ? "oferta" : "ofertas"}`;
  resultFor.textContent = state.query ? `para “${state.query}”` : state.savedOnly ? "salvas por você" : "";

  if (!visibleProducts.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">⌕</div><h3>Nenhum produto disponível agora</h3><p>Experimente outra busca, remova um filtro ou troque a fonte do catálogo.</p></div>`;
  } else {
    grid.innerHTML = visibleProducts.map(cardTemplate).join("");
  }

  const hasMoreLiveResults = Number.isInteger(state.nextOffset) && state.nextOffset > 0;
  loadMore.style.display = filtered.length > state.visible || hasMoreLiveResults ? "block" : "none";
  loadMore.firstChild.textContent = hasMoreLiveResults && state.visible >= filtered.length ? "Buscar mais produtos reais " : "Quero ver mais achados ";
  updateSavedUI();
}

function updateSavedUI() {
  const count = state.saved.size;
  savedCount.textContent = count;
  savedCount.classList.toggle("visible", count > 0);
  dashboardSavedCount.textContent = String(count).padStart(2, "0");
  document.querySelector("#savedButton").classList.toggle("is-active", state.savedOnly);
}

function updateRangeStyle() {
  const percentage = ((state.maxPrice - 100) / (5000 - 100)) * 100;
  range.style.background = `linear-gradient(to right, #8caf2e 0%, #8caf2e ${percentage}%, #d9dfd7 ${percentage}%, #d9dfd7 100%)`;
  rangeLabel.textContent = state.maxPrice === 5000 ? "R$ 5.000+" : `Até ${currency(state.maxPrice)}`;
}

function activeFilterCount() {
  return state.stores.length + state.types.length + (state.maxPrice < 5000 ? 1 : 0);
}

function updateMobileFilterCount() {
  const count = activeFilterCount();
  mobileFilterCount.textContent = count;
  mobileFilterCount.classList.toggle("active", count > 0);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastText.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

let activeCatalogRequest = 0;
const categoryQueries = {
  Todos: "ofertas",
  Tecnologia: "eletrônicos",
  Casa: "casa cozinha",
  Moda: "moda beleza",
  Esporte: "esporte",
  Games: "games",
  Mercado: "mercado",
};

function sourceKey(marketplace) {
  if (marketplace === "Amazon") return "amazon";
  if (marketplace === "Mercado Livre") return "mercadolivre";
  return "all";
}

async function loadCatalogResults(query, { append = false, background = false } = {}) {
  const normalizedQuery = query.trim() || "ofertas";
  const source = sourceKey(state.marketplace);
  const offset = append ? state.remoteProducts.length : 0;
  const requestId = ++activeCatalogRequest;
  catalogStatus.textContent = append ? "Buscando mais produtos reais…" : "Consultando catálogo ao vivo…";

  try {
    const requestUrl = new URL("/api/catalog", window.location.origin);
    requestUrl.searchParams.set("source", source);
    requestUrl.searchParams.set("q", normalizedQuery);
    requestUrl.searchParams.set("limit", "24");
    requestUrl.searchParams.set("offset", String(offset));
    const response = await fetch(requestUrl, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Catálogo respondeu ${response.status}`);
    const payload = await response.json();
    if (requestId !== activeCatalogRequest) return;

    const items = Array.isArray(payload.items) ? payload.items : [];
    const existingIds = new Set(append ? state.remoteProducts.map((product) => String(product.id)) : []);
    const mergedItems = append ? [...state.remoteProducts, ...items.filter((item) => !existingIds.has(String(item.id)))] : items;
    state.remoteProducts = mergedItems;
    state.visible = append ? mergedItems.length : 6;
    state.nextOffset = payload.paging?.nextOffset ?? null;

    const availableSources = payload.connectors?.filter((connector) => connector.available).map((connector) => connector.source) || [];
    if (!items.length && source === "amazon") {
      catalogStatus.textContent = "Conector Amazon aguardando ativação oficial";
    } else if (payload.partial) {
      catalogStatus.textContent = `${items.length} produtos reais carregados · uma fonte está indisponível`;
    } else {
      catalogStatus.textContent = `${mergedItems.length} produtos reais · ${availableSources.join(" + ") || "fonte atualizada"}`;
    }
    renderProducts();
  } catch (error) {
    if (requestId !== activeCatalogRequest) return;
    state.remoteProducts = [];
    state.nextOffset = null;
    catalogStatus.textContent = "Fonte ao vivo indisponível no momento";
    renderProducts();
  }
}

function runSearch(query) {
  state.query = query.trim();
  state.remoteProducts = [];
  state.visible = 6;
  document.querySelector("#searchInput").value = state.query;
  document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
  renderProducts();
  void loadCatalogResults(state.query || "ofertas");
}

document.querySelector("#heroSearch").addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(document.querySelector("#searchInput").value);
});

document.querySelectorAll("[data-search]").forEach((button) => {
  button.addEventListener("click", () => runSearch(button.dataset.search));
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    state.query = "";
    state.visible = 6;
    document.querySelector("#searchInput").value = "";
    document.querySelectorAll(".category-card").forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
    document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
    void loadCatalogResults(categoryQueries[state.category] || "ofertas", { background: true });
  });
});

range.addEventListener("input", () => {
  state.maxPrice = Number(range.value);
  updateRangeStyle();
  state.visible = 6;
  updateMobileFilterCount();
  renderProducts();
});

document.querySelectorAll(".store-filter").forEach((input) => {
  input.addEventListener("change", () => {
    state.stores = Array.from(document.querySelectorAll(".store-filter:checked")).map((item) => item.value);
    state.visible = 6;
    updateMobileFilterCount();
    renderProducts();
  });
});

document.querySelectorAll(".type-filter").forEach((input) => {
  input.addEventListener("change", () => {
    state.types = Array.from(document.querySelectorAll(".type-filter:checked")).map((item) => item.value);
    state.visible = 6;
    updateMobileFilterCount();
    renderProducts();
  });
});

document.querySelectorAll(".marketplace-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.marketplace = button.dataset.marketplace;
    state.visible = 6;
    document.querySelectorAll(".marketplace-tab").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active);
    });
    catalogStatus.textContent = `Consultando ${state.marketplace === "Todos" ? "fontes autorizadas" : state.marketplace}…`;
    renderProducts();
    void loadCatalogResults(state.query || categoryQueries[state.category] || "ofertas");
  });
});

document.querySelector("#sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

document.querySelector("#clearFilters").addEventListener("click", () => {
  state.maxPrice = 5000;
  state.stores = [];
  state.types = [];
  state.visible = 6;
  range.value = 5000;
  document.querySelectorAll(".filters input[type=checkbox]").forEach((input) => (input.checked = false));
  updateRangeStyle();
  updateMobileFilterCount();
  renderProducts();
  showToast("Filtros removidos.");
});

function openProductDestination(card) {
  const url = card?.dataset.productUrl;
  if (!url || url === "#") return;
  window.open(url, "_blank", "noopener");
}

grid.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (saveButton) {
    const id = saveButton.dataset.save;
    if (state.saved.has(id)) {
      state.saved.delete(id);
      showToast("Oferta removida dos seus salvos.");
    } else {
      state.saved.add(id);
      showToast("Oferta salva para você acompanhar.");
    }
    renderProducts();
    return;
  }
  if (event.target.closest("a")) return;
  openProductDestination(event.target.closest(".product-card"));
});

grid.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    const card = event.target.closest(".product-card");
    if (!card) return;
    event.preventDefault();
    openProductDestination(card);
  }
});

document.querySelector("#savedButton").addEventListener("click", () => {
  if (!state.saved.size) {
    showToast("Salve alguma oferta para encontrá-la aqui.");
    return;
  }
  state.savedOnly = !state.savedOnly;
  state.visible = 6;
  renderProducts();
  document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(state.savedOnly ? "Mostrando suas ofertas salvas." : "Mostrando todas as ofertas.");
});

loadMore.addEventListener("click", () => {
  const filtered = getFilteredProducts();
  if (state.nextOffset !== null && state.visible >= state.remoteProducts.length) {
    void loadCatalogResults(state.query || categoryQueries[state.category] || "ofertas", { append: true });
    return;
  }
  state.visible += 6;
  renderProducts();
});

const modal = document.querySelector("#modalBackdrop");
const alertProduct = document.querySelector("#alertProduct");
function openAlertModal(product = "") {
  alertProduct.value = product;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => alertProduct.focus(), 180);
}
function closeAlertModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
document.querySelector("#sideAlertButton").addEventListener("click", () => openAlertModal());
document.querySelector("#dashboardAlertButton").addEventListener("click", () => openAlertModal());
document.querySelector("#modalClose").addEventListener("click", closeAlertModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeAlertModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeAlertModal(); });

document.querySelector("#modalAlertForm").addEventListener("submit", (event) => {
  event.preventDefault();
  closeAlertModal();
  event.target.reset();
  showToast("Alerta criado! Vamos avisar no preço certo.");
});
document.querySelector("#alertForm").addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
  showToast("Pronto! Você receberá nossos alertas inteligentes.");
});

document.querySelector("#mobileFilterButton").addEventListener("click", () => {
  document.querySelector("#filtersPanel").classList.toggle("mobile-open");
});

document.querySelector("#menuButton").addEventListener("click", () => {
  const header = document.querySelector(".site-header");
  header.classList.toggle("menu-open");
  document.querySelector("#menuButton").setAttribute("aria-label", header.classList.contains("menu-open") ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll(".desktop-nav a").forEach((link) => link.addEventListener("click", () => document.querySelector(".site-header").classList.remove("menu-open")));

document.querySelectorAll(".panel-link").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".panel-link").forEach((item) => item.classList.toggle("active", item === button));
    const tab = button.dataset.panelTab;
    if (tab === "alerts") showToast("Você tem 4 alertas ativos em acompanhamento.");
    if (tab === "saved") {
      if (!state.saved.size) {
        showToast("Suas ofertas salvas aparecerão aqui.");
      } else {
        state.savedOnly = true;
        state.visible = 6;
        renderProducts();
        document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (tab === "overview") showToast("Visão geral atualizada agora.");
  });
});

document.querySelector("#catPrev").addEventListener("click", () => document.querySelector("#categoryList").scrollBy({ left: -260, behavior: "smooth" }));
document.querySelector("#catNext").addEventListener("click", () => document.querySelector("#categoryList").scrollBy({ left: 260, behavior: "smooth" }));

function setupViewportMotion() {
  const sections = document.querySelectorAll(".signal-section, .collections-section, .catalog-section, .story-section, .join-section");
  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .1 });
  sections.forEach((section) => {
    section.classList.add("motion-section");
    observer.observe(section);
  });
}

setupViewportMotion();
updateRangeStyle();
updateMobileFilterCount();
renderProducts();
void loadCatalogResults("ofertas", { background: true });

window.addEventListener("load", () => {
  window.setTimeout(() => siteLoader.classList.add("is-hidden"), 1450);
});

window.setTimeout(() => siteLoader.classList.add("is-hidden"), 2600);
