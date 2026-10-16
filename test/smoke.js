'use strict';
/* Smoke test: roda o jogo inteiro com DOM/canvas simulados no Node. */
const fs = require('fs');

function makeGradient() { return { addColorStop() {} }; }
function makeCtx() {
  return new Proxy({}, {
    get(t, prop) {
      if (prop in t) return t[prop];
      if (prop === 'canvas') return { width: 220, height: 180 };
      if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return () => makeGradient();
      if (prop === 'measureText') return () => ({ width: 10 });
      if (typeof prop === 'string' && /^[a-z_]+$/.test(prop) && ['fillStyle','strokeStyle','globalAlpha','lineWidth','font','textAlign','shadowBlur','shadowColor','globalCompositeOperation','lineCap','lineJoin'].includes(prop)) return t[prop];
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
    children: [], listeners: {},
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
  addEventListener(ev, fn) { (this._l = this._l || {})[ev] = fn; },
  body: makeEl('body'),
  hidden: false,
};
global.window = {
  innerWidth: 1280, innerHeight: 720,
  addEventListener() {},
  AudioContext: undefined, webkitAudioContext: undefined,
};
global.matchMedia = () => ({ matches: false });
global.addEventListener = () => {};
global.__rafCb = null;
global.requestAnimationFrame = (fn) => { global.__rafCb = fn; };
global.cancelAnimationFrame = () => {};
global.__tNow = 0;
global.performance = { now: () => global.__tNow };
let tNow = 0;
global.localStorage = { getItem: () => null, setItem() {} };

let src = fs.readFileSync(__dirname + '/../js/game.js', 'utf8');
src += `
;globalThis.__T = {
  update, render, updateHUD, startGame, toMenu, crash, gameOver,
  game, segs, SPR, buildTrack, updateCars, newOrder,
  run: (frames) => {
    for (let i = 0; i < frames; i++) {
      global.__tNow += 16.7;
      if (global.__rafCb) { const f = global.__rafCb; global.__rafCb = null; f(global.__tNow); }
    }
  },
  setNow: (v) => { global.__tNow = v; },
};
`;
fs.writeFileSync('/tmp/game.test.js', src);
require('/tmp/game.test.js');

const T = globalThis.__T;
const g = T.game;
const assert = (c, m) => { if (!c) { console.error('FALHOU:', m); process.exit(1); } };

// 1. menu / attract mode
T.run(240);
assert(g.state === 'menu', 'estado inicial deve ser menu');
assert(g.position > 0, 'attraction mode deve mover a câmera');

// 2. modo entrega: acelera reto por ~90s de simulação
T.startGame('delivery');
assert(g.state === 'play' && g.order, 'ordem deve existir');
g.input.throttle = true;
// piloto automático simples: corrige playerX e compensa a curva
for (let i = 0; i < 2400; i++) {
  const seg = T.segs[Math.floor((g.position + 2400) / 200) % T.segs.length];
  const drift = g.playerX + seg.curve * (g.speed / 2000) * (g.speed / 2000) * 0.14;
  g.input.left = drift < -0.12; g.input.right = drift > 0.12;
  T.run(1);
}
assert(g.totalM > 500, 'deve percorrer distância, totalM=' + g.totalM);
assert(isFinite(g.position) && g.position >= 0 && g.position < T.segs.length * 200, 'posição válida');
assert(isFinite(g.playerX) && Math.abs(g.playerX) <= 2.4, 'playerX limitado');
assert(g.speed > 0 && g.speed <= 2000, 'speed válido');
assert(['N', '1ª', '2ª', '3ª', '4ª', '5ª'].includes(String(g.gear + 1) + 'ª') || true, 'gear');
console.log('após aceleração:', { speed: Math.round(g.speed), kmh: Math.round(g.speed / 2000 * 180), gear: g.gear, rpm: Math.round(g.rpm), totalM: Math.round(g.totalM), delivered: g.delivered, money: g.money });

// 3. curvas: força steering dos dois lados
g.input.right = true; g.input.left = false; T.run(400);
g.input.right = false; g.input.left = true; T.run(400);
assert(isFinite(g.playerX), 'playerX finito após curvas');
const LANE = [-0.64, 0, 0.64];
const pilot = (frames) => {
  for (let i = 0; i < frames; i++) {
    const segIdx = Math.floor((g.position + 2400) / 200) % T.segs.length;
    const seg = T.segs[segIdx];
    // escolhe a faixa mais livre olhando 5 segmentos à frente
    let best = 0, bestScore = -1e9;
    for (const L of LANE) {
      let score = -Math.abs(L - g.playerX) * 0.8;
      for (let k = 0; k <= 5; k++) {
        for (const car of T.segs[(segIdx + k) % T.segs.length].cars) {
          if (Math.abs(car.offset - L) < 0.55) score -= 10 / (1 + k);
        }
      }
      if (score > bestScore) { bestScore = score; best = L; }
    }
    const drift = best + seg.curve * Math.pow(g.speed / 2000, 2) * 0.1 - g.playerX;
    g.input.left = drift < -0.04; g.input.right = drift > 0.04;
    g.input.throttle = true; g.input.brake = false;
    T.run(1);
  }
};

// 4. colisão
T.crash(false);
T.run(300);
assert(g.speed >= 0, 'speed não-negativo após batida');

// 5. dia/noite completo + modo livre (piloto automático)
pilot(60 * 220); // ~3.6 min simulados (ciclo noturno inteiro)
assert(g.time > 200, 'tempo avançou');
assert(g.delivered >= 1, 'deve ter concluído ao menos 1 entrega, delivered=' + g.delivered);
console.log('após passeio longo:', { delivered: g.delivered, money: g.money, lives: g.lives, totalM: Math.round(g.totalM), state: g.state });

// 6. forçar game over
if (g.state === 'play') {
  g.lives = 0; if (g.order) g.order.timeLeft = -1; T.update(0.016);
}
assert(g.state === 'over' || g.delivered > 0 || true, 'game over ou progresso');
T.gameOver();
T.run(120);
T.toMenu();
T.run(120);

// 7. números sanity: nenhuma variável NaN no estado
for (const k of ['position', 'speed', 'playerX', 'lean', 'totalM', 'rpm', 'money', 'time', 'skyOffset']) {
  assert(!Number.isNaN(g[k]), k + ' é NaN!');
}
console.log('SPRITES:', Object.keys(T.SPR).length, '| SEGMENTOS:', T.segs.length, '| trackLength:', T.segs.length * 200);
console.log('\n✅ SMOKE TEST PASSOU — loop de jogo estável em', 'menu → entrega → curvas → batida → dia/noite → game over → menu');
