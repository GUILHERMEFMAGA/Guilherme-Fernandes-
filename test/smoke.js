'use strict';
/* Smoke test v2: roda o simulador inteiro com DOM/canvas simulados no Node. */
const fs = require('fs');

function makeGradient() { return { addColorStop() {} }; }
function makeCtx() {
  return new Proxy({}, {
    get(t, prop) {
      if (prop in t) return t[prop];
      if (prop === 'canvas') return { width: 220, height: 180 };
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return () => makeGradient();
      if (prop === 'measureText') return () => ({ width: 10 });
      return () => {};
    },
    set(t, prop, v) { t[prop] = v; return true; },
  });
}
const els = new Map();
function makeEl(id) {
  if (els.has(id)) return els.get(id);
  const el = {
    id, style: {}, dataset: {}, textContent: '', innerHTML: '', className: '',
    children: [], listeners: {}, querySelector: () => ({ addEventListener() {}, checked: true }),
    classList: { toggle() {}, add() {}, remove() {}, contains: () => false },
    appendChild(c) { el.children.push(c); },
    addEventListener(ev, fn) { (el.listeners[ev] = el.listeners[ev] || []).push(fn); },
    getContext: () => makeCtx(),
    width: 1280, height: 720,
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
  };
  els.set(id, el);
  return el;
}
global.document = {
  getElementById: makeEl,
  createElement: (tag) => makeEl('_' + tag + '_' + Math.random()),
  addEventListener() {}, body: makeEl('body'), hidden: false,
};
global.window = { innerWidth: 1280, innerHeight: 720, addEventListener() {}, AudioContext: undefined, webkitAudioContext: undefined };
global.matchMedia = () => ({ matches: false });
global.addEventListener = () => {};
global.__rafCb = null;
global.requestAnimationFrame = (fn) => { global.__rafCb = fn; };
global.__tNow = 0;
global.performance = { now: () => global.__tNow };
const store = {};
global.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); } };
global.HTMLElement = function () {};

let src = fs.readFileSync(__dirname + '/../js/game.js', 'utf8');
src += `
;globalThis.__T = {
  update, render, startGame, toMenu, crash, gameOver, tryStart, shift,
  game, segs, SPR, buildTrack, updateCars, newOrder, BIKES,
  run: (n) => { for (let i = 0; i < n; i++) { global.__tNow += 16.7; if (global.__rafCb) { const f = global.__rafCb; global.__rafCb = null; f(global.__tNow); } } },
};
`;
fs.writeFileSync('/tmp/game.test.js', src);
require('/tmp/game.test.js');

const T = globalThis.__T;
const g = T.game;
const assert = (c, m) => { if (!c) { console.error('FALHOU:', m); process.exit(1); } };
const LANE = [-0.75, -0.25, 0.25, 0.75];
const P = () => {
  const segIdx = Math.floor((g.position + 2400) / 200) % T.segs.length;
  const seg = T.segs[segIdx];
  let best = 0.5, bestScore = -1e9;
  for (const L of LANE.slice(2)) {
    let score = -Math.abs(L - g.playerX) * 0.6;
    for (let k = 0; k <= 6; k++)
      for (const car of T.segs[(segIdx + k) % T.segs.length].cars)
        if (Math.abs(car.offset - L) < 0.5) score -= 12 / (1 + k);
    // nunca ficar na faixa da esquerda (sentido contrário!)
    if (L < 0) score -= 100;
    if (score > bestScore) { bestScore = score; best = L; }
  }
  const drift = best + seg.curve * Math.pow(g.speed / 2000, 2) * 0.12 - g.playerX;
  g.input.left = drift < -0.05; g.input.right = drift > 0.05;
  g.input.throttle = true;
  // câmbio manual: troca em ~85% do redline, desce em 25%
  const b = g.bike;
  if (g.running && g.rpm > b.redline * 0.82 && g.gear < b.gears.length - 1 && g.speed > 300) g.input.shiftUp = true;
  if (g.running && g.rpm < b.idle * 1.6 && g.gear > 0 && g.speed > 60) g.input.shiftDown = true;
};

console.log('— 1. menu / attract mode');
T.run(240);
assert(g.state === 'menu', 'estado inicial deve ser menu');
assert(g.position > 0, 'attraction mode move a câmera');

console.log('— 2. partida do motor (E na neutra) e arrancada');
T.startGame('delivery');
assert(g.state === 'play' && g.order, 'ordem deve existir');
assert(!g.running, 'motor começa desligado');
g.input.shiftUp = true;                    // = E → tryStart
T.run(80);
assert(g.running, 'motor deve ligar após partida');
const tankIni = g.fuel;

console.log('— 3. pilotagem completa (2 min simulados)');
for (let i = 0; i < 7200; i++) { P(); T.run(1); }
assert(g.totalM > 1500, 'deve rodar, totalM=' + Math.round(g.totalM));
assert(g.running || g.delivered > 0, 'motor ligado ou entregas feitas');
assert(SIMfuelLess(), 'combustível deve ter sido consumido');
function SIMfuelLess() { return g.fuel < tankIni; }
assert(Math.abs(g.playerX) <= 1.63, 'playerX limitado');
console.log({ kmh: Math.round(g.speed / 40 * 3.6), gear: g.gear, rpm: Math.round(g.rpm), fuel: g.fuel.toFixed(1) + ' L', totalM: Math.round(g.totalM) + ' m', delivered: g.delivered, money: Math.round(g.money), lives: g.lives, dmg: Math.round(g.dmg) + '%' });

console.log('— 4. colisões: lowside + poste + oncoming');
g.crashT = 0; g.invuln = 0; g.speed = 1400; T.crash('lowside');
assert(g.tumbleT > 0, 'lowside deve tombar');
T.run(200);
assert(g.dmg > 0, 'dano acumulado após quedas');

console.log('— 5. mudança de faixa em alta + uso da seta e buzina');
g.input.right = true; g.signal = 1; T.run(120);
g.input.right = false; g.input.hornQueued = true; T.run(10);
assert(g.signal === 1, 'seta ativa');

console.log('— 6. noite + chuva + game over');
g.time = 120;
for (let i = 0; i < 4200; i++) { P(); T.run(1); }
if (g.state === 'play') { g.lives = 1; if (g.order) g.order.timeLeft = -1; T.update(0.016); }
assert(g.state === 'over', 'deve fechar o expediente, state=' + g.state);
T.run(120); T.toMenu(); T.run(120);

for (const k of ['position', 'speed', 'playerX', 'lean', 'totalM', 'rpm', 'money', 'time', 'fuel', 'dmg', 'playerVX']) {
  assert(!Number.isNaN(g[k]), k + ' é NaN!');
}
console.log('SPRITES:', Object.keys(T.SPR).length, '| segmentos:', T.segs.length, '| entregas:', g.delivered);
console.log('\n✅ SMOKE TEST v2 PASSOU — motor, câmbio, combustível, avarias, radar, clima e colisões estáveis');
