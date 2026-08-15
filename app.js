/* ==========================================================================
   GRAND THEFT AUTO VI — Rockstar Games (recreação estática local)
   Interações: menu, modais, player de trailer, reveal on scroll, newsletter
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  var stagger = 0;
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (stagger % 6) * 0.07 + "s";
            stagger += 1;
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

  /* ---------- Intro loader ---------- */
  var loader = document.getElementById("loader");
  var loaderDone = false;
  function hideLoader() {
    if (loaderDone || !loader) return;
    loaderDone = true;
    loader.classList.add("done");
    setTimeout(function () {
      if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
    }, 800);
  }
  if (document.readyState === "complete") {
    setTimeout(hideLoader, 700);
  } else {
    window.addEventListener("load", function () { setTimeout(hideLoader, 700); });
  }
  setTimeout(hideLoader, 4200); // fallback

  /* ---------- Nav scrolled + scroll progress + to-top + parallax ---------- */
  var nav = document.querySelector(".site-nav");
  var progressBar = document.querySelector(".scroll-progress span");
  var toTop = document.getElementById("to-top");
  var heroMedia = document.getElementById("hero-media");
  var heroSection = document.querySelector(".hero");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (progressBar) progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("show", y > 640);
    if (heroMedia && heroSection && !prefersReduced && y < heroSection.offsetHeight) {
      heroMedia.style.transform = "translate3d(0," + Math.min(y * 0.18, 70) + "px,0)";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Marquee ---------- */
  var marqueeTrack = document.getElementById("marquee-track");
  if (marqueeTrack) {
    var words = ["Vice City", "Leonida", "19 de novembro de 2026", "Reserve agora"];
    var half = "";
    words.forEach(function (w) {
      half += '<span class="marquee-item"><span class="star" aria-hidden="true">&#10022;</span>' + w + "</span>";
    });
    marqueeTrack.innerHTML = half + half;
  }

  /* ---------- Countdown (19 nov 2026) ---------- */
  var countdown = document.getElementById("countdown");
  if (countdown) {
    var cdTarget = new Date("2026-11-19T00:00:00");
    var cdD = document.getElementById("cd-days");
    var cdH = document.getElementById("cd-hours");
    var cdM = document.getElementById("cd-mins");
    var cdS = document.getElementById("cd-secs");
    function pad2(n) { return (n < 10 ? "0" : "") + n; }
    function tickCountdown() {
      var diff = cdTarget - new Date();
      var d = 0, h = 0, m = 0, s = 0;
      if (diff > 0) {
        s = Math.floor(diff / 1000);
        d = Math.floor(s / 86400); s -= d * 86400;
        h = Math.floor(s / 3600); s -= h * 3600;
        m = Math.floor(s / 60); s -= m * 60;
      }
      cdD.textContent = d;
      cdH.textContent = pad2(h);
      cdM.textContent = pad2(m);
      cdS.textContent = pad2(s);
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* ---------- 3D tilt (cards) ---------- */
  var tiltEls = Array.prototype.slice.call(document.querySelectorAll(".tilt"));
  if (window.matchMedia("(pointer: fine)").matches && !prefersReduced) {
    tiltEls.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        if (!el.classList.contains("in")) return;
        if (!el.dataset.tiltOn) {
          el.dataset.tiltOn = "1";
          el.style.transition = "transform .16s ease-out";
        }
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(900px) rotateX(" + (-py * 5).toFixed(2) + "deg) rotateY(" + (px * 5).toFixed(2) + "deg)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transition = "transform .3s ease-out";
        el.style.transform = "";
        setTimeout(function () { el.style.transition = ""; }, 350);
      });
    });
  }

  /* ---------- Current year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
