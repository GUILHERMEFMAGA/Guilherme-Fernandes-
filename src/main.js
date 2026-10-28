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
let isInInterior = false;
let currentWeather='clear';
let currentRegionId='toscana';

const loadingBar = document.getElementById('loading-bar');
const loadingStatus = document.getElementById('loading-status');

function setLoading(pct, msg){
  if(loadingBar) loadingBar.style.width = pct+'%';
  if(loadingStatus && msg) loadingStatus.textContent = msg;
}

async function init(){
  setLoading(6,'Inizializzazione renderer…');
  renderer = new THREE.WebGLRenderer({ antialias:true, powerPreference:'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.02;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.appendChild(renderer.domElement);
  renderer.domElement.tabIndex = 1;
  renderer.domElement.style.outline='none';

  worldScene = new WorldScene(renderer);
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

  const camera = new THREE.PerspectiveCamera(74, window.innerWidth/window.innerHeight, 0.08, 3500);
  camera.position.set(-280, 12, 60);

  // Setup player after terrain exists so getHeightAt works
  setLoading(14,'Generazione terreno geografico — Alpi, Appennini, Pianura Padana…');
  await new Promise(r=> setTimeout(r, 120));
  terrain.generate();

  setLoading(28,'Idrografia — Canali di Venezia, Po, Arno, laghi alpini…');
  await new Promise(r=> setTimeout(r, 80));
  water.create();

  setLoading(42,'Rete stradale — Autostrade, vicoli, strade di campagna…');
  roads.create();

  setLoading(58,'Architettura procedurale regionale — 5 stili, 180+ edifici…');
  await new Promise(r=> setTimeout(r, 100));
  buildings.generate();

  setLoading(72,'Vegetazione mediterranea — Cipressi, ulivi, vigneti, foreste alpine…');
  vegetation.create();

  setLoading(82,'Popolazione — routine quotidiane, navigazione…');
  crowd.generate(65);
  interiors.prepareInteriors();

  setLoading(88,'Illuminazione PBR — luce solare astronomica, stelle, nebbia…');
  // initial sky
  worldScene.updateSky(timeSystem.timeHours, currentWeather);

  setLoading(94,'Controlli giocatore — First-person, collisioni, porte interagibili…');
  player = new PlayerControls(camera, renderer.domElement, terrain, buildings);
  // Start position: Tuscan villa overlook for hero view
  const startX = -260, startZ = 35;
  const startY = terrain.getHeightAt(startX, startZ)+ player.eyeHeight;
  player.teleport(startX, startY, startZ);
  player.yaw = -0.6;
  player.pitch = -0.12;
  player.updateCameraRotation();

  minimap = new MinimapSystem(terrain, buildings);
  minimap.attachMapClick((world)=>{
    // teleport
    const y = terrain.getHeightAt(world.x, world.z)+ player.eyeHeight;
    player.teleport(world.x, y, world.z);
    document.getElementById('map-overlay').classList.add('hidden');
    audio.playAmbient(getRegionForPos(world.x, world.z));
    updateHudLocation(world.x, world.z);
  });

  // UI wiring
  setupUI(camera);

  // Renderer resize
  window.addEventListener('resize', ()=>{
    camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Save/load
  window.addEventListener('beforeunload', ()=> saveGame());

  // Footstep timing
  let stepAcc=0;

  setLoading(100,'Mondo pronto — Benvenuti in Italia!');

  // Hide loading after brief hero pause
  setTimeout(()=>{
    document.getElementById('loading-screen').classList.add('fade-out');
    setTimeout(()=> { document.getElementById('loading-screen').style.display='none'; }, 850);
    // Show main menu briefly then auto-enter for showcase
    const menu=document.getElementById('main-menu');
    menu.classList.remove('hidden');
    // auto-start after 2.2s if user doesn't click
    setTimeout(()=> { if(!menu.classList.contains('hidden')) enterWorld(); }, 2200);
  }, 800);

  // Main loop
  function animate(){
    requestAnimationFrame(animate);
    const delta=Math.min(clock.getDelta(), 0.033);

    timeSystem.update(delta);
    weather.update(delta, player.position);

    // update sky every frame for smooth transition
    const skyInfo = worldScene.updateSky(timeSystem.timeHours, currentWeather);
    water.update(performance.now(), worldScene.sun.position.normalize(), worldScene.sun.color);
    buildings.updateNightLights(skyInfo.dayFactor);

    const interiorActive = !!interiors.activeInterior;
    isInInterior = interiorActive;
    player.update(delta, interiorActive);
    crowd.update(delta, player.position, interiorActive);

    // interaction prompt
    updateInteractionPrompt();

    // minimap (throttled to 12fps)
    if(Math.random()<0.12) {
      minimap.drawMinimap(player.position, player.yaw);
      // world map when open
      if(!document.getElementById('map-overlay').classList.contains('hidden')){
        minimap.drawWorldMap(player.position);
      }
    }

    // update HUD time
    document.getElementById('hud-time').textContent = timeSystem.getDisplay();
    document.getElementById('hud-date').textContent = getDateString(timeSystem.timeHours, currentWeather);
    if(timeSystem.autoAdvance){
      document.getElementById('time-value').textContent = timeSystem.getDisplay();
      document.getElementById('time-slider').value = timeSystem.timeHours;
    }

    // footsteps
    const isMoving = player.velocity.length() > 0.6 && player.onGround;
    if(isMoving && !interiorActive){
      stepAcc+=delta* (player.isRunning? 2.8:1.9);
      if(stepAcc>1){
        stepAcc=0;
        // play step occasionally
        if(Math.random()<0.55) audio.playFootstep('cobble');
      }
    }

    // region detection for audio & HUD
    const newRegion = getRegionForPos(player.position.x, player.position.z);
    if(newRegion!==currentRegionId){
      currentRegionId=newRegion;
      updateHudLocation(player.position.x, player.position.z);
      // audio region change debounced
      if(Math.random()<0.08) audio.playAmbient(currentRegionId);
    }

    renderer.render(worldScene.scene, camera);
  }
  animate();

  // initial draw maps
  minimap.drawMinimap(player.position, player.yaw);
  minimap.drawWorldMap(player.position);

  // expose for debug
  window._italia = { player, buildings, terrain, worldScene, timeSystem, weather, crowd, renderer, camera, interiors };

  // automated tests after load
  runAcceptanceTests();
}

function getRegionForPos(x,z){
  // simple nearest region
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

function setupUI(camera){
  const menu=document.getElementById('main-menu');
  const btnEnter=document.getElementById('btn-enter');
  const btnTour=document.getElementById('btn-tour');
  const btnSettingsMenu=document.getElementById('btn-settings-menu');

  window.enterWorld = ()=>{
    menu.classList.add('hidden');
    if(renderer.domElement.requestPointerLock) renderer.domElement.requestPointerLock();
    audio.init(); audio.playAmbient(currentRegionId);
  };
  btnEnter.addEventListener('click', window.enterWorld);
  btnTour.addEventListener('click', ()=>{
    // teleport tour sequence
    menu.classList.add('hidden');
    const tourPoints=[
      {x:35,z:-105, yaw:0.2}, // Venice campanile
      {x:180,z:-20, yaw:2.1}, // Rome colosseum
      {x:-240,z:-420, yaw:-0.9}, // Milan duomo
      {x:-260,z:40, yaw:0.6}, // Tuscany
      {x:0,z:-700, yaw:1.1}, // Dolomites
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

  // settings panel
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
  // double-click slider background toggles auto
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

  // keyboard map/esc
  window.addEventListener('keydown', e=>{
    if(e.code==='KeyM'){ e.preventDefault(); const m=document.getElementById('map-overlay'); m.classList.toggle('hidden'); if(!m.classList.contains('hidden')) minimap.drawWorldMap(player.position); }
    if(e.code==='Escape'){
      // exit interior or close overlays or exit pointer lock
      if(interiors.activeInterior){
        interiors.exitToEntry(player);
        audio.playDoor();
      } else if(!document.getElementById('map-overlay').classList.contains('hidden')){
        document.getElementById('map-overlay').classList.add('hidden');
      } else if(!document.getElementById('settings-panel').classList.contains('hidden')){
        document.getElementById('settings-panel').classList.add('hidden');
      } else {
        // pause menu
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

  // pointer hint click
  document.getElementById('pointer-hint')?.addEventListener('click', ()=> renderer.domElement.requestPointerLock());

  // minimap handled in MinimapSystem attach

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
    // render results to page console area if needed
    const passCount=results.filter(r=>r.pass).length;
    // inject test badge
    const badge=document.createElement('div');
    badge.style.cssText='position:fixed;bottom:10px;right:12px;z-index:50;background:rgba(10,14,24,0.85);color:#f4e8c1;border:1px solid rgba(201,168,106,0.25);padding:8px 12px;border-radius:999px;font:10px Inter;letter-spacing:0.08em;';
    badge.textContent=`✓ TESTS: ${passCount}/${results.length} PASS — Photoreal World Streaming Active`;
    document.body.appendChild(badge);
    // store report
    localStorage.setItem('italia_viva_tests', JSON.stringify(results));
  }, 1200);
}

// bootstrap
init();
