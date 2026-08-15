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

const state = {
  category: "Todos",
  query: "",
  maxPrice: 4000,
  stores: [],
  types: [],
  sort: "relevance",
  visible: 6,
  saved: new Set(),
  savedOnly: false,
};

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
let toastTimer;

function currency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function getFilteredProducts() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase("pt-BR");
  const filtered = products.filter((product) => {
    const matchesCategory = state.category === "Todos" || product.category === state.category;
    const searchable = `${product.name} ${product.category} ${product.store}`.toLocaleLowerCase("pt-BR");
    const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery) || matchesSynonym(normalizedQuery, product);
    const matchesPrice = product.price <= state.maxPrice;
    const matchesStore = !state.stores.length || state.stores.includes(product.store);
    const matchesType = !state.types.length || state.types.every((type) => product.tags.includes(type));
    const matchesSaved = !state.savedOnly || state.saved.has(product.id);
    return matchesCategory && matchesSearch && matchesPrice && matchesStore && matchesType && matchesSaved;
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

function cardTemplate(product, index) {
  const saved = state.saved.has(product.id);
  const storeClass = product.store.toLocaleLowerCase("pt-BR").replace(" ", "-").replace("!", "");
  return `
    <article class="product-card" style="animation-delay:${index * 35}ms">
      <div class="product-image">
        <span class="product-badge ${product.badgeClass}">${product.badge}</span>
        <button class="save-product ${saved ? "is-saved" : ""}" data-save="${product.id}" aria-label="${saved ? "Remover" : "Salvar"} ${product.name}" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.opacity='0'" />
      </div>
      <div class="product-content">
        <div class="product-source"><span class="source-logo ${storeClass}">${product.store}</span><span>Atualizado agora</span></div>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price-line"><strong class="product-price">${currency(product.price)}</strong><span class="product-old-price">${currency(product.oldPrice)}</span><span class="discount">-${product.discount}%</span></div>
        <div class="product-meta"><span>${product.delivery}</span><i class="sep"></i><span>${product.tags.includes("cupom") ? "Cupom disponível" : "Em até 10x"}</span>${product.tags.includes("historico") ? '<span class="history">mínima histórica</span>' : ""}</div>
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

function runSearch(query) {
  state.query = query.trim();
  state.visible = 6;
  document.querySelector("#searchInput").value = state.query;
  document.querySelector("#ofertas").scrollIntoView({ behavior: "smooth", block: "start" });
  renderProducts();
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

grid.addEventListener("click", (event) => {
  const saveButton = event.target.closest("[data-save]");
  if (!saveButton) return;
  const id = Number(saveButton.dataset.save);
  if (state.saved.has(id)) {
    state.saved.delete(id);
    showToast("Oferta removida dos seus salvos.");
  } else {
    state.saved.add(id);
    showToast("Oferta salva para você acompanhar.");
  }
  renderProducts();
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

updateRangeStyle();
updateMobileFilterCount();
renderProducts();
