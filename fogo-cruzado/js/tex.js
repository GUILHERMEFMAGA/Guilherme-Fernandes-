/* FOGO CRUZADO - texturas procedurais: chao, paredes, vegetacao, veiculos */
(function (PT) {
  'use strict';

  var C = PT.C, COL = PT.COL, U = PT.U;
  var T = C.TILE;

  function cv(w, h) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    return { cv: c, ctx: x };
  }

  function speckle(ctx, rng, n, w, h, colors, minS, maxS) {
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = colors[(rng() * colors.length) | 0];
      var s = minS + rng() * (maxS - minS);
      ctx.globalAlpha = 0.35 + rng() * 0.5;
      ctx.fillRect(rng() * w, rng() * h, s, s);
    }
    ctx.globalAlpha = 1;
  }

  function shadeRect(ctx, x, y, w, h, col, alpha) {
    ctx.globalAlpha = alpha === undefined ? 0.4 : alpha;
    ctx.fillStyle = col;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = 1;
  }

  // ------------------------------------------------------------------ chao
  function makeGround(mat, seed) {
    var rng = U.seededRng(seed);
    var o = cv(T, T), g = o.ctx;
    var base, alt, dots;
    if (mat === 'asphalt') { base = COL.asphaltA; alt = COL.asphaltB; dots = [COL.asphaltDot, COL.asphaltCrack]; }
    else if (mat === 'dirt') { base = COL.dirtA; alt = COL.dirtB; dots = [COL.dirtDot, '#4a4238', '#372f27']; }
    else if (mat === 'grass') { base = COL.grassA; alt = COL.grassB; dots = [COL.grassTuft, '#5a6b48', '#2f3a28']; }
    else { base = COL.floorA; alt = COL.floorB; dots = [COL.floorLine, '#64635c', '#48473f']; }

    g.fillStyle = base;
    g.fillRect(0, 0, T, T);

    // manchas grandes
    for (var i = 0; i < 5; i++) {
      g.globalAlpha = 0.25 + rng() * 0.3;
      g.fillStyle = rng() < 0.5 ? alt : dots[2];
      var w = 4 + rng() * 12, h = 4 + rng() * 10;
      g.fillRect(rng() * (T - w), rng() * (T - h), w, h);
    }
    g.globalAlpha = 1;

    if (mat === 'grass') {
      // tufos de grama
      for (var k = 0; k < 26; k++) {
        var x = rng() * T, y = rng() * T;
        g.strokeStyle = rng() < 0.5 ? COL.grassTuft : '#4e6040';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(x + (rng() - 0.5) * 3, y - 2 - rng() * 3);
        g.stroke();
      }
    } else if (mat === 'asphalt') {
      // rachaduras
      for (var c2 = 0; c2 < 2; c2++) {
        var px = rng() * T, py = rng() * T;
        g.strokeStyle = COL.asphaltCrack;
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(px, py);
        for (var s = 0; s < 4; s++) {
          px += (rng() - 0.5) * 9;
          py += (rng() - 0.5) * 9;
          g.lineTo(px, py);
        }
        g.stroke();
      }
    } else if (mat === 'floor') {
      g.strokeStyle = COL.floorLine;
      g.lineWidth = 1;
      g.globalAlpha = 0.5;
      g.beginPath();
      g.moveTo(0, 11.5); g.lineTo(T, 11.5);
      g.moveTo(11.5, 0); g.lineTo(11.5, T);
      g.stroke();
      g.globalAlpha = 1;
    }
    speckle(g, rng, mat === 'grass' ? 30 : 44, T, T, dots, 1, 2.4);
    return o.cv;
  }

  // ---------------------------------------------------------------- paredes
  function makeWall(mat, seed) {
    var o = cv(T, T), g = o.ctx;
    var rng = U.seededRng(seed);
    var FACE = 7;   // altura aparente

    if (mat === 'concrete' || mat === 'rubble') {
      var dead = mat === 'rubble';
      g.fillStyle = dead ? '#5f6059' : COL.concFace;
      g.fillRect(0, 0, T, T);
      var tx = cv(T, T - FACE), tc = tx.ctx;
      tc.fillStyle = dead ? '#6d6e66' : COL.concTop;
      tc.fillRect(0, 0, T, T - FACE);
      speckle(tc, rng, 60, T, T - FACE, [COL.concTopB, COL.concEdge, '#767770'], 1, 2);
      // blocos
      tc.strokeStyle = 'rgba(60,60,56,0.45)';
      tc.lineWidth = 1;
      tc.beginPath();
      tc.moveTo(0, 8.5); tc.lineTo(T, 8.5);
      tc.moveTo(11.5, 0); tc.lineTo(11.5, 8);
      tc.moveTo(5.5, 9); tc.lineTo(5.5, T - FACE);
      tc.moveTo(18.5, 9); tc.lineTo(18.5, T - FACE);
      tc.stroke();
      if (dead) {
        // madeira exposta e trincas
        tc.strokeStyle = 'rgba(30,30,28,0.7)';
        tc.beginPath();
        tc.moveTo(3, 3); tc.lineTo(9, 12); tc.lineTo(5, 15);
        tc.moveTo(19, 2); tc.lineTo(14, 9);
        tc.stroke();
        tc.fillStyle = '#4a4b45';
        tc.fillRect(2, 10, 3, 3); tc.fillRect(18, 13, 4, 3);
      }
      g.drawImage(tx.cv, 0, 0);
      // aresta iluminada e face sombreada
      g.fillStyle = dead ? '#7c7d75' : COL.concEdge;
      g.fillRect(0, 0, T, 2);
      g.fillRect(0, 0, 2, T - FACE);
      g.fillStyle = 'rgba(20,20,18,0.55)';
      g.fillRect(0, T - FACE, T, FACE);
      g.fillStyle = 'rgba(255,255,255,0.06)';
      g.fillRect(0, T - FACE, T, 1);
      return o.cv;
    }

    if (mat === 'metal') {
      g.fillStyle = COL.metalFace;
      g.fillRect(0, 0, T, T);
      var mt = cv(T, T - FACE), mc = mt.ctx;
      mc.fillStyle = COL.metalTop;
      mc.fillRect(0, 0, T, T - FACE);
      mc.strokeStyle = 'rgba(40,46,52,0.6)';
      mc.lineWidth = 1;
      mc.strokeRect(2.5, 2.5, T - 5, T - FACE - 5);
      mc.strokeRect(6.5, 0, 0, 0);
      mc.beginPath();
      mc.moveTo(0, (T - FACE) / 2);
      mc.lineTo(T, (T - FACE) / 2);
      mc.stroke();
      // rebites
      for (var i = 0; i < 6; i++) {
        var rx = 3 + (i % 2) * (T - 7), ry = 4 + Math.floor(i / 2) * 5;
        mc.fillStyle = COL.metalEdge;
        mc.fillRect(rx, ry, 2, 2);
        mc.fillStyle = 'rgba(30,34,40,0.7)';
        mc.fillRect(rx, ry + 2, 2, 1);
      }
      g.drawImage(mt.cv, 0, 0);
      g.fillStyle = COL.metalEdge;
      g.fillRect(0, 0, T, 1);
      g.fillRect(0, 0, 1, T - FACE);
      g.fillStyle = 'rgba(16,18,22,0.5)';
      g.fillRect(0, T - FACE, T, FACE);
      g.fillStyle = 'rgba(255,255,255,0.08)';
      g.fillRect(0, T - FACE, T, 1);
      return o.cv;
    }

    if (mat === 'wood') {
      g.fillStyle = COL.woodFace;
      g.fillRect(0, 0, T, T);
      var wt = cv(T, T - FACE), wc = wt.ctx;
      wc.fillStyle = COL.woodTop;
      wc.fillRect(0, 0, T, T - FACE);
      // tabuas
      for (var p = 0; p < 4; p++) {
        var py = p * ((T - FACE) / 4);
        wc.fillStyle = p % 2 ? 'rgba(90,64,32,0.35)' : 'rgba(190,150,90,0.18)';
        wc.fillRect(0, py, T, (T - FACE) / 4 - 1);
        wc.strokeStyle = COL.woodLine;
        wc.lineWidth = 1;
        wc.beginPath();
        wc.moveTo(0, py + 0.5);
        wc.lineTo(T, py + 0.5);
        wc.stroke();
      }
      // nos da madeira
      for (var k = 0; k < 3; k++) {
        wc.fillStyle = COL.woodLine;
        wc.beginPath();
        wc.arc(rng() * T, rng() * (T - FACE), 1.2, 0, 6.3);
        wc.fill();
      }
      g.drawImage(wt.cv, 0, 0);
      g.fillStyle = COL.woodEdge;
      g.fillRect(0, 0, T, 1);
      g.fillRect(0, 0, 1, T - FACE);
      g.fillStyle = 'rgba(24,16,8,0.5)';
      g.fillRect(0, T - FACE, T, FACE);
      g.fillStyle = 'rgba(255,240,210,0.07)';
      g.fillRect(0, T - FACE, T, 1);
      return o.cv;
    }

    if (mat === 'crate') {
      g.fillStyle = COL.crateFace;
      g.fillRect(0, 0, T, T);
      var ct = cv(T, T - 5), cc = ct.ctx;
      cc.fillStyle = COL.crateTop;
      cc.fillRect(0, 0, T, T - 5);
      cc.strokeStyle = COL.crateEdge;
      cc.lineWidth = 2;
      cc.strokeRect(3, 2.5, T - 6, T - 10);
      cc.strokeStyle = 'rgba(70,50,24,0.65)';
      cc.lineWidth = 1;
      cc.beginPath();
      cc.moveTo(4, 3); cc.lineTo(T - 4, T - 8);
      cc.moveTo(T - 4, 3); cc.lineTo(4, T - 8);
      cc.stroke();
      cc.fillStyle = 'rgba(255,230,180,0.15)';
      cc.fillRect(2, 1, T - 4, 2);
      // marcacao de carga
      cc.fillStyle = 'rgba(60,42,18,0.75)';
      cc.fillRect(9, 9, 6, 2); cc.fillRect(11, 6, 2, 8);
      g.drawImage(ct.cv, 0, 0);
      g.fillStyle = 'rgba(18,12,6,0.5)';
      g.fillRect(0, T - 5, T, 5);
      g.fillStyle = COL.crateEdge;
      g.fillRect(0, 0, T, 1);
      return o.cv;
    }

    if (mat === 'sandbags') {
      g.clearRect(0, 0, T, T);
      var lumps = [
        [2, 6, 10, 8], [12, 5, 10, 8], [6, 13, 11, 9], [16, 14, 7, 8], [0, 15, 6, 8]
      ];
      for (var i2 = 0; i2 < lumps.length; i2++) {
        var L = lumps[i2];
        var grd = g.createLinearGradient(L[0], L[1], L[0], L[1] + L[3]);
        grd.addColorStop(0, COL.sandA);
        grd.addColorStop(1, COL.sandB);
        g.fillStyle = grd;
        g.beginPath();
        g.moveTo(L[0] + 1, L[1] + L[3]);
        g.quadraticCurveTo(L[0] - 1, L[1] + 1, L[0] + 3, L[1]);
        g.quadraticCurveTo(L[0] + L[2] * 0.5, L[1] - 2, L[0] + L[2] - 3, L[1]);
        g.quadraticCurveTo(L[0] + L[2] + 1, L[1] + 1, L[0] + L[2] - 1, L[1] + L[3]);
        g.closePath();
        g.fill();
        g.strokeStyle = 'rgba(70,58,38,0.55)';
        g.lineWidth = 1;
        g.stroke();
        g.fillStyle = COL.sandEdge;
        g.globalAlpha = 0.5;
        g.fillRect(L[0] + 2, L[1] + 2, L[2] - 6, 1);
        g.globalAlpha = 1;
      }
      speckle(g, rng, 26, T, T, ['#8d7c58', '#c8b58c', '#7a6a4b'], 1, 2);
      return o.cv;
    }

    if (mat === 'tree') {
      // sombra no chao + copa
      g.fillStyle = 'rgba(0,0,0,0.28)';
      g.beginPath();
      g.ellipse(T / 2 + 2, T / 2 + 3, 10, 8, 0, 0, 6.3);
      g.fill();
      g.fillStyle = COL.trunk;
      g.fillRect(T / 2 - 2, T / 2 - 2, 4, 6);
      var blobs = [
        [T / 2, T / 2 - 2, 10.5, COL.treeA],
        [T / 2 - 4, T / 2 + 1, 7.5, COL.treeB],
        [T / 2 + 4, T / 2 + 1, 7.5, COL.treeC],
        [T / 2 - 1, T / 2 - 6, 6.5, COL.treeB]
      ];
      for (var b = 0; b < blobs.length; b++) {
        g.fillStyle = blobs[b][3];
        g.beginPath();
        g.arc(blobs[b][0], blobs[b][1], blobs[b][2] * (0.9 + rng() * 0.2), 0, 6.3);
        g.fill();
      }
      for (var s2 = 0; s2 < 34; s2++) {
        var a = rng() * 6.28, rr = rng() * 9;
        g.fillStyle = rng() < 0.5 ? '#4a6138' : '#26351d';
        g.globalAlpha = 0.6;
        g.fillRect(T / 2 + Math.cos(a) * rr, T / 2 - 3 + Math.sin(a) * rr * 0.9, 2, 2);
      }
      g.globalAlpha = 1;
      return o.cv;
    }

    if (mat === 'objective') {
      // caixa de comunicacoes: base de concreto, antena e luz
      g.fillStyle = 'rgba(0,0,0,0.3)';
      g.beginPath();
      g.ellipse(T / 2 + 2, T - 5, 10, 5, 0, 0, 6.3);
      g.fill();
      g.fillStyle = COL.objFace;
      g.fillRect(2, 5, T - 4, T - 9);
      g.fillStyle = COL.objTop;
      g.fillRect(2, 4, T - 4, T - 13);
      g.fillStyle = COL.objEdge;
      g.fillRect(2, 4, T - 4, 1);
      g.fillRect(2, 4, 1, T - 9);
      g.fillStyle = 'rgba(20,24,14,0.6)';
      g.fillRect(2, T - 6, T - 4, 2);
      // frestas e antena
      g.fillStyle = '#222a18';
      g.fillRect(5, 9, 5, 2); g.fillRect(5, 13, 8, 2);
      g.fillStyle = COL.objMark;
      g.fillRect(T - 9, 8, 4, 4);
      g.strokeStyle = '#3c4436';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(T - 4, 6); g.lineTo(T - 4, 0);
      g.moveTo(T - 6, 2); g.lineTo(T - 2, 2);
      g.stroke();
      return o.cv;
    }

    // padrao: bloco neutro
    g.fillStyle = COL.concTop;
    g.fillRect(0, 0, T, T);
    return o.cv;
  }

  // ---------------------------------------------------------------- objetos
  function makeSoldierBody(team) {
    // corpo visto de cima, virado para CIMA (girado depois)
    var o = cv(20, 22), g = o.ctx;
    var pal = COL[team] || COL.ally;
    var cx = 10;

    // sombra
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.beginPath();
    g.ellipse(cx + 1, 12, 7, 8, 0, 0, 6.3);
    g.fill();

    // mochila
    g.fillStyle = pal.bodyDark;
    g.beginPath();
    g.roundRect ? g.roundRect(cx - 4, 13, 8, 7, 2) : g.rect(cx - 4, 13, 8, 7);
    g.fill();

    // ombros / colete
    g.fillStyle = pal.body;
    g.beginPath();
    g.moveTo(cx - 7, 8);
    g.quadraticCurveTo(cx - 8, 3, cx - 4, 2);
    g.lineTo(cx + 4, 2);
    g.quadraticCurveTo(cx + 8, 3, cx + 7, 8);
    g.lineTo(cx + 5, 16);
    g.lineTo(cx - 5, 16);
    g.closePath();
    g.fill();

    // placa do colete
    g.fillStyle = pal.bodyDark;
    g.fillRect(cx - 4, 5, 8, 7);
    g.fillStyle = pal.body;
    g.fillRect(cx - 3, 6, 6, 5);
    // bolsos
    g.fillStyle = '#242a1e';
    g.fillRect(cx - 5, 8, 2, 3);
    g.fillRect(cx + 3, 8, 2, 3);

    // bracos
    g.fillStyle = pal.body;
    g.fillRect(cx - 8, 8, 3, 6);
    g.fillRect(cx + 5, 8, 3, 6);
    g.fillStyle = pal.bodyDark;
    g.fillRect(cx - 7, 10, 2, 2);
    g.fillRect(cx + 5, 10, 2, 2);

    // capacete
    g.fillStyle = pal.helm;
    g.beginPath();
    g.ellipse(cx, 6, 5.4, 5.6, 0, 0, 6.3);
    g.fill();
    g.fillStyle = pal.helmLight;
    g.beginPath();
    g.ellipse(cx - 1.4, 4.6, 3.4, 3.2, 0, 0, 6.3);
    g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.45)';
    g.lineWidth = 1;
    g.beginPath();
    g.ellipse(cx, 6, 5.4, 5.6, 0, 0, 6.3);
    g.stroke();

    return o.cv;
  }

  // --------------------------------------------------------------- registro
  var TEX = {
    ground: {},
    wall: {},
    soldier: {},
    frond: null
  };

  var GROUND_VARIANTS = 5;

  TEX.init = function () {
    var mats = ['asphalt', 'dirt', 'grass', 'floor'];
    mats.forEach(function (m) {
      TEX.ground[m] = [];
      for (var v = 0; v < GROUND_VARIANTS; v++) TEX.ground[m].push(makeGround(m, 1000 + m.length * 37 + v * 7));
    });
    ['concrete', 'rubble', 'metal', 'wood', 'crate', 'sandbags', 'tree', 'objective'].forEach(function (m, i) {
      TEX.wall[m] = makeWall(m, 500 + i * 13);
    });
    ['ally', 'enemy', 'p2'].forEach(function (t) { TEX.soldier[t] = makeSoldierBody(t); });
  };

  /** desenha o chao de um mapa em um canvas do tamanho do campo */
  TEX.buildGround = function (map, out) {
    var g = out.ctx;
    for (var r = 0; r < map.rows.length; r++) {
      for (var c = 0; c < map.rows[r].length; c++) {
        var ch = map.rows[r][c];
        var mat = (ch === 'g') ? 'grass' : (ch === 'd' || ch === 'p') ? 'floor' : (ch === 'T' || ch === ',') ? 'dirt' : 'asphalt';
        if (ch === 's') mat = 'dirt';
        if (ch === 'c' || ch === 'W' || ch === '=' || ch === '#') mat = 'asphalt';
        if (ch === 'o') mat = 'asphalt';
        var v = (r * 7 + c * 3) % GROUND_VARIANTS;
        g.drawImage(TEX.ground[mat][v], c * C.TILE, r * C.TILE);
        // manchas de transicao
        if ((r + c) % 5 === 0) {
          g.globalAlpha = 0.18;
          g.fillStyle = '#000';
          g.fillRect(c * C.TILE, r * C.TILE, C.TILE, C.TILE);
          g.globalAlpha = 1;
        }
      }
    }
    return out;
  };

  PT.Tex = TEX;
  PT.canvas = cv;
})(window.PT = window.PT || {});
