'use strict';
/* =====================================================================
   MOTO EXPRESS — Simulador de Moto (entregas na cidade)
   Motor pseudo-3D estilo Out Run, 100% canvas, sem dependências.
   ===================================================================== */

/* ------------------------- Constantes -------------------------------- */
const VW = 1280, VH = 720;              // resolução virtual (lógica)
const SEG_LEN = 200;                     // comprimento de um segmento (5 m)
const RUMBLE_LEN = 3;                    // segmentos por listra
const ROAD_W = 1750;                     // meia-largura da estrada (mundo)
const LANES = 3;
const CAM_H = 1000;                      // altura da câmera
const FOV = 100;                         // graus
const CAM_D = 1 / Math.tan((FOV / 2) * Math.PI / 180);
const PLAYER_Z = CAM_H * CAM_D;
const DRAW_DIST = 250;                   // segmentos desenhados
const FOG_DENSITY = 5.5;
const UNITS_PER_M = 40;                  // 1 m = 40 unidades
const MAX_SPEED = 2000;                  // unidades/s  ->  180 km/h
const ACCEL = 1000;
const BRAKE = 2600;
const DECEL = 420;                       // arrasto/coast
const OFFROAD_DECEL = 2300;
const OFFROAD_LIMIT = 620;
const CENTRIFUGAL = 0.34;
const PLAYER_NW = 0.46;                  // largura da moto (unidades normalizadas)
const DAY_LEN = 180;                     // segundos por ciclo dia/noite
const CYCLE_START = 0.30;                // começa de manhã
const BIKE_Z_UNITS = 2400;               // distância da moto ao para-brisa
const STEP = 1 / 60;

const KMH = (s) => (s / MAX_SPEED) * 180;

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
  fmtDist: (m) => (m >= 1000 ? (m / 1000).toFixed(1).replace('.', ',') + ' km' : Math.round(m) + ' m'),
};

function hex2rgb(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
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

/* ------------------------- Paleta da pista ----------------------------- */
const PAL = {
  roadLight: '#5c5d64', roadDark: '#55565d',
  lane: '#e9e9e2',
  curbRed: '#d64545', curbWhite: '#e8e4da',
  walkLight: '#9d988c', walkDark: '#928d82',
  groundLight: '#4e8f3e', groundDark: '#488636',
};

/* ------------------------- Áudio (WebAudio) ----------------------------- */
class Sound {
  constructor() { this.ctx = null; this.ok = true; this.enabled = true; }
  init() {
    if (this.ctx || !this.ok) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { this.ok = false; return; }
    try { this.ctx = new AC(); } catch (e) { this.ok = false; return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = 0.5; this.master.connect(c.destination);

    // motor: dois osciladores + filtro
    this.engGain = c.createGain(); this.engGain.gain.value = 0;
    this.engFilter = c.createBiquadFilter(); this.engFilter.type = 'lowpass'; this.engFilter.frequency.value = 700;
    this.engOsc1 = c.createOscillator(); this.engOsc1.type = 'sawtooth';
    this.engOsc2 = c.createOscillator(); this.engOsc2.type = 'square';
    this.engSub = c.createOscillator(); this.engSub.type = 'triangle';
    this.engSubG = c.createGain(); this.engSubG.gain.value = 0.35;
    this.engOsc1.connect(this.engFilter); this.engOsc2.connect(this.engFilter);
    this.engSub.connect(this.engSubG); this.engSubG.connect(this.engFilter);
    this.engFilter.connect(this.engGain); this.engGain.connect(this.master);
    this.engOsc1.start(); this.engOsc2.start(); this.engSub.start();

    // vento: ruído filtrado
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;
    const src = c.createBufferSource(); src.buffer = buf; src.loop = true;
    this.windFilter = c.createBiquadFilter(); this.windFilter.type = 'bandpass'; this.windFilter.frequency.value = 900; this.windFilter.Q.value = 0.6;
    this.windGain = c.createGain(); this.windGain.gain.value = 0;
    src.connect(this.windFilter); this.windFilter.connect(this.windGain); this.windGain.connect(this.master);
    src.start();
  }
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); }
  toggle() { this.enabled = !this.enabled; if (this.master) this.master.gain.value = this.enabled ? 0.5 : 0; return this.enabled; }
  engine(rpm01, load, speedPct, playing) {
    if (!this.ctx || !this.enabled) return;
    const t = this.ctx.currentTime;
    const f = 48 + rpm01 * 132;
    this.engOsc1.frequency.setTargetAtTime(f, t, 0.05);
    this.engOsc2.frequency.setTargetAtTime(f * 0.501, t, 0.05);
    this.engSub.frequency.setTargetAtTime(f * 0.25, t, 0.08);
    this.engFilter.frequency.setTargetAtTime(420 + rpm01 * 1700 + load * 500, t, 0.06);
    const g = playing ? 0.05 + load * 0.07 + rpm01 * 0.075 : 0;
    this.engGain.gain.setTargetAtTime(g, t, 0.08);
    this.windGain.gain.setTargetAtTime(playing ? speedPct * 0.05 : 0, t, 0.1);
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
  crash() {
    if (!this.ctx || !this.enabled) return;
    const c = this.ctx, t = c.currentTime;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'lowpass';
    f.frequency.setValueAtTime(2600, t); f.frequency.exponentialRampToValueAtTime(140, t + 0.35);
    const g = c.createGain();
    g.gain.setValueAtTime(0.45, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t); s.stop(t + 0.5);
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
  delivered() {
    if (!this.ctx || !this.enabled) return;
    [660, 880, 1100].forEach((f, i) => setTimeout(() => this.ding(f, 0.2, 0.2), i * 90));
  }
  blip() { this.ding(520, 0.08, 0.12); }
}
const SFX = new Sound();

/* ------------------------- Sprites procedurais -------------------------- */
const SPR = {};
function makeSprite(key, cw, ch, worldW, ground, draw) {
  const cv = document.createElement('canvas');
  cv.width = cw; cv.height = ch;
  draw(cv.getContext('2d'), cw, ch);
  SPR[key] = { canvas: cv, w: worldW, ground: !!ground };
}
function rrFill(ctx, x, y, w, h, r, col) { ctx.fillStyle = col; rr(ctx, x, y, w, h, r); ctx.fill(); }

const CAR_COLORS = [
  ['#e0e1e6', '#c9cbd2'], ['#2b2d33', '#191a1f'], ['#d23a2a', '#a32a1e'],
  ['#2e6fd2', '#23539c'], ['#e8b62a', '#c2951a'], ['#3aa05e', '#2b7c48'], ['#7a4db0', '#5d3889'],
];

function drawCarSprite(ctx, w, h, body, dark, type) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#666b73'); g.addColorStop(1, '#3a3e44');
  ctx.fillStyle = g;
  ctx.fillRect(4, h - 12, 26, 12); ctx.fillRect(w - 30, h - 12, 26, 12);
  if (type === 'hatch') {
    rrFill(ctx, w * 0.18, h * 0.05, w * 0.64, h * 0.30, 10, body);
    ctx.fillStyle = '#1c2126'; rr(ctx, w * 0.24, h * 0.09, w * 0.52, h * 0.17, 5); ctx.fill();
    rrFill(ctx, w * 0.06, h * 0.30, w * 0.88, h * 0.48, 12, body);
    rrFill(ctx, w * 0.10, h * 0.55, w * 0.80, h * 0.14, 4, dark);
    rrFill(ctx, w * 0.38, h * 0.44, w * 0.24, h * 0.10, 2, '#e6e2d6');
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.20, h - 10, w * 0.16, 10); ctx.fillRect(w * 0.64, h - 10, w * 0.16, 10);
    ctx.fillStyle = '#ff3434'; rr(ctx, w * 0.10, h * 0.40, w * 0.13, h * 0.09, 3); ctx.fill();
    rr(ctx, w * 0.77, h * 0.40, w * 0.13, h * 0.09, 3); ctx.fill();
    ctx.fillStyle = '#ff5555'; rr(ctx, w * 0.44, h * 0.34, w * 0.12, h * 0.05, 2); ctx.fill();
    ctx.fillStyle = '#c9ced4'; ctx.fillRect(w * 0.30, h * 0.66, w * 0.05, h * 0.06); ctx.fillRect(w * 0.65, h * 0.66, w * 0.05, h * 0.06);
  } else if (type === 'pickup') {
    rrFill(ctx, w * 0.10, h * 0.10, w * 0.40, h * 0.28, 8, body);
    ctx.fillStyle = '#1c2126'; rr(ctx, w * 0.15, h * 0.14, w * 0.30, h * 0.16, 4); ctx.fill();
    rrFill(ctx, w * 0.06, h * 0.36, w * 0.88, h * 0.44, 10, body);
    ctx.fillStyle = dark; ctx.fillRect(w * 0.52, h * 0.40, w * 0.40, h * 0.24);
    rrFill(ctx, w * 0.52, h * 0.36, w * 0.40, h * 0.06, 3, body);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.14, h - 10, w * 0.18, 10); ctx.fillRect(w * 0.66, h - 10, w * 0.18, 10);
    ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.07, h * 0.48, w * 0.05, h * 0.10); ctx.fillRect(w * 0.88, h * 0.48, w * 0.05, h * 0.10);
  } else if (type === 'truck') {
    ctx.fillStyle = '#4c4f55'; rr(ctx, w * 0.12, h - 16, w * 0.76, 14, 4); ctx.fill();
    rrFill(ctx, w * 0.08, h * 0.04, w * 0.84, h * 0.72, 8, body);
    ctx.strokeStyle = dark; ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.10, h * 0.08, w * 0.80, h * 0.64);
    ctx.beginPath(); ctx.moveTo(w * 0.5, h * 0.06); ctx.lineTo(w * 0.5, h * 0.74); ctx.stroke();
    ctx.fillStyle = '#d8d5cc'; ctx.fillRect(w * 0.10, h * 0.70, w * 0.80, h * 0.05);
    ctx.fillStyle = '#c9ced4'; ctx.fillRect(w * 0.12, h * 0.75, w * 0.10, h * 0.06); ctx.fillRect(w * 0.78, h * 0.75, w * 0.10, h * 0.06);
    ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.10, h * 0.60, w * 0.07, h * 0.08); ctx.fillRect(w * 0.83, h * 0.60, w * 0.07, h * 0.08);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.16, h - 12, w * 0.14, 12); ctx.fillRect(w * 0.70, h - 12, w * 0.14, 12);
  } else if (type === 'bus') {
    rrFill(ctx, w * 0.06, h * 0.04, w * 0.88, h * 0.74, 10, body);
    ctx.fillStyle = '#20262c'; ctx.fillRect(w * 0.12, h * 0.10, w * 0.76, h * 0.16);
    rrFill(ctx, w * 0.10, h * 0.32, w * 0.80, h * 0.16, 4, '#2b3238');
    ctx.fillStyle = '#e8e6dd'; ctx.fillRect(w * 0.08, h * 0.60, w * 0.84, h * 0.06);
    ctx.fillStyle = '#1b1d20'; ctx.fillRect(w * 0.28, h * 0.48, w * 0.12, h * 0.14); ctx.fillRect(w * 0.60, h * 0.48, w * 0.12, h * 0.14);
    ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.10, h * 0.68, w * 0.10, h * 0.07); ctx.fillRect(w * 0.80, h * 0.68, w * 0.10, h * 0.07);
    ctx.fillStyle = '#0c0d0f'; ctx.fillRect(w * 0.18, h - 12, w * 0.14, 12); ctx.fillRect(w * 0.68, h - 12, w * 0.14, 12);
    ctx.fillStyle = '#fff2b0'; ctx.fillRect(w * 0.30, h * 0.02, w * 0.40, h * 0.03);
  } else if (type === 'moto') {
    ctx.fillStyle = 'rgba(0,0,0,.3)'; ctx.beginPath(); ctx.ellipse(w / 2, h - 6, w * 0.30, h * 0.05, 0, 0, 7); ctx.fill();
    rrFill(ctx, w * 0.42, h * 0.62, w * 0.16, h * 0.34, 6, '#191a1d');
    rrFill(ctx, w * 0.30, h * 0.44, w * 0.40, h * 0.22, 8, body);
    rrFill(ctx, w * 0.36, h * 0.08, w * 0.28, h * 0.34, 8, '#33415c');
    ctx.fillStyle = '#ffd21f'; ctx.fillRect(w * 0.38, h * 0.20, w * 0.24, h * 0.05);
    rrFill(ctx, w * 0.40, h * 0.0, w * 0.20, h * 0.14, 7, '#e8e8e8');
    ctx.fillStyle = '#ff3434'; ctx.fillRect(w * 0.46, h * 0.52, w * 0.08, h * 0.05);
  }
}
const CAR_WW = { moto: 700, hatch: 1300, pickup: 1500, truck: 1900, bus: 1950 };
['hatch', 'hatch', 'pickup', 'truck', 'bus', 'moto'].forEach((type) => {
  CAR_COLORS.forEach((cc, i) => {
    const size = type === 'moto' ? 90 : 220;
    const h = type === 'truck' ? 240 : type === 'bus' ? 260 : type === 'moto' ? 120 : 180;
    makeSprite(type + '_' + i, size, h, CAR_WW[type], 0, (ctx, w, hh) => drawCarSprite(ctx, w, hh, cc[0], cc[1], type));
  });
});
const CAR_KEYS = { hatch: 2, pickup: 1, truck: 1, bus: 1, moto: 2 };

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
  ctx.fillStyle = '#5b626c'; rrFill(ctx, w * 0.10, h * 0.06, w * 0.80, h * 0.10, 4, '#6f7680');
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
    const isLit = lit.indexOf(k) >= 0;
    ctx.fillStyle = isLit ? '#ffd76b' : '#33414f';
    ctx.fillRect(10 + c * ww, 16 + r * ((h - 26) / rows), ww - 8, wh);
    k++;
  }
}
const FACADES = [['#8a6f5c', '#6b5445'], ['#5f6e7d', '#47545f'], ['#9c5f5f', '#7a4747'], ['#7d7565', '#5f594c'], ['#5c7d6e', '#465f54']];
FACADES.forEach((f, i) => makeSprite('bld_' + i, 240 + i * 14, 320 + i * 26, 2600 + i * 260, 0, (ctx, w, h) => drawBuilding(ctx, w, h, f[0], f[1], 6)));

const ADS = [
  ['#123a63', 'MOTOPEÇAS', 'DO ZÉ'], ['#7c1d1d', 'PIZZA 4', 'R$ 39,90'],
  ['#1d5c33', 'POSTO', '24 HORAS'], ['#5b2d86', 'AUTOESCOLA', 'VAI E PASSA'],
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
  // bandeira de entrega
  ctx.strokeStyle = '#4c4f55'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(w * 0.9, 0); ctx.lineTo(w * 0.9, -h * 0.28); ctx.stroke();
  ctx.fillStyle = flag; ctx.beginPath(); ctx.moveTo(w * 0.9, -h * 0.28); ctx.lineTo(w * 0.99, -h * 0.22); ctx.lineTo(w * 0.9, -h * 0.16); ctx.fill();
}
makeSprite('loja', 240, 190, 2400, 0, (ctx, w, h) => drawStore(ctx, w, h, '#d64545', 'MERCADINHO', '#2e6fd2'));
makeSprite('entrega', 240, 190, 2400, 0, (ctx, w, h) => drawStore(ctx, w, h, '#2f9e44', 'DESTINO', '#ffd21f'));

const BIKES = [
  { name: 'Vermelho Brasa', c: '#d92b1c', c2: '#9c1d12' },
  { name: 'Azul Céu', c: '#2e6fd2', c2: '#1d4a92' },
  { name: 'Verde Vale', c: '#2f9e44', c2: '#1f6e2e' },
  { name: 'Prata Noturna', c: '#b9c0c8', c2: '#7d858e' },
  { name: 'Ouro Express', c: '#f4b400', c2: '#b98700' },
];

/* ------------------------- Construção da estrada ------------------------ */
const L = { SHORT: 25, MEDIUM: 50, LONG: 100 };
let segs = [];
let trackLength = 0;

function lastY() { return segs.length === 0 ? 0 : segs[segs.length - 1].p2.world.y; }
function mkPoint(y, z) { return { world: { x: 0, y: y, z: z }, camera: {}, screen: {} }; }
function addSegment(curve, y) {
  const n = segs.length;
  segs.push({
    index: n, curve: curve, sprites: [], cars: [],
    p1: mkPoint(lastY(), n * SEG_LEN), p2: mkPoint(y, (n + 1) * SEG_LEN),
    light: Math.floor(n / RUMBLE_LEN) % 2 === 1,
    clip: 0, fogA: 0, vis: false,
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
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -2.5, 1.5);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, 3.5, 2.5);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, 0.5, -1.5);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -3.5, 1);
  addRoad(L.MEDIUM, L.MEDIUM, L.MEDIUM, -1, -1.5);
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
  addCurve(L.MEDIUM, 3, 2);
  addBumps();
  addCurve(L.LONG, -4, 0);
  addStraight(L.MEDIUM);
  addHill(L.MEDIUM, 6);
  addCurve(L.MEDIUM, 5, -2);
  addLowRollingHills();
  addSCurves();
  addCurve(L.LONG, -3, 2);
  addStraight(L.SHORT);
  addHill(L.MEDIUM, -5);
  addCurve(L.MEDIUM, 4, 1);
  addBumps();
  addSCurves();
  addCurve(L.MEDIUM, -5, -1);
  addStraight(L.MEDIUM);
  // fecha o loop no nível do chão
  addRoad(L.LONG, L.LONG, L.LONG, 0, -lastY() / SEG_LEN);

  // decoração
  for (let n = 0; n < segs.length; n++) {
    const s = segs[n];
    if (n % 9 === 0) s.sprites.push({ key: 'palm', offset: (Math.random() < 0.5 ? -1 : 1) * (1.35 + Math.random() * 0.6) });
    if (n % 16 === 0) s.sprites.push({ key: 'post', offset: n % 32 === 0 ? -1.35 : 1.35, hit: 0.05 });
    if (n % 28 === 0) s.sprites.push({ key: 'bld_' + U.randInt(0, 4), offset: -(2.9 + Math.random() * 0.9) });
    if (n % 34 === 0) s.sprites.push({ key: 'bld_' + U.randInt(0, 4), offset: 2.9 + Math.random() * 0.9 });
    if (n % 50 === 25) s.sprites.push({ key: 'bill_' + U.randInt(0, 5), offset: Math.random() < 0.5 ? -1.9 : 1.9 });
    if (n % 60 === 40) s.sprites.push({ key: 'loja', offset: Math.random() < 0.5 ? -2.5 : 2.5 });
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
      color: U.choice(opts.colors),
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
function drawParticles(ctx) {
  for (const p of particles) {
    const a = 1 - p.t / p.life;
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    if (p.square) ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
    else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * a, 0, 7); ctx.fill(); }
  }
  ctx.globalAlpha = 1;
}

/* ------------------------- O jogo ---------------------------------------- */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = VW; canvas.height = VH;

const $ = (id) => document.getElementById(id);
const dom = {
  hud: $('hud'), hMoney: $('h-money'), hCombo: $('h-combo'), hLives: $('h-lives'),
  hSpeed: $('h-speed'), hGear: $('h-gear'), hTach: $('h-tach'), hDist: $('h-dist'), hClock: $('h-clock'),
  hOrder: $('h-order'), hClient: $('h-client'), hRemain: $('h-remain'), hProg: $('h-prog'),
  hTimer: $('h-timer'), hTimerNum: $('h-timernum'), hReward: $('h-reward'),
  banner: $('banner'), menu: $('menu'), pause: $('pause'), over: $('over'), help: $('help'),
  best: $('best-score'), overStats: $('over-stats'), btnSound: $('btn-sound'), touch: $('touch'),
};

const CLIENTES = [
  'Dona Marlene 🥧', 'Seu Antônio 🍖', 'Pizzaria Napolitana 🍕', 'Farmácia Silva 💊',
  'Rolandinho da Esfiha 🥙', 'Vó Cida 🍪', 'Bar do Zuca 🍺', 'Açougue Bom Corte 🥩',
  'Distribuidora Estrela 📦', 'Lanchonete do Zé 🍔', 'Tia Nelma 🎂', 'Pet Shop Fido 🐶',
];

const game = {
  state: 'menu', mode: 'delivery',
  position: 0, speed: 0, playerX: 0, lean: 0,
  totalM: 0, topKmh: 0, money: 0, combo: 0, bestCombo: 0, delivered: 0, lives: 3,
  order: null, time: 0, invuln: 0, crashT: 0, shake: 0, skyOffset: 0,
  gear: 0, rpm: 850, lastShift: 0, dustT: 0,
  input: { left: false, right: false, throttle: false, brake: false, hornQueued: false },
  cars: [],
};

const GEAR_TOP = [0.20, 0.42, 0.62, 0.82, 1.02];
const LANE_N = [-0.64, 0, 0.64];

function spawnCars(n) {
  game.cars = [];
  for (const s of segs) s.cars = [];
  for (let i = 0; i < n; i++) {
    const type = U.choice(['hatch', 'hatch', 'hatch', 'pickup', 'truck', 'bus', 'moto', 'moto']);
    const lane = U.randInt(0, LANES - 1);
    const spd = type === 'truck' ? 0.20 : type === 'bus' ? 0.24 : type === 'moto' ? 0.55 : 0.3 + Math.random() * 0.42;
    const colorIdx = type === 'truck' ? U.randInt(0, CAR_COLORS.length - 1) : U.randInt(0, CAR_COLORS.length - 1);
    const key = type + '_' + colorIdx;
    const off = LANE_N[lane] + (Math.random() - 0.5) * 0.08;
    const z = Math.floor(Math.random() * segs.length) * SEG_LEN + U.randInt(0, SEG_LEN - 1);
    game.cars.push({ z, offset: off, speed: spd * MAX_SPEED, key, type, nw: SPR[key].w / ROAD_W, pct: 0, seg: null, lane });
  }
}

function bikeIndex() { return Math.min(BIKES.length - 1, Math.floor(game.delivered / 3)); }

function newOrder() {
  const distM = U.randInt(16, 46) * 100;
  const time = distM / 20 + 22;
  const targetUnits = game.position + BIKE_Z_UNITS + distM * UNITS_PER_M;
  const tseg = segs[Math.floor((targetUnits % trackLength) / SEG_LEN) % segs.length];
  const side = Math.random() < 0.5 ? -1.5 : 1.5;
  tseg.sprites.push({ key: 'entrega', offset: side, dest: true });
  game.order = {
    client: U.choice(CLIENTES), startM: game.totalM, distM, timeMax: time, timeLeft: time,
    base: Math.round(distM / 120) + 12, targetUnits: targetUnits % trackLength, tseg, side,
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
  game.position = 0; game.speed = 0; game.playerX = 0; game.lean = 0;
  game.totalM = 0; game.topKmh = 0; game.money = 0; game.combo = 0; game.bestCombo = 0;
  game.delivered = 0; game.lives = 3; game.time = 0; game.invuln = 0; game.crashT = 0;
  game.gear = 0; game.rpm = 850; game.shake = 0;
  particles = [];
  clearOrderMarker();
  spawnCars(mode === 'free' ? 26 : 45);
  if (mode === 'delivery') newOrder(); else { dom.hOrder.style.display = 'none'; setBanner('🌄 Modo livre — bom passeio!', 'info'); }
  document.body.dataset.screen = mode;
  hideAll();
  SFX.init(); SFX.resume();
}
function toMenu() {
  game.state = 'menu'; game.speed = 0;
  document.body.dataset.screen = 'menu';
  clearOrderMarker();
  hideAll(); dom.menu.style.display = '';
  const best = localStorage.getItem('motox.best') || 0;
  dom.best.textContent = '🏆 Recorde: R$ ' + best;
  SFX.engine(0, 0, 0, false);
}
function hideAll() { dom.menu.style.display = 'none'; dom.pause.style.display = 'none'; dom.over.style.display = 'none'; dom.help.style.display = 'none'; }

function togglePause() {
  if (game.state === 'play') {
    game.state = 'pause'; dom.pause.style.display = '';
    SFX.engine(0, 0, 0, false);
  } else if (game.state === 'pause') {
    game.state = 'play'; dom.pause.style.display = 'none'; SFX.resume();
  }
}

function gameOver() {
  game.state = 'over';
  clearOrderMarker();
  const best = Math.max(game.money, parseInt(localStorage.getItem('motox.best') || '0', 10));
  localStorage.setItem('motox.best', String(best));
  dom.overStats.innerHTML =
    '<div><b>' + game.delivered + '</b><span>entregas</span></div>' +
    '<div><b>' + U.fmtMoney(game.money) + '</b><span>ganho hoje</span></div>' +
    '<div><b>' + Math.round(game.topKmh) + '</b><span>vel. máxima (km/h)</span></div>' +
    '<div><b>' + U.fmtDist(game.totalM) + '</b><span>rodados</span></div>' +
    '<div><b>x' + game.bestCombo + '</b><span>melhor combo</span></div>';
  dom.over.style.display = '';
  SFX.engine(0, 0, 0, false);
}

let bannerTimer = 0;
function setBanner(text, cls) {
  dom.banner.textContent = text;
  dom.banner.className = 'show ' + (cls || '');
  bannerTimer = 2.4;
}

function crash(hard) {
  if (game.invuln > 0 || game.crashT > 0) return;
  game.crashT = hard ? 1.2 : 0.9;
  game.invuln = hard ? 2.2 : 1.7;
  game.speed *= hard ? 0.16 : 0.42;
  game.shake = hard ? 26 : 17;
  game.combo = 0;
  if (game.order) game.order.timeLeft -= 5;
  spawnParticles(VW / 2, VH * 0.72, 26, { colors: ['#ffb52e', '#ff5a2e', '#ffd21f', '#ff8a8a'], spread: 460, vy: -180, g: 900, life: 0.7, size: 5 });
  setBanner(hard ? '💥 BATEU NO MURO!' : '💥 BATIDA NO TRÂNSITO! (-5s)', 'danger');
  SFX.crash();
}

/* ------------------------- Update ---------------------------------------- */
function updateCars(dt) {
  for (const s of segs) s.cars.length = 0;
  const pz = game.position + BIKE_Z_UNITS;
  for (const car of game.cars) {
    car.z = (car.z + dt * car.speed) % trackLength;
    car.pct = (car.z % SEG_LEN) / SEG_LEN;
    const seg = segs[Math.floor(car.z / SEG_LEN) % segs.length];
    car.seg = seg; seg.cars.push(car);

    // colisão com o jogador
    if (game.state === 'play' && game.invuln <= 0 && game.crashT <= 0) {
      const dz = car.z - pz;
      const wrapped = dz > trackLength / 2 ? dz - trackLength : (dz < -trackLength / 2 ? dz + trackLength : dz);
      if (Math.abs(wrapped) < SEG_LEN * 1.4 && U.overlap(game.playerX, PLAYER_NW, car.offset, car.nw, 0.8)) {
        crash(false);
      }
    }
  }
}

function updateOrder(dt) {
  const o = game.order;
  if (!o) return;
  o.timeLeft -= dt;
  const near = Math.abs(o.targetUnits - (game.position + BIKE_Z_UNITS));
  const nd = Math.min(near, trackLength - near);
  if (nd < 1200 && !o._notified) { o._notified = true; setBanner('📍 Reduza! Destino à frente', 'info'); }
  if (game.totalM >= o.startM + o.distM) {
    // ENTREGA CONCLUÍDA
    const bonusTime = Math.max(0, Math.round(o.timeLeft));
    const reward = o.base + bonusTime * 2 + game.combo * 12;
    game.money += reward;
    game.combo++; game.bestCombo = Math.max(game.bestCombo, game.combo);
    game.delivered++;
    if (game.combo > 1) setBanner('✅ ENTREGA FEITA! +' + U.fmtMoney(reward) + '  •  combo x' + game.combo, 'good');
    else setBanner('✅ ENTREGA FEITA! +' + U.fmtMoney(reward), 'good');
    spawnParticles(VW / 2, VH * 0.5, 60, { colors: ['#ffd21f', '#35e05e', '#2e9bff', '#ff5a8a', '#fff'], spread: 500, vy: -350, g: 500, life: 1.4, size: 6, square: true });
    const prevIdx = bikeIndex();
    SFX.delivered();
    game.dustT = 0;
    const newIdx = Math.min(BIKES.length - 1, Math.floor(game.delivered / 3));
    if (newIdx !== prevIdx) setTimeout(() => setBanner('🏍️ Nova moto desbloqueada: ' + BIKES[newIdx].name + '!', 'info'), 1600);
    clearOrderMarker();
    newOrder();
    return;
  }
  if (o.timeLeft <= 0) {
    game.money = Math.max(0, game.money - 40);
    game.combo = 0; game.lives--;
    setBanner('⏰ ATRASOU! ' + o.client + ' cancelou  (-R$40)', 'danger');
    clearOrderMarker();
    if (game.lives <= 0) { gameOver(); return; }
    newOrder();
  }
}

function update(dt) {
  game.time += dt;
  const playing = game.state === 'play';
  const base = segAt(game.position);
  const pSeg = segAt(game.position + BIKE_Z_UNITS);
  const pPct = ((game.position + BIKE_Z_UNITS) % SEG_LEN) / SEG_LEN;

  if (playing) {
    const speedPct = game.speed / MAX_SPEED;
    const dir = (game.input.left ? -1 : 0) + (game.input.right ? 1 : 0);
    const dx = dt * 2.4 * speedPct;
    const spin = dt * 2 * speedPct;

    if (game.crashT > 0) {
      game.crashT -= dt;
      game.speed = Math.max(0, game.speed - 2200 * dt);
      if (game.crashT <= 0 && Math.abs(game.playerX) > 1.12) {
        game.playerX = Math.sign(game.playerX) * 0.85; // volta pra pista após bater fora dela
      }
    } else {
      if (game.input.throttle) game.speed = U.clamp(game.speed + ACCEL * dt, 0, MAX_SPEED);
      else if (game.input.brake) game.speed = U.clamp(game.speed - BRAKE * dt, 0, MAX_SPEED);
      else game.speed = U.clamp(game.speed - DECEL * dt, 0, MAX_SPEED);

      game.playerX += dir * dx;
      game.playerX -= dx * speedPct * pSeg.curve * CENTRIFUGAL;

      if (Math.abs(game.playerX) > 1 && game.speed > OFFROAD_LIMIT) {
        game.speed = Math.max(OFFROAD_LIMIT, game.speed - OFFROAD_DECEL * dt);
        game.dustT -= dt;
        if (game.dustT <= 0) {
          game.dustT = 0.05;
          spawnParticles(VW / 2 + (Math.random() - 0.5) * 120, VH * 0.9, 2, { colors: ['#b99c6b', '#a2885d'], spread: 160, vy: -60, g: 300, life: 0.8, size: 7 });
        }
      }
      // bateu em objeto do barranco?
      if (game.invuln <= 0) {
        for (const spr of pSeg.sprites) {
          if (spr.hit !== undefined && U.overlap(game.playerX, PLAYER_NW, spr.offset, spr.hit, 1)) { crash(true); break; }
        }
      }
    }
    game.playerX = U.clamp(game.playerX, -2.4, 2.4);
    if (game.invuln > 0) game.invuln -= dt;
    if (Math.abs(game.playerX) < 1 && game.speed > 950 && dir === 0) game.playerX += U.lerp(game.playerX, 0, dt * 0.35);

    const leanTarget = U.clamp(dir * 1 + speedPct * pSeg.curve * -0.16, -1.4, 1.4);
    game.lean = U.lerp(game.lean, game.crashT > 0 ? (Math.random() - 0.5) : leanTarget, Math.min(1, dt * 7));

    game.position = (game.position + game.speed * dt) % trackLength;
    game.totalM += game.speed * dt / UNITS_PER_M;
    game.topKmh = Math.max(game.topKmh, KMH(game.speed));
    game.skyOffset += pSeg.curve * speedPct * dt * 10;

    updateOrder(dt);
    updateCars(dt);

    // câmbio / rotação
    const sf = game.speed / MAX_SPEED;
    let g = 0;
    while (g < GEAR_TOP.length - 1 && sf > GEAR_TOP[g]) g++;
    if (g !== game.gear) { game.lastShift = 0.16; if (Math.abs(g - game.gear) === 1) SFX.blip(); game.gear = g; }
    const gTop = g === 0 ? 0.20 : GEAR_TOP[g - 1];
    let rp = g === 0 ? sf / 0.20 : (sf - gTop) / (GEAR_TOP[g] - gTop);
    if (sf > GEAR_TOP[GEAR_TOP.length - 1]) rp = 1;
    game.rpm = U.clamp(1050 + U.clamp(rp, 0, 1) * 7550, 900, 9450);
    if (game.lastShift > 0) game.lastShift -= dt;
    SFX.engine(U.clamp((game.rpm - 900) / 8500, 0, 1.1), game.input.throttle ? 1 : 0.35, speedPct, true);
  } else if (game.state === 'menu') {
    // modo atrativo: passeia sozinho
    game.speed = 780;
    game.position = (game.position + game.speed * dt) % trackLength;
    const dp = dt * 1.1 * (game.speed / MAX_SPEED);
    game.playerX -= dp * (game.speed / MAX_SPEED) * pSeg.curve * CENTRIFUGAL;
    game.skyOffset += pSeg.curve * (game.speed / MAX_SPEED) * dt * 10;
    game.lean = U.lerp(game.lean, -pSeg.curve * 0.08, dt * 4);
    updateCars(dt);
    game.rpm = U.lerp(game.rpm, 4200, dt);
  } else {
    updateCars(0); // congela o trânsito
  }
  updateParticles(dt);
  if (game.shake > 0) game.shake = Math.max(0, game.shake - dt * 42);
  if (bannerTimer > 0) { bannerTimer -= dt; if (bannerTimer <= 0) dom.banner.className = ''; }
  if (game.input.hornQueued) { game.input.hornQueued = false; SFX.horn(); setBanner('📯 BI-BIP! Sai da frente!', 'info'); }
}

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
  curFog = env.fog;

  // ---- céu
  const grad = ctx.createLinearGradient(0, 0, 0, VH * 0.6);
  grad.addColorStop(0, env.top); grad.addColorStop(1, env.bot);
  ctx.fillStyle = grad; ctx.fillRect(0, 0, VW, VH * 0.6);

  if (env.star > 0.03) {
    for (const s of STARS) {
      ctx.globalAlpha = env.star * (0.4 + 0.6 * Math.abs(Math.sin(game.time * 1.5 + s.tw)));
      ctx.fillStyle = '#fff';
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.globalAlpha = 1;
  }
  // sol / lua
  const t = ((game.time / DAY_LEN + CYCLE_START) % 1 + 1) % 1;
  if (t > 0.17 && t < 0.87) {
    const u = (t - 0.17) / 0.7;
    const sx = VW * 0.12 + VW * 0.76 * u;
    const sy = VH * 0.5 - Math.sin(u * Math.PI) * VH * 0.4;
    const glow = ctx.createRadialGradient(sx, sy, 4, sx, sy, 110);
    const warm = lerpColor('#ffd21f', '#ff7b3a', U.clamp((t - 0.6) / 0.28, 0, 1) * U.clamp((0.35 - t) / 0.18, 0, 1) + (t < 0.35 ? U.clamp((t - 0.17) / 0.18, 0, 1) * 0.4 : 0));
    glow.addColorStop(0, 'rgba(255,235,150,0.9)'); glow.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = glow; ctx.fillRect(sx - 110, sy - 110, 220, 220);
    ctx.fillStyle = warm; ctx.beginPath(); ctx.arc(sx, sy, 34, 0, 7); ctx.fill();
  } else {
    const u = ((t > 0.87 ? t - 0.87 : t + 0.3) / 0.3);
    const sx = VW * 0.15 + VW * 0.7 * u;
    const sy = VH * 0.36 - Math.sin(u * Math.PI) * VH * 0.18;
    ctx.fillStyle = '#e8ecf5'; ctx.beginPath(); ctx.arc(sx, sy, 24, 0, 7); ctx.fill();
    ctx.fillStyle = env.top; ctx.beginPath(); ctx.arc(sx + 9, sy - 5, 20, 0, 7); ctx.fill();
  }
  // montanhas com parallax
  const off = -game.skyOffset % (VW + 100);
  ridge(VH * 0.5, 150, 3.1, lerpColor('#3c5a3f', '#1d2742', night), off * 0.5);
  ridge(VH * 0.53, 105, 1.4, lerpColor('#2f4a33', '#161f38', night), off * 0.85);

  // ---- pista
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
    seg.fogA = 1 - Math.exp(-FOG_DENSITY * Math.pow(n / DRAW_DIST, 2));
    project(seg.p1, game.playerX * ROAD_W - x, camY, camZ);
    project(seg.p2, game.playerX * ROAD_W - x - dx, camY, camZ);
    x += dx; dx += seg.curve;
    seg.vis = false;
    if (seg.p1.camera.z <= CAM_D || seg.p2.screen.y >= seg.p1.screen.y || seg.p2.screen.y >= maxy) continue;
    seg.vis = true;
    drawSeg(seg, n);
    maxy = seg.p2.screen.y;
  }
  return { pSeg, pPct, night, env };
}

function drawSeg(seg, n) {
  const p1 = seg.p1.screen, p2 = seg.p2.screen;
  const light = seg.light;
  const y1 = p1.y, y2 = p2.y;
  const h = Math.max(1, y1 - y2);

  // solo
  ctx.fillStyle = light ? PAL.groundLight : PAL.groundDark;
  ctx.fillRect(0, y2, VW, h);

  const poly = (w1L, w1R, w2L, w2R, col) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.moveTo(p1.x - w1L, y1); ctx.lineTo(p1.x + w1R, y1);
    ctx.lineTo(p2.x + w2R, y2); ctx.lineTo(p2.x + w2L, y2);
    ctx.closePath(); ctx.fill();
  };
  poly(p1.w * 1.34, p1.w * 1.34, p2.w * 1.34, p2.w * 1.34, light ? PAL.walkLight : PAL.walkDark); // calçada
  poly(p1.w * 1.16, p1.w * 1.16, p2.w * 1.16, p2.w * 1.16, light ? PAL.curbWhite : PAL.curbRed);  // meio-fio
  poly(p1.w, p1.w, p2.w, p2.w, light ? PAL.roadLight : PAL.roadDark);                               // asfalto

  if (light) {
    const l1 = p1.w / LANES, l2 = p2.w / LANES;
    const lw1 = p1.w * 0.012, lw2 = p2.w * 0.012;
    for (let l = 1; l < LANES; l++) {
      const o1 = -p1.w + l1 * l, o2 = -p2.w + l2 * l;
      ctx.fillStyle = PAL.lane;
      ctx.beginPath();
      ctx.moveTo(p1.x + o1 - lw1, y1); ctx.lineTo(p1.x + o1 + lw1, y1);
      ctx.lineTo(p2.x + o2 + lw2, y2); ctx.lineTo(p2.x + o2 - lw2, y2);
      ctx.closePath(); ctx.fill();
    }
  }
  if (seg.fogA > 0.02) {
    ctx.globalAlpha = seg.fogA;
    ctx.fillStyle = curFog;
    ctx.fillRect(0, y2, VW, h);
    ctx.globalAlpha = 1;
  }
}

function drawSprite(spr, seg, pct, offset, xOff) {
  if (seg.fogA >= 0.99) return;
  const s = U.lerp(seg.p1.screen.scale, seg.p2.screen.scale, pct);
  const sx = U.lerp(seg.p1.screen.x, seg.p2.screen.x, pct);
  const sy = U.lerp(seg.p1.screen.y, seg.p2.screen.y, pct);
  const hw = U.lerp(seg.p1.screen.w, seg.p2.screen.w, pct);
  if (s <= 0 || !isFinite(s)) return;
  const destW = spr.w * s * VW / 2;
  const destH = destW * (spr.canvas.height / spr.canvas.width);
  const destX = sx + offset * hw + (xOff || 0) * hw;
  const destY = sy + (spr.ground ? s * 0.88 * VH / 2 : 0);
  const clipY = seg.clip;
  ctx.save();
  if (destY > clipY) { ctx.beginPath(); ctx.rect(0, 0, VW, Math.max(0, clipY)); ctx.clip(); }
  ctx.globalAlpha = Math.max(0.08, 1 - seg.fogA * 0.92);
  ctx.drawImage(spr.canvas, destX - destW / 2, destY - destH, destW, destH);
  ctx.restore();
  ctx.globalAlpha = 1;
  return { x: destX, y: destY, w: destW, h: destH };
}

function drawBike(r) {
  const speedPct = game.speed / MAX_SPEED;
  const scale = CAM_D / BIKE_Z_UNITS;
  const destW = 1100 * scale * VW / 2;
  const cx = VW / 2 + game.lean * 12;
  const cy = VH * 0.895;
  const lean = game.lean * 0.42;
  const bounce = game.crashT > 0 ? 0 : (Math.random() - 0.5) * 3.2 * speedPct * 1.6;
  const bike = BIKES[bikeIndex()];
  const flick = game.invuln > 0 && Math.floor(game.invuln * 12) % 2 === 0;
  if (flick) return;

  ctx.save();
  ctx.translate(cx, cy + bounce);
  ctx.rotate(lean * 0.22 + (game.crashT > 0 ? Math.sin(game.crashT * 22) * 0.12 : 0));
  ctx.scale(destW / 200, destW / 200);
  // sombra
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  ctx.beginPath(); ctx.ellipse(0, 2, 95, 13, 0, 0, 7); ctx.fill();
  // pneu traseiro
  ctx.fillStyle = '#17181c'; rr(ctx, -24, -88, 48, 88, 15); ctx.fill();
  ctx.fillStyle = '#2a2c31'; rr(ctx, -18, -80, 36, 70, 12); ctx.fill();
  ctx.fillStyle = '#9aa2ac'; ctx.beginPath(); ctx.arc(0, -46, 13, 0, 7); ctx.fill();
  ctx.fillStyle = '#5c636c'; ctx.beginPath(); ctx.arc(0, -46, 5, 0, 7); ctx.fill();
  // balanço + escapamentos
  ctx.fillStyle = '#4a4f57'; ctx.fillRect(-32, -56, 9, 26); ctx.fillRect(23, -56, 9, 26);
  ctx.fillStyle = '#c7ccd3'; rr(ctx, -70, -40, 30, 15, 7); ctx.fill(); rr(ctx, 40, -40, 30, 15, 7); ctx.fill();
  ctx.fillStyle = '#22252a'; ctx.beginPath(); ctx.arc(-68, -32, 4.6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(68, -32, 4.6, 0, 7); ctx.fill();
  if (game.input.throttle && game.rpm > 5500 && game.crashT <= 0) {
    ctx.fillStyle = 'rgba(255,140,40,.85)';
    const f = 4 + Math.random() * 7;
    ctx.beginPath(); ctx.moveTo(-72, -32); ctx.lineTo(-72 - f, -36); ctx.lineTo(-72 - f, -28); ctx.fill();
    ctx.beginPath(); ctx.moveTo(72, -32); ctx.lineTo(72 + f, -36); ctx.lineTo(72 + f, -28); ctx.fill();
  }
  // rabeta
  ctx.fillStyle = bike.c; rr(ctx, -28, -106, 56, 26, 8); ctx.fill();
  ctx.fillStyle = bike.c2; rr(ctx, -28, -92, 56, 12, 6); ctx.fill();
  ctx.fillStyle = game.input.brake || game.crashT > 0 ? '#ff4545' : '#b02020';
  rr(ctx, -9, -104, 18, 9, 3); ctx.fill();
  if (game.input.brake) { ctx.shadowColor = '#ff3030'; ctx.shadowBlur = 16; rr(ctx, -9, -104, 18, 9, 3); ctx.fill(); ctx.shadowBlur = 0; }
  ctx.fillStyle = '#e8e6dd'; rr(ctx, -13, -80, 26, 12, 2); ctx.fill();
  ctx.fillStyle = '#111'; ctx.font = 'bold 8px Arial'; ctx.textAlign = 'center'; ctx.fillText('MOTO-24', 0, -71);
  // corpo
  ctx.beginPath(); ctx.moveTo(-30, -106); ctx.lineTo(30, -106); ctx.lineTo(25, -162); ctx.lineTo(-25, -162); ctx.closePath();
  ctx.fillStyle = bike.c; ctx.fill();
  // caixa de entrega
  ctx.fillStyle = '#ffd21f'; rr(ctx, -40, -158, 80, 56, 6); ctx.fill();
  ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 3; rr(ctx, -40, -158, 80, 56, 6); ctx.stroke();
  ctx.fillStyle = '#1a1a1a'; ctx.fillRect(-40, -134, 80, 5);
  ctx.font = 'bold 12px Arial'; ctx.fillText('EXPRESS', 0, -118);
  // piloto
  ctx.beginPath(); ctx.moveTo(-34, -160); ctx.lineTo(34, -160); ctx.lineTo(28, -216); ctx.lineTo(-28, -216); ctx.closePath();
  ctx.fillStyle = '#33415c'; ctx.fill();
  ctx.strokeStyle = '#ffd21f'; ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(-22, -186); ctx.lineTo(0, -172); ctx.lineTo(22, -186); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-22, -202); ctx.lineTo(0, -188); ctx.lineTo(22, -202); ctx.stroke();
  // braços
  ctx.strokeStyle = '#33415c'; ctx.lineWidth = 13; ctx.lineCap = 'round';
  const armSwing = game.lean * 6;
  ctx.beginPath(); ctx.moveTo(-30, -206); ctx.quadraticCurveTo(-52, -196 + armSwing, -56, -168 + armSwing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(30, -206); ctx.quadraticCurveTo(52, -196 + armSwing, 56, -168 + armSwing); ctx.stroke();
  ctx.fillStyle = '#15181c';
  ctx.beginPath(); ctx.arc(-56, -168 + armSwing, 6, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.arc(56, -168 + armSwing, 6, 0, 7); ctx.fill();
  // capacete
  ctx.fillStyle = '#eef0f3'; ctx.beginPath(); ctx.arc(0, -234, 21, 0, 7); ctx.fill();
  ctx.fillStyle = bike.c; ctx.fillRect(-21, -240, 42, 7);
  ctx.fillStyle = '#20242a'; ctx.beginPath(); ctx.arc(0, -234, 21, Math.PI * 0.12, Math.PI * 0.88); ctx.fill();
  ctx.restore();

  // holofote à noite
  if (r.night > 0.25) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = r.night * 0.24;
    const g2 = ctx.createLinearGradient(cx, cy - 60, cx, VH * 0.42);
    g2.addColorStop(0, 'rgba(255,244,190,0.55)'); g2.addColorStop(1, 'rgba(255,244,190,0)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.moveTo(cx - 40, cy - 70);
    ctx.lineTo(cx - 330, VH * 0.42);
    ctx.lineTo(cx + 330, VH * 0.42);
    ctx.lineTo(cx + 40, cy - 70);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}

function render() {
  ctx.setTransform(canvas.width / VW, 0, 0, canvas.height / VH, 0, 0);
  ctx.save();
  if (game.shake > 0.4) ctx.translate((Math.random() - 0.5) * game.shake, (Math.random() - 0.5) * game.shake * 0.7);

  const r = renderRoad();
  const env = r.env, night = r.night;

  // sprites e carros (de trás pra frente)
  const base = segAt(game.position);
  const loopN = segs.length;
  for (let n = DRAW_DIST - 1; n >= 1; n--) {
    const seg = segs[(base.index + n) % loopN];
    if (!seg.vis || seg.p1.camera.z <= CAM_D) continue;
    for (const spr of seg.sprites) {
      const s = drawSprite(SPR[spr.key], seg, 0, spr.offset);
      if (s && spr.key === 'post' && night > 0.25) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = night * 0.65;
        const gx = s.x + s.w * 0.14, gy = s.y - s.h * 0.86;
        const g = ctx.createRadialGradient(gx, gy, 1, gx, gy, Math.max(6, s.w * 0.9));
        g.addColorStop(0, 'rgba(255,230,150,.9)'); g.addColorStop(1, 'rgba(255,230,150,0)');
        ctx.fillStyle = g; ctx.fillRect(gx - s.w, gy - s.w, s.w * 2, s.w * 2);
        ctx.restore();
      }
      if (s && spr.dest) {
        const pulse = 0.5 + 0.5 * Math.sin(game.time * 6);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = 0.35 + pulse * 0.3;
        ctx.fillStyle = '#ffd21f';
        ctx.fillRect(s.x - s.w * 0.52, s.y - s.h * 1.06, s.w * 1.04, 4);
        ctx.restore();
      }
    }
    for (const car of seg.cars) {
      drawSprite(SPR[car.key], seg, car.pct, car.offset);
    }
  }

  drawBike(r);
  drawParticles(ctx);

  // tinta noturna
  if (night > 0.02) {
    ctx.fillStyle = 'rgba(8,12,32,' + (night * 0.30).toFixed(3) + ')';
    ctx.fillRect(0, 0, VW, VH);
  }
  // vinheta + linhas de velocidade
  const speedPct = game.speed / MAX_SPEED;
  if (speedPct > 0.72) {
    ctx.save();
    ctx.globalAlpha = (speedPct - 0.72) * 0.9;
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      const yy = (VH * 0.2) + ((game.time * 900 + i * 137) % (VH * 0.72));
      const side = i % 2 === 0 ? 1 : -1;
      const xx = VW / 2 + side * (VW * 0.30 + (i % 3) * 60);
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + side * 60, yy); ctx.stroke();
    }
    ctx.restore();
  }
  const vg = ctx.createRadialGradient(VW / 2, VH * 0.55, VH * 0.45, VW / 2, VH * 0.55, VH * 0.95);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.38)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, VW, VH);

  if (game.crashT > 0) { ctx.fillStyle = 'rgba(255,40,40,' + (game.crashT * 0.14).toFixed(3) + ')'; ctx.fillRect(0, 0, VW, VH); }
  ctx.restore();
}

/* ------------------------- HUD (DOM) ------------------------------------- */
let lastHud = {};
function setText(el, v) { if (el && lastHud[el.id] !== v) { lastHud[el.id] = v; el.textContent = v; } }
function updateHUD() {
  setText(dom.hSpeed, String(Math.round(KMH(game.speed))));
  setText(dom.hGear, game.speed < 8 ? 'N' : (game.gear + 1) + 'ª');
  const rpm01 = U.clamp((game.rpm - 900) / 8550, 0, 1);
  dom.hTach.style.width = (rpm01 * 100).toFixed(1) + '%';
  dom.hTach.classList.toggle('red', rpm01 > 0.86);
  setText(dom.hDist, 'TOTAL ' + U.fmtDist(game.totalM));
  const ct = ((game.time / DAY_LEN + CYCLE_START) % 1 + 1) % 1;
  const hours = Math.floor(ct * 24);
  const mins = Math.floor((ct * 24 % 1) * 60);
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
    const remain = Math.max(0, o.distM - (game.totalM - o.startM));
    setText(dom.hRemain, U.fmtDist(remain));
    setText(dom.hClient, o.client);
    setText(dom.hReward, U.fmtMoney(o.base + Math.max(0, Math.round(o.timeLeft)) * 2 + game.combo * 12));
    dom.hProg.style.width = (U.clamp((game.totalM - o.startM) / o.distM, 0, 1) * 100) + '%';
    const tp = U.clamp(o.timeLeft / o.timeMax, 0, 1);
    dom.hTimer.style.width = (tp * 100) + '%';
    dom.hTimer.classList.toggle('low', tp < 0.25);
    setText(dom.hTimerNum, Math.max(0, Math.ceil(o.timeLeft)) + 's');
  }
}

/* ------------------------- Input ----------------------------------------- */
const KEYS = {
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
  ArrowUp: 'throttle', w: 'throttle', W: 'throttle',
  ArrowDown: 'brake', s: 'brake', S: 'brake',
};
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();
  const k = KEYS[e.key];
  if (k) { game.input[k] = true; SFX.init(); SFX.resume(); }
  if (e.key === ' ') game.input.hornQueued = true;
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
    if (game.state === 'play' || game.state === 'pause') togglePause();
  }
  if (e.key === 'm' || e.key === 'M') { const on = SFX.toggle(); dom.btnSound.textContent = on ? '🔊' : '🔇'; }
});
document.addEventListener('keyup', (e) => { const k = KEYS[e.key]; if (k) game.input[k] = false; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && game.state === 'play') togglePause();
});
function bindHold(el, key) {
  if (!el) return;
  const on = (e) => { e.preventDefault(); game.input[key] = true; SFX.init(); SFX.resume(); };
  const off = (e) => { e.preventDefault(); game.input[key] = false; };
  el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off);
  el.addEventListener('pointercancel', off); el.addEventListener('pointerleave', off);
}
bindHold($('t-left'), 'left');
bindHold($('t-right'), 'right');
bindHold($('t-accel'), 'throttle');
bindHold($('t-brake'), 'brake');
if (matchMedia && matchMedia('(pointer:coarse)').matches) dom.touch.classList.add('on');

/* ------------------------- Menu / botões --------------------------------- */
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

/* ------------------------- Loop ------------------------------------------ */
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

/* ------------------------- Boot ------------------------------------------ */
buildTrack();
spawnCars(40);
toMenu();
resize();
requestAnimationFrame(frame);
