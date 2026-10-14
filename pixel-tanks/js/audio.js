/* Pixel Tanks - audio chiptune gerado por codigo (WebAudio), sem arquivos */
(function (PT) {
  'use strict';

  var A = {
    ctx: null, master: null, sfxGain: null, musicGain: null,
    muted: false, ready: false, musicTimer: null, step: 0, nextTime: 0
  };

  A.init = function () {
    if (A.ready || A.failed) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) { A.failed = true; return; }
      A.ctx = new AC();
      A.master = A.ctx.createGain();
      A.master.gain.value = 0.5;
      A.master.connect(A.ctx.destination);

      A.sfxGain = A.ctx.createGain();
      A.sfxGain.gain.value = 0.9;
      A.sfxGain.connect(A.master);

      A.musicGain = A.ctx.createGain();
      A.musicGain.gain.value = 0.32;
      A.musicGain.connect(A.master);

      A.ready = true;
    } catch (e) {
      A.failed = true;
    }
  };

  A.resume = function () {
    A.init();
    if (A.ready && A.ctx.state === 'suspended') { try { A.ctx.resume(); } catch (e) { } }
  };

  A.toggle = function () {
    A.muted = !A.muted;
    if (A.ready) A.master.gain.value = A.muted ? 0 : 0.5;
    return !A.muted;
  };

  function tone(freq, dur, type, vol, slideTo, dest) {
    if (!A.ready || A.muted) return;
    var t = A.ctx.currentTime;
    var o = A.ctx.createOscillator();
    var g = A.ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol === undefined ? 0.22 : vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || A.sfxGain);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function noise(dur, vol, freq, q) {
    if (!A.ready || A.muted) return;
    var t = A.ctx.currentTime;
    var len = Math.max(1, Math.floor(A.ctx.sampleRate * dur));
    var buf = A.ctx.createBuffer(1, len, A.ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = A.ctx.createBufferSource();
    src.buffer = buf;
    var f = A.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(freq || 1400, t);
    f.Q.value = q || 1;
    var g = A.ctx.createGain();
    g.gain.setValueAtTime(vol === undefined ? 0.3 : vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(A.sfxGain);
    src.start(t);
  }

  // ------------------------------------------------------------- efeitos
  A.shoot = function () { tone(560, 0.09, 'square', 0.16, 180); };
  A.enemyShoot = function () { tone(340, 0.09, 'square', 0.10, 120); };
  A.bounce = function () { tone(1200, 0.06, 'square', 0.12, 700); };
  A.brick = function () { noise(0.12, 0.22, 2200, 1); };
  A.steelHit = function () { tone(260, 0.05, 'square', 0.10, 180); noise(0.05, 0.12, 3000); };
  A.explode = function () { noise(0.42, 0.42, 1100, 1); tone(140, 0.3, 'sawtooth', 0.14, 40); };
  A.bigExplode = function () { noise(0.7, 0.5, 800, 1); tone(90, 0.5, 'sawtooth', 0.18, 30); };
  A.pickup = function () {
    tone(660, 0.07, 'square', 0.16); setTimeout(function () { tone(880, 0.07, 'square', 0.16); }, 70);
    setTimeout(function () { tone(1320, 0.12, 'square', 0.16); }, 140);
  };
  A.spawn = function () { tone(200, 0.18, 'triangle', 0.14, 700); };
  A.menuMove = function () { tone(880, 0.04, 'square', 0.12); };
  A.menuPick = function () { tone(660, 0.05, 'square', 0.14); setTimeout(function () { tone(1100, 0.1, 'square', 0.14); }, 60); };
  A.menuBack = function () { tone(420, 0.08, 'square', 0.12, 260); };
  A.timeWarn = function () { tone(1040, 0.06, 'square', 0.12); setTimeout(function () { tone(1040, 0.06, 'square', 0.12); }, 130); };

  A.roundWin = function () {
    var n = [523, 659, 784, 1046];
    n.forEach(function (f, i) { setTimeout(function () { tone(f, 0.16, 'square', 0.18); }, i * 100); });
  };
  A.roundLose = function () {
    var n = [392, 330, 262];
    n.forEach(function (f, i) { setTimeout(function () { tone(f, 0.22, 'square', 0.16); }, i * 130); });
  };
  A.matchWin = function () {
    var n = [523, 659, 784, 1046, 784, 1046, 1318];
    n.forEach(function (f, i) { setTimeout(function () { tone(f, 0.2, 'square', 0.2); }, i * 120); });
  };
  A.gameOver = function () {
    var n = [440, 370, 294, 220, 165];
    n.forEach(function (f, i) { setTimeout(function () { tone(f, 0.3, 'triangle', 0.2); }, i * 180); });
  };
  A.waveClear = function () {
    var n = [784, 988, 1174];
    n.forEach(function (f, i) { setTimeout(function () { tone(f, 0.14, 'square', 0.16); }, i * 90); });
  };

  // ------------------------------------------------------------- musica
  // loop de 16 passos: baixo + arpejo + bateria
  var BASS = [110, 0, 110, 0, 82.4, 0, 82.4, 0, 65.4, 0, 65.4, 0, 98, 0, 98, 0];
  var ARP = [440, 523, 659, 523, 349, 440, 523, 440, 261, 329, 440, 329, 392, 494, 587, 494];
  var STEP_T = 0.125;

  A.startMusic = function () {
    A.init();
    if (!A.ready || A.musicTimer) return;
    A.step = 0;
    A.nextTime = A.ctx.currentTime + 0.1;
    A.musicTimer = setInterval(A._sched, 90);
  };

  A.stopMusic = function () {
    if (A.musicTimer) { clearInterval(A.musicTimer); A.musicTimer = null; }
  };

  A._sched = function () {
    if (!A.ready) return;
    // contexto suspenso (sem gesto do usuario): nao acumula notas
    if (A.muted || A.ctx.state !== 'running') { A.nextTime = A.ctx.currentTime + 0.05; return; }
    while (A.nextTime < A.ctx.currentTime + 0.6) {
      var s = A.step % 16;
      if (BASS[s]) A._note(BASS[s], 0.16, 'triangle', 0.5, A.nextTime);
      A._note(ARP[s] * 2, 0.07, 'square', 0.16, A.nextTime);
      if (s % 4 === 0) A._kick(A.nextTime);
      if (s % 4 === 2) A._hat(A.nextTime);
      A.nextTime += STEP_T;
      A.step++;
    }
  };

  A._note = function (freq, dur, type, vol, when) {
    var o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, when);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(vol, when + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    o.connect(g); g.connect(A.musicGain);
    o.start(when); o.stop(when + dur + 0.03);
  };

  A._kick = function (when) {
    var o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, when);
    o.frequency.exponentialRampToValueAtTime(45, when + 0.1);
    g.gain.setValueAtTime(0.55, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.12);
    o.connect(g); g.connect(A.musicGain);
    o.start(when); o.stop(when + 0.14);
  };

  A._hat = function (when) {
    var o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.type = 'square';
    o.frequency.setValueAtTime(7000, when);
    g.gain.setValueAtTime(0.06, when);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.05);
    o.connect(g); g.connect(A.musicGain);
    o.start(when); o.stop(when + 0.06);
  };

  PT.Audio = A;
})(window.PT = window.PT || {});
