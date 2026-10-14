/* Pixel Tanks - pixel art: tanques, itens e paredes gerados em canvas */
(function (PT) {
  'use strict';

  var C = PT.C;

  function makeCanvas(w, h) {
    var cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    return cv;
  }

  function ctxOf(cv) {
    var c = cv.getContext('2d');
    c.imageSmoothingEnabled = false;
    return c;
  }

  /** '#' + paleta => canvas */
  function fromASCII(rows, palette) {
    var w = rows[0].length, h = rows.length;
    var cv = makeCanvas(w, h), cx = ctxOf(cv);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var col = palette[rows[y][x]];
        if (col) { cx.fillStyle = col; cx.fillRect(x, y, 1, 1); }
      }
    }
    return cv;
  }

  function rot90(rows) {
    var w = rows[0].length, h = rows.length, out = [];
    for (var y = 0; y < w; y++) {
      var line = '';
      for (var x = 0; x < h; x++) line += rows[h - 1 - x][y];
      out.push(line);
    }
    return out;
  }

  // ---------------------------------------------------------------- tanque
  // 14x14 virado para cima. D=contorno, M=cor, L=brilho, .=vazio
  var TANK_UP = [
    '......DD......',
    '......LL......',
    '......LL......',
    'DDDD..LL..DDDD',
    'DLLD..DD..DLLD',
    'DLLDDMMMMDDLLD',
    'DLLDMMLLMMDLLD',
    'DLLDMMLLMMDLLD',
    'DLLDMMMMMMDLLD',
    'DLLDDMMMMDDLLD',
    'DLLDDDDDDDDLLD',
    'DLLD.MMMM.DLLD',
    'DLLD.MMMM.DLLD',
    'DDDDDDDDDDDDDD'
  ];

  // ---------------------------------------------------------------- itens
  var PUP = {
    shield: [
      '.DDDDDDDD.',
      'DLLLLLLLLD',
      'DLMMMMMMLD',
      'DLMMMMMMLD',
      'DLMMMMMMLD',
      '.DMMMMMMD.',
      '.DMMMMMMD.',
      '..DMMMMD..',
      '...DMMD...',
      '....DD....'
    ],
    speed: [
      '....DD....',
      '...DLLD...',
      '..DLLLLD..',
      '.DLLLLLLD.',
      '..DLLLLD..',
      '...DLLD...',
      'DD..DD..DD',
      '..........',
      '..........',
      '..........'
    ],
    bounce: [
      'DDD.......',
      '..D.......',
      '..DDD.....',
      '....D.....',
      '....DDD...',
      '......D...',
      '......DDDD',
      '........D.',
      '........DD',
      '..........'
    ],
    rapid: [
      '.....DDD..',
      '....DLLD..',
      '...DLLD...',
      '..DLLLLDD.',
      '.DDDDLLD..',
      '....DLLD..',
      '...DLLD...',
      '..DLLD....',
      '.DDD......',
      '..........'
    ]
  };
  var PUP_COLORS = {
    shield: { D: '#1b3f5c', M: '#2fa8ff', L: '#b3e6ff' },
    speed: { D: '#4a2a06', M: '#f0a020', L: '#ffe6a8' },
    bounce: { D: '#123a1c', M: '#3fd06a', L: '#c2ffcf' },
    rapid: { D: '#4a3a06', M: '#ffd24a', L: '#fff8d0' }
  };

  var SPR = {
    tank: {},       // por lado/nivel
    pup: {},
    shieldRing: null,
    brick: null,
    brickBroken: null,
    steel: null,
    bullet: {},
    pupFrame: {},
    pip: {}
  };

  SPR.init = function () {
    // tanques: 4 direcoes x paletas
    var dirs = ['up', 'right', 'down', 'left'];
    var rows = [TANK_UP, rot90(TANK_UP), rot90(rot90(TANK_UP)), rot90(rot90(rot90(TANK_UP)))];
    Object.keys(C.SIDES).forEach(function (key) {
      var s = C.SIDES[key];
      var pal = { D: s.D, M: s.M, L: s.L };
      SPR.tank[key] = {};
      for (var i = 0; i < 4; i++) SPR.tank[key][dirs[i]] = fromASCII(rows[i], pal);
    });

    // itens
    Object.keys(PUP).forEach(function (key) {
      SPR.pup[key] = fromASCII(PUP[key], PUP_COLORS[key]);
      SPR.pupFrame[key] = PUP_COLORS[key];
    });

    // anel de escudo (20x20, borda arredondada)
    var ring = makeCanvas(20, 20), rc = ctxOf(ring);
    rc.fillStyle = '#7fe6ff';
    rc.fillRect(3, 0, 14, 1); rc.fillRect(3, 19, 14, 1);
    rc.fillRect(0, 3, 1, 14); rc.fillRect(19, 3, 1, 14);
    rc.fillRect(1, 1, 2, 1); rc.fillRect(1, 1, 1, 2);
    rc.fillRect(17, 1, 2, 1); rc.fillRect(18, 1, 1, 2);
    rc.fillRect(1, 18, 2, 1); rc.fillRect(1, 17, 1, 2);
    rc.fillRect(17, 18, 2, 1); rc.fillRect(18, 17, 1, 2);
    SPR.shieldRing = ring;

    // tijolo 16x16
    var b = makeCanvas(16, 16), bc = ctxOf(b);
    bc.fillStyle = C.COLORS.brickD;
    bc.fillRect(0, 0, 16, 16);
    function brickBlock(x, y, w, h) {
      bc.fillStyle = C.COLORS.brickM;
      bc.fillRect(x, y, w, h);
      bc.fillStyle = C.COLORS.brickL;
      bc.fillRect(x, y, w, 1);
      bc.fillRect(x, y, 1, h);
      bc.fillStyle = C.COLORS.brickShade;
      bc.fillRect(x, y + h - 1, w, 1);
    }
    // 4 cursos de 3px, juntas alternadas
    for (var course = 0; course < 4; course++) {
      var y = course * 4 + 1;
      if (course % 2 === 0) {
        brickBlock(1, y, 6, 3); brickBlock(8, y, 7, 3);
      } else {
        brickBlock(0, y, 4, 3); brickBlock(5, y, 6, 3); brickBlock(12, y, 4, 3);
      }
    }
    SPR.brick = b;

    // tijolo rachado (dano)
    var b2 = makeCanvas(16, 16), b2c = ctxOf(b2);
    b2c.drawImage(b, 0, 0);
    b2c.fillStyle = C.COLORS.brickShade;
    b2c.fillRect(2, 2, 1, 4); b2c.fillRect(3, 6, 3, 1); b2c.fillRect(6, 3, 1, 3);
    b2c.fillRect(10, 8, 4, 1); b2c.fillRect(9, 9, 1, 4);
    SPR.brickBroken = b2;

    // aco 16x16
    var s = makeCanvas(16, 16), sc = ctxOf(s);
    sc.fillStyle = C.COLORS.steelM;
    sc.fillRect(0, 0, 16, 16);
    sc.fillStyle = C.COLORS.steelL;
    sc.fillRect(0, 0, 16, 2); sc.fillRect(0, 0, 2, 16);
    sc.fillStyle = C.COLORS.steelD;
    sc.fillRect(0, 14, 16, 2); sc.fillRect(14, 0, 2, 16);
    sc.fillStyle = C.COLORS.steelShade;
    sc.fillRect(2, 2, 12, 1); sc.fillRect(2, 2, 1, 12);
    sc.fillRect(2, 13, 12, 1); sc.fillRect(13, 2, 1, 12);
    // rebites
    sc.fillStyle = C.COLORS.steelL;
    sc.fillRect(4, 4, 2, 2); sc.fillRect(10, 4, 2, 2);
    sc.fillRect(4, 10, 2, 2); sc.fillRect(10, 10, 2, 2);
    sc.fillStyle = C.COLORS.steelD;
    sc.fillRect(5, 5, 1, 1); sc.fillRect(11, 5, 1, 1);
    sc.fillRect(5, 11, 1, 1); sc.fillRect(11, 11, 1, 1);
    SPR.steel = s;

    // projeteis 3x3
    SPR.bullet.p = fromASCII([
      '.L.', 'LWL', '.L.'
    ], { L: '#ffd24a', W: '#ffffff' });
    SPR.bullet.e = fromASCII([
      '.L.', 'LWL', '.L.'
    ], { L: '#ff5a2a', W: '#ffd24a' });
    SPR.bullet.c = fromASCII([
      '.L.', 'LWL', '.L.'
    ], { L: '#8fd8ff', W: '#e8f7ff' });

    // pips (marcadores de rodada) 6x6
    ['on', 'off'].forEach(function (k) {
      var p = makeCanvas(6, 6), pc = ctxOf(p);
      var base = k === 'on' ? '#ffd24a' : '#233246';
      pc.fillStyle = k === 'on' ? '#fff1b8' : '#2c3d54';
      pc.fillRect(0, 0, 6, 6);
      pc.fillStyle = base;
      pc.fillRect(1, 1, 4, 4);
      if (k === 'on') { pc.fillStyle = '#fffbe8'; pc.fillRect(2, 2, 2, 2); }
      SPR.pip[k] = p;
    });
  };

  PT.Sprites = SPR;
  PT.px = function (ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  };
  PT.makeCanvas = makeCanvas;
  PT.ctxOf = ctxOf;
})(window.PT = window.PT || {});
