import * as THREE from 'three';

// Procedural PBR texture generation via Canvas
function makeCanvas(w,h, draw){
  const c = document.createElement('canvas');
  c.width=w; c.height=h;
  const ctx=c.getContext('2d');
  draw(ctx,w,h);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate=true;
  // anisotropic filtering will be set later via renderer cap
  return tex;
}

function plasterTexture(){
  const albedo = makeCanvas(512,512, (ctx,w,h)=>{
    ctx.fillStyle='#e8ddd0'; ctx.fillRect(0,0,w,h);
    // subtle mottling
    for(let i=0;i<6000;i++){
      const x=Math.random()*w, y=Math.random()*h, r=Math.random()*1.8+0.4;
      const alpha = Math.random()*0.09;
      ctx.fillStyle=`rgba(${180+Math.random()*30|0},${170+Math.random()*20|0},${150+Math.random()*25|0},${alpha})`;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    // hairline cracks
    ctx.strokeStyle='rgba(90,80,70,0.07)';
    ctx.lineWidth=0.7;
    for(let i=0;i<22;i++){
      ctx.beginPath();
      let x=Math.random()*w, y=Math.random()*h;
      ctx.moveTo(x,y);
      for(let k=0;k<6;k++){ x+=(Math.random()-0.5)*80; y+=(Math.random()-0.5)*40; ctx.lineTo(x,y); }
      ctx.stroke();
    }
  });
  const roughness = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#9a9a9a'; ctx.fillRect(0,0,w,h);
    for(let i=0;i<8000;i++){
      const x=Math.random()*w, y=Math.random()*h;
      const v = 140 + Math.random()*40;
      ctx.fillStyle=`rgba(${v},${v},${v},0.35)`;
      ctx.fillRect(x,y,1,1);
    }
  });
  roughness.colorSpace = THREE.NoColorSpace;
  return { albedo, roughness, normal: null };
}

function travertineTexture(){
  const albedo = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#d8c9b6'; ctx.fillRect(0,0,w,h);
    // horizontal strata
    for(let y=0;y<h;y+=4+Math.random()*8){
      ctx.fillStyle=`rgba(0,0,0,${0.03+Math.random()*0.04})`;
      ctx.fillRect(0,y,w,1+Math.random()*2);
    }
    for(let i=0;i<4000;i++){
      const x=Math.random()*w, y=Math.random()*h;
      ctx.fillStyle=`rgba(60,50,40,${Math.random()*0.06})`;
      ctx.fillRect(x,y,1,1.5);
    }
    // pits
    for(let i=0;i<900;i++){
      const x=Math.random()*w, y=Math.random()*h, r=Math.random()*2+0.5;
      ctx.fillStyle='rgba(70,60,50,0.12)';
      ctx.beginPath(); ctx.ellipse(x,y,r,r*0.6,0,0,Math.PI*2); ctx.fill();
    }
  });
  return { albedo, roughness:null, normal:null };
}

function brickTexture(){
  const albedo = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#b05a3a'; ctx.fillRect(0,0,w,h);
    // mortar lines
    const bh=22, bw=52;
    ctx.fillStyle='#d8c9b8';
    for(let y=0;y<h;y+=bh){
      ctx.fillRect(0,y,w,3);
      const offset = (y/bh %2===0) ? 0 : bw/2;
      for(let x=offset- bw; x<w; x+=bw){
        ctx.fillRect(x,y,3,bh);
      }
    }
    // brick variation
    for(let y=3;y<h;y+=bh){
      const offset = (Math.floor(y/bh)%2===0)?0:bw/2;
      for(let x=offset;x<w;x+=bw){
        const v = (Math.random()-0.5)*22;
        ctx.fillStyle=`rgba(${v},${v},${v},0.14)`;
        ctx.fillRect(x+3,y+3,bw-6,bh-6);
        // edge darkening
        ctx.strokeStyle='rgba(0,0,0,0.08)';
        ctx.strokeRect(x+3,y+3,bw-6,bh-6);
      }
    }
  });
  return { albedo, roughness:null, normal:null };
}

function terracottaTexture(){
  const albedo = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#b85c3b'; ctx.fillRect(0,0,w,h);
    for(let y=0;y<h;y+=16){
      ctx.fillStyle='rgba(0,0,0,0.07)';
      ctx.fillRect(0,y,w,2);
      ctx.fillStyle='rgba(255,255,255,0.06)';
      ctx.fillRect(0,y+2,w,1);
    }
    for(let i=0;i<5000;i++){
      const x=Math.random()*w, y=Math.random()*h;
      ctx.fillStyle=`rgba(50,20,10,${Math.random()*0.05})`;
      ctx.fillRect(x,y,2,1);
    }
  });
  return { albedo, roughness:null, normal:null };
}

function cobbleTexture(){
  const albedo = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#8a8d91'; ctx.fillRect(0,0,w,h);
    // irregular cobbles via voronoi-like blobs
    for(let i=0;i<120;i++){
      const x=Math.random()*w, y=Math.random()*h;
      const rx=18+Math.random()*14, ry=12+Math.random()*10;
      const shade = 110+Math.random()*30;
      ctx.fillStyle=`rgb(${shade},${shade},${shade+2})`;
      ctx.beginPath(); ctx.ellipse(x,y,rx,ry, Math.random()*0.6,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='rgba(60,60,60,0.35)'; ctx.lineWidth=1.2; ctx.stroke();
    }
    // dirt in joints
    ctx.fillStyle='rgba(40,30,20,0.08)';
    for(let i=0;i<2000;i++) ctx.fillRect(Math.random()*w, Math.random()*h, 1,1);
  });
  return { albedo, roughness:null, normal:null };
}

function marbleTexture(){
  const albedo = makeCanvas(512,512,(ctx,w,h)=>{
    ctx.fillStyle='#ece7de'; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(120,110,100,0.25)';
    ctx.lineWidth=0.9;
    for(let i=0;i<12;i++){
      ctx.beginPath();
      let x = Math.random()*w*0.3, y = Math.random()*h;
      ctx.moveTo(x,y);
      for(let k=0;k<80;k++){
        x += 6+Math.random()*8;
        y += Math.sin(k*0.2 + i)*4 + (Math.random()-0.5)*3;
        ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
    // subtle veins second layer
    ctx.strokeStyle='rgba(180,160,140,0.12)';
    for(let i=0;i<10;i++){
      ctx.beginPath(); let x=0, y=Math.random()*h;
      ctx.moveTo(x,y);
      for(let k=0;k<90;k++){ x+=6; y+=Math.sin(k*0.15)*2; ctx.lineTo(x,y); }
      ctx.stroke();
    }
  });
  return { albedo, roughness:null, normal:null };
}

// Cache
const cache = {};

export function getPBR(name){
  if(cache[name]) return cache[name];
  let set;
  switch(name){
    case 'plaster_cream': set=plasterTexture(); set.albedo.repeat.set(1,1); break;
    case 'plaster_ochre': set=plasterTexture(); set.albedo.repeat.set(1,1); break;
    case 'travertine': set=travertineTexture(); break;
    case 'brick': set=brickTexture(); break;
    case 'terracotta': set=terracottaTexture(); break;
    case 'cobble': set=cobbleTexture(); set.albedo.repeat.set(2,2); break;
    case 'marble': set=marbleTexture(); break;
    default: set=plasterTexture();
  }
  // configure textures
  [set.albedo, set.roughness, set.normal].forEach(t=>{
    if(!t) return;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
  });
  // tint for plaster_ochre
  if(name==='plaster_ochre'){
    // create tinted version via canvas tint
    set.tint = '#e8c9a0';
  }
  cache[name]=set;
  return set;
}

export function createPBRMaterial(name, opts={}){
  const set = getPBR(name);
  const mat = new THREE.MeshStandardMaterial({
    map: set.albedo,
    roughness: opts.roughness ?? 0.85,
    metalness: opts.metalness ?? 0.0,
    color: opts.color ? new THREE.Color(opts.color) : new THREE.Color(0xffffff),
  });
  if(set.albedo) mat.map = set.albedo;
  if(opts.repeat) mat.map.repeat.set(opts.repeat[0], opts.repeat[1]);
  if(set.roughness) {
    // use roughness map luminance approximation: we modulate roughness value
  }
  mat.needsUpdate = true;
  return mat;
}

export function createStreetMaterial(){
  const set = getPBR('cobble');
  const mat = new THREE.MeshStandardMaterial({ map: set.albedo, roughness:0.92, metalness:0.0 });
  mat.map.repeat.set(6,6);
  return mat;
}
export function createAsphaltMaterial(){
  const c = document.createElement('canvas'); c.width=256; c.height=256;
  const ctx=c.getContext('2d');
  ctx.fillStyle='#3a3c3e'; ctx.fillRect(0,0,256,256);
  for(let i=0;i<6000;i++){ const x=Math.random()*256, y=Math.random()*256; ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.06})`; ctx.fillRect(x,y,1,1); }
  const tex=new THREE.CanvasTexture(c); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.repeat.set(8,8);
  return new THREE.MeshStandardMaterial({ map:tex, roughness:0.95 });
}
