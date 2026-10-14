/* Pixel Tanks - motor do jogo (logica + render) */
(function (PT) {
  'use strict';

  var C = PT.C, F = PT.font, S = PT.Sprites, A = PT.Audio;
  var TILE = C.TILE, COLS = C.COLS, ROWS = C.ROWS;
  var FIELD_L = C.FIELD_X, FIELD_R = C.FIELD_X + C.FIELD_W;
  var FIELD_T = C.FIELD_Y, FIELD_B = C.FIELD_Y + C.FIELD_H;
  var TANK = C.TANK;
  var PU_DUR = 16 * 60;

  var DIRV = {
    up: { x: 0, y: -1 }, right: { x: 1, y: 0 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }
  };
  var DIRS = ['up', 'right', 'down', 'left'];
  var OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };

  var ENEMY_TYPES = {
    grunt: { speed: 0.55, cd: 95, aggr: 0.35, pts: 100, side: 'grunt' },
    rusher: { speed: 1.02, cd: 135, aggr: 0.90, pts: 200, side: 'rusher' },
    sniper: { speed: 0.45, cd: 72, aggr: 0.60, pts: 300, side: 'sniper' }
  };

  var G = {
    canvas: null, ctx: null, floor: null,
    scene: 'menu', paused: false,
    mode: 'duel', players: 1, mapIndex: 0,
    menuScene: 'mode', menuIndex: { mode: 0, players: 0, map: 0 },
    walls: {}, baseSet: {}, base: null, spawns: {}, mapName: '',
    tanks: [], bullets: [], pows: [], parts: [], rings: [], pops: [],
    round: { num: 1, wins: { p1: 0, p2: 0 }, phase: 'count', timer: 180, elapsed: 0, winner: null, crumble: false },
    sv: { wave: 1, total: 6, spawned: 0, spawnTimer: 60, phase: 'wave', breakT: 0, respawn: 0 },
    score: 0, hi: 0, kills: 0, time: 0, shake: 0, muted: false,
    table: null
  };

  // ---------------------------------------------------------------- input
  var held = {}, pressed = [];

  G.keyDown = function (code) {
    if (!held[code]) pressed.push(code);
    held[code] = true;
  };
  G.keyUp = function (code) { held[code] = false; };
  function pressed_(code) { return pressed.indexOf(code) >= 0; }
  function clearPressed() { pressed.length = 0; }

  var FIRE_KEYS = ['Space', 'KeyX', 'KeyZ', 'Enter'];
  var P1_KEYS = { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], fire: ['Space', 'KeyX', 'Enter', 'NumpadEnter'] };
  var P1_WASD = { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], fire: ['Space', 'KeyX', 'Enter', 'NumpadEnter'] };
  var P2_KEYS = { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], fire: ['ShiftRight', 'ControlRight', 'NumpadEnter', 'Enter'] };

  function anyHeld(list) {
    for (var i = 0; i < list.length; i++) if (held[list[i]]) return true;
    return false;
  }
  function padFor(side) {
    var pad = (side === 'p1') ? (G.players === 2 ? P1_KEYS : P1_WASD) : P2_KEYS;
    if (side === 'p1' && G.players === 1) {
      // 1 jogador: setas E wasd controlam p1
      var dir = null;
      if (anyHeld(P1_KEYS.up) || anyHeld(P1_WASD.up)) dir = 'up';
      else if (anyHeld(P1_KEYS.down) || anyHeld(P1_WASD.down)) dir = 'down';
      else if (anyHeld(P1_KEYS.left) || anyHeld(P1_WASD.left)) dir = 'left';
      else if (anyHeld(P1_KEYS.right) || anyHeld(P1_WASD.right)) dir = 'right';
      return { dir: dir, fire: anyHeld(P1_KEYS.fire) };
    }
    var d = null;
    if (anyHeld(pad.up)) d = 'up';
    else if (anyHeld(pad.down)) d = 'down';
    else if (anyHeld(pad.left)) d = 'left';
    else if (anyHeld(pad.right)) d = 'right';
    return { dir: d, fire: anyHeld(pad.fire) };
  }

  // --------------------------------------------------------------- helpers
  function rnd(n) { return Math.random() * n; }
  function irnd(n) { return Math.floor(Math.random() * n); }
  function pick(a) { return a[irnd(a.length)]; }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  function snapAxis(v, origin) {
    var base = Math.round((v - origin - 1) / TILE) * TILE + origin + 1;
    return { base: base, dist: base - v };
  }

  function rectHitsWall(x, y, w, h) {
    var x2 = x + w - 1, y2 = y + h - 1;
    if (x < FIELD_L || x2 >= FIELD_R || y < FIELD_T || y2 >= FIELD_B) return true;
    var c1 = Math.floor(x / TILE), c2 = Math.floor(x2 / TILE);
    var r1 = Math.floor((y - FIELD_T) / TILE), r2 = Math.floor((y2 - FIELD_T) / TILE);
    for (var c = c1; c <= c2; c++) {
      for (var r = r1; r <= r2; r++) {
        var key = r * COLS + c;
        if (G.walls[key]) return true;
        if (G.base && G.base.alive && G.baseSet[key]) return true;
      }
    }
    return false;
  }

  function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
  }

  function tankBlocked(self, x, y) {
    if (rectHitsWall(x, y, TANK, TANK)) return true;
    for (var i = 0; i < G.tanks.length; i++) {
      var o = G.tanks[i];
      if (o === self || o.dead || o.spawnAnim > 0) continue;
      if (rectsOverlap(x, y, TANK, TANK, o.x, o.y, TANK, TANK)) return true;
    }
    return false;
  }

  function lineClear(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    var steps = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 8);
    if (steps <= 0) return true;
    for (var i = 1; i < steps; i++) {
      var x = x1 + dx * i / steps, y = y1 + dy * i / steps;
      var c = Math.floor(x / TILE), r = Math.floor((y - FIELD_T) / TILE);
      if (G.walls[r * COLS + c]) return false;
      if (G.base && G.base.alive && G.baseSet[r * COLS + c]) return false;
    }
    return true;
  }

  // ---------------------------------------------------------------- setup
  G.init = function (canvas, table) {
    G.canvas = canvas;
    G.ctx = PT.ctxOf(canvas);
    G.table = table;
    try { G.hi = parseInt(localStorage.getItem('pixeltanks.hi') || '0', 10) || 0; } catch (e) { G.hi = 0; }
    buildFloor();
  };

  function buildFloor() {
    var cv = PT.makeCanvas(C.W, C.FIELD_H), c = PT.ctxOf(cv);
    for (var r = 0; r < ROWS; r++) {
      for (var cc = 0; cc < COLS; cc++) {
        var even = (r + cc) % 2 === 0;
        c.fillStyle = even ? C.COLORS.floorA : C.COLORS.floorB;
        c.fillRect(cc * TILE, r * TILE, TILE, TILE);
        c.fillStyle = C.COLORS.floorDot;
        c.fillRect(cc * TILE + 3, r * TILE + 3, 1, 1);
        c.fillRect(cc * TILE + 11, r * TILE + 11, 1, 1);
      }
    }
    G.floor = cv;
  }

  function loadMap(index) {
    var m = PT.Maps.build(index);
    G.walls = m.walls;
    G.base = m.base;
    G.baseSet = {};
    if (m.base) for (var i = 0; i < m.base.tiles.length; i++) G.baseSet[m.base.tiles[i]] = true;
    G.spawns = m.spawns;
    G.mapName = m.name;
    G.baseSprite = makeBaseSprite(m.base ? m.base.w : 32, m.base ? m.base.h : 32, false);
    G.baseDeadSprite = makeBaseSprite(m.base ? m.base.w : 32, m.base ? m.base.h : 32, true);
  }

  function makeBaseSprite(w, h, dead) {
    var cv = PT.makeCanvas(w, h), c = PT.ctxOf(cv);
    var P = function (x, y, ww, hh, col) { c.fillStyle = col; c.fillRect(x, y, ww, hh); };
    P(0, 0, w, h, dead ? '#2a2f38' : '#3a4757');
    P(0, 0, w, 2, dead ? '#4a505c' : '#7f8a9c');
    P(0, 0, 2, h, dead ? '#4a505c' : '#7f8a9c');
    P(0, h - 2, w, 2, '#1a2029');
    P(w - 2, 0, 2, h, '#1a2029');
    P(2, 2, w - 4, h - 4, dead ? '#191d24' : '#222b36');
    // emblema em losango
    var cxp = w / 2, cyp = h / 2;
    var rx = w / 2 - 4, ry = h / 2 - 4;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var dx = Math.abs((x + 0.5 - cxp) / rx), dy = Math.abs((y + 0.5 - cyp) / ry);
        var d = dx + dy;
        if (d <= 0.42) P(x, y, 1, 1, dead ? '#5a3020' : '#fffbe8');
        else if (d <= 0.75) P(x, y, 1, 1, dead ? '#8a3a18' : '#ffd24a');
        else if (d <= 1) P(x, y, 1, 1, dead ? '#3a2013' : '#e07a1f');
      }
    }
    // rebites
    if (!dead) {
      P(3, 3, 2, 2, '#cdd7e4'); P(w - 5, 3, 2, 2, '#cdd7e4');
      P(3, h - 5, 2, 2, '#cdd7e4'); P(w - 5, h - 5, 2, 2, '#cdd7e4');
    } else {
      P(4, 6, 3, 1, '#0e1116'); P(w - 9, h - 8, 4, 1, '#0e1116');
      P(6, h - 6, 1, 3, '#0e1116');
    }
    return cv;
  }

  // ---------------------------------------------------------------- tanques
  function makeTank(side, col, row, kind) {
    var t = {
      side: side, kind: kind || 'player',
      team: (side === 'p1' || side === 'p2') ? side : 'cpu',
      x: col * TILE + 1, y: FIELD_T + row * TILE + 1,
      dir: 'up', dead: false, spawnAnim: C.SPAWN_ANIM, cooldown: 0,
      pu: { shield: 0, speed: 0, bounce: 0, rapid: 0 },
      freeze: 0, blocked: 0, ai: { timer: 0, aggr: 0.4, cd: 90, speed: 0.55 },
      hits: 0, kills: 0, pts: 100
    };
    if (kind && kind !== 'player') {
      var et = ENEMY_TYPES[kind];
      t.ai.speed = et.speed; t.ai.cd = et.cd; t.ai.aggr = et.aggr; t.pts = et.pts;
    }
    return t;
  }

  function playerTanks() {
    var out = [];
    for (var i = 0; i < G.tanks.length; i++) {
      var t = G.tanks[i];
      if (t.kind === 'player' && !t.dead) out.push(t);
    }
    return out;
  }

  function enemies() {
    var out = [];
    for (var i = 0; i < G.tanks.length; i++) {
      var t = G.tanks[i];
      if (t.kind !== 'player' && !t.dead) out.push(t);
    }
    return out;
  }

  function liveBullets(t) {
    var n = 0;
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      if (!b.dead && b.owner === t) n++;
    }
    return n;
  }

  function tankSpeed(t) {
    var base = t.kind === 'player' ? C.TANK_SPEED : t.ai.speed;
    return base * (t.pu.speed > 0 ? 1.5 : 1);
  }

  function tryMove(t, dx, dy) {
    var step = tankSpeed(t);
    // assistencia de alinhamento: mantem o tanque nas "faixas" do grid
    var nx = t.x + dx * step, ny = t.y + dy * step;

    if (!tankBlocked(t, nx, ny)) {
      t.x = nx; t.y = ny;
      alignTank(t, dx, dy, step);
      return true;
    }
    // tenta encaixar no grid para entrar em corredores
    if (dx !== 0) {
      var sy = snapAxis(t.y, FIELD_T);
      if (sy.dist !== 0 && Math.abs(sy.dist) <= 6 && !tankBlocked(t, nx, sy.base)) {
        t.y = sy.base; t.x = nx; return true;
      }
    } else if (dy !== 0) {
      var sx = snapAxis(t.x, C.FIELD_X);
      if (sx.dist !== 0 && Math.abs(sx.dist) <= 6 && !tankBlocked(t, sx.base, ny)) {
        t.x = sx.base; t.y = ny; return true;
      }
    }
    return false;
  }

  function alignTank(t, dx, dy, step) {
    if (dx !== 0) {
      var sy = snapAxis(t.y, FIELD_T);
      if (sy.dist !== 0 && Math.abs(sy.dist) <= 5) t.y += clamp(sy.dist, -step, step) * 0.6;
    } else if (dy !== 0) {
      var sx = snapAxis(t.x, C.FIELD_X);
      if (sx.dist !== 0 && Math.abs(sx.dist) <= 5) t.x += clamp(sx.dist, -step, step) * 0.6;
    }
  }

  function fire(t) {
    if (t.dead || t.spawnAnim > 0 || t.cooldown > 0 || t.freeze > 0) return false;
    var maxB = t.pu.rapid > 0 ? 3 : 1;
    if (liveBullets(t) >= maxB) return false;
    var d = DIRV[t.dir];
    var cx = t.x + TANK / 2, cy = t.y + TANK / 2;
    var bx = cx + d.x * 9 - 1, by = cy + d.y * 9 - 1;
    var b = {
      x: bx, y: by, dx: d.x, dy: d.y, side: t.side, team: t.team, owner: t, dead: false,
      pierce: t.pu.shield > 0, bounces: t.pu.bounce > 0 ? 2 : 0, life: 0
    };
    G.bullets.push(b);
    if (t.kind === 'player') t.cooldown = t.pu.rapid > 0 ? 5 : C.FIRE_COOLDOWN;
    else t.cooldown = t.ai.cd;
    // faisca do cano
    sparks(cx + d.x * 8, cy + d.y * 8, '#fff4c0', 3, 0.6);
    if (t.kind === 'player') A.shoot(); else A.enemyShoot();
    return true;
  }

  // ----------------------------------------------------------------- armas
  function canBounce(b) {
    if (b.bounces <= 0) return false;
    b.bounces--;
    return true;
  }

  function doBounce(b, cx, cy) {
    if (b.dx !== 0) { b.dx = -b.dx; b.x += b.dx * 2; } else { b.dy = -b.dy; b.y += b.dy * 2; }
    A.bounce();
    sparks(cx, cy, '#bff3ff', 5, 1);
  }

  function killBullet(b, cx, cy) {
    b.dead = true;
    sparks(cx, cy, '#ffd24a', 5, 1);
    G.rings.push({ x: cx, y: cy, r: 2, max: 7, life: 8, maxLife: 8, color: '#fff2b0', thick: 1 });
  }

  function damageWall(key, c, r, byPlayer) {
    var w = G.walls[key];
    if (!w) return;
    var cx = c * TILE + 8, cy = FIELD_T + r * TILE + 8;
    if (w.type === 'steel') return;
    w.hp--;
    if (w.hp <= 0) {
      delete G.walls[key];
      A.brick();
      for (var i = 0; i < 7; i++) {
        G.parts.push({
          x: cx + rnd(14) - 7, y: cy + rnd(14) - 7, vx: (Math.random() - 0.5) * 1.6,
          vy: (Math.random() - 0.5) * 1.6 - 0.3, life: 16 + irnd(12), maxLife: 28,
          color: pick(['#d95f31', '#a63b1f', '#e08a4a', '#5e1f0e']), size: 2, grav: 0.04
        });
      }
      if (byPlayer && G.mode === 'survival') addScore(10, 0, 0, false);
    } else {
      w.damaged = true;
      A.brick();
      sparks(cx, cy, '#e08a4a', 4, 1);
    }
  }

  function bulletHitWall(b, c, r) {
    var key = r * COLS + c;
    var w = G.walls[key];
    if (!w) return false;
    var cx = c * TILE + 8, cy = FIELD_T + r * TILE + 8;
    var byPlayer = (b.side === 'p1' || b.side === 'p2');
    if (w.type === 'brick') {
      if (b.pierce) {
        delete G.walls[key];
        A.brick();
        sparks(cx, cy, '#bff3ff', 6, 1);
        b.pierce = false;
        if (byPlayer && G.mode === 'survival') addScore(10, 0, 0, false);
        return false; // continua voando
      }
      damageWall(key, c, r, byPlayer);
      if (canBounce(b)) { doBounce(b, cx, cy); return false; }
      killBullet(b, cx, cy);
      return true;
    }
    // aco
    A.steelHit();
    sparks(cx, cy, '#cdd7e4', 3, 1);
    if (canBounce(b)) { doBounce(b, cx, cy); return false; }
    killBullet(b, cx, cy);
    return true;
  }

  function updateBullets() {
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      if (b.dead) continue;
      b.life++;
      var steps = Math.max(1, Math.round(C.BULLET_SPEED));
      for (var s = 0; s < steps; s++) {
        if (b.dead) break;
        b.x += b.dx * C.BULLET_SPEED / steps;
        b.y += b.dy * C.BULLET_SPEED / steps;
        var cx = b.x + 1.5, cy = b.y + 1.5;

        // fora do campo => quica ou morre
        if (cx < FIELD_L + 1 || cx > FIELD_R - 1 || cy < FIELD_T + 1 || cy > FIELD_B - 1) {
          if (canBounce(b)) { doBounce(b, clamp(cx, FIELD_L + 2, FIELD_R - 2), clamp(cy, FIELD_T + 2, FIELD_B - 2)); continue; }
          killBullet(b, clamp(cx, FIELD_L, FIELD_R), clamp(cy, FIELD_T, FIELD_B));
          break;
        }
        // base
        var tc = Math.floor(cx / TILE), tr = Math.floor((cy - FIELD_T) / TILE);
        var tkey = tr * COLS + tc;
        if (G.base && G.base.alive && G.baseSet[tkey]) {
          destroyBase();
          killBullet(b, cx, cy);
          break;
        }
        // paredes
        if (G.walls[tkey]) {
          if (bulletHitWall(b, tc, tr)) break;
          if (b.dead) break;
          continue;
        }
        // tanques
        var hit = false;
        for (var j = 0; j < G.tanks.length; j++) {
          var t = G.tanks[j];
          if (t.dead || t.team === b.team) continue;
          if (cx >= t.x && cx <= t.x + TANK && cy >= t.y && cy <= t.y + TANK) {
            hit = true;
            hitTank(t, b);
            killBullet(b, cx, cy);
            break;
          }
        }
        if (hit) break;
      }
    }
    for (var k = G.bullets.length - 1; k >= 0; k--) if (G.bullets[k].dead) G.bullets.splice(k, 1);
  }

  function hitTank(t, b) {
    if (t.spawnAnim > 0) return;
    if (t.pu.shield > 0) {
      t.pu.shield = Math.max(0, t.pu.shield - 180);
      A.steelHit();
      sparks(t.x + TANK / 2, t.y + TANK / 2, '#8fe3ff', 8, 1.4);
      G.rings.push({ x: t.x + TANK / 2, y: t.y + TANK / 2, r: 4, max: 12, life: 10, maxLife: 10, color: '#8fe3ff', thick: 1 });
      return;
    }
    killTank(t, b.owner);
  }

  function killTank(t, killer) {
    if (t.dead) return;
    t.dead = true;
    boom(t.x + TANK / 2, t.y + TANK / 2, t.kind === 'player' ? 2 : 1);
    A.explode();
    G.shake = Math.max(G.shake, t.kind === 'player' ? 10 : 6);
    if (t.kind === 'player') {
      if (G.mode === 'survival') G.sv.respawn = C.RESPAWN_DELAY;
    } else if (killer && killer.kind === 'player') {
      killer.kills++;
      G.kills++;
      if (G.mode === 'survival') addScore(t.pts, t.x + TANK / 2, t.y + TANK / 2, true);
    }
  }

  function destroyBase() {
    if (!G.base || !G.base.alive) return;
    G.base.alive = false;
    var bx = G.base.x + G.base.w / 2, by = G.base.y + G.base.h / 2;
    boom(bx, by, 3);
    boom(bx - 10, by, 2);
    boom(bx + 10, by, 2);
    A.bigExplode();
    G.shake = 24;
    for (var i = 0; i < 24; i++) {
      G.parts.push({
        x: bx + rnd(34) - 17, y: by + rnd(34) - 17, vx: (Math.random() - 0.5) * 2.6,
        vy: (Math.random() - 0.5) * 2.6 - 0.4, life: 40 + irnd(50), maxLife: 80,
        color: pick(['#fffbe8', '#ffd24a', '#ff8a3d', '#ff4646']), size: 2, grav: 0.02
      });
    }
  }

  // --------------------------------------------------------------- efeitos
  function sparks(x, y, color, n, spread) {
    for (var i = 0; i < n; i++) {
      var a = rnd(Math.PI * 2), sp = rnd(1.6) * (spread || 1);
      G.parts.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 8 + irnd(8), maxLife: 16, color: color, size: 1, grav: 0
      });
    }
  }

  function boom(x, y, size) {
    G.shake = Math.max(G.shake, size * 4);
    G.rings.push({ x: x, y: y, r: 2, max: 10 + size * 6, life: 12, maxLife: 12, color: '#ffd24a', thick: size });
    var n = 8 + size * 9;
    var cols = ['#fffbe8', '#ffd24a', '#ff8a3d', '#ff4646', '#c1361c'];
    for (var i = 0; i < n; i++) {
      var a = rnd(Math.PI * 2), sp = rnd(1.2 + size * 0.9);
      G.parts.push({
        x: x + rnd(6) - 3, y: y + rnd(6) - 3, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 14 + irnd(10 + size * 10), maxLife: 20 + size * 12,
        color: cols[irnd(cols.length)], size: size > 1 ? 2 : 1, grav: 0.03
      });
    }
  }

  function updateFX() {
    for (var i = G.parts.length - 1; i >= 0; i--) {
      var p = G.parts[i];
      p.x += p.vx; p.y += p.vy; p.vy += p.grav || 0;
      p.vx *= 0.97; p.vy *= 0.97;
      if (--p.life <= 0) G.parts.splice(i, 1);
    }
    for (var j = G.rings.length - 1; j >= 0; j--) {
      var rg = G.rings[j];
      rg.r += (rg.max - rg.r) * 0.22;
      if (--rg.life <= 0) G.rings.splice(j, 1);
    }
    for (var k = G.pops.length - 1; k >= 0; k--) {
      var pp = G.pops[k];
      pp.y -= 0.35;
      if (--pp.life <= 0) G.pops.splice(k, 1);
    }
  }

  function addScore(n, x, y, pop) {
    G.score += n;
    if (G.score > G.hi) G.hi = G.score;
    if (pop) G.pops.push({ x: x, y: y, text: '+' + n, life: 42, color: '#ffd24a' });
  }
  // ---------------------------------------------------------------- itens
  function trySpawnPowerup() {
    var spots = [];
    for (var r = 1; r < ROWS - 1; r++) {
      for (var c = 1; c < COLS - 1; c++) {
        var key = r * COLS + c;
        if (G.walls[key] || (G.base && G.baseSet[key])) continue;
        var x = c * TILE + 1, y = FIELD_T + r * TILE + 1;
        if (G.base && Math.abs(x - G.base.x) < 56 && Math.abs(y - G.base.y) < 40) continue;
        var busy = false;
        for (var i = 0; i < G.tanks.length; i++) {
          var t = G.tanks[i];
          if (!t.dead && rectsOverlap(x, y, TANK, TANK, t.x, t.y, TANK, TANK)) { busy = true; break; }
        }
        if (!busy) spots.push({ x: x, y: y });
      }
    }
    if (!spots.length) return;
    var spot = pick(spots);
    var types = ['shield', 'speed', 'bounce', 'rapid'];
    var type = types[irnd(types.length)];
    var fromLeft = irnd(2) === 0;
    G.pows.push({
      type: type,
      x: fromLeft ? FIELD_L + 2 : FIELD_R - 14,
      y: FIELD_T + rnd(Math.max(8, C.FIELD_H - 24)) + 4,
      tx: spot.x, ty: spot.y,
      state: 'fly', t: 0, life: C.PU_LIFE, phase: 0
    });
  }

  function updatePows() {
    for (var i = G.pows.length - 1; i >= 0; i--) {
      var p = G.pows[i];
      p.phase++;
      if (p.state === 'fly') {
        p.t += 0.04;
        p.x += (p.tx - p.x) * 0.13;
        p.y += (p.ty - p.y) * 0.13;
        if (p.t >= 1 || (Math.abs(p.x - p.tx) < 0.7 && Math.abs(p.y - p.ty) < 0.7)) {
          p.state = 'play'; p.x = p.tx; p.y = p.ty;
        }
        continue;
      }
      if (--p.life <= 0) { G.pows.splice(i, 1); continue; }
      for (var j = 0; j < G.tanks.length; j++) {
        var t = G.tanks[j];
        if (t.dead || t.kind !== 'player' || t.spawnAnim > 0) continue;
        if (rectsOverlap(t.x, t.y, TANK, TANK, p.x, p.y, 10, 10)) {
          applyPowerup(t, p.type);
          G.pows.splice(i, 1);
          if (G.mode === 'survival') addScore(50, p.x, p.y, false);
          break;
        }
      }
    }
  }

  function applyPowerup(t, type) {
    A.pickup();
    G.rings.push({ x: t.x + TANK / 2, y: t.y + TANK / 2, r: 3, max: 18, life: 16, maxLife: 16, color: '#ffffff', thick: 1 });
    if (type === 'shield') t.pu.shield = PU_DUR;
    else if (type === 'speed') t.pu.speed = PU_DUR;
    else if (type === 'bounce') t.pu.bounce = 20 * 60;
    else if (type === 'rapid') t.pu.rapid = PU_DUR;
    var names = { shield: 'ESCUDO', speed: 'TURBO', bounce: 'RICOCHETE', rapid: 'TIRO RAPIDO' };
    G.bannerSmall = { text: names[type] + '!', color: '#ffd24a', life: 80 };
  }

  // ------------------------------------------------------------------- IA
  function nearestPlayer(t) {
    var best = null, bd = 1e9;
    for (var i = 0; i < G.tanks.length; i++) {
      var p = G.tanks[i];
      if (p.kind !== 'player' || p.dead || p.spawnAnim > 0) continue;
      var d = Math.abs(p.x - t.x) + Math.abs(p.y - t.y);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  function blockedAhead(t, dir) {
    var d = DIRV[dir];
    return tankBlocked(t, t.x + d.x * 5, t.y + d.y * 5);
  }

  function chooseEnemyDir(t) {
    var target = nearestPlayer(t);
    var wants = [];
    if (target && Math.random() < t.ai.aggr) {
      var dx = target.x - t.x, dy = target.y - t.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        wants.push(dx > 0 ? 'right' : 'left', dy > 0 ? 'down' : 'up');
      } else {
        wants.push(dy > 0 ? 'down' : 'up', dx > 0 ? 'right' : 'left');
      }
    } else if (G.base && G.base.alive && Math.random() < 0.55) {
      var bx = G.base.x - t.x, by = G.base.y - t.y;
      if (Math.abs(bx) > Math.abs(by)) wants.push(bx > 0 ? 'right' : 'left');
      else wants.push(by > 0 ? 'down' : 'up');
    }
    for (var i = 0; i < 4; i++) wants.push(DIRS[irnd(4)]);

    for (var k = 0; k < wants.length; k++) {
      var d = wants[k];
      if (d === OPPOSITE[t.dir] && Math.random() < 0.7) continue;
      if (!blockedAhead(t, d)) { t.dir = d; return; }
    }
    t.dir = wants[0] || DIRS[irnd(4)];
  }

  function aimAt(t) {
    var cx = t.x + TANK / 2, cy = t.y + TANK / 2;
    var targets = [];
    for (var i = 0; i < G.tanks.length; i++) {
      var p = G.tanks[i];
      if (p.kind === 'player' && !p.dead && p.spawnAnim <= 0) targets.push({ x: p.x + TANK / 2, y: p.y + TANK / 2 });
    }
    if (G.base && G.base.alive) targets.push({ x: G.base.x + G.base.w / 2, y: G.base.y + G.base.h / 2 });
    for (var j = 0; j < targets.length; j++) {
      var tx = targets[j].x, ty = targets[j].y;
      if (Math.abs(tx - cx) < 10 && lineClear(cx, cy, tx, ty)) {
        t.dir = ty > cy ? 'down' : 'up';
        return true;
      }
      if (Math.abs(ty - cy) < 10 && lineClear(cx, cy, tx, ty)) {
        t.dir = tx > cx ? 'right' : 'left';
        return true;
      }
    }
    return false;
  }

  function updateEnemy(t) {
    if (t.freeze > 0) { t.freeze--; return; }
    if (t.ai.timer-- <= 0 || t.blocked > 8) {
      chooseEnemyDir(t);
      t.ai.timer = 24 + irnd(60);
      t.blocked = 0;
    }
    var d = DIRV[t.dir];
    if (tryMove(t, d.x, d.y)) {
      t.blocked = 0;
    } else {
      t.blocked++;
      if (t.blocked > 3 && t.cooldown <= 0 && Math.random() < 0.25) fire(t);
    }
    if (t.cooldown > 0) t.cooldown--;
    if (aimAt(t)) {
      if (t.cooldown <= 0 && Math.random() < 0.30) fire(t);
    } else if (Math.random() < 0.012) {
      fire(t);
    }
  }

  function updatePlayer(t, pad) {
    if (t.pu.shield > 0) t.pu.shield--;
    if (t.pu.speed > 0) t.pu.speed--;
    if (t.pu.bounce > 0) t.pu.bounce--;
    if (t.pu.rapid > 0) t.pu.rapid--;
    if (t.cooldown > 0) t.cooldown--;
    if (pad.dir) {
      t.dir = pad.dir;
      var d = DIRV[pad.dir];
      tryMove(t, d.x, d.y);
    }
    if (pad.fire) fire(t);
  }

  function updateTanks() {
    for (var i = 0; i < G.tanks.length; i++) {
      var t = G.tanks[i];
      if (t.dead) continue;
      if (t.spawnAnim > 0) { t.spawnAnim--; continue; }
      if (t.kind === 'player') updatePlayer(t, padFor(t.side));
      else updateEnemy(t);
    }
  }
  // ---------------------------------------------------------------- fluxo
  G.startMatch = function (mode, players, mapIndex) {
    G.mode = mode;
    G.players = players;
    G.mapIndex = mapIndex;
    G.scene = 'game';
    G.paused = false;
    G.score = 0;
    G.kills = 0;
    G.shake = 0;
    G.bullets.length = 0;
    G.pows.length = 0;
    G.parts.length = 0;
    G.rings.length = 0;
    G.pops.length = 0;
    G.bannerSmall = null;
    loadMap(mapIndex);
    if (mode === 'duel') {
      G.round = { num: 1, wins: { p1: 0, p2: 0, cpu: 0 }, phase: 'count', timer: 180, elapsed: 0, winner: null, crumble: false, matchOver: false };
      startRound();
    } else {
      G.sv = { wave: 1, total: 6, spawned: 0, spawnTimer: 100, phase: 'wave', breakT: 0, respawn: 0, lives: C.LIVES, puTimer: C.PU_INTERVAL, reason: '' };
      G.tanks.length = 0;
      spawnPlayersSurvival();
    }
    A.startMusic();
  };

  function spawnPointFor(tag) {
    var sp = G.spawns[tag];
    if (sp) return sp;
    var list = ['a', 'b', '1', '2'];
    for (var i = 0; i < list.length; i++) if (G.spawns[list[i]]) return G.spawns[list[i]];
    return { col: 1, row: 1 };
  }

  function startRound() {
    loadMap(G.mapIndex);
    G.bullets.length = 0;
    G.pows.length = 0;
    G.tanks.length = 0;
    var s1 = spawnPointFor('1'), s2 = spawnPointFor('2');
    var sA = spawnPointFor('a'), sB = spawnPointFor('b');
    var p1 = makeTank('p1', s1.col, s1.row, 'player');
    G.tanks.push(p1);
    if (G.players === 2) G.tanks.push(makeTank('p2', s2.col, s2.row, 'player'));
    var e1 = makeTank('cpu', sA.col, sA.row, 'grunt');
    e1.ai.speed = 0.92; e1.ai.cd = 52; e1.ai.aggr = 0.85; e1.pts = 200;
    e1.dir = 'down';
    G.tanks.push(e1);
    if (G.players === 2) {
      var e2 = makeTank('cpu', sB.col, sB.row, 'grunt');
      e2.ai.speed = 0.92; e2.ai.cd = 52; e2.ai.aggr = 0.85; e2.pts = 200;
      e2.dir = 'down';
      G.tanks.push(e2);
    }
    G.round.phase = 'count';
    G.round.timer = 180;
    G.round.elapsed = 0;
    G.round.crumble = false;
    G.round.winner = null;
  }

  function spawnPlayersSurvival() {
    var want = G.players === 2 ? [['p1', '1'], ['p2', '2']] : [['p1', '1']];
    for (var i = 0; i < want.length; i++) {
      var side = want[i][0], tag = want[i][1];
      var exists = false;
      for (var j = 0; j < G.tanks.length; j++) {
        var t = G.tanks[j];
        if (t.kind === 'player' && t.side === side && !t.dead) exists = true;
      }
      if (exists) continue;
      var s = spawnPointFor(tag);
      var x = s.col * TILE + 1, y = FIELD_T + s.row * TILE + 1;
      var busy = false;
      for (var k = 0; k < G.tanks.length; k++) {
        var o = G.tanks[k];
        if (o.dead) continue;
        if (rectsOverlap(x, y, TANK, TANK, o.x, o.y, TANK, TANK)) busy = true;
      }
      if (busy) continue;
      var nt = makeTank(side, s.col, s.row, 'player');
      nt.dir = 'up';
      G.tanks.push(nt);
    }
  }

  function spawnEnemySurvival() {
    var tags = Math.random() < 0.5 ? ['a', 'b'] : ['b', 'a'];
    var chosen = null;
    for (var i = 0; i < tags.length; i++) {
      var sp = spawnPointFor(tags[i]);
      var x = sp.col * TILE + 1, y = FIELD_T + sp.row * TILE + 1;
      var busy = false;
      for (var j = 0; j < G.tanks.length; j++) {
        var t = G.tanks[j];
        if (t.dead) continue;
        if (rectsOverlap(x, y, TANK, TANK, t.x, t.y, TANK, TANK)) busy = true;
      }
      if (!busy) { chosen = sp; break; }
    }
    if (!chosen) return false;

    var w = G.sv.wave;
    var kinds = ['grunt'];
    if (w >= 2) kinds.push('rusher', 'grunt');
    if (w >= 3) kinds.push('sniper', 'rusher');
    if (w >= 5) kinds.push('sniper', 'rusher', 'sniper');
    var kind = pick(kinds);
    var e = makeTank(kind, chosen.col, chosen.row, kind);
    var wv = G.sv.wave;
    e.ai.speed *= Math.min(1.25, 0.78 + wv * 0.06);
    e.ai.cd = Math.round(e.ai.cd * Math.max(0.85, 1.35 - wv * 0.05));
    e.ai.aggr = Math.min(1, e.ai.aggr * Math.min(1.05, 0.68 + wv * 0.07));
    e.dir = 'down';
    G.tanks.push(e);
    G.sv.spawned++;
    return true;
  }

  function crumbleWall() {
    var keys = Object.keys(G.walls);
    var bricks = [];
    for (var i = 0; i < keys.length; i++) if (G.walls[keys[i]].type === 'brick') bricks.push(keys[i]);
    if (!bricks.length) return;
    var key = bricks[irnd(bricks.length)];
    var c = key % COLS, r = Math.floor(key / COLS);
    G.walls[key].hp = 1;
    damageWall(key, c, r, false);
  }

  function endRound(winner) {
    var rd = G.round;
    rd.phase = 'over';
    rd.timer = 200;
    rd.winner = winner;
    if (winner === 'p1') { rd.wins.p1++; A.roundWin(); }
    else if (winner === 'p2') { rd.wins.p2++; A.roundWin(); }
    else if (winner === 'cpu') { rd.wins.cpu = (rd.wins.cpu || 0) + 1; A.roundLose(); }
    else { G.bannerSmall = { text: 'EMPATE NA RODADA', color: '#cfe3f5', life: 120 }; A.roundLose(); }
    var need = C.ROUND_WINS;
    if ((rd.wins.p1 || 0) >= need || (rd.wins.p2 || 0) >= need || (rd.wins.cpu || 0) >= need) rd.matchOver = true;
  }

  function nextRound() {
    var rd = G.round;
    if (rd.matchOver) {
      rd.phase = 'match';
      A.matchWin();
      return;
    }
    rd.num++;
    startRound();
  }

  function backToMenu() {
    G.scene = 'menu';
    G.paused = false;
    A.stopMusic();
    A.menuBack();
  }
  G.toMenu = backToMenu;

  // -------------------------------------------------------------- update
  G.update = function () {
    G.time++;
    if (G.shake > 0) G.shake--;
    if (G.bannerSmall && --G.bannerSmall.life <= 0) G.bannerSmall = null;

    if (G.scene === 'menu') { updateMenu(); clearPressed(); return; }

    if (pressed_('KeyM')) {
      G.muted = !A.toggle();
      G.bannerSmall = { text: G.muted ? 'SOM: OFF' : 'SOM: ON', color: '#cfe3f5', life: 80 };
    }

    if (G.mode === 'duel' && G.round.phase === 'match') {
      if (pressed_('Enter') || pressed_('Space') || pressed_('Escape')) backToMenu();
      updateFX();
      clearPressed();
      return;
    }
    if (G.mode === 'survival' && G.sv.phase === 'over') {
      if (pressed_('Enter') || pressed_('Space') || pressed_('Escape')) backToMenu();
      updateFX();
      clearPressed();
      return;
    }

    if (pressed_('KeyP') || pressed_('Escape')) {
      G.paused = !G.paused;
      if (G.paused) A.stopMusic(); else A.startMusic();
    }
    if (G.paused) { clearPressed(); return; }

    updateFX();
    if (G.mode === 'duel') updateDuel(); else updateSurvival();
    updateTanks();
    updateBullets();
    updatePows();
    clearPressed();
  };

  function updateDuel() {
    var rd = G.round;
    if (rd.phase === 'count') {
      rd.timer--;
      if (rd.timer <= 0) rd.phase = 'play';
      return;
    }
    if (rd.phase === 'over') {
      rd.timer--;
      if (rd.timer <= 0) nextRound();
      return;
    }
    if (rd.phase !== 'play') return;

    rd.elapsed++;
    var aliveE = enemies();
    var aliveP = playerTanks();

    if (G.players === 1) {
      if (aliveE.length === 0) { endRound('p1'); return; }
      if (aliveP.length === 0) { endRound('cpu'); return; }
    } else {
      if (aliveP.length === 1) { endRound(aliveP[0].side); return; }
      if (aliveP.length === 0) { endRound('draw'); return; }
      if (aliveE.length === 0) {
        var k1 = 0, k2 = 0;
        for (var ti = 0; ti < G.tanks.length; ti++) {
          var tk = G.tanks[ti];
          if (tk.kind !== 'player') continue;
          if (tk.side === 'p1') k1 = tk.kills; else k2 = tk.kills;
        }
        endRound(k1 === k2 ? 'draw' : (k1 > k2 ? 'p1' : 'p2'));
        return;
      }
    }
    if (!G.base.alive) { endRound(G.players === 2 ? 'draw' : 'cpu'); return; }

    if (rd.elapsed > C.ROUND_CRUMBLE) {
      if (!rd.crumble) {
        rd.crumble = true;
        A.timeWarn();
        G.bannerSmall = { text: 'AS PAREDES ESTAO CEDENDO!', color: '#ff8a3d', life: 150 };
      }
      if (G.time % 14 === 0) crumbleWall();
    }
    if (rd.elapsed > C.ROUND_DRAW) { endRound('draw'); return; }
    if (G.pows.length === 0 && rd.elapsed % C.PU_INTERVAL === 0) {
      if (G.time > 240) trySpawnPowerup();
    }
  }

  function updateSurvival() {
    var sv = G.sv;
    if (sv.phase === 'break') {
      sv.breakT--;
      if (sv.breakT <= 0) {
        sv.wave++;
        sv.total = 4 + sv.wave * 2;
        sv.spawned = 0;
        sv.spawnTimer = 50;
        sv.phase = 'wave';
      }
      return;
    }

    if (sv.respawn > 0) {
      sv.respawn--;
      if (sv.respawn === 0) {
        sv.lives--;
        if (sv.lives > 0) spawnPlayersSurvival();
      }
    }

    if (!G.base.alive) {
      sv.phase = 'over';
      sv.reason = 'base';
      A.gameOver();
      saveHi();
      return;
    }

    var aliveE = enemies();
    if (sv.spawned < sv.total) {
      var maxAlive = Math.min(1 + sv.wave, 4);
      if (aliveE.length < maxAlive) {
        if (--sv.spawnTimer <= 0) {
          if (spawnEnemySurvival()) sv.spawnTimer = 90 + irnd(80);
          else sv.spawnTimer = 30;
        }
      }
    } else if (aliveE.length === 0) {
      if (playerTanks().length > 0) {
        sv.phase = 'break';
        sv.breakT = 160;
        addScore(200 * sv.wave, C.W / 2, C.FIELD_Y + 80, true);
        A.waveClear();
        return;
      }
    }

    if (--sv.puTimer <= 0) {
      trySpawnPowerup();
      sv.puTimer = C.PU_INTERVAL;
    }

    if (sv.lives <= 0 && playerTanks().length === 0) {
      sv.phase = 'over';
      sv.reason = 'lives';
      A.gameOver();
      saveHi();
    }
  }

  function saveHi() {
    try { localStorage.setItem('pixeltanks.hi', String(G.hi || 0)); } catch (e) { }
  }

  // ------------------------------------------------------------------ menu
  function menuItems(scene) {
    if (scene === 'mode') return ['DUELO', 'SOBREVIVENCIA'];
    if (scene === 'players') return ['1 JOGADOR', '2 JOGADORES'];
    return PT.Maps.list.map(function (m) { return m.name; });
  }

  function updateMenu() {
    var scene = G.menuScene;
    var items = menuItems(scene);
    var idx = G.menuIndex[scene] || 0;
    var moved = 0;
    if (pressed_('ArrowUp') || pressed_('KeyW')) moved = -1;
    if (pressed_('ArrowDown') || pressed_('KeyS')) moved = 1;
    if (pressed_('ArrowLeft') || pressed_('KeyA')) moved = -1;
    if (pressed_('ArrowRight') || pressed_('KeyD')) moved = 1;
    if (moved) {
      idx = (idx + moved + items.length) % items.length;
      G.menuIndex[scene] = idx;
      A.menuMove();
    }
    if (pressed_('Enter') || pressed_('Space')) {
      A.resume();
      A.menuPick();
      if (scene === 'mode') {
        G.mode = idx === 0 ? 'duel' : 'survival';
        G.menuScene = G.mode === 'duel' ? 'players' : 'map';
      } else if (scene === 'players') {
        G.players = idx + 1;
        G.menuScene = 'map';
      } else {
        G.startMatch(G.mode, G.players, idx);
      }
    }
    if (pressed_('Escape') || pressed_('Backspace')) {
      if (scene === 'map') { G.menuScene = G.mode === 'duel' ? 'players' : 'mode'; A.menuBack(); }
      else if (scene === 'players') { G.menuScene = 'mode'; A.menuBack(); }
    }
    if (pressed_('KeyM')) G.muted = !A.toggle();
  }
  // ---------------------------------------------------------------- render
  G.render = function () {
    var ctx = G.ctx;
    ctx.fillStyle = C.COLORS.page;
    ctx.fillRect(0, 0, C.W, C.H);

    if (G.scene === 'menu') { renderMenu(ctx); return; }

    var sx = 0, sy = 0;
    if (G.shake > 0) {
      sx = Math.round((Math.random() - 0.5) * G.shake * 0.7);
      sy = Math.round((Math.random() - 0.5) * G.shake * 0.7);
    }
    ctx.save();
    ctx.translate(sx, sy);
    ctx.drawImage(G.floor, C.FIELD_X, FIELD_T);
    renderWalls(ctx);
    renderBase(ctx);
    renderPows(ctx);
    renderTanks(ctx);
    renderBullets(ctx);
    renderFX(ctx);
    renderPops(ctx);
    ctx.restore();

    renderHUD(ctx);
    renderOverlays(ctx);
  };

  function renderWalls(ctx) {
    for (var key in G.walls) {
      var w = G.walls[key];
      var c = key % COLS, r = (key - c) / COLS;
      var x = C.FIELD_X + c * TILE, y = FIELD_T + r * TILE;
      if (w.type === 'brick') ctx.drawImage(w.damaged ? S.brickBroken : S.brick, x, y);
      else ctx.drawImage(S.steel, x, y);
    }
  }

  function renderBase(ctx) {
    if (!G.base) return;
    if (G.base.alive) {
      ctx.drawImage(G.baseSprite, G.base.x, G.base.y);
    } else {
      ctx.drawImage(G.baseDeadSprite, G.base.x, G.base.y);
      if (G.time % 5 === 0) {
        G.parts.push({
          x: G.base.x + rnd(G.base.w), y: G.base.y + rnd(G.base.h),
          vx: rnd(0.5) - 0.25, vy: -0.4 - rnd(0.5), life: 26, maxLife: 26,
          color: pick(['#ff8a3d', '#ffd24a', '#ff4646']), size: 1, grav: 0
        });
      }
    }
  }

  function drawSpawnStar(ctx, cx, cy, prog) {
    var r = Math.round(2 + prog * 9);
    ctx.fillStyle = prog < 0.5 ? '#8fe3ff' : '#ffffff';
    ctx.fillRect(Math.round(cx - r), Math.round(cy), r * 2, 1);
    ctx.fillRect(Math.round(cx), Math.round(cy - r), 1, r * 2);
    if (r > 4) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.round(cx) - 2, Math.round(cy) - 2, 4, 4);
    }
  }

  function renderTanks(ctx) {
    for (var i = 0; i < G.tanks.length; i++) {
      var t = G.tanks[i];
      if (t.dead) continue;
      if (t.spawnAnim > 0) {
        var prog = 1 - t.spawnAnim / C.SPAWN_ANIM;
        drawSpawnStar(ctx, t.x + TANK / 2, t.y + TANK / 2, Math.abs(Math.sin(prog * Math.PI * 3)));
        continue;
      }
      var pal = S.tank[t.side] || S.tank.p1;
      ctx.drawImage(pal[t.dir], Math.round(t.x), Math.round(t.y));
      if (t.pu.shield > 0) {
        ctx.globalAlpha = 0.5 + 0.45 * Math.sin(G.time * 0.25);
        ctx.drawImage(S.shieldRing, Math.round(t.x - 3), Math.round(t.y - 3));
        ctx.globalAlpha = 1;
      }
      if (t.pu.rapid > 0 && G.time % 10 < 5) {
        ctx.fillStyle = '#ffd24a';
        ctx.fillRect(Math.round(t.x + TANK / 2) - 1, Math.round(t.y) - 4, 2, 2);
      }
    }
  }

  function renderBullets(ctx) {
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      var kind = (b.team === 'p1' || b.team === 'p2') ? ((b.bounces > 0 || b.pierce) ? 'c' : 'p') : 'e';
      var spr = S.bullet[kind];
      if (b.bounces > 0) {
        ctx.globalAlpha = 0.35;
        ctx.drawImage(spr, Math.round(b.x - b.dx * 4), Math.round(b.y - b.dy * 4));
        ctx.globalAlpha = 1;
      }
      ctx.drawImage(spr, Math.round(b.x), Math.round(b.y));
    }
  }

  function renderFX(ctx) {
    for (var i = 0; i < G.rings.length; i++) {
      var r = G.rings[i];
      ctx.globalAlpha = Math.max(0, r.life / r.maxLife);
      ctx.strokeStyle = r.color;
      ctx.lineWidth = r.thick;
      var s = Math.round(r.r);
      ctx.strokeRect(Math.round(r.x) - s - 0.5, Math.round(r.y) - s - 0.5, s * 2 + 1, s * 2 + 1);
      ctx.globalAlpha = 1;
    }
    for (var j = 0; j < G.parts.length; j++) {
      var p = G.parts[j];
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / (p.maxLife * 0.7)));
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      ctx.globalAlpha = 1;
    }
  }

  function renderPops(ctx) {
    for (var i = 0; i < G.pops.length; i++) {
      var p = G.pops[i];
      F.draw(ctx, p.text, Math.round(p.x), Math.round(p.y), p.color, 1, { align: 'center', shadow: '#000' });
    }
  }

  function renderPows(ctx) {
    for (var i = 0; i < G.pows.length; i++) {
      var p = G.pows[i];
      var spr = S.pup[p.type];
      if (p.state === 'play' && (G.time % 24 < 15)) {
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = S.pupFrame[p.type].L;
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(p.x) - 2.5, Math.round(p.y) - 2.5, 15, 15);
        ctx.globalAlpha = 1;
      }
      ctx.drawImage(spr, Math.round(p.x), Math.round(p.y));
    }
  }

  // ------------------------------------------------------------------ HUD
  function miniTank(ctx, x, y, side) {
    var pal = S.tank[side] || S.tank.p1;
    ctx.drawImage(pal.up, x, y);
  }

  function fmtTime(frames) {
    var sec = Math.max(0, Math.ceil(frames / 60));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function pips(ctx, x, y, count, total, color) {
    for (var i = 0; i < total; i++) {
      if (i < count) {
        ctx.fillStyle = color;
        ctx.fillRect(x + i * 8, y, 6, 6);
        ctx.fillStyle = '#fffbe8';
        ctx.fillRect(x + i * 8 + 1, y + 1, 2, 2);
      } else {
        ctx.fillStyle = '#2c3d54';
        ctx.fillRect(x + i * 8, y, 6, 6);
        ctx.fillStyle = '#16202b';
        ctx.fillRect(x + i * 8 + 1, y + 1, 4, 4);
      }
    }
  }

  function puIcons(ctx, right, y, t) {
    var list = [];
    if (t.pu.shield > 0) list.push(['shield', t.pu.shield / PU_DUR]);
    if (t.pu.speed > 0) list.push(['speed', t.pu.speed / PU_DUR]);
    if (t.pu.bounce > 0) list.push(['bounce', t.pu.bounce / (20 * 60)]);
    if (t.pu.rapid > 0) list.push(['rapid', t.pu.rapid / PU_DUR]);
    if (!list.length) return;
    var step = 15;
    var w = list.length * step - 5;
    var sx = right - w;
    for (var i = 0; i < list.length; i++) {
      var ix = sx + i * step;
      ctx.drawImage(S.pup[list[i][0]], ix, y - 3, 10, 10);
      ctx.fillStyle = '#16202b';
      ctx.fillRect(ix, y + 8, 10, 2);
      ctx.fillStyle = S.pupFrame[list[i][0]].L;
      ctx.fillRect(ix, y + 8, Math.max(1, Math.round(10 * list[i][1])), 2);
    }
  }

  function renderHUD(ctx) {
    var col = C.COLORS;
    ctx.fillStyle = col.hudBg;
    ctx.fillRect(0, 0, C.W, C.HUD_TOP_H - 2);
    ctx.fillStyle = col.hudLine;
    ctx.fillRect(0, C.HUD_TOP_H - 2, C.W, 2);

    if (G.mode === 'duel') {
      var rd = G.round;
      miniTank(ctx, 6, 4, 'p1');
      F.draw(ctx, 'P1', 24, 4, col.white, 1, { shadow: '#000' });
      pips(ctx, 40, 5, rd.wins.p1 || 0, C.ROUND_WINS, C.SIDES.p1.accent);

      F.draw(ctx, 'RODADA ' + rd.num, C.W / 2, 3, col.dim, 1, { align: 'center' });
      var mid = rd.phase === 'play' && rd.elapsed < C.ROUND_DRAW ? fmtTime(C.ROUND_DRAW - rd.elapsed) : fmtTime(C.ROUND_DRAW);
      F.draw(ctx, mid, C.W / 2, 12, col.white, 1, { align: 'center', shadow: '#000' });

      var side2 = G.players === 2 ? 'p2' : 'cpu';
      var label = G.players === 2 ? 'P2' : 'CPU';
      miniTank(ctx, C.W - 20, 4, side2);
      F.draw(ctx, label, C.W - 24, 4, col.white, 1, { align: 'right', shadow: '#000' });
      var wins2 = G.players === 2 ? (rd.wins.p2 || 0) : (rd.wins.cpu || 0);
      var lw = F.width(label, 1);
      pips(ctx, C.W - 32 - lw - C.ROUND_WINS * 8, 5, wins2, C.ROUND_WINS, C.SIDES[side2].accent);
    } else {
      var sv = G.sv;
      F.draw(ctx, 'PONTOS', 6, 3, col.dim, 1);
      F.draw(ctx, pad(G.score), 6, 12, col.white, 1, { shadow: '#000' });
      F.draw(ctx, 'ONDA ' + sv.wave, C.W / 2, 3, col.yellow, 1, { align: 'center' });
      var left = Math.max(0, sv.total - sv.spawned) + enemies().length;
      F.draw(ctx, 'RESTAM ' + left, C.W / 2, 12, col.white, 1, { align: 'center', shadow: '#000' });
      F.draw(ctx, 'RECORDE', C.W - 6, 3, col.dim, 1, { align: 'right' });
      F.draw(ctx, pad(G.hi), C.W - 6, 12, col.yellow, 1, { align: 'right', shadow: '#000' });
    }

    var y = C.HUD_BOTTOM_Y - 2;
    ctx.fillStyle = col.hudLine;
    ctx.fillRect(0, y - 5, C.W, 1);
    if (G.mode === 'duel') {
      F.draw(ctx, G.mapName, 6, y, col.dim, 1);
      F.draw(ctx, 'P PAUSA  M SOM', C.W - 6, y, col.dim, 1, { align: 'right' });
    } else {
      miniTank(ctx, 6, y - 3, 'p1');
      var hudX = 24;
      if (G.players === 2) { miniTank(ctx, hudX, y - 3, 'p2'); hudX += 18; }
      F.draw(ctx, 'x' + Math.max(0, G.sv.lives), hudX, y, col.white, 1);
      var lead = null;
      for (var i = 0; i < G.tanks.length; i++) {
        var pt = G.tanks[i];
        if (pt.kind === 'player' && !pt.dead) { if (!lead || pt.side === 'p1') lead = pt; }
      }
      if (lead) puIcons(ctx, C.W - 6, y, lead);
      F.draw(ctx, G.mapName, C.W / 2, y, col.dim, 1, { align: 'center' });
    }
  }

  function pad(n) {
    var s = String(n);
    while (s.length < 6) s = '0' + s;
    return s;
  }

  function dim(ctx, alpha) {
    ctx.fillStyle = 'rgba(4,7,11,' + alpha + ')';
    ctx.fillRect(0, 0, C.W, C.H);
  }

  function banner(ctx, text, sub, color, big) {
    var w = Math.max(F.width(text, big ? 2 : 1) + 26, sub ? F.width(sub, 1) + 26 : 0, 140);
    var x = Math.round((C.W - w) / 2);
    var y = 84;
    var h = sub ? 46 : 30;
    ctx.fillStyle = 'rgba(7,10,14,0.88)';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, 2);
    ctx.fillRect(x, y + h - 2, w, 2);
    F.draw(ctx, text, C.W / 2, y + 8, color, big ? 2 : 1, { align: 'center', shadow: '#000' });
    if (sub) F.draw(ctx, sub, C.W / 2, y + 28, C.COLORS.white, 1, { align: 'center', shadow: '#000' });
  }

  function renderOverlays(ctx) {
    var rd = G.round;

    if (G.bannerSmall) {
      var bs = G.bannerSmall;
      ctx.globalAlpha = Math.min(1, bs.life / 30);
      F.draw(ctx, bs.text, C.W / 2, C.HUD_TOP_H + 8, bs.color, 1, { align: 'center', shadow: '#000' });
      ctx.globalAlpha = 1;
    }

    if (G.paused) {
      dim(ctx, 0.62);
      banner(ctx, 'PAUSA', 'P OU ESC PARA CONTINUAR', C.COLORS.yellow, true);
      return;
    }

    if (G.mode === 'duel') {
      if (rd.phase === 'count') {
        F.draw(ctx, 'RODADA ' + rd.num, C.W / 2, 96, C.COLORS.white, 2, { align: 'center', shadow: '#000' });
        if (rd.timer < 110) {
          var n = Math.ceil(rd.timer / 36);
          F.draw(ctx, n <= 1 ? 'VAI!' : String(n - 1), C.W / 2, 120, C.COLORS.yellow, 3, { align: 'center', shadow: '#000' });
        }
      } else if (rd.phase === 'over') {
        dim(ctx, 0.42);
        var w = rd.winner;
        var txt = w === 'p1' ? 'VERDE VENCE!' : w === 'cpu' ? 'VERMELHO VENCE!' : w === 'p2' ? 'AZUL VENCE!' : 'EMPATE!';
        var cc = w === 'p1' ? C.SIDES.p1.accent : w === 'p2' ? C.SIDES.p2.accent : w === 'cpu' ? C.SIDES.cpu.accent : C.COLORS.dim;
        banner(ctx, txt, 'RODADA ' + rd.num, cc, false);
      } else if (rd.phase === 'match') {
        dim(ctx, 0.74);
        var winSide = (rd.wins.p1 || 0) >= C.ROUND_WINS ? 'p1' : (((G.players === 2 ? rd.wins.p2 : rd.wins.cpu) || 0) >= C.ROUND_WINS ? (G.players === 2 ? 'p2' : 'cpu') : 'p1');
        F.draw(ctx, 'FIM DA PARTIDA', C.W / 2, 44, C.COLORS.white, 2, { align: 'center', shadow: '#000' });
        var nm = winSide === 'p1' ? 'JOGADOR 1 (VERDE)' : winSide === 'p2' ? 'JOGADOR 2 (AZUL)' : 'CPU (VERMELHO)';
        F.draw(ctx, nm + ' VENCEU!', C.W / 2, 72, C.SIDES[winSide].accent, 1, { align: 'center', shadow: '#000' });
        var placar = (rd.wins.p1 || 0) + ' - ' + (G.players === 2 ? (rd.wins.p2 || 0) : (rd.wins.cpu || 0));
        F.draw(ctx, 'PLACAR  ' + placar, C.W / 2, 90, C.COLORS.yellow, 1, { align: 'center', shadow: '#000' });
        ctx.drawImage(S.tank[winSide].up, C.W / 2 - 7, 108);
        if (G.time % 70 < 45) F.draw(ctx, 'ENTER PARA O MENU', C.W / 2, 138, C.COLORS.white, 1, { align: 'center' });
      }
      return;
    }

    if (G.sv.phase === 'break') {
      dim(ctx, 0.45);
      F.draw(ctx, 'ONDA ' + (G.sv.wave + 1), C.W / 2, 84, C.COLORS.yellow, 3, { align: 'center', shadow: '#000' });
      F.draw(ctx, 'PREPARE-SE!', C.W / 2, 122, C.COLORS.white, 1, { align: 'center', shadow: '#000' });
    } else if (G.sv.phase === 'over') {
      dim(ctx, 0.72);
      F.draw(ctx, 'FIM DE JOGO', C.W / 2, 38, C.COLORS.red, 3, { align: 'center', shadow: '#000' });
      var reason = G.sv.reason === 'base' ? 'SUA BASE FOI DESTRUIDA' : 'VOCE FICOU SEM VIDAS';
      F.draw(ctx, reason, C.W / 2, 72, C.COLORS.white, 1, { align: 'center', shadow: '#000' });
      F.draw(ctx, 'PONTOS ' + G.score, C.W / 2, 94, C.COLORS.yellow, 1, { align: 'center', shadow: '#000' });
      F.draw(ctx, 'RECORDE ' + G.hi, C.W / 2, 108, C.COLORS.white, 1, { align: 'center' });
      F.draw(ctx, 'ONDA ALCANCADA ' + G.sv.wave, C.W / 2, 122, C.COLORS.dim, 1, { align: 'center' });
      if (G.time % 70 < 45) F.draw(ctx, 'ENTER PARA O MENU', C.W / 2, 152, C.COLORS.white, 1, { align: 'center' });
    }
  }

  // ---------------------------------------------------------------- menu
  var TIPS = {
    duel: ['DUELO: MELHOR DE ' + C.ROUND_WINS + ' RODADAS.', 'DESTRUA O TANQUE INIMIGO OU A BASE DELE.'],
    survival: ['SOBREVIVENCIA: ONDAS SEM FIM E ITENS.', 'DEFENDA A BASE E NAO PERCA AS 3 VIDAS.']
  };

  function renderMenu(ctx) {
    ctx.drawImage(G.floor, 0, FIELD_T);
    ctx.fillStyle = 'rgba(7,10,14,0.84)';
    ctx.fillRect(0, 0, C.W, C.H);

    F.draw(ctx, 'PIXEL TANKS', C.W / 2, 14, C.COLORS.yellow, 3, { align: 'center', shadow: '#22303f', shadowOff: 1 });
    F.draw(ctx, 'ARCADE DE TANQUES', C.W / 2, 40, C.COLORS.dim, 1, { align: 'center' });

    ctx.drawImage(S.tank.p1.up, 54, 52);
    ctx.drawImage(S.tank.cpu.up, C.W - 68, 52);

    var scene = G.menuScene;
    var items = menuItems(scene);
    var titles = { mode: 'MODO DE JOGO', players: 'JOGADORES', map: 'ARENA' };

    ctx.fillStyle = 'rgba(11,16,23,0.92)';
    ctx.fillRect(58, 74, C.W - 116, 74);
    ctx.strokeStyle = C.COLORS.panelLine;
    ctx.lineWidth = 1;
    ctx.strokeRect(57.5, 73.5, C.W - 115, 75);

    F.draw(ctx, titles[scene], C.W / 2, 79, C.COLORS.dim, 1, { align: 'center' });

    for (var i = 0; i < items.length; i++) {
      var sel = i === (G.menuIndex[scene] || 0);
      var y = 95 + i * 15;
      if (sel && G.time % 40 < 26) F.draw(ctx, '>', C.W / 2 - 72, y, C.COLORS.yellow, 1);
      F.draw(ctx, items[i], C.W / 2, y, sel ? C.COLORS.yellow : C.COLORS.white, 1, { align: 'center', shadow: '#000' });
    }

    var tip = TIPS[G.mode === 'survival' ? 'survival' : 'duel'];
    if (scene === 'mode') {
      F.draw(ctx, 'ESCOLHA UM MODO PARA COMECAR', C.W / 2, 158, C.COLORS.dim, 1, { align: 'center' });
      F.draw(ctx, 'ITENS: ESCUDO  TURBO  RICOCHETE  TIRO RAPIDO', C.W / 2, 170, C.COLORS.dim, 1, { align: 'center' });
    } else {
      F.draw(ctx, tip[0], C.W / 2, 156, C.COLORS.dim, 1, { align: 'center' });
      F.draw(ctx, tip[1], C.W / 2, 168, C.COLORS.dim, 1, { align: 'center' });
    }

    if (G.time % 70 < 42) F.draw(ctx, 'ENTER PARA ESCOLHER', C.W / 2, 184, C.COLORS.white, 1, { align: 'center' });
    var hint = G.players === 2 ? 'SETAS+ESPACO = P1    WASD+ENTER = P2' : 'SETAS OU WASD MOVER    ESPACO ATIRAR';
    F.draw(ctx, hint, C.W / 2, 198, C.COLORS.dim, 1, { align: 'center' });
    F.draw(ctx, 'ESC VOLTAR   P PAUSA   M SOM   F TELA CHEIA', C.W / 2, 209, C.COLORS.dim, 1, { align: 'center' });
  }

  // ---------------------------------------------------------------- API
  G.toggleMute = function () {
    G.muted = !A.toggle();
    return G.muted;
  };

  G.autoPause = function () {
    if (G.scene !== 'game' || G.paused) return;
    if (G.mode === 'duel' && (G.round.phase === 'match' || G.round.phase === 'over')) return;
    if (G.mode === 'survival' && G.sv.phase === 'over') return;
    G.paused = true;
    A.stopMusic();
  };

  G.hudInfo = function () {
    var info = {
      scene: G.scene, paused: G.paused, muted: G.muted,
      map: G.mapName || '-',
      modeLabel: G.mode === 'duel' ? (G.players === 2 ? 'DUELO 2P' : 'DUELO VS CPU') : 'SOBREVIVENCIA',
      status: 'MENU', scoreText: pad(G.score), hiText: pad(G.hi), waveText: '-',
      p1: { name: 'P1 VERDE', lives: '-', score: '-', wins: '-' },
      p2: { name: G.players === 2 ? 'P2 AZUL' : 'CPU VERMELHO', lives: '-', score: '-', wins: '-' }
    };
    if (G.scene === 'menu') { info.map = '-'; return info; }

    if (G.mode === 'duel') {
      var rd = G.round;
      var k1 = 0, k2 = 0, a1 = 0, a2 = 0;
      for (var i = 0; i < G.tanks.length; i++) {
        var t = G.tanks[i];
        if (t.kind !== 'player') continue;
        if (t.side === 'p1') { k1 = t.kills; if (!t.dead) a1 = 1; }
        else { k2 = t.kills; if (!t.dead) a2 = 1; }
      }
      info.status = rd.phase === 'play' ? 'RODADA ' + rd.num : rd.phase === 'count' ? 'CONTAGEM' : rd.phase === 'over' ? 'FIM DA RODADA' : 'FIM DA PARTIDA';
      if (G.paused) info.status = 'PAUSA';
      info.p1.lives = a1 ? 'ATIVO' : 'DESTRUIDO';
      info.p2.lives = G.players === 2 ? (a2 ? 'ATIVO' : 'DESTRUIDO') : (enemies().length ? 'ATIVO' : 'DESTRUIDO');
      info.p1.score = String(k1);
      info.p2.score = G.players === 2 ? String(k2) : String(enemies().length ? enemies()[0].pts : 0);
      info.p1.wins = dots(rd.wins.p1 || 0, C.ROUND_WINS);
      info.p2.wins = dots(G.players === 2 ? (rd.wins.p2 || 0) : (rd.wins.cpu || 0), C.ROUND_WINS);
      info.waveText = '-';
      info.scoreText = String((rd.wins.p1 || 0) + '-' + (G.players === 2 ? (rd.wins.p2 || 0) : (rd.wins.cpu || 0)));
      info.hiText = 'RODADA ' + rd.num;
    } else {
      var sv = G.sv;
      info.status = sv.phase === 'over' ? 'FIM DE JOGO' : sv.phase === 'break' ? 'INTERVALO' : 'EM JOGO';
      if (G.paused) info.status = 'PAUSA';
      info.p1.lives = hearts(sv.lives);
      info.p1.score = pad(G.score);
      info.p1.wins = '-';
      info.p2.name = 'INIMIGOS';
      info.p2.lives = String(enemies().length);
      info.p2.score = String(G.kills);
      info.p2.wins = 'ONDA ' + sv.wave;
      info.scoreText = pad(G.score);
      info.hiText = pad(G.hi);
      info.waveText = String(sv.wave);
    }
    return info;
  };

  function dots(n, total) {
    var s = '';
    for (var i = 0; i < total; i++) s += i < n ? '\u25CF' : '\u25CB';
    return s;
  }

  function hearts(n) {
    if (n <= 0) return 'nenhuma';
    var s = '';
    for (var i = 0; i < n; i++) s += '\u2665';
    return s;
  }

  PT.Game = G;
})(window.PT = window.PT || {});
