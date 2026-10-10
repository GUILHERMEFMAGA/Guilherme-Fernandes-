/* ============================================================
   PIXEL CRIME CITY  —  world.js
   Geracao da cidade em tiles, "bake" do chao e minimapa.
   ============================================================ */

const T_ROAD = 0, T_SIDE = 1, T_BLD = 2, T_GRASS = 3, T_WATER = 4,
  T_PLAZA = 5, T_SAND = 6, T_LOT = 7, T_DIRT = 8;

const BLOCK_STARTS = [4, 14, 24, 34, 44, 54, 64, 74, 84, 94];
const BLOCK_ENDS = [11, 21, 31, 41, 51, 61, 71, 81, 91, 99];

const DIRV = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // 0=L 1=S 2=O 3=N

function corridorStart(i) {
  if (i >= 100) return 100;
  return 2 + 10 * Math.floor((i - 2) / 10);
}
function isRoadLine(i) {
  if (i === 100 || i === 101) return true;
  return i >= 2 && i <= 93 && (i % 10 === 2 || i % 10 === 3);
}

const World = {
  W: 104, H: 104,
  map: null, solid: null,
  buildings: [], props: [], lots: [], parks: [],
  roadTiles: [],
  ground: null, mini: null,
  propGrid: null, PCELL: 32,

  init(seed) {
    const W = this.W, H = this.H;
    const rnd = mkrand(seed || 12345);
    this.map = new Uint8Array(W * H);
    this.solid = new Uint8Array(W * H);
    this.buildings = []; this.props = []; this.lots = []; this.parks = [];
    this.roadTiles = [];

    const set = (tx, ty, v) => { this.map[ty * W + tx] = v; };

    /* ---- agua / areia na borda ---- */
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const edge = Math.min(x, y, W - 1 - x, H - 1 - y);
      if (edge === 0) set(x, y, T_WATER);
      else if (edge === 1) set(x, y, T_SAND);
    }

    /* ---- ruas ---- */
    for (let y = 2; y <= 101; y++) for (let x = 2; x <= 101; x++)
      if (isRoadLine(x) || isRoadLine(y)) set(x, y, T_ROAD);

    /* ---- quadras ---- */
    for (let by = 0; by < 10; by++) {
      for (let bx = 0; bx < 10; bx++) {
        const x0 = BLOCK_STARTS[bx], x1 = BLOCK_ENDS[bx];
        const y0 = BLOCK_STARTS[by], y1 = BLOCK_ENDS[by];
        const bw = x1 - x0 + 1, bh = y1 - y0 + 1;

        const r = rnd();
        let type = 'build';
        if (r < 0.13) type = 'park';
        else if (r < 0.25) type = 'lot';
        else if (r < 0.33) type = 'plaza';
        else if (r < 0.38) type = 'dirt';

        // calcada em volta
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
          if (x === x0 || y === y0 || x === x1 || y === y1) set(x, y, T_SIDE);
        }
        const ix0 = x0 + 1, iy0 = y0 + 1, iw = bw - 2, ih = bh - 2;

        if (type === 'build') {
          const split = rnd();
          if (split < 0.42 || iw < 5) {
            this.addBuilding(ix0, iy0, iw, ih, rnd);
          } else if (split < 0.8) {
            // dois predios com beco no meio (vertical)
            const half = (iw >> 1);
            this.addBuilding(ix0, iy0, half, ih, rnd);
            this.addBuilding(ix0 + half + 1, iy0, iw - half - 1, ih, rnd);
            for (let y = iy0; y < iy0 + ih; y++) set(ix0 + half, y, T_DIRT);
          } else {
            // quatro predios com beco em cruz
            const hx = (iw >> 1), hy = (ih >> 1);
            this.addBuilding(ix0, iy0, hx, hy, rnd);
            this.addBuilding(ix0 + hx + 1, iy0, iw - hx - 1, hy, rnd);
            this.addBuilding(ix0, iy0 + hy + 1, hx, ih - hy - 1, rnd);
            this.addBuilding(ix0 + hx + 1, iy0 + hy + 1, iw - hx - 1, ih - hy - 1, rnd);
            for (let y = iy0; y < iy0 + ih; y++) set(ix0 + hx, y, T_DIRT);
            for (let x = ix0; x < ix0 + iw; x++) set(x, iy0 + hy, T_DIRT);
          }
        } else if (type === 'park') {
          for (let y = iy0; y < iy0 + ih; y++) for (let x = ix0; x < ix0 + iw; x++) set(x, y, T_GRASS);
          // caminho em cruz
          const cx = ix0 + (iw >> 1), cy = iy0 + (ih >> 1);
          for (let x = ix0; x < ix0 + iw; x++) { set(x, cy, T_PLAZA); set(x, cy + 1, T_PLAZA); }
          for (let y = iy0; y < iy0 + ih; y++) { set(cx, y, T_PLAZA); set(cx + 1, y, T_PLAZA); }
          this.parks.push({ x: ix0, y: iy0, w: iw, h: ih, cx: cx, cy: cy });
        } else if (type === 'lot') {
          for (let y = iy0; y < iy0 + ih; y++) for (let x = ix0; x < ix0 + iw; x++) set(x, y, T_LOT);
          this.lots.push({ x: ix0, y: iy0, w: iw, h: ih });
        } else if (type === 'plaza') {
          for (let y = iy0; y < iy0 + ih; y++) for (let x = ix0; x < ix0 + iw; x++) set(x, y, T_PLAZA);
          // canteiro central
          const cx = ix0 + 1, cy = iy0 + 1, cw = iw - 2, ch = ih - 2;
          if (cw > 2 && ch > 2) {
            for (let y = cy; y < cy + ch; y++) for (let x = cx; x < cx + cw; x++) set(x, y, T_GRASS);
            this.parks.push({ x: cx, y: cy, w: cw, h: ch, cx: cx + (cw >> 1), cy: cy + (ch >> 1), small: true });
          }
        } else {
          for (let y = iy0; y < iy0 + ih; y++) for (let x = ix0; x < ix0 + iw; x++) set(x, y, T_DIRT);
          this.addBuilding(ix0 + 1, iy0 + 1, Math.max(1, iw - 3), Math.max(1, ih - 3), rnd, true);
        }
      }
    }

    /* ---- solido ---- */
    for (let i = 0; i < W * H; i++)
      this.solid[i] = (this.map[i] === T_BLD || this.map[i] === T_WATER) ? 1 : 0;

    /* ---- tiles de rua para spawn ---- */
    for (let y = 2; y <= 101; y++) for (let x = 2; x <= 101; x++) {
      if (this.map[y * W + x] === T_ROAD) this.roadTiles.push({ tx: x, ty: y });
    }

    this.placeProps(rnd);
    this.bake(seed);
    this.buildMinimap();
    this.buildPropGrid();
  },

  addBuilding(x, y, w, h, rnd, low) {
    if (w < 1 || h < 1) return;
    const ext = low ? 3 + (rnd() * 3 | 0) : 5 + (rnd() * 6 | 0);
    const col = ROOF_PAL[(rnd() * ROOF_PAL.length) | 0];
    const kind = (rnd() < 0.10) ? 'helipad' : 'normal';
    this.buildings.push({ tx: x, ty: y, w: w, h: h, ext: ext, col: col, kind: kind });
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.map[j * this.W + i] = T_BLD;
  },

  addProp(p) { this.props.push(p); },

  placeProps(rnd) {
    const T = TILE;
    /* postes nas esquinas das quadras */
    for (let by = 0; by < 10; by++) for (let bx = 0; bx < 10; bx++) {
      const x0 = BLOCK_STARTS[bx], x1 = BLOCK_ENDS[bx];
      const y0 = BLOCK_STARTS[by], y1 = BLOCK_ENDS[by];
      const corners = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
      for (const c of corners) {
        if (rnd() < 0.55) {
          this.addProp({
            type: 'lamp', sprite: spriteLamp(rnd),
            x: c[0] * T + 8 + (rnd() * 4 - 2), y: c[1] * T + 8 + (rnd() * 4 - 2), r: 0, flat: false
          });
        }
      }
      /* arvores / lixeiras / hidrantes na calcada */
      for (let x = x0; x <= x1; x++) {
        for (const y of [y0, y1]) {
          if (rnd() < 0.30) {
            const palm = rnd() < 0.55;
            const sp = palm ? spritePalm(rnd) : spriteBush(rnd);
            this.addProp({ type: palm ? 'palm' : 'bush', sprite: sp, x: x * T + 8, y: y * T + 8, r: sp.r });
          } else if (rnd() < 0.10) {
            const sp = rnd() < 0.5 ? spriteHydrant(rnd) : spriteTrash(rnd);
            this.addProp({ type: 'prop', sprite: sp, x: x * T + 8, y: y * T + 8, r: 0 });
          }
        }
      }
      for (let y = y0 + 1; y < y1; y++) {
        for (const x of [x0, x1]) {
          if (rnd() < 0.30) {
            const palm = rnd() < 0.55;
            const sp = palm ? spritePalm(rnd) : spriteBush(rnd);
            this.addProp({ type: palm ? 'palm' : 'bush', sprite: sp, x: x * T + 8, y: y * T + 8, r: sp.r });
          } else if (rnd() < 0.08) {
            const sp = rnd() < 0.5 ? spriteHydrant(rnd) : spriteTrash(rnd);
            this.addProp({ type: 'prop', sprite: sp, x: x * T + 8, y: y * T + 8, r: 0 });
          }
        }
      }
    }

    /* parques: fonte no centro + arvores + bancos */
    for (const p of this.parks) {
      const cx = p.cx * T + 8, cy = p.cy * T + 8;
      if (!p.small) {
        this.addProp({ type: 'fountain', sprite: spriteFountain(rnd), x: cx, y: cy, r: 0, flat: true });
      } else if (rnd() < 0.5) {
        this.addProp({ type: 'fountain', sprite: spriteFountain(rnd), x: cx, y: cy, r: 0, flat: true, scale: 0.6 });
      }
      const n = p.small ? 2 : 6;
      for (let i = 0; i < n; i++) {
        const px = (p.x + (rnd() * p.w | 0)) * T + 8;
        const py = (p.y + (rnd() * p.h | 0)) * T + 8;
        const sp = rnd() < 0.5 ? spritePalm(rnd) : spriteBush(rnd);
        this.addProp({ type: 'tree', sprite: sp, x: px, y: py, r: sp.r });
      }
      if (!p.small) for (let i = 0; i < 3; i++) {
        const px = (p.x + (rnd() * p.w | 0)) * T + 8, py = (p.y + (rnd() * p.h | 0)) * T + 8;
        this.addProp({ type: 'bench', sprite: spriteBench(rnd), x: px, y: py, r: 0 });
      }
    }

    /* obras: cones */
    for (let i = 0; i < this.buildings.length; i++) {
      const b = this.buildings[i];
      if (b.ext <= 5 && rnd() < 0.5) {
        this.addProp({
          type: 'cone', sprite: spriteCone(rnd),
          x: (b.tx + (rnd() * b.w | 0)) * T + 8, y: (b.ty + b.h) * T + 12, r: 0
        });
      }
    }
  },

  /* ---------------- colisao / consulta ---------------- */
  at(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= this.W || ty >= this.H) return T_WATER;
    return this.map[ty * this.W + tx];
  },
  isRoad(tx, ty) { return this.at(tx, ty) === T_ROAD; },
  isSolid(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= this.W || ty >= this.H) return true;
    return this.solid[ty * this.W + tx] === 1;
  },
  solidAtPx(px, py) { return this.isSolid(Math.floor(px / TILE), Math.floor(py / TILE)); },

  lanePoint(tx, ty, dir) {
    if (dir === 0 || dir === 2) {
      const y0 = corridorStart(ty);
      return { x: tx * 16 + 8, y: (y0 + 1) * 16 + (dir === 0 ? 8 : -8) };
    }
    const x0 = corridorStart(tx);
    return { x: (x0 + 1) * 16 + (dir === 1 ? -8 : 8), y: ty * 16 + 8 };
  },
  validDir(tx, ty, dir) {
    const d = DIRV[dir];
    return this.isRoad(tx + d[0], ty + d[1]);
  },
  isCross(tx, ty) {
    return isRoadLine(tx) && isRoadLine(ty);
  },

  /* no central do cruzamento: ponto onde a linha da faixa atual
     cruza o centro do corredor perpendicular (curvas de 90o limpas) */
  crossingNode(tx, ty, dir) {
    if (dir === 0 || dir === 2) {
      const y0 = corridorStart(ty);
      return { x: (corridorStart(tx) + 1) * 16, y: (y0 + 1) * 16 + (dir === 0 ? 8 : -8) };
    }
    const x0 = corridorStart(tx);
    return { x: (x0 + 1) * 16 + (dir === 1 ? -8 : 8), y: (corridorStart(ty) + 1) * 16 };
  },

  queryProps(px, py, radius, out) {
    out.length = 0;
    if (!this.propGrid) return out;
    const cs = this.PCELL;
    const gx0 = Math.max(0, Math.floor((px - radius) / cs));
    const gx1 = Math.min(this.gw - 1, Math.floor((px + radius) / cs));
    const gy0 = Math.max(0, Math.floor((py - radius) / cs));
    const gy1 = Math.min(this.gh - 1, Math.floor((py + radius) / cs));
    for (let gy = gy0; gy <= gy1; gy++) for (let gx = gx0; gx <= gx1; gx++) {
      const cell = this.propGrid[gy * this.gw + gx];
      if (!cell) continue;
      for (let i = 0; i < cell.length; i++) out.push(cell[i]);
    }
    return out;
  },

  buildPropGrid() {
    const cs = this.PCELL;
    this.gw = Math.ceil(this.W * TILE / cs);
    this.gh = Math.ceil(this.H * TILE / cs);
    this.propGrid = new Array(this.gw * this.gh);
    for (let i = 0; i < this.props.length; i++) {
      const p = this.props[i];
      if (!p.r) continue;
      const gx = clamp(Math.floor(p.x / cs), 0, this.gw - 1);
      const gy = clamp(Math.floor(p.y / cs), 0, this.gh - 1);
      const k = gy * this.gw + gx;
      if (!this.propGrid[k]) this.propGrid[k] = [];
      this.propGrid[k].push(p);
    }
  },

  /* ---------------- bake do chao ---------------- */
  bake(seed) {
    const W = this.W, H = this.H, T = TILE;
    const o = mk(W * T, H * T);
    const x = o.x;
    const rnd = mkrand((seed || 1) * 7919 + 13);

    for (let ty = 0; ty < H; ty++) {
      for (let tx = 0; tx < W; tx++) {
        const v = this.map[ty * W + tx];
        const ox = tx * T, oy = ty * T;
        switch (v) {
          case T_ROAD: tileRoad(x, ox, oy, rnd); break;
          case T_SIDE: tileSidewalk(x, ox, oy, rnd); break;
          case T_GRASS: tileGrass(x, ox, oy, rnd, true); break;
          case T_WATER: tileWater(x, ox, oy, rnd, tx, ty); break;
          case T_PLAZA: tilePlaza(x, ox, oy, rnd); break;
          case T_SAND: tileSand(x, ox, oy, rnd); break;
          case T_LOT: tileLot(x, ox, oy, rnd); break;
          case T_DIRT: tileDirt(x, ox, oy, rnd); break;
          default: tileSidewalk(x, ox, oy, rnd); break; // predio (coberto depois)
        }
      }
    }

    this.markings(x, rnd);

    /* predios (ordenados por y para sombras corretas) */
    const bs = this.buildings.slice().sort((a, b) => (a.ty + a.h) - (b.ty + b.h) || a.tx - b.tx);
    const brnd = mkrand((seed || 1) * 104729 + 7);
    for (const b of bs) {
      drawBuilding(x, b.tx * T, b.ty * T, b.w * T, b.h * T, b.ext, b.col, brnd, b.kind);
    }

    /* vagas de estacionamento */
    for (const l of this.lots) {
      const X = l.x * T, Y = l.y * T, Wd = l.w * T, Ht = l.h * T;
      x.fillStyle = '#d8d6c8';
      for (let row = 0; row < 2; row++) {
        const yy = Y + 4 + row * Math.floor(Ht / 2);
        x.fillRect(X + 2, yy - 1, Wd - 4, 1);
        x.fillRect(X + 2, yy + Math.floor(Ht / 2) - 4, Wd - 4, 1);
      }
      for (let col = 1; col < 4; col++) {
        const xx = X + Math.floor(col * Wd / 4);
        x.fillRect(xx, Y + 4, 1, Ht - 8);
      }
    }

    this.ground = o.c;
  },

  markings(x, rnd) {
    const W = this.W, H = this.H, T = TILE;
    const YEL = '#e0bc46', WHT = '#e6e4d6';

    for (let ty = 2; ty <= 101; ty++) {
      for (let tx = 2; tx <= 101; tx++) {
        if (this.at(tx, ty) !== T_ROAD) continue;
        const ox = tx * T, oy = ty * T;
        const col = isRoadLine(tx), row = isRoadLine(ty);

        if (col && row) {
          // cruzamento: faixa de pedestres em cada saida
          const draw = (horizontal, near) => {
            x.fillStyle = WHT;
            for (let i = 1; i < T - 1; i += 3) {
              if (horizontal) x.fillRect(ox + i, oy + (near ? T - 4 : 1), 2, 3);
              else x.fillRect(ox + (near ? T - 4 : 1), oy + i, 3, 2);
            }
          };
          if (this.isRoad(tx, ty - 1)) draw(true, false);
          if (this.isRoad(tx, ty + 1)) draw(true, true);
          if (this.isRoad(tx - 1, ty)) draw(false, false);
          if (this.isRoad(tx + 1, ty)) draw(false, true);
          continue;
        }

        if (row) {
          const y0 = corridorStart(ty);
          const cy = (y0 + 1) * T; // centro do corredor
          // linha central amarela tracejada
          if ((tx % 2) === 0) { x.fillStyle = YEL; x.fillRect(ox, cy - 1, 8, 1); }
          // bordas brancas
          x.fillStyle = WHT;
          if (!this.isRoad(tx, ty - 1)) x.fillRect(ox, y0 * T + 1, T, 1);
          if (!this.isRoad(tx, ty + 1)) x.fillRect(ox, (y0 + 2) * T - 2, T, 1);
        }
        if (col) {
          const x0 = corridorStart(tx);
          const cx = (x0 + 1) * T;
          if ((ty % 2) === 0) { x.fillStyle = YEL; x.fillRect(cx - 1, oy, 1, 8); }
          x.fillStyle = WHT;
          if (!this.isRoad(tx - 1, ty)) x.fillRect(x0 * T + 1, oy, 1, T);
          if (!this.isRoad(tx + 1, ty)) x.fillRect((x0 + 2) * T - 2, oy, 1, T);
        }
      }
    }

    /* guias (meio-fio) entre calcada e rua */
    for (let ty = 1; ty <= 102; ty++) {
      for (let tx = 1; tx <= 102; tx++) {
        if (this.at(tx, ty) !== T_SIDE) continue;
        const ox = tx * T, oy = ty * T;
        const chk = (dx, dy) => this.at(tx + dx, ty + dy) === T_ROAD;
        if (chk(0, -1)) { x.fillStyle = '#c3c5bc'; x.fillRect(ox, oy, T, 1); x.fillStyle = 'rgba(20,20,26,0.35)'; x.fillRect(ox, oy - 1, T, 1); }
        if (chk(0, 1)) { x.fillStyle = '#7d7f77'; x.fillRect(ox, oy + T - 1, T, 1); x.fillStyle = 'rgba(20,20,26,0.30)'; x.fillRect(ox, oy + T, T, 1); }
        if (chk(-1, 0)) { x.fillStyle = '#c3c5bc'; x.fillRect(ox, oy, 1, T); x.fillStyle = 'rgba(20,20,26,0.35)'; x.fillRect(ox - 1, oy, 1, T); }
        if (chk(1, 0)) { x.fillStyle = '#7d7f77'; x.fillRect(ox + T - 1, oy, 1, T); x.fillStyle = 'rgba(20,20,26,0.30)'; x.fillRect(ox + T, oy, 1, T); }
      }
    }
  },

  /* ---------------- minimapa ---------------- */
  buildMinimap() {
    const W = this.W, H = this.H;
    const o = mk(W, H);
    const x = o.x;
    const cols = {
      [T_ROAD]: '#4c4f57', [T_SIDE]: '#9a9c94', [T_BLD]: '#6e6a63',
      [T_GRASS]: '#4c7a38', [T_WATER]: '#2f6ba8', [T_PLAZA]: '#c2bda6',
      [T_SAND]: '#d6c290', [T_LOT]: '#43464e', [T_DIRT]: '#8a7654'
    };
    for (let ty = 0; ty < H; ty++) for (let tx = 0; tx < W; tx++) {
      x.fillStyle = cols[this.map[ty * W + tx]] || '#000';
      x.fillRect(tx, ty, 1, 1);
    }
    this.mini = o.c;
  },

  /* ponto de spawn aleatorio na rua */
  randomRoad(rnd, tries) {
    const n = this.roadTiles.length;
    for (let i = 0; i < (tries || 40); i++) {
      const t = this.roadTiles[(rnd() * n) | 0];
      const dirs = [];
      for (let d = 0; d < 4; d++) if (this.validDir(t.tx, t.ty, d)) dirs.push(d);
      if (!dirs.length) continue;
      const d = dirs[(rnd() * dirs.length) | 0];
      const p = this.lanePoint(t.tx, t.ty, d);
      return { x: p.x, y: p.y, dir: d, tx: t.tx, ty: t.ty };
    }
    return { x: 8 * 16, y: 8 * 16, dir: 0, tx: 8, ty: 8 };
  },

  /* tile de rua mais proximo (espiral) */
  nearestRoad(tx, ty, maxR) {
    maxR = maxR || 8;
    for (let r = 0; r <= maxR; r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
          if (this.isRoad(tx + dx, ty + dy)) return { tx: tx + dx, ty: ty + dy };
        }
      }
    }
    return { tx: tx, ty: ty };
  },

  /* calcada livre para pedestre */
  randomSidewalk(rnd, tries) {
    const W = this.W, H = this.H;
    for (let i = 0; i < (tries || 60); i++) {
      const tx = 2 + (rnd() * 100 | 0), ty = 2 + (rnd() * 100 | 0);
      if (this.at(tx, ty) !== T_SIDE) continue;
      return { x: tx * 16 + 8, y: ty * 16 + 8 };
    }
    return { x: 8 * 16, y: 8 * 16 };
  }
};
