/* FOGO CRUZADO - constantes, tabela de terrenos, armas e utilidades */
(function (PT) {
  'use strict';

  var C = {
    TILE: 24, COLS: 40, ROWS: 25,
    W: 960, H: 600,
    FOG_RES: 2,               // pixels por tile no mapa de visibilidade
    UNIT_R: 7,               // raio de colisao do soldado
    VIEW_BASE: 270,           // alcance de visao base (px)
    STEP: 1000 / 60
  };
  C.FOG_W = Math.ceil(C.COLS * C.FOG_RES);
  C.FOG_H = Math.ceil(C.ROWS * C.FOG_RES);

  // ------------------------------------------------------------------ terreno
  // sight: bloqueia visao | bullet: bloqueia tiro | cover: protecao quando colado
  var TILES = {
    '.': { n: 'asfalto' },
    ',': { n: 'terra', slow: 0.94 },
    'g': { n: 'grama', slow: 0.88, conceal: 0.45 },
    'd': { n: 'piso' },
    'p': { n: 'piso' },
    '#': { n: 'concreto', sight: 1, bullet: 1, cover: 2, ricochet: 0.55 },
    '=': { n: 'metal', sight: 1, bullet: 1, cover: 2, ricochet: 0.35 },
    'W': { n: 'madeira', sight: 1, bullet: 1, cover: 1, hp: 60, pen: 0.55, destructible: 1 },
    'c': { n: 'caixote', sight: 0, bullet: 1, cover: 1, hp: 70, destructible: 1 },
    's': { n: 'areia', sight: 0, bullet: 1, cover: 2 },
    'T': { n: 'arvore', sight: 1, bullet: 1, cover: 1 },
    'o': { n: 'objetivo', sight: 1, bullet: 1, cover: 2, hp: 150, destructible: 1, objective: 1 },
    '1': { n: 'spawn' }, '2': { n: 'spawn' }, 'e': { n: 'spawn_inimigo' }, 'x': { n: 'piso' }
  };

  // ------------------------------------------------------------------- armas
  var WEAPONS = {
    fuzil: {
      n: 'FUZIL', dmg: 30, rpm: 600, mag: 30, reserve: 150, spread: 2.6, range: 430,
      vel: 15, burst: 3, auto: true, reload: 2.2, pen: 0.75, snd: 'rifle', recoil: 0.5
    },
    smg: {
      n: 'SMG', dmg: 18, rpm: 820, mag: 32, reserve: 180, spread: 4.4, range: 250,
      vel: 13, burst: 4, auto: true, reload: 1.9, pen: 0.5, snd: 'smg', recoil: 0.42
    },
    dmr: {
      n: 'PRECISAO', dmg: 46, rpm: 170, mag: 12, reserve: 60, spread: 1.1, range: 560,
      vel: 18, burst: 1, auto: false, reload: 2.6, pen: 0.95, snd: 'dmr', recoil: 1.1
    }
  };

  // ------------------------------------------------------------- tipos de IA
  var ROLES = {
    recruta: { label: 'RECRUTA', w: 'smg', hp: 90, acc: 0.62, view: 225, react: 30, aggr: 0.45, speed: 0.95 },
    soldado: { label: 'SOLDADO', w: 'fuzil', hp: 100, acc: 0.78, view: 265, react: 24, aggr: 0.65, speed: 1.0 },
    atirador: { label: 'ATIRADOR', w: 'dmr', hp: 95, acc: 0.9, view: 420, react: 40, aggr: 0.35, speed: 0.85 },
    oficial: { label: 'OFICIAL', w: 'fuzil', hp: 115, acc: 0.86, view: 290, react: 18, aggr: 0.8, speed: 1.0 }
  };

  var COL = {
    asphaltA: '#33373b', asphaltB: '#2d3135', asphaltDot: '#3d4247', asphaltCrack: '#272a2e',
    dirtA: '#433c33', dirtB: '#3c362e', dirtDot: '#4e463b',
    grassA: '#3d4a34', grassB: '#374430', grassTuft: '#4b5b3d',
    floorA: '#5b5a53', floorB: '#54534d', floorLine: '#3f3e39',

    concTop: '#9b9c95', concTopB: '#8b8c86', concFace: '#6a6c68', concEdge: '#c0c1b9', concDark: '#4c4e4b',
    metalTop: '#8b929b', metalFace: '#5c636c', metalEdge: '#c3cad3',
    woodTop: '#96713f', woodFace: '#6d5029', woodEdge: '#b98f52', woodLine: '#54391c',
    crateTop: '#a37b45', crateFace: '#7a5a30', crateEdge: '#c79a58',
    sandA: '#b6a37b', sandB: '#9c8a64', sandEdge: '#cfbd94',
    treeA: '#31432c', treeB: '#3b5034', treeC: '#28371f', trunk: '#493626',
    objTop: '#5d6a3c', objFace: '#454f2b', objEdge: '#8b9b5e', objMark: '#d8b93a',

    ally: { body: '#4b5638', bodyDark: '#333c26', helm: '#3e4a2c', helmLight: '#5b6b41', gun: '#2b2c2e' },
    enemy: { body: '#5c4a3c', bodyDark: '#3b3026', helm: '#4a3b2e', helmLight: '#6d5a49', gun: '#2b2c2e' },
    p2: { body: '#3f4d5a', bodyDark: '#28323b', helm: '#354251', helmLight: '#4f6072', gun: '#2b2c2e' },

    fog: 0.9, fogMemory: 0.46,
    hudBg: 'rgba(9,12,14,0.82)',
    hudLine: '#3a4148',
    ok: '#8fd96b', warn: '#ffcf4d', bad: '#ff6b4d', info: '#8fc3e8'
  };

  var SURNAME = ['ALMEIDA', 'BARROS', 'COSTA', 'DIAS', 'ESTEVES', 'FONSECA', 'GOMES',
    'HENRIQUES', 'JUNQUEIRA', 'LIMA', 'MORAES', 'NUNES', 'PIRES', 'QUEIROZ',
    'RAMOS', 'ROCHA', 'SALES', 'TEIXEIRA', 'VASQUES', 'XAVIER'];
  var RANKS = ['SGT.', 'CB.', 'SD.', 'SD.', 'SD.', 'TEN.'];

  // ---------------------------------------------------------------- utilidades
  var U = {
    clamp: function (v, a, b) { return v < a ? a : (v > b ? b : v); },
    lerp: function (a, b, t) { return a + (b - a) * t; },
    dist: function (ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); },
    dist2: function (ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; },
    angDiff: function (a, b) {
      var d = (b - a) % (Math.PI * 2);
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      return d;
    },
    turnTo: function (cur, target, maxStep) {
      var d = U.angDiff(cur, target);
      if (Math.abs(d) <= maxStep) return target;
      return cur + Math.sign(d) * maxStep;
    },
    inCone: function (ox, oy, angle, halfAngle, x, y) {
      var a = Math.atan2(y - oy, x - ox);
      return Math.abs(U.angDiff(angle, a)) <= halfAngle;
    },
    vlen: function (x, y) { return Math.sqrt(x * x + y * y); },
    sign: function (v) { return v < 0 ? -1 : (v > 0 ? 1 : 0); },
    pad: function (n, len) { var s = String(n); while (s.length < len) s = '0' + s; return s; },
    mmss: function (sec) {
      sec = Math.max(0, Math.floor(sec));
      return Math.floor(sec / 60) + ':' + U.pad(sec % 60, 2);
    }
  };

  // gerador determinístico para texturas e patrulhas
  function mulberry(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  var rng = Math.random;
  U.rnd = function (a, b) { return b === undefined ? rng() * a : a + rng() * (b - a); };
  U.rndi = function (a, b) { return b === undefined ? Math.floor(rng() * a) : a + Math.floor(rng() * (b - a + 1)); };
  U.pick = function (arr) { return arr[Math.floor(rng() * arr.length)]; };
  U.chance = function (p) { return rng() < p; };
  U.seed = function (s) { rng = mulberry(s); return rng; };
  U.rng = function () { return rng(); };
  U.seededRng = mulberry;

  var names = 0;
  U.soldierName = function (rank) {
    names++;
    var r = rank === undefined ? U.pick(RANKS) : rank;
    return r + ' ' + SURNAME[names % SURNAME.length];
  };

  PT.C = C;
  PT.TILES = TILES;
  PT.WEAPONS = WEAPONS;
  PT.ROLES = ROLES;
  PT.COL = COL;
  PT.U = U;
})(window.PT = window.PT || {});
