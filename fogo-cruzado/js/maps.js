/* FOGO CRUZADO - mapas em ASCII
   . asfalto   , terra   g grama   d/p piso   # concreto   = metal blindado
   W madeira   c caixote   s saco de areia   T arvore   o objetivo
   1/2 nascimento dos jogadores   e posicoes de patrulha inimiga */
(function (PT) {
  'use strict';

  var MAPS = [
    {
      name: 'CERCO NA ESTRADA',
      briefing: 'Avance pela estrada e destrua os dois postos de comunicacao.',
      mission: { type: 'destroy', targets: 2, holdTime: 75 },
      enemies: 10, groups: 6,
      rows: [
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'T,,,,,,,,,,e,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,gg,,,########,,,,,,,,,,,,,,=====,,,,T',
        'T,,gg,,,#dddddd#,,,,,,TT,,,,,,=ddd=,,,,T',
        'T,,,,,,,#dddddd#,,,,,,TT,,,,,,=dod=,,,,T',
        'T,,,,,,,#dddddd#,,,,,,,,,,,,,,=ddd=,,,,T',
        'T,,,,,,,#dddddd#,,,,,,,,,,,,,,=====,,,,T',
        'T,,,,,,,##d#####,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,cc,,,,,,,,,,,,,,,,,,,,,,TT,T',
        'T,,,ssssss,,,,,,ssssss,,,,,,,,,,,e,,TT,T',
        'T,,,,,,,,,,,,,,,,,o,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,e,,,,,,,,,,,,,,,,,,######,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,#dddd#,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,#dddd#,,,,,,,,,T',
        'T,,WWWWW,,,,,,,,,,,,,,e,#dddd#,,,,,,,,,T',
        'T,,WdddW,,,,,,,,,,,,,,,,#dddd#,,,,,,,,,T',
        'T,,WdddW,,,,,,,,,,,,,,,,#dddd#,,,,,,,,,T',
        'T,,WWdWW,,,,,,,,,,,,,,,,##d###,,,,,,,,,T',
        'T,,,,,,,,,,,gg,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,gg,,,,,,,,cc,,ssssss,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,e,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,1,2,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,e,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      ]
    },
    {
      name: 'DEPOSITO DE MUNICAO',
      briefing: 'O deposito esta cheio de municao inimiga: destrua os tres paios.',
      mission: { type: 'destroy', targets: 3, holdTime: 75 },
      enemies: 14, groups: 10,
      rows: [
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,ccc,,,,,,,,,=====,,,,,,,,,,,,,,,ccc,,T',
        'T,ccc,,,,####,=====,,,####,,,,,,,,ccc,,T',
        'T,,,,,,,,#dd#,,,,,,,,,#dd#,,,,,,,,,,,,,T',
        'T,,,sss,,#dd#,=====,,,#dd#,,,,sss,,,,,,T',
        'T,,,,,,,,#dd#,=====,,,#dd#,,,,,,,,,,,,,T',
        'T,,,,,,,,#d##d,,,,,,,,#d##,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,d,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,e,e,,,,,,d,,,,,cccc,,,,,,,e,,,,,,,,T',
        'T,,,,,,,,,,,,d,,,,,cccc,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,d,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,d,,,,e,,,,,,,,,,,,ccc,,,,,T',
        'T,,,,,,,,,,,,d,,,,,,,,,,,,,,,,,ccc,,,,,T',
        'T,cccc,,,,,,,d,,,,,,,,,,,cccc,,,,,,,,,,T',
        'T,cccc,,,,,,,,,,,,,,,,,,,cccc,,,,,,,e,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,e,,,,,T',
        'T,,,,gg,,,,,,,,,,,,,,,,,,,,,gg,,,,,,,,,T',
        'T,,,,gg,,,,,,,,,,,,,,,,,,,,,gg,,,,,,,,,T',
        'T,,,,o,,,,,,,o,,,,,,,,,,,,,,,,,,,o,,,,,T',
        'T,,,,,,e,,,,e,,,,,,,,,,,e,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,e,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2T',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      ]
    },
    {
      name: 'PRACA CENTRAL',
      briefing: 'Segure a praca central ate o reforco chegar.',
      mission: { type: 'hold', targets: 0, holdTime: 75 },
      zone: { c1: 15, r1: 4, c2: 21, r2: 20 },
      enemies: 18, groups: 10,
      rows: [
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'T,,,,,,,,,,,,,,,,,e,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,e,,,,,,,,,,,,,,,,,,e,,,,,,,,,T',
        'T,,####,,,,,,,====d====,,,,,,,,,,####,,T',
        'T,,#dd#,,,,,,,=,,,,,,,=,,,,,,,,,,#dd#,,T',
        'T,,#d##,,,,,,,=,,,,,,,=,,,,,,,,,,#d##,,T',
        'T,,,,,,,,,,,,,=,,,,,,,=,,,,,,,,,,,,,,,,T',
        'T,,,,,gg,,,,,,=,,,,,,,=,,,,,,,,,gg,,,,,T',
        'T,,,,,gg,,,,,,,,,,,,,,,,,,,,,,,,gg,,,,,T',
        'T,,,,,,,,,,,,,=,,,,,,,=,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,=,,sss,,=,,,,,,,,,,,,,,,,T',
        'T,,sssssss,,,,=,,sss,,=,,,,,,,sssssss,,T',
        'T,e,,e,,,,,,,,=,,sss,,=,,,,,,,,,,,e,,e,T',
        'T,,sssssss,,,,=,,,,,,,=,,,,,,,sssssss,,T',
        'T,,,,,,,,,,,,,=,,,,,,,=,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,=,,,,,,,=,,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,,,,gg,,,,,,=,,,,,,,=,,,,,,,,,gg,,,,,T',
        'T,,,,,gg,,,,,,=,ccccc,=,,,,,,,,,gg,,,,,T',
        'T,,####,,,,,,,=,,,,,,,=,,,,,,,,,,####,,T',
        'T,,#dd#,,,,,,,=,,,,,,,=,,,,,,,,,,#dd#,,T',
        'T,,#d##,,,,,,,=========,,,,,,,,,,#d##,,T',
        'T,,,,,,,,,e,,,,,,,,,,,,,,,,,,e,,,,,,,,,T',
        'T,1,,,,,,,,,,,,,,,e,,,,,,,,,,,,,,,,,,2,T',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      ]
    },
    {
      name: 'ARENA DE ENTRENAMENTO',
      briefing: 'Treino de tiro. Limpe a arena das silhuetas inimigas.',
      mission: { type: 'duel', targets: 0, holdTime: 75 },
      enemies: 6, groups: 6,
      rows: [
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,ssss,,,e,,,,,,,,,,,,,,,,,,,,e,,,ssss,T',
        'T,s,,,,,,,,,=====,,,,,,=====,,,,,,,,,s,T',
        'T,s,,,,,,,,,,ccc,,,,,,,,ccc,,,,,,,,,,s,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,,#####,,,,,,,,,,ssss,,,,,,,,,,#####,,T',
        'T,,#ddd#,,,,,,,,,,,,,,,,,,,,,,,,#ddd#,,T',
        'T,,#ddd#,,,,,,,,,,,,,,,,,,,,,,,,#ddd#,,T',
        'T,,##d##,ecc,,,,,,,,,,,,,,,,cce,##d##,,T',
        'T,,,,,,,,,cc,,,,T,,,,,,T,,,,cc,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,T,,,,,,T,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,,,ss,,T,,,,,,T,,ss,,,,,,,,,,,T',
        'T,,,,,,,,,,,,,,,T,,,,,,T,,,,,,,,,,,,,,,T',
        'T,,,,,,,,,cc,,,,T,,,,,,T,,,,cc,,,,,,,,,T',
        'T,,#####,ecc,,,,,,,,,,,,,,,,cce,#####,,T',
        'T,,#ddd#,,,,,,,,,,,,,,,,,,,,,,,,#ddd#,,T',
        'T,,#ddd#,,,,,,,,,,,,,,,,,,,,,,,,#ddd#,,T',
        'T,,##d##,,,,,,,,,,ssss,,,,,,,,,,##d##,,T',
        'T,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,T',
        'T,ssss,,,,,,,,,,,,,,,,,,,,,,,,,,,,ssss,T',
        'T,s,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,s,T',
        'T,s,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,s,T',
        'T,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2,T',
        'TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      ]
    },
  ];

  PT.Maps = {
    list: MAPS,
    get: function (i) { return MAPS[((i % MAPS.length) + MAPS.length) % MAPS.length]; },

    /** conteudo do spawn: '1'/'2' jogadores, 'e' patrulhas, 'o' objetivos */
    analyze: function (map) {
      var spawns = { p1: null, p2: null }, enemies = [], objectives = [];
      var hold = map.mission.type === 'hold' ? map.zone : null;
      for (var r = 0; r < map.rows.length; r++) {
        var row = map.rows[r];
        for (var c = 0; c < row.length; c++) {
          var ch = row[c];
          var px = c * 24 + 12, py = r * 24 + 12;
          if (ch === '1') spawns.p1 = { x: px, y: py };
          else if (ch === '2') spawns.p2 = { x: px, y: py };
          else if (ch === 'e') enemies.push({ x: px, y: py });
          else if (ch === 'o') objectives.push({ c: c, r: r, x: c * 24, y: r * 24 });
        }
      }
      if (!spawns.p2) spawns.p2 = spawns.p1;
      return { spawns: spawns, enemies: enemies, objectives: objectives, hold: hold };
    }
  };
})(window.PT = window.PT || {});
