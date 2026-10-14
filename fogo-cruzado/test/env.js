/*
 * Ambiente de teste: canvas falso (com rasterizador real para o mapa de nevoa),
 * DOM minimo e carregamento dos modulos do jogo para rodar no Node.
 *
 *   const { PT, G, U, counters } = require('./env').makeEnv();
 *
 * Opcional: makeEnv({ canvas: (w, h) => realCanvas }) troca o canvas falso por um
 * canvas de verdade (usado para tirar screenshots do jogo renderizado).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

function makeEnv(opts) {
  opts = opts || {};
  const counters = { fillRect: 0, drawImage: 0, fill: 0, stroke: 0, fillText: 0, getImageData: 0, clearRect: 0 };

  function makeCtx(w, h, raster) {
    var alpha = raster ? new Uint8Array(w * h) : null;
    var path = [];
    function grad() { return { addColorStop() { } }; }
    function paintPath() {
      if (!alpha) return;
      for (var p = 0; p < path.length; p++) {
        var op = path[p];
        if (op.t !== 'arc') continue;
        var r = op.r, x0 = Math.max(0, Math.floor(op.x - r)), x1 = Math.min(w - 1, Math.ceil(op.x + r));
        var y0 = Math.max(0, Math.floor(op.y - r)), y1 = Math.min(h - 1, Math.ceil(op.y + r));
        for (var y = y0; y <= y1; y++) {
          for (var x = x0; x <= x1; x++) {
            var dx = x + 0.5 - op.x, dy = y + 0.5 - op.y;
            if (dx * dx + dy * dy <= r * r) alpha[y * w + x] = 255;
          }
        }
      }
      var pts = path.filter(function (o) { return o.t === 'm' || o.t === 'l'; });
      if (pts.length > 2) {
        var minY = 1e9, maxY = -1e9;
        pts.forEach(function (p) { minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y); });
        for (var yy = Math.max(0, Math.floor(minY)); yy <= Math.min(h - 1, Math.ceil(maxY)); yy++) {
          var xs = [];
          for (var i = 0; i < pts.length; i++) {
            var a = pts[i], b = pts[(i + 1) % pts.length], yc = yy + 0.5;
            if ((a.y <= yc && b.y > yc) || (b.y <= yc && a.y > yc)) {
              xs.push(a.x + (yc - a.y) / (b.y - a.y) * (b.x - a.x));
            }
          }
          xs.sort(function (m, n) { return m - n; });
          for (var k = 0; k + 1 < xs.length; k += 2) {
            for (var xx = Math.max(0, Math.floor(xs[k])); xx <= Math.min(w - 1, Math.ceil(xs[k + 1])); xx++) {
              alpha[yy * w + xx] = 255;
            }
          }
        }
      }
    }
    return {
      canvas: { width: w, height: h },
      fillStyle: '#000', strokeStyle: '#000', lineWidth: 1, globalAlpha: 1,
      font: '', textAlign: 'left', textBaseline: 'alphabetic', imageSmoothingEnabled: false,
      fillRect() { counters.fillRect++; },
      strokeRect() { },
      clearRect(x, y, cw, ch) {
        counters.clearRect++;
        if (!alpha) return;
        var x0 = Math.max(0, Math.floor(x)), x1 = Math.min(w - 1, Math.ceil(x + cw));
        var y0 = Math.max(0, Math.floor(y)), y1 = Math.min(h - 1, Math.ceil(y + ch));
        for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) alpha[yy * w + xx] = 0;
      },
      drawImage() { counters.drawImage++; },
      save() { }, restore() { }, translate() { }, rotate() { }, scale() { },
      beginPath() { path = []; },
      closePath() { },
      moveTo(x, y) { path.push({ t: 'm', x: x, y: y }); },
      lineTo(x, y) { path.push({ t: 'l', x: x, y: y }); },
      quadraticCurveTo(cx, cy, x, y) { path.push({ t: 'l', x: x, y: y }); },
      bezierCurveTo(a, b, c, d, x, y) { path.push({ t: 'l', x: x, y: y }); },
      arc(x, y, r) { path.push({ t: 'arc', x: x, y: y, r: r }); },
      ellipse(x, y, rx, ry) { path.push({ t: 'arc', x: x, y: y, r: Math.max(rx, ry) }); },
      rect() { },
      roundRect(x, y, rw, rh) { path.push({ t: 'arc', x: x + rw / 2, y: y + rh / 2, r: Math.min(rw, rh) / 2 }); },
      fill() { counters.fill++; paintPath(); },
      stroke() { counters.stroke++; },
      clip() { }, setLineDash() { },
      measureText(t) { return { width: String(t).length * 6 }; },
      fillText() { counters.fillText++; },
      createLinearGradient() { return grad(); },
      createRadialGradient() { return grad(); },
      getImageData(x, y, gw, gh) {
        counters.getImageData++;
        var data = new Uint8ClampedArray(gw * gh * 4);
        if (alpha) {
          for (var yy = 0; yy < gh; yy++) {
            for (var xx = 0; xx < gw; xx++) {
              data[(yy * gw + xx) * 4 + 3] = alpha[(yy + y) * w + (xx + x)] || 0;
            }
          }
        }
        return { data: data, width: gw, height: gh };
      }
    };
  }

  function makeCanvas(w, h) {
    w = w || 960; h = h || 600;
    // canvas "de verdade" (ex.: @napi-rs/canvas) — usado para gerar screenshots
    if (opts.canvas) {
      var real = opts.canvas(w, h);
      if (!real.getBoundingClientRect) real.getBoundingClientRect = function () { return { left: 0, top: 0, width: real.width, height: real.height }; };
      if (!real.addEventListener) real.addEventListener = function () { };
      if (!real.removeEventListener) real.removeEventListener = function () { };
      if (!real.style) real.style = {};
      if (real.id === undefined) real.id = '';
      return real;
    }
    var cv = { width: w, height: h, style: {} };
    var ctx = makeCtx(w, h, true);
    cv.getContext = function () { return ctx; };
    cv.addEventListener = function () { };
    cv.removeEventListener = function () { };
    cv.getBoundingClientRect = function () { return { left: 0, top: 0, width: w, height: h }; };
    return cv;
  }

  const elements = {};
  function makeEl(id) {
    return {
      id: id, textContent: '', innerHTML: '', className: '', style: {},
      classList: { add() { }, remove() { }, toggle() { }, contains() { return false; } },
      addEventListener() { }, removeEventListener() { }, appendChild() { },
      requestFullscreen() { return Promise.resolve(); }
    };
  }
  const canvasEl = makeCanvas(960, 600);
  canvasEl.id = 'screen';
  elements['screen'] = canvasEl;

  const document = {
    readyState: 'complete',
    documentElement: makeEl('html'),
    body: makeEl('body'),
    hidden: false,
    createElement(tag) { return tag === 'canvas' ? makeCanvas(0, 0) : makeEl(tag); },
    getElementById(id) { return id === 'screen' ? canvasEl : (elements[id] = elements[id] || makeEl(id)); },
    addEventListener() { }, removeEventListener() { }
  };

  const storage = {};
  const listeners = {};
  const win = {
    document: document,
    localStorage: {
      getItem: k => (k in storage ? storage[k] : null),
      setItem: (k, v) => { storage[k] = String(v); }
    },
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    removeEventListener() { },
    requestAnimationFrame() { return 0; },
    setTimeout() { return 0; },
    clearTimeout() { },
    innerWidth: 1280, innerHeight: 800
  };
  win.window = win;

  const sandbox = {
    window: win, document: document, localStorage: win.localStorage, console: console,
    requestAnimationFrame: win.requestAnimationFrame, setTimeout: win.setTimeout,
    Math: Math, Date: Date, JSON: JSON, Object: Object, Array: Array, String: String,
    Number: Number, Boolean: Boolean, Error: Error, Uint8Array: Uint8Array,
    Uint8ClampedArray: Uint8ClampedArray, Int32Array: Int32Array, Float32Array: Float32Array,
    isNaN: isNaN, parseInt: parseInt, parseFloat: parseFloat
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);

  const files = opts.files || ['core.js', 'audio.js', 'maps.js', 'tex.js', 'vision.js', 'game.js', 'main.js'];
  const loaded = [];
  files.forEach(f => {
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', f), 'utf8'), sandbox, { filename: f });
    loaded.push(f);
  });

  const PT = sandbox.window.PT;
  if (PT.Tex) PT.Tex.init();
  if (PT.Game && PT.Game.init) PT.Game.init(canvasEl);

  return { PT, G: PT.Game, U: PT.U, Vis: PT.Vis, counters, canvasEl, sandbox, document, win, ROOT, listeners };
}

module.exports = { makeEnv, ROOT };
