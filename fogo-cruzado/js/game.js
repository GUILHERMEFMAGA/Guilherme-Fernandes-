/* FOGO CRUZADO - motor: esquadrao tattico com visao limitada, cobertura e supressao */
(function (PT) {
  'use strict';

  var C = PT.C, U = PT.U, COL = PT.COL, TILES = PT.TILES;
  var WEAPONS = PT.WEAPONS, ROLES = PT.ROLES, Vis = PT.Vis, Tex = PT.Tex, Audio = PT.Audio;
  var TILE = C.TILE;
  var DT = 1 / 60;

  var G = {
    scene: 'menu', menuScene: 'mode', menuIndex: { mode: 0, players: 0, map: 0 },
    time: 0, shake: 0, paused: false, players: 1, mode: 'solo', mapIndex: 0, map: null,
    units: [], bullets: [], grenades: [], smokes: [], parts: [], casings: [], floats: [], feed: [],
    objectives: [], mission: null, grid: [], zone: null,
    score: 0, kills: 0, shots: 0, hits: 0, muted: false, over: false, result: '', alarm: 0,
    control: null, squadMode: 'seguir', orderPoint: null, alertLevel: 0
  };
  G.squadOrders = { mode: 'seguir', point: null };

  // --------------------------------------------------------------- helpers
  function key(r, c) { return r * C.COLS + c; }
  function inBounds(c, r) { return c >= 0 && c < C.COLS && r >= 0 && r < C.ROWS; }
  function cellAt(c, r) { return inBounds(c, r) ? G.grid[key(r, c)] : null; }
  function cellAtPos(x, y) { return cellAt(Math.floor(x / TILE), Math.floor(y / TILE)); }
  function solidAtPos(x, y) {
    var cell = cellAtPos(x, y);
    return !cell || cell.solid;
  }
  function blocksLos(c, r) {
    var cell = cellAt(c, r);
    return !cell || cell.sight;
  }
  function isWalkable(c, r) {
    var cell = cellAt(c, r);
    return cell && !cell.solid;
  }

  G.init = function (canvas) {
    G.canvas = canvas;
    G.ctx = canvas.getContext('2d');
    if (G.ctx) G.ctx.imageSmoothingEnabled = false;
    G.mouse = { x: C.W / 2, y: C.H / 2 };
    G.input = { p1: {}, p2: {} };
    try { G.best = parseInt(window.localStorage.getItem('fogocruzado.best') || '0', 10) || 0; } catch (e) { G.best = 0; }
  };

  // ------------------------------------------------------------ carregar mapa
  G.loadMap = function (index) {
    var map = PT.Maps.get(index);
    G.map = map;
    G.mapIndex = index;
    G.grid = [];
    G.objectives = [];
    var info = PT.Maps.analyze(map);
    G.spawns = info.spawns;
    G.enemySpawns = info.enemies;
    G.zone = info.hold ? {
      x: info.hold.c1 * TILE, y: info.hold.r1 * TILE,
      w: (info.hold.c2 - info.hold.c1 + 1) * TILE, h: (info.hold.r2 - info.hold.r1 + 1) * TILE
    } : null;

    for (var r = 0; r < C.ROWS; r++) {
      for (var c = 0; c < C.COLS; c++) {
        var ch = map.rows[r][c];
        var def = TILES[ch] || TILES['.'];
        var cell = {
          c: c, r: r, ch: ch, mat: def.n,
          solid: !!(def.sight || def.bullet),
          sight: !!def.sight, bullet: !!def.bullet,
          cover: def.cover || 0,
          hp: def.hp || 0, maxHp: def.hp || 0,
          ricochet: def.ricochet === undefined ? 0.25 : def.ricochet,
          pen: def.pen === undefined ? 1 : def.pen,
          destructible: !!def.destructible,
          objective: !!def.objective,
          conceal: def.conceal || 0
        };
        if (cell.objective) {
          G.objectives.push(cell);
        }
        G.grid.push(cell);
      }
    }

    // chao pre-renderizado + camada de decalques
    var g = PT.canvas(C.W, C.H);
    Tex.buildGround(map, g);
    G.ground = g.cv;
    var d = PT.canvas(C.W, C.H);
    G.decalCanvas = d.cv;
    G.decalCtx = d.ctx;

    // mapa de visibilidade
    Vis.init();
    Vis.blocksSight = new Uint8Array(C.COLS * C.ROWS);
    for (var i = 0; i < G.grid.length; i++) Vis.blocksSight[i] = G.grid[i].sight ? 1 : 0;
    G.smokes.length = 0;
  };

  // ---------------------------------------------------------- pathfinding A*
  function heapPush(h, item) {
    h.push(item);
    var i = h.length - 1;
    while (i > 0) {
      var p = (i - 1) >> 1;
      if (h[p].f <= h[i].f) break;
      var t = h[p]; h[p] = h[i]; h[i] = t; i = p;
    }
  }
  function heapPop(h) {
    var top = h[0], last = h.pop();
    if (h.length) {
      h[0] = last;
      var i = 0;
      for (;;) {
        var l = i * 2 + 1, r = l + 1, m = i;
        if (l < h.length && h[l].f < h[m].f) m = l;
        if (r < h.length && h[r].f < h[m].f) m = r;
        if (m === i) break;
        var t = h[m]; h[m] = h[i]; h[i] = t; i = m;
      }
    }
    return top;
  }

  var _came, _closed, _open, _best;
  function findPath(sc, sr, tc, tr, budget) {
    budget = budget || 2500;
    if (!inBounds(tc, tr) || !isWalkable(tc, tr)) {
      // tenta vizinho mais proximo
      var found = false;
      for (var rad = 1; rad <= 3 && !found; rad++) {
        for (var dr = -rad; dr <= rad && !found; dr++) {
          for (var dc = -rad; dc <= rad && !found; dc++) {
            if (isWalkable(tc + dc, tr + dr)) { tc += dc; tr += dr; found = true; }
          }
        }
      }
      if (!found) return null;
    }
    if (sc === tc && sr === tr) return [];
    var n = C.COLS * C.ROWS;
    if (!_came || _came.length !== n) {
      _came = new Int32Array(n); _closed = new Uint8Array(n); _open = [];
    }
    _came.fill(-1); _closed.fill(0); _open.length = 0;
    var start = key(sr, sc);
    _came[start] = start;
    heapPush(_open, { i: start, f: 0, g: 0 });
    var goal = key(tr, tc), used = 0, bestI = start, bestH = 1e9;

    while (_open.length && used < budget) {
      var cur = heapPop(_open);
      if (_closed[cur.i]) continue;
      _closed[cur.i] = 1; used++;
      if (cur.i === goal) { bestI = cur.i; bestH = 0; break; }
      var cc = cur.i % C.COLS, cr = (cur.i - cc) / C.COLS;
      var hh = Math.abs(cc - tc) + Math.abs(cr - tr);
      if (hh < bestH) { bestH = hh; bestI = cur.i; }
      for (var d = 0; d < 8; d++) {
        var dxy = DIRS8[d];
        var nc = cc + dxy.x, nr = cr + dxy.y;
        if (!isWalkable(nc, nr)) continue;
        if (dxy.x && dxy.y) {
          if (!isWalkable(cc + dxy.x, cr) || !isWalkable(cc, cr + dxy.y)) continue;
        }
        var ni = key(nr, nc);
        if (_closed[ni]) continue;
        var step = dxy.x && dxy.y ? 1.42 : 1;
        var g2 = cur.g + step;
        var ng = Math.abs(nc - tc) + Math.abs(nr - tr);
        heapPush(_open, { i: ni, f: g2 + ng * 1.05, g: g2 });
        if (_came[ni] === -1 || _came[ni] === undefined) _came[ni] = cur.i;
      }
    }
    // reconstrói
    var path = [], node = bestI, guard = 0;
    if (bestH > 3 && bestI === start) return null;
    while (node !== start && guard++ < 400) {
      var c2 = node % C.COLS, r2 = (node - c2) / C.COLS;
      path.push({ x: c2 * TILE + TILE / 2, y: r2 * TILE + TILE / 2 });
      var prev = _came[node];
      if (prev === -1 || prev === undefined || prev === node) break;
      node = prev;
    }
    path.reverse();
    return path;
  }
  var DIRS8 = [
    { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 },
    { x: 1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: -1, y: -1 }
  ];

  // -------------------------------------------------------------- unidades
  var unitId = 0;
  function makeUnit(opts) {
    var role = ROLES[opts.role] || ROLES.soldado;
    var wKey = opts.weapon || role.w;
    var wdef = WEAPONS[wKey];
    var u = {
      id: ++unitId,
      team: opts.team,
      isPlayer: !!opts.isPlayer,
      controlled: !!opts.isPlayer,
      role: opts.role,
      roleLabel: role.label,
      name: opts.name || U.soldierName(),
      weapon: wKey, wdef: wdef,
      x: opts.x, y: opts.y, angle: opts.angle === undefined ? -Math.PI / 2 : opts.angle,
      hp: role.hp, maxHp: role.hp,
      radius: C.UNIT_R,
      speed: 96 * (role.speed || 1),
      vision: role.view || ROLES.soldado.view,
      acc: role.acc, react: role.react, aggr: role.aggr,
      mag: wdef.mag, reloading: 0, cooldown: 0, trigger: false,
      dead: false, downed: false, bleed: 0, reviveProgress: 0,
      supp: 0, retreating: false,
      prone: false, sprinting: false,
      path: null, pathI: 0, repath: 0,
      target: null, targetSeen: 0, reaction: 0, lastKnown: null,
      state: opts.team === 'enemy' ? 'patrol' : 'follow',
      patrol: [] , patrolI: 0, thinkT: U.rnd(0.4),
      burst: 0, burstPause: 0, fireT: 0, aim: opts.angle === undefined ? -Math.PI / 2 : opts.angle,
      grenades: 2, smokes: 1,
      coverFactor: 1, coverT: 0,
      footT: 0, muzzle: 0, hitFlash: 0,
      kills: 0, dmgDealt: 0,
      orderPoint: null, holdPos: null, followOffset: opts.followOffset || { x: 0, y: 0 },
      chatter: 0, spawnX: opts.x, spawnY: opts.y
    };
    return u;
  }

  G.spawnMission = function (index, players) {
    G.players = players === 2 ? 2 : 1;   // o painel e o rotulo do modo seguem este valor
    G.loadMap(index);
    G.units.length = 0;
    G.bullets.length = 0;
    G.grenades.length = 0;
    G.smokes.length = 0;
    G.parts.length = 0;
    G.casings.length = 0;
    G.floats.length = 0;
    G.feed.length = 0;
    G.score = 0; G.kills = 0; G.shots = 0; G.hits = 0;
    G.over = false; G.result = ''; G.time = 0; G.shake = 0;
    G.alertLevel = 0;

    var mission = G.map.mission;
    G.mission = {
      type: mission.type,
      targets: mission.targets,
      holdTime: mission.holdTime || 75,
      holdLeft: mission.holdTime || 75,
      held: 0,
      timeLimit: mission.type === 'hold' ? 240 : 420,
      left: mission.type === 'hold' ? 240 : 420,
      done: 0,
      waveT: 18,
      startEnemies: G.map.enemies
    };

    // esquadrao aliado
    var sp = G.spawns.p1;
    var offsets = [
      { x: 0, y: 0 }, { x: -30, y: 16 }, { x: 30, y: 16 }, { x: -16, y: 34 }
    ];
    var roles = ['soldado', 'fuzil', 'recruta', 'dmr'];
    var weapons = ['fuzil', 'fuzil', 'smg', 'dmr'];
    var names = ['VOCE', U.soldierName('CB.'), U.soldierName('SD.'), U.soldierName('SD.')];
    for (var i = 0; i < 4; i++) {
      var px = U.clamp(sp.x + offsets[i].x, 16, C.W - 16);
      var py = U.clamp(sp.y + offsets[i].y, 16, C.H - 16);
      var u = makeUnit({
        team: 'ally', role: i === 3 ? 'atirador' : 'soldado', weapon: weapons[i],
        x: px, y: py, angle: -Math.PI / 2, name: names[i],
        isPlayer: i === 0 && players >= 1
      });
      u.followOffset = offsets[i];
      u.squadIndex = i;
      if (i === 1 && players === 2) { u.player2 = true; u.controlled = true; }
      G.units.push(u);
    }
    G.control = G.units[0];
    G.squadOrders.mode = 'seguir';

    // patrulhas inimigas
    var spawns = G.enemySpawns.slice();
    var total = G.map.enemies;
    var count = 0, gi = 0;
    while (count < total && spawns.length) {
      var s = spawns[gi % spawns.length];
      gi++;
      var roleName = (count % 5 === 4) ? 'atirador' : (count % 3 === 0 ? 'oficial' : 'soldado');
      var e = makeUnit({
        team: 'enemy', role: roleName, x: s.x + U.rnd(-14, 14), y: s.y + U.rnd(-14, 14),
        angle: U.rnd(Math.PI * 2)
      });
      e.patrol = [];
      for (var p = 0; p < 3; p++) {
        var pc = U.clamp(Math.floor(s.x / TILE) + U.rndi(-6, 6), 1, C.COLS - 2);
        var pr = U.clamp(Math.floor(s.y / TILE) + U.rndi(-5, 5), 1, C.ROWS - 2);
        if (isWalkable(pc, pr)) e.patrol.push({ x: pc * TILE + 12, y: pr * TILE + 12 });
      }
      e.patrolI = 0;
      G.units.push(e);
      count++;
    }

    Vis.clear();
    Vis.compute(G.units);
    Audio.startAmbience();
    G.scene = 'game';
    G.paused = false;
    addFeed('Missao: ' + G.map.name, COL.info);
  };

  // ------------------------------------------------------- colisao e movimento
  function collideCircle(x, y, r) {
    // retorna a posicao corrigida contra as celulas solidas
    var c1 = Math.floor((x - r) / TILE), c2 = Math.floor((x + r) / TILE);
    var r1 = Math.floor((y - r) / TILE), r2 = Math.floor((y + r) / TILE);
    for (var c = c1; c <= c2; c++) {
      for (var rr = r1; rr <= r2; rr++) {
        if (!isWalkable(c, rr)) {
          var cx = c * TILE + TILE / 2, cy = rr * TILE + TILE / 2;
          var dx = x - cx, dy = y - cy;
          var ox = Math.abs(dx) - (TILE / 2 + r - 2);
          var oy = Math.abs(dy) - (TILE / 2 + r - 2);
          if (ox < 0 && oy < 0) {
            if (ox > oy) x += dx > 0 ? -ox : ox;
            else y += dy > 0 ? -oy : oy;
          }
        }
      }
    }
    return { x: x, y: y };
  }

  function moveUnit(u, dx, dy) {
    var nx = U.clamp(u.x + dx, 8, C.W - 8), ny = U.clamp(u.y + dy, 8, C.H - 8);
    var res = collideCircle(nx, u.y, u.radius);
    u.x = res.x;
    res = collideCircle(u.x, ny, u.radius);
    u.y = res.y;
    // separa de outros soldados
    for (var i = 0; i < G.units.length; i++) {
      var o = G.units[i];
      if (o === u || o.dead) continue;
      var d = U.dist(u.x, u.y, o.x, o.y);
      var min = u.radius + o.radius + 2;
      if (d > 0.001 && d < min) {
        var push = Math.min((min - d) * 0.32, 0.8);
        var ax = (u.x - o.x) / d, ay = (u.y - o.y) / d;
        var r2 = collideCircle(u.x + ax * push, u.y + ay * push, u.radius);
        u.x = r2.x; u.y = r2.y;
      }
    }
  }

  function terrainSlow(u) {
    var cell = cellAtPos(u.x, u.y);
    var s = 1;
    if (cell) {
      if (cell.ch === 'g') s *= 0.88;
      if (cell.ch === ',') s *= 0.95;
    }
    if (u.prone) s *= 0.5;
    if (u.sprinting) s *= 1.45;
    if (u.supp > 0.45) s *= 0.85;
    return s;
  }

  function followPath(u, dt) {
    if (!u.path || u.pathI >= u.path.length) return false;
    var wp = u.path[u.pathI];
    var dx = wp.x - u.x, dy = wp.y - u.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    if (d < 8) {
      u.pathI++;
      if (u.pathI >= u.path.length) { u.path = null; return false; }
      return true;
    }
    var sp = u.speed * terrainSlow(u) * dt;
    var fx = dx / d, fy = dy / d;
    var before = { x: u.x, y: u.y };
    moveUnit(u, fx * sp, fy * sp);
    var moved = U.dist(before.x, before.y, u.x, u.y);
    if (moved < sp * 0.3) {
      // desliza pela parede
      moveUnit(u, -fy * sp * 0.8, fx * sp * 0.8);
      u.stuckT = (u.stuckT || 0) + dt;
      if (u.stuckT > 0.5) { u.path = null; u.stuckT = 0; }
    } else u.stuckT = 0;
    u.walking = moved > 0.05;
    return true;
  }

  function goTo(u, tx, ty) {
    var sc = Math.floor(u.x / TILE), sr = Math.floor(u.y / TILE);
    var tc = Math.floor(tx / TILE), tr = Math.floor(ty / TILE);
    u.path = findPath(sc, sr, tc, tr);
    u.pathI = 0;
    u.orderPoint = { x: tx, y: ty };
    return !!u.path;
  }

  // --------------------------------------------------------------- cobertura
  /** 1 = exposto, 0.4 = bem protegido pelo obstaculo entre os dois pontos */
  function coverFactor(u, fx, fy) {
    var dx = u.x - fx, dy = u.y - fy;
    var d = Math.sqrt(dx * dx + dy * dy);
    if (d < 4) return 1;
    var steps = Math.min(40, Math.max(4, Math.floor(d / 12)));
    var best = 0;
    for (var i = 1; i < steps; i++) {
      var t = i / steps;
      var px = fx + dx * t, py = fy + dy * t;
      var c = Math.floor(px / TILE), r = Math.floor(py / TILE);
      for (var oc = -1; oc <= 1; oc++) {
        for (var or = -1; or <= 1; or++) {
          var cell = cellAt(c + oc, r + or);
          if (!cell || !cell.solid) continue;
          if (cell.cover < 1) continue;
          var cx = (c + oc) * TILE + TILE / 2, cy = (r + or) * TILE + TILE / 2;
          var dist = Math.abs(px - cx) + Math.abs(py - cy);
          var closeness = Math.max(0, 1 - dist / 22) * Math.min(1, cell.cover / 2);
          if (closeness > best) best = closeness;
        }
      }
    }
    return 1 - best * 0.62;
  }

  // ------------------------------------------------------- visao dos soldados
  function losBetween(a, b) {
    return Vis.los(a.x, a.y, b.x, b.y);
  }

  function nearestVisibleEnemy(u, maxDist) {
    var best = null, bestScore = 1e9;
    var range = maxDist || u.vision;
    for (var i = 0; i < G.units.length; i++) {
      var o = G.units[i];
      if (o.team === u.team || o.dead || o.downed) continue;
      var d = U.dist(u.x, u.y, o.x, o.y);
      if (d > range) continue;
      if (!losBetween(u, o)) continue;
      // prioridade: quem esta atirando, o alvo atual (histerese) e quem ja foi visto
      var score = d;
      if (o.muzzle > 0) score -= 110;
      if (o.controlled) score -= 55;
      if (o === u.target) score -= 70;
      if (u.lastKnown && U.dist(o.x, o.y, u.lastKnown.x, u.lastKnown.y) < 60) score -= 30;
      if (score < bestScore) { bestScore = score; best = o; }
    }
    return best;
  }
  G.nearestVisibleEnemy = nearestVisibleEnemy;

  function hearShot(x, y, loudness) {
    for (var i = 0; i < G.units.length; i++) {
      var u = G.units[i];
      if (u.dead || u.team !== 'enemy') continue;
      var d = U.dist(u.x, u.y, x, y);
      if (d < loudness) {
        u.alert = Math.max(u.alert || 0, 1 - d / loudness);
        if (u.state === 'patrol') u.state = 'alert';
        if (!u.lastKnown) u.lastKnown = { x: x, y: y };
      }
    }
  }
  G.hearShot = hearShot;

  // ----------------------------------------------------------- tiro (comum)
  function startReload(u) {
    if (u.reloading > 0 || u.mag >= u.wdef.mag) return;
    u.reloading = u.wdef.reload;
    if (u.team === 'ally') { Audio.reload(); say(u, 'RECARREGANDO!', 8); }
  }

  function tryFire(u, target) {
    if (u.reloading > 0 || u.dead || u.downed) return false;
    if (u.mag <= 0) { startReload(u); return false; }
    if (u.cooldown > 0) return false;
    if (u.wdef.auto && u.burst > 0 && u.burstPause > 0) return false;

    var interval = 60 / u.wdef.rpm;
    if (u.wdef.burst > 1) {
      if (u.burst <= 0) { u.burst = u.wdef.burst; }
      u.burst--;
      if (u.burst <= 0) u.burstPause = U.rnd(0.35, 0.95) * (u.supp > 0.4 ? 1.6 : 1);
    } else {
      u.burstPause = U.rnd(0.5, 1.2) * (u.supp > 0.4 ? 1.5 : 1);
    }
    u.cooldown = interval * u.wdef.burst;

    // erro de mira
    var spread = u.wdef.spread;
    if (u.supp > 0.3) spread *= 1 + u.supp * 1.1;
    if (u.walking) spread *= 1.5;
    if (u.sprinting) spread *= 2.2;
    if (!u.isPlayer && !u.controlled) spread *= (1.35 - (u.acc || 0.7));
    if (u.team === 'enemy' && u.reaction > 0) return false;
    spread += u.aimError || 0;
    var aimAngle = u.angle + (U.rng() - 0.5) * (spread * Math.PI / 180) * 2;
    if (target) {
      var ta = Math.atan2(target.y - u.y, target.x - u.x);
      aimAngle = U.turnTo(aimAngle, ta, (spread * Math.PI / 180) * 0.6);
    }
    G.spawnBullet(u, aimAngle);
    u.mag--;
    u.muzzle = 0.06;
    G.shots++;
    G.shake = Math.max(G.shake, u.controlled || u.isPlayer ? 1.6 : 0.6);
    if (u.mag === 0) startReload(u);
    return true;
  }

  // ------------------------------------------------------ controle do jogador
  function updateControlled(u, pad, dt) {
    if (u.dead || u.downed) return;
    u.controlled = true;

    // mira: mouse (P1) ou auto-mira (P2)
    if (pad.aim) {
      var want = Math.atan2(pad.aim.y - u.y, pad.aim.x - u.x);
      u.aimAngle = want;
      var turn = 9 * dt;
      u.angle = U.turnTo(u.angle, want, turn);
    } else if (pad.autoAim) {
      var t = nearestVisibleEnemy(u, Math.max(u.vision, 320)) || u.target;
      if (t) {
        var ta = Math.atan2(t.y - u.y, t.x - u.x);
        u.aimAngle = ta;
        u.angle = U.turnTo(u.angle, ta, 4 * dt * Math.PI);
      } else if (u.walking) {
        u.angle = U.turnTo(u.angle, u.walkAngle, 6 * dt);
      }
    }

    // movimento
    var mx = (pad.right ? 1 : 0) - (pad.left ? 1 : 0);
    var my = (pad.down ? 1 : 0) - (pad.up ? 1 : 0);
    u.prone = !!pad.prone;
    u.sprinting = !!pad.sprint && (mx || my) && !u.prone;
    if (mx || my) {
      var len = Math.sqrt(mx * mx + my * my) || 1;
      var sp = u.speed * terrainSlow(u) * dt;
      moveUnit(u, mx / len * sp, my / len * sp);
      u.walking = true;
      u.walkAngle = Math.atan2(my, mx);
      u.footT -= dt;
      if (u.footT <= 0) {
        Audio.footstep(!u.prone);
        u.footT = u.sprinting ? 0.28 : (u.prone ? 0.7 : 0.42);
        if (u.sprinting || (!u.prone && u.team === 'ally')) {
          // correr faz barulho: inimigos por perto ouvem
          hearShot(u.x, u.y, u.sprinting ? 220 : 130);
        }
      }
    } else u.walking = false;

    // tiro
    if (u.reloading > 0) u.reloading -= dt;
    if (u.cooldown > 0) u.cooldown -= dt;
    if (u.burstPause > 0) u.burstPause -= dt;
    if (pad.fire && (u.wdef.auto || u.fireTap !== true)) {
      if (tryFire(u, null)) u.fireTap = true;
    }
    if (!pad.fire) u.fireTap = false;

    // granada / fumaca
    if (pad.grenade && u.grenades > 0 && u.throwCd <= 0) {
      u.grenades--;
      u.throwCd = 0.8;
      G.throwGrenade(u, pad.aim || { x: u.x + Math.cos(u.angle) * 120, y: u.y + Math.sin(u.angle) * 120 }, 'frag');
    }
    if (pad.smoke && u.smokes > 0 && u.throwCd <= 0) {
      u.smokes--;
      u.throwCd = 0.8;
      G.throwGrenade(u, pad.aim || { x: u.x + Math.cos(u.angle) * 140, y: u.y + Math.sin(u.angle) * 140 }, 'smoke');
    }
    if (u.throwCd > 0) u.throwCd -= dt;
  }

  // ------------------------------------------------------- IA dos aliados
  function squadTarget(u) {
    return nearestVisibleEnemy(u, u.vision);
  }

  function updateAllyAI(u, dt) {
    if (u.dead) return;
    // temporizadores
    if (u.reloading > 0) u.reloading -= dt;
    if (u.cooldown > 0) u.cooldown -= dt;
    if (u.burstPause > 0) u.burstPause -= dt;
    if (u.repath > 0) u.repath -= dt;

    // socorre companheiro caido: tem prioridade sobre o resto
    if (u.reviveTarget && !u.reviveTarget.downed) u.reviveTarget = null;
    if (u.reviveTarget) {
      if (U.dist(u.x, u.y, u.reviveTarget.x, u.reviveTarget.y) < 32) {
        u.walking = false;
        return;                     // o progresso e' aplicado em updateUnits
      }
      u.reviveTarget = null;
    }

    // combate: mirar e atirar sem esperar o proximo "pensamento"
    if (u.target && !u.target.dead && !u.target.downed) {
      var seen = Vis.los(u.x, u.y, u.target.x, u.target.y);
      u.targetSeen = seen ? 0 : u.targetSeen + dt;
      if (seen) {
        var fa = Math.atan2(u.target.y - u.y, u.target.x - u.x);
        u.angle = U.turnTo(u.angle, fa, 7 * dt);
        if (u.cooldown <= 0 && u.burstPause <= 0) tryFire(u, u.target);
      }
    }

    // seguir o caminho atual
    if (u.path) {
      if (followPath(u, dt)) {
        if (u.thinkT > 0) { u.thinkT -= dt; return; }
      }
    }

    if (u.thinkT > 0) { u.thinkT -= dt; return; }
    u.thinkT = U.rnd(0.22, 0.4);

    // procura alguem para socorrer
    var downedMate = null;
    for (var i = 0; i < G.units.length; i++) {
      var m = G.units[i];
      if (m.team !== 'ally' || !m.downed || m.dead || m === u) continue;
      if (!downedMate || U.dist(u.x, u.y, m.x, m.y) < U.dist(u.x, u.y, downedMate.x, downedMate.y)) downedMate = m;
    }
    if (downedMate && (!u.target || u.supp > 0.7)) {
      var dd = U.dist(u.x, u.y, downedMate.x, downedMate.y);
      if (dd < 30) { u.reviveTarget = downedMate; return; }
      if (!u.path || u.repath <= 0) { goTo(u, downedMate.x, downedMate.y); u.repath = 1.5; }
      return;
    }

    // fumaca defensiva
    if (u.supp > 0.6 && u.hp < u.maxHp * 0.5 && u.smokes > 0 && U.chance(0.35)) {
      u.smokes--;
      G.throwGrenade(u, { x: u.x + Math.cos(u.angle) * 70, y: u.y + Math.sin(u.angle) * 70 }, 'smoke');
      say(u, 'JOGANDO FUMACA!');
      return;
    }

    var t = squadTarget(u);
    u.target = t;
    if (t) {
      u.lastKnown = { x: t.x, y: t.y };
      var cf = coverFactor(u, t.x, t.y);
      if (cf > 0.72 && u.supp > 0.25 && (!u.path || u.repath <= 0)) {
        var spot = findCoverNear(u, t);
        if (spot) { goTo(u, spot.x, spot.y); u.repath = 1.6; return; }
      }
      if (u.grenades > 0 && U.chance(0.05) && U.dist(u.x, u.y, t.x, t.y) < 190) {
        u.grenades--;
        G.throwGrenade(u, { x: t.x, y: t.y }, 'frag');
        return;
      }
    }

    // sem alvo: cumprir ordens
    var goal = null;
    if (G.squadOrders.mode === 'posicao' && G.squadOrders.point) {
      goal = { x: u.x, y: u.y };
      if (u.holdPos && U.dist(u.x, u.y, u.holdPos.x, u.holdPos.y) > 60) goal = u.holdPos;
    } else if (G.squadOrders.mode === 'avancar' && G.squadOrders.point) {
      goal = G.squadOrders.point;
    } else {
      var lead = (G.control && !G.control.dead && G.control !== u) ? G.control : null;
      if (lead) {
        var ang = lead.angle + Math.PI / 2;
        goal = {
          x: U.clamp(lead.x + Math.cos(ang) * u.followOffset.x - Math.cos(lead.angle) * u.followOffset.y, 20, C.W - 20),
          y: U.clamp(lead.y + Math.sin(ang) * u.followOffset.x - Math.sin(lead.angle) * u.followOffset.y, 20, C.H - 20)
        };
      }
    }
    if (goal) {
      var d = U.dist(u.x, u.y, goal.x, goal.y);
      if (d > 52) {
        if (!u.path || u.repath <= 0) { goTo(u, goal.x, goal.y); u.repath = U.rnd(1.1, 2.0); }
      } else if (d < 34) u.path = null;
    }
    if (!u.path && u.lastKnown) {
      u.angle = U.turnTo(u.angle, Math.atan2(u.lastKnown.y - u.y, u.lastKnown.x - u.x), 1.6 * dt);
    }
  }

  function findCoverNear(u, threat) {
    var best = null, bestScore = -1e9;
    var uc = Math.floor(u.x / TILE), ur = Math.floor(u.y / TILE);
    for (var dc = -7; dc <= 7; dc++) {
      for (var dr = -7; dr <= 7; dr++) {
        var c = uc + dc, r = ur + dr;
        if (!isWalkable(c, r)) continue;
        var x = c * TILE + 12, y = r * TILE + 12;
        var d = U.dist(x, y, u.x, u.y);
        if (d > 190) continue;
        var cf = coverFactor({ x: x, y: y }, threat.x, threat.y);
        if (cf > 0.8) continue;
        if (!Vis.los(x, y, threat.x, threat.y)) continue;   // precisa poder revidar
        var score = (1 - cf) * 120 - d * 0.5;
        if (score > bestScore) { bestScore = score; best = { x: x, y: y }; }
      }
    }
    return best;
  }

  // -------------------------------------------------------- IA dos inimigos
  function updateEnemyAI(u, dt) {
    if (u.dead || u.downed) return;
    if (u.reloading > 0) u.reloading -= dt;
    if (u.cooldown > 0) u.cooldown -= dt;
    if (u.burstPause > 0) u.burstPause -= dt;
    if (u.reaction > 0) u.reaction -= dt;
    if (u.repath > 0) u.repath -= dt;

    // atirar sem esperar o proximo pensamento
    if (u.target && !u.target.dead && !u.target.downed) {
      var seenNow = Vis.los(u.x, u.y, u.target.x, u.target.y);
      u.targetSeen = seenNow ? 0 : u.targetSeen + dt;
      if (seenNow) {
        u.angle = U.turnTo(u.angle, Math.atan2(u.target.y - u.y, u.target.x - u.x), (u.role === 'atirador' ? 5 : 8) * dt);
        if (u.cooldown <= 0 && u.burstPause <= 0 && u.reaction <= 0) tryFire(u, u.target);
      }
    }
    if (u.path) followPath(u, dt);
    if (u.thinkT > 0) { u.thinkT -= dt; return; }
    u.thinkT = U.rnd(0.24, 0.45);

    var visible = nearestVisibleEnemy(u, u.vision);
    if (visible) {
      if (!u.target) {
        u.reaction = U.rnd(0.15, 0.5) * (u.role === 'atirador' ? 1.6 : 1);
        if (Vis.isVisible(u.x, u.y) || U.dist(u.x, u.y, G.control.x, G.control.y) < 420) {
          say(u, U.pick(['CONTATO!', 'INIMIGO A VISTA!', 'ALVO AVISTADO!', 'ABRIR FOGO!']));
        }
      }
      u.target = visible;
      u.lastKnown = { x: visible.x, y: visible.y };
      u.state = 'combat';
      u.alert = 1;
    } else if (u.target) {
      u.targetSeen += 0.3;
      if (u.targetSeen > 2.6) {
        u.target = null;
        u.state = u.alert > 0.5 ? 'alert' : 'patrol';
      }
    }

    if (u.target) {
      var t = u.target;
      var dist = U.dist(u.x, u.y, t.x, t.y);
      // ferido e sob fogo: recuar
      if (u.hp < u.maxHp * 0.35 && u.supp > 0.55) {
        if (!u.path || u.repath <= 0) { goTo(u, u.spawnX + U.rnd(-30, 30), u.spawnY + U.rnd(-30, 30)); u.repath = 2.2; }
      } else if (coverFactor(u, t.x, t.y) > 0.75 && u.supp > 0.2) {
        var spot = findCoverNear(u, t);
        if (spot && (!u.path || u.repath <= 0)) {
          goTo(u, spot.x, spot.y);
          u.repath = U.rnd(1.3, 2.3);
          say(u, 'COBERTURA!', 0.3);
        }
      } else if (u.aggr > 0.6 && dist > 150 && u.supp < 0.5 && (!u.path || u.repath <= 0)) {
        goTo(u, t.x, t.y);
        u.repath = 1.6;
      }
      if (u.grenades > 0 && dist > 60 && dist < 175 && u.supp < 0.4 && U.chance(0.35)) {
        u.grenades--;
        G.throwGrenade(u, { x: t.x + U.rnd(-16, 16), y: t.y + U.rnd(-16, 16) }, 'frag');
        say(u, 'GRANADA!');
      }
    } else if (u.state === 'alert' && u.lastKnown) {
      var d2 = U.dist(u.x, u.y, u.lastKnown.x, u.lastKnown.y);
      if (d2 > 44 && (!u.path || u.repath <= 0)) {
        goTo(u, u.lastKnown.x, u.lastKnown.y);
        u.repath = U.rnd(1.6, 2.6);
      }
      u.angle = U.turnTo(u.angle, Math.atan2(u.lastKnown.y - u.y, u.lastKnown.x - u.x), 4 * dt);
      if (d2 < 50 && u.alert > 0) u.alert -= 0.25;
      if (u.alert <= 0) { u.state = 'patrol'; u.lastKnown = null; }
    } else {
      u.state = 'patrol';
      if (u.patrol.length) {
        var wp = u.patrol[u.patrolI % u.patrol.length];
        if (U.dist(u.x, u.y, wp.x, wp.y) < 34) u.patrolI++;
        else if (!u.path || u.repath <= 0) { goTo(u, wp.x, wp.y); u.repath = 2.5; }
      }
    }
  }

  // -------------------------------------------------------------- atualizar
  G.updateUnits = function (dt) {
    for (var i = 0; i < G.units.length; i++) {
      var u = G.units[i];
      if (u.dead) continue;
      if (u.downed) {
        u.bleed -= dt;
        if (u.reviveProgress >= 1) {
          u.downed = false; u.hp = u.maxHp * 0.55; u.reviveProgress = 0;
          addFeed(u.name + ' voltou ao combate', COL.ok);
          say(u, 'ESTOU DE PE!');
        } else if (u.bleed <= 0) {
          killUnit(u, null);
        }
      } else if (u.reviveProgress > 0 && u.reviveProgress < 1) {
        u.reviveProgress = Math.max(0, u.reviveProgress - dt * 0.4);
      }
      if (u.dead) continue;

      // supressao decai
      u.supp = Math.max(0, u.supp - dt * 0.45);
      if (u.muzzle > 0) u.muzzle -= dt;
      if (u.hitFlash > 0) u.hitFlash -= dt;
      if (u.reviveTarget && (!u.reviveTarget.downed ||
        U.dist(u.x, u.y, u.reviveTarget.x, u.reviveTarget.y) > 34)) u.reviveTarget = null;

      // cobertura (recalcula devagar)
      u.coverT -= dt;
      if (u.coverT <= 0 && u.lastKnown) {
        u.coverT = 0.35;
        u.coverFactor = coverFactor(u, u.lastKnown.x, u.lastKnown.y);
      }
      if (u.throwCd > 0) u.throwCd -= dt;
      if (u.chatter > 0) u.chatter -= dt;

      if (u.controlled && !u.player2) updateControlled(u, G.input.p1, dt);
      else if (u.controlled && u.player2) updateControlled(u, G.input.p2, dt);
      else if (u.team === 'ally') updateAllyAI(u, dt);
      else updateEnemyAI(u, dt);
    }

    // reanimacao: basta um companheiro por perto
    for (var d = 0; d < G.units.length; d++) {
      var vit = G.units[d];
      if (!vit.downed || vit.dead || vit.team !== 'ally') continue;
      for (var h = 0; h < G.units.length; h++) {
        var soc = G.units[h];
        if (soc === vit || soc.dead || soc.downed || soc.team !== 'ally') continue;
        if (U.dist(soc.x, soc.y, vit.x, vit.y) < 32) {
          vit.reviveProgress += dt / 3.5;
          vit.bleed = Math.max(vit.bleed, 8);
          break;
        }
      }
    }

    // limpa mortos antigos
    if (G.time % 5 === 0) {
      for (var j = G.units.length - 1; j >= 0; j--) {
        if (G.units[j].dead && G.time % 60 === 0 && !G.units[j].body) {
          G.units[j].body = true;   // vira corpo no chao
        }
      }
    }
  };

  var barkCd = { ally: -9, enemy: -9 };
  function say(u, text, chance) {
    if (chance !== undefined && !U.chance(chance)) return;
    if (u.chatter > 0) return;
    // um aviso por lado de cada vez, e no maximo 3 baloes na tela
    var lado = u.team === 'enemy' ? 'enemy' : 'ally';
    if (G.time - barkCd[lado] < 1.4) return;
    var ativos = 0;
    for (var fi = 0; fi < G.floats.length; fi++) if (G.floats[fi].life > 0) ativos++;
    if (ativos >= 3) return;
    barkCd[lado] = G.time;
    u.chatter = 2.5;
    G.floats.push({ x: u.x, y: u.y - 20, text: text, life: 1.8, maxLife: 1.8, color: u.team === 'enemy' ? '#ffb4a0' : '#cfe6ff' });
  }
  G.say = say;

  function addFeed(text, color) {
    // nao repete o mesmo aviso em sequencia (evita "SOB FOGO!" duas vezes seguidas)
    if (G.feed.length && G.feed[0].text === text && G.feed[0].life > 5.2) return;
    G.feed.unshift({ text: text, color: color || COL.info, life: 6 });
    if (G.feed.length > 6) G.feed.pop();
  }
  G.addFeed = addFeed;

  PT.Game = G;
  PT.GameInternals = {
    findPath: findPath, coverFactor: coverFactor, moveUnit: moveUnit,
    goTo: goTo, collideCircle: collideCircle, findCoverNear: findCoverNear,
    say: say, addFeed: addFeed, makeUnit: makeUnit
  };
  // ------------------------------------------------------------- balistica
  G.spawnBullet = function (u, angle) {
    var w = u.wdef;
    var speed = w.vel * 60;
    var mz = u.radius + 7;
    var b = {
      x: u.x + Math.cos(angle) * mz, y: u.y + Math.sin(angle) * mz,
      ox: u.x, oy: u.y,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      team: u.team, owner: u, dmg: w.dmg, pen: w.pen, range: w.range * 1.25,
      travelled: 0, angle: angle, dead: false, px: u.x, py: u.y
    };
    G.bullets.push(b);
    Audio.gunshot(w.snd, u.controlled ? 0 : U.dist(u.x, u.y, G.control ? G.control.x : 512, G.control ? G.control.y : 300));
    hearShot(u.x, u.y, u.team === 'ally' ? 640 : 520);
    if (u.team === 'enemy' && G.control) G.shake = Math.max(G.shake, 0.8);
    return b;
  };

  function spark(x, y, color, n, spd) {
    for (var i = 0; i < n; i++) {
      var a = U.rnd(Math.PI * 2), s = U.rnd(30, 150) * (spd || 1);
      G.parts.push({
        x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: U.rnd(0.15, 0.45), maxLife: 0.45, color: color, size: U.rnd(1, 2.2), drag: 3.6, kind: 'spark'
      });
    }
  }

  function blood(x, y, dirx, diry, amount) {
    for (var i = 0; i < amount; i++) {
      var a = Math.atan2(diry, dirx) + U.rnd(-0.9, 0.9);
      var s = U.rnd(40, 220);
      G.parts.push({
        x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: U.rnd(0.2, 0.7), maxLife: 0.7, color: U.pick(['#8d1717', '#a51f1f', '#6d1010']),
        size: U.rnd(1, 2.6), drag: 2.6, kind: 'blood'
      });
    }
  }

  function dust(x, y, n, spread, col) {
    for (var i = 0; i < n; i++) {
      var a = U.rnd(Math.PI * 2), s = U.rnd(8, 60) * (spread || 1);
      G.parts.push({
        x: x + U.rnd(-4, 4), y: y + U.rnd(-4, 4), vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: U.rnd(0.4, 1.1), maxLife: 1.1, color: col || U.pick(['#6d6455', '#7d7362', '#585043']),
        size: U.rnd(2, 5), drag: 1.6, kind: 'dust', grow: U.rnd(4, 9)
      });
    }
  }

  function bloodDecal(x, y, r) {
    var g = G.decalCtx;
    g.globalAlpha = 0.5;
    g.fillStyle = '#5e1010';
    for (var i = 0; i < 6; i++) {
      g.beginPath();
      g.arc(x + U.rnd(-r, r), y + U.rnd(-r, r), U.rnd(1.5, r * 0.6), 0, 6.3);
      g.fill();
    }
    g.globalAlpha = 1;
  }

  function craterDecal(x, y, r) {
    var g = G.decalCtx;
    g.globalAlpha = 0.45;
    var grd = g.createRadialGradient(x, y, r * 0.2, x, y, r);
    grd.addColorStop(0, '#1b1917');
    grd.addColorStop(0.6, '#2c2a26');
    grd.addColorStop(1, 'rgba(40,38,34,0)');
    g.fillStyle = grd;
    g.beginPath();
    g.arc(x, y, r, 0, 6.3);
    g.fill();
    g.globalAlpha = 1;
  }
  function markDecal(x, y, color, size) {
    var g = G.decalCtx;
    g.globalAlpha = 0.7;
    g.fillStyle = color;
    g.beginPath();
    g.arc(x, y, size, 0, 6.3);
    g.fill();
    g.globalAlpha = 1;
  }

  function destroyCell(cell) {
    var cx = cell.c * TILE + TILE / 2, cy = cell.r * TILE + TILE / 2;
    if (cell.objective) {
      cell.objective = false;
      G.mission.done++;
      craterDecal(cx, cy, 26);
      explodeAt(cx, cy, { radius: 110, dmg: 60, kind: 'objective' });
      addFeed('OBJETIVO DESTRUIDO  (' + G.mission.done + '/' + G.mission.targets + ')', COL.ok);
      Audio.objective();
      G.score += 500;
      if (G.mission.done >= G.mission.targets) G.finish(true, 'OBJETIVOS DESTRUIDOS');
    } else {
      craterDecal(cx, cy, 16);
      dust(cx, cy, 14, 1.2);
      spark(cx, cy, '#c8c0a8', 8, 1);
      markDecal(cx, cy, 'rgba(30,28,24,0.5)', 8);
    }
    cell.solid = false; cell.sight = false; cell.bullet = false; cell.destroyed = true;
    cell.ch = 'rubble'; cell.mat = 'rubble'; cell.hp = 0;
    Vis.blocksSight[key(cell.r, cell.c)] = 0;
    Audio.grenade(U.dist(cx, cy, G.control ? G.control.x : 0, G.control ? G.control.y : 0) * 0.6);
  }

  function bulletImpact(b, cell, px, py) {
    var mat = cell.mat;
    var distP = G.control ? U.dist(px, py, G.control.x, G.control.y) : 900;
    // ricochete
    var ric = (cell.ricochet === undefined ? 0.2 : cell.ricochet);
    if (!cell.destructible && U.rng() < ric) {
      var cx = cell.c * TILE + TILE / 2, cy = cell.r * TILE + TILE / 2;
      // reflete no eixo dominante
      if (Math.abs(cx - px) > Math.abs(cy - py)) b.vx = -b.vx; else b.vy = -b.vy;
      b.x += b.vx * 0.02; b.y += b.vy * 0.02;
      b.dmg *= 0.7;
      spark(px, py, '#ffe9b0', 6, 1.2);
      Audio.ricochet(distP);
      return;
    }
    // penetracao em material leve / destruicao
    if (cell.destructible) {
      cell.hp -= b.dmg * (b.pen === undefined ? 1 : b.pen) * (cell.pen === undefined ? 1 : cell.pen);
      dust(px, py, 5, 0.8, cell.mat === 'madeira' ? '#8a6a3c' : '#7d7362');
      if (cell.hp <= 0) { destroyCell(cell); return; }
      cell.damaged = true;
      spark(px, py, cell.mat === 'madeira' ? '#c9a05e' : '#b9b2a0', 4, 0.8);
      Audio.impact(cell.mat, distP);
      b.dead = true;
      return;
    }
    Audio.impact(mat, distP);
    spark(px, py, '#d8d2c0', 4, 0.9);
    markDecal(px, py, 'rgba(24,22,20,0.45)', 1.6);
    b.dead = true;
    // supressao por impacto proximo
    suppressNear(px, py, 70, 0.16, b.team);
  }

  function suppressNear(x, y, radius, amount, team) {
    for (var i = 0; i < G.units.length; i++) {
      var u = G.units[i];
      if (u.dead || u.team === team) continue;
      var d = U.dist(u.x, u.y, x, y);
      if (d < radius) {
        u.supp = Math.min(1, u.supp + amount * (1 - d / radius));
        u.suppT = G.time;
      }
    }
  }

  G.updateBullets = function (dt) {
    for (var i = G.bullets.length - 1; i >= 0; i--) {
      var b = G.bullets[i];
      var speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      var total = speed * dt;
      var steps = Math.max(1, Math.ceil(total / 5));
      var stepLen = total / steps;
      b.px = b.x; b.py = b.y;
      for (var s = 0; s < steps && !b.dead; s++) {
        b.x += b.vx / speed * stepLen;
        b.y += b.vy / speed * stepLen;
        b.travelled += stepLen;
        if (b.x < 0 || b.y < 0 || b.x > C.W || b.y > C.H || b.travelled > b.range) { b.dead = true; break; }

        // crepitar perto do jogador
        if (G.control && b.team === 'enemy') {
          var dc = U.dist(b.x, b.y, G.control.x, G.control.y);
          if (dc < 46 && !b.cracked) { b.cracked = true; Audio.crack(dc); G.control.supp = Math.min(1, G.control.supp + 0.05); }
        }

        var cell = cellAtPos(b.x, b.y);
        if (cell && cell.bullet) { bulletImpact(b, cell, b.x, b.y); break; }

        // soldados
        var hitUnit = null;
        for (var j = 0; j < G.units.length; j++) {
          var u = G.units[j];
          if (u.dead || u.downed || u.team === b.team) continue;
          var d = U.dist(b.x, b.y, u.x, u.y);
          if (d < u.radius + 3) { hitUnit = u; break; }
        }
        if (hitUnit) {
          var off = Math.abs((b.x - hitUnit.x) * -Math.sin(b.angle) + (b.y - hitUnit.y) * Math.cos(b.angle));
          var part = off < 2.6 ? 'head' : (off < 5.6 ? 'torso' : 'limbs');
          var falloff = 1 - U.clamp((b.travelled / b.range) * 0.35, 0, 0.35);
          var cf = coverFactor(hitUnit, b.ox, b.oy);
          var dmg = b.dmg * falloff * U.lerp(0.55, 1, cf);
          if (part === 'head') dmg *= 2.1;
          else if (part === 'torso') dmg *= 0.85;
          else dmg *= 0.7;
          damageUnit(hitUnit, dmg, b.owner, part, b.angle);
          if (b.owner && b.owner.team === 'ally') G.hits++;
          b.dead = true;
          break;
        }
        // passagem perto de inimigos rebaixa a moral
        suppressNear(b.x, b.y, 44, 0.05, b.team);
      }
    }
    for (var k = G.bullets.length - 1; k >= 0; k--) if (G.bullets[k].dead) G.bullets.splice(k, 1);
  };

  function damageUnit(u, dmg, from, part, angle) {
    if (u.dead) return;
    u.hp -= dmg;
    u.supp = Math.min(1, u.supp + 0.5);
    u.hitFlash = 0.15;
    var dx = Math.cos(angle || 0), dy = Math.sin(angle || 0);
    blood(u.x, u.y, dx, dy, part === 'head' ? 10 : 6);
    if (from) from.dmgDealt += dmg;
    if (u.hp <= 0) {
      if (part === 'head' || dmg > 62 || U.chance(0.45)) killUnit(u, from, part);
      else downUnit(u, from);
    } else if (u.team === 'enemy' && !u.target) {
      // tiro de surpresa: descobriu de onde veio
      u.lastKnown = { x: from ? from.x : u.x, y: from ? from.y : u.y };
      u.state = 'alert';
      u.alert = 1;
    }
    if (u.team === 'ally' && u.hp < u.maxHp * 0.4) say(u, U.pick(['ESTOU FERIDO!', 'PRECISO DE AJUDA!']), 0.25);
  }

  function downUnit(u, from) {
    u.downed = true;
    u.hp = 0;
    u.bleed = 24;
    u.reviveProgress = 0;
    u.path = null;
    addFeed(u.name + ' CAIU - precisa de socorro', COL.bad);
    if (u.team === 'ally') Audio.radio('down');
    say(u, 'CAI! SOCORRO!');
  }

  function killUnit(u, from, part) {
    if (u.dead) return;
    u.dead = true;
    u.downed = false;
    u.path = null;
    bloodDecal(u.x, u.y, 9);
    blood(u.x, u.y, U.rnd(-1, 1), U.rnd(-1, 1), 14);
    if (u.team === 'enemy') {
      G.kills++;
      G.score += 100 + (part === 'head' ? 50 : 0);
      if (from) from.kills++;
      addFeed(u.name + ' abatido' + (part === 'head' ? ' (HEADSHOT)' : ''), COL.ok);
      suppressNear(u.x, u.y, 130, 0.3, 'enemy');
      Audio.hitFlesh(0);
    } else {
      addFeed(u.name + ' MORTO', COL.bad);
      Audio.radio('down');
      G.alertLevel = Math.min(1, G.alertLevel + 0.3);
    }
  }

  // ------------------------------------------------- grenadas e fumaca
  G.throwGrenade = function (u, target, kind) {
    var dx = target.x - u.x, dy = target.y - u.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    var range = U.clamp(d, 20, 300);
    var fly = U.clamp(range / 300, 0.25, 1.1);
    G.grenades.push({
      kind: kind, x: u.x, y: u.y, z: 8,
      vx: (dx / (fly * 60)) * 1, vy: (dy / (fly * 60)) * 1, vz: 120,
      fuse: kind === 'smoke' ? 0.9 : 2.3, team: u.team, owner: u, bounced: 0,
      spin: U.rnd(Math.PI * 2)
    });
    u.muzzle = 0.05;
  };

  function explodeAt(x, y, opts) {
    var radius = opts.radius || 96;
    var dmg = opts.dmg === undefined ? 92 : opts.dmg;
    G.shake = Math.max(G.shake, U.clamp(26 - U.dist(x, y, G.control ? G.control.x : 512, G.control ? G.control.y : 300) * 0.05, 4, 26));
    craterDecal(x, y, radius * 0.45);
    dust(x, y, 26, 1.7);
    spark(x, y, '#ffd9a0', 16, 1.6);
    for (var i = 0; i < 16; i++) {
      G.parts.push({
        x: x, y: y, vx: U.rnd(-260, 260), vy: U.rnd(-260, 260), life: U.rnd(0.3, 0.9),
        maxLife: 0.9, color: U.pick(['#4a463f', '#3a3630', '#2e2b26']), size: U.rnd(2, 5), drag: 2.2, kind: 'dust'
      });
    }
    for (var s = 0; s < 10; s++) {
      var a = U.rnd(Math.PI * 2), sp = U.rnd(180, 420);
      G.parts.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: U.rnd(0.2, 0.6), maxLife: 0.6, color: '#f0e0b8', size: 1.6, drag: 2, kind: 'spark'
      });
    }
    Audio.grenade(U.dist(x, y, G.control ? G.control.x : 512, G.control ? G.control.y : 300));
    // dano radial com oclusao por paredes
    for (var j = 0; j < G.units.length; j++) {
      var u = G.units[j];
      if (u.dead) continue;
      var d = U.dist(u.x, u.y, x, y);
      if (d > radius) { if (d < radius * 2) u.supp = Math.min(1, u.supp + 0.3); continue; }
      var los = Vis.los(x, y, u.x, u.y);
      var f = 1 - d / radius;
      var d2 = dmg * f * f * (los ? 1 : 0.45);
      if (los) d2 *= (opts.kind === 'objective' ? 1.35 : 1);
      damageUnit(u, d2, opts.owner || null, 'blast', Math.atan2(u.y - y, u.x - x));
      u.supp = Math.min(1, u.supp + 0.8);
    }
    // destroi o que estiver perto
    for (var k = 0; k < G.grid.length; k++) {
      var cell = G.grid[k];
      if (!cell.destructible || cell.destroyed) continue;
      var cx = cell.c * TILE + 12, cy = cell.r * TILE + 12;
      if (U.dist(cx, cy, x, y) < radius * 0.75) {
        cell.hp -= dmg * 0.9;
        if (cell.hp <= 0) destroyCell(cell);
      }
    }
  }
  PT.explodeAt = explodeAt;

  G.updateGrenades = function (dt) {
    for (var i = G.grenades.length - 1; i >= 0; i--) {
      var g = G.grenades[i];
      g.spin += dt * 9;
      g.fuse -= dt;
      g.x += g.vx * dt; g.y += g.vy * dt;
      g.z += g.vz * dt;
      g.vz -= 420 * dt;
      // colisao com paredes
      if (solidAtPos(g.x, g.y)) {
        var back = 0.6;
        g.x -= g.vx * dt * back; g.y -= g.vy * dt * back;
        if (Math.abs(g.vx) > Math.abs(g.vy)) g.vx = -g.vx * 0.4; else g.vy = -g.vy * 0.4;
        g.vz = Math.abs(g.vz) * 0.3;
        g.bounced++;
      }
      if (g.z <= 0) {
        g.z = 0;
        if (Math.abs(g.vz) > 40) { g.vz = -g.vz * 0.35; }
        else { g.vz = 0; g.vx *= 0.7; g.vy *= 0.7; }
      }
      if (g.fuse <= 0) {
        if (g.kind === 'smoke') {
          spawnSmoke(g.x, g.y);
        } else {
          explodeAt(g.x, g.y, { radius: 92 + U.rnd(0, 14), dmg: 95, owner: g.owner });
        }
        G.grenades.splice(i, 1);
      }
    }
  };

  function spawnSmoke(x, y) {
    var n = 7;
    for (var i = 0; i < n; i++) {
      var a = U.rnd(Math.PI * 2), r = U.rnd(0, 26);
      var puff = {
        x: x + Math.cos(a) * r, y: y + Math.sin(a) * r,
        r0: U.rnd(10, 16), r: 6, grow: U.rnd(16, 26),
        life: 16 + U.rnd(0, 6), maxLife: 19, alpha: 0.75
      };
      G.smokes.push(puff);
    }
    Audio.smokeOut();
    Vis.smoke = G.smokes;
    say(G.control, 'FUMACA NA AREA');
  }

  function updateSmokes(dt) {
    for (var i = G.smokes.length - 1; i >= 0; i--) {
      var s = G.smokes[i];
      s.life -= dt;
      s.r = Math.min(s.r0 + 20, s.r + s.grow * dt);
      if (s.life < 2) s.alpha = Math.max(0, s.alpha - dt * 0.45);
      if (s.life <= 0) G.smokes.splice(i, 1);
    }
  }

  function updateParticles(dt) {
    for (var i = G.parts.length - 1; i >= 0; i--) {
      var p = G.parts[i];
      p.life -= dt;
      var drag = p.drag || 0;
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (drag) { var f = Math.max(0, 1 - drag * dt); p.vx *= f; p.vy *= f; }
      if (p.grow) p.size += p.grow * dt;
      if (p.life <= 0) {
        if (p.kind === 'blood') markDecal(p.x, p.y, 'rgba(90,16,16,0.5)', 1.4);
        G.parts.splice(i, 1);
      }
    }
    for (var c = G.casings.length - 1; c >= 0; c--) {
      var k = G.casings[c];
      k.life -= dt;
      k.x += k.vx * dt; k.y += k.vy * dt;
      k.vx *= 0.9; k.vy *= 0.9;
      if (k.life <= 0) G.casings.splice(c, 1);
    }
    for (var f = G.floats.length - 1; f >= 0; f--) {
      var fl = G.floats[f];
      fl.life -= dt;
      fl.y -= dt * 12;
      if (fl.life <= 0) G.floats.splice(f, 1);
    }
    for (var ff = 0; ff < G.feed.length; ff++) G.feed[ff].life -= dt;
    while (G.feed.length && G.feed[G.feed.length - 1].life <= 0) G.feed.pop();

    if (G.alarmFlash > 0) G.alarmFlash -= dt;
  }

  // --------------------------------------------------------------- missoes
  function aliveOf(team) {
    var out = [];
    for (var i = 0; i < G.units.length; i++) {
      var u = G.units[i];
      if (u.team === team && !u.dead) out.push(u);
    }
    return out;
  }
  function insideZone(u) {
    return G.zone && u.x > G.zone.x && u.x < G.zone.x + G.zone.w && u.y > G.zone.y && u.y < G.zone.y + G.zone.h;
  }
  G.insideZone = insideZone;
  G.aliveOf = aliveOf;

  function spawnWave() {
    var pts = G.enemySpawns;
    if (!pts.length) return;
    var n = 2 + Math.floor(G.time / 60);
    n = Math.min(3, n);
    for (var i = 0; i < n; i++) {
      var s = pts[U.rndi(0, pts.length - 1)];
      var role = U.chance(0.3) ? 'oficial' : (U.chance(0.25) ? 'atirador' : 'soldado');
      var e = makeUnit({
        team: 'enemy', role: role,
        x: U.clamp(s.x + U.rnd(-16, 16), 20, C.W - 20),
        y: U.clamp(s.y + U.rnd(-16, 16), 20, C.H - 20), angle: U.rnd(6.3)
      });
      e.state = 'alert';
      e.alert = 1;
      e.lastKnown = G.control ? { x: G.control.x, y: G.control.y } : null;
      G.units.push(e);
    }
    addFeed('REFORCO INIMIGO NA AREA', COL.warn);
    Audio.radio('up');
  }

  G.updateMission = function (dt) {
    var m = G.mission;
    m.left -= dt;
    if (m.left <= 0) { G.finish(false, 'TEMPO ESGOTADO'); return; }

    var alliesAlive = aliveOf('ally').filter(function (u) { return !u.downed; });
    var mates = aliveOf('ally');
    if (!mates.length) { G.finish(false, 'ESQUADRAO PERDIDO'); return; }

    if (m.type === 'destroy') {
      if (!aliveOf('enemy').filter(function (u) { return !u.downed; }).length) {
        m.reinforceT = (m.reinforceT || 26) - dt;
        if (m.reinforceT <= 0) { m.reinforceT = 26; spawnWave(); }
      }
    } else if (m.type === 'duel') {
      if (!aliveOf('enemy').filter(function (u) { return !u.downed; }).length) {
        G.finish(true, 'AREA LIMPA');
      }
    } else if (m.type === 'hold') {
      var inside = false, enemyInside = false;
      for (var i = 0; i < mates.length; i++) if (!mates[i].downed && insideZone(mates[i])) inside = true;
      var es = aliveOf('enemy');
      for (var j = 0; j < es.length; j++) if (insideZone(es[j])) enemyInside = true;
      if (inside && !enemyInside) {
        m.holdLeft -= dt;
        m.held += dt;
        G.score += dt * 12;
      }
      if (m.holdLeft <= 0) { G.finish(true, 'PRACA MANTIDA'); return; }
      m.waveT -= dt;
      if (m.waveT <= 0) { m.waveT = U.rnd(20, 30); spawnWave(); }
    }

    // alarme do esquadrao
    var underFire = false;
    for (var k = 0; k < mates.length; k++) if (mates[k].supp > 0.3) underFire = true;
    if (underFire && !G.underFireMsg) {
      G.underFireMsg = true;
      G.alarmFlash = 1;
      Audio.radio('up');
      addFeed('SOB FOGO!', COL.bad);
    } else if (!underFire) G.underFireMsg = false;

    G.score += dt * 2;
  };

  G.finish = function (won, reason) {
    if (G.over) return;
    G.over = true;
    G.result = reason;
    G.won = won;
    if (won) { Audio.objective(); addFeed('MISSAO CUMPRIDA - ' + reason, COL.ok); }
    else { Audio.fail(); addFeed('MISSAO FALHOU - ' + reason, COL.bad); }
    var acc = G.shots ? Math.round(G.hits / G.shots * 100) : 0;
    G.score += won ? 1500 : 0;
    G.best = Math.max(G.best || 0, G.score);
    try { window.localStorage.setItem('fogocruzado.best', String(G.best)); } catch (e) { }
  };

  // ------------------------------------------------------------------ menu
  function menuItems(scene) {
    if (scene === 'mode') return ['OPERACAO SOLO', 'DUPLA (2 JOGADORES)'];
    return PT.Maps.list.map(function (m) { return m.name; });
  }

  function updateMenu(dt) {
    var scene = G.menuScene;
    var items = menuItems(scene);
    var idx = G.menuIndex[scene] || 0;
    var moved = 0;
    if (G.menuUp) moved = -1;
    if (G.menuDown) moved = 1;
    if (moved) {
      idx = (idx + moved + items.length) % items.length;
      G.menuIndex[scene] = idx;
      Audio.radio('up');
    }
    if (G.menuSelect) {
      Audio.radio('up');
      if (scene === 'mode') {
        G.players = idx === 0 ? 1 : 2;
        G.menuScene = 'map';
      } else {
        G.spawnMission(idx, G.players);
      }
    }
    if (G.menuBack && scene === 'map') { G.menuScene = 'mode'; Audio.radio('down'); }
    G.menuUp = G.menuDown = G.menuSelect = G.menuBack = false;
  }

  // ---------------------------------------------------------------- render
  function renderWorld(ctx) {
    ctx.drawImage(G.ground, 0, 0);
    ctx.drawImage(G.decalCanvas, 0, 0);

    // zona de defesa
    if (G.zone) {
      ctx.save();
      ctx.globalAlpha = 0.12 + 0.05 * Math.sin(G.time * 2);
      ctx.fillStyle = '#63d2ff';
      ctx.fillRect(G.zone.x, G.zone.y, G.zone.w, G.zone.h);
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#63d2ff';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 5]);
      ctx.strokeRect(G.zone.x + 0.5, G.zone.y + 0.5, G.zone.w - 1, G.zone.h - 1);
      ctx.setLineDash([]);
      ctx.restore();
    }

    // paredes e objetos
    for (var i = 0; i < G.grid.length; i++) {
      var cell = G.grid[i];
      if (!cell.solid && !cell.destroyed) continue;
      var x = cell.c * TILE, y = cell.r * TILE;
      if (cell.destroyed) {
        if (cell.wasDestructible) ctx.drawImage(Tex.wall.rubble, x, y);
        continue;
      }
      var mat = cell.mat === 'concreto' ? 'concrete' : cell.mat === 'metal blindado' ? 'metal'
        : cell.mat === 'madeira' ? 'wood' : cell.mat === 'caixote' ? 'crate'
          : cell.mat === 'saco de areia' ? 'sandbags' : cell.mat === 'arvore' ? 'tree'
            : cell.mat === 'objetivo' ? 'objective' : 'concrete';
      ctx.drawImage(Tex.wall[mat], x, y);
      if (cell.damaged && cell.destructible) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, TILE, TILE);
        ctx.globalAlpha = 1;
      }
      if (cell.objective) {
        ctx.save();
        ctx.globalAlpha = 0.5 + 0.5 * Math.sin(G.time * 4);
        ctx.fillStyle = '#ffd24a';
        ctx.fillRect(x + TILE / 2 - 2, y - 8, 4, 4);
        ctx.restore();
      }
    }
  }

  function drawUnit(ctx, u) {
    if (u.team === 'enemy' && !Vis.isVisible(u.x, u.y) && !u.ghost) return;

    // sombra
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(u.x + 1, u.y + 2, 8, 7, 0, 0, 6.3);
    ctx.fill();

    var pal = u.team === 'enemy' ? 'enemy' : (u.player2 ? 'p2' : 'ally');
    var body = Tex.soldier[pal];
    ctx.save();
    ctx.translate(u.x, u.y);
    ctx.rotate(u.angle + Math.PI / 2);
    var scaleY = u.prone ? 0.82 : (u.downed ? 1 : 1);
    if (u.dead) { ctx.globalAlpha = 0.85; }
    ctx.drawImage(body, -10, -11, 20, 22 * scaleY);
    ctx.restore();

    // arma
    if (!u.dead) {
      ctx.save();
      ctx.translate(u.x, u.y);
      ctx.rotate(u.angle);
      var g = u.wdef;
      var len = g.n === 'PRECISAO' ? 22 : g.n === 'SMG' ? 13 : 17;
      ctx.fillStyle = '#232426';
      ctx.fillRect(4, -1.2, len, 2.4);
      ctx.fillStyle = '#3a3b3e';
      ctx.fillRect(4, -1.2, len * 0.5, 1);
      if (g.n === 'PRECISAO') { ctx.fillStyle = '#151617'; ctx.fillRect(10, -2.4, 6, 1.6); }
      // flash
      if (u.muzzle > 0) {
        ctx.fillStyle = 'rgba(255,224,140,0.95)';
        ctx.beginPath();
        ctx.moveTo(4 + len, 0);
        ctx.lineTo(4 + len + 9, -3.5);
        ctx.lineTo(4 + len + 13, 0);
        ctx.lineTo(4 + len + 9, 3.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(4 + len + 4, 0, 3.2, 0, 6.3);
        ctx.fill();
      }
      ctx.restore();
    }

    // ferido / caido
    if (u.downed) {
      ctx.save();
      ctx.strokeStyle = '#ff6b4d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(u.x, u.y, 11, 0, 6.3);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,107,77,0.25)';
      ctx.beginPath();
      ctx.arc(u.x, u.y, 11, 0, 6.3);
      ctx.fill();
      if (u.reviveProgress > 0) {
        ctx.strokeStyle = '#8fd96b';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(u.x, u.y, 14, -Math.PI / 2, -Math.PI / 2 + u.reviveProgress * 6.283);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (u.hitFlash > 0) {
      ctx.save();
      ctx.globalAlpha = u.hitFlash * 4;
      ctx.fillStyle = '#ff5b3d';
      ctx.beginPath();
      ctx.arc(u.x, u.y, 10, 0, 6.3);
      ctx.fill();
      ctx.restore();
    }

    // selecao do soldado controlado
    if (u.controlled && !u.dead) {
      ctx.save();
      ctx.strokeStyle = 'rgba(143,217,107,0.9)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(u.x, u.y, 13, 0, 6.3);
      ctx.stroke();
      ctx.restore();
    }

    // etiquetas
    if (!u.dead && u.team === 'ally') {
      var y0 = u._labelY || (u.y - 20);
      ctx.font = 'bold 9px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillText(u.name, u.x + 1, y0 + 1);
      ctx.fillStyle = u.controlled ? '#dff5c9' : '#cfe6ff';
      ctx.fillText(u.name, u.x, y0);
      var w = 22, hpFrac = U.clamp(u.hp / u.maxHp, 0, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(u.x - w / 2 - 1, y0 + 3, w + 2, 4);
      ctx.fillStyle = u.downed ? '#ff6b4d' : (hpFrac > 0.6 ? '#8fd96b' : hpFrac > 0.3 ? '#ffcf4d' : '#ff6b4d');
      ctx.fillRect(u.x - w / 2, y0 + 4, w * (u.downed ? 0 : hpFrac), 2);
      if (u.supp > 0.35) {
        ctx.fillStyle = '#ffcf4d';
        ctx.fillText('!', u.x + 13, y0 + 4);
      }
    } else if (!u.dead && Vis.isVisible(u.x, u.y)) {
      var w2 = 18, hpF = U.clamp(u.hp / u.maxHp, 0, 1);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(u.x - w2 / 2 - 1, u.y - 20, w2 + 2, 3);
      ctx.fillStyle = hpF > 0.5 ? '#ff9b7a' : '#ff6b4d';
      ctx.fillRect(u.x - w2 / 2, u.y - 20, w2 * hpF, 1.5);
    }

    // alvo designado
    if (u.team === 'enemy' && u.target === G.control && Vis.isVisible(u.x, u.y)) {
      ctx.save();
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(G.time * 6);
      ctx.strokeStyle = '#ff6b4d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(u.x, u.y, 15, 0, 6.3);
      ctx.stroke();
      ctx.restore();
    }
  }

  function renderUnits(ctx) {
    // evita etiquetas sobrepostas quando o esquadrao esta agrupado
    var fila = [];
    for (var i = 0; i < G.units.length; i++) {
      var a = G.units[i];
      if (a.team === 'ally' && !a.dead) fila.push(a);
    }
    fila.sort(function (m, n) { return m.y - n.y; });
    var ocupado = [];
    for (var k = 0; k < fila.length; k++) {
      var al = fila[k], ly = al.y - 20;
      for (var tent = 0; tent < 6; tent++) {
        var bate = false;
        for (var t = 0; t < ocupado.length; t++) {
          if (Math.abs(ocupado[t].x - al.x) < 32 && Math.abs(ocupado[t].y - ly) < 9) { bate = true; break; }
        }
        if (!bate) break;
        ly -= 10;
      }
      al._labelY = ly;
      ocupado.push({ x: al.x, y: ly });
    }
    for (var j = 0; j < G.units.length; j++) {
      var u = G.units[j];
      if (u.dead && u.body) continue;   // corpos ficam como mancha
      drawUnit(ctx, u);
    }
  }

  function renderBullets(ctx) {
    for (var i = 0; i < G.bullets.length; i++) {
      var b = G.bullets[i];
      var tx = b.x - b.vx * 0.022, ty = b.y - b.vy * 0.022;
      var grad = ctx.createLinearGradient(tx, ty, b.x, b.y);
      grad.addColorStop(0, 'rgba(255,230,150,0)');
      grad.addColorStop(1, b.team === 'enemy' ? 'rgba(255,190,150,0.95)' : 'rgba(255,245,200,0.95)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  function renderSmoke(ctx) {
    for (var i = 0; i < G.smokes.length; i++) {
      var s = G.smokes[i];
      var a = U.clamp(s.alpha * U.clamp(s.life / 3, 0, 1), 0, 1);
      var grd = ctx.createRadialGradient(s.x, s.y, s.r * 0.15, s.x, s.y, s.r);
      grd.addColorStop(0, 'rgba(214,214,210,' + (a * 0.85) + ')');
      grd.addColorStop(0.6, 'rgba(196,196,194,' + (a * 0.6) + ')');
      grd.addColorStop(1, 'rgba(180,180,180,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.3);
      ctx.fill();
    }
  }

  function renderParticles(ctx) {
    for (var i = 0; i < G.parts.length; i++) {
      var p = G.parts[i];
      var a = p.kind === 'dust' || p.kind === 'blood' ? U.clamp(p.life / 0.5, 0, 1) : U.clamp(p.life / p.maxLife, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 6.3);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    for (var c = 0; c < G.casings.length; c++) {
      var k = G.casings[c];
      ctx.fillStyle = '#c8a24a';
      ctx.fillRect(k.x, k.y, 1.6, 1.2);
    }
  }

  function renderFloats(ctx) {
    ctx.textAlign = 'center';
    for (var i = 0; i < G.floats.length; i++) {
      var f = G.floats[i];
      ctx.globalAlpha = U.clamp(f.life / 0.6, 0, 1);
      ctx.font = 'bold 10px ui-monospace, monospace';
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillText(f.text, f.x + 1, f.y + 1);
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;
  }

  // ------------------------------------------------------------------- HUD
  function renderHUD(ctx) {
    var hud = { fillRect: '#0d1114' };
    // painel do esquadrao
    var x = 10, y = 10, w = 210, rowH = 20;
    var mates = aliveOf('ally').concat(aliveOf('ally').length ? [] : []);
    var all = G.units.filter(function (u) { return u.team === 'ally'; });
    ctx.fillStyle = 'rgba(9,12,14,0.78)';
    ctx.fillRect(x, y, w, 26 + all.length * rowH);
    ctx.strokeStyle = 'rgba(120,140,150,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 0.5, y + 0.5, w - 1, 26 + all.length * rowH - 1);
    ctx.font = 'bold 10px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#8fc3e8';
    ctx.fillText('ESQUADRAO', x + 8, y + 14);
    ctx.fillStyle = '#5d6a72';
    ctx.textAlign = 'right';
    ctx.fillText(G.players === 2 ? '1 = VOCE  2 = PARCEIRO' : '1/2/3/4 TROCAR', x + w - 8, y + 14);
    ctx.textAlign = 'left';

    for (var i = 0; i < all.length; i++) {
      var u = all[i];
      var ry = y + 24 + i * rowH;
      var sel = u.controlled;
      if (sel) {
        ctx.fillStyle = 'rgba(143,217,107,0.14)';
        ctx.fillRect(x + 3, ry, w - 6, rowH - 2);
      }
      ctx.fillStyle = u.dead ? '#7a3a3a' : (u.downed ? '#ff8a5e' : (sel ? '#dff5c9' : '#cfd8de'));
      ctx.font = (sel ? 'bold ' : '') + '10px ui-monospace, monospace';
      ctx.fillText((i + 1) + ' ' + u.name, x + 8, ry + 12);
      // barra de vida
      var bx = x + 96, bw = 48;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx, ry + 4, bw, 7);
      var frac = u.dead ? 0 : U.clamp(u.hp / u.maxHp, 0, 1);
      ctx.fillStyle = u.downed ? '#ff6b4d' : (frac > 0.6 ? '#8fd96b' : frac > 0.3 ? '#ffcf4d' : '#ff6b4d');
      ctx.fillRect(bx + 1, ry + 5, (bw - 2) * frac, 5);
      // municao
      ctx.fillStyle = u.reloading > 0 ? '#ffcf4d' : '#9aa7b0';
      ctx.textAlign = 'right';
      ctx.fillText(u.reloading > 0 ? 'RECARGA' : (u.mag + '/' + u.wdef.mag), x + w - 8, ry + 12);
      ctx.textAlign = 'left';
      // estado
      if (u.downed) {
        ctx.fillStyle = '#ff8a5e';
        ctx.font = '9px ui-monospace, monospace';
        ctx.textAlign = 'right';
        ctx.fillText('CAIDO ' + Math.ceil(u.bleed) + 's', x + w - 62, ry + 12);
        ctx.textAlign = 'left';
      } else if (u.supp > 0.4) {
        ctx.fillStyle = '#ffcf4d';
        ctx.font = '9px ui-monospace, monospace';
        ctx.textAlign = 'right';
        ctx.fillText('SUPRIMIDO', x + w - 62, ry + 12);
        ctx.textAlign = 'left';
      }
    }

    // painel da missao
    var mx = C.W - 268, my = 10, mw = 258;
    ctx.fillStyle = 'rgba(9,12,14,0.78)';
    ctx.fillRect(mx, my, mw, 66);
    ctx.strokeStyle = 'rgba(120,140,150,0.25)';
    ctx.strokeRect(mx + 0.5, my + 0.5, mw - 1, 65);
    ctx.fillStyle = '#8fc3e8';
    ctx.font = 'bold 10px ui-monospace, monospace';
    ctx.fillText(G.map.name, mx + 8, my + 14);
    ctx.fillStyle = '#cfd8de';
    ctx.font = '10px ui-monospace, monospace';
    var m = G.mission;
    var line1 = '', line2 = '';
    if (m.type === 'destroy') { line1 = 'OBJETIVOS  ' + m.done + '/' + m.targets; line2 = 'DESTRUA OS POSTOS'; }
    else if (m.type === 'hold') {
      line1 = 'PRACA  ' + U.mmss(m.holdLeft);
      line2 = 'MANTENHA A AREA';
    } else { line1 = 'INIMIGOS  ' + aliveOf('enemy').filter(function (u) { return !u.downed; }).length; line2 = 'ELIMINE A PATRULHA'; }
    ctx.fillText(line1, mx + 8, my + 32);
    ctx.fillStyle = '#8a99a3';
    ctx.font = '9px ui-monospace, monospace';
    ctx.fillText(line2, mx + 8, my + 46);
    ctx.font = '10px ui-monospace, monospace';
    ctx.fillStyle = G.mission.left < 60 ? '#ff6b4d' : '#cfd8de';
    ctx.fillText('TEMPO ' + U.mmss(G.mission.left), mx + 8, my + 60);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#8fd96b';
    ctx.fillText('ABATES ' + G.kills, mx + mw - 8, my + 32);
    var acc = G.shots ? Math.round(G.hits / G.shots * 100) : 0;
    ctx.fillStyle = '#8a99a3';
    ctx.fillText('PRECISAO ' + acc + '%', mx + mw - 8, my + 46);
    ctx.fillStyle = '#ffd24a';
    ctx.fillText('PONTOS ' + Math.floor(G.score), mx + mw - 8, my + 60);
    ctx.textAlign = 'left';

    // minimapa
    var mmW = 168, mmH = 105, mmX = C.W - mmW - 10, mmY = C.H - mmH - 10;
    ctx.fillStyle = 'rgba(9,12,14,0.8)';
    ctx.fillRect(mmX, mmY, mmW, mmH);
    ctx.strokeStyle = 'rgba(120,140,150,0.3)';
    ctx.strokeRect(mmX + 0.5, mmY + 0.5, mmW - 1, mmH - 1);
    var sx = mmW / C.W, sy = mmH / C.H;
    for (var g = 0; g < G.grid.length; g++) {
      var cell = G.grid[g];
      if (!cell.solid) continue;
      ctx.fillStyle = cell.objective ? 'rgba(255,210,74,0.85)' : 'rgba(120,130,140,0.55)';
      ctx.fillRect(mmX + cell.c * TILE * sx, mmY + cell.r * TILE * sy, TILE * sx, TILE * sy);
    }
    if (G.zone) {
      ctx.strokeStyle = 'rgba(99,210,255,0.8)';
      ctx.lineWidth = 1;
      ctx.strokeRect(mmX + G.zone.x * sx, mmY + G.zone.y * sy, G.zone.w * sx, G.zone.h * sy);
    }
    for (var i2 = 0; i2 < G.units.length; i2++) {
      var u2 = G.units[i2];
      if (u2.dead) continue;
      if (u2.team === 'enemy' && !Vis.isVisible(u2.x, u2.y)) continue;
      ctx.fillStyle = u2.team === 'enemy' ? '#ff6b4d' : (u2.controlled ? '#8fd96b' : '#63d2ff');
      ctx.beginPath();
      ctx.arc(mmX + u2.x * sx, mmY + u2.y * sy, u2.controlled ? 2.6 : 1.8, 0, 6.3);
      ctx.fill();
    }

    // alerta de supressao
    var sup = G.control ? G.control.supp : 0;
    if (sup > 0.35) {
      ctx.save();
      ctx.globalAlpha = U.clamp((sup - 0.35) / 0.65, 0, 1) * 0.3;
      var grd2 = ctx.createRadialGradient(C.W / 2, C.H / 2, C.H * 0.45, C.W / 2, C.H / 2, C.H * 0.8);
      grd2.addColorStop(0, 'rgba(255,40,20,0)');
      grd2.addColorStop(1, 'rgba(255,40,20,0.7)');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, C.W, C.H);
      ctx.restore();
    }
    if (G.alarmFlash > 0) {
      ctx.save();
      ctx.globalAlpha = G.alarmFlash * 0.15;
      ctx.fillStyle = '#ff3b1f';
      ctx.fillRect(0, 0, C.W, C.H);
      ctx.restore();
    }
  }

  function renderFeed(ctx) {
    ctx.font = '10px ui-monospace, monospace';
    ctx.textAlign = 'left';
    for (var i = 0; i < G.feed.length; i++) {
      var f = G.feed[i];
      ctx.globalAlpha = U.clamp(f.life / 1.5, 0, 1) * 0.95;
      ctx.fillStyle = f.color;
      ctx.fillText(f.text, 232, 22 + i * 13);
    }
    ctx.globalAlpha = 1;
  }

  function renderCrosshair(ctx) {
    if (!G.control || G.control.dead) return;
    var mx = G.mouse.x, my = G.mouse.y;
    var spread = G.control.wdef.spread * (1 + G.control.supp * 1.2) * (G.control.walking ? 1.5 : 1);
    var r = 6 + spread * 1.9;
    ctx.save();
    ctx.strokeStyle = 'rgba(180,255,170,0.85)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 4; i++) {
      var a = i * Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(mx + Math.cos(a) * (r - 5), my + Math.sin(a) * (r - 5));
      ctx.lineTo(mx + Math.cos(a) * (r + 6), my + Math.sin(a) * (r + 6));
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(180,255,170,0.9)';
    ctx.fillRect(mx - 1, my - 1, 2, 2);
    ctx.restore();
  }

  function renderOverlays(ctx) {
    if (G.paused && !G.over) {
      ctx.fillStyle = 'rgba(4,6,8,0.6)';
      ctx.fillRect(0, 0, C.W, C.H);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e8f1f6';
      ctx.font = 'bold 30px ui-monospace, monospace';
      ctx.fillText('PAUSA', C.W / 2, C.H / 2 - 10);
      ctx.font = '12px ui-monospace, monospace';
      ctx.fillStyle = '#8a99a3';
      ctx.fillText('P OU ESC PARA CONTINUAR', C.W / 2, C.H / 2 + 18);
    }
    if (G.over) {
      ctx.fillStyle = 'rgba(4,6,8,0.72)';
      ctx.fillRect(0, 0, C.W, C.H);
      ctx.fillStyle = 'rgba(9,12,14,0.88)';
      ctx.fillRect(C.W / 2 - 240, C.H / 2 - 96, 480, 190);
      ctx.strokeStyle = G.won ? 'rgba(143,217,107,0.5)' : 'rgba(255,107,77,0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(C.W / 2 - 239.5, C.H / 2 - 95.5, 479, 189);
      ctx.textAlign = 'center';
      var acc = G.shots ? Math.round(G.hits / G.shots * 100) : 0;
      ctx.fillStyle = G.won ? '#8fd96b' : '#ff6b4d';
      ctx.font = 'bold 34px ui-monospace, monospace';
      ctx.fillText(G.won ? 'MISSAO CUMPRIDA' : 'MISSAO FALHOU', C.W / 2, C.H / 2 - 60);
      ctx.fillStyle = '#cfd8de';
      ctx.font = '13px ui-monospace, monospace';
      ctx.fillText(G.result, C.W / 2, C.H / 2 - 32);
      ctx.fillStyle = '#9aa7b0';
      ctx.fillText('ABATES ' + G.kills + '     PRECISAO ' + acc + '%     PONTOS ' + Math.floor(G.score), C.W / 2, C.H / 2 + 2);
      ctx.fillStyle = '#5d6a72';
      ctx.fillText('TEMPO ' + U.mmss(420 - G.mission.left), C.W / 2, C.H / 2 + 22);
      ctx.fillStyle = '#ffd24a';
      ctx.font = 'bold 12px ui-monospace, monospace';
      ctx.fillText('ENTER PARA VOLTAR AO MENU', C.W / 2, C.H / 2 + 60);
    }
  }

  function renderMenu(ctx) {
    ctx.fillStyle = '#0a0d0f';
    ctx.fillRect(0, 0, C.W, C.H);
    // fundo: textura do primeiro mapa escurecida
    if (!G.menuGround) {
      var g = PT.canvas(C.W, C.H);
      Tex.buildGround(PT.Maps.list[G.menuIndex.map || 0], g);
      G.menuGround = g.cv;
    }
    ctx.globalAlpha = 0.5;
    ctx.drawImage(G.menuGround, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(6,9,11,0.72)';
    ctx.fillRect(0, 0, C.W, C.H);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#8fd96b';
    ctx.font = 'bold 44px ui-monospace, monospace';
    ctx.fillText('FOGO CRUZADO', C.W / 2, 96);
    ctx.fillStyle = '#8a99a3';
    ctx.font = '13px ui-monospace, monospace';
    ctx.fillText('SIMULACAO TATICA DE ESQUADRAO  -  VISao LIMITADA, COBERTURA E SUPRESSAO', C.W / 2, 122);

    var scene = G.menuScene;
    var items = menuItems(scene);
    var idx = G.menuIndex[scene] || 0;
    var boxW = 420, boxH = 60 + items.length * 30;
    var bx = C.W / 2 - boxW / 2, by = 170;
    ctx.fillStyle = 'rgba(10,14,17,0.9)';
    ctx.fillRect(bx, by, boxW, boxH);
    ctx.strokeStyle = 'rgba(120,140,150,0.3)';
    ctx.strokeRect(bx + 0.5, by + 0.5, boxW - 1, boxH - 1);
    ctx.fillStyle = '#5d6a72';
    ctx.font = 'bold 11px ui-monospace, monospace';
    ctx.fillText(scene === 'mode' ? 'MODO DE JOGO' : 'SELECIONE A OPERACAO', C.W / 2, by + 22);

    for (var i = 0; i < items.length; i++) {
      var sel = i === idx;
      var iy = by + 46 + i * 30;
      ctx.font = (sel ? 'bold ' : '') + '15px ui-monospace, monospace';
      ctx.fillStyle = sel ? '#9ee87f' : '#cfd8de';
      ctx.fillText((sel ? '▶  ' : '     ') + items[i], C.W / 2, iy);
      if (scene === 'map') {
        ctx.font = '11px ui-monospace, monospace';
        ctx.fillStyle = sel ? '#c8d6de' : '#5d6a72';
        var map = PT.Maps.list[i];
        ctx.fillText(map.briefing + '   [' + map.mission.type.toUpperCase() + ']', C.W / 2, iy + 15);
      }
    }

    ctx.fillStyle = '#5d6a72';
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('ENTER CONFIRMA   ESC VOLTA', C.W / 2, by + boxH + 26);
    ctx.fillStyle = '#7c8b93';
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillText('MOUSE MIRA E ATIRA   WASD MOVE   R RECARREGA   ESPACO GRANADA   X FUMACA', C.W / 2, C.H - 52);
    ctx.fillText('BOTAO DIREITO ORDENA O ESQUADRAO   SHIFT CORRE   Z DEITA   P PAUSA   M SOM', C.W / 2, C.H - 34);
  }

  G.render = function () {
    var ctx = G.ctx;
    if (!ctx) return;
    if (G.scene === 'menu') { renderMenu(ctx); return; }
    var sx = 0, sy = 0;
    if (G.shake > 0.2) {
      sx = (U.rng() - 0.5) * G.shake * 0.6;
      sy = (U.rng() - 0.5) * G.shake * 0.6;
    }
    ctx.save();
    ctx.translate(sx, sy);
    renderWorld(ctx);
    renderSmoke(ctx);
    renderUnits(ctx);
    renderBullets(ctx);
    renderParticles(ctx);
    renderFloats(ctx);
    ctx.restore();

    // nevoa de guerra
    ctx.save();
    Vis.renderFog(ctx, C.W, C.H);
    ctx.restore();

    // vinheta
    var vg = ctx.createRadialGradient(C.W / 2, C.H / 2, C.H * 0.35, C.W / 2, C.H / 2, C.H * 0.85);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, C.W, C.H);

    renderHUD(ctx);
    renderFeed(ctx);
    if (G.mouse && !G.paused && !G.over) renderCrosshair(ctx);
    renderOverlays(ctx);
  };

  // ---------------------------------------------------------------- update
  G.setInput = function (p1, p2, mouse) {
    G.input = { p1: p1, p2: p2 };
    if (mouse) G.mouse = mouse;
  };

  G.update = function (dt) {
    dt = dt || DT;
    if (G.scene === 'menu') { updateMenu(dt); return; }
    if (G.paused || G.over) {
      if (G.over && (G.uiEnter)) { G.uiEnter = false; G.scene = 'menu'; G.menuScene = 'mode'; Audio.radio('down'); }
      updateParticles(dt);
      return;
    }
    G.time += dt;
    if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 30);
    G.alarmFlash = Math.max(0, (G.alarmFlash || 0) - dt);

    // trocar de soldado
    if (G.swapTo !== undefined && G.swapTo !== null) {
      var target = null;
      for (var i = 0; i < G.units.length; i++) {
        var u = G.units[i];
        if (u.team === 'ally' && u.squadIndex === G.swapTo && !u.dead && !u.downed && !u.player2) target = u;
      }
      if (target && target !== G.control) {
        if (G.control) G.control.controlled = false;
        G.control = target;
        target.controlled = true;
        G.squadOrders.mode = 'seguir';
        say(target, U.pick(['ASSUMINDO!', 'ESTOU NO COMANDO!']), 0.8);
      }
      G.swapTo = null;
    }

    // ordens do esquadrao
    if (G.orderPoint) {
      G.squadOrders.mode = 'avancar';
      G.squadOrders.point = G.orderPoint;
      for (var s = 0; s < G.units.length; s++) {
        var au = G.units[s];
        if (au.team === 'ally' && !au.controlled && !au.dead && !au.downed) {
          goTo(au, G.orderPoint.x + U.rnd(-22, 22), G.orderPoint.y + U.rnd(-22, 22));
        }
      }
      say(G.control, 'AVANCAR!', 1);
      markDecal(G.orderPoint.x, G.orderPoint.y, 'rgba(143,217,107,0.35)', 4);
      G.orderPoint = null;
    }
    if (G.orderFollow) {
      G.squadOrders.mode = 'seguir';
      G.squadOrders.point = null;
      say(G.control, 'SEGUIR!', 1);
      G.orderFollow = false;
    }
    if (G.orderHold) {
      G.squadOrders.mode = 'posicao';
      G.squadOrders.point = { x: G.control.x, y: G.control.y };
      for (var h = 0; h < G.units.length; h++) {
        var hu = G.units[h];
        if (hu.team === 'ally' && !hu.controlled && !hu.dead) { hu.path = null; hu.holdPos = { x: hu.x, y: hu.y }; }
      }
      say(G.control, 'SEGURAR POSICAO!', 1);
      G.orderHold = false;
    }

    G.updateUnits(dt);
    G.updateBullets(dt);
    G.updateGrenades(dt);
    updateSmokes(dt);
    updateParticles(dt);
    if (Math.floor(G.time * 180) % 4 === 0) Vis.compute(G.units);
    G.updateMission(dt);
    Audio.updateAmbience();
  };

  G.autoPause = function () {
    if (G.scene !== 'game' || G.paused || G.over) return;
    G.paused = true;
  };

  G.toggleMute = function () {
    G.muted = !Audio.toggle();
    return G.muted;
  };

  G.hudInfo = function () {
    var mates = G.units.filter(function (u) { return u.team === 'ally'; });
    var squad = mates.map(function (u, i) {
      return {
        slot: (u.squadIndex || 0) + 1,
        name: u.name,
        hp: Math.max(0, Math.round(u.hp)),
        maxHp: u.maxHp,
        weapon: u.wdef.n,
        mag: u.mag,
        magSize: u.wdef.mag,
        reserve: u.wdef.reserve,
        state: u.dead ? 'MORTO' : u.downed ? 'CAIDO ' + Math.ceil(u.bleed) + 's' : u.reloading > 0 ? 'RECARREGANDO' :
          u.supp > 0.4 ? 'SUPRIMIDO' : (u.controlled ? 'CONTROLE' : u.target ? 'COMBATE' : 'EM POSICAO'),
        controlled: !!u.controlled,
        dead: !!u.dead, downed: !!u.downed
      };
    });
    var m = G.mission || { type: 'duel', done: 0, targets: 0, holdLeft: 0, left: 0 };
    return {
      scene: G.scene, paused: G.paused, muted: G.muted, over: G.over, won: !!G.won,
      map: G.map ? G.map.name : '-',
      modeLabel: G.players === 2 ? 'DUPLA' : 'SOLO',
      status: G.scene === 'menu' ? 'MENU' : G.over ? (G.won ? 'MISSAO CUMPRIDA' : 'MISSAO FALHOU') :
        G.paused ? 'PAUSA' : 'EM OPERACAO',
      objective: m.type === 'destroy' ? ('OBJETIVOS ' + m.done + '/' + m.targets)
        : m.type === 'hold' ? ('PRACA ' + U.mmss(Math.max(0, m.holdLeft))) + ' restante'
          : 'ELIMINAR PATRULHA',
      time: U.mmss(m.type === 'hold' ? Math.max(0, m.left) : Math.max(0, m.left)),
      kills: G.kills, score: Math.floor(G.score),
      accuracy: G.shots ? Math.round(G.hits / G.shots * 100) : 0,
      enemies: G.units.filter(function (u) { return u.team === 'enemy' && !u.dead; }).length,
      squad: squad, feed: G.feed.map(function (f) { return { text: f.text, color: f.color }; }),
      grenades: G.control ? G.control.grenades : 0,
      smokes: G.control ? G.control.smokes : 0,
      alert: G.control ? G.control.supp > 0.4 : false
    };
  };

  PT.COLORS = COL;
})(window.PT = window.PT || {});
