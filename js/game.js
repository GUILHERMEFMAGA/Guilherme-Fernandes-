'use strict';
/* =====================================================================
   MOTO EXPRESS v2 — Simulador de moto realista (entregas urbanas)
   Pseudo-3D canvas, física baseada em potência/arrasto, câmbio manual,
   combustível, chuva, radar, trânsito mão-dupla com IA, painel analógico.
   ===================================================================== */

/* ------------------------- Constantes -------------------------------- */
const VW = 1280, VH = 720;
const SEG_LEN = 200, RUMBLE_LEN = 3;
const ROAD_W = 1750;
const LANES = 4;                    // 2 por sentido (mão dupla)
const LANE_N = [-0.75, -0.25, 0.25, 0.75];
const CAM_H = 1000, FOV = 100;
const CAM_D = 1 / Math.tan((FOV / 2) * Math.PI / 180);
const DRAW_DIST = 250;
const FOG_DENSITY = 5.5;
const UNITS_PER_M = 40;             // 1 m = 40 unidades → SEG_LEN = 5 m
const PLAYER_NW = 0.30;
const BIKE_Z_UNITS = 2400;
const DAY_LEN = 240;
const CYCLE_START = 0.30;
const STEP = 1 / 60;
const SPEED_LIMIT = 60;             // km/h na cidade
const G = 9.81;

const kmhOf = (u) => (u / UNITS_PER_M) * 3.6;
const uOfKmh = (k) => (k / 3.6) * UNITS_PER_M;

/* ------------------------- Utilidades ---------------------------------- */
const U = {
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
  lerp: (a, b, p) => a + (b - a) * p,
  easeIn: (a, b, p) => a + (b - a) * p * p,
  easeOut: (a, b, p) => a + (b - a) * (1 - (1 - p) * (1 - p)),
  easeInOut: (a, b, p) => a + (b - a) * (-Math.cos(p * Math.PI) / 2 + 0.5),
  overlap: (x1, w1, x2, w2, p) => Math.abs(x1 - x2) < ((w1 + w2) / 2) * (p === undefined ? 1 : p),
  randInt: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  choice: (arr) => arr[Math.floor(Math.random() * arr.length)],
  fmtMoney: (v) => 'R$ ' + Math.round(v),
  fmtMoney2: (v) => 'R$ ' + v.toFixed(2).replace('.', ','),
  fmtDist: (m) => (m >= 1000 ? (m / 1000).toFixed(1).replace('.', ',') + ' km' : Math.round(m) + ' m'),
};
function hex2rgb(h) {
  if (h.charCodeAt(0) === 35) return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const m = h.match(/(\d+)/g);
  return m ? [+m[0], +m[1], +m[2]] : [0, 0, 0];
}
function lerpColor(c1, c2, p) {
  const a = hex2rgb(c1), b = hex2rgb(c2);
  return 'rgb(' + Math.round(U.lerp(a[0], b[0], p)) + ',' + Math.round(U.lerp(a[1], b[1], p)) + ',' + Math.round(U.lerp(a[2], b[2], p)) + ')';
}
function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function rrFill(ctx, x, y, w, h, r, col) { ctx.fillStyle = col; rr(ctx, x, y, w, h, r); ctx.fill(); }

/* ------------------------- Motos (ficha técnica aprox.) ---------------- */
const BIKES = [
  { key: 'biz', name: 'Honda Biz 125', cls: 'Utilitária', cyl: 1, style: 'biz',
    hp: 10.9, mass: 103, top: 103, gears: [0.36, 0.58, 0.79, 1.0], redline: 8200, idle: 1350,
    tank: 5.1, kmL: 52, drag: 0.42, c1: '#e8e8ec', c2: '#c9271f', box: false, unlock: 0 },
  { key: 'cg', name: 'Honda CG 160 Titan', cls: 'Trabalho braçal', cyl: 1, style: 'naked',
    hp: 15.1, mass: 135, top: 124, gears: [0.32, 0.52, 0.70, 0.86, 1.0], redline: 9000, idle: 1300,
    tank: 16, kmL: 35, drag: 0.5, c1: '#c62828', c2: '#7d1414', box: true, unlock: 0 },
  { key: 'fazer', name: 'Yamaha Fazer 250', cls: 'Street', cyl: 1, style: 'naked',
    hp: 20.9, mass: 153, top: 143, gears: [0.31, 0.50, 0.67, 0.83, 1.0], redline: 10000, idle: 1300,
    tank: 14, kmL: 30, drag: 0.52, c1: '#1c4f9c', c2: '#123366', box: true, unlock: 5 },
  { key: 'cb500', name: 'Honda CB 500F', cls: 'Bicilíndrica', cyl: 2, style: 'naked',
    hp: 52, mass: 189, top: 180, gears: [0.28, 0.46, 0.62, 0.76, 0.9, 1.0], redline: 10000, idle: 1200,
    tank: 17.1, kmL: 24, drag: 0.56, c1: '#0f6e2c', c2: '#0a4a1e', box: true, unlock: 10 },
  { key: 's1000', name: 'BMW S1000RR', cls: 'Superesportiva', cyl: 4, style: 'fairing',
    hp: 210, mass: 197, top: 299, gears: [0.27, 0.44, 0.59, 0.72, 0.84, 1.0], redline: 14000, idle: 1150,
    tank: 16.5, kmL: 13, drag: 0.72, c1: '#eef1f5', c2: '#1d2733', box: false, unlock: 16 },
];
const PRICES = { fuelG: 6.19, fuelA: 3.99 };

/* ------------------------- Configurações de simulação ------------------- */
const SIM_DEFAULT = { manual: true, fuel: true, weather: true, twoWay: true, radar: true, damage: true };
let SIM = Object.assign({}, SIM_DEFAULT);
try { const s = JSON.parse(localStorage.getItem('motox.sim') || 'null'); if (s) SIM = Object.assign(SIM, s); } catch (e) {}
function saveSim() { try { localStorage.setItem('motox.sim', JSON.stringify(SIM)); } catch (e) {} }
const maxDeliv = () => parseInt(localStorage.getItem('motox.maxdeliv') || '0', 10);
function bikeUnlocked(b) { return maxDeliv() >= b.unlock; }

/* ------------------------- Áudio (WebAudio realista) -------------------- */
class Sound {
  constructor() { this.ctx = null; this.ok = true; this.enabled = true; this.phase = 0; }
  init() {
    if (this.ctx || !this.ok) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { this.ok = false; return; }
    try { this.ctx = new AC(); } catch (e) { this.ok = false; return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = 0.5; this.master.connect(c.destination);
    const len = c.sampleRate * 2;
    this.noiseBuf = c.createBuffer(1, len, c.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // ---- motor: base (pulso de ignição) + buzz harmônico + sub
    this.engGain = c.createGain(); this.engGain.gain.value = 0;
    this.thrum = c.createGain(); this.thrum.gain.value = 1;      // amplitude de "potência"
    this.engFilter = c.createBiquadFilter(); this.engFilter.type = 'lowpass'; this.engFilter.frequency.value = 800;
    this.oscBase = c.createOscillator(); this.oscBase.type = 'sawtooth';
    this.oscBuzz = c.createOscillator(); this.oscBuzz.type = 'square';
    this.buzzG = c.createGain(); this.buzzG.gain.value = 0.32;
    this.oscSub = c.createOscillator(); this.oscSub.type = 'triangle';
    this.subG = c.createGain(); this.subG.gain.value = 0.4;
    this.oscBase.connect(this.thrum); this.oscBuzz.connect(this.buzzG); this.buzzG.connect(this.thrum);
    this.oscSub.connect(this.subG); this.subG.connect(this.thrum);
    this.thrum.connect(this.engFilter); this.engFilter.connect(this.engGain); this.engGain.connect(this.master);
    this.oscBase.start(); this.oscBuzz.start(); this.oscSub.start();

    // ---- admissão de ar
    this.intake = c.createBufferSource(); this.intake.buffer = this.noiseBuf; this.intake.loop = true;
    this.intakeF = c.createBiquadFilter(); this.intakeF.type = 'bandpass'; this.intakeF.frequency.value = 1300; this.intakeF.Q.value = 0.8;
    this.intakeG = c.createGain(); this.intakeG.gain.value = 0;
    this.intake.connect(this.intakeF); this.intakeF.connect(this.intakeG); this.intakeG.connect(this.master);
    this.intake.start();

    // ---- vento
    this.wind = c.createBufferSource(); this.wind.buffer = this.noiseBuf; this.wind.loop = true;
    this.windF = c.createBiquadFilter(); this.windF.type = 'bandpass'; this.windF.frequency.value = 850; this.windF.Q.value = 0.5;
    this.windG = c.createGain(); this.windG.gain.value = 0;
    this.wind.connect(this.windF); this.windF.connect(this.windG); this.windG.connect(this.master);
    this.wind.start();

    // ---- chuva
    this.rain = c.createBufferSource(); this.rain.buffer = this.noiseBuf; this.rain.loop = true;
    this.rainF = c.createBiquadFilter(); this.rainF.type = 'highpass'; this.rainF.frequency.value = 2200;
    this.rainG = c.createGain(); this.rainG.gain.value = 0;
    this.rain.connect(this.rainF); this.rainF.connect(this.rainG); this.rainG.connect(this.master);
    this.rain.start();
  }
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }
  toggle() { this.enabled = !this.enabled; if (this.master) this.master.gain.value = this.enabled ? 0.5 : 0; return this.enabled; }
  update(dt, st) {
    if (!this.ctx) return;
    const c = this.ctx, t = c.currentTime;
    if (!this.enabled) return;
    const running = st.running && st.playing;
    // frequência de ignição: 4 tempos → exploções/s = rpm/60 * cilindros
    const firing = running ? (st.rpm / 60) * st.cyl : 0;
    this.phase += dt * firing;
    if (this.phase > 1) this.phase %= 1;
    // "thump": envelope por pulso (dente de serra com decaimento)
    const depth = st.cyl === 1 ? 0.55 : st.cyl === 2 ? 0.3 : 0.12;
    const env = running ? (1 - this.phase) * depth + (1 - depth) : 0;
    const misfire = st.damage > 25 && Math.random() < 0.06 * (st.damage / 100) ? 0.25 : 1;
    this.thrum.gain.setTargetAtTime(env * misfire, t, 0.02);
    if (running) {
      const f = U.clamp(firing, 10, 400);
      this.oscBase.frequency.setTargetAtTime(f, t, 0.03);
      this.oscBuzz.frequency.setTargetAtTime(f * 1.5, t, 0.03);
      this.oscSub.frequency.setTargetAtTime(f * 0.5, t, 0.05);
      this.engFilter.frequency.setTargetAtTime(500 + st.throttle * 2400 + st.rpm * 0.16, t, 0.05);
    }
    const cut = st.limiter ? (0.25 + 0.5 * Math.abs(Math.sin(this.phase * 31))) : 1;
    this.engGain.gain.setTargetAtTime(running ? (0.075 + st.throttle * 0.075 + (st.rpm / st.redline) * 0.085) * cut : 0, t, 0.05);
    this.intakeG.gain.setTargetAtTime(running ? st.throttle * 0.028 : 0, t, 0.06);
    this.windG.gain.setTargetAtTime(st.playing ? st.speedPct * st.speedPct * 0.06 : 0, t, 0.15);
    this.rainG.gain.setTargetAtTime(st.rain && st.playing ? 0.05 : 0, t, 0.4);
  }
  clunk() {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 350;
    const g = c.createGain(); g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.1);
  }
  starter() {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(); o.type = 'square';
    o.frequency.setValueAtTime(70, t);
    const lfo = c.createOscillator(); lfo.frequency.value = 17;
    const lfoG = c.createGain(); lfoG.gain.value = 22;
    lfo.connect(lfoG); lfoG.connect(o.frequency);
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
    const g = c.createGain(); g.gain.setValueAtTime(0.2, t); g.gain.setValueAtTime(0.2, t + 0.5); g.gain.exponentialRampToValueAtTime(0.001, t + 0.62);
    o.connect(f); f.connect(g); g.connect(this.master);
    o.start(t); lfo.start(t); o.stop(t + 0.65); lfo.stop(t + 0.65);
  }
  horn() {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
    o.type = 'square'; o2.type = 'square'; o.frequency.value = 400; o2.frequency.value = 505;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
    g.gain.setTargetAtTime(0.0001, t + 0.24, 0.03);
    o.connect(g); o2.connect(g); g.connect(this.master);
    o.start(t); o2.start(t); o.stop(t + 0.4); o2.stop(t + 0.4);
  }
  crash(big) {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(big ? 3000 : 1800, t); f.frequency.exponentialRampToValueAtTime(120, t + 0.4);
    const g = c.createGain();
    g.gain.setValueAtTime(big ? 0.55 : 0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + (big ? 0.7 : 0.4));
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.8);
    if (big) this.clunk();
  }
  ding(freq, dur, vol) {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'triangle'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.05);
  }
  delivered() { if (!this.ctx || !this.enabled) return; [660, 880, 1100].forEach((f, i) => setTimeout(() => this.ding(f, 0.2, 0.2), i * 90)); }
  tick() { this.ding(2100, 0.03, 0.05); }
}
const SFX = new Sound();

/* ------------------------- Sprites procedurais -------------------------- */
const SPR = {};
function makeSprite(key, cw, ch, worldW, front, draw) {
  const cv = document.createElement('canvas');
  cv.width = cw; cv.height = ch;
  draw(cv.getContext('2d'), cw, ch);
  SPR[key] = { canvas: cv, w: worldW, front: !!front };
}
const CAR_COLORS = [
  ['#e0e1e6', '#c9cbd2'], ['#2b2d33', '#191a1f'], ['#d23a2a', '#a32a1e'],
  ['#2e6fd2', '#23539c'], ['#e8b62a', '#c2951a'], ['#3aa05e', '#2b7c48'], ['#7a4db0', '#5d3889'],
];
const CAR_WW = { moto: 420, hatch: 850, pickup: 950, truck: 1000, bus: 1000 };

function drawCarSprite(ctx, w, h, body, dark, type, front) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#666b73'); g.addColorStop(1, '#3a3e44');
  ctx.fillStyle = g;
  ctx.fillRect(4, h - 12, 26, 12); ctx.fillRect(w - 30, h - 12, 26, 12);
  if (type === 'moto') {
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(w / 2, h - 6, w * 0.30, h * 0.05, 0, 0, 7); ctx.fill();
    rrFill(ctx, w * 0.42, front ? h * 0.60 : h * 0.62, w * 0.16, h * 0.34, 6, '#191a1d');
    rrFill(ctx, w * 0.30, h * 0.42, w * 0.40, h * 0.22, 8, body);
    rrFill(ctx, w * 0.36, h * 0.06, w * 0.28, h * 0.36, 8, '#33415c');
    ctx.fillStyle = '#ffd21f'; ctx.fillRect(w * 0.38, h * 0.18, w * 0.24, h * 0.05);
    rrFill(ctx, w * 0.40, 0, w * 0.20, h * 0.13, 7, '#e8e8e8');
    if (front) { ctx.fillStyle = '#fff6c8'; ctx.beginPath(); ctx.arc(w / 2, h * 0.5, 7, 0, 7); ctx.fill(); }
    else { ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.46, h * 0.5, w * 0.08, h * 0.05); }
    return;
  }
  if (type === 'hatch') {
    rrFill(ctx, w * 0.18, h * 0.05, w * 0.64, h * 0.30, 10, body);
    ctx.fillStyle = '#1c2126'; rr(ctx, w * 0.24, h * 0.09, w * 0.52, front ? h * 0.13 : h * 0.17, 5); ctx.fill();
    rrFill(ctx, w * 0.06, h * 0.30, w * 0.88, h * 0.48, 12, body);
    rrFill(ctx, w * 0.10, h * 0.55, w * 0.80, h * 0.14, 4, dark);
    rrFill(ctx, w * 0.38, h * 0.44, w * 0.24, h * 0.10, 2, front ? '#c9ced4' : '#e6e2d6');
    ctx.fillStyle = front ? '#fff2b8' : '#ff3434';
    rr(ctx, w * 0.10, h * 0.40, w * 0.13, h * 0.09, 3); ctx.fill();
    rr(ctx, w * 0.77, h * 0.40, w * 0.13, h * 0.09, 3); ctx.fill();
    if (front) { ctx.fillStyle = '#fffdf0'; rr(ctx, w * 0.105, h * 0.405, w * 0.11, h * 0.04, 2); ctx.fill(); }
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.20, h - 10, w * 0.16, 10); ctx.fillRect(w * 0.64, h - 10, w * 0.16, 10);
    ctx.fillStyle = '#c9ced4'; ctx.fillRect(w * 0.30, h * 0.66, w * 0.05, h * 0.06); ctx.fillRect(w * 0.65, h * 0.66, w * 0.05, h * 0.06);
  } else if (type === 'pickup') {
    rrFill(ctx, w * 0.10, h * 0.10, w * 0.40, h * 0.28, 8, body);
    ctx.fillStyle = '#1c2126'; rr(ctx, w * 0.15, h * 0.14, w * 0.30, h * 0.16, 4); ctx.fill();
    rrFill(ctx, w * 0.06, h * 0.36, w * 0.88, h * 0.44, 10, body);
    ctx.fillStyle = dark; ctx.fillRect(w * 0.52, h * 0.40, w * 0.40, h * 0.24);
    ctx.fillStyle = front ? '#fff2b8' : '#ff3434'; ctx.fillRect(w * 0.07, h * 0.48, w * 0.05, h * 0.10); ctx.fillRect(w * 0.88, h * 0.48, w * 0.05, h * 0.10);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.14, h - 10, w * 0.18, 10); ctx.fillRect(w * 0.66, h - 10, w * 0.18, 10);
  } else if (type === 'truck') {
    ctx.fillStyle = '#4c4f55'; rr(ctx, w * 0.12, h - 16, w * 0.76, 14, 4); ctx.fill();
    rrFill(ctx, w * 0.08, h * 0.04, w * 0.84, h * 0.72, 8, body);
    ctx.strokeStyle = dark; ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.10, h * 0.08, w * 0.80, h * 0.64);
    ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.06); ctx.lineTo(w * 0.5, h * 0.74); ctx.stroke();
    ctx.fillStyle = '#d8d5cc'; ctx.fillRect(w * 0.10, h * 0.70, w * 0.80, h * 0.05);
    ctx.fillStyle = front ? '#fff2b8' : '#ff3434'; ctx.fillRect(w * 0.10, h * 0.60, w * 0.07, h * 0.08); ctx.fillRect(w * 0.83, h * 0.60, w * 0.07, h * 0.08);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.16, h - 12, w * 0.14, 12); ctx.fillRect(w * 0.70, h - 12, w * 0.14, 12);
  } else if (type === 'bus') {
    rrFill(ctx, w * 0.06, h * 0.04, w * 0.88, h * 0.74, 10, body);
    ctx.fillStyle = '#20262c'; ctx.fillRect(w * 0.12, h * 0.10, w * 0.76, h * 0.20);
    ctx.fillStyle = front ? '#ffe9a8' : '#2b3238';
    if (front) { ctx.beginPath(); ctx.arc(w * 0.18, h * 0.66, h * 0.045, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(w * 0.82, h * 0.66, h * 0.045, 0, 7); ctx.fill(); }
    else { rr(ctx, w * 0.10, h * 0.32, w * 0.80, h * 0.16, 4); ctx.fill(); ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.10, h * 0.68, w * 0.10, h * 0.07); ctx.fillRect(w * 0.80, h * 0.68, w * 0.10, h * 0.07); }
    ctx.fillStyle = '#e8e6dd'; ctx.fillRect(w * 0.08, h * 0.58, w * 0.84, h * 0.05);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.18, h - 12, w * 0.14, 12); ctx.fillRect(w * 0.68, h - 12, w * 0.14, 12);
    ctx.fillStyle = '#fff2b0'; ctx.fillRect(w * 0.30, h * 0.02, w * 0.40, h * 0.03);
  }
}
['hatch', 'pickup', 'truck', 'bus', 'moto'].forEach((type) => {
  CAR_COLORS.forEach((cc, i) => {
    const size = type === 'moto' ? 90 : 220;
    const h = type === 'truck' ? 240 : type === 'bus' ? 260 : type === 'moto' ? 120 : 180;
    makeSprite(type + '_' + i, size, h, CAR_WW[type], false, (ctx, w, hh) => drawCarSprite(ctx, w, hh, cc[0], cc[1], type, false));
    makeSprite('f_' + type + '_' + i, size, h, CAR_WW[type], true, (ctx, w, hh) => drawCarSprite(ctx, w, hh, cc[0], cc[1], type, true));
  });
});

function drawPalm(ctx, w, h) {
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(w / 2, h - 3, w * 0.35, 5, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = '#7a5230'; ctx.lineWidth = w * 0.16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(w / 2, h - 4); ctx.quadraticCurveTo(w * 0.42, h * 0.55, w * 0.52, h * 0.28); ctx.stroke();
  const cx = w * 0.52, cy = h * 0.26;
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI + (i / 6) * Math.PI;
    ctx.strokeStyle = i % 2 ? '#2f7d32' : '#3f9c43'; ctx.lineWidth = w * 0.11;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(cx + Math.cos(a) * w * 0.30, cy + Math.sin(a) * h * 0.10 - h * 0.06, cx + Math.cos(a) * w * 0.44, cy + Math.sin(a) * h * 0.02 + h * 0.05);
    ctx.stroke();
  }
  ctx.fillStyle = '#6d4c2b'; ctx.beginPath(); ctx.arc(cx, cy + 2, w * 0.07, 0, 7); ctx.fill();
}
makeSprite('palm', 140, 240, 1100, 0, drawPalm);

function drawLamp(ctx, w, h) {
  ctx.fillStyle = '#6f7680'; ctx.fillRect(w / 2 - w * 0.10, h * 0.12, w * 0.20, h * 0.88);
  rrFill(ctx, w * 0.10, h * 0.06, w * 0.80, h * 0.10, 4, '#6f7680');
  rrFill(ctx, w * 0.12, h * 0.13, w * 0.30, h * 0.07, 3, '#cfd6dd');
}
makeSprite('post', 130, 300, 320, 0, drawLamp);

function drawBuilding(ctx, w, h, facade, dark, nLit) {
  ctx.fillStyle = dark; ctx.fillRect(2, 6, w - 4, h - 6);
  ctx.fillStyle = facade; ctx.fillRect(0, 0, w - 6, h - 4);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(0, 0, w - 6, 8);
  const cols = 4, rows = Math.max(4, Math.round(h / 34));
  const lit = [];
  for (let i = 0; i < nLit; i++) lit.push(U.randInt(0, cols * rows - 1));
  let k = 0;
  const ww = (w - 24) / cols, wh = Math.min(20, (h - 30) / rows - 6);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    ctx.fillStyle = lit.indexOf(k) >= 0 ? '#ffd76b' : '#33414f';
    ctx.fillRect(10 + c * ww, 16 + r * ((h - 26) / rows), ww - 8, wh);
    k++;
  }
}
const FACADES = [['#8a6f5c', '#6b5445'], ['#5f6e7d', '#47545f'], ['#9c5f5f', '#7a4747'], ['#7d7565', '#5f594c'], ['#5c7d6e', '#465f54']];
FACADES.forEach((f, i) => makeSprite('bld_' + i, 240 + i * 14, 320 + i * 26, 2600 + i * 260, 0, (ctx, w, h) => drawBuilding(ctx, w, h, f[0], f[1], 6)));

const ADS = [
  ['#123a63', 'MOTOPEÇAS', 'DO ZÉ'], ['#7c1d1d', 'PIZZA 4', 'R$ 39,90'],
  ['#1d5c33', 'ASSISTÊNCIA', 'AUTORIZADA'], ['#5b2d86', 'AUTOESCOLA', 'VAI E PASSA'],
  ['#8a5a12', 'ESFIHARIA', 'BELA VILA'], ['#0f5f6b', 'LAVA-JATO', 'ESPUMA REAL'],
];
ADS.forEach((a, i) => makeSprite('bill_' + i, 280, 190, 2000, 0, (ctx, w, h) => {
  ctx.fillStyle = '#4c4f55'; ctx.fillRect(w * 0.30, h * 0.55, w * 0.06, h * 0.45); ctx.fillRect(w * 0.64, h * 0.55, w * 0.06, h * 0.45);
  ctx.fillStyle = '#20242a'; ctx.fillRect(0, 0, w, h * 0.58);
  ctx.fillStyle = a[0]; ctx.fillRect(4, 4, w - 8, h * 0.58 - 8);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
  ctx.font = 'bold 26px Arial'; ctx.fillText(a[1], w / 2, h * 0.24);
  ctx.font = 'bold 20px Arial'; ctx.fillStyle = '#ffd21f'; ctx.fillText(a[2], w / 2, h * 0.46);
}));

function drawStore(ctx, w, h, awning, name, flag) {
  ctx.fillStyle = '#c9c2b4'; ctx.fillRect(0, h * 0.25, w, h * 0.75);
  ctx.fillStyle = '#8f887b'; ctx.fillRect(0, h * 0.25, w, 10);
  const stripe = w / 8;
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? awning : '#f2eee5'; ctx.fillRect(i * stripe, h * 0.30, stripe, h * 0.10); }
  ctx.fillStyle = '#2b3238'; ctx.fillRect(w * 0.12, h * 0.46, w * 0.5, h * 0.42);
  ctx.fillStyle = '#3c4a58'; ctx.fillRect(w * 0.68, h * 0.46, w * 0.2, h * 0.42);
  ctx.fillStyle = '#f2eee5'; ctx.fillRect(0, 0, w, h * 0.25);
  ctx.fillStyle = '#1c2126'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
  ctx.fillText(name, w / 2, h * 0.19);
  ctx.strokeStyle = '#4c4f55'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(w * 0.9, 0); ctx.lineTo(w * 0.9, -h * 0.28); ctx.stroke();
  ctx.fillStyle = flag; ctx.beginPath(); ctx.moveTo(w * 0.9, -h * 0.28); ctx.lineTo(w * 0.99, -h * 0.22); ctx.lineTo(w * 0.9, -h * 0.16); ctx.fill();
}
makeSprite('loja', 240, 190, 2400, 0, (ctx, w, h) => drawStore(ctx, w, h, '#d64545', 'MERCADINHO', '#2e6fd2'));
makeSprite('entrega', 240, 190, 2400, 0, (ctx, w, h) => drawStore(ctx, w, h, '#2f9e44', 'DESTINO', '#ffd21f'));

makeSprite('posto', 300, 230, 2800, 0, (ctx, w, h) => {
  ctx.fillStyle = '#c9c2b4'; ctx.fillRect(w * 0.05, h * 0.5, w * 0.9, h * 0.5);       // loja de conveniência
  ctx.fillStyle = '#1d5c33'; ctx.fillRect(0, h * 0.26, w, h * 0.12);                  // cobertura
  ctx.fillStyle = '#f2eee5'; ctx.fillRect(0, h * 0.38, w, h * 0.035);
  ctx.fillStyle = '#2b3238'; ctx.fillRect(w * 0.12, h * 0.62, w * 0.3, h * 0.3);
  ctx.fillStyle = '#ffd21f'; ctx.fillRect(w * 0.5, h * 0.55, w * 0.16, h * 0.32);     // bomba
  ctx.fillRect(w * 0.72, h * 0.55, w * 0.16, h * 0.32);
  ctx.fillStyle = '#10331d'; ctx.fillRect(0, 0, w, h * 0.26);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 24px Arial'; ctx.textAlign = 'center';
  ctx.fillText('POSTO', w / 2, h * 0.11);
  ctx.fillStyle = '#ffd21f'; ctx.font = 'bold 14px Arial';
  ctx.fillText('GASOLINA ' + String(PRICES.fuelG).replace('.', ','), w / 2, h * 0.20);
  ctx.fillStyle = '#8fe0a0'; ctx.fillText('ÁLCOOL ' + String(PRICES.fuelA).replace('.', ','), w / 2, h * 0.255);
});

makeSprite('radar', 160, 240, 700, 0, (ctx, w, h) => {
  ctx.fillStyle = '#8d939b'; ctx.fillRect(w * 0.42, h * 0.2, w * 0.1, h * 0.8);
  ctx.fillStyle = '#20242a'; rr(ctx, w * 0.1, h * 0.08, w * 0.8, h * 0.16, 6); ctx.fill();
  ctx.fillStyle = '#0a0c0f'; ctx.beginPath(); ctx.arc(w * 0.5, h * 0.16, h * 0.05, 0, 7); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.fillRect(w * 0.16, h * 0.27, w * 0.68, h * 0.09);
  ctx.fillStyle = '#c62828'; ctx.font = 'bold 15px Arial'; ctx.textAlign = 'center';
  ctx.fillText('RADAR', w * 0.5, h * 0.35);
});
makeSprite('placa60', 110, 200, 480, 0, (ctx, w, h) => {
  ctx.fillStyle = '#8d939b'; ctx.fillRect(w * 0.46, h * 0.5, w * 0.08, h * 0.5);
  ctx.fillStyle = '#fff'; rr(ctx, w * 0.1, h * 0.05, w * 0.8, h * 0.5, 8); ctx.fill();
  ctx.strokeStyle = '#c62828'; ctx.lineWidth = w * 0.09;
  ctx.beginPath(); ctx.arc(w * 0.5, h * 0.3, h * 0.17, 0, 7); ctx.stroke();
  ctx.fillStyle = '#111'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
  ctx.fillText('60', w * 0.5, h * 0.38);
});

/* ------------------------- Endereços / clientes ------------------------- */
const RUAS = ['Rua das Palmeiras', 'Av. Francisco Juneu?', 'Rua Barão do Amazonas', 'Rua Sete de Setembro', 'Av. Marechal Deodoro', 'Rua XV de Novembro', 'Av. Getúlio Vargas', 'Rua Tiradentes', 'Av. Independência', 'Rua Dom Pedro II', 'Av. Bandeirantes', 'Rua Sant\'Ana'];
const BAIROS = ['Centro', 'Vila Virginia', 'Cidade Nova', 'Jd. Irajá', 'Vila Tibério', 'Santa Luzia', 'Distrito Industrial', 'Bosque das Águas', 'Jd. Palma Travessos', 'Vila Albertina', 'Parque São Paulo', 'Heitor do Catete'];
const CLIENTES = [
  'Dona Marlene', 'Seu Antônio', 'Pizzaria Napolitana', 'Farmácia Silva',
  'Rolandinho da Esfiha', 'Vó Cida', 'Bar do Zuca', 'Açougue Bom Corte',
  'Distribuidora Estrela', 'Lanchonete do Zé', 'Tia Nelma', 'Pet Shop Fido',
  'Chaveiro Miudinho', 'Ótica Visão', 'Depósito J. Maria',
];

/* ------------------------- Construção da estrada ------------------------ */
const L = { SHORT: 25, MEDIUM: 50, LONG: 100 };
let segs = [];
let trackLength = 0;
let radarSegs = [], postSegs = [];

function lastY() { return segs.length === 0 ? 0 : segs[segs.length - 1].p2.world.y; }
function mkPoint(y, z) { return { world: { x: 0, y: y, z: z }, camera: {}, screen: {} }; }
function addSegment(curve, y) {
  const n = segs.length;
  segs.push({
    index: n, curve: curve, sprites: [], cars: [],
    p1: mkPoint(lastY(), n * SEG_LEN), p2: mkPoint(y, (n + 1) * SEG_LEN),
    light: Math.floor(n / RUMBLE_LEN) % 2 === 1,
    clip: 0, fogA: 0, vis: false, zebra: false,
  });
}
function addRoad(enter, hold, leave, curve, y) {
  const startY = lastY();
  const endY = startY + (y || 0) * SEG_LEN;
  const total = enter + hold + leave;
  for (let n = 0; n < enter; n++) addSegment(U.easeIn(0, curve, n / enter), U.easeInOut(startY, endY, (n + 1) / total));
  for (let n = 0; n < hold; n++) addSegment(curve, U.easeInOut(startY, endY, (enter + n + 1) / total));
  for (let n = 0; n < leave; n++) addSegment(U.easeInOut(curve, 0, n / leave), U.easeInOut(startY, endY, (enter + hold + n + 1) / total));
}
function addStraight(n) { addRoad(n, n, n, 0, 0); }
function addCurve(n, curve, h) { addRoad(n, n, n, curve, h); }
function addHill(n, h) { addRoad(n, n, n, 0, h); }
function addLowRollingHills(n, h) {
  n = n || L.SHORT; h = h || 2;
  addRoad(n, n, n, 0, h / 2); addRoad(n, n, n, 0, -h);
  addRoad(n, n, n, 0, h); addRoad(n, n, n, 0, 0); addRoad(n, n, n, 0, h / 2); addRoad(n, n, n, 0, 0);
}
function addSCurves() {
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -2.2, 1.2);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, 3.2, 2);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, 0.4, -1.2);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -3.2, 1);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -1, -1);
}
function addBumps() {
  addRoad(10, 10, 10, 0, 4); addRoad(10, 10, 10, 0, -2); addRoad(10, 10, 10, 0, -4);
  addRoad(10, 10, 10, 0, 1); addRoad(10, 10, 10, 0, 1); addRoad(10, 10, 10, 0, -1);
}

function buildTrack() {
  segs = [];
  addStraight(L.SHORT);
  addLowRollingHills();
  addSCurves();
  addCurve(L.MEDIUM, 2.6, 1.6);
  addBumps();
  addCurve(L.LONG, -3.4, 0);
  addStraight(L.MEDIUM);
  addHill(L.MEDIUM, 5);
  addCurve(L.MEDIUM, 4.2, -1.6);
  addLowRollingHills();
  addSCurves();
  addCurve(L.LONG, -2.6, 1.6);
  addStraight(L.SHORT);
  addHill(L.MEDIUM, -4.5);
  addCurve(L.MEDIUM, 3.6, 1);
  addBumps();
  addSCurves();
  addCurve(L.MEDIUM, -4.2, -1);
  addStraight(L.MEDIUM);
  addRoad(L.LONG, L.LONG, L.LONG, 0, -lastY() / SEG_LEN);

  radarSegs = []; postSegs = [];
  for (let n = 0; n < segs.length; n++) {
    const s = segs[n];
    if (n % 9 === 0) s.sprites.push({ key: 'palm', offset: (Math.random() < 0.5 ? -1 : 1) * (1.3 + Math.random() * 0.6) });
    if (n % 16 === 0) s.sprites.push({ key: 'post', offset: n % 32 === 0 ? -1.28 : 1.28, hit: 0.05 });
    if (n % 28 === 0) s.sprites.push({ key: 'bld_' + U.randInt(0, 4), offset: -(2.9 + Math.random() * 0.9) });
    if (n % 34 === 0) s.sprites.push({ key: 'bld_' + U.randInt(0, 4), offset: 2.9 + Math.random() * 0.9 });
    if (n % 50 === 25) s.sprites.push({ key: 'bill_' + U.randInt(0, 5), offset: Math.random() < 0.5 ? -1.85 : 1.85 });
    if (n % 60 === 40) s.sprites.push({ key: 'loja', offset: Math.random() < 0.5 ? -2.4 : 2.4 });
    if (n % 150 === 0) s.sprites.push({ key: 'placa60', offset: 1.18 });
  }
  // postos de gasolina (~a cada 2,2 km) + radares
  for (let n = 200; n < segs.length - 40; n += 430 + U.randInt(0, 60)) {
    postSegs.push(n);
    segs[n].sprites.push({ key: 'posto', offset: 2.1 });
    for (let k = 0; k < 16; k++) segs[n + k]._postZone = true;
    segs[n - 6].sprites.push({ key: 'placa60', offset: 1.18, sign: 'P' });
  }
  for (let n = 410; n < segs.length - 10; n += 350 + U.randInt(0, 80)) {
    radarSegs.push(n);
    segs[n].sprites.push({ key: 'radar', offset: -1.25, hit: 0 });
    segs[n + 1].sprites.push({ key: 'radar', offset: 1.25, hit: 0 });
  }
  // faixas de pedestre
  for (let n = 120; n < segs.length - 20; n += 260) {
    for (let k = 0; k < 4; k++) segs[n + k].zebra = true;
  }
  trackLength = segs.length * SEG_LEN;
}
function segAt(z) { return segs[Math.floor(z / SEG_LEN) % segs.length]; }

/* ------------------------- Céu / ambiente ------------------------------- */
const SKY_STOPS = [
  { t: 0.00, top: '#0a0f28', bot: '#1b2545', fog: '#182038', light: 0.52, star: 1 },
  { t: 0.20, top: '#233055', bot: '#e0784b', fog: '#c9754f', light: 0.70, star: 0.35 },
  { t: 0.32, top: '#3f8fd6', bot: '#cfeeff', fog: '#bcdcf0', light: 1.00, star: 0 },
  { t: 0.62, top: '#4d9be0', bot: '#d8f2ff', fog: '#c6e4f4', light: 1.00, star: 0 },
  { t: 0.76, top: '#39497f', bot: '#f0894b', fog: '#d97a4a', light: 0.78, star: 0.1 },
  { t: 0.88, top: '#12193c', bot: '#2c2a52', fog: '#20264a', light: 0.55, star: 0.9 },
  { t: 1.00, top: '#0a0f28', bot: '#1b2545', fog: '#182038', light: 0.52, star: 1 },
];
function envAt(t) {
  t = ((t % 1) + 1) % 1;
  let a = SKY_STOPS[0], b = SKY_STOPS[SKY_STOPS.length - 1];
  for (let i = 0; i < SKY_STOPS.length - 1; i++) {
    if (t >= SKY_STOPS[i].t && t <= SKY_STOPS[i + 1].t) { a = SKY_STOPS[i]; b = SKY_STOPS[i + 1]; break; }
  }
  const p = (t - a.t) / Math.max(0.0001, b.t - a.t);
  return {
    top: lerpColor(a.top, b.top, p), bot: lerpColor(a.bot, b.bot, p), fog: lerpColor(a.fog, b.fog, p),
    light: U.lerp(a.light, b.light, p), star: U.lerp(a.star, b.star, p),
  };
}
const STARS = [];
for (let i = 0; i < 130; i++) STARS.push({ x: Math.random() * VW, y: Math.random() * VH * 0.42, r: Math.random() * 1.4 + 0.4, tw: Math.random() * 6 });
function ridge(baseY, amp, seed, color, offsetPx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-50, VH);
  const W = VW + 100;
  for (let x = -50; x <= W; x += 26) {
    const y = baseY - Math.abs(Math.sin((x + offsetPx) * 0.0035 + seed) * amp + Math.sin((x + offsetPx) * 0.0113 + seed * 2.7) * amp * 0.45);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, VH); ctx.closePath(); ctx.fill();
}

/* ------------------------- Partículas ----------------------------------- */
let particles = [];
function spawnParticles(x, y, n, opts) {
  for (let i = 0; i < n; i++) {
    particles.push({
      x: x, y: y,
      vx: (opts.vx || 0) + (Math.random() - 0.5) * (opts.spread || 200),
      vy: (opts.vy || 0) + (Math.random() - 0.5) * (opts.spread || 200),
      g: opts.g === undefined ? 500 : opts.g,
      life: opts.life || 0.7, t: 0, size: (opts.size || 4) * (0.6 + Math.random() * 0.8),
      color: U.choice(opts.colors), square: opts.square,
    });
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.t += dt; if (p.t >= p.life) { particles.splice(i, 1); continue; }
    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt;
  }
}
function drawParticles() {
  for (const p of particles) {
    const a = 1 - p.t / p.life;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    if (p.square) ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
    else { ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0.1, p.size * a), 0, 7); ctx.fill(); }
  }
  ctx.globalAlpha = 1;
}

/* ------------------------- Estado do jogo -------------------------------- */
const canvas = document.getElementById('game');
const ctx2 = canvas.getContext('2d');
const ctx = ctx2;
canvas.width = VW; canvas.height = VH;

const $ = (id) => document.getElementById(id);
const dom = {
  hud: $('hud'), hMoney: $('h-money'), hCombo: $('h-combo'), hLives: $('h-lives'),
  hDist: $('h-dist'), hClock: $('h-clock'),
  hOrder: $('h-order'), hClient: $('h-client'), hAddr: $('h-addr'), hRemain: $('h-remain'),
  hProg: $('h-prog'), hTimer: $('h-timer'), hTimerNum: $('h-timernum'), hReward: $('h-reward'), hFragile: $('h-fragile'),
  banner: $('banner'), menu: $('menu'), pause: $('pause'), over: $('over'), help: $('help'),
  best: $('best-score'), overStats: $('over-stats'), btnSound: $('btn-sound'), touch: $('touch'),
  bikeList: $('bike-list'), simBox: $('sim-box'), hPosto: $('h-posto'), hWarn: $('h-warn'),
};

const game = {
  state: 'menu', mode: 'delivery',
  bike: BIKES[1], bikeIdx: 1,
  position: 0, speed: 0, playerX: 0.5, playerVX: 0, lean: 0, steerVis: 0,
  gear: 1, rpm: 1000, running: false, stallT: 0, starterT: 0, limiter: false,
  fuel: 16, dmg: 0, wheelieT: 0, tumbleT: 0,
  slipF: 0, slipR: 0, lockF: 0, lockR: 0,
  totalM: 0, topKmh: 0, money: 0, combo: 0, bestCombo: 0, delivered: 0, lives: 3,
  order: null, time: 0, invuln: 0, crashT: 0, shake: 0, skyOffset: 0,
  signal: 0, signalT: 0, tickT: 0, flashT: 0,
  weather: 0, weatherT: 0, wet: 0,            // 0=seco 1=chuva
  postStop: { on: false, liters: 0, cost: 0 },
  input: { left: false, right: false, throttle: false, brakeF: false, brakeR: false, shiftUp: false, shiftDown: false, hornQueued: false },
  cars: [], dustT: 0, smokeT: 0,
};
const maxSpeedU = () => uOfKmh(game.bike.top);
const gripOf = () => (1 - game.wet * 0.4);

function spawnCars(n) {
  game.cars = [];
  for (const s of segs) s.cars = [];
  const types = ['hatch', 'hatch', 'hatch', 'pickup', 'truck', 'bus', 'moto'];
  for (let i = 0; i < n; i++) {
    const twoW = SIM.twoWay && i % 2 === 1;
    const dir = twoW ? -1 : 1;
    const type = U.choice(types);
    const lane = dir > 0 ? U.randInt(2, 3) : U.randInt(0, 1);
    const lim = uOfKmh(SIM.radar ? 58 : 72);
    const spd = type === 'truck' ? lim * 0.62 : type === 'bus' ? lim * 0.68 : type === 'moto' ? lim * 0.9 : lim * (0.8 + Math.random() * 0.3);
    const key = (dir < 0 ? 'f_' : '') + type + '_' + U.randInt(0, CAR_COLORS.length - 1);
    game.cars.push({
      z: Math.floor(Math.random() * segs.length) * SEG_LEN + U.randInt(0, SEG_LEN - 1),
      offset: LANE_N[lane], lane, dir, speed: spd, key, type,
      nw: SPR[key].w / ROAD_W, pct: 0,
      changeT: 0, fromX: 0, toX: 0, blink: 0, brake: false, yieldT: 0, nextChange: 5 + Math.random() * 15,
    });
  }
}

function newOrder() {
  const top = game.bike.top;
  const distM = U.randInt(12, 40) * 100;
  let time = distM / 20 + 22;
  time *= U.lerp(1.25, 0.92, U.clamp((top - 100) / 200, 0, 1));   // moto mais lenta = mais folga (prazo realista)
  const targetUnits = (game.position + BIKE_Z_UNITS + distM * UNITS_PER_M) % trackLength;
  const tseg = segs[Math.floor(targetUnits / SEG_LEN) % segs.length];
  const side = Math.random() < 0.5 ? -1.5 : 1.5;
  tseg.sprites.push({ key: 'entrega', offset: side, dest: true });
  const num = U.randInt(12, 1890);
  game.order = {
    client: U.choice(CLIENTES),
    addr: U.choice(RUAS) + ', ' + num + ' — ' + U.choice(BAIROS),
    cep: '14' + U.randInt(100, 999) + '-' + U.randInt(100, 999),
    fragile: Math.random() < 0.3,
    startM: game.totalM, distM, timeMax: time, timeLeft: time,
    base: Math.round(distM / 120) + 12, crashes: 0,
    targetUnits, tseg, side,
  };
  dom.hOrder.style.display = game.mode === 'delivery' ? '' : 'none';
}
function clearOrderMarker() {
  if (game.order) {
    game.order.tseg.sprites = game.order.tseg.sprites.filter((s) => !s.dest);
    game.order = null;
  }
}

function startGame(mode) {
  game.mode = mode;
  game.state = 'play';
  let b = BIKES[game.bikeIdx];
  if (mode === 'delivery' && !bikeUnlocked(b)) {
    let fb = 1;
    for (let i = BIKES.length - 1; i >= 0; i--) if (bikeUnlocked(BIKES[i])) { fb = i; break; }
    game.bikeIdx = fb; b = BIKES[fb];
    setTimeout(() => setBanner('🔒 ' + BIKES[game.bikeIdx].name + ' ainda não é sua — hoje você roda na ' + b.name, 'warn'), 2500);
  }
  game.bike = b;
  game.fuel = b.tank;
  game.position = 0; game.speed = 0; game.playerX = 0.5; game.playerVX = 0; game.lean = 0;
  game.gear = 0; game.rpm = b.idle; game.running = false; game.stallT = 0; game.starterT = 0;
  game.fuel = b.tank; game.dmg = 0;
  game.totalM = 0; game.topKmh = 0; game.money = 0; game.combo = 0; game.bestCombo = 0;
  game.delivered = 0; game.lives = 3; game.time = 0; game.invuln = 0; game.crashT = 0;
  game.tumbleT = 0; game.wheelieT = 0; game.signal = 0; game.flashT = 0;
  game.slipF = 0; game.slipR = 0; game.lockF = 0; game.lockR = 0;
  game.postStop = { on: false, liters: 0, cost: 0 };
  game.weather = SIM.weather ? (Math.random() < 0.35 ? 1 : 0) : 0;
  game.weatherT = 60 + Math.random() * 90;
  game.wet = game.weather;
  game.fuelWarned = false; game.reserveUsed = false;
  particles = [];
  clearOrderMarker();
  spawnCars(mode === 'free' ? 26 : 44);
  if (mode === 'delivery') { newOrder(); setBanner('🏍 Dê a partida: tecla E' + (game.weather ? ' • ⛈ chuva hoje — pista molhada!' : '!'), 'info'); }
  else setBanner('🌄 Modo livre — bom passeio! (qualquer moto liberada no teste)', 'info');
  if (mode === 'free') game.running = true;
  document.body.dataset.screen = mode;
  hideAll();
  SFX.init(); SFX.resume();
}
function toMenu() {
  game.state = 'menu'; game.speed = 0;
  document.body.dataset.screen = 'menu';
  clearOrderMarker();
  hideAll(); dom.menu.style.display = '';
  buildMenu();
  const best = localStorage.getItem('motox.best') || 0;
  dom.best.textContent = '🏆 Recorde do dia: R$ ' + best;
}
function hideAll() { dom.menu.style.display = 'none'; dom.pause.style.display = 'none'; dom.over.style.display = 'none'; dom.help.style.display = 'none'; }

function togglePause() {
  if (game.state === 'play') { game.state = 'pause'; dom.pause.style.display = ''; }
  else if (game.state === 'pause') { game.state = 'play'; dom.pause.style.display = 'none'; SFX.resume(); }
}
function gameOver(reason) {
  game.state = 'over';
  clearOrderMarker();
  const best = Math.max(game.money, parseInt(localStorage.getItem('motox.best') || '0', 10));
  try { localStorage.setItem('motox.best', String(best)); } catch (e) {}
  dom.overStats.innerHTML =
    '<div><b>' + game.delivered + '</b><span>entregas</span></div>' +
    '<div><b>' + U.fmtMoney(game.money) + '</b><span>ganho líquido</span></div>' +
    '<div><b>' + Math.round(game.topKmh) + '</b><span>vel. máx (km/h)</span></div>' +
    '<div><b>' + U.fmtDist(game.totalM) + '</b><span>rodados</span></div>' +
    '<div><b>x' + game.bestCombo + '</b><span>melhor combo</span></div>' +
    '<div><b>' + Math.round(game.dmg) + '%</b><span>avaria</span></div>';
  $('over-reason').textContent = reason;
  dom.over.style.display = '';
}

let bannerTimer = 0;
function setBanner(text, cls) {
  dom.banner.textContent = text;
  dom.banner.className = 'show ' + (cls || '');
  bannerTimer = 2.6;
}

/* ------------------------- Motor / câmbio -------------------------------- */
function engineTick(dt) {
  const b = game.bike;
  const v = game.speed / UNITS_PER_M;                    // m/s
  if (!SIM.manual && game.running) { // auto-câmbio arcade
    const sf = v / (b.top / 3.6);
    let g = 0;
    while (g < b.gears.length - 1 && sf > b.gears[g]) g++;
    game.gear = g;
  } else if (!SIM.manual) game.gear = 0;
  const gf = game.gear >= 0 ? b.gears[game.gear] : 1;
  const target = game.gear >= 0 && game.running ? U.clamp((v / ((b.top / 3.6) * gf)) * b.redline, b.idle * 0.85, b.redline * 1.08) : (game.running ? b.idle : 0);
  const k = game.running ? (game.gear < 0 ? 6 : 14) : 8;
  game.rpm = U.lerp(game.rpm, target, U.clamp(dt * k, 0, 1));
  if (!game.running) game.rpm = U.lerp(game.rpm, 0, dt * 3);
  // engasgo: giro baixo COM a moto andando (parado, a embreagem segura o motor)
  if (game.running && game.gear >= 0 && v > 1.2 && game.rpm < b.idle * 0.8 && SIM.manual) {
    game.stallT += dt;
    if (game.stallT > 0.3) { stall(); }
  } else game.stallT = 0;
  // limitador
  game.limiter = game.rpm > b.redline * 0.985;
  if (game.limiter) game.rpm = b.redline * (0.965 + 0.02 * Math.sin(game.time * 60));
}
function stall(reason) {
  if (!game.running) return;
  game.running = false;
  game.stallT = 0;
  if (reason) setBanner(reason, 'warn');
  else setBanner('⚠️ Motor morreu! Solta a embreagem: ↑ para ligar', 'warn');
  SFX.clunk();
}
function tryStart() {
  const b = game.bike;
  if (game.running || game.starterT > 0) return false;
  const canPush = game.speed > uOfKmh(12) && game.gear >= 0;   // empurrar na marcha
  if (!canPush && SIM.fuel && game.fuel <= 0.05) { setBanner('⛽ Sem gasolina… nem na empurrada!', 'danger'); return false; }
  game.starterT = canPush ? 0.35 : 0.85;
  SFX.starter();
  return true;
}
function shift(dirn) {
  const b = game.bike;
  if (!SIM.manual) return;
  if (game.starterT > 0) return;
  const top = b.gears.length - 1;
  const was = game.gear;
  if (!game.running) { game.gear = U.clamp(game.gear + dirn, -1, top); return; }
  const ng = game.gear + dirn;
  if (ng < -1) return;
  game.gear = Math.min(top, ng);
  SFX.clunk();
  const v = game.speed / UNITS_PER_M;
  if (game.gear >= 0 && v > 1 && !game.postStop.on) {
    const rpmNow = U.clamp((v / ((b.top / 3.6) * b.gears[game.gear])) * b.redline, 0, b.redline * 2);
    if (dirn < 0 && rpmNow > b.redline * 1.12) {          // calço no descompasso
      SFX.crash(false);
      game.shake = 14;
      game.playerVX += (Math.random() - 0.5) * 0.6;
      setBanner('🦶 Calçou a traseira! (R$ 0 — ainda bem, por enquanto)', 'warn');
      if (SIM.damage) game.dmg = U.clamp(game.dmg + 4, 0, 100);
      game.slipR = 0.8;
      game.running = Math.random() > 0.25 ? game.running : game.running; // motor sobrevive quase sempre
    }
    if (dirn > 0 && rpmNow < b.idle * 0.8) { stall('⚠️ Engasgou — marcha alta demais!'); }
  }
}

/* ------------------------- Física da moto -------------------------------- */
function bikePhysics(dt) {
  const b = game.bike;
  const v = game.speed / UNITS_PER_M;
  const grip = gripOf();
  let throttle = game.input.throttle && !game.postStop.on ? 1 : 0;
  if (SIM.fuel && game.fuel <= 0) throttle = 0;
  const eff = throttle * (game.wheelieT > 0 ? 0.45 : 1) * (1 - game.dmg / 260);

  // ---- força motriz (potência no volante)
  let a = 0;
  game.running = game.running && !(SIM.fuel && game.fuel <= 0);
  if (game.running && game.gear >= 0 && game.starterT <= 0) {
    const pr = U.clamp(game.rpm / b.redline, 0.05, 1.1);
    const tq = U.clamp(1 - Math.pow((pr - 0.75) * 2.1, 2), 0.4, 1);       // curva de torque
    const power = b.hp * 745.7 * 0.88 * (game.limiter ? 0.15 : 1);
    let force = (power * tq * eff) / Math.max(v, 1.8);
    const tractionCap = grip * G * b.mass * 0.85;
    if (force > tractionCap) {
      force = tractionCap;
      if (v < 12 && throttle && b.hp / b.mass > 0.24) game.wheelieT = Math.max(game.wheelieT, 0.4);
    }
    a += force / b.mass;
  }
  // ---- arrasto + rolamento + freio-motor
  const drag = 0.5 * 1.22 * (b.drag * 0.62) * v * v / b.mass;
  const roll = 0.017 * G * (throttle ? 0.25 : 1);
  a -= drag + roll;
  if (game.running && game.gear >= 0 && throttle === 0) a -= (0.5 + 1.6 * (1 - U.clamp(v / ((b.top / 3.6) * b.gears[game.gear] || 1), 0, 1))) * 0.9;
  if (!game.running) a -= 0.25;

  // ---- freios
  let brake = 0;
  if (game.input.brakeF) {
    const want = grip * G * 0.78;
    game.slipF += dt * (0.85 + Math.abs(game.lean) * 2.6 + game.wet * 0.5);
    if (game.slipF > 1) { game.lockF = 0.5; game.slipF = 1.6; } else game.lockF = Math.max(0, game.lockF - dt);
    brake += want * (game.slipF > 1 ? 0.35 : 1);
    // lowside realista: dianteiro travado na curva
    if (game.slipF > 1 && Math.abs(game.lean) > 0.42 && v > 11 && grip < 1.15 && Math.random() < dt * 2.6) { crash('lowside'); }
  } else { game.slipF = Math.max(0, game.slipF - dt * 2.2); game.lockF = Math.max(0, game.lockF - dt); }
  if (game.input.brakeR) {
    const want = grip * G * 0.42;
    game.slipR += dt * (0.9 + Math.abs(game.lean) * 2.0 + game.wet * 0.7);
    if (game.slipR > 1) {
      game.lockR = 0.6;
      a -= want * 0.5;
      game.lean += (Math.random() - 0.5) * dt * 0.9;              // chacoalho
      if (Math.random() < dt * 12) spawnParticles(VW / 2, VH * 0.93, 2, { colors: ['#cfcfcf', '#a9a9a9'], spread: 90, vy: -30, g: -40, life: 0.9, size: 9 });
    } else { game.slipR = Math.min(1, game.slipR); brake += want; }
    game.lockR = game.slipR > 1 ? game.lockR : 0;
  } else { game.slipR = Math.max(0, game.slipR - dt * 2.4); game.lockR = Math.max(0, game.lockR - dt); }
  a -= brake;

  // ---- combustível
  if (SIM.fuel && game.running) {
    const use = (0.30 + throttle * 0.85 + (v / 30) * 0.5) * (b.tank / 620);
    game.fuel = Math.max(0, game.fuel - use * dt);
    if (game.fuel <= 0 && !game.reserveUsed) {
      game.reserveUsed = true;
      game.fuel = 0.6;
      setBanner('⛽ ACendeu a reserva! Procure um posto', 'warn');
    } else if (game.fuel <= 0) stall('⛽ ACABOU a gasolina!');
    else if (game.fuel < b.tank * 0.14 && !game.fuelWarned) { game.fuelWarned = true; setBanner('⛽ Nível baixo — procure um posto (à direita, desacelere)', 'warn'); }
    if (game.fuel > b.tank * 0.2) game.fuelWarned = false;
  }

  game.speed = U.clamp(game.speed + a * UNITS_PER_M * dt, 0, uOfKmh(b.top * 1.02));
  if (game.postStop.on) game.speed = Math.min(game.speed, uOfKmh(4));

  // ---- inclinação → trajetória (quase-real: curva coordenada)
  const steerIn = (game.input.left ? -1 : 0) + (game.input.right ? 1 : 0);
  const leanMax = (0.92 - Math.min(0.25, v * 0.004)) * (grip > 0.9 ? 1 : 0.82) * (game.wheelieT > 0 ? 0.35 : 1);
  const leanTarget = steerIn * leanMax * U.clamp(v / 5.5, 0.12, 1);
  const leanRate = 3.4 - Math.min(2.1, v * 0.012);
  const assist = 0.4 + v * 0.0022; // em velocidade, a moto "quer" se equilibrar
  game.lean = U.clamp(U.lerp(game.lean, leanTarget, U.clamp(dt * leanRate, 0, 1)) - assist * game.lean * dt, -1.1, 1.1);
  const latV = Math.tan(game.lean) * (v / 14) * 1.35 * grip;
  game.playerVX = U.lerp(game.playerVX, latV, U.clamp(dt * 3.2, 0, 1));

  // ---- força centrífuga da curva da via
  const pSeg = segAt(game.position + BIKE_Z_UNITS);
  const centrip = (v * v) * 0.00012 * pSeg.curve * (2 - grip);
  game.playerX += (game.playerVX - centrip) * dt;
  if (Math.abs(game.playerX) > 1) {
    game.playerX = U.clamp(game.playerX, -1.62, 1.62);
    game.speed = Math.max(uOfKmh(14), game.speed - 2100 * dt); // terra/paralelepípedo segura
    if (Math.random() < dt * 14) {
      spawnParticles(VW / 2, VH * 0.92, 2, { colors: ['#b99c6b', '#a2885d'], spread: 170, vy: -60, g: 320, life: 0.8, size: 7 });
    }
  }
  if (game.invuln <= 0 && game.crashT <= 0 && !pSeg._postZone) {
    for (const spr of pSeg.sprites) {
      if (spr.hit && U.overlap(game.playerX, PLAYER_NW, spr.offset, spr.hit, 1)) { crash('poste'); break; }
    }
  }
  // aquaplanagem
  if (game.wet > 0.6 && v > 22 && throttle === 0 && game.input.brakeF && Math.random() < dt * 0.5) {
    game.playerVX += (Math.random() - 0.5) * 0.9;
    setBanner('💧 Aquaplanagem! Tira o freio devagar…', 'warn');
  }
}

/* ------------------------- Colisões --------------------------------------- */
function crash(kind) {
  if (game.invuln > 0 || game.crashT > 0) return;
  const hard = kind === 'poste' || kind === 'oncoming' || kind === 'lowside';
  game.crashT = hard ? 1.5 : kind === 'oncoming' ? 2 : 1.0;
  if (kind === 'lowside' || kind === 'oncoming') { game.tumbleT = 1.6; game.crashT = 1.9; }
  game.invuln = game.crashT + 1.1;
  game.speed *= kind === 'oncoming' ? 0 : hard ? 0.18 : 0.42;
  game.shake = hard ? 30 : 18;
  game.combo = 0;
  if (game.order) { game.order.timeLeft -= 5; game.order.crashes++; }
  if (game.order && game.order.fragile && Math.random() < 0.35) failOrder('🥚 O pacote FRÁGIL quebrou na queda!');
  if (SIM.damage) game.dmg = U.clamp(game.dmg + (hard ? U.randInt(9, 18) : U.randInt(4, 9)), 0, 100);
  spawnParticles(VW / 2, VH * 0.72, hard ? 34 : 20, { colors: ['#ffb52e', '#ff5a2e', '#ffd21f', '#e8e8e8'], spread: 520, vy: -200, g: 950, life: 0.8, size: 5 });
  const msg = kind === 'oncoming' ? '🚑 VENTI-CONTRA! Bateu de frente!'
    : kind === 'lowside' ? '🛞 Travou o dianteiro na curva — LOWSIDE!'
    : kind === 'poste' ? '💥 Bateu na defensa/poste!' : '💥 Batida no trânsito! (-5s)';
  setBanner(msg, 'danger');
  SFX.crash(hard);
}

/* ------------------------- Trânsito (IA) ---------------------------------- */
function updateCars(dt) {
  for (const s of segs) s.cars.length = 0;
  const pz = game.position + BIKE_Z_UNITS;
  for (const car of game.cars) {
    car.z = ((car.z + dt * car.speed * car.dir) % trackLength + trackLength) % trackLength;
    car.pct = (car.z % SEG_LEN) / SEG_LEN;
    const seg = segs[Math.floor(car.z / SEG_LEN) % segs.length];
    seg.cars.push(car);
    car.seg = seg;

    if (dt > 0) {
      // troca de faixa com seta (motorista real: usa pisca!)
      car.nextChange -= dt;
      if (car.nextChange <= 0) {
        car.nextChange = 6 + Math.random() * 16;
        let lane = car.lane + (Math.random() < 0.5 ? -1 : 1);
        if (car.dir > 0) lane = U.clamp(lane, 2, 3); else lane = U.clamp(lane, 0, 1);
        if (lane !== car.lane) {
          car.fromX = LANE_N[car.lane]; car.toX = LANE_N[lane];
          car.blink = car.toX > car.fromX ? 1 : -1;
          car.changeT = 3.2;
          car.lane = lane;
        }
      }
      if (car.changeT > 0) {
        car.changeT -= dt;
        const p = U.easeInOut(0, 1, 1 - Math.max(0, car.changeT) / 3.2);
        car.offset = U.lerp(car.fromX, car.toX, p);
        if (car.changeT <= 0) car.blink = 0;
      } else car.offset = U.lerp(car.offset, LANE_N[car.lane], Math.min(1, dt * 4));
      if (car.yieldT > 0) { car.yieldT -= dt; car.offset += (car.yieldTo || 0) * dt * 0.25; }
      // freio se o da frente está lento na mesma faixa
      car.brake = false;
      const want = uOfKmh(SIM.twoWay ? 55 : 66);
      let tgt = want;
      for (const other of segs[(seg.index + 3) % segs.length].cars) {
        if (other !== car && other.dir === car.dir && Math.abs(other.offset - car.offset) < 0.4) {
          const dAhead = ((other.z - car.z) % trackLength + trackLength) % trackLength;
          if (dAhead < 900) { tgt = Math.min(tgt, other.speed * 0.92); car.brake = true; }
        }
      }
      car.speed = U.clamp(car.speed + (tgt - car.speed) * dt * (car.brake ? 2.4 : 0.7), uOfKmh(25), want * 1.05);
    }

    // colisão com o jogador (só à frente para os do mesmo sentido)
    if (game.state === 'play' && game.invuln <= 0 && game.crashT <= 0) {
      const raw = car.z - pz;
      const d = ((raw % trackLength) + trackLength) % trackLength;
      const ahead = d < trackLength / 2 ? d : d - trackLength;
      const sameDir = car.dir > 0;
      if (sameDir ? (ahead > -120 && ahead < SEG_LEN * 2) : (ahead > -1400 && ahead < 120)) {
        if (U.overlap(game.playerX, PLAYER_NW, car.offset, car.nw, 0.85)) {
          if (!sameDir) { crash('oncoming'); }
          else {
            const rel = game.speed - car.speed;
            if (rel > uOfKmh(14)) crash('carro');
            else { game.speed = car.speed * 0.9; game.shake = 7; setBanner('🚗 Encostou — segura a mão!', 'warn'); SFX.crash(false); }
          }
        }
      }
    }
  }
}

/* ------------------------- Postos / radar -------------------------------- */
function serviceTick(dt) {
  const pz = game.position + BIKE_Z_UNITS;
  // posto
  let inPost = false;
  for (const n of postSegs) {
    const zA = n * SEG_LEN, zB = (n + 16) * SEG_LEN;
    if (pz >= zA - 400 && pz <= zB + 400) { inPost = true; break; }
  }
  const stopped = game.speed < uOfKmh(6) && game.playerX > 0.62 && game.playerX < 1.45;
  if (inPost && stopped && game.state === 'play') {
    if (!game.postStop.on) { game.postStop = { on: true, liters: 0, cost: 0 }; setBanner('⛽ Parou no posto! Abastecendo… (saia devagar p/ encerrar)', 'info'); }
    const b = game.bike;
    if (SIM.fuel && game.fuel < b.tank) {
      const add = Math.min(dt * 2.4, b.tank - game.fuel);
      game.fuel += add;
      game.postStop.liters += add;
      game.postStop.cost += add * PRICES.fuelG;
      game.money = Math.max(0, game.money - add * PRICES.fuelG);
    }
    if (SIM.damage && game.dmg > 0) {
      const rep = Math.min(dt * 5, game.dmg);
      game.dmg -= rep;
      game.money = Math.max(0, game.money - rep * 3.5);
    }
    game.running = true;
  } else if (game.postStop.on) {
    game.postStop.on = false;
    if (game.postStop.liters > 0.3) setBanner('🧾 Nota: ' + game.postStop.liters.toFixed(1).replace('.', ',') + ' L → ' + U.fmtMoney2(game.postStop.cost), 'info');
    game.postStop = { on: false, liters: 0, cost: 0 };
    game.reserveUsed = false;
  }
  dom.hPosto.style.opacity = game.postStop.on ? '1' : '0';
  if (game.postStop.on) dom.hPosto.textContent = '⛽ ' + game.postStop.liters.toFixed(1).replace('.', ',') + ' L • ' + U.fmtMoney2(game.postStop.cost);

  // radar
  game.radarCd = Math.max(0, (game.radarCd || 0) - dt);
  if (SIM.radar) {
    for (const n of radarSegs) {
      const dz = (n * SEG_LEN - pz + trackLength) % trackLength;
      if (dz > 0 && dz < 160) {
        if (game.radarCd <= 0) {
          game.radarCd = 8;
          const kmh = kmhOf(game.speed);
          const ex = kmh / SPEED_LIMIT - 1;
          if (ex > 0.75) { fine(880.41, '🚨 RADAR: ' + Math.round(ex * 100) + '% acima — infração gravíssima + suspensão da CNH'); }
          else if (ex > 0.5) { fine(293.47, '🚨 RADAR: ' + Math.round(ex * 100) + '% acima — gravíssima R$ 293,47'); }
          else if (ex > 0.2) { fine(130.16, '🚨 RADAR: ' + Math.round(ex * 100) + '% acima — média R$ 130,16'); }
        }
      }
    }
  }
}
function fine(v, msg) {
  game.money = Math.max(0, game.money - v);
  game.flashT = 0.14;
  setBanner(msg + '  (-R$ ' + Math.round(v) + ')', 'danger');
  SFX.crash(false);
}

/* ------------------------- Missões ---------------------------------------- */
function failOrder(msg) {
  game.money = Math.max(0, game.money - 40);
  game.combo = 0; game.lives--;
  setBanner(msg + '  (-R$40, 📦 perdido)', 'danger');
  clearOrderMarker();
  if (game.lives <= 0) { gameOver('O patrão agradece o dia — 3 cancelamentos doem no bolso.'); return; }
  newOrder();
}
function updateOrder(dt) {
  const o = game.order;
  if (!o) return;
  o.timeLeft -= dt;
  if (!o._notified) {
    const dz = Math.abs(o.targetUnits - (game.position + BIKE_Z_UNITS));
    if (Math.min(dz, trackLength - dz) < 1300) { o._notified = true; setBanner('📍 Desacelerando… destino à frente (pista à direita)', 'info'); }
  }
  if (game.totalM >= o.startM + o.distM) {
    const remain = Math.max(0, o.timeLeft);
    const condition = 1 - o.crashes * 0.18;
    const tip = Math.round(remain * 1.6 * U.clamp(condition, 0, 1));
    const reward = o.base + tip + game.combo * 12;
    game.money += reward;
    game.combo++; game.bestCombo = Math.max(game.bestCombo, game.combo);
    game.delivered++;
    try { if (game.delivered > maxDeliv()) localStorage.setItem('motox.maxdeliv', String(game.delivered)); } catch (e) {}
    setBanner('✅ ENTREGA FEITA! ' + (tip > 25 ? 'Cliente gorjetou! ' : '') + '+' + U.fmtMoney(reward) + (game.combo > 1 ? '  •  combo x' + game.combo : ''), 'good');
    spawnParticles(VW / 2, VH * 0.5, 70, { colors: ['#ffd21f', '#35e05e', '#2e9bff', '#ff5a8a', '#fff'], spread: 520, vy: -360, g: 520, life: 1.5, size: 6, square: true });
    SFX.delivered();
    clearOrderMarker();
    newOrder();
    for (let i = 2; i < BIKES.length; i++) {
      if (game.delivered === BIKES[i].unlock) setTimeout(() => setBanner('🔓 ' + BIKES[i].name + ' liberada na garagem!', 'info'), 1500);
    }
    return;
  }
  if (o.timeLeft <= 0) failOrder('⏰ ATRASOU! ' + o.client + ' cancelou o pedido');
}

/* ------------------------- Clima ----------------------------------------- */
function weatherTick(dt) {
  if (!SIM.weather) { game.weather = 0; game.wet = U.lerp(game.wet, 0, dt); return; }
  game.weatherT -= dt;
  if (game.weatherT <= 0) {
    game.weather = game.weather ? 0 : (Math.random() < 0.55 ? 1 : 0);
    game.weatherT = 50 + Math.random() * 100;
    if (game.weather) setBanner('🌧 Começou a chover! Pista molhada — dobre a distância de frenagem', 'warn');
    else setBanner('🌤 O tempo abriu', 'info');
  }
  game.wet = U.clamp(game.wet + (game.weather ? dt * 0.02 : -dt * 0.015), 0, 1);
}

/* ------------------------- Update ---------------------------------------- */
function update(dt) {
  game.time += dt;
  const playing = game.state === 'play';

  if (playing) {
    if (game.crashT > 0) {
      game.crashT -= dt;
      game.tumbleT = Math.max(0, game.tumbleT - dt);
      game.speed = Math.max(0, game.speed - 2000 * dt);
      if (game.crashT <= 0 && Math.abs(game.playerX) > 1.1) game.playerX = Math.sign(game.playerX) * 0.8;
      if (game.crashT <= 0) { game.lean = 0; game.playerVX = 0; }
    } else {
      // partida
      if (game.starterT > 0) {
        game.starterT -= dt;
        if (game.starterT <= 0) { game.running = true; game.rpm = game.bike.idle; setBanner('🏍 Motor ligado!', 'info'); }
      } else if (!game.running && game.gear >= 0 && game.input.throttle && game.speed > uOfKmh(12)) tryStart();

      // mudanças de marcha
      if (game.input.shiftUp) { game.input.shiftUp = false; if (!game.running) tryStart(); else shift(1); }
      if (game.input.shiftDown) { game.input.shiftDown = false; shift(-1); }

      bikePhysics(dt);
      engineTick(dt);
      serviceTick(dt);
      updateOrder(dt);

      game.position = (game.position + game.speed * dt) % trackLength;
      game.totalM += game.speed * dt / UNITS_PER_M;
      game.topKmh = Math.max(game.topKmh, kmhOf(game.speed));
      const pSeg = segAt(game.position + BIKE_Z_UNITS);
      game.skyOffset += pSeg.curve * (game.speed / maxSpeedU()) * dt * 10;
      game.invuln = Math.max(0, game.invuln - dt);
      game.wheelieT = Math.max(0, game.wheelieT - dt);
      // moto caiu e parou → o motoboy "chuta o motor de partida" sozinho
      if (!game.running && game.speed < uOfKmh(6) && game.starterT <= 0) {
        game.deadT = (game.deadT || 0) + dt;
        if (game.deadT > 2.2) { game.deadT = 0; game.gear = 0; tryStart(); }
      } else if (!game.running) game.deadT = 0;
      else game.deadT = 0;
      if (game.dmg > 60 && Math.random() < dt * 1.4) game.shake = Math.max(game.shake, 4);
    }

    // seta pisca
    if (game.signal !== 0) {
      game.signalT += dt;
      if (game.signalT > 0.72) { game.signalT = 0; SFX.tick(); }
    } else game.signalT = 0;

    if (game.input.hornQueued) {
      game.input.hornQueued = false;
      SFX.horn();
      const pz = game.position + BIKE_Z_UNITS;
      for (const car of game.cars) {
        const d = ((car.z - pz) % trackLength + trackLength) % trackLength;
        const dd = d > trackLength / 2 ? d - trackLength : d;
        if (dd > -300 && dd < 1500 && Math.abs(car.offset - game.playerX) < 0.9) {
          car.yieldT = 1.6;
          car.yieldTo = car.offset > game.playerX ? 0.4 : -0.4;
          car.blink = car.yieldTo > 0 ? 1 : -1;
          if (!car.changeT) { car.fromX = car.offset; car.toX = car.offset + car.yieldTo; car.changeT = 1.2; }
        }
      }
    }
  } else if (game.state === 'menu') {
    game.speed = 780;
    game.position = (game.position + game.speed * dt) % trackLength;
    const pSeg = segAt(game.position + BIKE_Z_UNITS);
    game.playerX -= dt * 1.2 * (game.speed / maxSpeedU()) * pSeg.curve * CENTRIFUGAL_LEGACY;
    game.skyOffset += pSeg.curve * (game.speed / maxSpeedU()) * dt * 10;
    game.lean = U.lerp(game.lean, -pSeg.curve * 0.07, dt * 4);
  }
  updateCars(dt * (playing || game.state === 'menu' ? 1 : 0));
  updateParticles(dt);
  weatherTick(dt);
  if (game.shake > 0) game.shake = Math.max(0, game.shake - dt * 40);
  if (game.flashT > 0) game.flashT -= dt;
  if (bannerTimer > 0) { bannerTimer -= dt; if (bannerTimer <= 0) dom.banner.className = ''; }

  SFX.update(dt, {
    rpm: game.running ? game.rpm : game.rpm, cyl: game.bike.cyl, redline: game.bike.redline,
    throttle: game.input.throttle ? 1 : 0, running: game.running && game.state === 'play', playing: game.state === 'play',
    limiter: game.limiter, damage: game.dmg, rain: game.weather > 0, speedPct: game.speed / maxSpeedU(),
  });
}
const CENTRIFUGAL_LEGACY = 0.34;

/* ------------------------- Render ---------------------------------------- */
function project(p, camX, camY, camZ) {
  p.camera.x = (p.world.x || 0) - camX;
  p.camera.y = p.world.y - camY;
  p.camera.z = p.world.z - camZ;
  p.screen.scale = CAM_D / p.camera.z;
  p.screen.x = (VW / 2) + (p.screen.scale * p.camera.x * VW / 2);
  p.screen.y = (VH / 2) - (p.screen.scale * p.camera.y * VH / 2);
  p.screen.w = p.screen.scale * ROAD_W * VW / 2;
}
let curFog = '#bcdcf0';

function renderRoad() {
  const env = envAt(game.time / DAY_LEN + CYCLE_START);
  const night = 1 - U.clamp((env.light - 0.5) / 0.5, 0, 1);
  const wet = game.wet;
  curFog = wet > 0.4 ? 'rgb(122,136,152)' : env.fog;

  const grad = ctx.createLinearGradient(0, 0, 0, VH * 0.6);
  grad.addColorStop(0, lerpColor(env.top, '#3d4652', wet * 0.55));
  grad.addColorStop(1, lerpColor(env.bot, '#57616e', wet * 0.5));
  ctx.fillStyle = grad; ctx.fillRect(0, 0, VW, VH * 0.6);

  if (env.star > 0.03 && wet < 0.4) {
    for (const s of STARS) {
      ctx.globalAlpha = env.star * (0.4 + 0.6 * Math.abs(Math.sin(game.time * 1.5 + s.tw))) * (1 - wet);
      ctx.fillStyle = '#fff'; ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.globalAlpha = 1;
  }
  const t = ((game.time / DAY_LEN + CYCLE_START) % 1 + 1) % 1;
  if (t > 0.17 && t < 0.87 && wet < 0.6) {
    const u = (t - 0.17) / 0.7;
    const sx = VW * 0.12 + VW * 0.76 * u;
    const sy = VH * 0.5 - Math.sin(u * Math.PI) * VH * 0.4;
    const glow = ctx.createRadialGradient(sx, sy, 4, sx, sy, 110);
    glow.addColorStop(0, 'rgba(255,235,150,' + (0.5 * (1 - wet)).toFixed(2) + ')'); glow.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = glow; ctx.fillRect(sx - 110, sy - 110, 220, 220);
    ctx.fillStyle = '#ffd76b'; ctx.beginPath(); ctx.arc(sx, sy, 30, 0, 7); ctx.fill();
  }
  const off = -game.skyOffset % (VW + 100);
  ridge(VH * 0.5, 150, 3.1, lerpColor(lerpColor('#3c5a3f', '#1d2742', night), '#414c58', wet * 0.6), off * 0.5);
  ridge(VH * 0.53, 105, 1.4, lerpColor(lerpColor('#2f4a33', '#161f38', night), '#333e4a', wet * 0.6), off * 0.85);

  const base = segAt(game.position);
  const basePct = (game.position % SEG_LEN) / SEG_LEN;
  const pSeg = segAt(game.position + BIKE_Z_UNITS);
  const pPct = ((game.position + BIKE_Z_UNITS) % SEG_LEN) / SEG_LEN;
  const pY = U.lerp(pSeg.p1.world.y, pSeg.p2.world.y, pPct);
  const camY = pY + CAM_H;
  let maxy = VH;
  let x = 0, dx = -(base.curve * basePct);
  const loopN = segs.length;

  for (let n = 0; n < DRAW_DIST; n++) {
    const seg = segs[(base.index + n) % loopN];
    const looped = seg.index < base.index;
    const camZ = game.position - (looped ? trackLength : 0);
    seg.clip = maxy;
    seg.fogA = 1 - Math.exp(-(FOG_DENSITY + wet * 3.5) * Math.pow(n / DRAW_DIST, 2));
    project(seg.p1, game.playerX * ROAD_W - x, camY, camZ);
    project(seg.p2, game.playerX * ROAD_W - x - dx, camY, camZ);
    x += dx; dx += seg.curve;
    seg.vis = false;
    if (seg.p1.camera.z <= CAM_D || seg.p2.screen.y >= seg.p1.screen.y || seg.p2.screen.y >= maxy) continue;
    seg.vis = true;
    drawSeg(seg, n);
    maxy = seg.p2.screen.y;
  }
  return { pSeg, pPct, night, env, wet };
}

function drawSeg(seg, n) {
  const p1 = seg.p1.screen, p2 = seg.p2.screen;
  const light = seg.light;
  const y1 = p1.y, y2 = p2.y;
  const h = Math.max(1, y1 - y2);
  const wet = game.wet;
  const gnd = (c1, c2) => lerpColor(light ? c1 : c2, '#3c4450', wet * 0.45);

  ctx.fillStyle = gnd('#4e8f3e', '#488636');
  ctx.fillRect(0, y2, VW, h);

  const poly = (w1L, w1R, w2L, w2R, col) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(p1.x - w1L, y1); ctx.lineTo(p1.x + w1R, y1);
    ctx.lineTo(p2.x + w2R, y2); ctx.lineTo(p2.x + w2L, y2);
    ctx.closePath(); ctx.fill();
  };
  poly(p1.w * 1.34, p1.w * 1.34, p2.w * 1.34, p2.w * 1.34, gnd('#9d988c', '#928d82')); // calçada
  poly(p1.w * 1.16, p1.w * 1.16, p2.w * 1.16, p2.w * 1.16, light ? PAL_CURB[0] : PAL_CURB[1]);
  poly(p1.w, p1.w, p2.w, p2.w, gnd('#5c5d64', '#55565d'));                                // asfalto
  if (wet > 0.25 && light) {                                                               // reflexo pista molhada
    ctx.globalAlpha = wet * 0.16;
    poly(p1.w * 0.9, p1.w * 0.95, p2.w * 0.9, p2.w * 0.95, '#cfe3ff');
    ctx.globalAlpha = 1;
  }
  // faixas
  const dash = light || seg.index % 2 === 0;
  if (!seg.zebra) {
    const line = (off, col, wFrac) => {
      const o1 = p1.w * off, o2 = p2.w * off, lw1 = p1.w * wFrac, lw2 = p2.w * wFrac;
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(p1.x + o1 - lw1, y1); ctx.lineTo(p1.x + o1 + lw1, y1);
      ctx.lineTo(p2.x + o2 + lw2, y2); ctx.lineTo(p2.x + o2 - lw2, y2);
      ctx.closePath(); ctx.fill();
    };
    // centro: dupla amarela
    line(-0.028, '#e8b400', 0.008); line(0.028, '#e8b400', 0.008);
    if (dash) {
      ctx.globalAlpha = 0.95;
      line(-0.5, '#e8e8e2', 0.008);
      line(0.5, '#e8e8e2', 0.008);
      ctx.globalAlpha = 1;
    }
    line(-0.985, '#e8e8e2', 0.006);
    line(0.985, '#e8e8e2', 0.006);
  } else {
    for (let k = -3; k <= 3; k++) {
      const o = k * 0.28;
      if (o > -1 && o < 1) {
        ctx.fillStyle = 'rgba(240,240,235,.9)';
        const o1 = p1.w * (o - 0.09), o2 = p1.w * (o + 0.09);
        const q1 = p2.w * (o - 0.09), q2 = p2.w * (o + 0.09);
        ctx.beginPath();
        ctx.moveTo(p1.x + o1, y1); ctx.lineTo(p1.x + o2, y1);
        ctx.lineTo(p2.x + q2, y2); ctx.lineTo(p2.x + q1, y2);
        ctx.closePath(); ctx.fill();
      }
    }
  }
  if (seg._postZone) {
    ctx.fillStyle = 'rgba(255,210,31,0.10)';
    ctx.fillRect(0, y2, VW, h);
  }
  if (seg.fogA > 0.02) {
    ctx.globalAlpha = Math.min(1, seg.fogA + game.wet * 0.05);
    ctx.fillStyle = curFog;
    ctx.fillRect(0, y2, VW, h);
    ctx.globalAlpha = 1;
  }
}
const PAL_CURB = ['#d64545', '#e8e4da'];
// meio-fio alterna vermelho/branco apenas perto de faixa/faixas — manter simples:

function drawSprite(spr, seg, pct, offset) {
  if (seg.fogA >= 0.99) return null;
  const s = U.lerp(seg.p1.screen.scale, seg.p2.screen.scale, pct);
  const sx = U.lerp(seg.p1.screen.x, seg.p2.screen.x, pct);
  const sy = U.lerp(seg.p1.screen.y, seg.p2.screen.y, pct);
  const hw = U.lerp(seg.p1.screen.w, seg.p2.screen.w, pct);
  if (s <= 0 || !isFinite(s)) return null;
  const destW = spr.w * s * VW / 2;
  const destH = destW * (spr.canvas.height / spr.canvas.width);
  const destX = sx + offset * hw;
  const clipY = seg.clip;
  ctx.save();
  if (sy > clipY) { ctx.beginPath(); ctx.rect(0, 0, VW, Math.max(0, clipY)); ctx.clip(); }
  ctx.globalAlpha = Math.max(0.08, 1 - seg.fogA * 0.92);
  ctx.drawImage(spr.canvas, destX - destW / 2, sy - destH, destW, destH);
  ctx.restore();
  ctx.globalAlpha = 1;
  return { x: destX, y: sy, w: destW, h: destH };
}

function drawCarExtras(car, seg, rect) {
  if (!rect) return;
  // seta do carro
  if (car.blink !== 0 && Math.floor(game.time * 3) % 2 === 0) {
    ctx.fillStyle = '#ffb020';
    const bx = rect.x + car.blink * rect.w * 0.42;
    ctx.fillRect(bx - rect.w * 0.05, rect.y - rect.h * 0.5, rect.w * 0.1, rect.h * 0.08);
  }
  if (car.brake) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#ff2020';
    ctx.fillRect(rect.x - rect.w * 0.4, rect.y - rect.h * 0.42, rect.w * 0.2, rect.h * 0.09);
    ctx.fillRect(rect.x + rect.w * 0.2, rect.y - rect.h * 0.42, rect.w * 0.2, rect.h * 0.09);
    ctx.restore();
  }
  // brilho do farol à noite (veículo contrário)
  if (car.dir < 0) {
    const night = game._night || 0;
    if (night > 0.3) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = night * 0.8;
      const g = ctx.createRadialGradient(rect.x, rect.y - rect.h * 0.42, 1, rect.x, rect.y - rect.h * 0.42, rect.w * 0.9);
      g.addColorStop(0, 'rgba(255,250,220,.85)'); g.addColorStop(1, 'rgba(255,250,220,0)');
      ctx.fillStyle = g;
      ctx.fillRect(rect.x - rect.w, rect.y - rect.h * 1.4, rect.w * 2, rect.h * 1.2);
      ctx.restore();
    }
  }
}

function drawBike(r) {
  const b = game.bike;
  const v = game.speed / UNITS_PER_M;
  const speedPct = game.speed / maxSpeedU();
  const scale = CAM_D / BIKE_Z_UNITS;
  const destW = (b.style === 'biz' ? 920 : b.style === 'fairing' ? 1180 : 1080) * scale * VW / 2;
  const cx = VW / 2 + game.lean * 10;
  const cy = VH * 0.895;
  const lean = game.lean * 0.42;
  const idleShake = game.running ? (game.rpm < b.idle * 1.4 ? 1.6 : 0.6) + (game.dmg > 40 ? 1.4 : 0) : 0;
  const bounce = game.crashT > 0 ? 0 : (Math.random() - 0.5) * (2.2 * speedPct + idleShake);
  const flick = game.invuln > 0.4 && Math.floor(game.invuln * 12) % 2 === 0;
  if (flick && game.crashT <= 0) return;

  ctx.save();
  ctx.translate(cx, cy + bounce);
  const tumble = game.tumbleT > 0;
  ctx.rotate(tumble ? (1.9 - game.crashT) * 5.2 : lean * 0.22 + (game.crashT > 0 ? Math.sin(game.crashT * 22) * 0.1 : 0) - game.wheelieT * 0.12);
  ctx.scale(destW / 200, destW / 200);
  if (tumble) ctx.translate(0, -Math.min(60, (1.9 - game.crashT) * 90));
  // sombra
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.beginPath(); ctx.ellipse(0, 2, 95, 13, 0, 0, 7); ctx.fill();
  // pneu
  ctx.fillStyle = '#17181c'; rr(ctx, -22, -80, 44, 80, 14); ctx.fill();
  ctx.fillStyle = '#2a2c31'; rr(ctx, -16, -74, 32, 64, 11); ctx.fill();
  ctx.fillStyle = '#9aa2ac'; ctx.beginPath(); ctx.arc(0, -42, 12, 0, 7); ctx.fill();
  ctx.fillStyle = '#5c636c'; ctx.beginPath(); ctx.arc(0, -42, 5, 0, 7); ctx.fill();
  // balança + escapamentos
  ctx.fillStyle = '#4a4f57'; ctx.fillRect(-30, -52, 8, 24); ctx.fillRect(22, -52, 8, 24);
  const fair = b.style === 'fairing';
  ctx.fillStyle = fair ? '#20242a' : '#c7ccd3';
  rr(ctx, -66, -38, 28, 13, 6); ctx.fill(); rr(ctx, 38, -38, 28, 13, 6); ctx.fill();
  ctx.fillStyle = '#22252a';
  ctx.beginPath(); ctx.arc(-64, -31, 4.2, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(64, -31, 4.2, 0, 7); ctx.fill();
  // fumaça do escapamento (dano / aquecendo)
  if (game.running && (game.dmg > 45 || (v < 3 && game.time % 1 < 0.5))) {
    spawnParticles(cx - 60, cy - 30, 1, { colors: ['rgba(200,200,200,.5)', 'rgba(160,160,170,.4)'], spread: 26, vy: -34, g: -20, life: 1.1, size: 7 });
  }
  if (game.input.throttle && game.rpm > b.redline * 0.72 && game.crashT <= 0 && game.running) {
    ctx.fillStyle = 'rgba(255,140,40,.85)';
    const f = 3 + Math.random() * 6;
    ctx.beginPath(); ctx.moveTo(-66, -31); ctx.lineTo(-66 - f, -35); ctx.lineTo(-66 - f, -27); ctx.fill();
    ctx.beginPath(); ctx.moveTo(66, -31); ctx.lineTo(66 + f, -35); ctx.lineTo(66 + f, -27); ctx.fill();
  }
  // rabeta
  ctx.fillStyle = b.c1; rr(ctx, -26, -98, 52, 24, fair ? 5 : 8); ctx.fill();
  ctx.fillStyle = b.c2; rr(ctx, -26, -86, 52, 12, 6); ctx.fill();
  ctx.fillStyle = game.input.brakeF || game.input.brakeR || game.crashT > 0 ? '#ff4545' : '#b02020';
  rr(ctx, -8, -96, 16, 8, 3); ctx.fill();
  if (game.input.brakeF) { ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 16; rr(ctx, -8, -96, 16, 8, 3); ctx.fill(); ctx.shadowBlur = 0; }
  if (b.box || game.mode === 'delivery') {
    ctx.fillStyle = '#e8e6dd'; rr(ctx, -12, -76, 24, 11, 2); ctx.fill();
    ctx.fillStyle = '#111'; ctx.font = 'bold 7px Arial'; ctx.textAlign = 'center'; ctx.fillText('MOTO-24', 0, -68);
  }
  // corpo / carenagem
  ctx.beginPath();
  if (fair) { ctx.moveTo(-40, -100); ctx.lineTo(40, -100); ctx.lineTo(34, -150); ctx.lineTo(-34, -150); }
  else { ctx.moveTo(-28, -98); ctx.lineTo(28, -98); ctx.lineTo(24, -152); ctx.lineTo(-24, -152); }
  ctx.closePath(); ctx.fillStyle = b.c1; ctx.fill();
  if (fair) {
    ctx.fillStyle = 'rgba(30,60,90,.75)';
    ctx.beginPath(); ctx.moveTo(-30, -150); ctx.lineTo(30, -150); ctx.lineTo(22, -172); ctx.lineTo(-22, -172); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#111'; ctx.lineWidth = 2; ctx.stroke();
  }
  // caixa de entrega (motoboy)
  if (game.mode === 'delivery') {
    ctx.fillStyle = '#ffd21f'; rr(ctx, -38, -148, 76, 52, 6); ctx.fill();
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; rr(ctx, -38, -148, 76, 52, 6); ctx.stroke();
    ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-38, -126, 76, 5);
    ctx.font = 'bold 11px Arial'; ctx.textAlign = 'center'; ctx.fillText('EXPRESS', 0, -112);
  }
  // piloto
  const tuck = fair ? 8 : 0;
  ctx.beginPath();
  ctx.moveTo(-33, -152 + tuck); ctx.lineTo(33, -152 + tuck); ctx.lineTo(27, -206 + tuck * 1.6); ctx.lineTo(-27, -206 + tuck * 1.6);
  ctx.closePath(); ctx.fillStyle = '#33415c'; ctx.fill();
  ctx.strokeStyle = '#ffd21f'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-21, -178 + tuck); ctx.lineTo(0, -165 + tuck); ctx.lineTo(21, -178 + tuck); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-21, -193 + tuck); ctx.lineTo(0, -180 + tuck); ctx.lineTo(21, -193 + tuck); ctx.stroke();
  ctx.strokeStyle = '#33415c'; ctx.lineWidth = 12; ctx.lineCap = 'round';
  const armSwing = game.lean * 6;
  const armY = -160 + tuck * 1.2;
  ctx.beginPath(); ctx.moveTo(-29, -198 + tuck); ctx.quadraticCurveTo(-52, -190 + armSwing, -54, armY + armSwing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(29, -198 + tuck); ctx.quadraticCurveTo(52, -190 + armSwing, 54, armY + armSwing); ctx.stroke();
  ctx.fillStyle = '#15181c';
  ctx.beginPath(); ctx.arc(-54, armY + armSwing, 5.6, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(54, armY + armSwing, 5.6, 0, 7); ctx.fill();
  // capacete
  const hy = -226 + tuck * 1.4;
  ctx.fillStyle = '#eef0f3'; ctx.beginPath(); ctx.arc(0, hy, 20, 0, 7); ctx.fill();
  ctx.fillStyle = b.c1; ctx.fillRect(-20, hy - 6, 40, 6);
  ctx.fillStyle = '#20242a'; ctx.beginPath(); ctx.arc(0, hy, 20, Math.PI * 0.12, Math.PI * 0.88); ctx.fill();
  ctx.restore();

  // farol alto (noite)
  if (r.night > 0.25) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = r.night * 0.26;
    const g2 = ctx.createLinearGradient(cx, cy - 60, cx, VH * 0.42);
    g2.addColorStop(0, 'rgba(255,244,190,0.55)'); g2.addColorStop(1, 'rgba(255,244,190,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy - 70); ctx.lineTo(cx - 330, VH * 0.42);
    ctx.lineTo(cx + 330, VH * 0.42); ctx.lineTo(cx + 40, cy - 70);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}

/* ------------------------- Painel analógico (canvas) --------------------- */
function drawGaugeDial(cx, cy, r, opts) {
  const { value, max, redzone, label, unit, major, minor } = opts;
  const a0 = Math.PI * 0.78, a1 = Math.PI * 2.22;
  ctx.save();
  ctx.translate(cx, cy);
  // fundo
  ctx.fillStyle = 'rgba(8,11,17,0.82)';
  ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, 0, r - 1, 0, 7); ctx.stroke();
  // zona vermelha
  if (redzone !== undefined) {
    ctx.strokeStyle = 'rgba(224,27,27,0.85)'; ctx.lineWidth = r * 0.1;
    ctx.beginPath(); ctx.arc(0, 0, r * 0.86, U.lerp(a0, a1, redzone / max), a1); ctx.stroke();
  }
  // marcações
  ctx.fillStyle = 'rgba(235,240,245,0.9)';
  ctx.strokeStyle = 'rgba(235,240,245,0.9)';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (let i = 0; i <= major; i++) {
    const a = U.lerp(a0, a1, i / major);
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78);
    ctx.lineTo(Math.cos(a) * r * 0.93, Math.sin(a) * r * 0.93);
    ctx.stroke();
    ctx.font = 'bold ' + Math.round(r * 0.16) + 'px Arial';
    ctx.fillText(String(Math.round((max / major) * i)), Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62);
  }
  for (let i = 0; i <= major * (minor || 5); i++) {
    const a = U.lerp(a0, a1, i / (major * (minor || 5)));
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r * 0.88, Math.sin(a) * r * 0.88);
    ctx.lineTo(Math.cos(a) * r * 0.93, Math.sin(a) * r * 0.93);
    ctx.stroke();
  }
  // ponteiro
  const p = U.clamp(value / max, 0, 1.02);
  const na = U.lerp(a0, a1, Math.min(1, p));
  ctx.strokeStyle = opts.needle || '#ff4b3a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-Math.cos(na) * r * 0.12, -Math.sin(na) * r * 0.12);
  ctx.lineTo(Math.cos(na) * r * 0.85, Math.sin(na) * r * 0.85);
  ctx.stroke();
  ctx.fillStyle = '#20242a';
  ctx.beginPath(); ctx.arc(0, 0, r * 0.09, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(180,190,200,.8)';
  ctx.font = '600 ' + Math.round(r * 0.13) + 'px Arial';
  ctx.fillText(unit, 0, r * 0.4);
  ctx.restore();
}
function drawGauges() {
  const b = game.bike;
  drawGaugeDial(VW - 108, VH - 118, 96, { value: kmhOf(game.speed), max: Math.round(b.top / 20) * 20, label: 'km/h', unit: 'km/h', major: 8 });
  drawGaugeDial(VW - 288, VH - 100, 66, { value: game.rpm / 1000, max: b.redline / 1000, redzone: b.redline * 0.92 / 1000, unit: 'rpm×1000', needle: '#ffd21f', major: Math.round(b.redline / 1000) });
  // digital central: marcha + combustível + marcha Eng/limiter
  ctx.save();
  ctx.translate(VW - 108, VH - 118);
  ctx.fillStyle = game.gear < 0 ? '#8a93a0' : '#ffd21f';
  ctx.font = 'bold 30px Consolas, monospace'; ctx.textAlign = 'center';
  ctx.fillText(game.gear < 0 ? 'N' : String(game.gear + 1), 0, -22);
  if (game.limiter && game.running) { ctx.fillStyle = '#ff4b3a'; ctx.font = 'bold 12px Arial'; ctx.fillText('LIMIT', 0, 34); }
  if (!game.running) { ctx.fillStyle = '#ff6b6b'; ctx.font = 'bold 13px Arial'; ctx.fillText('ESCALAR-LIGAR: E', 0, 52); }
  ctx.restore();
  // combustível
  const fu = SIM.fuel ? game.fuel / b.tank : 1;
  ctx.save();
  ctx.translate(VW - 108, VH - 118);
  ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(0, 0, 112, Math.PI * 0.62, Math.PI * 0.8); ctx.stroke();
  ctx.strokeStyle = fu < 0.15 ? '#ff4b3a' : '#35e05e';
  ctx.beginPath(); ctx.arc(0, 0, 112, Math.PI * 0.8 - Math.PI * 0.18 * (1 - fu), Math.PI * 0.8); ctx.stroke();
  ctx.fillStyle = fu < 0.15 ? '#ff4b3a' : 'rgba(255,255,255,.6)';
  ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
  ctx.fillText('⛽ ' + (SIM.fuel ? game.fuel.toFixed(1).replace('.', ',') + ' L' : '—'), 0, -118);
  ctx.restore();
  // setas
  if (game.signal !== 0) {
    const on = Math.floor(game.time * 1.4) % 2 === 0;
    if (on) {
      ctx.fillStyle = '#35e05e'; ctx.font = 'bold 34px Arial'; ctx.textAlign = 'center';
      ctx.fillText(game.signal < 0 ? '◀' : '▶', VW / 2, VH - 90);
    }
  }
  // chuva / radar
  ctx.font = 'bold 13px Arial'; ctx.textAlign = 'left';
  let info = (game.weather > 0.4 ? '⛈ pista molhada  ' : '') + (SIM.radar ? 'limite ' + SPEED_LIMIT + ' km/h' : '');
  ctx.fillStyle = game.weather > 0.4 ? '#9fc6ff' : 'rgba(255,255,255,.55)';
  ctx.fillText(info, 16, VH - 16);
  // hodômetro
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.fillText('ODO ' + U.fmtDist(game.totalM) + '  •  ' + b.name, VW - 16, VH - 16);
}

function drawRain() {
  if (game.wet < 0.04) return;
  ctx.save();
  ctx.globalAlpha = game.wet;
  ctx.strokeStyle = 'rgba(200,220,255,0.5)';
  ctx.lineWidth = 1.4;
  const n = Math.round(70 * game.wet);
  for (let i = 0; i < n; i++) {
    const seed = (i * 727) % 1000;
    const x = (seed * 997 + game.time * (900 + (i % 5) * 300) * 2) % (VW + 300) - 150;
    const y = (seed * 131 + game.time * (1600 + (i % 7) * 400) * 3) % (VH * 1.2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 14 - speedOff(), y + 26);
    ctx.stroke();
  }
  ctx.restore();
}
function speedOff() { return 10 + (game.speed / maxSpeedU()) * 40; }

/* ------------------------- Render principal ------------------------------- */
function render() {
  ctx.setTransform(canvas.width / VW, 0, 0, canvas.height / VH, 0, 0);
  ctx.save();
  if (game.shake > 0.4) ctx.translate((Math.random() - 0.5) * game.shake, (Math.random() - 0.5) * game.shake * 0.7);

  const r = renderRoad();
  game._night = r.night;
  const env = r.env;

  const base = segAt(game.position);
  const loopN = segs.length;
  for (let n = DRAW_DIST - 1; n >= 1; n--) {
    const seg = segs[(base.index + n) % loopN];
    if (!seg.vis || seg.p1.camera.z <= CAM_D) continue;
    for (const spr of seg.sprites) {
      const rect = drawSprite(SPR[spr.key], seg, 0, spr.offset);
      if (rect && spr.key === 'post' && r.night > 0.25) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = r.night * 0.65;
        const gx = rect.x + rect.w * 0.14, gy = rect.y - rect.h * 0.86;
        const g = ctx.createRadialGradient(gx, gy, 1, gx, gy, Math.max(6, rect.w * 0.9));
        g.addColorStop(0, 'rgba(255,230,150,.9)'); g.addColorStop(1, 'rgba(255,230,150,0)');
        ctx.fillStyle = g; ctx.fillRect(gx - rect.w, gy - rect.w, rect.w * 2, rect.w * 2);
        ctx.restore();
      }
      if (rect && spr.dest) {
        const pulse = 0.5 + 0.5 * Math.sin(game.time * 6);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.35 + pulse * 0.3;
        ctx.fillStyle = '#ffd21f';
        ctx.fillRect(rect.x - rect.w * 0.52, rect.y - rect.h * 1.06, rect.w * 1.04, 4);
        ctx.restore();
      }
    }
    for (const car of seg.cars) {
      const rect = drawSprite(SPR[car.key], seg, car.pct, car.offset);
      drawCarExtras(car, seg, rect);
    }
  }

  drawBike(r);
  drawParticles();
  drawRain();

  if (r.night > 0.02) {
    ctx.fillStyle = 'rgba(8,12,32,' + (r.night * 0.30 + game.wet * 0.12).toFixed(3) + ')';
    ctx.fillRect(0, 0, VW, VH);
  }
  const speedPct = game.speed / maxSpeedU();
  if (speedPct > 0.75 && !game.weather) {
    ctx.save();
    ctx.globalAlpha = (speedPct - 0.75) * 0.8;
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      const yy = (VH * 0.2) + ((game.time * 900 + i * 137) % (VH * 0.72));
      const side = i % 2 === 0 ? 1 : -1;
      const xx = VW / 2 + side * (VW * 0.30 + (i % 3) * 60);
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + side * 60, yy); ctx.stroke();
    }
    ctx.restore();
  }
  if (game.flashT > 0) { ctx.fillStyle = 'rgba(255,255,255,' + (game.flashT * 5).toFixed(2) + ')'; ctx.fillRect(0, 0, VW, VH); }
  if (game.crashT > 0) { ctx.fillStyle = 'rgba(255,40,40,' + (game.crashT * 0.13).toFixed(3) + ')'; ctx.fillRect(0, 0, VW, VH); }
  if (game.state === 'play') drawGauges();
  const vg = ctx.createRadialGradient(VW / 2, VH * 0.55, VH * 0.45, VW / 2, VH * 0.55, VH * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.38)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, VW, VH);
  ctx.restore();
}

/* ------------------------- HUD (DOM) -------------------------------------- */
let lastHud = {};
function setText(el, v) { if (el && lastHud[el.id] !== v) { lastHud[el.id] = v; el.textContent = v; } }
function updateHUD() {
  const ct = ((game.time / DAY_LEN + CYCLE_START) % 1 + 1) % 1;
  const hours = Math.floor(ct * 24);
  const mins = Math.floor(((ct * 24) % 1) * 60);
  setText(dom.hClock, String(hours).padStart(2, '0') + ':' + String(mins).padStart(2, '0'));
  setText(dom.hMoney, U.fmtMoney(game.money));
  dom.hCombo.textContent = 'x' + game.combo;
  dom.hCombo.classList.toggle('hot', game.combo >= 3);
  dom.hLives.textContent = '';
  for (let i = 0; i < 3; i++) {
    const sp = document.createElement('span');
    sp.textContent = '📦';
    if (i >= game.lives) sp.className = 'lost';
    dom.hLives.appendChild(sp);
  }
  if (game.order && game.mode === 'delivery') {
    const o = game.order;
    setText(dom.hRemain, U.fmtDist(Math.max(0, o.distM - (game.totalM - o.startM))));
    setText(dom.hClient, o.client);
    setText(dom.hAddr, o.addr + '  •  CEP ' + o.cep);
    setText(dom.hReward, U.fmtMoney(o.base + Math.round(Math.max(0, o.timeLeft)) * 1.6 + game.combo * 12));
    dom.hFragile.style.display = o.fragile ? '' : 'none';
    dom.hProg.style.width = (U.clamp((game.totalM - o.startM) / o.distM, 0, 1) * 100) + '%';
    const tp = U.clamp(o.timeLeft / o.timeMax, 0, 1);
    dom.hTimer.style.width = (tp * 100) + '%';
    dom.hTimer.classList.toggle('low', tp < 0.25);
    setText(dom.hTimerNum, Math.max(0, Math.ceil(o.timeLeft)) + 's');
  }
  const dmgBar = $('h-dmg');
  if (dmgBar) dmgBar.style.width = Math.round(game.dmg) + '%';
}

/* ------------------------- Input ------------------------------------------ */
const KEYS = {
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
  ArrowUp: 'throttle', w: 'throttle', W: 'throttle',
  ArrowDown: 'brakeF', s: 'brakeF', S: 'brakeF',
  b: 'brakeR', B: 'brakeR',
};
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();
  const k = KEYS[e.key];
  if (k) { game.input[k] = true; SFX.init(); SFX.resume(); }
  if (e.key === ' ') { if (game.state === 'play') game.input.hornQueued = true; }
  if ((e.key === 'e' || e.key === 'E') && game.state === 'play') game.input.shiftUp = true;
  if ((e.key === 'q' || e.key === 'Q') && game.state === 'play') game.input.shiftDown = true;
  if (e.key === 'z' || e.key === 'Z') game.signal = game.signal === -1 ? 0 : -1;
  if (e.key === 'x' || e.key === 'X') game.signal = game.signal === 1 ? 0 : 1;
  if (e.key === 'Enter' && game.state === 'play' && !game.running) tryStart();
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if (game.state === 'play' || game.state === 'pause') togglePause(); }
  if (e.key === 'm' || e.key === 'M') { const on = SFX.toggle(); dom.btnSound.textContent = on ? '🔊' : '🔇'; }
});
document.addEventListener('keyup', (e) => { const k = KEYS[e.key]; if (k) game.input[k] = false; });
document.addEventListener('visibilitychange', () => { if (document.hidden && game.state === 'play') togglePause(); });
function bindHold(el, key, isTap) {
  if (!el) return;
  const on = (e) => { e.preventDefault(); if (isTap) game.input[key] = true; else game.input[key] = true; SFX.init(); SFX.resume(); };
  const off = (e) => { e.preventDefault(); if (!isTap) game.input[key] = false; };
  el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off);
  el.addEventListener('pointercancel', off); el.addEventListener('pointerleave', off);
}
bindHold($('t-left'), 'left');
bindHold($('t-right'), 'right');
bindHold($('t-accel'), 'throttle');
bindHold($('t-brake'), 'brakeF');
bindHold($('t-rear'), 'brakeR');
bindHold($('t-up'), 'shiftUp', true);
bindHold($('t-down'), 'shiftDown', true);
bindHold($('t-start'), 'shiftUp', true);
if (matchMedia && matchMedia('(pointer:coarse)').matches) dom.touch.classList.add('on');

/* ------------------------- Menu: garagem + simulação ---------------------- */
function buildMenu() {
  dom.bikeList.innerHTML = '';
  BIKES.forEach((b, i) => {
    const unlocked = bikeUnlocked(b) || game.mode === 'free';
    const card = document.createElement('button');
    card.className = 'bike-card' + (i === game.bikeIdx ? ' sel' : '') + (unlocked ? '' : ' lock');
    card.innerHTML =
      '<div class="bc-color" style="background:' + b.c1 + '"></div>' +
      '<div class="bc-name">' + b.name + '</div>' +
      '<div class="bc-cls">' + b.cls + '</div>' +
      '<div class="bc-specs">' + b.top + ' km/h • ' + b.hp + ' cv • ' + b.cyl + ' cil<br>' +
      b.gears.length + ' marchas • ' + b.tank + ' L • ' + b.kmL + ' km/L</div>' +
      (bikeUnlocked(b) ? '' : '<div class="bc-lock">🔒 ' + b.unlock + ' entregas pra liberar</div>');
    card.addEventListener('click', () => { game.bikeIdx = i; buildMenu(); });
    dom.bikeList.appendChild(card);
  });
  dom.simBox.innerHTML = '';
  const OPTS = [
    ['manual', 'Câmbio manual + motor real', 'marchas Q/E, engasgo, calço, limitador'],
    ['fuel', 'Combustível e postos', 'gasto por RPM, parar no posto pra abastecer'],
    ['damage', 'Avarias', 'batidas danificam; reparo no posto (pago)'],
    ['weather', 'Clima dinâmico', 'chuva, pista molhada, aquaplanagem'],
    ['twoWay', 'Mão dupla com fluxo contrário', 'ultrapassar é vida ou morte'],
    ['radar', 'Radar e multas reais', 'limite 60 km/h — valores CTB'],
  ];
  OPTS.forEach(o => {
    const row = document.createElement('label');
    row.className = 'sim-row';
    row.innerHTML = '<input type="checkbox" ' + (SIM[o[0]] ? 'checked' : '') + '><span><b>' + o[1] + '</b><i>' + o[2] + '</i></span>';
    row.querySelector('input').addEventListener('change', (e) => { SIM[o[0]] = e.target.checked; saveSim(); });
    dom.simBox.appendChild(row);
  });
  const quick = document.createElement('div');
  quick.className = 'sim-quick';
  const bReal = document.createElement('button'); bReal.className = 'small'; bReal.textContent = 'TUDO REALISTA';
  bReal.onclick = () => { Object.keys(SIM_DEFAULT).forEach((k) => SIM[k] = true); saveSim(); buildMenu(); };
  const bArc = document.createElement('button'); bArc.className = 'small'; bArc.textContent = 'Modo simples (arcade)';
  bArc.onclick = () => { Object.keys(SIM_DEFAULT).forEach((k) => SIM[k] = false); saveSim(); buildMenu(); };
  quick.appendChild(bReal); quick.appendChild(bArc);
  dom.simBox.appendChild(quick);
}

$('btn-delivery').addEventListener('click', () => startGame('delivery'));
$('btn-free').addEventListener('click', () => startGame('free'));
$('btn-help').addEventListener('click', () => { dom.help.style.display = ''; });
$('btn-help-close').addEventListener('click', () => { dom.help.style.display = 'none'; });
$('btn-resume').addEventListener('click', togglePause);
$('btn-restart').addEventListener('click', () => startGame(game.mode));
$('btn-quit').addEventListener('click', toMenu);
$('btn-again').addEventListener('click', () => startGame(game.mode));
$('btn-menu').addEventListener('click', toMenu);
dom.btnSound.addEventListener('click', () => { const on = SFX.toggle(); dom.btnSound.textContent = on ? '🔊' : '🔇'; });
canvas.addEventListener('pointerdown', () => { SFX.init(); SFX.resume(); });

/* ------------------------- Loop + boot ------------------------------------ */
let lastT = performance.now(), acc = 0;
function frame(now) {
  let dt = (now - lastT) / 1000;
  lastT = now;
  if (dt > 0.25) dt = 0.25;
  acc += dt;
  let guard = 0;
  while (acc >= STEP && guard++ < 5) { update(STEP); acc -= STEP; }
  render();
  updateHUD();
  requestAnimationFrame(frame);
}
function resize() {
  const ar = VW / VH;
  const w = window.innerWidth, h = window.innerHeight;
  let cw = w, chh = w / ar;
  if (chh > h) { chh = h; cw = h * ar; }
  const wrap = document.getElementById('wrap');
  wrap.style.width = Math.floor(cw) + 'px';
  wrap.style.height = Math.floor(chh) + 'px';
}
window.addEventListener('resize', resize);

buildTrack();
spawnCars(40);
game.running = false;
toMenu();
resize();
requestAnimationFrame(frame);
