/* FOGO CRUZADO - visao: mapa de sombra de linha de visao + memoria do terreno */
(function (PT) {
  'use strict';

  var C = PT.C, U = PT.U, COL = PT.COL;
  var FR = C.TILE / C.FOG_RES;           // pixels de mundo por pixel do mapa de nevoa
  var FW = C.FOG_W, FH = C.FOG_H;
  var RAYS = 180;                        // raios por observador
  var RAY_STEP = 12;                     // passo de marcha (px)
  var LOS_R = 31;                        // raio de tiro da LOS (tiles) - cobre o mapa

  var Vis = {};

  // linhas de direcao pre-calculadas
  var DIRS = [];
  for (var i = 0; i < RAYS; i++) {
    var a = i / RAYS * Math.PI * 2;
    DIRS.push({ x: Math.cos(a), y: Math.sin(a) });
  }

  Vis.init = function () {
    Vis.visible = new Uint8Array(FW * FH);
    Vis.seen = new Uint8Array(FW * FH);
    Vis.alpha = new Float32Array(64 * 40);
    Vis.fogCanvas = document.createElement('canvas');
    Vis.fogCanvas.width = FW;
    Vis.fogCanvas.height = FH;
    Vis.fogCtx = Vis.fogCanvas.getContext('2d');
    Vis.clear();
  };

  Vis.clear = function () {
    Vis.visible.fill(0);
    Vis.seen.fill(0);
    Vis.alpha.fill(0);
  };

  /** desenha um circulo de visao (sem oclusao) */
  Vis.disc = function (x, y, radius) {
    var ctx = Vis.fogCtx;
    ctx.beginPath();
    ctx.arc(x / FR, y / FR, radius / FR, 0, Math.PI * 2);
    ctx.fill();
  };

  function blocked(px, py) {
    // fumaca bloqueia a visao (mas nao os tiros)
    var sm = Vis.smoke;
    if (sm && sm.length) {
      for (var s = 0; s < sm.length; s++) {
        var puff = sm[s];
        if (puff.alpha <= 0.06 || puff.life <= 0) continue;
        var sdx = px - puff.x, sdy = py - puff.y;
        var rr = puff.r * 0.82;
        if (sdx * sdx + sdy * sdy < rr * rr) return true;
      }
    }
    var c = Math.floor(px / C.TILE), r = Math.floor(py / C.TILE);
    if (c < 0 || c >= C.COLS || r < 0 || r >= C.ROWS) return true;
    return Vis.blocksSight[r * C.COLS + c] === 1;
  }

  /** desenha um poligono de visao com oclusao por sombra de linha */
  Vis.poly = function (x, y, radius, half) {
    var ctx = Vis.fogCtx;
    var step = radius < 160 ? RAY_STEP : RAY_STEP * 1.6;
    var from = 0, to = DIRS.length;
    if (half !== undefined && half !== null) {
      // leque: filtra direcoes dentro do angulo (a direcao 0 e' +x)
      var start = half.center - half.width, end = half.center + half.width;
      ctx.beginPath();
      ctx.moveTo(x / FR, y / FR);
      var n = Math.max(6, Math.round((end - start) / (Math.PI * 2) * RAYS));
      for (var s = 0; s <= n; s++) {
        var ang = start + (end - start) * s / n;
        var dx = Math.cos(ang), dy = Math.sin(ang);
        var t = 0, hit = false;
        while (t < radius) {
          t += step;
          if (t > radius) t = radius;
          if (blocked(x + dx * t, y + dy * t)) { hit = true; break; }
        }
        ctx.lineTo((x + dx * t) / FR, (y + dy * t) / FR);
      }
      ctx.closePath();
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(x / FR, y / FR);
    for (var d = from; d < to; d++) {
      var dir = DIRS[d];
      var tt = 0;
      while (tt < radius) {
        tt += step;
        if (tt > radius) tt = radius;
        if (blocked(x + dir.x * tt, y + dir.y * tt)) break;
      }
      ctx.lineTo((x + dir.x * tt) / FR, (y + dir.y * tt) / FR);
    }
    ctx.closePath();
    ctx.fill();
  };

  /** recalcula a visibilidade do turno */
  Vis.compute = function (units) {
    var ctx = Vis.fogCtx;
    Vis.visible.fill(0);
    ctx.clearRect(0, 0, FW, FH);
    ctx.fillStyle = '#fff';
    var any = false;
    for (var i = 0; i < units.length; i++) {
      var u = units[i];
      if (u.dead || u.team === 'enemy') continue;
      any = true;
      if (!u.prone) Vis.poly(u.x, u.y, u.vision);
      else Vis.disc(u.x, u.y, u.vision * 0.75);
    }
    if (!any) { Vis.alpha.fill(0); return; }

    // marca visivel + visto
    var img = ctx.getImageData(0, 0, FW, FH).data;
    for (var p = 0; p < FW * FH; p++) {
      var v = img[p * 4 + 3] > 40 ? 1 : 0;
      Vis.visible[p] = v;
      if (v) Vis.seen[p] = 1;
    }

    // acumula memoria com suavizacao (grade de tiles)
    for (var r = 0; r < C.ROWS; r++) {
      for (var c = 0; c < C.COLS; c++) {
        var cm = c * 2, rm = r * 2;
        var vis = Vis.visible[rm * FW + cm] || Vis.visible[rm * FW + cm + 1] ||
          Vis.visible[(rm + 1) * FW + cm] || Vis.visible[(rm + 1) * FW + cm + 1];
        var seen = Vis.seen[rm * FW + cm] || Vis.seen[(rm + 1) * FW + cm + 1] ||
          Vis.seen[rm * FW + cm + 1] || Vis.seen[(rm + 1) * FW + cm];
        var val = vis ? 1 : (seen ? 0.5 : 0);
        var idx = r * C.COLS + c;
        Vis.alpha[idx] += (val - Vis.alpha[idx]) * 0.35;
      }
    }
  };

  /** o ponto esta visivel pela equipe do jogador? */
  Vis.isVisible = function (x, y) {
    var c = Math.floor(x / C.TILE), r = Math.floor(y / C.TILE);
    if (c < 0 || c >= C.COLS || r < 0 || r >= C.ROWS) return true;
    var cm = U.clamp(Math.floor(c * 2), 0, C.COLS * 2 - 1);
    var rm = U.clamp(Math.floor(r * 2), 0, C.ROWS * 2 - 1);
    return Vis.visible[rm * FW + cm] === 1;
  };

  /** houve contato visual recente (para IA usar memoria)? */
  Vis.seenRecently = function (x, y) {
    var c = U.clamp(Math.floor(x / C.TILE), 0, C.COLS - 1);
    var r = U.clamp(Math.floor(y / C.TILE), 0, C.ROWS - 1);
    var cm = U.clamp(Math.floor(c * 2), 0, C.COLS * 2 - 1);
    var rm = U.clamp(Math.floor(r * 2), 0, C.ROWS * 2 - 1);
    return Vis.seen[rm * FW + cm] === 1;
  };

  /** LOS livre entre dois pontos (usado pela IA e por efeitos) */
  Vis.los = function (ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay;
    var d = Math.sqrt(dx * dx + dy * dy);
    var steps = Math.ceil(d / 6);
    if (steps <= 0) return true;
    for (var i = 1; i < steps; i++) {
      var t = i / steps;
      if (blocked(ax + dx * t, ay + dy * t)) return false;
    }
    return true;
  };

  /** desenha a nevoa por cima do campo */
  Vis.renderFog = function (ctx, w, h) {
    var S = 8;   // tamanho do bloco em pixels de tela
    for (var r = 0; r < C.ROWS; r++) {
      for (var c = 0; c < C.COLS; c++) {
        var a = Vis.alpha[r * C.COLS + c];
        if (a < 0.02) { ctx.fillStyle = 'rgba(6,8,10,1)'; ctx.fillRect(c * C.TILE, r * C.TILE, C.TILE, C.TILE); continue; }
        var alpha = (1 - a) * COL.fog;
        ctx.fillStyle = 'rgba(6,8,10,' + alpha.toFixed(3) + ')';
        ctx.fillRect(c * C.TILE, r * C.TILE, C.TILE, C.TILE);
      }
    }
  };

  PT.Vis = Vis;
})(window.PT = window.PT || {});
