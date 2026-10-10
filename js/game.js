/* ============================================================
   PIXEL CRIME CITY  —  game.js
   Loop principal, input, camera, HUD, audio e regras do jogo.
   ============================================================ */

const G = {
  state: 'menu',          // menu | play | paused | wasted | busted
  player: null, inCar: null,
  cars: [], peds: [], bullets: [], msgs: [],
  cam: { x: 0, y: 0 },
  shake: 0,
  money: 0, wanted: 0, crimeT: 0, bustT: 0, deadT: 0,
  time: 0, hintT: 0,
  stats: { kills: 0, jacks: 0, booms: 0, km: 0 },
  tmp: [], tmp2: [],
  mouse: { x: 0, y: 0, active: false },
  flash: 0,
  rnd: mkrand(20241)
};

/* ---------------- input ---------------- */
const Input = {
  up: 0, down: 0, left: 0, right: 0,
  handbrake: 0, fire: 0, enterEdge: 0, enter: 0,
  touch: false, joy: { x: 0, y: 0, active: false }
};
const KEY = {};
function keyName(e) { return (e.key || '').toLowerCase(); }

/* ---------------- audio ---------------- */
const Sfx = {
  ctx: null, master: null, on: true, eng: null, engGain: null, engFilt: null, sirenOn: false,
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.3;
      this.master.connect(this.ctx.destination);
    } catch (e) { this.ctx = null; }
  },
  resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
  blip(freq, dur, type, vol, slideTo) {
    if (!this.ctx || !this.on) return;
    try {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), this.ctx.currentTime + dur);
      g.gain.setValueAtTime(vol || 0.15, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      o.connect(g); g.connect(this.master);
      o.start(); o.stop(this.ctx.currentTime + dur + 0.02);
    } catch (e) { }
  },
  noise(dur, vol, filt) {
    if (!this.ctx || !this.on) return;
    try {
      const n = Math.floor(this.ctx.sampleRate * dur);
      const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = this.ctx.createBufferSource(); src.buffer = buf;
      const g = this.ctx.createGain(); g.gain.value = vol || 0.2;
      if (filt) {
        const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filt;
        src.connect(f); f.connect(g);
      } else src.connect(g);
      g.connect(this.master); src.start();
    } catch (e) { }
  },
  shot() { this.blip(760, 0.09, 'square', 0.14, 180); this.noise(0.09, 0.14, 2600); },
  boom() { this.noise(0.55, 0.5, 900); this.blip(120, 0.5, 'sawtooth', 0.25, 30); },
  squish() { this.blip(220, 0.14, 'sine', 0.16, 70); this.noise(0.12, 0.1, 700); },
  crash(v) { this.noise(0.16, clamp(v / 260, 0.08, 0.35), 1600); this.blip(90, 0.12, 'square', 0.12, 40); },
  skid() { this.noise(0.25, 0.06, 3200); },
  siren() { this.blip(880, 0.22, 'square', 0.05, 620); },
  cash() { this.blip(1180, 0.07, 'square', 0.1, 1500); },
  jack() { this.blip(420, 0.12, 'sawtooth', 0.12, 700); },
  startEngine() {
    if (!this.ctx || this.eng) return;
    try {
      const o = this.ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 60;
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 620; f.Q.value = 3;
      const g = this.ctx.createGain(); g.gain.value = 0.0;
      o.connect(f); f.connect(g); g.connect(this.master); o.start();
      this.eng = o; this.engGain = g; this.engFilt = f;
    } catch (e) { }
  },
  stopEngine() {
    if (!this.eng) return;
    try { this.engGain.gain.value = 0; this.eng.stop(this.ctx.currentTime + 0.05); } catch (e) { }
    this.eng = null; this.engGain = null;
  },
  engine(speed, load, top) {
    if (!this.eng || !this.on) return;
    try {
      const k = clamp(Math.abs(speed) / (top || 200), 0, 1);
      this.eng.frequency.value = 46 + k * 150 + (load > 0 ? 12 : 0);
      this.engFilt.frequency.value = 420 + k * 1100;
      this.engGain.gain.value = 0.035 + k * 0.05;
    } catch (e) { }
  }
};

/* ---------------- canvas ---------------- */
let wcv, wctx, ucv, uctx, uiScale = 1, dispScale = 1, wrap;

function setupCanvas() {
  wcv = document.getElementById('game');
  wctx = wcv.getContext('2d');
  ucv = document.getElementById('ui');
  uctx = ucv.getContext('2d');
  wcv.width = VW; wcv.height = VH;
  wctx.imageSmoothingEnabled = false;
  wrap = document.getElementById('wrap');
  resize();
  window.addEventListener('resize', resize);
}

function resize() {
  const winW = window.innerWidth, winH = window.innerHeight;
  let s = Math.min(winW / VW, winH / VH);
  s = s >= 1 ? Math.floor(s) : s;
  if (!isFinite(s) || s <= 0) s = 1;
  dispScale = s;
  const dpr = window.devicePixelRatio || 1;
  const cw = Math.round(VW * s), ch = Math.round(VH * s);
  wcv.style.width = cw + 'px'; wcv.style.height = ch + 'px';
  ucv.style.width = cw + 'px'; ucv.style.height = ch + 'px';
  ucv.width = Math.round(cw * dpr); ucv.height = Math.round(ch * dpr);
  uiScale = s * dpr;
  wrap.style.width = cw + 'px'; wrap.style.height = ch + 'px';
  uctx.setTransform(uiScale, 0, 0, uiScale, 0, 0);
  uctx.imageSmoothingEnabled = false;
  uctx.textBaseline = 'top';
}

/* ---------------- inicio ---------------- */
function initGame() {
  buildCarTypes();
  buildPedSprites();
  World.init(20241010);
  G.cars.length = 0; G.peds.length = 0; G.bullets.length = 0; G.msgs.length = 0;
  Particles.reset();
  spawnParked();
  const st = findStart();
  G.player = new Ped(PEDS.length - 1, st.x, st.y, true);
  G.player.health = 100;
  G.player.shootCd = 0;
  G.player.alive = true;
  G.money = 250; G.wanted = 0; G.crimeT = 0; G.bustT = 0; G.deadT = 0;
  G.stats = { kills: 0, jacks: 0, booms: 0, km: 0 };
  G.time = 0; G.hintT = 0; G.shake = 0;
  G.inCar = null;
  for (let i = 0; i < 26; i++) spawnPed();
  for (let i = 0; i < 20; i++) spawnTraffic();
  G.cam.x = G.player.x - VW / 2; G.cam.y = G.player.y - VH / 2;
  clampCam();
}

function findStart() {
  const cx = 52, cy = 56;
  for (let r = 0; r < 30; r++) {
    for (let a = 0; a < 24; a++) {
      const tx = cx + Math.round(Math.cos(a) * r), ty = cy + Math.round(Math.sin(a) * r);
      if (World.at(tx, ty) === T_SIDE) return { x: tx * 16 + 8, y: ty * 16 + 8 };
    }
  }
  return { x: cx * 16 + 8, y: cy * 16 + 8 };
}

/* ---------------- spawns ---------------- */
function rndType(excludePolice) {
  const r = Math.random();
  let idx;
  if (r < 0.34) idx = 0 + (Math.random() * 5 | 0);          // sedan
  else if (r < 0.5) idx = 5 + (Math.random() * 3 | 0);       // sports
  else if (r < 0.63) idx = 8 + (Math.random() * 3 | 0);      // van
  else if (r < 0.76) idx = 11 + (Math.random() * 2 | 0);     // pickup
  else if (r < 0.86) idx = 13 + (Math.random() * 2 | 0);     // truck
  else if (r < 0.95) idx = 15;                               // taxi
  else idx = 16;                                             // police
  if (excludePolice && idx === 16) idx = (Math.random() * 16) | 0;
  return Math.min(idx, CARS.length - 1);
}

function spawnParked() {
  const rnd = mkrand(555);
  for (const l of World.lots) {
    const X = l.x * 16, Y = l.y * 16, Wd = l.w * 16, Ht = l.h * 16;
    const rows = 2, cols = Math.max(1, Math.floor(Wd / 26));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (rnd() < 0.28) continue;
        const x = X + (c + 0.5) * (Wd / cols);
        const y = Y + 14 + r * (Ht / 2);
        const ti = (Math.random() * 13) | 0;   // sem caminhao / taxi / policia nas vagas
        const car = new Car(ti, x, y, r === 0 ? -Math.PI / 2 : Math.PI / 2, 'parked');
        car.health = 60 + rnd() * 40;
        G.cars.push(car);
      }
    }
  }
}

function spawnTraffic() {
  let n = 0;
  for (const c of G.cars) if (c.state === 'traffic' || c.state === 'police') n++;
  if (n > 26) return;
  const rnd = Math.random;
  for (let tries = 0; tries < 30; tries++) {
    const p = World.randomRoad(Math.random, 20);
    const dx = p.x - G.player.x, dy = p.y - G.player.y;
    const d = Math.hypot(dx, dy);
    if (d < 320 || d > 640) continue;
    let ocupado = false;
    for (const c of G.cars) if (dist2(c.x, c.y, p.x, p.y) < 30 * 30) { ocupado = true; break; }
    if (ocupado) continue;
    const car = new Car(rndType(false), p.x, p.y, 0, 'traffic');
    car.dir = p.dir;
    const dv = DIRV[p.dir];
    car.angle = Math.atan2(dv[1], dv[0]);
    car.setWP();
    car.driver = (Math.random() < 0.75) ? (Math.random() * 12 | 0) : null;
    G.cars.push(car);
    return;
  }
}

function spawnPolice() {
  for (let tries = 0; tries < 40; tries++) {
    const p = World.randomRoad(Math.random, 20);
    const dx = p.x - G.player.x, dy = p.y - G.player.y;
    const d = Math.hypot(dx, dy);
    if (d < 260 || d > 520) continue;
    let ocupado = false;
    for (const c of G.cars) if (dist2(c.x, c.y, p.x, p.y) < 34 * 34) { ocupado = true; break; }
    if (ocupado) continue;
    const car = new Car(16, p.x, p.y, 0, 'police');
    car.dir = p.dir;
    const dv = DIRV[p.dir];
    car.angle = Math.atan2(dv[1], dv[0]);
    car.setWP();
    car.siren = true;
    G.cars.push(car);
    return;
  }
}

function spawnPed() {
  for (let tries = 0; tries < 30; tries++) {
    const p = World.randomSidewalk(Math.random, 20);
    const d = Math.hypot(p.x - G.player.x, p.y - G.player.y);
    if (d < 150 || d > 460) continue;
    const ped = new Ped((Math.random() * (PEDS.length - 1)) | 0, p.x, p.y);
    G.peds.push(ped);
    return;
  }
}

/* ---------------- colisao orientada (OBB) ---------------- */
function projRadius(car, nx, ny) {
  const fx = Math.cos(car.angle), fy = Math.sin(car.angle);
  return car.t.h * 0.5 * Math.abs(nx * fx + ny * fy) + car.t.w * 0.5 * Math.abs(nx * -fy + ny * fx);
}
function obbHit(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const ca = Math.cos(a.angle), sa = Math.sin(a.angle);
  const cb = Math.cos(b.angle), sb = Math.sin(b.angle);
  const axes = [[ca, sa], [-sa, ca], [cb, sb], [-sb, cb]];
  let best = Infinity, nx = 0, ny = 0;
  for (let i = 0; i < 4; i++) {
    const ax = axes[i];
    const dist = dx * ax[0] + dy * ax[1];
    const depth = projRadius(a, ax[0], ax[1]) + projRadius(b, ax[0], ax[1]) - Math.abs(dist);
    if (depth <= 0) return null;
    if (depth < best) { best = depth; const s = dist < 0 ? -1 : 1; nx = ax[0] * s; ny = ax[1] * s; }
  }
  return { nx: nx, ny: ny, depth: best };
}

/* ---------------- regras ---------------- */
function clampCam() {
  const maxX = World.W * 16 - VW, maxY = World.H * 16 - VH;
  G.cam.x = clamp(G.cam.x, 0, maxX);
  G.cam.y = clamp(G.cam.y, 0, maxY);
}

function addMsg(text, x, y, col) {
  G.msgs.push({ text: text, x: x, y: y, life: 1.6, col: col || '#ffe37a' });
}

function addWanted(v) {
  G.wanted = clamp(G.wanted + v, 0, 5);
  G.crimeT = 0;
}

/* ---------------- player ---------------- */
function playerShoot() {
  const p = G.player;
  if (p.shootCd > 0) return;
  p.shootCd = 0.22;
  let a = p.angle;
  if (G.mouse.active) a = Math.atan2(G.mouse.y - p.y, G.mouse.x - p.x);
  p.angle = a;
  const bx = p.x + Math.cos(a) * 7, by = p.y + Math.sin(a) * 7 - 3;
  G.bullets.push({ x: bx, y: by, vx: Math.cos(a) * 420, vy: Math.sin(a) * 420, life: 0.7 });
  Particles.sparks(bx, by, 3);
  G.flash = 0.06;
  G.shake = Math.max(G.shake, 1.2);
  Sfx.shot();
  // assusta pedestres por perto
  for (const q of G.peds) if (dist2(q.x, q.y, p.x, p.y) < 150 * 150) q.scare(p.x, p.y, 3.5);
  if (G.wanted > 0.2 || Math.random() < 0.5) addWanted(0.12);
}

function updatePlayerOnFoot(dt) {
  const p = G.player;
  p.sanity();
  let mx = (Input.right ? 1 : 0) - (Input.left ? 1 : 0);
  let my = (Input.down ? 1 : 0) - (Input.up ? 1 : 0);
  if (Input.touch && Input.joy.active) { mx = Input.joy.x; my = Input.joy.y; }
  const m = Math.hypot(mx, my);
  const spd = 62;
  if (m > 0.15) {
    mx /= m; my /= m;
    const a = Math.atan2(my, mx);
    if (!G.mouse.active || !Input.fire) p.angle = angTo(p.angle, a, 1 - Math.pow(0.0001, dt));
    p.vx = lerp(p.vx, mx * spd * Math.min(1, m), 1 - Math.pow(0.0001, dt));
    p.vy = lerp(p.vy, my * spd * Math.min(1, m), 1 - Math.pow(0.0001, dt));
  } else {
    p.vx *= Math.pow(0.001, dt); p.vy *= Math.pow(0.001, dt);
  }
  p.x += p.vx * dt; p.y += p.vy * dt;
  resolveTiles(p, 3.4, 0);
  resolveProps(p, 3.4, G.tmp);
  p.anim += dt * Math.hypot(p.vx, p.vy) * 0.11;
  p.frame = Math.hypot(p.vx, p.vy) > 4 ? (1 + (Math.floor(p.anim) % 2)) : 0;

  // nao atravessar carros
  for (const c of G.cars) {
    if (c.state === 'wreck' || c.burning) continue;
    const dx = p.x - c.x, dy = p.y - c.y;
    const rr = c.t.w * 0.5 + 3;
    const d2 = dx * dx + dy * dy;
    if (d2 < rr * rr && d2 > 0.01) {
      const d = Math.sqrt(d2), push = rr - d;
      p.x += dx / d * push; p.y += dy / d * push;
    }
  }

  if (p.shootCd > 0) p.shootCd -= dt;
  if (Input.fire) playerShoot();

  // entrar em carro
  if (Input.enterEdge) {
    Input.enterEdge = 0;
    let best = null, bd = 26 * 26;
    for (const c of G.cars) {
      if (c.burning || c.state === 'wreck') continue;
      const d = dist2(c.x, c.y, p.x, p.y);
      if (d < bd) { bd = d; best = c; }
    }
    if (best) enterCar(best);
  }

  // procurado: preso por policial
  if (G.wanted >= 1) {
    let near = false;
    for (const c of G.cars) {
      if (c.state !== 'police' || c.burning) continue;
      if (dist2(c.x, c.y, p.x, p.y) < 22 * 22 && Math.abs(c.speed) < 60) near = true;
    }
    if (near) {
      G.bustT += dt;
      if (G.bustT > 1.2) busted();
    } else G.bustT = Math.max(0, G.bustT - dt * 0.6);
  }
}

function enterCar(car) {
  const p = G.player;
  if (car.burning || car.state === 'wreck') return;
  if (car.state === 'traffic' && car.driver !== null) {
    // roubo de carro: motorista foge
    const ped = new Ped(car.driver, car.x, car.y);
    ped.scare(p.x, p.y, 6);
    G.peds.push(ped);
    car.driver = null;
    G.stats.jacks++;
    Sfx.jack();
    addMsg('CARRO ROUBADO', car.x, car.y - 16, '#ffd24a');
    if (Math.random() < 0.45) addWanted(0.4);
  }
  car.state = 'player';
  car.throttle = 0; car.steer = 0; car.brake = false; car.handbrake = false;
  G.inCar = car;
  p.alive = true;
  Sfx.startEngine();
  G.hintT = Math.min(G.hintT, 6);
}

function exitCar(forced) {
  const c = G.inCar;
  if (!c) return;
  G.inCar = null;
  c.state = 'parked';
  c.throttle = 0; c.steer = 0; c.brake = true;
  Sfx.stopEngine();
  if (forced) {
    G.player.x = c.x; G.player.y = c.y - 10;
    G.player.hurt(15);
    return;
  }
  // sai pela esquerda (ou direita se bloqueado)
  const a = c.angle;
  const lx = c.x + Math.sin(a) * (c.t.w * 0.5 + 6) * -1;
  const ly = c.y + Math.cos(a) * (c.t.w * 0.5 + 6);
  const rx = c.x - Math.sin(a) * (c.t.w * 0.5 + 6) * -1;
  const ry = c.y - Math.cos(a) * (c.t.w * 0.5 + 6);
  if (!World.solidAtPx(lx, ly)) { G.player.x = lx; G.player.y = ly; }
  else { G.player.x = rx; G.player.y = ry; }
  G.player.vx = 0; G.player.vy = 0;
}

Ped.prototype.hurt = function (v) {
  if (this.state === 'dead') return;
  this.health -= v;
  this.hitFlash = 0.2;
  if (this.health <= 0) { this.health = 0; wasted(); }
};

function wasted() {
  if (G.state !== 'play') return;
  G.state = 'wasted';
  G.deadT = 0;
  G.player.kill(0, 0);
  Sfx.stopEngine();
  if (G.inCar) { G.inCar.state = 'parked'; G.inCar = null; }
  G.shake = 6;
}

function busted() {
  if (G.state !== 'play') return;
  G.state = 'busted';
  G.deadT = 0;
  Sfx.stopEngine();
  if (G.inCar) { G.inCar.state = 'parked'; G.inCar = null; }
}

function respawn() {
  const st = findStart();
  const p = G.player;
  p.x = st.x; p.y = st.y;
  p.state = 'walk'; p.alive = true; p.deadT = 0;
  p.health = 100; p.vx = 0; p.vy = 0;
  G.bullets.length = 0;
  G.bustT = 0;
  G.state = 'play';
  G.cam.x = p.x - VW / 2; G.cam.y = p.y - VH / 2;
  clampCam();
}

/* ---------------- update ---------------- */
function update(dt) {
  G.time += dt;
  G.hintT += dt;
  if (G.shake > 0) G.shake = Math.max(0, G.shake - dt * 12);
  if (G.flash > 0) G.flash -= dt;

  if (G.state === 'wasted' || G.state === 'busted') {
    G.deadT += dt;
    Particles.update(dt);
    for (const c of G.cars) c.update(dt, G.tmp);
    if (G.deadT > 2.6) {
      if (G.state === 'busted') { G.money = Math.max(0, G.money - 300); G.wanted = 0; }
      else { G.money = Math.max(0, G.money - 150); G.wanted = Math.max(0, G.wanted - 1); }
      respawn();
    }
    updateCam(dt);
    return;
  }
  if (G.state !== 'play') { updateCam(dt); return; }

  const p = G.player;

  /* --- carro do jogador --- */
  if (G.inCar) {
    const c = G.inCar;
    let thr = 0, st = 0, br = false;
    if (Input.touch && Input.joy.active) {
      if (Input.joy.y < -0.25) thr = 1;
      else if (Input.joy.y > 0.25) { if (c.speed > 10) br = true; else thr = -1; }
      st = Input.joy.x;
    } else {
      if (Input.up) thr = 1;
      if (Input.down) { if (c.speed > 12) br = true; else thr = -1; }
      st = (Input.right ? 1 : 0) - (Input.left ? 1 : 0);
    }
    c.throttle = thr; c.steer = st; c.brake = br; c.handbrake = !!Input.handbrake;
    if (Input.fire && c !== G.inCar) { }
    if (Input.enterEdge) { Input.enterEdge = 0; exitCar(false); }
    if (Input.handbrake && Math.abs(c.speed) > 60 && Math.random() < dt * 6) Sfx.skid();
    Sfx.engine(c.speed, thr, c.t.top);
    G.stats.km += Math.abs(c.speed) * dt * 0.1875;
    p.x = c.x; p.y = c.y;
    if (c.t.id === 'police') c.siren = true;
  } else {
    updatePlayerOnFoot(dt);
  }

  /* --- carros --- */
  const cars = G.cars;
  for (let i = cars.length - 1; i >= 0; i--) {
    const c = cars[i];
    c.update(dt, G.tmp);
    // remove sucata distante
    if (c.state === 'wreck' && c.fireT > 25 && dist2(c.x, c.y, p.x, p.y) > 400 * 400) { cars.splice(i, 1); continue; }
    // despawn de trafego distante
    if ((c.state === 'traffic' || c.state === 'police') && dist2(c.x, c.y, p.x, p.y) > 820 * 820) {
      cars.splice(i, 1); continue;
    }
  }

  /* --- colisao carro x carro (caixas orientadas) --- */
  for (let i = 0; i < cars.length; i++) {
    const a = cars[i];
    if (a.state === 'wreck') continue;
    for (let j = i + 1; j < cars.length; j++) {
      const b = cars[j];
      if (b.state === 'wreck') continue;
      const dx = b.x - a.x, dy = b.y - a.y;
      if (dx * dx + dy * dy > 1600) continue;              // teste rapido
      const hit = obbHit(a, b);
      if (!hit) continue;
      const nx = hit.nx, ny = hit.ny;
      const ma = a.t.mass, mb = b.t.mass, tot = ma + mb;
      a.x -= nx * hit.depth * (mb / tot); a.y -= ny * hit.depth * (mb / tot);
      b.x += nx * hit.depth * (ma / tot); b.y += ny * hit.depth * (ma / tot);
      const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
      const vn = rvx * nx + rvy * ny;
      if (vn < 0) {
        const imp = -vn * 0.95;
        a.vx -= nx * imp * (mb / tot); a.vy -= ny * imp * (mb / tot);
        b.vx += nx * imp * (ma / tot); b.vy += ny * imp * (ma / tot);
        if (imp > 40) {
          a.hurt(imp * 0.15); b.hurt(imp * 0.15);
          Particles.sparks((a.x + b.x) / 2, (a.y + b.y) / 2, 5);
          if (G.inCar === a || G.inCar === b) { G.shake = Math.min(5, imp * 0.05); Sfx.crash(imp); }
        }
      }
    }
  }

  /* --- carro x pedestre --- */
  const peds = G.peds;
  for (let i = 0; i < cars.length; i++) {
    const c = cars[i];
    if (c.state === 'wreck' || c.burning) continue;
    const sp = Math.abs(c.speed);
    for (let j = 0; j < peds.length; j++) {
      const q = peds[j];
      if (q.state === 'dead') continue;
      if (q === G.player && G.inCar) continue;
      const dx = q.x - c.x, dy = q.y - c.y;
      const rr = c.t.w * 0.5 + 4;
      if (dx * dx + dy * dy > rr * rr) continue;
      if (sp > 55) {
        if (q === G.player) {
          q.hurt(clamp(sp * 0.5, 10, 90));
          q.vx += c.vx * 0.5; q.vy += c.vy * 0.5;
        } else {
          q.kill(Math.cos(c.angle), Math.sin(c.angle));
          G.money += 25 + (Math.random() * 60 | 0);
          G.stats.kills++;
          addMsg('+$' + (25 + (Math.random() * 40 | 0)), q.x, q.y - 14, '#8fe08f');
          Sfx.cash();
          addWanted(0.34);
        }
        c.speed *= 0.92;
        if (G.inCar === c) G.shake = Math.max(G.shake, 2);
      } else {
        const d = Math.max(0.01, Math.hypot(dx, dy));
        q.x += dx / d * (rr - d); q.y += dy / d * (rr - d);
        if (q !== G.player) q.scare(c.x, c.y, 1.2);
      }
    }
  }

  /* --- balas --- */
  for (let i = G.bullets.length - 1; i >= 0; i--) {
    const b = G.bullets[i];
    b.life -= dt;
    const steps = 3;
    let dead = b.life <= 0;
    for (let s = 0; s < steps && !dead; s++) {
      b.x += b.vx * dt / steps; b.y += b.vy * dt / steps;
      if (World.solidAtPx(b.x, b.y)) {
        Particles.sparks(b.x, b.y, 3); dead = true; break;
      }
      for (const c of cars) {
        if (c.burning || c.state === 'wreck') continue;
        const dx = b.x - c.x, dy = b.y - c.y;
        const fx = Math.cos(c.angle), fy = Math.sin(c.angle);
        const lx = dx * fx + dy * fy, ly = -dx * fy + dy * fx;
        if (Math.abs(lx) < c.t.h * 0.5 && Math.abs(ly) < c.t.w * 0.5) {
          c.hurt(9);
          Particles.sparks(b.x, b.y, 4);
          if (G.inCar === c) G.shake = Math.max(G.shake, 1.5);
          dead = true; break;
        }
      }
      if (dead) break;
      for (const q of peds) {
        if (q.state === 'dead' || q === G.player) continue;
        if (dist2(b.x, b.y, q.x, q.y) < 42) {
          q.kill(b.vx / 420, b.vy / 420);
          G.money += 20 + (Math.random() * 50 | 0);
          G.stats.kills++;
          addMsg('+$' + (20 + (Math.random() * 40 | 0)), q.x, q.y - 14, '#8fe08f');
          Sfx.cash();
          addWanted(0.3);
          dead = true; break;
        }
      }
      if (dead) break;
      for (const q of World.queryProps(b.x, b.y, 8, G.tmp2)) {
        if (dist2(b.x, b.y, q.x, q.y) < (q.r + 1) * (q.r + 1)) { Particles.sparks(b.x, b.y, 2); dead = true; break; }
      }
    }
    if (dead) G.bullets.splice(i, 1);
  }

  /* --- pedestres --- */
  for (let i = peds.length - 1; i >= 0; i--) {
    const q = peds[i];
    if (q === G.player) { q.update(dt, G.tmp); continue; }
    q.update(dt, G.tmp);
    if (q.state === 'dead' && q.deadT > 12) { peds.splice(i, 1); continue; }
    if (dist2(q.x, q.y, p.x, p.y) > 620 * 620) { peds.splice(i, 1); continue; }
    // foge de carro em alta velocidade
    for (const c of cars) {
      if (c.state === 'wreck' || Math.abs(c.speed) < 70) continue;
      if (dist2(q.x, q.y, c.x, c.y) < 70 * 70) { q.scare(c.x, c.y, 1.6); break; }
    }
  }

  /* --- spawn / despawn --- */
  G.trafficT = (G.trafficT || 0) + dt;
  if (G.trafficT > 0.4) {
    G.trafficT = 0;
    let traffic = 0, police = 0;
    for (const c of cars) {
      if (c.state === 'traffic') traffic++;
      if (c.state === 'police' && !c.burning) police++;
    }
    if (traffic < 20) spawnTraffic();
    const wantPolice = G.wanted >= 1 ? Math.min(4, Math.floor(G.wanted)) : 0;
    if (police < wantPolice) spawnPolice();
    let np = 0;
    for (const q of peds) if (q !== G.player && q.state !== 'dead') np++;
    if (np < 24) spawnPed();
  }

  /* --- procurado --- */
  G.crimeT += dt;
  if (G.crimeT > 22 && G.wanted > 0) G.wanted = Math.max(0, G.wanted - dt * 0.07);
  if (G.wanted < 1) {
    for (const c of cars) if (c.state === 'police' && !c.burning) { c.state = 'traffic'; c.siren = false; }
  }
  // sirene
  G.sirenT = (G.sirenT || 0) + dt;
  if (G.wanted >= 1 && G.sirenT > 0.5) {
    G.sirenT = 0;
    let near = false;
    for (const c of cars) if (c.state === 'police' && dist2(c.x, c.y, p.x, p.y) < 300 * 300) near = true;
    if (near) Sfx.siren();
  }

  /* --- balas / restantes --- */
  Particles.update(dt);
  for (let i = G.msgs.length - 1; i >= 0; i--) {
    const m = G.msgs[i];
    m.life -= dt; m.y -= dt * 14;
    if (m.life <= 0) G.msgs.splice(i, 1);
  }
  if (p.health < 100 && G.state === 'play' && G.crimeT > 6) p.health = Math.min(100, p.health + dt * 1.5);

  Input.enterEdge = 0;
  updateCam(dt);
}

function updateCam(dt) {
  const p = G.player;
  let tx, ty;
  if (G.inCar) {
    const c = G.inCar;
    tx = c.x + c.vx * 0.35 - VW / 2;
    ty = c.y + c.vy * 0.35 - VH / 2;
  } else {
    tx = p.x - VW / 2; ty = p.y - VH / 2;
  }
  const k = 1 - Math.pow(0.0005, dt);
  G.cam.x = lerp(G.cam.x, tx, k);
  G.cam.y = lerp(G.cam.y, ty, k);
  clampCam();
}

/* ---------------- render ---------------- */
let drawList = [];

function draw() {
  const sh = G.shake;
  const ox = sh > 0 ? Math.round((Math.random() - 0.5) * sh * 2) : 0;
  const oy = sh > 0 ? Math.round((Math.random() - 0.5) * sh * 2) : 0;
  const camX = clamp(Math.round(G.cam.x) + ox, 0, World.W * 16 - VW);
  const camY = clamp(Math.round(G.cam.y) + oy, 0, World.H * 16 - VH);
  const cam = { x: camX, y: camY };

  wctx.imageSmoothingEnabled = false;
  wctx.drawImage(World.ground, camX, camY, VW, VH, 0, 0, VW, VH);

  // particulas de chao (marcas de pneu / sangue)
  Particles.draw(wctx, cam);

  // lista de desenhaveis
  drawList.length = 0;
  const x0 = camX - 60, y0 = camY - 60, x1 = camX + VW + 60, y1 = camY + VH + 60;

  for (let i = 0; i < World.props.length; i++) {
    const p = World.props[i];
    if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) continue;
    drawList.push({ y: p.y + (p.flat ? 8 : 0), o: p, k: 0 });
  }
  for (let i = 0; i < G.cars.length; i++) {
    const c = G.cars[i];
    if (c.x < x0 || c.x > x1 || c.y < y0 || c.y > y1) continue;
    drawList.push({ y: c.y, o: c, k: 1 });
  }
  for (let i = 0; i < G.peds.length; i++) {
    const q = G.peds[i];
    if (q.x < x0 || q.x > x1 || q.y < y0 || q.y > y1) continue;
    if (q === G.player && G.inCar) continue;
    drawList.push({ y: q.y, o: q, k: 2 });
  }
  drawList.sort((a, b) => a.y - b.y);

  for (let i = 0; i < drawList.length; i++) {
    const it = drawList[i];
    if (it.k === 0) {
      const p = it.o;
      const s = p.sprite;
      if (p.scale) {
        wctx.save();
        wctx.translate(Math.round(p.x - cam.x), Math.round(p.y - cam.y));
        wctx.scale(p.scale, p.scale);
        wctx.drawImage(s.c, -s.ax, -s.ay);
        wctx.restore();
      } else {
        wctx.drawImage(s.c, Math.round(p.x - cam.x - s.ax), Math.round(p.y - cam.y - s.ay));
      }
    } else if (it.k === 1) {
      const c = it.o;
      if (c.state !== 'wreck' || c.fireT < 25) {
        shadowBlob(wctx, c.x - cam.x, c.y - cam.y, c.t.w * 0.62, c.t.h * 0.42, 0.30);
      }
      c.draw(wctx, cam);
    } else {
      const q = it.o;
      shadowBlob(wctx, q.x - cam.x, q.y - cam.y, 4.5, 2.4, 0.32);
      q.draw(wctx, cam);
    }
  }

  // balas
  for (const b of G.bullets) {
    wctx.fillStyle = '#fff3b0';
    wctx.fillRect(Math.round(b.x - cam.x) - 1, Math.round(b.y - cam.y) - 1, 2, 2);
    wctx.fillStyle = 'rgba(255,220,120,0.6)';
    wctx.fillRect(Math.round(b.x - b.vx * 0.02 - cam.x) - 1, Math.round(b.y - b.vy * 0.02 - cam.y) - 1, 2, 2);
  }

  // clarao do tiro
  if (G.flash > 0) {
    wctx.fillStyle = 'rgba(255,240,200,0.10)';
    wctx.fillRect(0, 0, VW, VH);
  }

  // mira
  if (!G.inCar && G.state === 'play' && G.mouse.active) {
    const mx = Math.round(G.mouse.x - cam.x), my = Math.round(G.mouse.y - cam.y);
    wctx.fillStyle = '#ff5a4a';
    wctx.fillRect(mx - 3, my, 2, 1); wctx.fillRect(mx + 2, my, 2, 1);
    wctx.fillRect(mx, my - 3, 1, 2); wctx.fillRect(mx, my + 2, 1, 2);
  }

  drawHUD(cam);
}

/* ---------------- HUD ---------------- */
function star(x, cx, cy, r, filled) {
  x.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    const px = cx + Math.cos(a) * rr, py = cy + Math.sin(a) * rr;
    if (i === 0) x.moveTo(px, py); else x.lineTo(px, py);
  }
  x.closePath();
  x.fillStyle = filled ? '#ffd24a' : 'rgba(0,0,0,0.45)';
  x.fill();
  x.strokeStyle = filled ? '#7a5a10' : 'rgba(255,255,255,0.25)';
  x.lineWidth = 0.6; x.stroke();
}

function panel(x, px, py, w, h) {
  x.fillStyle = 'rgba(12,10,18,0.72)';
  x.fillRect(px, py, w, h);
  x.strokeStyle = 'rgba(255,210,90,0.35)';
  x.lineWidth = 1;
  x.strokeRect(px + 0.5, py + 0.5, w - 1, h - 1);
}

function drawHUD(cam) {
  const x = uctx;
  x.setTransform(uiScale, 0, 0, uiScale, 0, 0);
  x.clearRect(0, 0, VW, VH);
  x.imageSmoothingEnabled = false;
  x.textBaseline = 'top';

  const F = (s, b) => (b ? 'bold ' : '') + s + 'px "Courier New", ui-monospace, monospace';

  if (G.state === 'menu') return;

  /* dinheiro */
  x.font = F(13, true);
  x.fillStyle = 'rgba(10,8,14,0.7)';
  x.fillRect(6, 6, 96, 18);
  x.fillStyle = '#7ce07c';
  x.fillText('$ ' + G.money.toLocaleString('pt-BR'), 11, 9);

  /* vida */
  panel(x, 6, 28, 96, 13);
  const hp = clamp(G.player.health, 0, 100) / 100;
  x.fillStyle = hp > 0.5 ? '#4ad06a' : (hp > 0.22 ? '#e0c24a' : '#e04a4a');
  x.fillRect(8, 30, 92 * hp, 9);
  x.fillStyle = 'rgba(255,255,255,0.12)';
  x.fillRect(8, 30, 92 * hp, 3);
  x.font = F(8, true); x.fillStyle = '#0e0c12';
  x.fillText('SAUDE', 10, 31);

  /* procurado */
  const wn = Math.ceil(G.wanted);
  if (wn > 0) {
    panel(x, VW - 6 - (10 + wn * 15), 6, 10 + wn * 15, 22);
    for (let i = 0; i < 5; i++) star(x, VW - 14 - i * 15, 17, 6, i < wn);
  }

  /* radar */
  const RS = 78, RX = 6, RY = VH - 6 - RS;
  x.save();
  x.beginPath(); x.rect(RX, RY, RS, RS); x.clip();
  x.fillStyle = '#12121a'; x.fillRect(RX, RY, RS, RS);
  const tiles = 26;
  const sx = Math.round(G.cam.x / 16 + VW / 32 - tiles / 2);
  const sy = Math.round(G.cam.y / 16 + VH / 32 - tiles / 2);
  x.imageSmoothingEnabled = false;
  x.drawImage(World.mini, sx, sy, tiles, tiles, RX, RY, RS, RS);
  const w2 = (tx, ty) => ({ x: RX + (tx - sx) * (RS / tiles), y: RY + (ty - sy) * (RS / tiles) });
  // carros
  for (const c of G.cars) {
    const p = w2(c.x / 16, c.y / 16);
    if (p.x < RX || p.x > RX + RS || p.y < RY || p.y > RY + RS) continue;
    x.fillStyle = c.state === 'police' ? '#4a9bff' : (c.state === 'parked' ? '#8a8a8a' : '#e05a4a');
    x.fillRect(p.x - 1, p.y - 1, 2, 2);
  }
  // jogador
  const pp = w2(G.player.x / 16, G.player.y / 16);
  x.fillStyle = '#ffe14a';
  x.fillRect(pp.x - 1.5, pp.y - 1.5, 3, 3);
  x.restore();
  x.strokeStyle = 'rgba(255,210,90,0.5)'; x.lineWidth = 1;
  x.strokeRect(RX + 0.5, RY + 0.5, RS - 1, RS - 1);

  /* velocidade / carro */
  if (G.inCar) {
    const kmh = Math.round(Math.abs(G.inCar.speed) * 0.675);
    x.font = F(14, true);
    x.textAlign = 'right';
    x.fillStyle = 'rgba(10,8,14,0.7)';
    x.fillRect(VW - 92, VH - 46, 86, 40);
    x.fillStyle = '#e8e4d6';
    x.fillText(kmh + ' km/h', VW - 12, VH - 40);
    x.font = F(9, false);
    x.fillStyle = '#b8b2a2';
    x.fillText(G.inCar.t.name.toUpperCase(), VW - 12, VH - 22);
    // barra de dano
    x.fillStyle = 'rgba(255,255,255,0.15)'; x.fillRect(VW - 88, VH - 12, 78, 5);
    x.fillStyle = G.inCar.health > 40 ? '#e0b040' : '#e04a4a';
    x.fillRect(VW - 88, VH - 12, 78 * clamp(G.inCar.health / 100, 0, 1), 5);
    x.textAlign = 'left';
  }

  /* mensagens flutuantes */
  for (const m of G.msgs) {
    const a = clamp(m.life, 0, 1);
    x.globalAlpha = a;
    x.font = F(8, true);
    x.fillStyle = m.col;
    x.textAlign = 'center';
    x.fillText(m.text, m.x - cam.x, m.y - cam.y);
    x.textAlign = 'left';
    x.globalAlpha = 1;
  }

  /* dica inicial */
  if (G.hintT < 14 && G.state === 'play') {
    const a = clamp(14 - G.hintT, 0, 1);
    x.globalAlpha = a;
    x.font = F(8, false);
    x.textAlign = 'center';
    x.fillStyle = 'rgba(10,8,14,0.6)';
    const t = G.inCar ? 'W acelera  S freia  A/D direcao  ESPACO freio de mao  E sai'
      : 'WASD anda  F ou mouse atira  E entra no carro';
    const wdt = x.measureText(t).width + 12;
    x.fillRect((VW - wdt) / 2, VH - 22, wdt, 13);
    x.fillStyle = '#ffe9b0';
    x.fillText(t, VW / 2, VH - 19);
    x.textAlign = 'left';
    x.globalAlpha = 1;
  }

  /* overlays de estado */
  if (G.state === 'wasted' || G.state === 'busted') {
    x.fillStyle = 'rgba(0,0,0,0.45)';
    x.fillRect(0, 0, VW, VH);
    x.textAlign = 'center';
    x.font = F(30, true);
    const t = G.state === 'wasted' ? 'WASTED' : 'BUSTED';
    x.fillStyle = G.state === 'wasted' ? '#c0392b' : '#2f6fd0';
    x.fillText(t, VW / 2 + 2, VH / 2 - 16 + 2);
    x.fillStyle = '#f2ece0';
    x.fillText(t, VW / 2, VH / 2 - 16);
    x.font = F(9, false);
    x.fillStyle = '#cfc8b8';
    x.fillText(G.state === 'wasted' ? 'VOI MORRER — voltando ao hospital...' : 'PRESO — pagou fiança de $300', VW / 2, VH / 2 + 20);
    x.textAlign = 'left';
  }
  if (G.state === 'paused') {
    x.fillStyle = 'rgba(0,0,0,0.6)'; x.fillRect(0, 0, VW, VH);
    x.textAlign = 'center'; x.font = F(22, true); x.fillStyle = '#ffe14a';
    x.fillText('PAUSA', VW / 2, VH / 2 - 14);
    x.font = F(9, false); x.fillStyle = '#cfc8b8';
    x.fillText('ENTER para continuar   •   M mudo   •   R reinicia', VW / 2, VH / 2 + 12);
    x.textAlign = 'left';
  }
}

/* ---------------- loop ---------------- */
let lastT = 0, acc = 0;
function loop(ts) {
  requestAnimationFrame(loop);
  if (!lastT) lastT = ts;
  let dt = (ts - lastT) / 1000;
  lastT = ts;
  if (dt > 0.1) dt = 0.1;
  if (G.state === 'play' || G.state === 'wasted' || G.state === 'busted') {
    acc += dt;
    const step = 1 / 60;
    let guard = 0;
    while (acc >= step && guard++ < 5) { update(step); acc -= step; }
    draw();
  } else if (G.state === 'menu') {
    drawMenuBg();
  } else {
    draw();
  }
}

function drawMenuBg() {
  uctx.setTransform(uiScale, 0, 0, uiScale, 0, 0);
  uctx.clearRect(0, 0, VW, VH);
}

/* ---------------- eventos ---------------- */
function startGame() {
  if (G.loading) return;
  Sfx.init(); Sfx.resume();
  const menu = document.getElementById('menu');
  const btn = document.getElementById('startBtn');
  if (btn) { btn.textContent = 'CARREGANDO...'; btn.disabled = true; }
  G.loading = true;
  setTimeout(function () {          // da tempo de pintar o "CARREGANDO..."
    initGame();
    G.loading = false;
    G.state = 'play';
    if (menu) menu.style.display = 'none';
    if (btn) { btn.textContent = 'JOGAR'; btn.disabled = false; }
  }, 40);
}

function setupInput() {
  window.addEventListener('keydown', e => {
    const k = keyName(e);
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'w', 'a', 's', 'd'].includes(k)) e.preventDefault();
    if (KEY[k]) return;
    KEY[k] = 1;
    Sfx.init(); Sfx.resume();

    if (G.state === 'menu') {
      if (k === 'enter' || k === ' ') startGame();
      return;
    }
    if (k === 'p' || k === 'escape') {
      if (G.state === 'play') { G.state = 'paused'; Sfx.stopEngine(); }
      else if (G.state === 'paused') G.state = 'play';
      return;
    }
    if (k === 'm') { Sfx.on = !Sfx.on; if (!Sfx.on) Sfx.stopEngine(); return; }
    if (k === 'r' && (G.state === 'paused' || G.state === 'play')) { initGame(); G.state = 'play'; return; }
    if ((k === 'enter' || k === 'e') && G.state === 'play') Input.enterEdge = 1;
  });

  window.addEventListener('keyup', e => { KEY[keyName(e)] = 0; });

  window.addEventListener('blur', () => { for (const k in KEY) KEY[k] = 0; });

  function syncKeys() {
    Input.up = (KEY['w'] || KEY['arrowup'] || 0);
    Input.down = (KEY['s'] || KEY['arrowdown'] || 0);
    Input.left = (KEY['a'] || KEY['arrowleft'] || 0);
    Input.right = (KEY['d'] || KEY['arrowright'] || 0);
    Input.handbrake = KEY[' '] || 0;
    Input.fire = (KEY['f'] || KEY['j'] || 0);
    if (G.state === 'play' && !G.inCar && KEY['enter']) Input.enterEdge = 1;
  }
  setInterval(syncKeys, 16);

  /* mouse */
  const rect = () => ucv.getBoundingClientRect();
  ucv.addEventListener('mousemove', e => {
    const r = rect();
    G.mouse.x = G.cam.x + (e.clientX - r.left) / dispScale;
    G.mouse.y = G.cam.y + (e.clientY - r.top) / dispScale;
    G.mouse.active = true;
  });
  ucv.addEventListener('mouseleave', () => { G.mouse.active = false; });
  ucv.addEventListener('mousedown', e => {
    Sfx.init(); Sfx.resume();
    if (G.state === 'menu') { startGame(); return; }
    const r = rect();
    G.mouse.x = G.cam.x + (e.clientX - r.left) / dispScale;
    G.mouse.y = G.cam.y + (e.clientY - r.top) / dispScale;
    G.mouse.active = true;
    if (G.state === 'play') { if (G.inCar) Sfx.blip(320, 0.25, 'square', 0.08); else KEY['f'] = 1; }
  });
  window.addEventListener('mouseup', () => { KEY['f'] = 0; });
  ucv.addEventListener('contextmenu', e => e.preventDefault());

  setupTouch();
}

function setupTouch() {
  const stick = document.getElementById('stick');
  const knob = document.getElementById('knob');
  const btnA = document.getElementById('btnA');
  const btnB = document.getElementById('btnB');
  if (!stick) return;
  let sid = null, cx = 0, cy = 0, R = 44;

  const start = e => {
    Input.touch = true;
    const r = stick.getBoundingClientRect();
    cx = r.left + r.width / 2; cy = r.top + r.height / 2; R = r.width / 2 - 8;
    move(e);
  };
  const move = e => {
    let tx = null, ty = null;
    for (const t of e.touches) {
      if (t.identifier === sid) { tx = t.clientX; ty = t.clientY; }
    }
    if (tx === null && e.touches && e.touches.length) {
      // primeiro toque dentro do stick
    }
    if (tx === null) return;
    let dx = tx - cx, dy = ty - cy;
    const d = Math.hypot(dx, dy);
    if (d > R) { dx = dx / d * R; dy = dy / d * R; }
    knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    Input.joy.x = dx / R; Input.joy.y = dy / R; Input.joy.active = true;
  };
  const end = e => {
    knob.style.transform = 'translate(0,0)';
    Input.joy.x = 0; Input.joy.y = 0; Input.joy.active = false;
  };
  stick.addEventListener('touchstart', e => {
    e.preventDefault();
    if (sid === null && e.touches.length) sid = e.touches[0].identifier;
    start(e);
  }, { passive: false });
  stick.addEventListener('touchmove', e => { e.preventDefault(); move(e); }, { passive: false });
  stick.addEventListener('touchend', e => { e.preventDefault(); sid = null; end(e); }, { passive: false });
  stick.addEventListener('touchcancel', e => { sid = null; end(e); });

  if (btnA) {
    btnA.addEventListener('touchstart', e => {
      e.preventDefault(); Input.touch = true; Sfx.init(); Sfx.resume();
      if (G.state === 'menu') { startGame(); return; }
      Input.enterEdge = 1;
    }, { passive: false });
    btnA.addEventListener('click', e => {
      Sfx.init(); Sfx.resume();
      if (G.state === 'menu') { startGame(); return; }
      Input.enterEdge = 1;
    });
  }
  if (btnB) {
    const on = e => {
      e.preventDefault(); Input.touch = true; Sfx.init(); Sfx.resume();
      if (G.state === 'menu') { startGame(); return; }
      if (G.inCar) Input.handbrake = 1; else KEY['f'] = 1;
    };
    const off = e => { e.preventDefault(); Input.handbrake = 0; KEY['f'] = 0; };
    btnB.addEventListener('touchstart', on, { passive: false });
    btnB.addEventListener('touchend', off, { passive: false });
    btnB.addEventListener('touchcancel', off, { passive: false });
  }
  // mostra controles de toque em telas de toque
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.getElementById('touch').style.display = 'block';
    Input.touch = true;
  }
}

/* ---------------- boot ---------------- */
function boot() {
  setupCanvas();
  setupInput();
  const btn = document.getElementById('startBtn');
  if (btn) btn.addEventListener('click', e => { e.stopPropagation(); startGame(); });
  requestAnimationFrame(loop);
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.addEventListener('load', boot);
}
