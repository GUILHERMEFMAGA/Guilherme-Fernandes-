/* Pixel Tanks - bootstrap: loop, teclado e placar em HTML */
(function (PT) {
  'use strict';

  function set(id, text) {
    var el = document.getElementById(id);
    if (el && el.textContent !== text) el.textContent = text;
  }

  function boot() {
    var canvas = document.getElementById('screen');
    if (!canvas) return;

    PT.Sprites.init();
    PT.Game.init(canvas);

    var last = 0, acc = 0, STEP = 1000 / 60, dom = {};

    function updateDom() {
      var h = PT.Game.hudInfo();
      set('t-mode', h.modeLabel);
      set('t-map', h.map);
      set('t-status', h.status);
      set('p1-name', h.p1.name);
      set('p1-lives', h.p1.lives);
      set('p1-score', h.p1.score);
      set('p1-wins', h.p1.wins);
      set('p2-name', h.p2.name);
      set('p2-lives', h.p2.lives);
      set('p2-score', h.p2.score);
      set('p2-wins', h.p2.wins);
      set('t-score', h.scoreText);
      set('t-hi', h.hiText);
      set('t-wave', h.waveText);
      document.body.classList.toggle('is-paused', !!h.paused && h.scene === 'game');
      if (dom.muted !== h.muted) {
        dom.muted = h.muted;
        var btn = document.getElementById('btn-sound');
        if (btn) btn.textContent = h.muted ? 'SOM: OFF' : 'SOM: ON';
      }
    }

    function loop(ts) {
      requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(ts - last, 150);
      last = ts;
      acc += dt;
      var guard = 0;
      while (acc >= STEP && guard < 5) { PT.Game.update(); acc -= STEP; guard++; }
      if (acc > STEP * 5) acc = 0;
      PT.Game.render();
      updateDom();
    }
    requestAnimationFrame(loop);

    // --------------------------------------------------------------- input
    var BLOCK = {
      ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, Space: 1,
      Enter: 1, Backspace: 1, NumpadEnter: 1
    };

    window.addEventListener('keydown', function (e) {
      PT.Audio.resume();
      if (BLOCK[e.code]) e.preventDefault();
      PT.Game.keyDown(e.code);
      if (e.code === 'KeyF') toggleFullscreen();
    }, { passive: false });

    window.addEventListener('keyup', function (e) {
      PT.Game.keyUp(e.code);
    });

    window.addEventListener('blur', function () {
      PT.Game.autoPause();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) PT.Game.autoPause();
    });

    // botoes
    var btnSound = document.getElementById('btn-sound');
    if (btnSound) btnSound.addEventListener('click', function () {
      PT.Audio.resume();
      PT.Game.toggleMute();
    });

    var btnFs = document.getElementById('btn-full');
    if (btnFs) btnFs.addEventListener('click', toggleFullscreen);

    function toggleFullscreen() {
      var el = document.documentElement;
      var fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (fs) {
        (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else if (el.requestFullscreen || el.webkitRequestFullscreen) {
        (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
      }
    }

    // clique/toque no canvas libera o audio
    canvas.addEventListener('pointerdown', function () { PT.Audio.resume(); });

    // trava de rolagem no espaco
    window.addEventListener('contextmenu', function (e) {
      if (e.target === canvas) e.preventDefault();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.PT = window.PT || {});
