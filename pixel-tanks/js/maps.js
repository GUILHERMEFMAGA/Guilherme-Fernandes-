/* Pixel Tanks - mapas (. vazio, # tijolo, = aco, B base, 1/2 spawns de jogador, a/b spawns de inimigo) */
(function (PT) {
  'use strict';

  var C = PT.C;

  var MAPS = [
    {
      name: 'VALE',
      rows: [
        '....................',
        '..a..............b..',
        '..####........####..',
        '..#..............#..',
        '..#..==......==..#..',
        '.....##......##.....',
        '.....##......##.....',
        '..#..==......==..#..',
        '..#..............#..',
        '..####..####..####..',
        '..1.....####.....2..',
        '........#BB#........'
      ]
    },
    {
      name: 'FORTALEZA',
      rows: [
        '....................',
        '..a..............b..',
        '..##...##..##...##..',
        '..##...##..##...##..',
        '....................',
        '....==..####..==....',
        '....==..####..==....',
        '....................',
        '..##...##..##...##..',
        '..##...######...##..',
        '..1.....####.....2..',
        '........#BB#........'
      ]
    },
    {
      name: 'ABERTO',
      rows: [
        '....................',
        '..a..............b..',
        '....................',
        '..==............==..',
        '.....####..####.....',
        '....................',
        '..####........####..',
        '....................',
        '.....####..####.....',
        '..==....####....==..',
        '..1.....####.....2..',
        '........#BB#........'
      ]
    }
  ];

  PT.Maps = {
    list: MAPS,

    /** monta paredes, base e pontos de nascimento do mapa */
    build: function (index) {
      var def = MAPS[index % MAPS.length];
      var walls = {};
      var spawns = {};
      var baseTiles = [];
      var bx1 = 999, by1 = 999, bx2 = -1, by2 = -1;

      for (var r = 0; r < C.ROWS; r++) {
        for (var c = 0; c < C.COLS; c++) {
          var ch = def.rows[r][c];
          var key = r * C.COLS + c;
          if (ch === '#') {
            walls[key] = { type: 'brick', hp: 2, damaged: false };
          } else if (ch === '=') {
            walls[key] = { type: 'steel', hp: -1, damaged: false };
          } else if (ch === 'B') {
            baseTiles.push(key);
            if (c < bx1) bx1 = c;
            if (c > bx2) bx2 = c;
            if (r < by1) by1 = r;
            if (r > by2) by2 = r;
          } else if ('12ab'.indexOf(ch) >= 0) {
            spawns[ch] = { col: c, row: r };
          }
        }
      }

      var base = null;
      if (baseTiles.length) {
        base = {
          col: bx1, row: by1,
          x: bx1 * C.TILE,
          y: C.FIELD_Y + by1 * C.TILE,
          w: (bx2 - bx1 + 1) * C.TILE,
          h: (by2 - by1 + 1) * C.TILE,
          tiles: baseTiles,
          alive: true
        };
      }

      return { name: def.name, walls: walls, spawns: spawns, base: base, def: def };
    }
  };
})(window.PT = window.PT || {});
