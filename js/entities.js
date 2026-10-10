/* ============================================================
   PIXEL CRIME CITY  —  entities.js
   Carros, pedestres, balas e particulas.
   ============================================================ */

/* ---------- colisao circulo x tiles ---------- */
function circleVsTiles(px, py, r) {
  if (!isFinite(px) || !isFinite(py) || !isFinite(r)) return null;
  const t0x = Math.floor((px - r) / 16), t1x = Math.floor((px + r) / 16);
  const t0y = Math.floor((py - r) / 16), t1y = Math.floor((py + r) / 16);
  let bestD = 0, bnx = 0, bny = 0;
  for (let ty = t0y; ty <= t1y; ty++) {
    for (let tx = t0x; tx <= t1x; tx++) {
      if (!World.isSolid(tx, ty)) continue;
      const rx = tx * 16, ry = ty * 16;
      const qx = clamp(px, rx, rx + 16), qy = clamp(py, ry, ry + 16);
      let dx = px - qx, dy = py - qy;
      let d = Math.hypot(dx, dy), ux, uy;
      if (d > 1e-6) { ux = dx / d; uy = dy / d; }
      else {
        /* centro dentro do tile: sai pelo lado mais proximo (vetor unitario!) */
        const l = px - rx, ri = rx + 16 - px, t = py - ry, b = ry + 16 - py;
        const m = Math.min(l, ri, t, b);
        ux = (m === l) ? -1 : (m === ri ? 1 : 0);
        uy = (m === t) ? -1 : (m === b ? 1 : 0);
        d = 0;
      }
      if (d < r) {
        const push = r - d;
        if (push > bestD) { bestD = push; bnx = ux; bny = uy; }
      }
    }
  }
  if (bestD > 0) return { nx: bnx, ny: bny, depth: bestD };
  return null;
}

/* empurra a entidade para fora e devolve o impacto */
function resolveTiles(ent, r, bounce) {
  const hit = circleVsTiles(ent.x, ent.y, r);
  if (!hit) return 0;
  ent.x += hit.nx * hit.depth;
  ent.y += hit.ny * hit.depth;
  const vn = ent.vx * hit.nx + ent.vy * hit.ny;
  if (vn < 0) {
    ent.vx -= vn * hit.nx * (1 + (bounce || 0));
    ent.vy -= vn * hit.ny * (1 + (bounce || 0));
    return -vn;
  }
  return 0;
}

function resolveProps(ent, r, tmp) {
  if (!World.propGrid) return 0;
  const list = World.queryProps(ent.x, ent.y, r + 8, tmp);
  let impact = 0;
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    const dx = ent.x - p.x, dy = ent.y - p.y;
    const rr = r + p.r;
    const d2 = dx * dx + dy * dy;
    if (d2 > rr * rr || d2 === 0) continue;
    const d = Math.sqrt(d2);
    const push = rr - d;
    const nx = dx / d, ny = dy / d;
    ent.x += nx * push; ent.y += ny * push;
    const vn = ent.vx * nx + ent.vy * ny;
    if (vn < 0) { ent.vx -= vn * nx * 1.2; ent.vy -= vn * ny * 1.2; impact = Math.max(impact, -vn); }
  }
  return impact;
}

function pedDirIndex(a) {
  const s = Math.sin(a), c = Math.cos(a);
  if (Math.abs(c) > Math.abs(s)) return c > 0 ? 2 : 3;
  return s > 0 ? 0 : 1;
}

/* ============================================================
   CARRO
   ============================================================ */
class Car {
  constructor(typeIdx, x, y, angle, state) {
    this.t = CARS[typeIdx];
    this.typeIdx = typeIdx;
    this.x = x; this.y = y; this.angle = angle;
    this.vx = 0; this.vy = 0; this.speed = 0;
    this.throttle = 0; this.steer = 0; this.brake = false; this.handbrake = false;
    this.state = state || 'traffic';   // traffic | parked | police | wreck
    this.health = 100;
    this.dir = Math.round(angle / (Math.PI / 2)) & 3;
    this.wp = null; this.wpT = 0; this.lastCross = ''; this.turnPending = null;
    this.driver = null;
    this.burning = false; this.fireT = 0; this.wreckT = 0;
    this.siren = false; this.sirenT = 0;
    this.hitFlash = 0; this.skidT = 0; this.stuckT = 0; this.reverseT = 0;
    this.hornT = 0; this.alive = true;
    this.turnRate = 2.3 * this.t.grip;
    this.radius = Math.max(this.t.w, this.t.h) * 0.32;
  }

  setWP() {
    const W = World;
    const tx = Math.floor(this.x / 16), ty = Math.floor(this.y / 16);

    /* fora do asfalto: volta para a rua mais proxima */
    if (!W.isRoad(tx, ty)) {
      const n = W.nearestRoad(tx, ty, 10);
      this.wp = { x: n.tx * 16 + 8, y: n.ty * 16 + 8 };
      this.wpT = 0; this.offroad = true;
      return;
    }
    this.offroad = false;

    const dirsValid = [];
    for (let d = 0; d < 4; d++) if (W.validDir(tx, ty, d)) dirsValid.push(d);
    const semVolta = dirsValid.filter(d => d !== (this.dir + 2) % 4);

    if (W.isCross(tx, ty)) {
      const key = tx + ':' + ty;
      if (this.lastCross !== key) {
        this.lastCross = key;
        if (this.state === 'police' && G.player && G.player.alive) {
          let best = null, bd = Infinity;
          for (const d of semVolta) {
            const dv = DIRV[d];
            const nx = (tx + dv[0]) * 16 + 8, ny = (ty + dv[1]) * 16 + 8;
            const dx = nx - G.player.x, dy = ny - G.player.y;
            const dd = dx * dx + dy * dy;
            if (dd < bd) { bd = dd; best = d; }
          }
          if (best !== null) this.turnPending = best;
        } else if (Math.random() < 0.34 && semVolta.length > 1) {
          this.turnPending = semVolta[(Math.random() * semVolta.length) | 0];
        }
      }
      let nd = this.dir;
      if (this.turnPending !== null && W.validDir(tx, ty, this.turnPending)) nd = this.turnPending;
      this.turnPending = null;
      if (!W.validDir(tx, ty, nd)) nd = semVolta.length ? semVolta[(Math.random() * semVolta.length) | 0] : (this.dir + 2) % 4;
      this.dir = nd;
      const dv = DIRV[nd];
      this.wp = W.lanePoint(tx + dv[0], ty + dv[1], nd);
      this.wpT = 0;
      return;
    }

    /* via normal: segue a faixa ate o proximo no */
    let nd = this.dir;
    if (!W.validDir(tx, ty, nd)) {
      nd = semVolta.length ? semVolta[(Math.random() * semVolta.length) | 0] : (this.dir + 2) % 4;
      this.dir = nd;
    }
    const dv = DIRV[nd];
    const ntx = tx + dv[0], nty = ty + dv[1];
    this.wp = W.isCross(ntx, nty) ? W.crossingNode(ntx, nty, nd) : W.lanePoint(ntx, nty, nd);
    this.wpT = 0;
  }

  ai(dt, ahead_list) {
    if (!this.wp) this.setWP();
    let dx = this.wp.x - this.x, dy = this.wp.y - this.y;
    let d = Math.hypot(dx, dy);
    if (d < 12 || this.wpT > 5) { this.setWP(); dx = this.wp.x - this.x; dy = this.wp.y - this.y; d = Math.hypot(dx, dy); }

    const want = Math.atan2(dy, dx);
    const diff = angNorm(want - this.angle);
    this.steer = clamp(diff * 3.2, -1, 1);

    // obstaculo a frente
    const fx = Math.cos(this.angle), fy = Math.sin(this.angle);
    const look = 16 + Math.abs(this.speed) * 0.42;
    let blocked = false;
    for (let i = 0; i < ahead_list.length; i++) {
      const o = ahead_list[i];
      if (o === this) continue;
      const rx = o.x - this.x, ry = o.y - this.y;
      const fwd = rx * fx + ry * fy;
      if (fwd <= 0 || fwd > look) continue;
      const lat = Math.abs(-rx * fy + ry * fx);
      if (lat < (o.t.w * 0.5 + this.t.w * 0.5) * 0.85 + 2) { blocked = true; break; }
    }
    // pedestres na frente
    const peds = G.peds;
    for (let i = 0; i < peds.length; i++) {
      const p = peds[i];
      if (p.state === 'dead') continue;
      const rx = p.x - this.x, ry = p.y - this.y;
      const fwd = rx * fx + ry * fy;
      if (fwd <= 0 || fwd > look * 0.7) continue;
      if (Math.abs(-rx * fy + ry * fx) < this.t.w * 0.5 + 3) { blocked = true; break; }
    }

    let maxS = this.state === 'police' ? this.t.top : this.t.top * 0.72;
    if (this.offroad) maxS = Math.min(maxS, 55);
    this.blocked = blocked;
    if (blocked) {
      this.throttle = 0;
      this.brake = this.speed > 25;
    } else {
      this.brake = false;
      this.throttle = this.speed < maxS ? 1 : 0;
    }
    /* contador de atolamento: conta tempo quase parado, bloqueado ou nao */
    if (Math.abs(this.speed) < 10) this.stuckT += dt;
    else this.stuckT = Math.max(0, this.stuckT - dt * 0.6);
    // curvas fechadas reduzem a velocidade
    if (Math.abs(this.steer) > 0.5 && this.speed > 70) { this.throttle = 0; this.brake = true; }

    /* desatolador: da a re ate achar um cruzamento e entao escolhe outro caminho */
    if (this.stuckT > 2.2 && !this.unstick) { this.unstick = true; this.unstickT = 0; this.stuckT = 0; }
    if (this.unstick) {
      this.unstickT += dt;
      this.throttle = -1; this.brake = false; this.steer = 0;
      const tx = Math.floor(this.x / 16), ty = Math.floor(this.y / 16);
      if ((World.isCross(tx, ty) && this.unstickT > 0.5) || this.unstickT > 4.5) {
        this.unstick = false; this.stuckT = 0;
        this.setWP();
      }
    }
  }

  physics(dt) {
    const t = this.t;
    let fx = Math.cos(this.angle), fy = Math.sin(this.angle);
    let vf = this.vx * fx + this.vy * fy;
    let vl = -this.vx * fy + this.vy * fx;

    if (this.throttle > 0) vf += t.accel * this.throttle * dt;
    else if (this.throttle < 0) vf += t.accel * 0.75 * this.throttle * dt;

    if (this.brake) {
      const b = t.accel * 1.5 * dt;
      if (Math.abs(vf) <= b) vf = 0; else vf -= Math.sign(vf) * b;
    }
    if (this.handbrake) vf -= vf * 1.6 * dt;
    const drag = (this.throttle === 0 ? 0.85 : 0.10) + (this.handbrake ? 0.6 : 0);
    vf -= vf * drag * dt;

    vf = clamp(vf, -t.top * 0.35, t.top);

    // esterco (IA vira mais fechado para caber no cruzamento)
    const sf = clamp(Math.abs(vf) / 42, 0, 1);
    const tr = this.turnRate * (this.state === 'traffic' || this.state === 'police' ? 2.3 : 1);
    this.angle += this.steer * tr * dt * sf * (vf < -1 ? -1 : 1);
    fx = Math.cos(this.angle); fy = Math.sin(this.angle);

    // derrapagem lateral
    const grip = this.handbrake ? 0.05 : 0.0009;
    vl *= Math.pow(grip, dt);
    if (this.handbrake && Math.abs(vl) < 90) vl += this.steer * -Math.abs(vf) * 0.55 * dt;

    this.vx = clamp(fx * vf - fy * vl, -900, 900);
    this.vy = clamp(fy * vf + fx * vl, -900, 900);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.speed = vf;
    this.lat = vl;
  }

  collideWorld(tmp) {
    const t = this.t;
    const fx = Math.cos(this.angle), fy = Math.sin(this.angle);
    const off = Math.max(2, t.h * 0.24);
    let impact = 0;
    for (let s = -1; s <= 1; s += 2) {
      const ox = this.x + fx * off * s, oy = this.y + fy * off * s;
      const hit = circleVsTiles(ox, oy, t.w * 0.5);
      if (hit) {
        this.x += hit.nx * hit.depth;
        this.y += hit.ny * hit.depth;
        const vn = this.vx * hit.nx + this.vy * hit.ny;
        if (vn < 0) {
          this.vx -= vn * hit.nx * 1.25;
          this.vy -= vn * hit.ny * 1.25;
          impact = Math.max(impact, -vn);
        }
      }
    }
    impact = Math.max(impact, resolveProps(this, t.w * 0.5, tmp));
    if (impact > 30) {
      this.hurt(impact * 0.09);
      if (G.inCar === this) { G.shake = Math.min(6, impact * 0.06); Sfx.crash(impact); }
      Particles.sparks(this.x, this.y, 4);
    }
    return impact;
  }

  hurt(v) {
    if (this.burning) return;
    this.health -= v;
    this.hitFlash = 0.12;
    if (this.health <= 0) this.explode();
  }

  explode() {
    if (this.burning) return;
    this.burning = true;
    this.health = 0;
    this.throttle = 0; this.brake = true;
    Particles.explosion(this.x, this.y);
    Sfx.boom();
    const d = dist2(this.x, this.y, G.player.x, G.player.y);
    const sh = clamp(300 / (1 + d * 0.02), 0, 10);
    if (sh > G.shake) G.shake = sh;
    if (d < 40 * 40) G.player.hurt(clamp(70 - Math.sqrt(d), 0, 70));
    if (G.inCar === this) exitCar(true);
    if (this.state === 'police') G.wanted = Math.min(4, G.wanted + 0.5);
    G.stats.booms++;
  }

  /* protecao: se a posicao/velocidade virar absurda, recoloca o carro na rua */
  sanity() {
    const bad = !isFinite(this.x) || !isFinite(this.y) || !isFinite(this.vx) || !isFinite(this.vy) ||
      !isFinite(this.angle) || Math.abs(this.x) > 1e6 || Math.abs(this.y) > 1e6;
    if (!bad) return false;
    const p = World.randomRoad(Math.random, 60);
    this.x = p.x; this.y = p.y; this.vx = 0; this.vy = 0; this.speed = 0;
    this.angle = Math.atan2(DIRV[p.dir][1], DIRV[p.dir][0]);
    this.dir = p.dir; this.wp = null; this.stuckT = 0; this.unstick = false;
    return true;
  }

  update(dt, tmp) {
    if (this.sanity()) return;
    if (this.burning) {
      this.fireT += dt;
      this.vx *= Math.pow(0.05, dt); this.vy *= Math.pow(0.05, dt);
      this.x += this.vx * dt; this.y += this.vy * dt;
      if (Math.random() < dt * 12) Particles.fire(this.x + (Math.random() * 8 - 4), this.y + (Math.random() * 8 - 4));
      if (Math.random() < dt * 3) Particles.smoke(this.x, this.y - 4, 1);
      if (this.fireT > 6 && this.state !== 'wreck') { this.state = 'wreck'; }
      return;
    }
    if (this.state === 'parked') { this.physics(dt); this.collideWorld(tmp); return; }
    if (this.state === 'wreck') return;

    this.wpT += dt;
    if (this.state === 'traffic' || this.state === 'police') this.ai(dt, G.cars);

    /* meio-fio: carros da IA nao podem sair do asfalto */
    const ia = (this.state === 'traffic' || this.state === 'police');
    const preX = this.x, preY = this.y;
    const wasRoad = World.isRoad(Math.floor(this.x / 16), Math.floor(this.y / 16));
    this.physics(dt);
    if (ia && wasRoad && !World.isRoad(Math.floor(this.x / 16), Math.floor(this.y / 16))) {
      this.x = preX; this.y = preY;
      this.speed *= 0.5; this.vx *= 0.3; this.vy *= 0.3;
      this.stuckT += dt * 2;
    }
    this.collideWorld(tmp);
    if (this.hitFlash > 0) this.hitFlash -= dt;

    // marca de pneu
    const skidding = (this.handbrake && Math.abs(this.speed) > 40) || Math.abs(this.lat || 0) > 55;
    if (skidding && this.skidT <= 0) {
      this.skidT = 0.02;
      const fx = Math.cos(this.angle), fy = Math.sin(this.angle);
      for (let s = -1; s <= 1; s += 2) {
        Particles.skid(this.x + fx * this.t.h * 0.24 * s, this.y + fy * this.t.h * 0.24 * s);
      }
    }
    if (this.skidT > 0) this.skidT -= dt;

    if (this.t.id === 'police' && this.state === 'police') {
      this.sirenT += dt;
      this.siren = (G.wanted > 0);
    }
  }

  draw(x, cam) {
    const S = this.t.S;
    const idx = ((Math.round(this.angle / TAU * A32) % A32) + A32) % A32;
    const spr = this.burning ? wreckSprite(this.t)[idx] : this.t.rot[idx];
    const px = Math.round(this.x - cam.x - S / 2), py = Math.round(this.y - cam.y - S / 2);
    x.drawImage(spr, px, py);
    if (this.hitFlash > 0) {
      x.save();
      x.globalCompositeOperation = 'lighter';
      x.fillStyle = 'rgba(255,220,180,0.35)';
      x.fillRect(px, py, S, S);
      x.restore();
    }
    // luzes de freio
    if (this.brake && this.speed > 3 && !this.burning) {
      x.save();
      x.translate(this.x - cam.x, this.y - cam.y);
      x.rotate(this.angle);
      x.fillStyle = '#ff5238';
      x.fillRect(-this.t.w / 2, this.t.h / 2 - 2, 2, 2);
      x.fillRect(this.t.w / 2 - 2, this.t.h / 2 - 2, 2, 2);
      x.restore();
    }
    // farois (sempre acesos)
    if (!this.burning) {
      x.save();
      x.translate(this.x - cam.x, this.y - cam.y);
      x.rotate(this.angle);
      x.fillStyle = 'rgba(255,240,190,0.85)';
      x.fillRect(-this.t.w / 2, -this.t.h / 2 - 1, 2, 1);
      x.fillRect(this.t.w / 2 - 2, -this.t.h / 2 - 1, 2, 1);
      x.restore();
    }
    // giroflex
    if (this.t.id === 'police' && this.siren) {
      const ph = Math.floor(this.sirenT * 8) % 2;
      x.save();
      x.translate(this.x - cam.x, this.y - cam.y);
      x.rotate(this.angle);
      x.fillStyle = ph ? '#ff3b30' : '#3b7bff';
      x.fillRect(-4, -3, 8, 3);
      x.globalAlpha = 0.35;
      x.fillStyle = ph ? '#ff3b30' : '#3b7bff';
      x.fillRect(-6, -5, 12, 7);
      x.restore();
      if (Math.random() < 0.25) Particles.sparkLight(this.x, this.y, ph ? '#ff3b30' : '#3b7bff');
    }
  }
}

/* ============================================================
   PEDESTRE
   ============================================================ */
class Ped {
  constructor(palIdx, x, y, isPlayer) {
    this.palIdx = palIdx;
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.angle = Math.PI / 2;
    this.state = 'walk';        // walk | flee | dead | cower
    this.frame = 0; this.anim = 0;
    this.speed = 34 + Math.random() * 12;
    this.tx = x; this.ty = y;
    this.retarget = 0;
    this.alive = true;
    this.isPlayer = !!isPlayer;
    this.hitFlash = 0;
    this.deadT = 0;
    this.radius = 4;
    this.panic = 0;
  }

  newTarget(awayFrom) {
    for (let i = 0; i < 24; i++) {
      let a = Math.random() * TAU, r = 26 + Math.random() * 76;
      if (awayFrom) a = Math.atan2(this.y - awayFrom.y, this.x - awayFrom.x) + (Math.random() - 0.5);
      const nx = this.x + Math.cos(a) * r, ny = this.y + Math.sin(a) * r;
      if (nx < 40 || ny < 40 || nx > World.W * 16 - 40 || ny > World.H * 16 - 40) continue;
      // caminho livre (sem atravessar rua)
      let ok = true;
      const steps = Math.ceil(r / 6);
      for (let s = 1; s <= steps; s++) {
        const px = this.x + (nx - this.x) * s / steps, py = this.y + (ny - this.y) * s / steps;
        const tt = World.at(Math.floor(px / 16), Math.floor(py / 16));
        if (tt === T_ROAD || tt === T_WATER) { ok = false; break; }
      }
      if (!ok) continue;
      this.tx = nx; this.ty = ny; this.retarget = 0; return;
    }
    this.tx = this.x; this.ty = this.y; this.retarget = 0;
  }

  /* protecao: se a posicao/velocidade virar absurda, recoloca o pedestre na calcada */
  sanity() {
    const bad = !isFinite(this.x) || !isFinite(this.y) || !isFinite(this.vx) || !isFinite(this.vy) ||
      Math.abs(this.x) > 1e6 || Math.abs(this.y) > 1e6;
    if (!bad) return false;
    const p = World.randomSidewalk(Math.random, 60);
    this.x = p.x; this.y = p.y; this.vx = 0; this.vy = 0;
    this.tx = p.x; this.ty = p.y; this.retarget = 0;
    return true;
  }

  update(dt, tmp) {
    if (this.state === 'dead') { this.deadT += dt; return; }
    if (this.sanity()) return;
    this.retarget += dt;
    let dx = this.tx - this.x, dy = this.ty - this.y;
    const d = Math.hypot(dx, dy);
    if (d < 5 || this.retarget > 6) {
      if (this.state === 'flee') this.newTarget(this.fleeFrom);
      else this.newTarget();
    }
    const sp = (this.state === 'flee' ? this.speed * 1.9 : (this.state === 'cower' ? 0 : this.speed));
    if (sp > 0 && d > 1) {
      this.angle = angTo(this.angle, Math.atan2(dy, dx), 1 - Math.pow(0.001, dt));
      this.vx = Math.cos(this.angle) * sp;
      this.vy = Math.sin(this.angle) * sp;
    } else {
      this.vx *= Math.pow(0.01, dt); this.vy *= Math.pow(0.01, dt);
    }
    this.vx = clamp(this.vx, -400, 400); this.vy = clamp(this.vy, -400, 400);
    this.x += this.vx * dt; this.y += this.vy * dt;

    resolveTiles(this, 3.2, 0);
    resolveProps(this, 3.2, tmp);

    this.anim += dt * sp * 0.13;
    this.frame = sp > 2 ? (1 + (Math.floor(this.anim) % 2)) : 0;
    if (this.hitFlash > 0) this.hitFlash -= dt;
    if (this.panic > 0) {
      this.panic -= dt;
      if (this.panic <= 0 && this.state === 'flee') this.state = 'walk';
    }
  }

  scare(fromX, fromY, t) {
    if (this.state === 'dead' || this.isPlayer) return;
    this.state = 'flee';
    this.panic = t || 3;
    this.fleeFrom = { x: fromX, y: fromY };
    this.newTarget(this.fleeFrom);
  }

  kill(dirX, dirY) {
    if (this.state === 'dead') return;
    this.state = 'dead';
    this.alive = false;
    this.vx = 0; this.vy = 0;
    Particles.blood(this.x, this.y, dirX, dirY);
    Sfx.squish();
  }

  draw(x, cam) {
    const spr = PEDS[this.palIdx];
    const d = pedDirIndex(this.angle);
    let img = spr.dirs[d][this.frame];
    const px = Math.round(this.x - cam.x - 5), py = Math.round(this.y - cam.y - 13);
    if (this.state === 'dead') {
      x.save();
      x.translate(this.x - cam.x, this.y - cam.y);
      x.rotate(this.deadRot || (this.deadRot = Math.random() * TAU));
      x.translate(0, 2);
      x.fillStyle = 'rgba(120,20,25,0.55)';
      x.beginPath(); x.ellipse(0, 0, 8, 5, 0, 0, TAU); x.fill();
      x.drawImage(img, -5, -13);
      x.restore();
      return;
    }
    if (this.hitFlash > 0) {
      x.save(); x.globalCompositeOperation = 'lighter';
      x.fillStyle = 'rgba(255,120,120,0.4)'; x.fillRect(px, py, 11, 14); x.restore();
    }
    x.drawImage(img, px, py);
  }
}

/* ============================================================
   PARTICULAS
   ============================================================ */
const Particles = {
  list: [],
  reset() { this.list.length = 0; },
  add(p) { if (this.list.length < 900) this.list.push(p); },
  smoke(x, y, n) {
    this.add({ t: 'smoke', x: x, y: y, vx: (Math.random() - 0.5) * 12, vy: -10 - Math.random() * 14, life: 0.7 + Math.random() * 0.6, max: 1.3, s: 2 + Math.random() * 2 });
  },
  fire(x, y) {
    this.add({ t: 'fire', x: x, y: y, vx: (Math.random() - 0.5) * 14, vy: -18 - Math.random() * 22, life: 0.25 + Math.random() * 0.3, max: 0.55, s: 2 + Math.random() * 3 });
  },
  sparks(x, y, n) {
    for (let i = 0; i < n; i++)
      this.add({ t: 'spark', x: x, y: y, vx: (Math.random() - 0.5) * 120, vy: (Math.random() - 0.5) * 120, life: 0.15 + Math.random() * 0.25, max: 0.4 });
  },
  blood(x, y, dx, dy) {
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * TAU, s = 10 + Math.random() * 70;
      this.add({
        t: 'blood', x: x, y: y,
        vx: Math.cos(a) * s * 0.5 + (dx || 0) * 30, vy: Math.sin(a) * s * 0.5 + (dy || 0) * 30,
        life: 0.4 + Math.random() * 0.5, max: 0.9, s: 1 + Math.random() * 2
      });
    }
    this.add({ t: 'stain', x: x, y: y, vx: 0, vy: 0, life: 14, max: 14, s: 6 + Math.random() * 4 });
  },
  skid(x, y) {
    this.add({ t: 'skid', x: x, y: y, vx: 0, vy: 0, life: 7, max: 7, s: 2 });
  },
  dust(x, y) {
    this.add({ t: 'dust', x: x, y: y, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, life: 0.2, max: 0.2 });
  },
  explosion(x, y) {
    for (let i = 0; i < 26; i++) {
      const a = Math.random() * TAU, s = 30 + Math.random() * 120;
      this.add({ t: 'fire', x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.3 + Math.random() * 0.5, max: 0.8, s: 2 + Math.random() * 3 });
    }
    for (let i = 0; i < 14; i++)
      this.add({ t: 'smoke', x: x, y: y, vx: (Math.random() - 0.5) * 50, vy: -20 - Math.random() * 30, life: 1 + Math.random(), max: 2, s: 3 + Math.random() * 3 });
  },
  sparkLight(x, y, col) {
    this.add({ t: 'glow', x: x, y: y, vx: 0, vy: 0, life: 0.12, max: 0.12, col: col });
  },
  update(dt) {
    const L = this.list;
    for (let i = L.length - 1; i >= 0; i--) {
      const p = L[i];
      p.life -= dt;
      if (p.life <= 0) { L.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.t === 'fire') { p.vy += 30 * dt; p.vx *= 0.9; }
      if (p.t === 'smoke') { p.vy -= 6 * dt; p.vx *= 0.94; }
      if (p.t === 'spark') { p.vx *= 0.86; p.vy *= 0.86; }
      if (p.t === 'blood') { p.vx *= 0.86; p.vy *= 0.86; }
    }
  },
  draw(x, cam) {
    const L = this.list;
    for (let i = 0; i < L.length; i++) {
      const p = L[i];
      const px = Math.round(p.x - cam.x), py = Math.round(p.y - cam.y);
      if (px < -20 || py < -20 || px > VW + 20 || py > VH + 20) continue;
      const k = p.life / p.max;
      switch (p.t) {
        case 'smoke':
          x.fillStyle = 'rgba(70,70,78,' + (0.5 * k).toFixed(3) + ')';
          x.fillRect(px, py, Math.max(1, p.s * (1.4 - k)), Math.max(1, p.s * (1.4 - k)));
          break;
        case 'fire':
          x.fillStyle = k > 0.6 ? '#ffe58a' : (k > 0.3 ? '#ff9a3c' : '#c94a2a');
          x.fillRect(px, py, Math.max(1, p.s * k + 1), Math.max(1, p.s * k + 1));
          break;
        case 'spark':
          x.fillStyle = '#ffe9a0'; x.fillRect(px, py, 1, 1);
          break;
        case 'blood':
          x.fillStyle = k > 0.5 ? '#c02a2a' : '#7d1c1c';
          x.fillRect(px, py, Math.max(1, p.s * 0.8), Math.max(1, p.s * 0.8));
          break;
        case 'stain':
          x.fillStyle = 'rgba(110,20,24,' + (0.45 * Math.min(1, k * 3)).toFixed(3) + ')';
          x.beginPath(); x.ellipse(px, py, p.s, p.s * 0.6, 0, 0, TAU); x.fill();
          break;
        case 'skid':
          x.fillStyle = 'rgba(18,16,20,' + (0.42 * Math.min(1, k * 1.5)).toFixed(3) + ')';
          x.fillRect(px, py, 2, 2);
          break;
        case 'dust':
          x.fillStyle = 'rgba(200,190,170,' + (0.5 * k) + ')'; x.fillRect(px, py, 2, 2);
          break;
        case 'glow':
          x.globalAlpha = 0.5 * k;
          x.fillStyle = p.col; x.fillRect(px - 3, py - 3, 7, 7);
          x.globalAlpha = 1;
          break;
      }
    }
  }
};
