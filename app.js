const products = [
  {
    id: 1,
    name: "Fone de ouvido Sony WH-1000XM5 com cancelamento de ruído",
    category: "Tecnologia",
    store: "Amazon",
    price: 1899,
    oldPrice: 2699,
    discount: 29,
    badge: "OFERTA RELÂMPAGO",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "historico"],
    timing: 1,
  },
  {
    id: 2,
    name: "Apple iPhone 15 128 GB — Tela Super Retina XDR",
    category: "Tecnologia",
    store: "Mercado Livre",
    price: 3999,
    oldPrice: 4999,
    discount: 20,
    badge: "MENOR PREÇO",
    badgeClass: "price-low",
    image: "https://images.unsplash.com/photo-1696446702183-cbd551c09534?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "historico"],
    timing: 2,
  },
  {
    id: 3,
    name: "Air Fryer Philips Walita Essential XL 6,2L Preta",
    category: "Casa",
    store: "Magalu",
    price: 499,
    oldPrice: 699,
    discount: 28,
    badge: "CUPOM: BEMVINDO",
    badgeClass: "coupon",
    image: "https://images.unsplash.com/photo-1585515656790-3a86b5aac18b?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "cupom"],
    timing: 3,
  },
  {
    id: 4,
    name: "Tênis New Balance 530 Unissex Casual",
    category: "Moda",
    store: "Amazon",
    price: 549,
    oldPrice: 799,
    discount: 31,
    badge: "OFERTA RELÂMPAGO",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete"],
    timing: 4,
  },
  {
    id: 5,
    name: "Nintendo Switch OLED 64GB com Joy-Con Branco",
    category: "Games",
    store: "KaBuM!",
    price: 1749,
    oldPrice: 2199,
    discount: 20,
    badge: "MENOR PREÇO",
    badgeClass: "price-low",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "historico"],
    timing: 5,
  },
  {
    id: 6,
    name: "Smartwatch Samsung Galaxy Watch6 40mm Bluetooth",
    category: "Tecnologia",
    store: "Amazon",
    price: 999,
    oldPrice: 1499,
    discount: 33,
    badge: "CUPOM: TECH10",
    badgeClass: "coupon",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["cupom", "frete"],
    timing: 6,
  },
  {
    id: 7,
    name: "Monitor Gamer LG UltraGear 24'' 144Hz IPS Full HD",
    category: "Tecnologia",
    store: "KaBuM!",
    price: 849,
    oldPrice: 1199,
    discount: 29,
    badge: "OFERTA RELÂMPAGO",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "historico"],
    timing: 7,
  },
  {
    id: 8,
    name: "Cafeteira Nespresso Essenza Mini com Aeroccino",
    category: "Casa",
    store: "Mercado Livre",
    price: 449,
    oldPrice: 649,
    discount: 30,
    badge: "CUPOM: CAFÉ15",
    badgeClass: "coupon",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["cupom", "frete"],
    timing: 8,
  },
  {
    id: 9,
    name: "Mochila Adidas Classic com bolso para notebook",
    category: "Esporte",
    store: "Magalu",
    price: 139,
    oldPrice: 219,
    discount: 36,
    badge: "OFERTA RELÂMPAGO",
    badgeClass: "",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete"],
    timing: 9,
  },
  {
    id: 10,
    name: "Cadeira Gamer ThunderX3 Yama1 Reclinável",
    category: "Games",
    store: "KaBuM!",
    price: 999,
    oldPrice: 1599,
    discount: 37,
    badge: "MENOR PREÇO",
    badgeClass: "price-low",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["frete", "historico"],
    timing: 10,
  },
  {
    id: 11,
    name: "Kit skincare Creamy: vitamina C + ácido mandélico",
    category: "Moda",
    store: "Amazon",
    price: 119,
    oldPrice: 179,
    discount: 33,
    badge: "CUPOM: GLOW10",
    badgeClass: "coupon",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["cupom", "frete"],
    timing: 11,
  },
  {
    id: 12,
    name: "Azeite extravirgem Gallo 500ml — kit com 3 unidades",
    category: "Mercado",
    store: "Mercado Livre",
    price: 69,
    oldPrice: 99,
    discount: 30,
    badge: "CUPOM: ECONOMIA",
    badgeClass: "coupon",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",
    delivery: "Frete grátis",
    tags: ["cupom", "frete"],
    timing: 12,
  },
];

const marketplaceOverrides = {
  3: "Mercado Livre", 5: "Amazon", 7: "Mercado Livre", 8: "Mercado Livre",
  9: "Amazon", 10: "Amazon", 11: "Mercado Livre", 12: "Mercado Livre",
};

const productLinks = {
  1: "https://www.amazon.com.br/Sony-Fones-ouvido-cancelamento-WH-1000XM5/dp/B0DGL6R3SX",
  2: "https://lista.mercadolivre.com.br/apple-iphone-15-128gb",
  3: "https://lista.mercadolivre.com.br/air-fryer-philips-walita-essential-xl",
  4: "https://www.amazon.com.br/s?k=new+balance+530",
  5: "https://www.amazon.com.br/Console-Nintendo-Switch-OLED-Branco/dp/B098RKWHHZ",
  6: "https://www.amazon.com.br/s?k=galaxy+watch6+40mm",
  7: "https://lista.mercadolivre.com.br/monitor-lg-ultragear-24-144hz",
  8: "https://lista.mercadolivre.com.br/nespresso-essenza-mini-aeroccino",
  9: "https://www.amazon.com.br/s?k=mochila+adidas+classic",
  10: "https://www.amazon.com.br/s?k=cadeira+gamer+thunderx3+yama1",
  11: "https://lista.mercadolivre.com.br/kit-skincare-creamy",
  12: "https://lista.mercadolivre.com.br/azeite-gallo-500ml-kit-3",
};

products.forEach((product) => {
  product.store = marketplaceOverrides[product.id] || product.store;
  product.url = productLinks[product.id];
});

const state = {
  category: "Todos",
  query: "",
  maxPrice: 4000,
  stores: [],
  types: [],
  marketplace: "Todos",
  remoteProducts: [],
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
const marketplaceCache = new Map();
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
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">⌕</div><h3>Nenhuma oferta por aqui</h3><p>Tente remover algum filtro ou buscar outro produto.</p></div>`;
  } else {
    grid.innerHTML = visibleProducts.map(cardTemplate).join("");
  }

  loadMore.style.display = filtered.length > state.visible ? "block" : "none";
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

let activeSearchRequest = 0;

async function loadMercadoLivreResults(query) {
  if (query.length < 3 || state.marketplace === "Amazon") return;
  const normalizedQuery = query.toLocaleLowerCase("pt-BR");
  const requestId = ++activeSearchRequest;
  catalogStatus.textContent = "Consultando ofertas do Mercado Livre…";

  try {
    let liveProducts = marketplaceCache.get(normalizedQuery);
    if (!liveProducts) {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(query)}&limit=18`);
      if (!response.ok) throw new Error(`Mercado Livre respondeu ${response.status}`);
      const payload = await response.json();
      liveProducts = (payload.results || []).map((item, index) => {
        const price = Number(item.price) || 0;
        const oldPrice = Number(item.original_price) || price;
        const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;
        return {
          id: `meli-${item.id}`,
          name: item.title,
          category: "Busca ao vivo",
          store: "Mercado Livre",
          price,
          oldPrice,
          discount,
          badge: item.shipping?.free_shipping ? "FRETE GRÁTIS" : "AO VIVO",
          badgeClass: item.shipping?.free_shipping ? "price-low" : "coupon",
          image: String(item.thumbnail || "").replace(/^http:/, "https:"),
          delivery: item.shipping?.free_shipping ? "Frete grátis" : "Consulte o envio",
          tags: item.shipping?.free_shipping ? ["frete"] : [],
          timing: -index,
          url: item.permalink,
          live: true,
        };
      });
      marketplaceCache.set(normalizedQuery, liveProducts);
    }

    if (requestId !== activeSearchRequest || state.query.toLocaleLowerCase("pt-BR") !== normalizedQuery) return;
    state.remoteProducts = liveProducts;
    state.visible = 6;
    catalogStatus.textContent = `${liveProducts.length} resultados ao vivo do Mercado Livre`;
    renderProducts();
  } catch (error) {
    if (requestId !== activeSearchRequest) return;
    state.remoteProducts = [];
    catalogStatus.textContent = "Links para a loja de origem";
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
  void loadMercadoLivreResults(state.query);
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
    state.visible = 6;
    document.querySelectorAll(".category-card").forEach((item) => item.classList.toggle("active", item === button));
    renderProducts();
    document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
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
    catalogStatus.textContent = state.marketplace === "Todos" ? "Links para a loja de origem" : `Exibindo ofertas da ${state.marketplace}`;
    renderProducts();
    if (state.query && state.marketplace === "Mercado Livre") void loadMercadoLivreResults(state.query);
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
  state.visible += 3;
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

window.addEventListener("load", () => {
  window.setTimeout(() => siteLoader.classList.add("is-hidden"), 1450);
});

window.setTimeout(() => siteLoader.classList.add("is-hidden"), 2600);
