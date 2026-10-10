/* ============================================================
   smoke.js — teste de fumaça: roda a lógica do jogo em Node
   com um "canvas" falso, para pegar erros de runtime.
   Uso: node tools/smoke.js [frames]
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function makeCtx(canvas) {
  const t = {
    canvas: canvas, fillStyle: '#000', strokeStyle: '#000', globalAlpha: 1,
    globalCompositeOperation: 'source-over', lineWidth: 1, font: '', textAlign: 'left',
    textBaseline: 'top', imageSmoothingEnabled: false
  };
  return new Proxy(t, {
    get(o, p) {
      if (p in o) return o[p];
      if (p === 'measureText') return () => ({ width: 20 });
      if (p === 'createLinearGradient' || p === 'createRadialGradient') return () => ({ addColorStop() { } });
      if (p === 'getImageData') return (x, y, w, h) => ({ data: new Uint8ClampedArray(Math.max(4, (w | 0) * (h | 0) * 4)) });
      if (p === 'createBuffer') return null;
      return () => undefined;
    },
    set(o, p, v) { o[p] = v; return true; }
  });
}
function makeCanvas() {
  const c = { width: 1, height: 1, style: {} };
  c.getContext = () => makeCtx(c);
  return c;
}
function makeEl() {
  const e = {
    style: {}, textContent: '', width: 1, height: 1,
    addEventListener() { }, removeEventListener() { },
    getBoundingClientRect() { return { left: 0, top: 0, width: 480, height: 270 }; },
    appendChild() { }, click() { }
  };
  e.getContext = () => makeCtx(e);
  return e;
}

const sandbox = {
  console: console, process: process,
  Math: Math, Date: Date, JSON: JSON, Uint8Array: Uint8Array, Uint8ClampedArray: Uint8ClampedArray,
  Float32Array: Float32Array, Array: Array, Object: Object, String: String, Number: Number,
  isFinite: isFinite, parseInt: parseInt, parseFloat: parseFloat, setInterval: () => 0,
  setTimeout: () => 0, requestAnimationFrame: () => 0,
  navigator: { maxTouchPoints: 0 },
  document: {
    createElement: (tag) => (tag === 'canvas' ? makeCanvas() : makeEl()),
    getElementById: () => makeEl(),
    addEventListener() { }
  }
};
sandbox.window = {
  innerWidth: 1280, innerHeight: 720, devicePixelRatio: 1,
  addEventListener() { }, requestAnimationFrame: () => 0,
  AudioContext: undefined
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const root = path.join(__dirname, '..');
const files = ['js/pixel.js', 'js/world.js', 'js/entities.js', 'js/game.js'];
const frames = parseInt(process.argv[2] || '2500', 10);
const MODE = process.argv[3] || 'random';

let src = files.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n;\n');
src = 'const __MODE__ = ' + JSON.stringify(MODE) + ';\n' + src;

src += `
/* ================= TESTE ================= */
Sfx.init = function () { };
Sfx.resume = function () { };
setupCanvas();
initGame();
G.state = 'play';

/* ---- teste de direcao em linha reta ---- */
if (__MODE__ === 'drive') {
  let melhor = 0, tentativas = 0;
  for (let k = 0; k < 8; k++) {
    const p = World.randomRoad(Math.random, 60);
    const car = new Car(0, p.x, p.y, 0, 'parked');
    car.dir = p.dir; car.angle = Math.atan2(DIRV[p.dir][1], DIRV[p.dir][0]);
    car.state = 'player'; G.cars.push(car);
    G.player.x = car.x; G.player.y = car.y; G.inCar = car;
    let d = 0, vmax = 0;
    for (let i = 0; i < 240; i++) {
      Input.up = 1; Input.down = 0; Input.left = 0; Input.right = 0;
      Input.handbrake = 0; Input.fire = 0; Input.enterEdge = 0;
      const ax = car.x, ay = car.y;
      update(1 / 60);
      d += Math.hypot(car.x - ax, car.y - ay);
      vmax = Math.max(vmax, Math.abs(car.speed));
    }
    tentativas++;
    melhor = Math.max(melhor, d);
    console.log('tentativa ' + (k + 1) + ': distancia=' + Math.round(d) + 'px  vel.max=' + Math.round(vmax) +
      '  vel.final=' + Math.round(Math.abs(car.speed)) + '  kmh=' + Math.round(vmax * 0.675));
    car.state = 'parked'; G.inCar = null;
  }
  console.log('melhor distancia em 4s: ' + Math.round(melhor) + 'px');
  process.exit(0);
}

/* ---- validacao geometrica da malha viaria ---- */
if (__MODE__ === 'geo') {
  let falhas = 0, nos = 0, faixas = 0, semSaida = 0;
  const vistos = new Set();
  for (const t of World.roadTiles) {
    let dirs = 0;
    for (let d = 0; d < 4; d++) {
      if (!World.validDir(t.tx, t.ty, d)) continue;
      dirs++;
      const p = World.lanePoint(t.tx, t.ty, d);
      faixas++;
      if (!World.isRoad(Math.floor(p.x / 16), Math.floor(p.y / 16))) {
        falhas++; if (falhas < 6) console.log('faixa fora da pista', t.tx, t.ty, d, p);
      }
      if (World.isCross(t.tx, t.ty)) {
        const n = World.crossingNode(t.tx, t.ty, d);
        nos++;
        if (!World.isRoad(Math.floor(n.x / 16), Math.floor(n.y / 16))) {
          falhas++; if (falhas < 6) console.log('no fora da pista', t.tx, t.ty, d, n);
        }
      }
    }
    if (dirs === 0) { semSaida++; console.log('beco sem saida', t.tx, t.ty); }
    vistos.add(t.tx + ':' + t.ty);
  }
  // conectividade: BFS a partir de um tile
  const ini = World.roadTiles[0];
  const fila = [[ini.tx, ini.ty]], visit = new Set([ini.tx + ':' + ini.ty]);
  while (fila.length) {
    const [x, y] = fila.pop();
    for (let d = 0; d < 4; d++) {
      const dv = DIRV[d];
      const nx = x + dv[0], ny = y + dv[1], k = nx + ':' + ny;
      if (World.isRoad(nx, ny) && !visit.has(k)) { visit.add(k); fila.push([nx, ny]); }
    }
  }
  console.log('tiles de rua:', World.roadTiles.length, '| alcancaveis:', visit.size,
    '| becos:', semSaida, '| faixas testadas:', faixas, '| nos de cruzamento:', nos);
  console.log('falhas geometricas:', falhas);
  process.exit(falhas || semSaida ? 1 : 0);
}

let erros = 0;
const OFFLOG = [];
const PREVT = new Map();
const PARADO = new Map();
let entrou = false, px0 = G.player.x, py0 = G.player.y, distPercorrida = 0;
let dentroDePredio = 0;
try {
  for (let i = 0; i < ${frames}; i++) {
    // fase 1: entra no carro mais proximo e dirige
    if (i < 6 && !entrou && !G.inCar) {
      let best = null, bd = 1e9;
      for (const c of G.cars) {
        const d = dist2(c.x, c.y, G.player.x, G.player.y);
        if (d < bd) { bd = d; best = c; }
      }
      if (best) { G.player.x = best.x + 10; G.player.y = best.y; Input.enterEdge = 1; }
    }
    if (G.inCar) entrou = true;

    Input.up = Math.random() < 0.75 ? 1 : 0;
    Input.down = Math.random() < 0.12 ? 1 : 0;
    Input.left = Math.random() < 0.22 ? 1 : 0;
    Input.right = Math.random() < 0.22 ? 1 : 0;
    Input.handbrake = Math.random() < 0.04 ? 1 : 0;
    Input.fire = Math.random() < (G.inCar ? 0.01 : 0.12) ? 1 : 0;
    if (Math.random() < 0.01) Input.enterEdge = 1;
    if (i === 400) G.wanted = 3;

    const ax = G.player.x, ay = G.player.y;
    update(1 / 60);
    draw();
    distPercorrida += Math.hypot(G.player.x - ax, G.player.y - ay);

    for (const c of G.cars) {
      if (c.state !== 'traffic' && c.state !== 'police') continue;
      const t = PARADO.get(c) || 0;
      PARADO.set(c, Math.abs(c.speed) < 6 ? t + 1 / 60 : 0);
    }
    if (__MODE__ === 'trace') {
      for (const c of G.cars) {
        if (c === G.inCar) continue;
        const t = World.at(Math.floor(c.x / 16), Math.floor(c.y / 16));
        const was = PREVT.get(c);
        if (was === 0 && t !== 0 && c.state !== 'parked') {
          let perto = 0, dmin = 999;
          for (const o of G.cars) {
            if (o === c) continue;
            const d = Math.hypot(o.x - c.x, o.y - c.y);
            if (d < 40) { perto++; dmin = Math.min(dmin, d); }
          }
          OFFLOG.push({
            f: i, id: c.t.id, estado: c.state, vel: Math.round(c.speed),
            de: was, para: t, tile: Math.floor(c.x / 16) + ',' + Math.floor(c.y / 16),
            dir: c.dir, ang: Math.round(c.angle * 57.3), carrosPerto: perto,
            dmin: Math.round(dmin), bloqueado: !!c.blocked, foraAntes: !!c.offroad
          });
        }
        PREVT.set(c, t);
      }
    }
    if (!isFinite(G.player.x) || !isFinite(G.player.y)) throw new Error('player NaN no frame ' + i);
    for (const c of G.cars) if (!isFinite(c.x) || !isFinite(c.y)) throw new Error('carro NaN no frame ' + i);
    if (i % 200 === 0) {
      for (const c of G.cars) {
        if (c.state === 'wreck' || c.burning) continue;
        if (World.solidAtPx(c.x, c.y)) dentroDePredio++;
      }
    }
  }
} catch (e) {
  erros++;
  console.error('ERRO:', e && e.stack ? e.stack : e);
}
let somaTrafego = 0, nTrafego = 0, parados = 0;
let paradoMax = 0;
for (const [c, t] of PARADO) paradoMax = Math.max(paradoMax, t);
console.log('tempo maximo parado (s):', paradoMax.toFixed(1));
if (__MODE__ === 'trace') {
  console.log('eventos de saida da pista:', OFFLOG.length);
  for (const e of OFFLOG.slice(0, 25)) console.log('  ', e);
  process.exit(0);
}
if (__MODE__ === 'debug') {
  let k = 0;
  for (const c of G.cars) {
    if ((c.state !== 'traffic' && c.state !== 'police') || Math.abs(c.speed) > 5) continue;
    k++;
    if (k > 8) break;
    const tx = Math.floor(c.x / 16), ty = Math.floor(c.y / 16);
    const viz = [];
    for (let dy = -1; dy <= 1; dy++) {
      let row = '';
      for (let dx = -2; dx <= 2; dx++) row += World.at(tx + dx, ty + dy);
      viz.push(row);
    }
    let perto = 0;
    for (const o of G.cars) if (o !== c && dist2(o.x, o.y, c.x, c.y) < 40 * 40) perto++;
    console.log('carro parado #' + k, c.t.id, 'tile', tx, ty, 'dir', c.dir,
      'blocked', c.blocked, 'stuckT', c.stuckT.toFixed(2), 'rev', c.reverseT.toFixed(2),
      'wp', c.wp ? Math.round(c.wp.x) + ',' + Math.round(c.wp.y) : '-',
      'pos', Math.round(c.x) + ',' + Math.round(c.y), 'carros por perto', perto);
    console.log('   vizinhanca:', viz.join(' | '));
  }
  process.exit(0);
}
for (const c of G.cars) {
  if (c.state !== 'traffic' && c.state !== 'police') continue;
  nTrafego++; somaTrafego += Math.abs(c.speed);
  if (Math.abs(c.speed) < 3) parados++;
}
console.log('--- mundo ---');
console.log('predios:', World.buildings.length, '| props:', World.props.length,
  '| tiles de rua:', World.roadTiles.length, '| lotes:', World.lots.length,
  '| parques:', World.parks.length);
console.log('sprites => carros:', CARS.length, '| pedestres:', PEDS.length);
console.log('--- simulacao (' + ${frames} + ' frames) ---');
console.log('entrou no carro:', entrou, '| estava dirigindo no fim:', !!G.inCar,
  '| distancia percorrida:', Math.round(distPercorrida) + 'px');
console.log('carros:', G.cars.length, '| pedestres:', G.peds.length,
  '| balas:', G.bullets.length, '| particulas:', Particles.list.length);
console.log('trafego:', nTrafego, 'carros | vel. media:', (nTrafego ? somaTrafego / nTrafego : 0).toFixed(1),
  '| parados:', parados, '| dentro de predio (amostra):', dentroDePredio);
console.log('dinheiro:', Math.round(G.money), '| procurado:', G.wanted.toFixed(2), '| vida:',
  Math.round(G.player.health), '| estado:', G.state);
console.log('kills:', G.stats.kills, '| roubos:', G.stats.jacks, '| explosoes:', G.stats.booms,
  '| km:', (G.stats.km / 1000).toFixed(2));
if (erros) process.exit(1);
console.log('OK');
`;

try {
  vm.runInContext(src, sandbox, { filename: 'bundle.js', timeout: 120000 });
} catch (e) {
  console.error('FALHA AO CARREGAR:', e && e.stack ? e.stack : e);
  process.exit(1);
}
