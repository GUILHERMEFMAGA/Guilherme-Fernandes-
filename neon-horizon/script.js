/* ==========================================================================
   NEON HORIZON — The City Never Sleeps
   Interações: loader, cursor, partículas, parallax, reveal, contadores,
   nav, mapa, trailer, galeria (lightbox) e pré-registro.
   Vanilla JS — sem dependências externas.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  /* ======================================================================
     LOADING SCREEN — progresso simulado + transição cinematográfica
     ====================================================================== */
  var loader = document.getElementById("loader");
  var loaderFill = document.getElementById("loader-fill");
  var loaderPct = document.getElementById("loader-pct");
  var body = document.body;

  function finishLoad() {
    if (!body.classList.contains("loaded")) {
      body.classList.add("loaded");
      body.classList.remove("no-scroll");
    }
  }

  if (reduced) {
    // usuários com redução de movimento: pula direto para o conteúdo
    if (loaderFill) loaderFill.style.width = "100%";
    if (loaderPct) loaderPct.textContent = "100%";
    finishLoad();
  } else {
    var progress = 0;
    body.classList.add("no-scroll");
    var tick = setInterval(function () {
      // progresso com leve aleatoriedade para parecer orgânico
      progress += Math.random() * 9 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(tick);
      }
      if (loaderFill) loaderFill.style.width = progress + "%";
      if (loaderPct) loaderPct.textContent = Math.floor(progress) + "%";
      if (progress >= 100) setTimeout(finishLoad, 420);
    }, 110);
  }

  /* ======================================================================
     CONTADOR REGRESSIVO — alvo 19.11.2027 (um contador por instância)
     ====================================================================== */
  var LAUNCH = new Date("2027-11-19T00:00:00");

  function initCountdown(idPrefix) {
    var days = document.getElementById(idPrefix + "-days");
    var hours = document.getElementById(idPrefix + "-hours");
    var mins = document.getElementById(idPrefix + "-mins");
    var secs = document.getElementById(idPrefix + "-secs");
    if (!days || !hours || !mins || !secs) return;

    function tick() {
      var diff = LAUNCH - new Date();
      var d = 0, h = 0, m = 0, s = 0;
      if (diff > 0) {
        s = Math.floor(diff / 1000);
        d = Math.floor(s / 86400); s -= d * 86400;
        h = Math.floor(s / 3600);  s -= h * 3600;
        m = Math.floor(s / 60);    s -= m * 60;
      }
      days.textContent = pad2(d);
      hours.textContent = pad2(h);
      mins.textContent = pad2(m);
      secs.textContent = pad2(s);
    }
    tick();
    setInterval(tick, 1000);
  }
  initCountdown("cdh");
  initCountdown("cdf");

  /* ======================================================================
     PARTÍCULAS SUTIS (canvas no hero)
     ====================================================================== */
  var canvas = document.getElementById("particles");
  if (canvas && !reduced) {
    var ctx = canvas.getContext("2d");
    var parts = [];
    var COLORS = ["255,46,138", "34,211,255", "217,179,106"];

    function resize() {
      var w = canvas.parentElement.clientWidth;
      var h = canvas.parentElement.clientHeight;
      var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }

    function spawn() {
      var w = canvas.width / (Math.min(window.devicePixelRatio || 1, 1.5));
      var h = canvas.height / (Math.min(window.devicePixelRatio || 1, 1.5));
      var count = w < 560 ? 24 : 46;
      parts = [];
      for (var i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.5,
          vy: -(Math.random() * 0.35 + 0.08),
          sway: Math.random() * 0.5 - 0.25,
          phase: Math.random() * Math.PI * 2,
          a: Math.random() * 0.5 + 0.15,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        });
      }
    }

    function frame(t) {
      var w = canvas.width / (Math.min(window.devicePixelRatio || 1, 1.5));
      var h = canvas.height / (Math.min(window.devicePixelRatio || 1, 1.5));
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y += p.vy;
        p.x += p.sway * 0.3 + Math.sin(t / 1400 + p.phase) * 0.12;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        var fade = clamp((h - p.y) / h, 0, 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + p.color + "," + (p.a * fade).toFixed(3) + ")";
        ctx.shadowColor = "rgba(" + p.color + ",.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      requestAnimationFrame(frame);
    }

    var rafId = null;
    function start() { if (!rafId) rafId = requestAnimationFrame(frame); }
    function stop() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });
    start();
  }

  /* ======================================================================
     CURSOR PERSONALIZADO (desktop apenas)
     ====================================================================== */
  if (finePointer && !reduced) {
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (dot && ring) {
      var mx = innerWidth / 2, my = innerHeight / 2;
      var rx = mx, ry = my;

      document.addEventListener("mousemove", function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      });

      (function ringLoop() {
        rx = lerp(rx, mx, 0.16);
        ry = lerp(ry, my, 0.16);
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(ringLoop);
      })();

      document.addEventListener("mouseover", function (e) {
        var interactive = e.target.closest("a, button, [data-cursor], .gallery-item, .map-marker");
        ring.classList.toggle("is-hover", !!interactive);
      });
    }
  }

  /* ======================================================================
     NAVBAR — scroll, menu mobile, link ativo
     ====================================================================== */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("nav-burger");
  var navMenu = document.getElementById("nav-menu");

  function setNav(open) {
    navMenu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
    body.classList.toggle("no-scroll", open && innerWidth <= 920);
  }

  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      setNav(!navMenu.classList.contains("open"));
    });
    navMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setNav(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) setNav(false);
    });
  }

  var onScrollNav = function () {
    nav.classList.toggle("scrolled", (window.scrollY || 0) > 30);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  // destaque do link ativo conforme a seção visível
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = ["inicio", "jogo", "personagens", "mundo", "trailer", "galeria"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ======================================================================
     SCROLL REVEAL + PARALLAX
     ====================================================================== */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduced) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var ticking = false;
  function updateParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var center = rect.top + rect.height / 2 - vh / 2;
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
      var offset = clamp(-center * speed, -90, 90);
      var target = el.firstElementChild;
      if (target) target.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    });
    ticking = false;
  }
  function onScrollParallax() {
    if (reduced || innerWidth < 768) return;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScrollParallax, { passive: true });
  onScrollParallax();

  /* ======================================================================
     MAPA — zoom + marcadores interativos
     ====================================================================== */
  var mapWrap = document.getElementById("map-wrap");
  var mapZoom = document.getElementById("map-zoom");

  if (mapZoom) {
    mapZoom.addEventListener("click", function () {
      var zoomed = mapWrap.classList.toggle("zoomed");
      mapZoom.setAttribute("aria-pressed", zoomed ? "true" : "false");
      mapZoom.textContent = zoomed ? "−" : "+";
    });
  }

  document.querySelectorAll(".map-marker").forEach(function (marker) {
    var btn = marker.querySelector(".marker-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var wasActive = marker.classList.contains("active");
      document.querySelectorAll(".map-marker.active").forEach(function (m) {
        m.classList.remove("active");
      });
      if (!wasActive) marker.classList.add("active");
    });
  });

  /* ======================================================================
     MODAIS (genérico) — trailer e pré-registro
     ====================================================================== */
  var openModal = null;

  function showModal(modal) {
    if (!modal) return;
    openModal = modal;
    modal.hidden = false;
    body.classList.add("no-scroll");
    var close = modal.querySelector(".modal-close");
    if (close) close.focus();
  }
  function hideModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    if (openModal === modal) openModal = null;
    if (!document.querySelector(".modal:not([hidden])") &&
        !document.querySelector(".lightbox:not([hidden])")) {
      body.classList.remove("no-scroll");
    }
  }

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      var target = document.getElementById("modal-" + opener.getAttribute("data-open"));
      showModal(target);
      return;
    }
    if (e.target.closest("[data-close]")) {
      var m = e.target.closest(".modal");
      hideModal(m);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var modals = Array.prototype.slice.call(document.querySelectorAll(".modal:not([hidden])"));
      modals.forEach(hideModal);
      if (lightbox && !lightbox.hidden) closeLightbox();
    }
  });

  /* ---- Trailer ---- */
  var trailerPlay = document.getElementById("trailer-play");
  if (trailerPlay) {
    trailerPlay.addEventListener("click", function () {
      showModal(document.getElementById("modal-trailer"));
    });
  }

  /* ---- Pré-registro ---- */
  var preForm = document.getElementById("pre-form");
  var preOk = document.getElementById("pre-ok");
  if (preForm) {
    preForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("pre-email");
      if (!email.value || !email.checkValidity()) {
        email.reportValidity();
        return;
      }
      preForm.hidden = true;
      preOk.hidden = false;
      setTimeout(function () {
        preForm.hidden = false;
        preOk.hidden = true;
        email.value = "";
      }, 6000);
    });
  }

  /* ======================================================================
     GALERIA — lightbox com navegação e teclado
     ====================================================================== */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxText = document.getElementById("lightbox-text");
  var lightboxCounter = document.getElementById("lightbox-counter");
  var current = 0;
  var lastFocus = null;

  function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;
    current = (index + galleryItems.length) % galleryItems.length;
    lastFocus = document.activeElement;
    renderLightbox();
    lightbox.hidden = false;
    body.classList.add("no-scroll");
    var close = lightbox.querySelector(".lightbox-close");
    if (close) close.focus();
  }

  function renderLightbox() {
    var item = galleryItems[current];
    lightboxImg.src = item.getAttribute("data-full");
    lightboxImg.alt = item.querySelector("img").alt || "";
    lightboxTitle.textContent = item.getAttribute("data-title") || "";
    lightboxText.textContent = item.getAttribute("data-caption") || "";
    lightboxCounter.textContent = (current + 1) + " / " + galleryItems.length;
  }

  function nextLightbox() { openLightbox(current + 1); }
  function prevLightbox() { openLightbox(current - 1); }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  galleryItems.forEach(function (item, i) {
    item.addEventListener("click", function () { openLightbox(i); });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target.closest("[data-lb-close]")) closeLightbox();
      if (e.target.closest(".lightbox-next")) nextLightbox();
      if (e.target.closest(".lightbox-prev")) prevLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    });
  }

  /* ======================================================================
     ANO DO RODAPÉ
     ====================================================================== */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
