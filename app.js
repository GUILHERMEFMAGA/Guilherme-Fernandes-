/* ==========================================================================
   GRAND THEFT AUTO VI — Rockstar Games (recreação estática local)
   Interações: menu, modais, player de trailer, reveal on scroll, newsletter
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Modal system ---------- */
  var modals = {
    editions: document.getElementById("modal-editions"),
    ultimate: document.getElementById("modal-ultimate"),
    vintage: document.getElementById("modal-vintage"),
    trailers: document.getElementById("modal-trailer"),
    cookies: document.getElementById("modal-cookies")
  };

  var lastFocus = null;

  function openModal(name) {
    var modal = modals[name];
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    if (!Object.keys(modals).some(function (k) { return modals[k] && !modals[k].hidden; })) {
      document.body.style.overflow = "";
    }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-open]");
    if (opener) {
      e.preventDefault();
      var name = opener.getAttribute("data-open");
      if (name === "trailers") return; // handled by trailer buttons
      openModal(name);
      return;
    }
    if (e.target.closest("[data-close]")) {
      var modal = e.target.closest(".modal");
      closeModal(modal);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var open = Object.keys(modals).map(function (k) { return modals[k]; })
        .filter(function (m) { return m && !m.hidden; });
      open.forEach(closeModal);
    }
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navClose = document.querySelector(".nav-close");

  function setNav(open) {
    navMenu.hidden = !open;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }
  navToggle.addEventListener("click", function () {
    setNav(navMenu.hidden);
  });
  if (navClose) navClose.addEventListener("click", function () { setNav(false); });
  navMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setNav(false); });
  });

  /* ---------- Trailer player ---------- */
  var TRAILERS = {
    "1": {
      title: "Grand Theft Auto VI | 1º Trailer",
      date: "4 de dezembro de 2023",
      duration: "1:31",
      frame: "assets/trailer-1.jpg",
      alt: "Cena do 1º Trailer de Grand Theft Auto VI."
    },
    "2": {
      title: "Grand Theft Auto VI | 2º Trailer",
      date: "6 de maio de 2025",
      duration: "2:47",
      frame: "assets/trailer-2.jpg",
      alt: "Cena do 2º Trailer de Grand Theft Auto VI."
    }
  };

  var playerModal = modals.trailers;
  var playerFrame = document.getElementById("player-frame");
  var playerTitle = document.getElementById("player-title");
  var playerDate = document.getElementById("player-date");
  var playerPlay = document.getElementById("player-play");
  var playerProgress = document.getElementById("player-progress");
  var playing = false;

  document.querySelectorAll(".trailer-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var key = card.getAttribute("data-trailer");
      var data = TRAILERS[key];
      if (!data) return;
      playerFrame.src = data.frame;
      playerFrame.alt = data.alt;
      playerTitle.textContent = data.title + "  ·  " + data.duration;
      playerDate.textContent = data.date;
      resetPlayer();
      openModal("trailers");
    });
  });

  function resetPlayer() {
    playing = false;
    playerPlay.style.display = "flex";
    playerProgress.classList.remove("playing");
    playerProgress.querySelector("span").style.width = "0%";
  }

  function playFake() {
    if (playing) return;
    playing = true;
    playerPlay.style.display = "none";
    var bar = playerProgress.querySelector("span");
    bar.style.width = "0%";
    // force reflow to restart animation
    void playerProgress.offsetWidth;
    playerProgress.classList.remove("playing");
    void playerProgress.offsetWidth;
    playerProgress.classList.add("playing");
    bar.addEventListener("animationend", function () {
      playing = false;
      playerPlay.style.display = "flex";
      playerProgress.classList.remove("playing");
      bar.style.width = "100%";
      setTimeout(resetPlayer, 900);
    }, { once: true });
  }

  playerPlay.addEventListener("click", playFake);

  /* ---------- Newsletter ---------- */
  var form = document.getElementById("newsletter-form");
  var okMsg = document.getElementById("newsletter-ok");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("newsletter-email");
      if (!email.value || !email.checkValidity()) {
        email.reportValidity();
        return;
      }
      form.hidden = true;
      okMsg.hidden = false;
    });
  }

  /* ---------- Current year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
