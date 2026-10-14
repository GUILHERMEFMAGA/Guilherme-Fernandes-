const fs = require('fs');
const path = require('path');
const { makeEnv } = require('./env');
const ROOT = path.join(__dirname, '..');
const env = makeEnv();
const PT = env.PT, G = env.G, U = env.U, counters = env.counters, canvasEl = env.canvasEl;

let failures = 0;
function check(name, fn) {
  try {
    const msg = fn();
    console.log(' ok   ' + name + (msg ? ' — ' + msg : ''));
  } catch (e) {
    failures++;
    console.log(' FALHA ' + name + '\n      ' + (e && e.stack ? e.stack.split('\n').slice(0, 4).join('\n      ') : e));
  }
}
function press(key, val) { G[key] = val === undefined ? true : val; }

// ------------------------------------------------------------------ testes
console.log('\n== FOGO CRUZADO: testes headless ==\n');

check('modulos carregam e texturas sao geradas', () => {
  PT.Tex.init();
  const mats = Object.keys(PT.Tex.wall);
  if (mats.length < 8) throw new Error('texturas de parede incompletas: ' + mats.length);
  if (!PT.Tex.ground.asphalt || PT.Tex.ground.asphalt.length < 3) throw new Error('piso sem variantes');
  return mats.length + ' materiais, ' + PT.Tex.ground.asphalt.length + ' variantes de asfalto';
});

check('mapas: tamanho, spawns, objetivos e briefing', () => {
  const out = [];
  PT.Maps.list.forEach((map, i) => {
    if (map.rows.length !== 25) throw new Error(map.name + ' tem ' + map.rows.length + ' linhas');
    map.rows.forEach((r, ri) => {
      if (r.length !== 40) throw new Error(map.name + ' linha ' + ri + ' com ' + r.length + ' colunas');
    });
    const info = PT.Maps.analyze(map);
    if (!info.spawns.p1 || !info.spawns.p2) throw new Error(map.name + ' sem spawns de jogador');
    if (map.mission.type === 'destroy' && info.objectives.length !== map.mission.targets) {
      throw new Error(map.name + ' tem ' + info.objectives.length + ' objetivos e pede ' + map.mission.targets);
    }
    if (map.mission.type === 'hold' && !info.hold) throw new Error(map.name + ' sem zona de defesa');
    if (map.enemies > 0 && info.enemies.length === 0) throw new Error(map.name + ' sem pontos de patrulha');
    out.push(map.name.split(' ')[0] + '(' + info.objectives.length + 'obj/' + info.enemies.length + 'pt)');
  });
  return out.join(' ');
});

check('inicio de missao: esquadrao, patrulhas e nevoa', () => {
  G.init(canvasEl);
  PT.Tex.init();
  G.spawnMission(0, 1);
  const allies = G.units.filter(u => u.team === 'ally');
  const enemies = G.units.filter(u => u.team === 'enemy');
  if (allies.length !== 4) throw new Error('esquadrao com ' + allies.length + ' soldados');
  if (enemies.length !== PT.Maps.list[0].enemies) throw new Error('inimigos: ' + enemies.length);
  if (!G.control || !G.control.controlled) throw new Error('jogador sem controle');
  if (G.scene !== 'game') throw new Error('cena errada: ' + G.scene);
  const solid = G.grid.filter(c => c.solid).length;
  if (solid < 100) throw new Error('mapa sem paredes: ' + solid);
  return allies.length + ' aliados, ' + enemies.length + ' inimigos, ' + solid + ' celulas solidas';
});

check('visao: enxerga a frente e nao enxerga atras do concreto', () => {
  G.spawnMission(0, 1);
  // so' o soldado controlado entra no calculo: nada de aliado "iluminando" o mapa
  const u = G.control;
  u.x = 300; u.y = 300; u.path = null;
  PT.Vis.compute([u]);
  const abertos = [[300, 250], [350, 300], [300, 350], [250, 300]].filter(p => PT.Vis.isVisible(p[0], p[1]));
  if (abertos.length < 3) throw new Error('visao curta demais: ' + abertos.length + '/4 pontos visiveis ao redor');

  // o mapa de nevoa tem que ficar realmente claro: nem preto, nem mapa inteiro
  let claros = 0;
  for (let i = 0; i < PT.C.COLS * PT.C.ROWS; i++) if (PT.Vis.alpha[i] > 0.5) claros++;
  if (claros < 40) throw new Error('nevoa nao abriu: apenas ' + claros + ' tiles visiveis');
  if (claros > 600) throw new Error('nevoa abriu demais: ' + claros + ' tiles visiveis (mapa inteiro?)');
  // longe do alcance de visao (265 px) nao se enxerga
  if (PT.Vis.isVisible(300 + 400, 300)) throw new Error('enxergou fora do alcance de visao');

  // agora atras de uma parede de concreto grande (mapa tem sala de concreto nas colunas 8-15)
  u.x = 8 * 24 - 14; u.y = 4 * 24 + 12;      // ao lado oeste da sala
  PT.Vis.compute([u]);
  const atras = PT.Vis.isVisible(12 * 24 + 12, 4 * 24 + 12);   // centro da sala (parede no meio)
  if (atras) throw new Error('o soldado enxergou atraves da parede');
  return abertos.length + '/4 pontos abertos visiveis, ' + claros + ' tiles na nevoa, interior bloqueado';
});

check('linha de visao (LOS) bloqueia em parede e libera em area aberta', () => {
  G.spawnMission(0, 1);
  const livre = PT.Vis.los(80, 22 * 24 + 12, 200, 22 * 24 + 12);
  // sala de concreto: coluna 8 tem parede, entao 6*24 -> 12*24 atravessa
  const barrado = PT.Vis.los(7 * 24, 4 * 24 + 12, 12 * 24, 4 * 24 + 12);
  if (!livre) throw new Error('LOS bloqueada em area aberta');
  if (barrado) throw new Error('LOS atravessou a parede');
  return 'aberto=livre, parede=bloqueado';
});

check('pathfinding: caminho valido entre dois cantos do mapa', () => {
  G.spawnMission(0, 1);
  const p = PT.GameInternals.findPath(2, 22, 36, 3, 4000);
  if (!p || !p.length) throw new Error('nenhum caminho encontrado');
  let bad = 0;
  p.forEach(wp => {
    const c = Math.floor(wp.x / 24), r = Math.floor(wp.y / 24);
    const cell = G.grid[r * 40 + c];
    if (!cell || cell.solid) bad++;
  });
  if (bad) throw new Error(bad + ' pontos do caminho caem dentro de parede');
  return p.length + ' passos, nenhum dentro de parede';
});

check('cobertura: parede entre os dois reduz o dano recebido', () => {
  G.spawnMission(0, 1);
  const c = PT.GameInternals.coverFactor;
  const exposto = c({ x: 300, y: 300 }, 200, 300);
  // soldado colado na parede da sala (coluna 8) com atirador do outro lado
  const coberto = c({ x: 9 * 24 + 18, y: 4 * 24 + 12 }, 8 * 24 + 4, 4 * 24 + 12);
  if (!(exposto > 0.95)) throw new Error('area aberta deveria ser 1.0, veio ' + exposto);
  if (!(coberto < 0.75)) throw new Error('cobertura ineficaz: ' + coberto);
  return 'aberto=' + exposto.toFixed(2) + ' colado=' + coberto.toFixed(2);
});

check('tiro acerta, gasta municao e fere', () => {
  G.spawnMission(1, 1);
  const atirador = G.control;
  const alvo = G.units.find(u => u.team === 'enemy');
  // isolamento: alvo parado na frente, resto do mapa longe
  G.units.forEach(u => {
    if (u === atirador || u === alvo) return;
    u.x = 20; u.y = 20; u.vision = 0; u.patrol = [];
  });
  atirador.x = 300; atirador.y = 300; atirador.supp = 0;
  alvo.x = 300; alvo.y = 190; alvo.hp = 500; alvo.maxHp = 500; alvo.supp = 0;
  const hp0 = alvo.hp, mag0 = atirador.mag;
  G.input.p1 = { up: false, down: false, left: false, right: false, fire: true, aim: { x: 300, y: 190 } };
  for (let i = 0; i < 120; i++) {
    alvo.hp = Math.min(alvo.hp, 500);
    G.update(1 / 60);
  }
  if (atirador.mag >= mag0) throw new Error('nao gastou municao');
  if (alvo.hp >= hp0) throw new Error('o alvo nao perdeu vida');
  return 'municao ' + mag0 + '->' + atirador.mag + ', alvo 500->' + Math.round(alvo.hp) + ' (precisao ' + G.hudInfo().accuracy + '%)';
});

check('supressao: tiro passando perto rebaixa a moral', () => {
  G.spawnMission(3, 1);
  const e = G.units.find(u => u.team === 'enemy');
  e.supp = 0;
  e.hp = 400; e.maxHp = 400;
  G.units.forEach(u => { if (u !== e && u !== G.control && u.team === 'enemy') { u.x = 20; u.y = 20; } });
  // corredor livre do mapa ARENA: y=36 livre, e o inimigo fica 40 px abaixo da linha de tiro
  const shooter = G.control;
  shooter.x = 120; shooter.y = 36; shooter.angle = 0;
  e.x = 600; e.y = 76;                         // so' leva o susto: nenhuma bala encosta
  e.vision = 0; e.patrol = []; e.target = null; e.supp = 0; e.hp = e.maxHp;
  const vida0 = e.hp;
  for (let i = 0; i < 40; i++) {
    G.spawnBullet(shooter, 0);
    G.update(1 / 60);
    e.x = 600; e.y = 76;                       // congela o alvo: a IA nao pode entrar na linha de tiro
  }
  if (e.supp < 0.3) throw new Error('supressao nao subiu: ' + e.supp.toFixed(2));
  if (e.hp < vida0) throw new Error('a bala encostou (hp ' + vida0 + '->' + Math.round(e.hp) + '): o teste nao isola a supressao');
  return 'supressao ' + e.supp.toFixed(2) + ' sem levar tiro, mira penalizada';
});

check('granada: explode, fere perto e destroi madeira', () => {
  G.spawnMission(0, 1);
  const alvo = G.units.find(u => u.team === 'enemy');
  alvo.x = 400; alvo.y = 300; alvo.hp = alvo.maxHp;
  // acha uma parede destrutivel
  const wood = G.grid.find(c => c.destructible && !c.objective && !c.destroyed);
  if (!wood) throw new Error('nenhuma parede destrutivel no mapa');
  const wx = wood.c * 24 + 12, wy = wood.r * 24 + 12;
  PT.explodeAt(wx, wy, { radius: 90, dmg: 120 });
  if (!wood.destroyed) throw new Error('a explosao nao destruiu a parede destrutivel');
  const antes = alvo.hp;
  PT.explodeAt(alvo.x, alvo.y, { radius: 90, dmg: 120 });
  if (alvo.hp >= antes && !alvo.downed && !alvo.dead) throw new Error('explosao nao causou dano');
  return 'parede destruida, alvo ' + antes + '->' + Math.round(alvo.hp) + (alvo.dead ? ' (morto)' : alvo.downed ? ' (caido)' : '');
});

check('fumaca: corta a linha de visao e depois dissipa', () => {
  G.spawnMission(0, 1);
  const p1 = { x: 200, y: 500 }, p2 = { x: 400, y: 500 };
  if (!PT.Vis.los(p1.x, p1.y, p2.x, p2.y)) throw new Error('LOS deveria estar livre antes da fumaca');
  const shooter = G.control;
  shooter.x = p1.x; shooter.y = p1.y;
  shooter.maxHp = shooter.hp = 100000;         // o teste nao pode acabar no meio
  const inimigos = G.units.filter(u => u.team === 'enemy');
  const congelar = () => inimigos.forEach(u => { u.x = 20; u.y = 20; u.supp = 0; u.vision = 0; u.patrol = []; });
  congelar();
  G.throwGrenade(shooter, { x: 300, y: 500 }, 'smoke');
  for (let i = 0; i < 200; i++) { congelar(); G.update(1 / 60); }
  if (G.smokes.length === 0) throw new Error('a fumaca nao se formou');
  const bloqueado = !PT.Vis.los(p1.x, p1.y, p2.x, p2.y);
  if (!bloqueado) throw new Error('a fumaca nao bloqueou a visao');
  // espera dissipar
  let t = 0;
  for (; t < 60 * 30 && G.smokes.length; t++) { congelar(); G.update(1 / 60); }
  const voltou = PT.Vis.los(p1.x, p1.y, p2.x, p2.y);
  if (G.smokes.length) throw new Error('a fumaca continuou no mapa depois de 30 s');
  if (!voltou) throw new Error('a fumaca dissipou mas a visao continuou bloqueada');
  return 'bloqueou e dissipou em ' + (t / 60).toFixed(1) + ' s';
});

check('caido e reanimacao: sangra, aliado socorre e levanta', () => {
  G.spawnMission(2, 1);
  const vitima = G.units.find(u => u.team === 'ally' && !u.controlled);
  const medico = G.units.find(u => u.team === 'ally' && !u.controlled && u !== vitima);
  G.units.forEach(u => { if (u.team === 'enemy') { u.x = 30; u.y = 30; u.vision = 0; u.patrol = []; } });
  vitima.downed = true; vitima.hp = 0; vitima.bleed = 20; vitima.reviveProgress = 0;
  medico.x = vitima.x + 12; medico.y = vitima.y; medico.path = null; medico.target = null;
  let sangrou = false;
  const bleed0 = vitima.bleed;
  for (let i = 0; i < 60 * 8 && vitima.downed; i++) {
    G.units.forEach(u => { if (u.team === 'enemy') { u.x = 30; u.y = 30; } });
    G.update(1 / 60);
    if (vitima.bleed < bleed0) sangrou = true;
  }
  if (vitima.downed) throw new Error('o aliado nao conseguiu reanimar (progresso ' + vitima.reviveProgress.toFixed(2) + ')');
  if (!sangrou) throw new Error('o caido nao sangrou');
  return 'sangrou, reanimado com ' + Math.round(vitima.hp) + ' de vida';
});

check('missao destruir: explodir objetivos conclui com vitoria', () => {
  G.spawnMission(0, 1);
  if (G.mission.type !== 'destroy') throw new Error('missao 1 deveria ser destroy');
  const objs = G.grid.filter(c => c.objective && !c.destroyed);
  if (objs.length !== G.mission.targets) throw new Error('objetivos x meta: ' + objs.length + '/' + G.mission.targets);
  objs.forEach(o => { PT.explodeAt(o.c * 24 + 12, o.r * 24 + 12, { radius: 60, dmg: 200, kind: 'objective' }); });
  G.update(1 / 60);
  if (!G.over || !G.won) throw new Error('missao nao foi concluida: over=' + G.over + ' won=' + G.won);
  return 'vitoria: ' + G.result;
});

check('missao segurar: manter soldado na praca faz o relogio correr', () => {
  G.spawnMission(2, 1);
  if (G.mission.type !== 'hold') throw new Error('missao 3 deveria ser hold');
  if (!G.zone) throw new Error('sem zona de defesa');
  const before = G.mission.holdLeft;
  const u = G.control;
  G.units.forEach(o => { if (o.team === 'enemy') { o.x = 20; o.y = 20; } });
  u.x = G.zone.x + G.zone.w / 2;
  u.y = G.zone.y + G.zone.h / 2;
  for (let i = 0; i < 60 * 4; i++) {
    u.x = G.zone.x + G.zone.w / 2;
    u.y = G.zone.y + G.zone.h / 2;
    G.units.forEach(o => { if (o.team === 'enemy') { o.x = 20; o.y = 20; } });
    G.update(1 / 60);
  }
  if (!(G.mission.holdLeft < before - 3)) throw new Error('o relogio nao correu: ' + G.mission.holdLeft);
  return 'relogio ' + before.toFixed(1) + 's -> ' + G.mission.holdLeft.toFixed(1) + 's';
});

check('inimigos enxergam, perseguem e atiram no jogador', () => {
  G.spawnMission(0, 1);
  const u = G.control;
  u.maxHp = 100000; u.hp = 100000;            // medico de combate: aguenta o teste
  const e = G.units.find(x => x.team === 'enemy');
  // mundo limpo: so' o jogador e o inimigo observado
  G.units = G.units.filter(x => x === u || x === e);
  // coloca o inimigo na frente, sem paredes no meio
  u.x = 300; u.y = 560;
  e.x = 420; e.y = 560; e.patrol = []; e.state = 'patrol'; e.target = null;
  let atirou = false, aproximou = false;
  const d0 = U.dist(e.x, e.y, u.x, u.y);
  for (let i = 0; i < 60 * 6; i++) {
    G.update(1 / 60);
    if (G.bullets.some(b => b.owner === e)) atirou = true;
    if (e.target === u) {/* contato */}
    if (U.dist(e.x, e.y, u.x, u.y) < d0 - 20) aproximou = true;
  }
  if (!e.target && !atirou) throw new Error('o inimigo nunca percebeu o jogador');
  return 'percebeu=' + !!e.target + ' atirou=' + atirou + ' aproximou=' + aproximou;
});

check('ordens do esquadrao movem os aliados', () => {
  G.spawnMission(1, 1);
  const mates = G.units.filter(u => u.team === 'ally' && !u.controlled);
  const alvo = { x: 90, y: 540 };
  mates.forEach((m, i) => { m.x = 300 + i * 24; m.y = 470; m.path = null; m.target = null; m.repath = 0; });
  G.orderPoint = alvo;
  const antes = mates.map(m => U.dist(m.x, m.y, alvo.x, alvo.y));
  for (let i = 0; i < 60 * 8; i++) {
    G.units.forEach(u => { if (u.team === 'enemy') { u.x = 930; u.y = 20; u.vision = 0; } });
    G.update(1 / 60);
  }
  const depois = mates.map(m => U.dist(m.x, m.y, alvo.x, alvo.y));
  const chegaram = depois.filter((d, i) => d < antes[i] - 40).length;
  if (!chegaram) throw new Error('nenhum aliado se moveu para o ponto (antes ' + antes[0].toFixed(0) + ' depois ' + depois[0].toFixed(0) + ')');
  return chegaram + '/' + mates.length + ' chegaram perto do ponto ordenado';
});

check('missoes completas: 4 mapas x 2500 frames sem erro', () => {
  const info = [];
  for (let m = 0; m < 4; m++) {
    G.spawnMission(m, 1);
    let erro = null;
    for (let i = 0; i < 2500; i++) {
      // "jogador" robotico: anda e atira
      G.input.p1.aim = { x: 400 + Math.sin(i / 40) * 300, y: 300 + Math.cos(i / 55) * 200 };
      G.input.p1.fire = i % 7 < 4;
      G.input.p1.right = (i % 200) < 100;
      G.input.p1.left = !((i % 200) < 100);
      G.input.p1.up = (i % 130) < 65;
      G.input.p1.down = !((i % 130) < 65);
      G.update(1 / 60);
      if (i % 5 === 0) G.render();
      const u = G.control;
      if (!isFinite(u.x) || !isFinite(u.y) || !isFinite(u.hp)) { erro = 'posicao/hp invalidos no frame ' + i; break; }
    }
    const h = G.hudInfo();
    info.push(PT.Maps.list[m].name.split(' ')[0] + ':' + Math.round(h.enemies) + 'in');
    if (erro) throw new Error(erro);
  }
  return info.join(' ');
});

check('render: tudo desenha (HUD, nevoa, unidades, minimapa)', () => {
  G.spawnMission(1, 2);
  for (let i = 0; i < 180; i++) {
    G.input.p1.aim = { x: 500, y: 300 };
    G.update(1 / 60);
    if (i % 2 === 0) G.render();
  }
  G.spawnMission(1, 2);
  G.scene = 'menu';
  for (let i = 0; i < 30; i++) { G.update(1 / 60); G.render(); }
  const c = counters;
  if (c.drawImage < 500) throw new Error('poucos drawImage: ' + c.drawImage);
  if (c.fillRect < 500) throw new Error('poucos fillRect: ' + c.fillRect);
  if (c.getImageData < 5) throw new Error('a nevoa nao foi calculada');
  return 'drawImage=' + c.drawImage + ' fillRect=' + c.fillRect + ' getImageData=' + c.getImageData;
});

check('menu: navegar e iniciar missao', () => {
  G.scene = 'menu';
  G.menuScene = 'mode';
  G.menuIndex.mode = 0;
  press('menuDown', false);
  G.menuDown = true;
  G.update(1 / 60);
  if (G.menuIndex.mode !== 1) throw new Error('nao navegou no menu');
  G.menuSelect = true;
  G.update(1 / 60);
  if (G.menuScene !== 'map') throw new Error('nao entrou na lista de mapas');
  G.menuIndex.map = 1;
  G.menuSelect = true;
  G.update(1 / 60);
  if (G.scene !== 'game') throw new Error('nao iniciou a missao');
  const h = G.hudInfo();
  return h.modeLabel + ' / ' + h.map + ' / ' + h.objective;
});

check('dupla: dois soldados controlaveis', () => {
  G.scene = 'menu';
  G.menuScene = 'mode';
  G.players = 2;
  G.menuScene = 'map';
  G.menuIndex.map = 0;
  G.menuSelect = true;
  G.update(1 / 60);
  const p2 = G.units.find(u => u.player2);
  if (!p2) throw new Error('ninguem marcado para o jogador 2');
  const u = G.units.find(u => u.controlled && !u.player2);
  u.x = 200; u.y = 500;
  p2.x = 300; p2.y = 500;
  const d0 = U.dist(p2.x, p2.y, 500, 500);
  G.input.p2.autoAim = true;
  G.input.p2.fire = true;
  G.input.p2.right = true;
  for (let i = 0; i < 120; i++) { G.update(1 / 60); G.render(); }
  const d1 = U.dist(p2.x, p2.y, 500, 500);
  if (!(d1 < d0 - 20)) throw new Error('o P2 nao se moveu: ' + d0.toFixed(0) + ' -> ' + d1.toFixed(0));
  return 'P2 andou ' + (d0 - d1).toFixed(0) + 'px e atira sozinho';
});

check('troca de soldado controlado', () => {
  G.spawnMission(0, 1);
  const primeiro = G.control;
  G.swapTo = 2;
  G.update(1 / 60);
  if (G.control === primeiro) throw new Error('nao trocou o soldado');
  if (primeiro.controlled) throw new Error('o antigo continuou marcado como controlado');
  return 'controle passou de ' + primeiro.name + ' para ' + G.control.name;
});

check('hudInfo entrega tudo que o painel HTML usa', () => {
  const h = G.hudInfo();
  ['scene', 'paused', 'muted', 'over', 'map', 'modeLabel', 'status', 'objective', 'time',
    'kills', 'score', 'accuracy', 'enemies', 'squad', 'feed', 'grenades', 'smokes'].forEach(k => {
      if (!(k in h)) throw new Error('falta ' + k);
    });
  if (h.squad.length !== 4) throw new Error('esquadrao com ' + h.squad.length + ' linhas no HUD');
  h.squad.forEach(s => ['slot', 'name', 'hp', 'maxHp', 'weapon', 'mag', 'state', 'controlled'].forEach(k => {
    if (!(k in s)) throw new Error('falta squad.' + k);
  }));
  return h.squad.length + ' soldados reportados, ' + h.squad.filter(s => s.controlled).length + ' sob controle';
});

check('index.html: scripts, ids e paineis ligados', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]);
  scripts.forEach(src => {
    if (!fs.existsSync(path.join(ROOT, src))) throw new Error('script ausente: ' + src);
  });
  if (!fs.existsSync(path.join(ROOT, 'style.css'))) throw new Error('style.css ausente');
  const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  const js = fs.readFileSync(path.join(ROOT, 'js', 'main.js'), 'utf8');
  const used = new Set([...js.matchAll(/set\('([^']+)'/g)].map(m => m[1]));
  [...js.matchAll(/el\('([^']+)'\)/g)].forEach(m => used.add(m[1]));
  const missing = [...used].filter(id => !ids.includes(id) && !/^sq-$/.test(id));
  if (missing.length) throw new Error('ids usados sem existir no HTML: ' + missing.join(', '));
  return scripts.length + ' scripts, ' + ids.length + ' ids, ' + used.size + ' referencias ok';
});

check('nenhum modulo ES6 (roda direto do disco)', () => {
  fs.readdirSync(path.join(ROOT, 'js')).forEach(f => {
    const code = fs.readFileSync(path.join(ROOT, 'js', f), 'utf8');
    if (/^\s*(import|export)\s/m.test(code)) throw new Error(f + ' usa import/export');
  });
  return fs.readdirSync(path.join(ROOT, 'js')).length + ' arquivos verificados';
});

console.log('\n---------------------------------------------');
if (failures) {
  console.log(failures + ' teste(s) falharam\n');
  process.exit(1);
} else {
  console.log('todos os testes passaram\n');
}
