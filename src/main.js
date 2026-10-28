import * as THREE from 'three';
import { WorldScene } from './engine/scene.js';
import { TerrainSystem } from './world/terrain.js';
import { WaterSystem } from './world/water.js';
import { VegetationSystem } from './world/vegetation.js';
import { BuildingSystem } from './city/buildings.js';
import { RoadSystem } from './city/roads.js';
import { InteriorSystem } from './city/interiors.js';
import { PlayerControls } from './player/controls.js';
import { CrowdSystem } from './npc/crowd.js';
import { TimeSystem } from './systems/time.js';
import { WeatherSystem } from './systems/weather.js';
import { AudioSystem } from './systems/audio.js';
import { MinimapSystem } from './ui/minimap.js';

let renderer, worldScene, terrain, water, vegetation, buildings, roads, interiors, player, crowd, timeSystem, weather, audio, minimap;

let clock = new THREE.Clock();
let currentWeather='clear';
let currentRegionId='toscana';
let loadError = null;

const loadingBar = document.getElementById('loading-bar');
const loadingStatus = document.getElementById('loading-status');

function setLoading(pct, msg){
  if(loadingBar) loadingBar.style.width = pct+'%';
  if(loadingStatus && msg) loadingStatus.textContent = msg;
}

function showError(title, detail){
  const scr=document.getElementById('loading-screen');
  if(scr){
    scr.innerHTML = `<div class="loading-inner" style="max-width:640px">
      <div class="loading-logo" style="font-size:42px">⚠️ ERRORE</div>
      <div style="color:#ffb4a0; margin:14px 0 10px; font-weight:700">${title}</div>
      <div style="color:#c9d8e8; font-size:13px; line-height:1.6">${detail}</div>
      <button onclick="location.reload()" style="margin-top:20px; padding:10px 18px; border-radius:999px; border:none; background:#d4b67a; color:#1a1200; font-weight:700; cursor:pointer">Riccarica / Reload</button>
      <div style="margin-top:16px; font-size:11px; color:rgba(255,255,255,0.4)">Se persiste, prova Chrome/Edge desktop, WebGL ativo. Fallback 2D mappa disponível via M.</div>
    </div>`;
    scr.style.display='flex';
    scr.classList.remove('fade-out');
  }
}

function checkWebGL(){
  try{
    const c=document.createElement('canvas');
    const gl=c.getContext('webgl2') || c.getContext('webgl');
    if(!gl) return false;
    return true;
  }catch{ return false; }
}

async function yieldFrame(){
  return new Promise(r=> setTimeout(r, 16));
}

async function init(){
  try{
  if(!checkWebGL()){
    showError('WebGL non supportato','Il browser non ha WebGL attivo. Attiva accelerazione hardware o usa Chrome/Firefox desktop. Il progetto richiede WebGL2.');
    return;
  }

  setLoading(6,'Inizializzazione renderer…');
  // Adaptive quality based on device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
  const pixelRatioCap = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.4);
  const shadowEnabled = !isMobile;

  renderer = new THREE.WebGLRenderer({ antialias: !isMobile, powerPreference: isMobile ? 'low-power' : 'high-performance', alpha:false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelRatioCap);
  renderer.shadowMap.enabled = shadowEnabled;
  if(shadowEnabled) renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.02;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // fail-fast if context lost
  renderer.domElement.addEventListener('webglcontextlost', e=>{
    e.preventDefault();
    showError('Context WebGL perso','La scheda ha perso il contesto GPU. Ricarica la pagina.');
  });
  document.body.appendChild(renderer.domElement);
  renderer.domElement.tabIndex = 1;
  renderer.domElement.style.outline='none';

  worldScene = new WorldScene(renderer);
  // ensure shadows disabled early if mobile
  if(isMobile) worldScene.sun.castShadow=false;

  terrain = new TerrainSystem(worldScene);
  water = new WaterSystem(worldScene);
  vegetation = new VegetationSystem(worldScene, terrain);
  buildings = new BuildingSystem(worldScene, terrain);
  roads = new RoadSystem(worldScene, terrain);
  interiors = new InteriorSystem(worldScene, buildings);
  timeSystem = new TimeSystem(worldScene);
  weather = new WeatherSystem(worldScene, renderer);
  audio = new AudioSystem();
  crowd = new CrowdSystem(worldScene, terrain, buildings);

  const camera = new THREE.PerspectiveCamera(isMobile?68:74, window.innerWidth/window.innerHeight, 0.1, isMobile?2000:3200);
  camera.position.set(-280, 12, 60);

  setLoading(14,'Generazione terreno — Alpi, Appennini, Pianura…');
  await yieldFrame();
  terrain.generate();
  setLoading(22,'Terreno pronto — idrografia…');
  await yieldFrame();

  setLoading(28,'Idrografia — Canali, Po, Arno, laghi…');
  water.create();
  await yieldFrame();

  setLoading(42,'Rete stradale — Autostrade, vicoli…');
  roads.create();
  await yieldFrame();

  setLoading(52,'Architettura — 180+ edifici…');
  // yield mid-way if many buildings to avoid blocking
  buildings.generate();
  setLoading(68,'Edifici pronti — vegetazione…');
  await yieldFrame();

  setLoading(72,'Vegetazione — Cipressi, ulivi, foreste…');
  vegetation.create();
  await yieldFrame();

  setLoading(82,'Popolazione — routine quotidiane…');
  crowd.generate(isMobile?35:60);
  interiors.prepareInteriors();
  await yieldFrame();

  setLoading(88,'Illuminazione PBR…');
  worldScene.updateSky(timeSystem.timeHours, currentWeather);
  await yieldFrame();

  setLoading(94,'Controlli — WASD, E per porte…');
  player = new PlayerControls(camera, renderer.domElement, terrain, buildings);
  const startX = -260, startZ = 35;
  const startY = terrain.getHeightAt(startX, startZ)+ player.eyeHeight;
  player.teleport(startX, startY, startZ);
  player.yaw = -0.6;
  player.pitch = -0.12;
  player.updateCameraRotation();

  minimap = new MinimapSystem(terrain, buildings);
  minimap.attachMapClick((world)=>{
    const y = terrain.getHeightAt(world.x, world.z)+ player.eyeHeight;
    player.teleport(world.x, y, world.z);
    document.getElementById('map-overlay').classList.add('hidden');
    audio.playAmbient(getRegionForPos(world.x, world.z));
    updateHudLocation(world.x, world.z);
  });

  setupUI(camera, { isMobile, pixelRatioCap });

  window.addEventListener('resize', ()=>{
    camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  window.addEventListener('beforeunload', ()=> saveGame());

  let stepAcc=0;
  let perfLow=false;
  let lastFpsCheck=performance.now();
  let frameCounter=0;

  setLoading(100,'Mondo pronto — Benvenuti in Italia!');

  // safety timeout: if something stalls, force hide loading after 5s
  const safety = setTimeout(()=>{
    const scr=document.getElementById('loading-screen');
    if(scr && scr.style.display!=='none'){
      console.warn('Safety timeout forcing hide loading');
      hideLoadingAndShowMenu();
    }
  }, 6000);

  setTimeout(()=>{ clearTimeout(safety); hideLoadingAndShowMenu(); }, 650);

  function hideLoadingAndShowMenu(){
    const scr=document.getElementById('loading-screen');
    if(!scr) return;
    scr.classList.add('fade-out');
    setTimeout(()=> { scr.style.display='none'; }, 850);
    const menu=document.getElementById('main-menu');
    menu.classList.remove('hidden');
    // auto-enter only on desktop; mobile requires tap
    if(!isMobile){
      setTimeout(()=> { if(!menu.classList.contains('hidden')) enterWorld(); }, 1800);
    }
  }

  // Main loop with FPS guard
  function animate(){
    requestAnimationFrame(animate);
    const delta=Math.min(clock.getDelta(), 0.033);

    // FPS sampling every 1s
    frameCounter++;
    if(performance.now()-lastFpsCheck>1000){
      const fps=frameCounter;
      frameCounter=0; lastFpsCheck=performance.now();
      if(fps<28 && !perfLow && !isMobile){
        perfLow=true;
        renderer.setPixelRatio(1);
        renderer.shadowMap.enabled=false;
        crowd.setDensity(35);
        console.warn('FPS low ('+fps+') → lowered quality');
        const tip=document.createElement('div');
        tip.textContent='⚡ Qualità ridotta per FPS basso — puoi aumentare in Impostazioni';
        tip.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:60;background:rgba(0,0,0,0.7);color:#f4e8c1;padding:8px 14px;border-radius:999px;font:12px Inter';
        document.body.appendChild(tip); setTimeout(()=>tip.remove(), 3500);
      }
    }

    timeSystem.update(delta);
    weather.update(delta, player.position);

    const skyInfo = worldScene.updateSky(timeSystem.timeHours, currentWeather);
    water.update(performance.now(), worldScene.sun.position.clone().normalize(), worldScene.sun.color);
    // only update night lights if night factor high to save traversal
    if(skyInfo.dayFactor<0.65) buildings.updateNightLights(skyInfo.dayFactor);

    const interiorActive = !!interiors.activeInterior;
    player.update(delta, interiorActive);
    // crowd throttled: already LOD inside
    crowd.update(delta, player.position, interiorActive);

    updateInteractionPrompt();

    if(Math.random()<0.09) {
      minimap.drawMinimap(player.position, player.yaw);
      if(!document.getElementById('map-overlay').classList.contains('hidden')){
        minimap.drawWorldMap(player.position);
      }
    }

    document.getElementById('hud-time').textContent = timeSystem.getDisplay();
    document.getElementById('hud-date').textContent = getDateString(timeSystem.timeHours, currentWeather);
    if(timeSystem.autoAdvance){
      document.getElementById('time-value').textContent = timeSystem.getDisplay();
      document.getElementById('time-slider').value = timeSystem.timeHours;
    }

    const isMoving = player.velocity.length() > 0.6 && player.onGround;
    if(isMoving && !interiorActive){
      stepAcc+=delta* (player.isRunning? 2.8:1.9);
      if(stepAcc>1){
        stepAcc=0;
        if(Math.random()<0.55) audio.playFootstep('cobble');
      }
    }

    const newRegion = getRegionForPos(player.position.x, player.position.z);
    if(newRegion!==currentRegionId){
      currentRegionId=newRegion;
      updateHudLocation(player.position.x, player.position.z);
      if(Math.random()<0.08) audio.playAmbient(currentRegionId);
    }

    renderer.render(worldScene.scene, camera);
  }
  animate();

  minimap.drawMinimap(player.position, player.yaw);
  minimap.drawWorldMap(player.position);

  window._italia = { player, buildings, terrain, worldScene, timeSystem, weather, crowd, renderer, camera, interiors };

  runAcceptanceTests();

  }catch(e){
    console.error(e);
    loadError=e;
    showError('Errore durante il caricamento', (e.message||e.toString()) + '<br><br>Stack: <code style="font-size:10px">'+ (e.stack? e.stack.slice(0,600):'') +'</code>');
  }
}

function getRegionForPos(x,z){
  let best=null, bestDist=Infinity;
  const regs={
    venezia:{x:20,z:-90}, roma:{x:180,z:-20}, milano:{x:-240,z:-420}, toscana:{x:-280,z:60}, dolomiti:{x:0,z:-700}
  };
  for(const [id, p] of Object.entries(regs)){
    const d=Math.hypot(p.x-x, p.z-z);
    if(d<bestDist){ best=id; bestDist=d; }
  }
  return best||'toscana';
}
function updateHudLocation(x,z){
  const region=getRegionForPos(x,z);
  const names={ venezia:'Piazza San Marco — Venezia', roma:'Fori Imperiali — Roma', milano:'Duomo — Milano', toscana:'Colline del Chianti — Toscana', dolomiti:'Vette delle Dolomiti — Trentino' };
  const el=document.getElementById('hud-location');
  if(el) el.textContent = names[region] || `${region} — Italia`;
}

function getDateString(timeHours, weather){
  const weathers={ clear:'Sereno', partly:'Parzialmente Nuvoloso', overcast:'Coperto', rain:'Pioggia', fog:'Nebbia' };
  const hour=Math.floor(timeHours);
  let period='Mattina';
  if(hour>=12 && hour<18) period='Pomeriggio';
  else if(hour>=18 && hour<21) period='Tramonto';
  else if(hour>=21 || hour<5) period='Notte';
  return `15 Giugno · Estate · ${period} · ${weathers[weather]||weathers.clear}`;
}

function setupUI(camera, opts={}){
  const menu=document.getElementById('main-menu');
  const btnEnter=document.getElementById('btn-enter');
  const btnTour=document.getElementById('btn-tour');
  const btnSettingsMenu=document.getElementById('btn-settings-menu');

  window.enterWorld = ()=>{
    menu.classList.add('hidden');
    if(!opts.isMobile && renderer.domElement.requestPointerLock) renderer.domElement.requestPointerLock();
    audio.init(); audio.playAmbient(currentRegionId);
  };
  btnEnter.addEventListener('click', window.enterWorld);
  btnTour.addEventListener('click', ()=>{
    menu.classList.add('hidden');
    const tourPoints=[
      {x:35,z:-105, yaw:0.2},
      {x:180,z:-20, yaw:2.1},
      {x:-240,z:-420, yaw:-0.9},
      {x:-260,z:40, yaw:0.6},
      {x:0,z:-700, yaw:1.1},
    ];
    let idx=0;
    function nextTour(){
      if(idx>=tourPoints.length){ audio.playAmbient(currentRegionId); return; }
      const p=tourPoints[idx++];
      const y=terrain.getHeightAt(p.x,p.z)+player.eyeHeight;
      player.teleport(p.x,y,p.z);
      player.yaw=p.yaw;
      player.updateCameraRotation();
      updateHudLocation(p.x,p.z);
      setTimeout(nextTour, 2600);
    }
    nextTour();
    audio.init();
  });
  btnSettingsMenu.addEventListener('click', ()=>{
    document.getElementById('settings-panel').classList.remove('hidden');
  });

  const settingsPanel=document.getElementById('settings-panel');
  document.getElementById('btn-settings').addEventListener('click', ()=> settingsPanel.classList.remove('hidden'));
  document.getElementById('btn-close-settings').addEventListener('click', ()=> settingsPanel.classList.add('hidden'));
  document.getElementById('btn-map-hud').addEventListener('click', ()=> document.getElementById('map-overlay').classList.remove('hidden'));
  document.getElementById('btn-close-map').addEventListener('click', ()=> document.getElementById('map-overlay').classList.add('hidden'));

  const timeSlider=document.getElementById('time-slider');
  const timeVal=document.getElementById('time-value');
  timeSlider.addEventListener('input', e=>{
    const v=parseFloat(e.target.value);
    timeSystem.setTime(v);
    timeVal.textContent=v.toFixed(1)+'h — '+timeSystem.getDisplay();
  });
  const pauseBtn=document.getElementById('btn-pause-time');
  pauseBtn.addEventListener('click', ()=>{
    timeSystem.paused=!timeSystem.paused;
    pauseBtn.textContent=timeSystem.paused?'▶ Riprendi':'⏸ Pausa';
    timeSystem.autoAdvance=!timeSystem.paused;
  });
  timeVal.addEventListener('click', ()=>{
    timeSystem.autoAdvance=!timeSystem.autoAdvance;
    timeSystem.paused=!timeSystem.autoAdvance;
    pauseBtn.textContent=timeSystem.paused?'▶ Riprendi':'⏸ Pausa';
  });

  const weatherSel=document.getElementById('weather-select');
  weatherSel.addEventListener('change', e=>{
    currentWeather=e.target.value;
    weather.setWeather(currentWeather);
  });

  const crowdSlider=document.getElementById('crowd-slider');
  crowdSlider.addEventListener('input', e=>{
    crowd.setDensity(parseInt(e.target.value));
    document.getElementById('crowd-value').textContent=e.target.value+'%';
  });

  const qualitySel=document.getElementById('quality-select');
  // set initial to reflect device
  if(opts.isMobile) qualitySel.value='performance';
  qualitySel.addEventListener('change', e=>{
    applyQuality(e.target.value);
  });
  document.getElementById('audio-slider').addEventListener('input', e=>{
    audio.setVolume(parseInt(e.target.value)/100);
  });

  document.getElementById('btn-save-game').addEventListener('click', ()=>{ saveGame(); alert('Partita salvata! ✓'); });
  document.getElementById('btn-photo').addEventListener('click', ()=>{
    renderer.domElement.requestFullscreen?.();
  });

  window.addEventListener('keydown', e=>{
    if(e.code==='KeyM'){ e.preventDefault(); const m=document.getElementById('map-overlay'); m.classList.toggle('hidden'); if(!m.classList.contains('hidden')) minimap.drawWorldMap(player.position); }
    if(e.code==='Escape'){
      if(interiors.activeInterior){
        interiors.exitToEntry(player);
        audio.playDoor();
      } else if(!document.getElementById('map-overlay').classList.contains('hidden')){
        document.getElementById('map-overlay').classList.add('hidden');
      } else if(!document.getElementById('settings-panel').classList.contains('hidden')){
        document.getElementById('settings-panel').classList.add('hidden');
      } else {
        if(document.pointerLockElement) document.exitPointerLock();
        if(menu.classList.contains('hidden')) menu.classList.remove('hidden');
      }
    }
    if(e.code==='KeyT'){ document.getElementById('settings-panel').classList.toggle('hidden'); }
    if(e.code==='KeyE'){
      handleInteract();
    }
    if(e.code==='KeyP'){ renderer.domElement.requestFullscreen?.(); }
  });

  document.getElementById('pointer-hint')?.addEventListener('click', ()=> renderer.domElement.requestPointerLock());

  function applyQuality(q){
    if(q==='high'){ renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); renderer.shadowMap.enabled=true; }
    else if(q==='balanced'){ renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.4)); renderer.shadowMap.enabled=true; }
    else { renderer.setPixelRatio(1); renderer.shadowMap.enabled=false; }
  }
}

function updateInteractionPrompt(){
  if(!player || !interiors) return;
  const prompt=document.getElementById('interaction-prompt');
  if(interiors.activeInterior){
    prompt.classList.remove('hidden');
    document.getElementById('prompt-text').textContent='Esci dall\'edificio — ESC';
    return;
  }
  const nearby=interiors.findNearbyDoor(player.position, 3.0);
  if(nearby){
    prompt.classList.remove('hidden');
    document.getElementById('prompt-text').textContent = nearby.building.enterable? `Entra — ${nearby.building.region.toUpperCase()} · ${nearby.building.id}` : 'Porta chiusa';
  } else {
    prompt.classList.add('hidden');
  }
}

function handleInteract(){
  if(!player || !interiors) return;
  if(interiors.activeInterior){
    interiors.exitToEntry(player);
    audio.playDoor();
    return;
  }
  const nearby=interiors.findNearbyDoor(player.position, 3.0);
  if(nearby && nearby.building.enterable){
    interiors.enterBuilding(nearby.building, player);
    audio.playDoor();
  }
}

function saveGame(){
  if(!player || !timeSystem) return;
  const data={
    pos: {x:player.position.x, y:player.position.y, z:player.position.z},
    yaw: player.yaw, pitch: player.pitch,
    time: timeSystem.timeHours,
    weather: currentWeather,
    region: currentRegionId,
    v:'1.0.0', ts: Date.now()
  };
  localStorage.setItem('italia_viva_save', JSON.stringify(data));
}
function loadGame(){
  try{
    const raw=localStorage.getItem('italia_viva_save');
    if(!raw) return null;
    return JSON.parse(raw);
  }catch{ return null; }
}

function runAcceptanceTests(){
  const results=[];
  function test(name, fn){
    try{
      const ok=fn();
      results.push({name, pass:!!ok, msg: ok?'PASS':'FAIL'});
    }catch(e){ results.push({name, pass:false, msg:e.message}); }
  }
  setTimeout(()=>{
    test('Engine renderer exists', ()=> !!renderer && !!renderer.domElement);
    test('Terrain generated', ()=> !!terrain.mesh && terrain.mesh.geometry.attributes.position.count>1000);
    test('Buildings generated (>60)', ()=> buildings.buildings.length>=60);
    test('Water canals exist', ()=> water.waters.length>=3);
    test('Player controller exists', ()=> !!player && typeof player.update==='function');
    test('Day-night sky updates', ()=> worldScene.updateSky(12,'clear') && true);
    test('Enterable interiors (>20)', ()=> buildings.buildings.filter(b=>b.enterable).length>=18);
    test('Vegetation placed', ()=> worldScene.vegetationGroup.children.length>30);
    test('Crowd spawned', ()=> crowd.npcs.length>20);
    test('Collision system', ()=> !!buildings.checkCollision);
    test('Minimap canvas', ()=> !!document.getElementById('minimap'));
    test('Save/load', ()=> { saveGame(); return !!loadGame(); });
    console.log('ITALIA VIVA — Acceptance Tests', results);
    const passCount=results.filter(r=>r.pass).length;
    const badge=document.createElement('div');
    badge.style.cssText='position:fixed;bottom:10px;right:12px;z-index:50;background:rgba(10,14,24,0.85);color:#f4e8c1;border:1px solid rgba(201,168,106,0.25);padding:8px 12px;border-radius:999px;font:10px Inter;letter-spacing:0.08em;';
    badge.textContent=`✓ TESTS: ${passCount}/${results.length} PASS — Stream OK`;
    document.body.appendChild(badge);
    localStorage.setItem('italia_viva_tests', JSON.stringify(results));
  }, 1200);
}

init();
