import * as THREE from 'three';
import { REGIONS } from '../city/buildings.js';

export class MinimapSystem {
  constructor(terrain, buildingSystem){
    this.terrain=terrain; this.buildingSystem=buildingSystem;
    this.canvas=document.getElementById('minimap');
    this.ctx=this.canvas.getContext('2d');
    this.worldCanvas=document.getElementById('world-map');
    this.wctx=this.worldCanvas? this.worldCanvas.getContext('2d'):null;
    this.zoom=1;
    this.offset={x:0,y:0};
    this.hoverRegion=null;
  }

  drawMinimap(playerPos, playerYaw){
    const ctx=this.ctx, w=this.canvas.width, h=this.canvas.height;
    ctx.clearRect(0,0,w,h);
    // background terrain heightmap approximation
    ctx.fillStyle='#0a1a2a'; ctx.fillRect(0,0,w,h);
    // draw water
    ctx.fillStyle='#123a5a'; ctx.beginPath(); ctx.ellipse(w*0.55, h*0.9, 90,28,0,0,Math.PI*2); ctx.fill();
    // north indicator
    ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(0,0,w,h);
    // region dots
    Object.values(REGIONS).forEach(reg=>{
      const px=this.worldToMinimap(reg.center.x, reg.center.z, w,h);
      ctx.fillStyle=reg.color; ctx.beginPath(); ctx.arc(px.x, px.y, 4.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.font='700 7px Inter'; ctx.fillText(reg.name, px.x+6, px.y+2);
    });
    // buildings as tiny dots
    ctx.fillStyle='rgba(240,230,210,0.7)';
    this.buildingSystem.buildings.forEach(b=>{
      if(b.hero) return;
      const p=this.worldToMinimap(b.position.x,b.position.z,w,h);
      if(p.x<0||p.x>w||p.y<0||p.y>h) return;
      ctx.fillRect(p.x-0.7,p.y-0.7,1.4,1.4);
    });
    // canals/river
    ctx.strokeStyle='#2d6b5e'; ctx.lineWidth=1.2; ctx.beginPath();
    const canalPts=[{x:-140,z:-220},{x:-60,z:-160},{x:30,z:-120},{x:90,z:-60},{x:60,z:20},{x:-10,z:50}];
    canalPts.forEach((pt,i)=>{
      const p=this.worldToMinimap(pt.x,pt.z,w,h); if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
    }); ctx.stroke();
    // river
    ctx.strokeStyle='#1e4a3a'; ctx.lineWidth=1.6; ctx.beginPath();
    [-900, -500, -200, 100,500,900].forEach((x,i)=>{
      const z= 120 - i*2; // approx
      const p=this.worldToMinimap(x,z,w,h); if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
    }); ctx.stroke();

    // player
    const pp=this.worldToMinimap(playerPos.x, playerPos.z, w,h);
    ctx.fillStyle='#ff3b30'; ctx.beginPath(); ctx.arc(pp.x,pp.y,4.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='white'; ctx.lineWidth=1.2; ctx.stroke();
    // direction
    ctx.strokeStyle='#ff3b30'; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(pp.x,pp.y); ctx.lineTo(pp.x+Math.sin(playerYaw)*12, pp.y+Math.cos(playerYaw)*12); ctx.stroke();

    // border
    ctx.strokeStyle='rgba(255,255,255,0.15)'; ctx.lineWidth=1; ctx.strokeRect(0.5,0.5,w-1,h-1);
  }

  worldToMinimap(wx,wz, w,h){
    // world bounds -1200..1200 x, -1000..1000 z
    const nx=(wx+1200)/2400, nz=(wz+1000)/2000;
    return { x: nx*w, y: nz*h };
  }

  minimapToWorld(px,py, w,h){
    const nx=px/w, nz=py/h;
    return { x: nx*2400-1200, z: nz*2000-1000 };
  }

  drawWorldMap(playerPos){
    if(!this.wctx) return;
    const ctx=this.wctx, w=this.worldCanvas.width, h=this.worldCanvas.height;
    ctx.clearRect(0,0,w,h);
    // sea gradient
    const grad=ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,'#0a1a2e'); grad.addColorStop(0.7,'#0e2a4a'); grad.addColorStop(1,'#164a5a');
    ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    // Italy silhouette approximated (we draw peninsula shape)
    ctx.fillStyle='#2a3a2a';
    ctx.beginPath();
    // rough boot shape via bezier
    ctx.moveTo(w*0.48, h*0.06);
    ctx.bezierCurveTo(w*0.62,h*0.18, w*0.66,h*0.38, w*0.62,h*0.55);
    ctx.bezierCurveTo(w*0.58,h*0.72, w*0.54,h*0.88, w*0.62,h*0.94);
    ctx.bezierCurveTo(w*0.55,h*0.92, w*0.42,h*0.85, w*0.38,h*0.70);
    ctx.bezierCurveTo(w*0.35,h*0.50, w*0.32,h*0.20, w*0.48,h*0.06);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=2; ctx.stroke();

    // terrain shading via noise-like mottling
    ctx.fillStyle='rgba(255,255,255,0.04)';
    for(let i=0;i<240;i++){ ctx.fillRect(Math.random()*w, Math.random()*h, 1.8,1.2); }

    // water bodies
    ctx.fillStyle='#1e5a7a'; ctx.beginPath(); ctx.ellipse(w*0.55, h*0.82, 80,22,0,0,Math.PI*2); ctx.fill(); // sea
    ctx.beginPath(); ctx.ellipse(w*0.45, h*0.18, 18,28,0,0,Math.PI*2); ctx.fill(); // north lakes

    // roads: autostrada
    ctx.strokeStyle='#4a4a4a'; ctx.lineWidth=3; ctx.beginPath();
    const highway=[{x:-260,z:-860},{x:-180,z:-500},{x:-120,z:-200},{x:0,z:0},{x:120,z:260},{x:240,z:980}];
    highway.forEach((pt,i)=>{
      const p=this.worldToMinimap(pt.x,pt.z,w,h); if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
    }); ctx.stroke();
    ctx.strokeStyle='#ffffff'; ctx.lineWidth=0.8; ctx.setLineDash([8,8]); ctx.stroke(); ctx.setLineDash([]);

    // region centers
    Object.values(REGIONS).forEach(reg=>{
      const p=this.worldToMinimap(reg.center.x, reg.center.z, w,h);
      ctx.fillStyle=reg.color; ctx.beginPath(); ctx.arc(p.x,p.y,7,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='white'; ctx.lineWidth=1.4; ctx.stroke();
      ctx.fillStyle='white'; ctx.font='600 12px Inter'; ctx.fillText(reg.name.toUpperCase(), p.x+10, p.y+4);
      // influence radius
      ctx.fillStyle=reg.color+'22'; ctx.beginPath(); ctx.arc(p.x,p.y,46,0,Math.PI*2); ctx.fill();
    });

    // all buildings
    ctx.fillStyle='rgba(244,232,193,0.65)';
    this.buildingSystem.buildings.forEach(b=>{
      const p=this.worldToMinimap(b.position.x,b.position.z,w,h);
      if(p.x<0||p.x>w||p.y<0||p.y>h) return;
      ctx.fillRect(p.x-1, p.y-1, 2,2);
    });

    // player
    const pp=this.worldToMinimap(playerPos.x, playerPos.z, w,h);
    ctx.fillStyle='#ff3b30'; ctx.beginPath(); ctx.arc(pp.x,pp.y,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(pp.x,pp.y,2,0,Math.PI*2); ctx.fill();
    // label
    ctx.fillStyle='white'; ctx.font='700 10px Inter'; ctx.fillText('TU SEI QUI', pp.x+8, pp.y-8);

    // scale bar
    ctx.fillStyle='rgba(0,0,0,0.45)'; ctx.fillRect(22, h-36, 160, 22);
    ctx.strokeStyle='white'; ctx.lineWidth=1; ctx.strokeRect(30, h-28, 100,4);
    ctx.fillStyle='white'; ctx.font='10px Inter'; ctx.fillText('10 km', 34, h-12);
    ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.font='10px Inter'; ctx.fillText('Scala 1:50.000 · WGS84 · OSM Compatible', w-260, h-14);
  }

  attachMapClick(handler){
    if(!this.worldCanvas) return;
    this.worldCanvas.addEventListener('click', (e)=>{
      const rect=this.worldCanvas.getBoundingClientRect();
      const scaleX=this.worldCanvas.width/rect.width;
      const scaleY=this.worldCanvas.height/rect.height;
      const x=(e.clientX-rect.left)*scaleX;
      const y=(e.clientY-rect.top)*scaleY;
      const world=this.minimapToWorld(x,y, this.worldCanvas.width, this.worldCanvas.height);
      handler(world);
    });
    // minimap click
    this.canvas.addEventListener('click', ()=>{
      document.getElementById('map-overlay').classList.remove('hidden');
    });
  }
}
