/* FOGO CRUZADO - bootstrap: loop de 60 fps, mouse/teclado e paineis HTML */
(function (PT) {
  'use strict';

  function el(id) { return document.getElementById(id); }
  function set(id, text) {
    var e = el(id);
    if (e && e.textContent !== text) e.textContent = text;
  }

  function boot() {
    var canvas = el('screen');
    if (!canvas) return;

    PT.Tex.init();
    PT.Game.init(canvas);

    var held = {};
    var input = {
      p1: { up: false, down: false, left: false, right: false, fire: false, sprint: false, prone: false, grenade: false, smoke: false, aim: { x: PT.C.W / 2, y: PT.C.H / 2 } },
      p2: { up: false, down: false, left: false, right: false, fire: false, sprint: false, prone: false, grenade: false, smoke: false, autoAim: true }
    };
    var mouse = { x: PT.C.W / 2, y: PT.C.H / 2 };
    var G = PT.Game;

    // ---------------------------------------------------------- mouse
    function toCanvas(e) {
      var r = canvas.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width * PT.C.W;
      var y = (e.clientY - r.top) / r.height * PT.C.H;
      mouse.x = Math.max(0, Math.min(PT.C.W, x));
      mouse.y = Math.max(0, Math.min(PT.C.H, y));
      input.p1.aim.x = mouse.x;
      input.p1.aim.y = mouse.y;
    }

    canvas.addEventListener('mousemove', toCanvas);
    canvas.addEventListener('mousedown', function (e) {
      PT.Audio.resume();
      toCanvas(e);
      if (e.button === 0) input.p1.fire = true;
      if (e.button === 2) {
        G.orderPoint = { x: mouse.x, y: mouse.y };
      }
      if (e.button === 1) {
        G.p1Grenade = true;
      }
      e.preventDefault();
    });
    window.addEventListener('mouseup', function (e) {
      if (e.button === 0) input.p1.fire = false;
    });
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    // mira livre com o mouse no menu tambem
    canvas.addEventListener('mouseleave', function () { input.p1.fire = false; });

    // ----------------------------------------------------------- teclado
    var BLOCK = {
      ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1, Space: 1, Tab: 1,
      Enter: 1, NumpadEnter: 1, KeyR: 1, KeyC: 1, KeyZ: 1, KeyF: 1, KeyQ: 1, KeyE: 1
    };

    window.addEventListener('keydown', function (e) {
      PT.Audio.resume();
      if (BLOCK[e.code]) e.preventDefault();
      if (held[e.code]) return;
      held[e.code] = true;
      var code = e.code;

      // menu
      if (code === 'ArrowUp' || code === 'KeyW') G.menuUp = true;
      if (code === 'ArrowDown' || code === 'KeyS') G.menuDown = true;
      if (code === 'Enter' || code === 'Space' || code === 'NumpadEnter') {
        if (G.scene === 'menu') G.menuSelect = true;
        else if (G.over) G.uiEnter = true;
      }
      if (code === 'Escape') {
        if (G.scene === 'menu') G.menuBack = true;
        else if (G.over) G.uiEnter = true;
        else G.paused = !G.paused;
      }
      if (code === 'KeyP' && G.scene === 'game' && !G.over) G.paused = !G.paused;
      if (code === 'KeyM') G.toggleMute();
      if (code === 'KeyF') toggleFullscreen();

      // ordens do esquadrao
      if (code === 'KeyE') G.orderFollow = true;
      if (code === 'KeyQ') G.orderHold = true;
      if (code === 'KeyR' && G.control) G.reloadRequest = true;

      // troca de soldado
      if (code === 'Digit1') G.swapTo = 0;
      if (code === 'Digit2') G.swapTo = 1;
      if (code === 'Digit3') G.swapTo = 2;
      if (code === 'Digit4') G.swapTo = 3;
    });

    window.addEventListener('keyup', function (e) {
      held[e.code] = false;
    });
    window.addEventListener('blur', function () { G.autoPause(); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) G.autoPause();
    });

    var btnSound = el('btn-sound');
    if (btnSound) btnSound.addEventListener('click', function () {
      PT.Audio.resume();
      G.toggleMute();
    });
    var btnFs = el('btn-full');
    if (btnFs) btnFs.addEventListener('click', toggleFullscreen);

    function toggleFullscreen() {
      var root = document.documentElement;
      var fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (fs) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      else if (root.requestFullscreen || root.webkitRequestFullscreen) {
        (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
      }
    }

    // ------------------------------------------------------------- loop
    var last = 0, acc = 0, STEP = 1000 / 60, domCache = {};

    function syncInput() {
      input.p1.up = !!(held.KeyW);
      input.p1.down = !!(held.KeyS);
      input.p1.left = !!(held.KeyA);
      input.p1.right = !!(held.KeyD);
      input.p1.sprint = !!(held.ShiftLeft);
      input.p1.prone = !!(held.KeyZ);
      input.p1.grenade = !!(held.Space);
      input.p1.smoke = !!(held.KeyF) ? false : !!(held.KeyX);
      input.p2.up = !!(held.ArrowUp);
      input.p2.down = !!(held.ArrowDown);
      input.p2.left = !!(held.ArrowLeft);
      input.p2.right = !!(held.ArrowRight);
      input.p2.fire = !!(held.Enter) || !!(held.NumpadEnter) || !!(held.ShiftRight);
      input.p2.grenade = !!(held.ControlRight);
      input.p2.sprint = !!(held.ShiftRight);
      G.setInput(input.p1, input.p2, mouse);
    }

    function updateDom() {
      var h = G.hudInfo();
      set('t-map', h.map);
      set('t-mode', h.modeLabel);
      set('t-status', h.status);
      set('t-objective', h.objective);
      set('t-time', h.time);
      set('t-enemies', String(h.enemies));
      set('t-kills', String(h.kills));
      set('t-acc', h.accuracy + '%');
      set('t-score', String(h.score));
      set('t-gren', String(h.grenades));
      set('t-smoke', String(h.smokes));

      // esquadrao
      var rows = h.squad || [];
      for (var i = 0; i < 4; i++) {
        var u = rows[i];
        var rowEl = el('sq-' + i);
        if (!rowEl) continue;
        if (!u) { rowEl.className = 'sq-row empty'; continue; }
        rowEl.className = 'sq-row' + (u.controlled ? ' active' : '') + (u.dead ? ' dead' : '') + (u.downed ? ' down' : '');
        set('sq-' + i + '-name', u.slot + '. ' + u.name);
        set('sq-' + i + '-hp', u.dead ? '—' : u.hp + '/' + u.maxHp);
        set('sq-' + i + '-w', u.weapon + '  ' + (u.mag) + '/' + u.magSize);
        set('sq-' + i + '-st', u.state);
        var bar = el('sq-' + i + '-bar');
        if (bar) bar.style.width = (u.dead ? 0 : Math.max(0, Math.min(1, u.hp / u.maxHp)) * 100) + '%';
      }

      var feedEl = el('feed');
      if (feedEl) {
        var want = (h.feed || []).map(function (f) { return f.text + '|' + f.color; }).join(';');
        if (domCache.feed !== want) {
          domCache.feed = want;
          feedEl.innerHTML = '';
          (h.feed || []).forEach(function (f) {
            var li = document.createElement('li');
            li.textContent = f.text;
            li.style.color = f.color;
            feedEl.appendChild(li);
          });
        }
      }
      document.body.classList.toggle('alert', !!h.alert);
      if (domCache.muted !== h.muted) {
        domCache.muted = h.muted;
        var b = el('btn-sound');
        if (b) b.textContent = h.muted ? 'SOM: OFF' : 'SOM: ON';
      }
    }

    function loop(ts) {
      requestAnimationFrame(loop);
      if (!last) last = ts;
      var dt = Math.min(ts - last, 150);
      last = ts;
      syncInput();
      // pedido de recarga
      if (G.reloadRequest) {
        if (G.control && G.control.mag < G.control.wdef.mag) G.control.reloading = G.control.wdef.reload;
        G.reloadRequest = false;
      }
      acc += dt;
      var guard = 0;
      while (acc >= STEP && guard < 5) {
        G.update(STEP / 1000);
        acc -= STEP;
        guard++;
      }
      if (acc > STEP * 6) acc = 0;
      G.render();
      updateDom();
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.PT = window.PT || {});
