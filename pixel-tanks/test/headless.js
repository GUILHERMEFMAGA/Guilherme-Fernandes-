/*
 * Teste headless do Pixel Tanks.
 * Roda o jogo em Node com um canvas de mentira, simulando teclado e
 * milhares de frames de partida para pegar erros de runtime.
 *
 *   node test/headless.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ------------------------------------------------------------- canvas falso
function makeCtx(counter) {
  const ctx = {
    fillStyle: '#000', strokeStyle: '#000', lineWidth: 1, globalAlpha: 1,
    font: '', textAlign: 'left', imageSmoothingEnabled: false,
    fillRect() { counter.fillRect++; },
    strokeRect() { counter.strokeRect++; },
    clearRect() { },
    drawImage() { counter.drawImage++; },
    save() { }, restore() { }, translate() { }, scale() { },
    beginPath() { }, closePath() { }, moveTo() { }, lineTo() { },
    arc() { }, fill() { }, stroke() { }, rect() { }, clip() { },
    measureText() { return { width: 0 }; },
    fillText() { counter.fillText++; },
    createLinearGradient() { return { addColorStop() { } }; }
  };
  return ctx;
}

const counter = { fillRect: 0, strokeRect: 0, drawImage: 0, fillText: 0 };

function makeCanvas() {
  const cv = { width: 0, height: 0, style: {} };
  const ctx = makeCtx(counter);
  cv.getContext = () => ctx;
  cv.addEventListener = () => { };
  cv.removeEventListener = () => { };
  return cv;
}

// ------------------------------------------------------------------ DOM fake
const elements = {};
function makeEl(id) {
  return {
    id, textContent: '', innerHTML: '', className: '', style: {},
    classList: { add() { }, remove() { }, toggle() { }, contains() { return false; } },
    addEventListener() { }, removeEventListener() { },
    appendChild() { }, requestFullscreen() { return Promise.resolve(); }
  };
}

const canvasEl = makeCanvas();
canvasEl.id = 'screen';
elements['screen'] = canvasEl;
['t-mode', 't-map', 't-status', 'p1-name', 'p1-lives', 'p1-score', 'p1-wins',
  'p2-name', 'p2-lives', 'p2-score', 'p2-wins', 't-score', 't-hi', 't-wave',
  'btn-sound', 'btn-full'].forEach(id => { elements[id] = makeEl(id); });

const document = {
  readyState: 'complete',
  documentElement: makeEl('html'),
  body: makeEl('body'),
  createElement(tag) { return tag === 'canvas' ? makeCanvas() : makeEl(tag); },
  getElementById(id) { return elements[id] || null; },
  addEventListener() { }, removeEventListener() { },
  hidden: false
};

const storage = {};
const localStorage = {
  getItem: k => (k in storage ? storage[k] : null),
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: k => { delete storage[k]; }
};

const listeners = {};
const win = {
  document, localStorage,
  addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
  removeEventListener() { },
  requestAnimationFrame() { return 0; },
  cancelAnimationFrame() { },
  setTimeout: (fn) => { /* audio agendado: ignora */ return 0; },
  clearTimeout() { },
  devicePixelRatio: 1
};
win.window = win;

const sandbox = {
  window: win, document, localStorage, console,
  requestAnimationFrame: win.requestAnimationFrame,
  cancelAnimationFrame: win.cancelAnimationFrame,
  setTimeout: win.setTimeout, clearTimeout: win.clearTimeout,
  Math, Date, JSON, Object, Array, String, Number, Boolean, Error, isNaN, parseInt, parseFloat
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

// ------------------------------------------------------------------ carrega
const FILES = ['const.js', 'font.js', 'sprites.js', 'audio.js', 'maps.js', 'game.js', 'main.js'];
FILES.forEach(f => {
  const code = fs.readFileSync(path.join(ROOT, 'js', f), 'utf8');
  try {
    vm.runInContext(code, sandbox, { filename: f });
  } catch (e) {
    console.error(`[FALHA] erro ao carregar ${f}:`, e.message);
    process.exit(1);
    process.exit(1);
  }
});

const PT = sandbox.window.PT;

let failures = 0;
function check(name, fn) {
  try {
    const msg = fn();
    console.log(` ok   ${name}${msg ? ' - ' + msg : ''}`);
  } catch (e) {
    failures++;
    console.log(` FALHA ${name}\n      ${e && e.stack ? e.stack.split('\n').slice(0, 4).join('\n      ') : e}`);
  }
}

function press(code) { PT.Game.keyDown(code); PT.Game.keyUp(code); }
function hold(code) { PT.Game.keyDown(code); }
function release(code) { PT.Game.keyUp(code); }

function frames(n, opts) {
  opts = opts || {};
  for (let i = 0; i < n; i++) {
    PT.Game.update();
    if (opts.render !== false && i % (opts.renderEvery || 3) === 0) PT.Game.render();
  }
}

// ------------------------------------------------------------------ testes
console.log('\n== Pixel Tanks: testes headless ==\n');

check('sprites inicializam', () => {
  PT.Sprites.init();
  const t = PT.Sprites.tank.p1.up;
  if (!t || t.width !== 14) throw new Error('sprite do tanque invalido');
  return 'tanque 14x14, ' + Object.keys(PT.Sprites.tank).length + ' paletas';
});

check('font mede texto', () => {
  PT.Sprites.init();
  const w = PT.font.width('PIXEL TANKS', 2);
  if (!(w > 100 && w < 300)) throw new Error('largura estranha: ' + w);
  return 'PIXEL TANKS @2x = ' + w + 'px';
});

check('mapas montam', () => {
  const out = [];
  for (let i = 0; i < PT.Maps.list.length; i++) {
    const m = PT.Maps.build(i);
    if (!m.base || !m.base.alive) throw new Error('mapa ' + i + ' sem base');
    if (!m.spawns['1'] || !m.spawns['2'] || !m.spawns.a || !m.spawns.b) throw new Error('mapa ' + i + ' sem spawns');
    out.push(m.name + ':' + Object.keys(m.walls).length + ' paredes');
  }
  return out.join(', ');
});

check('init do jogo + render do menu', () => {
  PT.Sprites.init();
  PT.Game.init(canvasEl, {});
  frames(60);
  if (PT.Game.scene !== 'menu') throw new Error('nao comecou no menu');
  return 'menu renderizado, hud=' + JSON.stringify(PT.Game.hudInfo().status);
});

check('menu: navegar e iniciar duelo 1P', () => {
  press('Enter');           // DUELO
  frames(2);
  if (PT.Game.menuScene !== 'players') throw new Error('nao foi para jogadores: ' + PT.Game.menuScene);
  press('Enter');           // 1 JOGADOR
  frames(2);
  if (PT.Game.menuScene !== 'map') throw new Error('nao foi para mapa');
  press('Enter');           // ARENA 1
  frames(2);
  if (PT.Game.scene !== 'game') throw new Error('nao iniciou partida');
  const h = PT.Game.hudInfo();
  return h.modeLabel + ' / ' + h.map;
});

check('duelo: partida completa ate o fim (10k frames)', () => {
  let matches = 0, rounds = 0;
  hold('Space');
  for (let i = 0; i < 10000; i++) {
    PT.Game.update();
    if (i % 5 === 0) PT.Game.render();
    if (PT.Game.round.phase === 'play') rounds++;
    if (PT.Game.round.phase === 'match') { matches++; break; }
    if (i % 200 === 0) {
      // simula o jogador andando de um lado para o outro
      release('ArrowLeft'); release('ArrowRight'); release('ArrowUp'); release('ArrowDown');
      hold(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'][(i / 200) % 4 | 0]);
    }
  }
  release('Space'); release('ArrowLeft'); release('ArrowRight'); release('ArrowUp'); release('ArrowDown');
  if (!matches) throw new Error('a partida nao terminou. fases vista: ' + PT.Game.round.phase);
  frames(400); // roda a tela de fim de partida
  const tela = PT.Game.round.phase;
  press('Enter');
  frames(3);
  if (PT.Game.scene !== 'menu') throw new Error('nao voltou ao menu');
  return 'duelo terminou (tela ' + tela + '), placar ' + PT.Game.hudInfo().scoreText;
});

check('sobrevivencia: 2P, ondas, itens e morte (12k frames)', () => {
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 1;
  press('Enter');   // SOBREVIVENCIA
  frames(2);
  if (PT.Game.menuScene !== 'map') throw new Error('modo sobrevivencia nao foi para o mapa');
  press('Enter');   // ARENA
  frames(2);
  if (PT.Game.scene !== 'game') throw new Error('nao iniciou sobrevivencia');
  if (PT.Game.mode !== 'survival') throw new Error('modo errado: ' + PT.Game.mode);

  let maxWave = 1, sawPow = false, sawBase = true;
  hold('Space');
  for (let i = 0; i < 12000; i++) {
    PT.Game.update();
    if (i % 5 === 0) PT.Game.render();
    if (PT.Game.sv.wave > maxWave) maxWave = PT.Game.sv.wave;
    if (PT.Game.pows.length) sawPow = true;
    if (!PT.Game.base.alive) sawBase = false;
    if (PT.Game.sv.phase === 'over') break;
    if (i % 120 === 0) {
      const dirs = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      dirs.forEach(release);
      hold(dirs[(i / 120) % 4 | 0]);
    }
  }
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].forEach(release);
  release('Space');
  const h = PT.Game.hudInfo();
  return 'ondas=' + maxWave + ' itens=' + sawPow + ' base=' + sawBase + ' vidas=' + h.p1.lives + ' status=' + h.status;
});

check('sobrevivencia: tela de fim e volta ao menu', () => {
  if (PT.Game.scene === 'game' && PT.Game.sv.phase !== 'over') {
    // deixa rolar ate o fim de verdade
    for (let i = 0; i < 20000 && PT.Game.sv.phase !== 'over'; i++) PT.Game.update();
  }
  frames(120);
  const st = PT.Game.hudInfo().status;
  press('Enter');
  frames(3);
  if (PT.Game.scene !== 'menu') throw new Error('nao voltou ao menu');
  return 'status durante o fim: ' + st;
});

check('sobrevivencia co-op: dois jogadores nascem e renascem', () => {
  PT.Game.toMenu(); frames(2);
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 1;
  press('Enter'); frames(2);
  PT.Game.players = 2;
  PT.Game.menuScene = 'map';
  press('Enter'); frames(40);
  let alive = PT.Game.tanks.filter(t => t.kind === 'player' && !t.dead).length;
  if (alive !== 2) throw new Error('nasceram ' + alive + ' jogadores');
  // os dois morrem: o respawn tem que trazer os dois de volta
  PT.Game.tanks.forEach(t => { if (t.kind === 'player') t.dead = true; });
  PT.Game.sv.respawn = 8;
  frames(60);
  alive = PT.Game.tanks.filter(t => t.kind === 'player' && !t.dead).length;
  if (alive !== 2) throw new Error('respawn trouxe ' + alive + ' jogadores');
  const vidas = PT.Game.sv.lives;
  // morre tudo de novo sem vidas: fim de jogo
  PT.Game.sv.lives = 0;
  PT.Game.tanks.forEach(t => { if (t.kind === 'player') t.dead = true; });
  PT.Game.sv.respawn = 0;
  frames(5);
  if (PT.Game.sv.phase !== 'over') throw new Error('nao terminou o jogo sem vidas');
  return 'co-op ok, vidas=' + vidas + ', fim por "' + PT.Game.sv.reason + '"';
});

check('tiro destroi a base e a partida acaba', () => {
  PT.Game.toMenu(); frames(2);
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 1;
  press('Enter'); frames(2);
  PT.Game.players = 1;
  PT.Game.menuScene = 'map';
  PT.Game.menuIndex.map = 0;
  press('Enter'); frames(30);
  const b = PT.Game.base;
  // bala inimiga dentro da area da base
  PT.Game.bullets.push({
    x: b.x + 8, y: b.y + 8, dx: 1, dy: 0, side: 'cpu', team: 'cpu',
    owner: null, dead: false, pierce: false, bounces: 0, life: 0
  });
  frames(10);
  if (b.alive) throw new Error('a base continuou viva');
  frames(5);
  if (PT.Game.sv.phase !== 'over' || PT.Game.sv.reason !== 'base') {
    throw new Error('nao terminou por base destruida: ' + PT.Game.sv.phase + '/' + PT.Game.sv.reason);
  }
  return 'base explodiu e o jogo terminou';
});

check('paredes desmoronam depois de 60s de rodada', () => {
  PT.Game.toMenu(); frames(2);
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 0;
  press('Enter'); frames(2);
  PT.Game.players = 1;
  PT.Game.menuScene = 'map';
  PT.Game.menuIndex.map = 0;
  press('Enter'); frames(200);
  const antes = Object.keys(PT.Game.walls).length;
  // congela os inimigos para a rodada nao terminar antes da hora
  PT.Game.tanks.forEach(t => { if (t.kind !== 'player') t.freeze = 999999; });
  for (let i = 0; i < 600; i++) {
    PT.Game.round.phase = 'play';
    PT.Game.round.elapsed = 60 * 60 + i;
    PT.Game.update();
  }
  const depois = Object.keys(PT.Game.walls).length;
  if (!(depois < antes)) throw new Error('nada desmoronou: ' + antes + ' -> ' + depois);
  return 'tijolos: ' + antes + ' -> ' + depois + ' (aviso na tela)';
});

check('tijolo aguenta dois tiros', () => {
  PT.Game.toMenu(); frames(2);
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 1;
  press('Enter'); frames(2);
  PT.Game.menuScene = 'map';
  PT.Game.menuIndex.map = 0;
  press('Enter'); frames(30);
  // acha um tijolo
  let key = null;
  for (const k in PT.Game.walls) { if (PT.Game.walls[k].type === 'brick') { key = k; break; } }
  if (key === null) throw new Error('nao achei tijolo no mapa');
  const w = PT.Game.walls[key];
  const hp0 = w.hp;
  // bala em cima do tijolo, andando para dentro dele
  const col = key % 20, row = (key - col) / 20;
  const shoot = () => PT.Game.bullets.push({
    x: col * 16 + 6, y: PT.C.FIELD_Y + row * 16 - 8, dx: 0, dy: 1, side: 'cpu', team: 'cpu',
    owner: null, dead: false, pierce: false, bounces: 0, life: 0
  });
  shoot(); frames(12);
  const w1 = PT.Game.walls[key];
  if (!w1) throw new Error('o tijolo sumiu no primeiro tiro');
  if (!(w1.hp < hp0)) throw new Error('hp nao caiu: ' + w1.hp);
  shoot(); frames(14);
  if (PT.Game.walls[key]) throw new Error('o tijolo sobreviveu ao segundo tiro');
  return 'aguentou 2 tiros (hp ' + hp0 + ' -> 0)';
});

check('pausa e som', () => {
  PT.Game.menuIndex.mode = 0;
  PT.Game.menuScene = 'mode';
  press('Enter'); frames(2);
  press('Enter'); frames(2);
  press('Enter'); frames(2);
  if (PT.Game.scene !== 'game') throw new Error('nao iniciou');
  press('KeyP');
  frames(10);
  if (!PT.Game.paused) throw new Error('nao pausou');
  const info = PT.Game.hudInfo();
  press('KeyP');
  frames(5);
  if (PT.Game.paused) throw new Error('nao despausou');
  PT.Game.toggleMute();
  const m1 = PT.Game.hudInfo().muted;
  PT.Game.toggleMute();
  return 'pausa ok, status pausado="' + info.status + '", mudo=' + m1;
});

check('duelo 2 jogadores (6k frames)', () => {
  PT.Game.toMenu();
  frames(3);
  PT.Game.menuScene = 'mode';
  PT.Game.menuIndex.mode = 0;
  press('Enter'); frames(2);
  press('ArrowDown');                       // 2 JOGADORES
  press('Enter'); frames(2);
  press('Enter'); frames(2);
  if (PT.Game.players !== 2) throw new Error('nao entrou em 2 jogadores');
  hold('Space'); hold('Enter');
  for (let i = 0; i < 6000; i++) {
    PT.Game.update();
    if (i % 6 === 0) PT.Game.render();
    if (i % 90 === 0) {
      const dirs = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      dirs.forEach(release); release('KeyW'); release('KeyA'); release('KeyS'); release('KeyD');
      hold(dirs[(i / 90) % 4 | 0]);
      hold(['KeyW', 'KeyA', 'KeyS', 'KeyD'][(i / 90) % 4 | 0]);
    }
  }
  ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].forEach(release);
  release('Space'); release('Enter');
  const h = PT.Game.hudInfo();
  return 'P1=' + h.p1.wins + ' P2=' + h.p2.wins + ' fase=' + PT.Game.round.phase;
});

check('determinismo basico: hudInfo tem todas as chaves', () => {
  const h = PT.Game.hudInfo();
  const need = ['modeLabel', 'map', 'status', 'scoreText', 'hiText', 'waveText', 'muted', 'paused', 'scene'];
  need.forEach(k => { if (!(k in h)) throw new Error('falta ' + k); });
  ['name', 'lives', 'score', 'wins'].forEach(k => {
    if (!(k in h.p1) || !(k in h.p2)) throw new Error('falta p1/p2.' + k);
  });
  return need.length + ' chaves ok';
});

check('index.html: scripts e ids ligados certo', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  scripts.forEach(src => {
    if (!fs.existsSync(path.join(ROOT, src))) throw new Error('script ausente: ' + src);
  });
  if (!fs.existsSync(path.join(ROOT, 'style.css'))) throw new Error('style.css ausente');
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  const js = ['main.js', 'game.js'].map(f => fs.readFileSync(path.join(ROOT, 'js', f), 'utf8')).join('\n');
  const used = new Set([...js.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
  [...js.matchAll(/set\('([^']+)'/g)].forEach(m => used.add(m[1]));
  const missing = [...used].filter(id => !ids.includes(id));
  if (missing.length) throw new Error('ids usados fora do HTML: ' + missing.join(', '));
  return scripts.length + ' scripts, ' + ids.length + ' ids, ' + used.size + ' referencias conferidas';
});

check('nenhum modulo ES6 (tem que rodar via file://)', () => {
  const dir = path.join(ROOT, 'js');
  fs.readdirSync(dir).forEach(f => {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    if (/^\s*(import|export)\s/m.test(code)) throw new Error(f + ' usa import/export');
  });
  return fs.readdirSync(dir).length + ' arquivos ok';
});

check('desenho aconteceu de fato', () => {
  if (counter.fillRect < 1000) throw new Error('poucos fillRect: ' + counter.fillRect);
  if (counter.drawImage < 500) throw new Error('poucos drawImage: ' + counter.drawImage);
  return `fillRect=${counter.fillRect} drawImage=${counter.drawImage} strokeRect=${counter.strokeRect}`;
});

console.log('\n---------------------------------------------');
if (failures) {
  console.log(`${failures} teste(s) falharam\n`);
  process.exit(1);
} else {
  console.log('todos os testes passaram\n');
}
