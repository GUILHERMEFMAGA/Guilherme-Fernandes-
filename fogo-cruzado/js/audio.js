/* FOGO CRUZADO - audio sintetizado: tiros, impactos, explosoes e ambiente */
(function (PT) {
  'use strict';

  var A = {
    ctx: null, master: null, sfx: null, amb: null,
    ready: false, failed: false, muted: false,
    ambNodes: null, ambTimer: 0
  };

  A.init = function () {
    if (A.ready || A.failed) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { A.failed = true; return; }
      A.ctx = new AC();
      A.master = A.ctx.createGain();
      A.master.gain.value = 0.55;
      A.master.connect(A.ctx.destination);
      A.sfx = A.ctx.createGain();
      A.sfx.gain.value = 1;
      A.sfx.connect(A.master);
      A.amb = A.ctx.createGain();
      A.amb.gain.value = 0.0;
      A.amb.connect(A.master);
      A.ready = true;
    } catch (e) { A.failed = true; }
  };

  A.resume = function () {
    A.init();
    if (A.ready && A.ctx.state === 'suspended') { try { A.ctx.resume(); } catch (e) { } }
  };

  A.toggle = function () {
    A.muted = !A.muted;
    if (A.ready) A.master.gain.value = A.muted ? 0 : 0.55;
    return !A.muted;
  };

  function now() { return A.ctx.currentTime; }

  function noiseBuffer(dur) {
    var len = Math.max(1, Math.floor(A.ctx.sampleRate * dur));
    var buf = A.ctx.createBuffer(1, len, A.ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** rajada de ruido filtrado */
  function noiseHit(dur, vol, type, freq, q, when, dest) {
    if (!A.ready || A.muted) return;
    when = when || now();
    var src = A.ctx.createBufferSource();
    src.buffer = noiseBuffer(dur);
    var f = A.ctx.createBiquadFilter();
    f.type = type || 'lowpass';
    f.frequency.setValueAtTime(freq, when);
    f.Q.value = q || 1;
    var g = A.ctx.createGain();
    g.gain.setValueAtTime(vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(f); f.connect(g); g.connect(dest || A.sfx);
    src.start(when);
    src.stop(when + dur + 0.02);
    return { src: src, filter: f, gain: g };
  }

  function tone(freq, dur, type, vol, slideTo, when, dest) {
    if (!A.ready || A.muted) return;
    when = when || now();
    var o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, when);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), when + dur);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g); g.connect(dest || A.sfx);
    o.start(when); o.stop(when + dur + 0.02);
  }

  // --------------------------------------------------------------- disparos
  var LAST_GUN = {};

  /** tiro de arma: dist em pixels (0 = ao lado do jogador) */
  A.gunshot = function (type, dist) {
    A.init();
    if (!A.ready || A.muted) return;
    dist = dist || 0;
    var t = now();
    var near = A.U1 ? 1 : 1; // compatibilidade
    var att = Math.max(0.06, 1 - dist / 900);
    var lp = dist < 120 ? 5200 : (dist < 400 ? 3200 : 1400);
    if (type === 'dmr') {
      noiseHit(0.10, 0.55 * att, 'bandpass', 2200 * Math.max(0.4, att), 1.1, t);
      noiseHit(0.42, 0.32 * att, 'lowpass', lp * 0.8, 0.9, t + 0.004);
      tone(180, 0.30, 'triangle', 0.28 * att, 55, t);
    } else if (type === 'smg') {
      noiseHit(0.055, 0.34 * att, 'bandpass', 2600 * Math.max(0.5, att), 1.2, t);
      noiseHit(0.20, 0.22 * att, 'lowpass', lp, 0.8, t + 0.003);
      tone(200, 0.10, 'square', 0.14 * att, 90, t);
    } else {
      noiseHit(0.07, 0.44 * att, 'bandpass', 2400 * Math.max(0.5, att), 1.1, t);
      noiseHit(0.30, 0.28 * att, 'lowpass', lp, 0.85, t + 0.003);
      tone(190, 0.16, 'triangle', 0.2 * att, 70, t);
    }
    // eco distante
    if (dist > 260) {
      var dz = t + 0.06 + dist / 3800;
      noiseHit(0.5, 0.16 * att, 'lowpass', 700, 0.7, dz);
    }
    // limite de tiros simultaneos por tipo
    LAST_GUN[type] = t;
  };

  /** estalo supersônico de bala passando perto */
  A.crack = function (dist) {
    A.init();
    if (!A.ready || A.muted) return;
    var att = Math.max(0.05, 1 - dist / 160);
    if (att < 0.09) return;
    var t = now();
    noiseHit(0.035, 0.5 * att, 'highpass', 3000, 1, t);
    tone(1800, 0.05, 'sawtooth', 0.16 * att, 500, t);
  };

  A.ricochet = function (dist) {
    A.init();
    if (!A.ready || A.muted) return;
    var att = Math.max(0.08, 1 - (dist || 0) / 700);
    var t = now();
    tone(2300 + Math.random() * 900, 0.22, 'sawtooth', 0.12 * att, 600, t);
    noiseHit(0.06, 0.14 * att, 'highpass', 4000, 1, t);
  };

  A.impact = function (mat, dist) {
    A.init();
    if (!A.ready || A.muted) return;
    var att = Math.max(0.08, 1 - (dist || 0) / 600);
    var t = now();
    if (mat === 'wood') {
      noiseHit(0.09, 0.22 * att, 'bandpass', 1500, 1.2, t);
      tone(320, 0.08, 'triangle', 0.08 * att, 160, t);
    } else if (mat === 'dirt' || mat === 'grass') {
      noiseHit(0.11, 0.16 * att, 'lowpass', 900, 0.8, t);
    } else {
      noiseHit(0.06, 0.24 * att, 'highpass', 2200, 1, t);
      tone(700, 0.05, 'square', 0.06 * att, 300, t);
    }
  };

  A.hitFlesh = function (dist) {
    A.init();
    if (!A.ready || A.muted) return;
    var att = Math.max(0.1, 1 - (dist || 0) / 600);
    var t = now();
    noiseHit(0.10, 0.3 * att, 'lowpass', 620, 0.8, t);
    tone(120, 0.10, 'sine', 0.12 * att, 60, t);
  };

  A.grenade = function (dist) {
    A.init();
    if (!A.ready || A.muted) return;
    var att = Math.max(0.1, 1 - (dist || 0) / 1200);
    var t = now();
    noiseHit(0.9, 0.55 * att, 'lowpass', 900, 0.7, t);
    noiseHit(0.25, 0.4 * att, 'highpass', 1800, 1, t);
    tone(95, 0.7, 'sine', 0.34 * att, 28, t);
    for (var i = 0; i < 5; i++) {
      noiseHit(0.05, 0.1 * att, 'highpass', 3000, 1, t + 0.15 + Math.random() * 0.7);
    }
  };

  A.smokeOut = function () {
    A.init();
    if (!A.ready || A.muted) return;
    var t = now();
    noiseHit(1.6, 0.2, 'bandpass', 3200, 0.6, t);
    noiseHit(2.4, 0.12, 'lowpass', 900, 0.6, t + 0.4);
  };

  A.reload = function () {
    A.init();
    if (!A.ready || A.muted) return;
    var t = now();
    noiseHit(0.05, 0.3, 'bandpass', 2400, 1.4, t);
    noiseHit(0.06, 0.34, 'bandpass', 1800, 1.2, t + 0.22);
    noiseHit(0.05, 0.28, 'bandpass', 2600, 1.4, t + 0.5);
  };

  A.dry = function () {
    A.init();
    if (!A.ready || A.muted) return;
    noiseHit(0.04, 0.24, 'bandpass', 3000, 1.6, now());
  };

  A.footstep = function (hard) {
    A.init();
    if (!A.ready || A.muted) return;
    noiseHit(0.05, hard ? 0.10 : 0.06, 'lowpass', hard ? 1200 : 700, 0.8, now());
  };

  A.radio = function (kind) {
    A.init();
    if (!A.ready || A.muted) return;
    var t = now();
    noiseHit(0.14, 0.12, 'bandpass', 1800, 0.9, t);
    if (kind === 'up') tone(880, 0.05, 'square', 0.05, 1200, t);
    else if (kind === 'down') tone(600, 0.06, 'square', 0.05, 380, t);
  };

  A.objective = function () {
    A.init();
    if (!A.ready || A.muted) return;
    var t = now();
    [660, 880, 1180].forEach(function (f, i) { tone(f, 0.14, 'triangle', 0.12, null, t + i * 0.11); });
  };

  A.fail = function () {
    A.init();
    if (!A.ready || A.muted) return;
    var t = now();
    [420, 330, 262, 196].forEach(function (f, i) { tone(f, 0.28, 'triangle', 0.14, null, t + i * 0.16); });
  };

  // -------------------------------------------------------------- ambiente
  A.startAmbience = function () {
    A.init();
    if (!A.ready || A.ambNodes) return;
    var src = A.ctx.createBufferSource();
    src.buffer = noiseBuffer(4);
    src.loop = true;
    var f = A.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 420;
    var g = A.ctx.createGain();
    g.gain.value = 0.5;
    src.connect(f); f.connect(g); g.connect(A.amb);
    src.start();
    A.ambNodes = { src: src, g: g };
    if (A.amb.gain) A.amb.gain.setTargetAtTime(0.5, now(), 1.2);
  };

  A.stopAmbience = function () {
    if (A.ready && A.amb.gain) A.amb.gain.setTargetAtTime(0.0, now(), 0.6);
  };

  /** tiros distantes aleatorios para dar clima */
  A.updateAmbience = function () {
    if (!A.ready || A.muted) return;
    A.ambTimer -= 1;
    if (A.ambTimer > 0) return;
    A.ambTimer = 180 + Math.random() * 420;
    var kind = Math.random() < 0.7 ? 'rifle' : (Math.random() < 0.6 ? 'smg' : 'dmr');
    var t = now() + Math.random() * 0.5;
    noiseHit(0.3, 0.05, 'lowpass', 500, 0.7, t, A.amb);
    if (Math.random() < 0.25) {
      noiseHit(0.7, 0.045, 'lowpass', 260, 0.6, t + 0.4, A.amb);
    }
  };

  PT.Audio = A;
})(window.PT = window.PT || {});
