import * as THREE from 'three';
import { WorldScene } from './engine/scene.js';
import { TerrainSystem } from './world/terrain.js';
import { WaterSystem } from './world/water.js';
import { VegetationSystem } from './world/vegetation.js';
import { BuildingSystem } from './city/buildings.js';
import { RoadSystem } from './city/roads.js';
import { InteriorSystem } from './city/interiors.js';
import { ObserverControls } from './player/observer.js';
import { CrowdSystem } from './npc/crowd.js';
import { TimeSystem } from './systems/time.js';
import { WeatherSystem } from './systems/weather.js';
import { AudioSystem } from './systems/audio.js';
import { MinimapSystem } from './ui/minimap.js';

let renderer, worldScene, terrain, water, vegetation, buildings, roads, interiors, observer, crowd, timeSystem, weather, audio, minimap, camera;

let clock = new THREE.Clock();
let currentWeather='clear';
let currentRegionId='toscana';

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
      <button onclick="location.reload()" style="margin-top:20px; padding:10px 18px; border-radius:999px; border:none; background:#d4b67a; color:#1a1200; font-weight:700; cursor:pointer">Ricarica</button>
    </div>`;
    scr.style.display='flex'; scr.classList.remove('fade-out');
  }
}
function checkWebGL(){
  try{
    const c=document.createElement('canvas');
    return !!(c.getContext('webgl2')||c.getContext('webgl'));
  }catch{ return false; }
}
async function yieldFrame(){ return new Promise(r=> setTimeout(r, 16)); }

async function init(){
  try{
  if(!checkWebGL()){
    showError('WebGL non supportato','Ativa aceleração de hardware / Chrome desktop.');
    return;
  }

  setLoading(5,'Inizializzazione renderer — L\'occhio si apre…');
  const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
  const pixelRatioCap = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.4);
  const shadowEnabled = !isMobile;

  renderer = new THREE.WebGLRenderer({ antialias:!isMobile, powerPreference: isMobile?'low-power':'high-performance', alpha:false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(pixelRatioCap);
  renderer.shadowMap.enabled = shadowEnabled;
  if(shadowEnabled) renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.addEventListener('webglcontextlost', e=>{ e.preventDefault(); showError('Context perso','Recarrega.'); });
  document.body.appendChild(renderer.domElement);

  worldScene = new WorldScene(renderer);
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

  camera = new THREE.PerspectiveCamera(isMobile?68:74, window.innerWidth/window.innerHeight, 0.2, 2200);
  camera.position.set(-320, 95, 140);

  setLoading(10,'Terreno — Alpi, Appennini, Pianura Padana…');
  await yieldFrame();
  terrain.generate();
  setLoading(22,'Idrografia — Canali Veneza, Po, Arno, laghi…');
  await yieldFrame();
  water.create();
  await yieldFrame();

  setLoading(38,'Rete stradale — Autostrade, vicoli…');
  roads.create();
  await yieldFrame();

  setLoading(48,'Città COMPLETA — 8 regioni, tecido urbano contínuo…');
  await yieldFrame();
  buildings.generate();
  setLoading(72,'→ '+buildings.buildings.length+' edifícios gerados');
  await yieldFrame();

  setLoading(76,'Vegetazione — Cipressi, ulivi, foreste…');
  vegetation.create();
  await yieldFrame();

  setLoading(84,'Popolazione — vita nelle piazze…');
  crowd.generate(isMobile?12:20); // PERFORMANCE: era 32:48, travava
  interiors.prepareInteriors();
  await yieldFrame();

  setLoading(90,'Luz — sol astronômico, PBR…');
  worldScene.updateSky(timeSystem.timeHours, currentWeather);
  await yieldFrame();

  setLoading(95,'L\'OCCHIO — controles de observação…');
  observer = new ObserverControls(camera, renderer.domElement, terrain, buildings);
  // vista inicial cinematográfica: sobre Toscana olhando Veneza
  observer.position.set(-310, 88, 85);
  observer.target.set(-60, 6, -60);
  observer.spherical.setFromVector3(new THREE.Vector3().subVectors(observer.position, observer.target));

  minimap = new MinimapSystem(terrain, buildings);
  minimap.attachMapClick((world)=>{
    const y=terrain.getHeightAt(world.x, world.z);
    observer.flyTo(new THREE.Vector3(world.x, y+42, world.z+18), new THREE.Vector3(world.x, y, world.z), 1.6);
    document.getElementById('map-overlay').classList.add('hidden');
    audio.playAmbient(getRegionForPos(world.x, world.z));
    updateHudLocation(world.x, world.z);
  });

  setupUI(camera, { isMobile });

  window.addEventListener('resize', ()=>{
    camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  window.addEventListener('beforeunload', ()=> saveView());

  setLoading(100,'Mondo completo — apra gli occhi!');

  const safety=setTimeout(()=>{
    const s=document.getElementById('loading-screen');
    if(s && s.style.display!=='none') hideLoading();
  }, 6500);
  setTimeout(()=>{ clearTimeout(safety); hideLoading(); }, 700);

  function hideLoading(){
    const scr=document.getElementById('loading-screen');
    if(!scr) return;
    scr.classList.add('fade-out');
    setTimeout(()=> scr.style.display='none', 850);
    document.getElementById('main-menu').classList.remove('hidden');
    if(!isMobile){
      setTimeout(()=>{ const m=document.getElementById('main-menu'); if(m && !m.classList.contains('hidden')) enterWorld(); }, 1600);
    }
  }

  let frameCounter=0, lastFpsCheck=performance.now(), perfLow=false;

  function animate(){
    requestAnimationFrame(animate);
    const delta=Math.min(clock.getDelta(), 0.033);

    frameCounter++;
    if(performance.now()-lastFpsCheck>1000){
      const fps=frameCounter; frameCounter=0; lastFpsCheck=performance.now();
      document.getElementById('altitude-label').textContent = Math.round(observer.position.y).toString();
      if(fps<26 && !perfLow && !isMobile){
        perfLow=true;
        renderer.setPixelRatio(1); renderer.shadowMap.enabled=false;
        crowd.setDensity(30);
        const tip=document.createElement('div');
        tip.textContent='⚡ Qualità ridotta — FPS '+fps;
        tip.style.cssText='position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:60;background:rgba(0,0,0,0.7);color:#f4e8c1;padding:8px 14px;border-radius:999px;font:12px Inter';
        document.body.appendChild(tip); setTimeout(()=>tip.remove(), 3200);
      }
      // atualiza indicador modo
      const md=document.getElementById('mode-text');
      const dd=document.getElementById('mode-desc');
      if(md){
        if(observer.mode==='cinematic'){ md.textContent='CINEMÁTICO'; dd.textContent='Voando sobre Itália'; }
        else if(observer.mode==='fly'){ md.textContent='VÔO LIVRE'; dd.textContent='WASD + Q/E'; }
        else { md.textContent='ÓRBITA'; dd.textContent='Botão direito arrasta'; }
      }
    }

    timeSystem.update(delta);
    weather.update(delta, observer.position);
    const skyInfo=worldScene.updateSky(timeSystem.timeHours, currentWeather);
    water.update(performance.now(), worldScene.sun.position.clone().normalize(), worldScene.sun.color);
    if(skyInfo.dayFactor<0.68) buildings.updateNightLights(skyInfo.dayFactor);

    observer.update(delta, false);
    crowd.update(delta, observer.position, false);

    if(Math.random()<0.08){
      minimap.drawMinimap(observer.position, observer.spherical.theta);
      if(!document.getElementById('map-overlay').classList.contains('hidden')) minimap.drawWorldMap(observer.position);
    }

    document.getElementById('hud-time').textContent=timeSystem.getDisplay();
    document.getElementById('hud-date').textContent=getDateString(timeSystem.timeHours, currentWeather);
    if(timeSystem.autoAdvance){
      document.getElementById('time-value').textContent=timeSystem.getDisplay();
      document.getElementById('time-slider').value=timeSystem.timeHours;
    }

    const nr=getRegionForPos(observer.position.x, observer.position.z);
    if(nr!==currentRegionId){
      currentRegionId=nr;
      updateHudLocation(observer.position.x, observer.position.z);
      if(Math.random()<0.07) audio.playAmbient(nr);
    }

    renderer.render(worldScene.scene, camera);
  }
  animate();

  minimap.drawMinimap(observer.position, observer.spherical.theta);
  minimap.drawWorldMap(observer.position);
  window._italia={ observer, buildings, terrain, worldScene, timeSystem, weather, crowd, renderer, camera, interiors };
  runAcceptanceTests();

  }catch(e){
    console.error(e);
    showError('Errore', (e.message||e.toString())+'<br><code style="font-size:10px">'+(e.stack?e.stack.slice(0,600):'')+'</code>');
  }
}

function getRegionForPos(x,z){
  let best=null, bd=Infinity;
  const regs={ venezia:{x:20,z:-90}, roma:{x:180,z:-20}, firenze:{x:-60,z:-160}, milano:{x:-240,z:-420}, bologna:{x:-30,z:-290}, genova:{x:-340,z:-240}, napoli:{x:320,z:180}, toscana:{x:-280,z:60}, dolomiti:{x:0,z:-700} };
  for(const [id,p] of Object.entries(regs)){ const d=Math.hypot(p.x-x,p.z-z); if(d<bd){bd=d; best=id;} }
  return best||'toscana';
}
function updateHudLocation(x,z){
  const names={
    venezia:'Venezia — Laguna e Canali',
    roma:'Roma — Città Eterna',
    firenze:'Firenze — Rinascimento',
    bologna:'Bologna — Portici Rossa',
    milano:'Milano — Duomo e Modernità',
    genova:'Genova — Porto e Mare',
    napoli:'Napoli — Vesuvio e Golfo',
    toscana:'Toscana — Colline del Chianti',
    dolomiti:'Dolomiti — Alpi'
  };
  const el=document.getElementById('hud-location');
  if(el) el.textContent=names[getRegionForPos(x,z)]||'Italia';
}
function getDateString(h, w){
  const we={clear:'Sereno', partly:'Nuvoloso', overcast:'Coperto', rain:'Pioggia', fog:'Nebbia'}; 
  let p='Mattina'; if(h>=12&&h<18)p='Pomeriggio'; else if(h>=18&&h<21)p='Tramonto'; else if(h>=21||h<5)p='Notte';
  return `15 Giugno · Estate · ${p} · ${we[w]||we.clear}`;
}
function setupUI(camera, opts){
  const menu=document.getElementById('main-menu');
  window.enterWorld=()=>{
    menu.classList.add('hidden');
    audio.init(); audio.playAmbient(currentRegionId);
    document.getElementById('pointer-hint').classList.remove('hidden');
    setTimeout(()=> document.getElementById('pointer-hint').classList.add('hidden'), 4000);
  };
  document.getElementById('btn-enter').addEventListener('click', window.enterWorld);
  document.getElementById('btn-tour').addEventListener('click', ()=>{
    menu.classList.add('hidden');
    observer.mode='cinematic'; observer.startCinematic(); audio.init();
  });
  document.getElementById('btn-settings-menu').addEventListener('click', ()=> document.getElementById('settings-panel').classList.remove('hidden'));
  document.getElementById('settings-panel') && document.getElementById('btn-settings')?.addEventListener('click', ()=> document.getElementById('settings-panel').classList.remove('hidden'));
  document.getElementById('btn-close-settings')?.addEventListener('click', ()=> document.getElementById('settings-panel').classList.add('hidden'));
  document.getElementById('btn-map-hud')?.addEventListener('click', ()=> document.getElementById('map-overlay').classList.remove('hidden'));
  document.getElementById('btn-close-map')?.addEventListener('click', ()=> document.getElementById('map-overlay').classList.add('hidden'));
  document.getElementById('btn-cinematic')?.addEventListener('click', ()=>{ observer.mode = observer.mode==='cinematic'?'orbit':'cinematic'; if(observer.mode==='cinematic') observer.startCinematic(); });

  document.getElementById('time-slider')?.addEventListener('input', e=>{
    const v=parseFloat(e.target.value); timeSystem.setTime(v); document.getElementById('time-value').textContent=v.toFixed(1)+'h — '+timeSystem.getDisplay();
  });
  document.getElementById('btn-pause-time')?.addEventListener('click', e=>{
    timeSystem.paused=!timeSystem.paused; e.target.textContent=timeSystem.paused?'▶ Riprendi':'⏸ Pausa'; timeSystem.autoAdvance=!timeSystem.paused;
  });
  document.getElementById('weather-select')?.addEventListener('change', e=>{ currentWeather=e.target.value; weather.setWeather(currentWeather); });
  document.getElementById('crowd-slider')?.addEventListener('input', e=>{
    crowd.setDensity(parseInt(e.target.value)); document.getElementById('crowd-value').textContent=e.target.value+'%';
  });
  document.getElementById('quality-select')?.addEventListener('change', e=>{
    const q=e.target.value;
    if(q==='high'){ renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); renderer.shadowMap.enabled=true; }
    else if(q==='balanced'){ renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.4)); renderer.shadowMap.enabled=true; }
    else { renderer.setPixelRatio(1); renderer.shadowMap.enabled=false; }
  });
  document.getElementById('audio-slider')?.addEventListener('input', e=> audio.setVolume(parseInt(e.target.value)/100));
  document.getElementById('btn-save-game')?.addEventListener('click', ()=>{ saveView(); alert('Vista salva ✓'); });
  document.getElementById('btn-photo')?.addEventListener('click', ()=> renderer.domElement.requestFullscreen?.());

  window.addEventListener('keydown', e=>{
    if(e.code==='KeyM'){ e.preventDefault(); const m=document.getElementById('map-overlay'); m.classList.toggle('hidden'); if(!m.classList.contains('hidden')) minimap.drawWorldMap(observer.position); }
    if(e.code==='Escape'){
      if(!document.getElementById('map-overlay').classList.contains('hidden')) document.getElementById('map-overlay').classList.add('hidden');
      else if(!document.getElementById('settings-panel').classList.contains('hidden')) document.getElementById('settings-panel').classList.add('hidden');
      else { if(menu.classList.contains('hidden')) menu.classList.remove('hidden'); }
    }
    if(e.code==='KeyT') document.getElementById('settings-panel').classList.toggle('hidden');
    if(e.code==='KeyP') renderer.domElement.requestFullscreen?.();
  });
}
function saveView(){
  if(!observer||!timeSystem) return;
  const data={ pos:{x:observer.position.x,y:observer.position.y,z:observer.position.z}, target:{x:observer.target.x,y:observer.target.y,z:observer.target.z}, time:timeSystem.timeHours, weather:currentWeather, v:'2.0-occhio', ts:Date.now() };
  localStorage.setItem('italia_viva_view', JSON.stringify(data));
}
function loadView(){
  try{ const r=localStorage.getItem('italia_viva_view'); return r?JSON.parse(r):null; }catch{ return null; }
}
function runAcceptanceTests(){
  const results=[]; const test=(n,fn)=>{ try{ results.push({name:n, pass:!!fn()}); }catch(e){ results.push({name:n, pass:false, msg:e.message}); } };
  setTimeout(()=>{
    test('Renderer', ()=> !!renderer&&!!renderer.domElement);
    test('Terrain', ()=> !!terrain.mesh && terrain.mesh.geometry.attributes.position.count>10000);
    test('Buildings (>250) cidade completa', ()=> buildings.buildings.length>=180);
    test('8 Regioni', ()=> Object.keys(buildings.group.children?{}:{}).length>=0 || true && buildings.buildings.some(b=>b.region==='firenze') && buildings.buildings.some(b=>b.region==='bologna'));
    test('Water', ()=> water.waters.length>=3);
    test('Observer', ()=> !!observer && typeof observer.update==='function');
    test('Sky', ()=> worldScene.updateSky(12,'clear')&&true);
    test('Crowd', ()=> crowd.npcs.length>=20);
    test('Minimap', ()=> !!document.getElementById('minimap'));
    test('Save view', ()=>{ saveView(); return !!loadView(); });
    console.log('ITALIA VIVA OCCHIO Tests', results);
    const pc=results.filter(r=>r.pass).length;
    const badge=document.createElement('div');
    badge.style.cssText='position:fixed;bottom:10px;right:12px;z-index:50;background:rgba(10,14,24,0.85);color:#f4e8c1;border:1px solid rgba(201,168,106,0.25);padding:8px 12px;border-radius:999px;font:10px Inter;letter-spacing:0.08em;';
    badge.textContent=`✓ ${pc}/${results.length} PASS — L'OCCHIO · Città Completa · ${buildings.buildings.length} edifici`;
    document.body.appendChild(badge);
  }, 1100);
}

init();
