/* ============================================================
   PIXEL CRIME CITY  —  pixel.js
   Utilidades, texturas de tiles (16x16) e fabrica de sprites.
   Tudo e desenhado proceduralmente em pixel art (sem imagem de fundo).
   ============================================================ */

const TILE = 16;            // tamanho do tile em pixels internos
const VW = 480, VH = 270;   // resolucao interna do canvas do mundo
const TAU = Math.PI * 2;

/* ---------------- canvas ---------------- */
function mk(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;
  return { c: c, x: x };
}

/* ---------------- matematica ---------------- */
function mkrand(seed) {
  let a = (seed >>> 0) || 1;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function lerp(a, b, t) { return a + (b - a) * t; }
function angNorm(a) { a = (a + Math.PI) % TAU; if (a < 0) a += TAU; return a - Math.PI; }
function angTo(a, b, t) { return a + angNorm(b - a) * t; }
function dist2(ax, ay, bx, by) { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; }
function pick(arr, rnd) { return arr[(rnd() * arr.length) | 0]; }

/* escurece (-1) ou clareia (+1) uma cor #rrggbb */
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  if (amt > 0) { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
  else { r *= (1 + amt); g *= (1 + amt); b *= (1 + amt); }
  const h = v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0');
  return '#' + h(r) + h(g) + h(b);
}
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
}

/* ============================================================
   TEXTURAS DE TILE  (desenham um tile 16x16 em ox,oy)
   ============================================================ */
function tileRoad(x, ox, oy, rnd) {
  x.fillStyle = '#3b3e46'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 24; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.55 ? '#34373f' : '#474b55';
    x.fillRect(px, py, 1, 1);
  }
  // remendo de asfalto
  if (rnd() < 0.10) {
    const w = 4 + (rnd() * 7 | 0), h = 3 + (rnd() * 5 | 0);
    const px = ox + (rnd() * (16 - w) | 0), py = oy + (rnd() * (16 - h) | 0);
    x.fillStyle = '#454955'; x.fillRect(px, py, w, h);
    x.fillStyle = '#2f323a'; x.fillRect(px, py, w, 1); x.fillRect(px, py + h - 1, w, 1);
  }
  // rachadura
  if (rnd() < 0.18) {
    let px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = '#2e3138';
    for (let i = 0; i < 7; i++) { x.fillRect(px, py, 1, 1); px += (rnd() * 3 | 0) - 1; py += 1; }
  }
}

function tileSidewalk(x, ox, oy, rnd) {
  x.fillStyle = '#9a9c94'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 14; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#8e9088' : '#a6a89f';
    x.fillRect(px, py, 1, 1);
  }
  // juntas em 4 placas
  x.fillStyle = '#7e8078';
  x.fillRect(ox + 7, oy, 1, 16); x.fillRect(ox, oy + 7, 1, 16);
  // luz nas quinas
  x.fillStyle = '#b3b5ac';
  x.fillRect(ox + 1, oy + 1, 6, 1); x.fillRect(ox + 1, oy + 1, 1, 6);
  x.fillRect(ox + 9, oy + 9, 6, 1); x.fillRect(ox + 9, oy + 9, 1, 6);
  if (rnd() < 0.25) { // chiclete
    x.fillStyle = '#6d6f78';
    x.fillRect(ox + 2 + (rnd() * 11 | 0), oy + 2 + (rnd() * 11 | 0), 2, 1);
  }
}

function tileGrass(x, ox, oy, rnd, bright) {
  const base = bright ? '#5b9440' : '#4c7a38';
  x.fillStyle = base; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 30; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? shade(base, -0.18) : shade(base, 0.14);
    x.fillRect(px, py, 1, 1);
  }
  // tufos
  for (let i = 0; i < 4; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = shade(base, 0.28);
    x.fillRect(px, py, 1, 2);
    x.fillStyle = shade(base, -0.22);
    x.fillRect(px + 1, py + 1, 1, 1);
  }
  if (rnd() < 0.10) { // flor
    const px = ox + (rnd() * 14 | 0), py = oy + (rnd() * 14 | 0);
    x.fillStyle = rnd() < 0.5 ? '#e8d24a' : '#d86a72';
    x.fillRect(px, py, 1, 1);
  }
}

function tileWater(x, ox, oy, rnd, tx, ty) {
  x.fillStyle = '#2f6ba8'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 10; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#356fae' : '#2a619c';
    x.fillRect(px, py, 2 + (rnd() * 2 | 0), 1);
  }
  // ondinhas
  x.fillStyle = '#6ba7d8';
  const off = ((tx * 3 + ty * 5) % 8);
  for (let r = 0; r < 4; r++) {
    const py = oy + 2 + r * 4, px = ox + ((off + r * 4) % 12);
    x.fillRect(px, py, 3, 1); x.fillRect(px + 4, py, 2, 1);
  }
  x.fillStyle = '#9fd0f0';
  x.fillRect(ox + ((off * 2) % 13), oy + 6, 2, 1);
}

function tilePlaza(x, ox, oy, rnd) {
  x.fillStyle = '#c2bda6'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 12; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#b6b19a' : '#cdc8b1';
    x.fillRect(px, py, 1, 1);
  }
  x.fillStyle = '#a49f8a';
  x.fillRect(ox + 7, oy, 1, 16); x.fillRect(ox, oy + 7, 1, 16);
  x.fillRect(ox + 3, oy + 3, 1, 1); x.fillRect(ox + 11, oy + 11, 1, 1);
}

function tileLot(x, ox, oy, rnd) { // asfalto de estacionamento
  x.fillStyle = '#43464e'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 20; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#3b3e46' : '#4e525b';
    x.fillRect(px, py, 1, 1);
  }
}

function tileSand(x, ox, oy, rnd) {
  x.fillStyle = '#d6c290'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 22; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#c9b483' : '#e2d0a1';
    x.fillRect(px, py, 1, 1);
  }
}

function tileDirt(x, ox, oy, rnd) {
  x.fillStyle = '#8a7654'; x.fillRect(ox, oy, 16, 16);
  for (let i = 0; i < 26; i++) {
    const px = ox + (rnd() * 16 | 0), py = oy + (rnd() * 16 | 0);
    x.fillStyle = rnd() < 0.5 ? '#7c6a4b' : '#96825d';
    x.fillRect(px, py, 1, 1);
  }
  if (rnd() < 0.3) {
    x.fillStyle = '#6f5f43';
    x.fillRect(ox + (rnd() * 12 | 0), oy + (rnd() * 12 | 0), 2 + (rnd() * 3 | 0), 2);
  }
}

/* ============================================================
   EDIFICIOS  (desenho pseudo-3D com sombra projetada)
   ============================================================ */
const ROOF_PAL = ['#8f5a48', '#6f7480', '#7d6b4e', '#4f6f6c', '#8d7c58',
  '#5d5f6e', '#96614c', '#6a5f7a', '#4f6a86', '#83654a'];

function drawBuilding(x, bx, by, bw, bh, ext, roofCol, rnd, kind) {
  const wall = shade(roofCol, -0.42);
  const wall2 = shade(roofCol, -0.60);

  // sombra no chao
  x.fillStyle = 'rgba(10,8,14,0.34)';
  x.fillRect(bx + ext, by + ext, bw, bh);

  // paredes (faces sul e leste)
  x.fillStyle = wall; x.fillRect(bx, by + bh, bw, ext);
  x.fillRect(bx + 2, by + bh + ext, bw - 4, 1);
  x.fillStyle = wall2; x.fillRect(bx + bw, by, ext, bh + ext);

  // telhado
  x.fillStyle = roofCol; x.fillRect(bx, by, bw, bh);
  // bisel
  x.fillStyle = shade(roofCol, 0.24); x.fillRect(bx, by, bw, 1); x.fillRect(bx, by, 1, bh);
  x.fillStyle = shade(roofCol, -0.30); x.fillRect(bx, by + bh - 1, bw, 1); x.fillRect(bx + bw - 1, by, 1, bh);

  // textura do telhado
  const t = shade(roofCol, -0.14);
  x.fillStyle = t;
  if (rnd() < 0.5) { // faixas
    for (let i = 2; i < bh - 1; i += 4) x.fillRect(bx + 1, by + i, bw - 2, 1);
  } else { // xadrez
    for (let i = 1; i < bh - 1; i += 4) for (let j = 1; j < bw - 1; j += 4) x.fillRect(bx + j, by + i, 2, 2);
  }
  for (let i = 0; i < (bw * bh) / 40; i++) {
    x.fillStyle = rnd() < 0.5 ? shade(roofCol, -0.20) : shade(roofCol, 0.10);
    x.fillRect(bx + 1 + (rnd() * (bw - 2) | 0), by + 1 + (rnd() * (bh - 2) | 0), 1, 1);
  }

  // detalhes de telhado
  const n = 1 + (rnd() * 3 | 0);
  for (let i = 0; i < n; i++) {
    const dw = 3 + (rnd() * 5 | 0), dh = 3 + (rnd() * 4 | 0);
    const dx = bx + 2 + (rnd() * Math.max(1, bw - dw - 4) | 0);
    const dy = by + 2 + (rnd() * Math.max(1, bh - dh - 4) | 0);
    const kind2 = rnd();
    if (kind2 < 0.34) { // ar condicionado
      x.fillStyle = 'rgba(10,8,14,0.30)'; x.fillRect(dx + 1, dy + dh, dw, 1);
      x.fillStyle = '#9aa0a8'; x.fillRect(dx, dy, dw, dh);
      x.fillStyle = '#c3c8cf'; x.fillRect(dx, dy, dw, 1);
      x.fillStyle = '#6c7078'; x.fillRect(dx, dy + dh - 1, dw, 1);
      x.fillStyle = '#5c626b'; x.fillRect(dx + 1, dy + 1, dw - 2, dh - 2);
      x.fillStyle = '#868c95'; x.fillRect(dx + 1 + ((dw - 2) >> 1), dy + 1, 1, dh - 2);
    } else if (kind2 < 0.6) { // claraboia
      x.fillStyle = '#5c626b'; x.fillRect(dx, dy, dw, dh);
      x.fillStyle = '#8fd6ef'; x.fillRect(dx + 1, dy + 1, dw - 2, dh - 2);
      x.fillStyle = '#cfeeff'; x.fillRect(dx + 1, dy + 1, dw - 2, 1);
    } else if (kind2 < 0.8) { // piscina
      x.fillStyle = '#c9c4b4'; x.fillRect(dx - 1, dy - 1, dw + 2, dh + 2);
      x.fillStyle = '#2f8fc0'; x.fillRect(dx, dy, dw, dh);
      x.fillStyle = '#6dc0e0'; x.fillRect(dx, dy, dw, 1);
      x.fillStyle = '#a8dcf0'; x.fillRect(dx + 1, dy + 1 + (rnd() * 2 | 0), 2, 1);
    } else { // casinha de maquinas / escada
      x.fillStyle = 'rgba(10,8,14,0.30)'; x.fillRect(dx + 1, dy + dh, dw, 1);
      x.fillStyle = shade(roofCol, -0.25); x.fillRect(dx, dy, dw, dh);
      x.fillStyle = shade(roofCol, 0.15); x.fillRect(dx, dy, dw, 1);
      x.fillStyle = '#2a2a30'; x.fillRect(dx + 1, dy + 1, dw - 2, 2);
    }
  }
  // heliponto
  if (kind === 'helipad' && bw > 30 && bh > 30) {
    const cx = bx + (bw >> 1), cy = by + (bh >> 1), r = 7;
    x.fillStyle = 'rgba(10,8,14,0.25)';
    for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++)
      if (a * a + b * b <= r * r) x.fillRect(cx + a, cy + b, 1, 1);
    x.fillStyle = '#d8d4c6';
    for (let a = -r + 1; a <= r - 1; a++) for (let b = -r + 1; b <= r - 1; b++)
      if (a * a + b * b <= (r - 1) * (r - 1)) x.fillRect(cx + a, cy + b, 1, 1);
    x.fillStyle = '#b9b5a6';
    x.fillRect(cx - 3, cy - 1, 2, 3); x.fillRect(cx + 2, cy - 1, 2, 3); x.fillRect(cx - 1, cy, 3, 1);
  }
  // antena
  if (rnd() < 0.25) {
    const ax = bx + 2 + (rnd() * Math.max(1, bw - 4) | 0), ay = by + 2 + (rnd() * Math.max(1, bh - 4) | 0);
    x.fillStyle = '#8c8f96'; x.fillRect(ax, ay, 1, 6);
    x.fillStyle = '#e0564a';
    for (let i = 0; i < 4; i++) if ((Math.round(ay) + i) % 4 === 0) x.fillRect(ax, ay + i, 1, 1);
  }
}

/* ============================================================
   PROPS  (arvores, postes, fontes...)  -> {c, ax, ay, r}
   ============================================================ */
function spritePalm(rnd) {
  const S = 34; const o = mk(S, S); const x = o.x; const c = S >> 1;
  // sombra
  x.fillStyle = 'rgba(10,20,10,0.28)';
  for (let a = -9; a <= 9; a++) for (let b = -5; b <= 5; b++)
    if ((a * a) / 81 + (b * b) / 25 <= 1) x.fillRect(c + a + 2, c + b + 3, 1, 1);
  // folhas (visao de cima)
  const leaf = ['#2f7a3a', '#3d8f45', '#4da854'];
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * TAU + rnd() * 0.25;
    const L = 7 + rnd() * 4;
    for (let t = 0; t < L; t++) {
      const px = Math.round(c + Math.cos(a) * t), py = Math.round(c + Math.sin(a) * t * 0.85);
      x.fillStyle = t > L - 2 ? leaf[0] : (t % 3 === 0 ? leaf[2] : leaf[1]);
      x.fillRect(px, py, 1, 1);
      if (t > 2) { x.fillRect(px, py + 1, 1, 1); x.fillStyle = shade(leaf[1], -0.25); x.fillRect(px, py + 2, 1, 1); }
    }
  }
  // tronco / centro
  x.fillStyle = '#6b5334'; x.fillRect(c - 1, c - 1, 3, 3);
  x.fillStyle = '#8a6b42'; x.fillRect(c - 1, c - 1, 2, 2);
  x.fillStyle = '#4e7a34'; x.fillRect(c - 1, c - 2, 1, 1); x.fillRect(c + 1, c, 1, 1);
  return { c: o.c, ax: c, ay: c + 4, r: 5 };
}

function spriteBush(rnd) {
  const S = 22; const o = mk(S, S); const x = o.x; const c = S >> 1;
  x.fillStyle = 'rgba(10,20,10,0.26)';
  for (let a = -6; a <= 6; a++) for (let b = -3; b <= 3; b++)
    if ((a * a) / 36 + (b * b) / 9 <= 1) x.fillRect(c + a + 1, c + b + 2, 1, 1);
  const g = ['#3a7a3c', '#4c9048', '#5aa854'];
  for (let a = -6; a <= 6; a++) for (let b = -5; b <= 5; b++) {
    const d = (a * a) / 40 + (b * b) / 30;
    if (d <= 1) {
      x.fillStyle = d < 0.35 ? g[2] : (d < 0.75 ? g[1] : g[0]);
      if (rnd() < 0.9) x.fillRect(c + a, c + b, 1, 1);
    }
  }
  x.fillStyle = '#2c6430';
  for (let a = -6; a <= 6; a++) for (let b = -5; b <= 5; b++)
    if ((a * a) / 40 + (b * b) / 30 > 0.86 && (a * a) / 40 + (b * b) / 30 <= 1) x.fillRect(c + a, c + b, 1, 1);
  return { c: o.c, ax: c, ay: c + 3, r: 4 };
}

function spriteLamp(rnd) {
  const S = 26; const o = mk(S, S); const x = o.x;
  const c = S >> 1, base = S - 4;
  x.fillStyle = 'rgba(10,10,20,0.30)';
  x.fillRect(c - 3, base - 1, 8, 3);
  // braco + poste
  x.fillStyle = '#4a4d55'; x.fillRect(c - 1, c - 6, 2, base - c + 6);
  x.fillStyle = '#666a74'; x.fillRect(c - 1, c - 6, 1, base - c + 6);
  x.fillStyle = '#4a4d55'; x.fillRect(c - 1, c - 7, 6, 2);
  x.fillStyle = '#666a74'; x.fillRect(c - 1, c - 7, 6, 1);
  // luminaria
  x.fillStyle = '#33363e'; x.fillRect(c + 3, c - 7, 5, 3);
  x.fillStyle = '#f5e39a'; x.fillRect(c + 4, c - 6, 3, 1);
  // base
  x.fillStyle = '#3a3d45'; x.fillRect(c - 2, base - 2, 4, 2);
  // pool de luz no chao
  x.fillStyle = 'rgba(245,225,150,0.10)';
  for (let a = -7; a <= 7; a++) for (let b = -4; b <= 4; b++)
    if ((a * a) / 49 + (b * b) / 16 <= 1) x.fillRect(c + a, base + b - 2, 1, 1);
  return { c: o.c, ax: c, ay: base, r: 0 };
}

function spriteFountain(rnd) {
  const S = 52; const o = mk(S, S); const x = o.x; const c = S >> 1;
  // borda de pedra
  x.fillStyle = 'rgba(10,8,14,0.30)';
  for (let a = -23; a <= 23; a++) for (let b = -23; b <= 23; b++) {
    const d = a * a + b * b; if (d <= 23 * 23 && d > 21 * 21) x.fillRect(c + a + 2, c + b + 3, 1, 1);
  }
  for (let a = -23; a <= 23; a++) for (let b = -23; b <= 23; b++) {
    const d = a * a + b * b;
    if (d <= 23 * 23) {
      if (d > 19 * 19) x.fillStyle = (a + b) % 7 === 0 ? '#b0a98f' : '#c6bf9f';
      else if (d > 17 * 17) x.fillStyle = '#8e8871';
      else x.fillStyle = '#2f78b4';
      x.fillRect(c + a, c + b, 1, 1);
    }
  }
  // agua com ondas
  for (let i = 0; i < 90; i++) {
    const a = (rnd() * 2 - 1) * 16, b = (rnd() * 2 - 1) * 16;
    if (a * a + b * b < 16 * 16) { x.fillStyle = rnd() < 0.5 ? '#3f8cc4' : '#62b0dc'; x.fillRect(c + Math.round(a), c + Math.round(b), 1 + (rnd() * 2 | 0), 1); }
  }
  // jato central
  x.fillStyle = '#6f6a58'; x.fillRect(c - 2, c - 1, 5, 3);
  x.fillStyle = '#9ad0ee';
  for (let i = 0; i < 10; i++) {
    const a = rnd() * TAU, r = 3 + rnd() * 8;
    x.fillRect(c + Math.round(Math.cos(a) * r), c + Math.round(Math.sin(a) * r * 0.8), 1, 1);
  }
  x.fillStyle = '#e2f4ff'; x.fillRect(c - 1, c - 1, 2, 2);
  return { c: o.c, ax: c, ay: c + 20, r: 0, flat: true };
}

function spriteHydrant(rnd) {
  const o = mk(10, 12); const x = o.x;
  x.fillStyle = 'rgba(10,8,14,0.30)'; x.fillRect(2, 9, 6, 2);
  x.fillStyle = '#b8402f'; x.fillRect(2, 2, 5, 7);
  x.fillStyle = '#8f2f22'; x.fillRect(2, 8, 5, 1);
  x.fillStyle = '#d9604a'; x.fillRect(2, 2, 1, 7);
  x.fillStyle = '#7a2618'; x.fillRect(1, 4, 1, 3); x.fillRect(7, 4, 1, 3);
  x.fillStyle = '#e8e2cf'; x.fillRect(2, 1, 5, 1);
  return { c: o.c, ax: 4, ay: 10, r: 0 };
}

function spriteTrash(rnd) {
  const o = mk(12, 14); const x = o.x;
  x.fillStyle = 'rgba(10,8,14,0.30)'; x.fillRect(2, 11, 8, 2);
  x.fillStyle = '#4a524f'; x.fillRect(2, 3, 8, 9);
  x.fillStyle = '#5d6763'; x.fillRect(2, 3, 2, 9);
  x.fillStyle = '#333a38'; x.fillRect(7, 3, 3, 9);
  x.fillStyle = '#6f7a76'; x.fillRect(1, 2, 10, 2);
  x.fillStyle = '#2b312f'; x.fillRect(3, 6, 6, 1);
  return { c: o.c, ax: 6, ay: 12, r: 0 };
}

function spriteBench(rnd) {
  const o = mk(22, 14); const x = o.x;
  x.fillStyle = 'rgba(10,8,14,0.28)'; x.fillRect(3, 11, 16, 2);
  x.fillStyle = '#8a6a42'; x.fillRect(2, 4, 18, 6);
  x.fillStyle = '#a07c4e'; x.fillRect(2, 4, 18, 2);
  x.fillStyle = '#6d5333'; x.fillRect(2, 8, 18, 2);
  x.fillStyle = '#5a5f63'; x.fillRect(2, 10, 2, 2); x.fillRect(18, 10, 2, 2);
  return { c: o.c, ax: 11, ay: 12, r: 0 };
}

function spriteCone(rnd) {
  const o = mk(10, 12); const x = o.x;
  x.fillStyle = 'rgba(10,8,14,0.28)'; x.fillRect(2, 9, 6, 2);
  x.fillStyle = '#e07a28'; x.fillRect(4, 3, 2, 6); x.fillRect(3, 8, 4, 2);
  x.fillStyle = '#f2f0e6'; x.fillRect(3, 5, 4, 2);
  x.fillStyle = '#b85c19'; x.fillRect(3, 8, 4, 1);
  return { c: o.c, ax: 5, ay: 10, r: 0 };
}

/* ============================================================
   CARROS  —  sprites rotacionados (32 angulos)
   ============================================================ */
const CAR_MODELS = [
  { id: 'sedan', w: 11, h: 22, top: 205, accel: 150, grip: 1.00, mass: 1.0, seats: 4 },
  { id: 'sports', w: 10, h: 20, top: 268, accel: 215, grip: 1.18, mass: 0.85, seats: 2 },
  { id: 'van', w: 13, h: 26, top: 168, accel: 108, grip: 0.88, mass: 1.4, seats: 4 },
  { id: 'pickup', w: 12, h: 25, top: 186, accel: 132, grip: 0.94, mass: 1.25, seats: 2 },
  { id: 'police', w: 11, h: 22, top: 245, accel: 195, grip: 1.12, mass: 1.05, seats: 4 },
  { id: 'taxi', w: 11, h: 22, top: 208, accel: 158, grip: 1.02, mass: 1.0, seats: 4 },
  { id: 'truck', w: 14, h: 30, top: 150, accel: 84, grip: 0.80, mass: 1.9, seats: 2 }
];

const CAR_COLORS = [
  ['#c94f3d', '#8e3527'], ['#3f6fa8', '#2c4f79'], ['#d8d2c0', '#a8a396'],
  ['#3f8f6a', '#2c6650'], ['#c9a227', '#8e7118'], ['#2f3238', '#1e2025'],
  ['#8f5fb0', '#65407e'], ['#d87b3a', '#a3562a'], ['#7a8fa0', '#55666f'],
  ['#b8452f', '#822f20'], ['#e0e4e8', '#adb2b8'], ['#4f8fbf', '#35678c']
];

const A32 = 32;

function drawCarBody(x, m, body, roofCol, opt) {
  const w = m.w, h = m.h;
  const dark = shade(body, -0.5), light = shade(body, 0.22);
  const WIN = '#79c6e8', WIN2 = '#4f97bd', WINL = '#b6e4f7';

  // pneus
  x.fillStyle = '#141519';
  x.fillRect(-2, 4, 2, 6); x.fillRect(w, 4, 2, 6);
  x.fillRect(-2, h - 10, 2, 6); x.fillRect(w, h - 10, 2, 6);
  x.fillStyle = '#2a2c33';
  x.fillRect(-2, 6, 1, 2); x.fillRect(w + 1, 6, 1, 2);
  x.fillRect(-2, h - 8, 1, 2); x.fillRect(w + 1, h - 8, 1, 2);

  // silhueta (contorno)
  x.fillStyle = '#08080c';
  x.fillRect(0, 1, w, h - 2); x.fillRect(1, 0, w - 2, h);
  // carroceria
  x.fillStyle = body;
  x.fillRect(1, 1, w - 2, h - 2);
  // bisel
  x.fillStyle = light; x.fillRect(1, 1, w - 2, 1); x.fillRect(1, 1, 1, h - 2);
  x.fillStyle = dark; x.fillRect(1, h - 2, w - 2, 1); x.fillRect(w - 2, 1, 1, h - 2);

  const glass = (X, Y, W, H, c) => { x.fillStyle = c; x.fillRect(X, Y, W, H); };
  const roof = (X, Y, W, H) => {
    x.fillStyle = '#08080c'; x.fillRect(X - 1, Y - 1, W + 2, H + 2);
    x.fillStyle = roofCol; x.fillRect(X, Y, W, H);
    x.fillStyle = shade(roofCol, 0.22); x.fillRect(X, Y, W, 1);
    x.fillStyle = shade(roofCol, -0.30); x.fillRect(X, Y + H - 1, W, 1);
  };

  // faixas laterais claras/escuras
  x.fillStyle = shade(body, 0.10); x.fillRect(1, 2, 1, h - 4);
  x.fillStyle = shade(body, -0.22); x.fillRect(w - 2, 2, 1, h - 4);

  switch (m.id) {
    case 'sedan': case 'taxi': case 'police': {
      // capo
      x.fillStyle = shade(body, 0.12); x.fillRect(2, 2, w - 4, 3);
      x.fillStyle = shade(body, -0.16); x.fillRect(2, 4, w - 4, 1);
      // para-brisa
      glass(3, 6, w - 6, 1, WIN2); glass(2, 7, w - 4, 2, WIN);
      glass(2, 7, 1, 1, WINL);
      // teto
      roof(2, 9, w - 4, 6);
      // vigia traseira
      glass(2, 15, w - 4, 2, WIN); glass(3, 16, w - 6, 1, WIN2);
      // porta-malas
      x.fillStyle = shade(body, -0.10); x.fillRect(2, 17, w - 4, 3);
      x.fillStyle = shade(body, 0.14); x.fillRect(2, 19, w - 4, 1);
      break;
    }
    case 'sports': {
      x.fillStyle = shade(body, 0.16); x.fillRect(2, 2, w - 4, 4);
      x.fillStyle = shade(body, -0.20); x.fillRect(2, 5, w - 4, 1);
      glass(3, 6, w - 6, 1, WIN2); glass(2, 7, w - 4, 2, WIN);
      roof(2, 9, w - 4, 4);
      glass(2, 13, w - 4, 2, WIN);
      x.fillStyle = shade(body, -0.10); x.fillRect(2, 15, w - 4, 3);
      // aerofolio
      x.fillStyle = '#1c1e24'; x.fillRect(1, 18, w - 2, 2);
      break;
    }
    case 'van': {
      x.fillStyle = shade(body, 0.12); x.fillRect(2, 2, w - 4, 2);
      glass(2, 4, w - 4, 3, WIN); glass(2, 4, 2, 1, WINL);
      roof(2, 7, w - 4, 15);
      // portas traseiras
      x.fillStyle = shade(roofCol, -0.16); x.fillRect(2, 22, w - 4, 3);
      x.fillStyle = '#08080c'; x.fillRect((w >> 1) - 1, 22, 1, 3);
      x.fillStyle = shade(roofCol, 0.16); x.fillRect(2, 22, w - 4, 1);
      break;
    }
    case 'pickup': {
      x.fillStyle = shade(body, 0.12); x.fillRect(2, 2, w - 4, 3);
      glass(3, 5, w - 6, 1, WIN2); glass(2, 6, w - 4, 2, WIN);
      roof(2, 8, w - 4, 5);
      glass(2, 13, w - 4, 2, WIN);
      // caçamba
      x.fillStyle = shade(body, -0.35); x.fillRect(2, 15, w - 4, 8);
      x.fillStyle = shade(body, -0.18); x.fillRect(2, 15, w - 4, 1);
      x.fillStyle = shade(body, -0.50); x.fillRect(3, 16, w - 6, 6);
      x.fillStyle = shade(body, -0.25); x.fillRect(2, 22, w - 4, 1);
      break;
    }
    case 'truck': {
      x.fillStyle = shade(body, 0.12); x.fillRect(2, 2, w - 4, 2);
      glass(2, 4, w - 4, 3, WIN);
      roof(2, 7, w - 4, 6);
      // baú
      x.fillStyle = '#c9c4b4'; x.fillRect(1, 13, w - 2, 15);
      x.fillStyle = '#ded9c9'; x.fillRect(1, 13, w - 2, 1); x.fillRect(1, 13, 1, 15);
      x.fillStyle = '#a49f8f'; x.fillRect(1, 27, w - 2, 1); x.fillRect(w - 2, 13, 1, 15);
      x.fillStyle = '#8e8a7c'; x.fillRect(3, 16, w - 6, 1); x.fillRect(3, 22, w - 6, 1);
      x.fillStyle = '#6f7a86'; x.fillRect((w >> 1) - 3, 18, 6, 3);
      break;
    }
  }

  // farois
  x.fillStyle = '#ffeaa8'; x.fillRect(1, 1, 2, 1); x.fillRect(w - 3, 1, 2, 1);
  // lanternas
  x.fillStyle = '#e8503f'; x.fillRect(1, h - 2, 2, 1); x.fillRect(w - 3, h - 2, 2, 1);
  // retrovisores
  x.fillStyle = '#1a1c22';
  x.fillRect(-1, 7, 1, 2); x.fillRect(w, 7, 1, 2);

  if (m.id === 'taxi') {
    // faixa xadrez
    for (let i = 1; i < w - 1; i += 2) {
      x.fillStyle = (i % 4 === 1) ? '#1c1c20' : '#f2ede0';
      x.fillRect(i, 11, 1, 2);
    }
    // letreiro
    x.fillStyle = '#f2c235'; x.fillRect((w >> 1) - 2, 9, 4, 3);
    x.fillStyle = '#1c1c20'; x.fillRect((w >> 1) - 1, 10, 2, 1);
  }
  if (m.id === 'police') {
    // faixa azul/branca
    x.fillStyle = '#f2f2ee'; x.fillRect(1, 11, w - 2, 2);
    x.fillStyle = '#1e3f8f'; x.fillRect(1, 13, w - 2, 2);
    // barra de luzes (pisca no render)
    x.fillStyle = '#20222a'; x.fillRect((w >> 1) - 4, 8, 8, 3);
    x.fillStyle = '#c0392b'; x.fillRect((w >> 1) - 3, 9, 3, 1);
    x.fillStyle = '#2f6fd0'; x.fillRect((w >> 1) + 1, 9, 3, 1);
  }
  if (opt && opt.stripe) {
    x.fillStyle = opt.stripe;
    x.fillRect((w >> 1) - 1, 2, 2, h - 4);
  }
}

function makeCarType(m, body, roofCol, name, opt) {
  const S = Math.ceil(Math.hypot(m.w, m.h) / 2) * 2 + 8;   // par = giro perfeito
  const base = mk(S, S);
  const bx = base.x;
  bx.save();
  bx.translate(S / 2 - m.w / 2, S / 2 - m.h / 2);
  drawCarBody(bx, m, body, roofCol, opt);
  bx.restore();

  const rot = [];
  for (let i = 0; i < A32; i++) {
    const o = mk(S, S); const x = o.x;
    x.imageSmoothingEnabled = false;
    x.translate(S / 2, S / 2);
    x.rotate((i / A32) * TAU + Math.PI / 2); // sprite aponta para norte => +90o
    x.drawImage(base.c, -S / 2, -S / 2);
    rot.push(o.c);
  }
  const t = Object.assign({}, m);
  t.name = name; t.body = body; t.roof = roofCol; t.rot = rot; t.S = S;
  t.wreck = null;
  return t;
}

let CARS = [];
function buildCarTypes() {
  CARS = [];
  const rnd = mkrand(7331);
  const add = (id, body, roofC, name, opt) => {
    const m = CAR_MODELS.find(mm => mm.id === id);
    CARS.push(makeCarType(m, body, roofC || shade(body, -0.18), name, opt));
  };
  add('sedan', '#c94f3d', null, 'Kuruma');
  add('sedan', '#3f6fa8', null, 'Sentinel');
  add('sedan', '#d8d2c0', null, 'Perenial');
  add('sedan', '#2f3238', null, 'Stallion');
  add('sedan', '#3f8f6a', null, 'Greenwood');
  add('sports', '#c9a227', null, 'Cheetah');
  add('sports', '#b8452f', null, 'Infernus');
  add('sports', '#7a8fa0', null, 'Zebra');
  add('van', '#d8d2c0', null, 'Pony');
  add('van', '#4f8fbf', null, 'Rumpo');
  add('van', '#c9a227', '#8e7118', 'Bus');
  add('pickup', '#3f8f6a', null, 'Bobcat');
  add('pickup', '#d87b3a', null, 'Yankee');
  add('truck', '#8f5fb0', '#c9c4b4', 'Barracks');
  add('truck', '#e0e4e8', '#c9c4b4', 'Boxville');
  add('taxi', '#e8c22c', null, 'Taxi');
  add('police', '#f0f0ec', '#d8d8d2', 'Police');
  return CARS;
}

function wreckSprite(type) {
  if (type.wreck) return type.wreck;
  const S = type.S;
  const o = mk(S, S); const x = o.x;
  // versao queimada: usa o sprite de frente + sujeira
  const base = mk(S, S);
  const bx = base.x;
  bx.save();
  bx.translate(S / 2 - type.w / 2, S / 2 - type.h / 2);
  drawCarBody(bx, type, '#2a2622', '#221f1c', null);
  bx.restore();
  const rot = [];
  for (let i = 0; i < A32; i++) {
    const oo = mk(S, S); const xx = oo.x;
    xx.imageSmoothingEnabled = false;
    xx.translate(S / 2, S / 2); xx.rotate((i / A32) * TAU + Math.PI / 2);
    xx.drawImage(base.c, -S / 2, -S / 2);
    // fuligem
    xx.globalCompositeOperation = 'source-atop';
    xx.fillStyle = 'rgba(24,20,18,0.55)';
    xx.fillRect(-S / 2, -S / 2, S, S);
    const r = mkrand(99 + i);
    xx.fillStyle = 'rgba(10,8,8,0.6)';
    for (let k = 0; k < 40; k++) xx.fillRect(-S / 2 + (r() * S | 0), -S / 2 + (r() * S | 0), 1, 1);
    xx.globalCompositeOperation = 'source-over';
    rot.push(oo.c);
  }
  type.wreck = rot;
  return rot;
}

/* ============================================================
   PEDESTRES  —  sprites 11x14 em 4 direcoes x 3 quadros
   ============================================================ */
const PED_ART = {
  down: [
    ["...hhhhh...", "..hhhhhhh..", "..hsssssh..", "..hsksksh..", "..hsssssh..",
      "...sssss...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "...pp.pp...", "...oo.oo..."],
    ["...hhhhh...", "..hhhhhhh..", "..hsssssh..", "..hsksksh..", "..hsssssh..",
      "...sssss...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "..pp...pp..", "..oo...oo.."],
    ["...hhhhh...", "..hhhhhhh..", "..hsssssh..", "..hsksksh..", "..hsssssh..",
      "...sssss...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "....ppp....", "....ooo...."]
  ],
  up: [
    ["...hhhhh...", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..",
      "...hhhhh...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "...pp.pp...", "...oo.oo..."],
    ["...hhhhh...", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..",
      "...hhhhh...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "..pp...pp..", "..oo...oo.."],
    ["...hhhhh...", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..", "..hhhhhhh..",
      "...hhhhh...", "....sss....", "..ccccccc..", ".ccccccccc.", "scccccccccs",
      "scccccccccs", ".scccccccs.", "....ppp....", "....ooo...."]
  ],
  right: [
    ["....hhhhh..", "...hhhhhhh.", "...hsssssh.", "...hsskssh.", "...hsssssh.",
      "....sssss..", ".....sss...", "...cccccc..", "..cccccccc.", "..sccccccs.",
      "..sccccccs.", "...cccccc..", "...pp.pp...", "...oo.oo..."],
    ["....hhhhh..", "...hhhhhhh.", "...hsssssh.", "...hsskssh.", "...hsssssh.",
      "....sssss..", ".....sss...", "...cccccc..", "..cccccccc.", "..sccccccs.",
      "..sccccccs.", "...cccccc..", "..pp...pp..", "..oo...oo.."],
    ["....hhhhh..", "...hhhhhhh.", "...hsssssh.", "...hsskssh.", "...hsssssh.",
      "....sssss..", ".....sss...", "...cccccc..", "..cccccccc.", "..sccccccs.",
      "..sccccccs.", "...cccccc..", "....ppp....", "....ooo...."]
  ]
};

const SKINS = ['#f5cda3', '#e0ae7c', '#c08a58', '#96633c', '#6d4728', '#4a2f1c'];
const HAIRS = ['#2a1f16', '#4a3220', '#7a5230', '#c9a227', '#17171c', '#9a9a9a', '#a8402a', '#5a3a5a'];
const SHIRTS = ['#c9493d', '#3f6fa8', '#e0dccb', '#3f8f6a', '#c9a227', '#7a5fa8',
  '#d87b3a', '#2f3238', '#8fa03f', '#c25f8f', '#4f8fbf', '#6f6f76'];
const PANTS = ['#2f3a52', '#1f232b', '#4a3a2a', '#3a4a3a', '#5a5a62', '#2a2f3a'];

function renderPedArt(rows, pal) {
  const W = rows[0].length, H = rows.length;
  const o = mk(W, H); const x = o.x;
  for (let j = 0; j < H; j++) {
    const row = rows[j];
    for (let i = 0; i < W; i++) {
      const ch = row[i];
      if (ch === '.') continue;
      let col = '#000';
      switch (ch) {
        case 'k': col = '#1b1b23'; break;
        case 's': col = pal.skin; break;
        case 'S': col = shade(pal.skin, -0.20); break;
        case 'h': col = pal.hair; break;
        case 'H': col = shade(pal.hair, -0.28); break;
        case 'c': col = pal.shirt; break;
        case 'C': col = shade(pal.shirt, -0.24); break;
        case 'p': col = pal.pants; break;
        case 'P': col = shade(pal.pants, -0.25); break;
        case 'o': col = '#26262e'; break;
        case 'w': col = '#f2f2ee'; break;
      }
      x.fillStyle = col; x.fillRect(i, j, 1, 1);
    }
  }
  return o.c;
}

function mirrorSprite(src) {
  const o = mk(src.width, src.height); const x = o.x;
  x.translate(src.width, 0); x.scale(-1, 1);
  x.drawImage(src, 0, 0);
  return o.c;
}

let PEDS = [];   // PEDS[paleta] = { dirs: [ [f0,f1,f2] x4 ] }
let PED_PALS = [];
function buildPedSprites() {
  const rnd = mkrand(4242);
  PEDS = []; PED_PALS = [];
  const n = 16;
  for (let p = 0; p < n; p++) {
    const pal = {
      skin: SKINS[(rnd() * SKINS.length) | 0],
      hair: HAIRS[(rnd() * HAIRS.length) | 0],
      shirt: SHIRTS[(rnd() * SHIRTS.length) | 0],
      pants: PANTS[(rnd() * PANTS.length) | 0]
    };
    PED_PALS.push(pal);
    const dirs = [];
    for (let d = 0; d < 4; d++) {
      let rows;
      if (d === 0) rows = PED_ART.down;
      else if (d === 1) rows = PED_ART.up;
      else rows = PED_ART.right;
      const frames = rows.map(r => renderPedArt(r, pal));
      if (d === 3) { // esquerda = espelho da direita
        const m = frames.map(f => mirrorSprite(f));
        dirs.push(m);
      } else dirs.push(frames);
    }
    PEDS.push({ dirs: dirs, pal: pal });
  }

  /* paleta exclusiva do jogador (jaqueta + bone vermelho) */
  const ppal = { skin: '#e0ae7c', hair: '#c1402f', shirt: '#39456b', pants: '#25262e' };
  PED_PALS.push(ppal);
  const pdirs = [];
  for (let d = 0; d < 4; d++) {
    let rows;
    if (d === 0) rows = PED_ART.down;
    else if (d === 1) rows = PED_ART.up;
    else rows = PED_ART.right;
    let frames = rows.map(r => renderPedArt(r, ppal));
    if (d === 3) frames = frames.map(f => mirrorSprite(f));
    pdirs.push(frames);
  }
  PEDS.push({ dirs: pdirs, pal: ppal });
  return PEDS;
}

/* ============================================================
   SOMBRA  (desenhada separada para nao girar com o sprite)
   ============================================================ */
function shadowBlob(x, px, py, rx, ry, a) {
  x.fillStyle = 'rgba(8,6,12,' + a + ')';
  x.beginPath();
  x.ellipse(px, py + 2, rx, ry, 0, 0, TAU);
  x.fill();
}
