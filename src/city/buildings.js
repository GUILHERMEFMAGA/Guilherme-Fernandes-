import * as THREE from 'three';
import { createPBRMaterial } from '../materials/pbr.js';

export const REGIONS = {
  venezia: {
    id:'venezia', name:'Venezia', color:'#d35400',
    center:{x:20, z:-90},
    palette:['#e8c9a0','#d8b48a','#c9a89a','#e6dcc8','#d4b89a'],
    roof:'terracotta', facade:'plaster_ochre', floors:[2,4], canal:true, bridge:true, density:0.95
  },
  roma: {
    id:'roma', name:'Roma', color:'#8e44ad',
    center:{x:180, z:-20},
    palette:['#e8ddd0','#d8c9b6','#e6c9a0','#d4b8a0'],
    roof:'terracotta', facade:'travertine', floors:[3,5], density:0.92
  },
  firenze: {
    id:'firenze', name:'Firenze', color:'#c0392b',
    center:{x:-60, z:-160},
    palette:['#e8dcc0','#d8c9a0','#d4b89a','#c9b08a'],
    roof:'terracotta', facade:'plaster_cream', floors:[3,5], density:0.88
  },
  milano: {
    id:'milano', name:'Milano', color:'#2c3e50',
    center:{x:-240, z:-420},
    palette:['#d8ddd8','#c9d0d8','#e8e0d0','#b8c0c8'],
    roof:'terracotta', facade:'plaster_cream', floors:[4,7], modern:true, density:0.92
  },
  bologna: {
    id:'bologna', name:'Bologna', color:'#8e3515',
    center:{x:-30, z:-290},
    palette:['#c95a2a','#d8a090','#b94a1a','#e8c9a0'],
    roof:'terracotta', facade:'brick', floors:[3,5], density:0.85
  },
  toscana: {
    id:'toscana', name:'Toscana', color:'#27ae60',
    center:{x:-280, z:60},
    palette:['#d8c9a0','#e6dcc8','#c9b89a','#b8a08a'],
    roof:'terracotta', facade:'plaster_cream', floors:[2,3], density:0.42
  },
  genova: {
    id:'genova', name:'Genova', color:'#2980b9',
    center:{x:-340, z:-240},
    palette:['#e8c9a0','#f4e8c1','#d8b89a','#c9dcc0'],
    roof:'slate', facade:'plaster_ochre', floors:[3,6], density:0.82
  },
  napoli: {
    id:'napoli', name:'Napoli', color:'#e67e22',
    center:{x:320, z:180},
    palette:['#e8ddd0','#f4e8d0','#d8c9a0','#e8c9a0'],
    roof:'terracotta', facade:'plaster_cream', floors:[3,6], density:0.88
  },
  dolomiti: {
    id:'dolomiti', name:'Dolomiti', color:'#16a085',
    center:{x:0, z:-700},
    palette:['#d8ddd0','#c9c0b0','#8a9a8a'],
    roof:'slate', facade:'plaster_cream', floors:[2,3], alpine:true, density:0.32
  }
};

export class BuildingSystem {
  constructor(worldScene, terrain){
    this.worldScene = worldScene;
    this.terrain = terrain;
    this.group = worldScene.buildingGroup;
    this.buildings = [];
    this.colliders = [];
  }

  generate(){
    this.createUrbanBlocks(); // GEMINI 4 CARBON: quarteirões alinhados à rua
    Object.values(REGIONS).forEach(region=>{ this.generateRegion(region); });
    this.generateConnectingFabric();
    this.generateSuburbs();
    this.createRealSquares();
    this.addStreetFurniture();
  }

  // GEMINI 4 CARBON: quarteirões reais - fileiras de prédios ao longo das ruas
  createUrbanBlocks(){
    // ROMA: grade 3x2 = 6 quadras densas (evita explosão)
    const romaOrigin={x:140,z:-50}; const blockW=24, blockD=20, street=8;
    for(let ix=0; ix<3; ix++){
      for(let iz=0; iz<2; iz++){
        const cx=romaOrigin.x + ix*(blockW+street);
        const cz=romaOrigin.z + iz*(blockD+street);
        if(Math.hypot(cx-210, cz+55)<46) continue;
        if(Math.hypot(cx-160, cz+15)<38) continue;
        this.createBlockRow(cx, cz- blockD/2+2, 3, 'roma', true);
        this.createBlockRow(cx, cz+ blockD/2-2, 3, 'roma', true);
      }
    }
    // FIRENZE: 2x2 quadras
    const fi={x:-62,z:-155};
    for(let ix=0; ix<2; ix++){ for(let iz=0; iz<2; iz++){
      const cx=fi.x-6 + ix*28, cz=fi.z-6 + iz*26;
      if(Math.hypot(cx+62, cz+162)<28) continue;
      this.createBlockRow(cx, cz-8, 3, 'firenze', true);
      this.createBlockRow(cx, cz+8, 3, 'firenze', true);
    }}
    // VENEZIA: 2x2 vielas densas
    const ve={x:15,z:-95};
    for(let ix=0; ix<2; ix++){ for(let iz=0; iz<2; iz++){
      const cx=ve.x-18+ix*28, cz=ve.z-18+iz*22;
      this.createBlockRow(cx, cz, 3, 'venezia', true);
    }}
    // MILANO: 3 blocos modernos
    const mi={x:-240,z:-410};
    for(let ix=0; ix<3; ix++){
      const cx=mi.x + ix*26 -12, cz=mi.z+6;
      this.createBlockRow(cx, cz-10, 3, 'milano', true);
      this.createBlockRow(cx, cz+12, 3, 'milano', true);
    }
    // BOLOGNA + GENOVA + NAPOLI menores
    [{x:-30,z:-285, n:2},{x:-335,z:-242, n:2},{x:322,z:148, n:2}].forEach(o=>{
      for(let i=0;i<o.n;i++){
        const cx=o.x+i*20-10, cz=o.z;
        this.createBlockRow(cx, cz-8, 2, this.getNearestRegion(cx,cz).id, true);
      }
    });
  }
  createBlockRow(cx,cz,count, regionId, alongX){
    const region=REGIONS[regionId];
    for(let i=0;i<count;i++){
      const x= alongX? cx + (i - (count-1)/2)* (7 + Math.random()*1.5) : cx;
      const z= !alongX? cz + (i-(count-1)/2)* (7+Math.random()*1.5) : cz;
      if(this.buildings.some(b=> Math.hypot(b.position.x-x,b.position.z-z)<6.5)) continue;
      const floors=THREE.MathUtils.randInt(region.floors[0], region.floors[1]);
      const w= alongX? 7+Math.random()*1.2 : 7+Math.random()*2;
      const d= alongX? 9+Math.random()*2 : 7+Math.random()*1.2;
      const h=floors*3.32+0.6;
      this.createBuilding(x,z,w,d,h,region,floors);
    }
  }
  createBlockCol(cx,cz,count, regionId, alongX){ this.createBlockRow(cx,cz,count,regionId,alongX); }
  getNearestRegion(x,z){
    let best=REGIONS.roma, bd=Infinity; Object.values(REGIONS).forEach(r=>{const dd=Math.hypot(r.center.x-x, r.center.z-z); if(dd<bd){bd=dd; best=r;}}); return best;
  }

  generateRegion(region){
    // PERFORMANCE HOTFIX: corte 45% de prédios pra parar travada
    const count = Math.round(region.density * (
      region.id==='toscana'? 22 :
      region.id==='dolomiti'? 16 :
      region.id==='firenze'? 28 :
      region.id==='bologna'? 24 :
      region.id==='genova'? 20 :
      region.id==='napoli'? 26 : 28));
    const spreadX = region.id==='dolomiti'? 560 : region.id==='toscana'? 420 : region.id==='genova'? 300 : 300;
    const spreadZ = region.id==='dolomiti'? 240 : region.id==='toscana'? 360 : region.id==='genova'? 280 : 260;

    for(let i=0;i<count;i++){
      const x = region.center.x + (Math.random()-0.5)*spreadX + (Math.random()-0.5)*20;
      const z = region.center.z + (Math.random()-0.5)*spreadZ + (Math.random()-0.5)*20;
      if(region.id==='venezia'){
        const distToCanal = Math.abs(x - (20 + Math.sin(z*0.02)*18));
        if(distToCanal > 145) continue;
      }
      const dl1 = Math.hypot(x+420, z+480), dl2 = Math.hypot(x-380, z+520);
      if(dl1<150 || dl2<130) continue;
      // evita sobreposição excessiva: checa distância mínima 6m de outro prédio
      if(this.buildings.some(b=> Math.hypot(b.position.x-x, b.position.z-z) < 7.5)) { if(Math.random()<0.7) continue; }

      const floors = THREE.MathUtils.randInt(region.floors[0], region.floors[1]);
      const w = 6.5 + Math.random()*9;
      const d = 6.5 + Math.random()*9;
      const h = floors*3.28 + (region.alpine? 1.6: 0.8);

      this.createBuilding(x,z,w,d,h, region, floors);
    }

    this.createHeroLandmarks(region);
    this.createDistrictDetails(region);
  }

  createDistrictDetails(region){
    // Detalhes district-specific sem flutuação — tudo ancorado em minH
    if(region.id==='roma'){
      // Via dei Fori Imperiali - faixa de calçamento
      const cz = -18;
      for(let ix=0; ix<8; ix++){
        const fx = 165+ix*6, fz=cz;
        const fp=this.terrain.getFootprintHeight(fx,fz,5,5);
        const plaza=new THREE.Mesh(new THREE.PlaneGeometry(5.4,5.4), new THREE.MeshStandardMaterial({color:0xb8a890, roughness:0.95}));
        plaza.rotation.x=-Math.PI/2; plaza.position.set(fx, fp.minH+0.06, fz); this.worldScene.streetGroup.add(plaza);
      }
      // colunas romanas
      for(let i=0;i<6;i++){
        const x=155+i*9, z=-30;
        const fp=this.terrain.getFootprintHeight(x,z,1,1);
        const col=new THREE.Mesh(new THREE.CylinderGeometry(0.42,0.52,7,8), new THREE.MeshStandardMaterial({color:0xe0d0b8}));
        col.position.set(x, fp.minH+3.5, z); this.worldScene.streetGroup.add(col);
        const cap=new THREE.Mesh(new THREE.CylinderGeometry(0.68,0.42,0.45,8), new THREE.MeshStandardMaterial({color:0xf4ece0}));
        cap.position.set(x, fp.minH+7.0, z); this.worldScene.streetGroup.add(cap);
      }
    }
    if(region.id==='firenze'){
      // Piazza della Signoria copy
      const px=-88,pz=-132;
      const fp=this.terrain.getFootprintHeight(px,pz,34,28);
      const sq=new THREE.Mesh(new THREE.PlaneGeometry(34,28), new THREE.MeshStandardMaterial({color:0xc9b896, roughness:0.97}));
      sq.rotation.x=-Math.PI/2; sq.position.set(px, fp.minH+0.09, pz); this.worldScene.streetGroup.add(sq);
      // Palazzo Vecchio tower simplified
      const tv=new THREE.Mesh(new THREE.BoxGeometry(6,22,6), new THREE.MeshStandardMaterial({color:0xd0b090}));
      tv.position.set(px+12, fp.minH+11, pz-10); this.worldScene.buildingGroup.add(tv);
      const batt=new THREE.Mesh(new THREE.BoxGeometry(6.6,1.2,6.6), new THREE.MeshStandardMaterial({color:0xc9a880}));
      batt.position.set(px+12, fp.minH+22.6, pz-10); this.worldScene.buildingGroup.add(batt);
      // Loggia
      for(let i=0;i<4;i++){
        const lx=px-8+i*6, lz=pz+8;
        const fpl=this.terrain.getFootprintHeight(lx,lz,2,2);
        const lc=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.36,4.5,8), new THREE.MeshStandardMaterial({color:0xf4ece0}));
        lc.position.set(lx, fpl.minH+2.25, lz); this.worldScene.streetGroup.add(lc);
      }
    }
    if(region.id==='venezia'){
      // Piazza San Marco expandida: pavimento + colunas
      const mx=38,mz=-98;
      const fp=this.terrain.getFootprintHeight(mx,mz,44,38);
      const marc=new THREE.Mesh(new THREE.PlaneGeometry(44,38), new THREE.MeshStandardMaterial({color:0xd8c9a8, roughness:0.95}));
      marc.rotation.x=-Math.PI/2; marc.position.set(mx, fp.minH+0.07, mz); this.worldScene.streetGroup.add(marc);
      // borda canal com balaustrada
      for(let i=0;i<8;i++){
        const bx=-80+i*14, bz=-162;
        const fpb=this.terrain.getFootprintHeight(bx,bz,0.5,0.5);
        const bal=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.92,0.18), new THREE.MeshStandardMaterial({color:0xe8ddd0}));
        bal.position.set(bx, fpb.minH+0.62, bz); this.worldScene.streetGroup.add(bal);
      }
    }
    if(region.id==='napoli'){
      // Lungomare + Spaccanapoli calçada
      for(let i=0;i<10;i++){
        const x=285+i*8, z=148;
        const fp=this.terrain.getFootprintHeight(x,z,8,8);
        const walk=new THREE.Mesh(new THREE.PlaneGeometry(8,8), new THREE.MeshStandardMaterial({color:0xd8c0a0}));
        walk.rotation.x=-Math.PI/2; walk.position.set(x, fp.minH+0.06, z); this.worldScene.streetGroup.add(walk);
      }
    }
    if(region.id==='milano'){
      // Galleria Vittorio II - abóbada
      const gx=-215,gz=-395;
      const fp=this.terrain.getFootprintHeight(gx,gz,28,10);
      const gal=new THREE.Mesh(new THREE.PlaneGeometry(28,10), new THREE.MeshStandardMaterial({color:0xbfb4a0, roughness:0.92}));
      gal.rotation.x=-Math.PI/2; gal.position.set(gx, fp.minH+0.08, gz); this.worldScene.streetGroup.add(gal);
      const archG=new THREE.Mesh(new THREE.CylinderGeometry(5,5,28,16,1,true,0,Math.PI), new THREE.MeshStandardMaterial({color:0x8ab0c8, transparent:true, opacity:0.22, side:THREE.DoubleSide}));
      archG.rotation.z=Math.PI/2; archG.position.set(gx, fp.minH+5, gz); this.worldScene.buildingGroup.add(archG);
    }
  }

  generateConnectingFabric(){
    // Preenche corredores entre cidades com densidade média (trabalho pesado realista)
    const corridors=[
      {a: REGIONS.firenze.center, b: REGIONS.roma.center, count: 10, width: 80},
      {a: REGIONS.bologna.center, b: REGIONS.firenze.center, count: 8, width: 70},
      {a: REGIONS.milano.center, b: REGIONS.bologna.center, count: 9, width: 90},
      {a: REGIONS.genova.center, b: REGIONS.milano.center, count: 7, width: 70},
      {a: REGIONS.toscana.center, b: REGIONS.firenze.center, count: 7, width: 60},
      {a: REGIONS.roma.center, b: REGIONS.napoli.center, count: 9, width: 85},
      {a: REGIONS.venezia.center, b: REGIONS.bologna.center, count: 6, width: 55},
    ];
    corridors.forEach(cor=>{
      for(let i=0;i<cor.count;i++){
        const t=Math.random();
        const mx = THREE.MathUtils.lerp(cor.a.x, cor.b.x, t) + (Math.random()-0.5)*cor.width;
        const mz = THREE.MathUtils.lerp(cor.a.z, cor.b.z, t) + (Math.random()-0.5)*cor.width;
        // evita lagos
        if(Math.hypot(mx+420, mz+480)<140 || Math.hypot(mx-380, mz+520)<120) continue;
        if(this.buildings.some(b=> Math.hypot(b.position.x-mx, b.position.z-mz) < 8)) continue;
        const floors= THREE.MathUtils.randInt(2,4);
        const w=6 + Math.random()*7, d=6+Math.random()*7, h=floors*3.2+0.6;
        // escolhe região mais próxima pro estilo
        let bestR=REGIONS.firenze, bd=Infinity;
        Object.values(REGIONS).forEach(r=>{ const dd=Math.hypot(r.center.x-mx, r.center.z-mz); if(dd<bd){bd=dd; bestR=r; }});
        this.createBuilding(mx,mz,w,d,h,bestR,floors);
        // vilas: as vezes adiciona 2-3 casas agrupadas
        if(Math.random()<0.35){
          for(let k=0;k<2;k++){
            const ax=mx+(Math.random()-0.5)*22, az=mz+(Math.random()-0.5)*22;
            if(this.buildings.some(b=> Math.hypot(b.position.x-ax, b.position.z-az)<7)) continue;
            this.createBuilding(ax,az, 5+Math.random()*5, 5+Math.random()*5, 2.8+Math.random()*2.5, bestR, 2);
          }
        }
      }
    });
  }

  generateSuburbs(){
    // PERFORMANCE: anéis leves
    Object.values(REGIONS).forEach(region=>{
      if(region.id==='dolomiti' || region.id==='toscana') return;
      const ringCount = 5;
      for(let i=0;i<ringCount;i++){
        const ang=Math.random()*Math.PI*2;
        const r= 140 + Math.random()*90;
        const x=region.center.x + Math.cos(ang)*r*0.85;
        const z=region.center.z + Math.sin(ang)*r*0.75;
        if(this.buildings.some(b=> Math.hypot(b.position.x-x, b.position.z-z)<7.5)) continue;
        const floors=THREE.MathUtils.randInt(2,3);
        this.createBuilding(x,z, 5.5+Math.random()*6, 5.5+Math.random()*6, floors*3.1, region, floors);
      }
    });
    // pequenas aldeias espalhadas no campo (enche vazios)
    for(let i=0;i<22;i++){
      const x=(Math.random()-0.5)*900, z=(Math.random()-0.5)*600;
      // só campo: longe de centros
      const near = Object.values(REGIONS).some(r=> Math.hypot(r.center.x-x, r.center.z-z) < 110);
      if(near) continue;
      if(Math.hypot(x+420,z+480)<130) continue;
      const floors=2;
      this.createBuilding(x,z, 5+Math.random()*4, 5+Math.random()*4, 6.2, REGIONS.toscana, floors);
      // celeiro anexo
      if(Math.random()<0.5){
        this.createBuilding(x+8+Math.random()*6, z+Math.random()*6, 4,5, 3.8, REGIONS.toscana, 1);
      }
    }
  }

  createBuilding(x,z,w,d,h, region, floors){
    const foot = this.terrain.getFootprintHeight(x,z,w,d);
    const y = foot.minH;
    const slopeDepth = foot.slope;
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.userData.region = region.id;
    group.userData.enterable = Math.random() < 0.38;
    group.userData.buildingId = `b_${region.id}_${this.buildings.length}`;

    // GEMINI 4 CARBON: ilha de calçada + saia anti-flutuação discreta
    // 1) ilha de calçada que cobre desnível (plataforma)
    const islandW = w+3.2, islandD = d+3.2;
    const islandGeo = new THREE.PlaneGeometry(islandW, islandD);
    islandGeo.rotateX(-Math.PI/2);
    // textura calçada
    const sideCan=document.createElement('canvas'); sideCan.width=64; sideCan.height=64; const sc=sideCan.getContext('2d'); sc.fillStyle='#c9c7bc'; sc.fillRect(0,0,64,64); sc.strokeStyle='rgba(0,0,0,0.07)'; for(let i=0;i<64;i+=8){ sc.beginPath(); sc.moveTo(i,0); sc.lineTo(i,64); sc.stroke(); sc.beginPath(); sc.moveTo(0,i); sc.lineTo(64,i); sc.stroke(); }
    const sideTex=new THREE.CanvasTexture(sideCan); sideTex.wrapS=sideTex.wrapT=THREE.RepeatWrapping; sideTex.repeat.set(islandW/2, islandD/2);
    const islandMat=new THREE.MeshStandardMaterial({ map:sideTex, roughness:0.94 });
    const island=new THREE.Mesh(islandGeo, islandMat);
    island.position.y=0.09; island.receiveShadow=true; group.add(island);
    // meio-fio da ilha (perímetro)
    const curbH=0.14; const curbTh=0.12;
    const curbMat=new THREE.MeshStandardMaterial({color:0x9a9a92});
    const curb1=new THREE.Mesh(new THREE.BoxGeometry(islandW, curbH, curbTh), curbMat); curb1.position.set(0,curbH/2+0.09, islandD/2); group.add(curb1);
    const curb2=curb1.clone(); curb2.position.set(0,curbH/2+0.09, -islandD/2); group.add(curb2);
    const curb3=new THREE.Mesh(new THREE.BoxGeometry(curbTh, curbH, islandD), curbMat); curb3.position.set(islandW/2,curbH/2+0.09,0); group.add(curb3);
    const curb4=curb3.clone(); curb4.position.set(-islandW/2,curbH/2+0.09,0); group.add(curb4);

    // 2) saia vertical fina que enterra no terreno (invisível mas tapa vão)
    const skirtDepth = Math.max(1.2, slopeDepth + 0.9);
    const skirtMat = new THREE.MeshStandardMaterial({ color:0x7a7a78, roughness:0.98 });
    const sides=[
      {s:new THREE.BoxGeometry(w+0.18, skirtDepth, 0.14), p:[0,-skirtDepth/2+0.08, d/2]},
      {s:new THREE.BoxGeometry(w+0.18, skirtDepth, 0.14), p:[0,-skirtDepth/2+0.08, -d/2]},
      {s:new THREE.BoxGeometry(0.14, skirtDepth, d), p:[w/2,-skirtDepth/2+0.08,0]},
      {s:new THREE.BoxGeometry(0.14, skirtDepth, d), p:[-w/2,-skirtDepth/2+0.08,0]},
    ];
    sides.forEach(o=>{ const m=new THREE.Mesh(o.s, skirtMat); m.position.set(o.p[0],o.p[1],o.p[2]); group.add(m); });

    // Sombra de contato (AO fake) mais forte e maior — vende contato
    const aoGeo = new THREE.PlaneGeometry(islandW+1.5, islandD+1.5);
    aoGeo.rotateX(-Math.PI/2);
    const aoCan = document.createElement('canvas'); aoCan.width=64; aoCan.height=64;
    const aoc=aoCan.getContext('2d');
    const grad=aoc.createRadialGradient(32,32,0,32,32,32);
    grad.addColorStop(0,'rgba(0,0,0,0.55)'); grad.addColorStop(0.45,'rgba(0,0,0,0.20)'); grad.addColorStop(1,'rgba(0,0,0,0)');
    aoc.fillStyle=grad; aoc.fillRect(0,0,64,64);
    const aoTex=new THREE.CanvasTexture(aoCan);
    const aoMat=new THREE.MeshBasicMaterial({ map:aoTex, transparent:true, opacity:0.50, depthWrite:false });
    const aoPlane=new THREE.Mesh(aoGeo, aoMat);
    aoPlane.position.y=0.04;
    aoPlane.renderOrder=2;
    group.add(aoPlane);

    const baseMat = this.getFacadeMaterial(region, x,z);
    const baseGeo = new THREE.BoxGeometry(w, h, d);
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = h/2;
    base.castShadow=false; base.receiveShadow=true;
    if(region.id==='roma' && h>12) base.castShadow=true;
    group.add(base);

    const roof = this.createRoof(w,d,h, region);
    group.add(roof);

    const detailsGroup = new THREE.Group();
    detailsGroup.userData.isLODGroup = true;
    this.addFacadeDetails(detailsGroup, w,d,h, floors, region);
    detailsGroup.children.forEach(c=> c.userData.isDetail = true);
    group.add(detailsGroup);
    const door = this.createDoor(w,d,h, region);
    door.userData.isDetail = false;
    group.add(door);

    // Rodapé em pedra sob a fachada — fica exatamente sobre a ilha
    const plinthGeo = new THREE.BoxGeometry(w+0.22, 0.38, d+0.22);
    const plinthMat = new THREE.MeshStandardMaterial({ color:0x8a8a88, roughness:0.85 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.28;
    group.add(plinth);

    if((region.id==='roma' || region.id==='milano' || region.id==='firenze' || region.id==='napoli') && Math.random()<0.32){
      const signGeo = new THREE.PlaneGeometry(2.2,0.58);
      const signCan = document.createElement('canvas'); signCan.width=256; signCan.height=64;
      const ctx=signCan.getContext('2d'); ctx.fillStyle='#1a1a1a'; ctx.fillRect(0,0,256,64);
      ctx.fillStyle='#d4b67a'; ctx.font='600 20px Cinzel'; ctx.fillText(['TRATTORIA','CAFFE','LIBRERIA','MODA','FARMACIA','GELATERIA','PANIFICIO'][Math.floor(Math.random()*7)], 12,38);
      const tex=new THREE.CanvasTexture(signCan); tex.colorSpace=THREE.SRGBColorSpace;
      const signMat=new THREE.MeshStandardMaterial({ map:tex, emissive:0x332200, emissiveIntensity:0.12 });
      const sign=new THREE.Mesh(signGeo, signMat);
      sign.position.set(0, 2.05, d/2+0.11);
      group.add(sign);
    }

    this.group.add(group);

    const collider = new THREE.Box3(
      new THREE.Vector3(x-w/2, y, z-d/2),
      new THREE.Vector3(x+w/2, y+h+2, z+d/2)
    );
    this.colliders.push(collider);
    this.buildings.push({
      id: group.userData.buildingId,
      region: region.id,
      position: new THREE.Vector3(x,y,z),
      size:{w,d,h},
      floors,
      enterable: group.userData.enterable,
      mesh: group
    });

    if(group.userData.enterable){
      group.userData.interiorData = this.createInteriorData(w,d,h, region, floors);
    }
    return group;
  }

  getFacadeMaterial(region, x,z){
    const noise = Math.sin(x*0.13)*Math.cos(z*0.11);
    let matName = region.facade;
    if(region.id==='venezia' && noise>0.3) matName='plaster_cream';
    if(region.id==='roma' && Math.random()<0.18) matName='brick';
    if(region.id==='bologna') matName='brick';
    const colorPal = region.palette[Math.floor(Math.abs(Math.sin(x*0.05+z*0.03))*region.palette.length) % region.palette.length];
    const mat = createPBRMaterial(matName, { color: colorPal, roughness: 0.88 });
    return mat;
  }

  createRoof(w,d,h, region){
    const group = new THREE.Group();
    if(region.alpine){
      const roofH = 2.8;
      const shape = new THREE.Shape();
      shape.moveTo(-w/2-0.3, 0); shape.lineTo(0, roofH); shape.lineTo(w/2+0.3,0); shape.lineTo(-w/2-0.3,0);
      const extrude = new THREE.ExtrudeGeometry(shape, { depth: d+0.6, bevelEnabled:false });
      const roofMat = new THREE.MeshStandardMaterial({ color:0x4a4a4a, roughness:0.9 });
      const roof = new THREE.Mesh(extrude, roofMat);
      roof.position.set(0, h, -d/2-0.3);
      roof.castShadow=true;
      group.add(roof);
      const chim = new THREE.Mesh(new THREE.BoxGeometry(0.6,1.4,0.6), new THREE.MeshStandardMaterial({color:0x3a3a3a}));
      chim.position.set(w*0.3, h+1,0);
      group.add(chim);
    } else {
      const roofH = 1.2;
      const roofGeo = new THREE.ConeGeometry(Math.max(w,d)*0.72, roofH, 4, 1);
      roofGeo.rotateY(Math.PI/4);
      const roofMat = createPBRMaterial('terracotta', { roughness:0.9, color:0xb85c3b });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.y = h + roofH/2 -0.1;
      roof.castShadow=true;
      group.add(roof);
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(w*0.12,0.18,d*0.12), new THREE.MeshStandardMaterial({color:0x9a4a2a}));
      ridge.position.y = h+roofH-0.1;
      group.add(ridge);
    }
    return group;
  }

  addFacadeDetails(group,w,d,h,floors, region){
    const windowW = 1.25, windowH = 1.7;
    const floorH = h/floors;
    const frontZ = d/2+0.02;
    const isVenezia = region.id==='venezia';
    const isMilanoModern = region.modern && Math.random()<0.32;

    for(let f=0; f<floors; f++){
      const y = 0.9 + f*floorH + floorH*0.35;
      const cols = w>9? 3 : 2;
      for(let c=0;c<cols;c++){
        if(isMilanoModern && f>2){
          const glassGeo = new THREE.PlaneGeometry(1.9, 2.0);
          const glassMat = new THREE.MeshStandardMaterial({ color:0x8ab0c8, metalness:0.35, roughness:0.1, transparent:true, opacity:0.72 });
          const glass = new THREE.Mesh(glassGeo, glassMat);
          const x = (c - (cols-1)/2)*2.6;
          glass.position.set(x, y, frontZ+0.08);
          group.add(glass);
          continue;
        }
        const x = (c - (cols-1)/2)* (w/(cols+0.5));
        const frameGeo = new THREE.BoxGeometry(windowW+0.18, windowH+0.18, 0.06);
        const frameMat = new THREE.MeshStandardMaterial({ color: isVenezia? 0xf0ece0 : 0xe8e0d0, roughness:0.85 });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.set(x, y, frontZ);
        group.add(frame);
        const glassGeo = new THREE.PlaneGeometry(windowW, windowH);
        const glassMat = new THREE.MeshStandardMaterial({ color:0x0a1a2a, metalness:0.15, roughness:0.12, transparent:true, opacity:0.82 });
        if(Math.random()<0.42){
          glassMat.emissive = new THREE.Color(0xffc880);
          glassMat.emissiveIntensity = 0.0;
          glassMat.userData.isWindowLight = true;
        }
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(x, y, frontZ+0.04);
        group.add(glass);

        if(!isMilanoModern && Math.random()< (isVenezia?0.55:0.62)){
          const shutterGeo = new THREE.BoxGeometry(0.52, windowH, 0.04);
          const shutterMat = new THREE.MeshStandardMaterial({ color: region.id==='toscana'? 0x2d4a1a : region.id==='venezia'? 0x4a6a5a : region.id==='bologna'? 0x6a3a2a : 0x6a3a2a, roughness:0.9 });
          const s1=new THREE.Mesh(shutterGeo, shutterMat); s1.position.set(x-windowW/2-0.28, y, frontZ+0.05);
          const s2=s1.clone(); s2.position.set(x+windowW/2+0.28, y, frontZ+0.05);
          if(Math.random()<0.32){ s1.rotation.y= Math.PI/3.5; s2.rotation.y=-Math.PI/3.5; }
          group.add(s1); group.add(s2);
        }

        if(f>=1 && Math.random()<0.32 && !isMilanoModern){
          const balcGeo = new THREE.BoxGeometry(windowW+0.8, 0.08, 0.55);
          const balcMat=new THREE.MeshStandardMaterial({ color:0xd8d0c0, roughness:0.85 });
          const balc=new THREE.Mesh(balcGeo, balcMat);
          balc.position.set(x, y-0.95, frontZ+0.28);
          group.add(balc);
          const railGeo=new THREE.BoxGeometry(windowW+0.8,0.45,0.03);
          const railMat=new THREE.MeshStandardMaterial({ color:0x2a2a2a, metalness:0.3, roughness:0.5 });
          const rail=new THREE.Mesh(railGeo, railMat);
          rail.position.set(x, y-0.68, frontZ+0.52);
          group.add(rail);
          if(Math.random()<0.45){
            const flower=new THREE.Mesh(new THREE.BoxGeometry(windowW+0.5,0.22,0.16), new THREE.MeshStandardMaterial({color:0x8a3a2a}));
            flower.position.set(x, y-0.78, frontZ+0.45);
            group.add(flower);
            const bloom=new THREE.Mesh(new THREE.SphereGeometry(0.18,6,5), new THREE.MeshStandardMaterial({color:0xff4a6a}));
            bloom.position.set(x+0.2, y-0.66, frontZ+0.52);
            group.add(bloom);
          }
        }
      }
    }

    const sideX = w/2+0.02;
    for(let f=0; f<floors; f++){
      const y = 0.9 + f*floorH + floorH*0.35;
      const frameGeo = new THREE.BoxGeometry(0.06, 1.5, 1.1);
      const frameMat=new THREE.MeshStandardMaterial({color:0xe8e0d0});
      const frame=new THREE.Mesh(frameGeo, frameMat);
      frame.position.set(sideX, y, 0);
      group.add(frame);
    }
  }

  createDoor(w,d,h, region){
    const g=new THREE.Group();
    const doorW=1.1, doorH=2.15;
    const doorGeo=new THREE.BoxGeometry(doorW, doorH, 0.05);
    const doorCol = region.id==='venezia'? 0x2a3a4a : region.id==='toscana'? 0x5a3a1a : 0x3a2a1a;
    const doorMat=new THREE.MeshStandardMaterial({ color:doorCol, roughness:0.85 });
    const door=new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, doorH/2+0.25, d/2+0.06);
    g.add(door);
    const archGeo=new THREE.BoxGeometry(doorW+0.3, 0.18, 0.08);
    const archMat=new THREE.MeshStandardMaterial({color:0xd8d0c0});
    const arch=new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, doorH+0.35, d/2+0.07);
    g.add(arch);
    const handle=new THREE.Mesh(new THREE.SphereGeometry(0.05,6,6), new THREE.MeshStandardMaterial({color:0xc9a86a, metalness:0.6, roughness:0.3}));
    handle.position.set(0.35, 1.1, d/2+0.09);
    g.add(handle);
    const numCan=document.createElement('canvas'); numCan.width=64; numCan.height=32;
    const ctx=numCan.getContext('2d'); ctx.fillStyle='#d8d0c0'; ctx.fillRect(0,0,64,32); ctx.fillStyle='#1a1a1a'; ctx.font='700 18px Inter'; ctx.fillText(`${Math.floor(Math.random()*120+1)}`,18,22);
    const tex=new THREE.CanvasTexture(numCan);
    const numPlane=new THREE.Mesh(new THREE.PlaneGeometry(0.32,0.16), new THREE.MeshStandardMaterial({map:tex}));
    numPlane.position.set(0, doorH+0.35, d/2+0.12); g.add(numPlane);
    g.userData.isDoor=true;
    return g;
  }

  createInteriorData(w,d,h, region, floors){
    return { size:{w: w-0.8, d: d-0.8, h: h-0.9}, region: region.id, floors, style: region.id };
  }

  createHeroLandmarks(region){
    if(region.id==='roma'){
      const colosseum = new THREE.Group();
      this.anchorHero(colosseum, 210,-55, 62,62);
      const outerGeo = new THREE.CylinderGeometry(28,30,12, 48,1,true);
      const outerMat=new THREE.MeshStandardMaterial({ color:0xd8c9b6, roughness:0.85, side:THREE.DoubleSide });
      const outer=new THREE.Mesh(outerGeo, outerMat);
      outer.position.y=6; colosseum.add(outer);
      for(let i=0;i<24;i++){
        const ang=(i/24)*Math.PI*2;
        const arch=new THREE.Mesh(new THREE.PlaneGeometry(2.4,4), new THREE.MeshStandardMaterial({color:0x0a0a0a}));
        const r=29;
        arch.position.set(Math.cos(ang)*r, 4, Math.sin(ang)*r);
        arch.lookAt(0,4,0); colosseum.add(arch);
      }
      const floor=new THREE.Mesh(new THREE.CircleGeometry(20,32), new THREE.MeshStandardMaterial({color:0xc9b896, roughness:0.95}));
      floor.rotation.x=-Math.PI/2; floor.position.y=0.1; colosseum.add(floor);
      for(let t=0;t<3;t++){
        const tier=new THREE.Mesh(new THREE.CylinderGeometry(22-t*3, 24-t*3, 1.2,48,1,true), outerMat);
        tier.position.y=2+t*1.8; colosseum.add(tier);
      }
      this.group.add(colosseum);
      this.buildings.push({id:'hero_colosseum', region:'roma', position:colosseum.position.clone(), size:{w:60,d:60,h:12}, floors:2, enterable:false, hero:true, mesh:colosseum});

      const pantheon=new THREE.Group();
      this.anchorHero(pantheon, 160,-15, 30,30);
      const drum=new THREE.Mesh(new THREE.CylinderGeometry(14,14,10,32), new THREE.MeshStandardMaterial({color:0xe8ddd0, roughness:0.8}));
      drum.position.y=5; pantheon.add(drum);
      const dome=new THREE.Mesh(new THREE.SphereGeometry(14,32,16,0,Math.PI*2,0,Math.PI/2), new THREE.MeshStandardMaterial({color:0xd8d0c0, roughness:0.85}));
      dome.position.y=10; pantheon.add(dome);
      for(let i=0;i<8;i++){
        const ang=(i/8)*Math.PI*0.6 -0.3;
        const col=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.65,9,8), new THREE.MeshStandardMaterial({color:0xf4ece0}));
        col.position.set(Math.cos(ang)*12,4.5, Math.sin(ang)*12+6); pantheon.add(col);
      }
      const portico=new THREE.Mesh(new THREE.BoxGeometry(16,1,8), new THREE.MeshStandardMaterial({color:0xe8ddd0}));
      portico.position.set(0,9,10); pantheon.add(portico);
      this.group.add(pantheon);
    }
    if(region.id==='firenze'){
      const duomoF=new THREE.Group();
      this.anchorHero(duomoF, -62,-162, 38,42);
      const baseF=new THREE.Mesh(new THREE.BoxGeometry(22,12,34), new THREE.MeshStandardMaterial({color:0xf4f0e6}));
      baseF.position.y=6; duomoF.add(baseF);
      const cupola=new THREE.Mesh(new THREE.SphereGeometry(9,24,12,0,Math.PI*2,0,Math.PI/2), new THREE.MeshStandardMaterial({color:0xc0392b}));
      cupola.position.y=12; duomoF.add(cupola);
      const lantern=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,3,8), new THREE.MeshStandardMaterial({color:0xf4e8c1}));
      lantern.position.y=20; duomoF.add(lantern);
      // campanile Giotto
      const campF=new THREE.Mesh(new THREE.BoxGeometry(5,28,5), new THREE.MeshStandardMaterial({color:0xe8ddd0}));
      campF.position.set(14,14,12); duomoF.add(campF);
      this.group.add(duomoF);
      // Ponte Vecchio
      const ponte=new THREE.Group();
      this.anchorHero(ponte, -45,-155, 32,8);
      ponte.position.y+=0.8;
      const struct=new THREE.Mesh(new THREE.BoxGeometry(30,1.2,6), new THREE.MeshStandardMaterial({color:0xd8c9a0}));
      struct.position.y=3.2; ponte.add(struct);
      for(let i=0;i<4;i++){
        const shop=new THREE.Mesh(new THREE.BoxGeometry(5,3.5,3), new THREE.MeshStandardMaterial({color:0xe8dcc0}));
        shop.position.set((i-1.5)*7, 5.2, 1.5); ponte.add(shop);
      }
      this.group.add(ponte);
    }
    if(region.id==='venezia'){
      const camp=new THREE.Group();
      this.anchorHero(camp, 35,-105, 9,9);
      const shaft=new THREE.Mesh(new THREE.BoxGeometry(7,38,7), new THREE.MeshStandardMaterial({color:0xd8b48a, roughness:0.85}));
      shaft.position.y=19; camp.add(shaft);
      const belfry=new THREE.Mesh(new THREE.BoxGeometry(6,7,6), new THREE.MeshStandardMaterial({color:0xe8ddd0}));
      belfry.position.y=38; camp.add(belfry);
      for(let i=0;i<4;i++){
        const arch=new THREE.Mesh(new THREE.PlaneGeometry(2.2,3.2), new THREE.MeshStandardMaterial({color:0x0a0a0a, side:THREE.DoubleSide}));
        const ang=i*Math.PI/2;
        arch.position.set(Math.cos(ang)*3.01,38, Math.sin(ang)*3.01);
        arch.rotation.y=-ang; camp.add(arch);
      }
      const spire=new THREE.Mesh(new THREE.ConeGeometry(4.2,7,4), new THREE.MeshStandardMaterial({color:0x6a8a5a}));
      spire.position.y=45; spire.rotation.y=Math.PI/4; camp.add(spire);
      const angel=new THREE.Mesh(new THREE.ConeGeometry(0.5,1.2,6), new THREE.MeshStandardMaterial({color:0xc9a86a, metalness:0.6}));
      angel.position.y=49; camp.add(angel);
      this.group.add(camp);

      const palace=new THREE.Group();
      this.anchorHero(palace, 55,-85, 38,14);
      const base=new THREE.Mesh(new THREE.BoxGeometry(34,12,12), createPBRMaterial('plaster_cream',{color:'#f4e8d1'}));
      base.position.y=6; palace.add(base);
      for(let i=0;i<9;i++){
        const arch=new THREE.Mesh(new THREE.PlaneGeometry(2.8,4.5), new THREE.MeshStandardMaterial({color:0x0a0a0a}));
        arch.position.set((i-4)*3.6,3,6.01); palace.add(arch);
        const col=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.32,6,8), new THREE.MeshStandardMaterial({color:0xf4ece0}));
        col.position.set((i-4)*3.6+1.8,3,6); palace.add(col);
      }
      const upper=new THREE.Mesh(new THREE.BoxGeometry(34,6,12), new THREE.MeshStandardMaterial({color:0xe8b8c0}));
      upper.position.y=12; palace.add(upper);
      for(let x=-16;x<=16;x+=3){
        for(let y=10;y<=14;y+=2){
          const diam=new THREE.Mesh(new THREE.PlaneGeometry(1.2,1.2), new THREE.MeshStandardMaterial({color: (Math.abs(x+y)%4===0)?0xf4e8c1:0xd8a8b8}));
          diam.position.set(x,y,6.02); palace.add(diam);
        }
      }
      this.group.add(palace);

      for(let i=0;i<4;i++){
        const bx = -60 + i*50; const bz = -140 + i*30;
        const bridge=new THREE.Group();
        // ponte veneziana - ancora em minH
        { const fb=this.terrain.getFootprintHeight(bx,bz,14,5); bridge.position.set(bx, fb.minH+0.9, bz); }
        const archGeo=new THREE.CylinderGeometry(6,6, 0.9, 12,1,false,0,Math.PI);
        const archMat=new THREE.MeshStandardMaterial({color:0xd8d0c0, side:THREE.DoubleSide});
        const arch=new THREE.Mesh(archGeo, archMat);
        arch.rotation.z=Math.PI/2; arch.rotation.x=Math.PI; arch.position.y=1.2; bridge.add(arch);
        const deck=new THREE.Mesh(new THREE.BoxGeometry(12,0.35,3.2), new THREE.MeshStandardMaterial({color:0xc9b8a0}));
        deck.position.y=2.1; bridge.add(deck);
        const rail1=new THREE.Mesh(new THREE.BoxGeometry(12,0.55,0.08), new THREE.MeshStandardMaterial({color:0x8a8a8a}));
        rail1.position.set(0,2.6,1.45); bridge.add(rail1);
        const rail2=rail1.clone(); rail2.position.z=-1.45; bridge.add(rail2);
        this.group.add(bridge);
      }

      for(let i=0;i<5;i++){
        const gondola=new THREE.Group();
        const t= i/5;
        const cx = -140 + t*200;
        const cz = -210 + t*140;
        gondola.position.set(cx, 0.55, cz);
        const hull=new THREE.Mesh(new THREE.BoxGeometry(7,0.35,1.1), new THREE.MeshStandardMaterial({color:0x0a0a0a}));
        hull.position.y=0; gondola.add(hull);
        const bow=new THREE.Mesh(new THREE.ConeGeometry(0.55,1.4,4), new THREE.MeshStandardMaterial({color:0x0a0a0a}));
        bow.rotation.z=-Math.PI/2; bow.position.set(4,0.2,0); gondola.add(bow);
        const stern=bow.clone(); stern.rotation.z=Math.PI/2; stern.position.set(-4,0.2,0); gondola.add(stern);
        gondola.rotation.y= Math.sin(t*Math.PI)*0.6;
        this.worldScene.propGroup.add(gondola);
      }
    }
    if(region.id==='bologna'){
      // Due Torri
      const torri=new THREE.Group();
      this.anchorHero(torri, -28,-288, 12,6);
      const t1=new THREE.Mesh(new THREE.BoxGeometry(5,38,5), new THREE.MeshStandardMaterial({color:0xc95a2a}));
      t1.position.set(-3,19,0); torri.add(t1);
      const t2=new THREE.Mesh(new THREE.BoxGeometry(4,26,4), new THREE.MeshStandardMaterial({color:0xc95a2a}));
      t2.position.set(4,13,2); t2.rotation.z=0.08; torri.add(t2);
      this.group.add(torri);
      // Portici: arcada
      for(let i=0;i<10;i++){
        const col=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.36,4.8,8), new THREE.MeshStandardMaterial({color:0xf4e8c1}));
        col.position.set(-50+i*4, 2.4, -295); this.worldScene.streetGroup.add(col);
        const arch=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3.5), new THREE.MeshStandardMaterial({color:0x1a1a1a}));
        arch.position.set(-50+i*4+2, 2.4, -294.9); this.worldScene.streetGroup.add(arch);
      }
    }
    if(region.id==='milano'){
      const duomo=new THREE.Group();
      this.anchorHero(duomo, -240,-420, 32,56);
      const base=new THREE.Mesh(new THREE.BoxGeometry(28,14,52), new THREE.MeshStandardMaterial({color:0xf4f0e6}));
      base.position.y=7; duomo.add(base);
      for(let x=-12;x<=12;x+=3){
        const spire=new THREE.Mesh(new THREE.ConeGeometry(0.45,6,6), new THREE.MeshStandardMaterial({color:0xf4f0e6}));
        spire.position.set(x,17,26); duomo.add(spire);
      }
      const mainSpire=new THREE.Mesh(new THREE.ConeGeometry(1.2,12,6), new THREE.MeshStandardMaterial({color:0xc9a86a, metalness:0.2}));
      mainSpire.position.set(0,20,0); duomo.add(mainSpire);
      const rose=new THREE.Mesh(new THREE.CircleGeometry(2.8,16), new THREE.MeshStandardMaterial({color:0x4a5a6a, transparent:true, opacity:0.85}));
      rose.position.set(0,10,26.01); duomo.add(rose);
      for(let z=-20; z<=20; z+=8){
        const b1=new THREE.Mesh(new THREE.BoxGeometry(0.4,3,4), new THREE.MeshStandardMaterial({color:0xe8e0d0}));
        b1.position.set(14.4,9,z); duomo.add(b1);
        const b2=b1.clone(); b2.position.set(-14.4,9,z); duomo.add(b2);
      }
      this.group.add(duomo);
      for(let i=0;i<3;i++){
        const tower=new THREE.Group();
        const tx = -260 + i*18; const tz=-460+i*12;
        { const ft=this.terrain.getFootprintHeight(tx,tz,13,13); tower.position.set(tx, ft.minH, tz); }
        const h= 28+ i*9;
        const tGeo=new THREE.BoxGeometry(12, h, 12);
        const tMat=new THREE.MeshStandardMaterial({ color:0x8ab0c8, metalness:0.45, roughness:0.18, transparent:true, opacity:0.88 });
        const tMesh=new THREE.Mesh(tGeo, tMat);
        tMesh.position.y=h/2; tower.add(tMesh);
        for(let f=0; f< h/2; f++){
          const fin=new THREE.Mesh(new THREE.BoxGeometry(12.4,0.12,12.4), new THREE.MeshStandardMaterial({color:0xd0d8e0}));
          fin.position.y= 4+ f*2.2; tower.add(fin);
        }
        this.group.add(tower);
      }
      const tramPath=new THREE.CatmullRomCurve3([
        new THREE.Vector3(-300,0.2,-380), new THREE.Vector3(-220,0.2,-380),
        new THREE.Vector3(-200,0.2,-430), new THREE.Vector3(-280,0.2,-450),
      ], true);
      const tramPoints=tramPath.getPoints(80);
      const tramLine=new THREE.BufferGeometry().setFromPoints(tramPoints);
      const tramMat=new THREE.LineBasicMaterial({ color:0x4a4a4a });
      const tramLineMesh=new THREE.Line(tramLine, tramMat);
      tramLineMesh.position.y=0.02; this.worldScene.streetGroup.add(tramLineMesh);
    }
    if(region.id==='genova'){
      const porto=new THREE.Group();
      this.anchorHero(porto, -350,-240, 64,16);
      const molo=new THREE.Mesh(new THREE.BoxGeometry(60,2,12), new THREE.MeshStandardMaterial({color:0x8a8a88}));
      molo.position.y=0.5; porto.add(molo);
      const faro=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.8,18,8), new THREE.MeshStandardMaterial({color:0xf4f0e6}));
      faro.position.set(22,9,0); porto.add(faro);
      const luz=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,1.2,8), new THREE.MeshStandardMaterial({color:0xfff1c1, emissive:0xffcc66, emissiveIntensity:0.6}));
      luz.position.set(22,18.5,0); porto.add(luz);
      this.group.add(porto);
    }
    if(region.id==='napoli'){
      const vesuvio=new THREE.Group();
      this.anchorHero(vesuvio, 360,220, 72,72);
      const cone=new THREE.Mesh(new THREE.ConeGeometry(34,22,16), new THREE.MeshStandardMaterial({color:0x4a3a2a}));
      cone.position.y=11; vesuvio.add(cone);
      const crater=new THREE.Mesh(new THREE.CylinderGeometry(6,8,2,16), new THREE.MeshStandardMaterial({color:0x2a1a1a}));
      crater.position.y=22; vesuvio.add(crater);
      const fumo=new THREE.Mesh(new THREE.SphereGeometry(4,8,6), new THREE.MeshStandardMaterial({color:0x8a8a8a, transparent:true, opacity:0.35}));
      fumo.position.y=26; vesuvio.add(fumo);
      this.group.add(vesuvio);
      // lungomare palazzi coloridos
      for(let i=0;i<6;i++){
        const colPal=new THREE.Mesh(new THREE.BoxGeometry(7,12+i%2*4,7), new THREE.MeshStandardMaterial({color: ['#e8c9a0','#f4e8c1','#d8a0a0','#f4d0a0'][i%4]}));
        colPal.position.set(300+i*9, 6+i%2*2, 165); this.group.add(colPal);
      }
    }
    if(region.id==='toscana'){
      const villa=new THREE.Group();
      const vx=-260, vz=40;
      this.anchorHero(villa, vx,vz, 22,16);
      const main=new THREE.Mesh(new THREE.BoxGeometry(18,7,12), createPBRMaterial('plaster_ochre',{color:'#e8dcc0'}));
      main.position.y=3.5; villa.add(main);
      const roof=new THREE.Mesh(new THREE.ConeGeometry(11,2.2,4), createPBRMaterial('terracotta'));
      roof.position.y=7.8; roof.rotation.y=Math.PI/4; villa.add(roof);
      for(let i=0;i<4;i++){
        const col=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.32,5,8), new THREE.MeshStandardMaterial({color:0xf4ece0}));
        col.position.set((i-1.5)*3.2,2.5,6.6); villa.add(col);
        const arch=new THREE.Mesh(new THREE.PlaneGeometry(2.2,3), new THREE.MeshStandardMaterial({color:0x0a1a1a}));
        arch.position.set((i-1.5)*3.2,2.8,6.62); villa.add(arch);
      }
      const pergola=new THREE.Mesh(new THREE.BoxGeometry(12,0.18,10), new THREE.MeshStandardMaterial({color:0x6a8a5a}));
      pergola.position.set(10,3.2,2); villa.add(pergola);
      for(let i=0;i<4;i++){
        const post=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.12,3.2,6), new THREE.MeshStandardMaterial({color:0x8a6a42}));
        post.position.set(6+i*2.4,1.6, -2+i*1.2); villa.add(post);
      }
      this.group.add(villa);
      const farm=new THREE.Group();
      this.anchorHero(farm, -310,90, 14,11);
      const fbase=new THREE.Mesh(new THREE.BoxGeometry(12,5.5,9), new THREE.MeshStandardMaterial({color:0xb8a08a}));
      fbase.position.y=2.75; farm.add(fbase);
      const froof=new THREE.Mesh(new THREE.ConeGeometry(7.5,2,4), createPBRMaterial('terracotta'));
      froof.position.y=6.2; froof.rotation.y=Math.PI/4; farm.add(froof);
      this.group.add(farm);
    }
    if(region.id==='dolomiti'){
      const church=new THREE.Group();
      const cx= 30, cz=-720;
      this.anchorHero(church, cx,cz, 14,22);
      const nave=new THREE.Mesh(new THREE.BoxGeometry(10,7,16), new THREE.MeshStandardMaterial({color:0xe8e0d0}));
      nave.position.y=3.5; church.add(nave);
      const prismShape=new THREE.Shape(); prismShape.moveTo(-5,0); prismShape.lineTo(0,4); prismShape.lineTo(5,0); prismShape.lineTo(-5,0);
      const prismGeo=new THREE.ExtrudeGeometry(prismShape,{depth:16, bevelEnabled:false});
      const prism=new THREE.Mesh(prismGeo, new THREE.MeshStandardMaterial({color:0x6a6a6a}));
      prism.position.set(0,7,-8); church.add(prism);
      const tower=new THREE.Mesh(new THREE.BoxGeometry(4,16,4), new THREE.MeshStandardMaterial({color:0xe8e0d0}));
      tower.position.set(0,8,9); church.add(tower);
      const spire=new THREE.Mesh(new THREE.ConeGeometry(2.8,6,4), new THREE.MeshStandardMaterial({color:0x2a5a3a}));
      spire.position.set(0,19,9); spire.rotation.y=Math.PI/4; church.add(spire);
      this.group.add(church);
      for(let i=0;i<6;i++){
        const hx = (Math.random()-0.5)*300; const hz = -700 + (Math.random()-0.5)*180;
        const hut=new THREE.Group();
        { const fh=this.terrain.getFootprintHeight(hx,hz,6,6); hut.position.set(hx, fh.minH, hz); }
        const b=new THREE.Mesh(new THREE.BoxGeometry(6,3.5,6), new THREE.MeshStandardMaterial({color:0x8a6a42}));
        b.position.y=1.75; hut.add(b);
        const r=new THREE.Mesh(new THREE.ConeGeometry(4.5,2.2,4), new THREE.MeshStandardMaterial({color:0x5a3a2a}));
        r.position.y=4.1; r.rotation.y=Math.PI/4; hut.add(r);
        this.group.add(hut);
      }
    }
  }

  addStreetFurniture(){
    const lampMat=new THREE.MeshStandardMaterial({color:0x1a1a1a, metalness:0.5, roughness:0.6});
    const lampHeadMat=new THREE.MeshStandardMaterial({color:0xfff1c1, emissive:0xffcc66, emissiveIntensity:0});
    let placed=0;
    for(let i=0;i<140 && placed<90;i++){
      const x = (Math.random()-0.5)*1200;
      const z = (Math.random()-0.5)*1000;
      const nearBuilding = this.buildings.some(b=> Math.hypot(b.position.x-x, b.position.z-z) < 19);
      if(!nearBuilding) continue;
      placed++;
      const footLP=this.terrain.getFootprintHeight(x,z,0.4,0.4);
      const y=footLP.minH;
      const post=new THREE.Group();
      post.position.set(x,y,z);
      // base quadrada que sela vão
      const sock=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.14,0.32), new THREE.MeshStandardMaterial({color:0x4a4a4a}));
      sock.position.y=0.07; post.add(sock);
      const pole=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.08,4.2,8), lampMat);
      pole.position.y=2.1; post.add(pole);
      const head=new THREE.Mesh(new THREE.SphereGeometry(0.22,8,6), lampHeadMat);
      head.position.y=4.3; head.userData.isLamp=true; post.add(head);
      const arm=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.04,0.6), lampMat);
      arm.position.set(0,4.0,0.3); post.add(arm);
      this.worldScene.streetGroup.add(post);
    }

    for(let i=0;i<40;i++){
      const x=(Math.random()-0.5)*800; const z=(Math.random()-0.5)*600;
      const nearRoma = Math.hypot(x-180,z+20) < 220 || Math.hypot(x-60,z+160)<180 || Math.hypot(x-20,z+90)<180;
      if(!nearRoma) continue;
      const footB=this.terrain.getFootprintHeight(x,z,1.8,0.55);
      const y=footB.minH;
      const bench=new THREE.Group(); bench.position.set(x,y+0.25,z);
      bench.rotation.y=Math.random()*Math.PI;
      const seat=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.08,0.55), new THREE.MeshStandardMaterial({color:0x6a4a2a}));
      seat.position.y=0.45; bench.add(seat);
      const back=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.45,0.06), new THREE.MeshStandardMaterial({color:0x6a4a2a}));
      back.position.set(0,0.75,-0.22); bench.add(back);
      const leg1=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.45,0.5), new THREE.MeshStandardMaterial({color:0x1a1a1a}));
      leg1.position.set(-0.7,0.22,0); bench.add(leg1);
      const leg2=leg1.clone(); leg2.position.x=0.7; bench.add(leg2);
      this.worldScene.streetGroup.add(bench);
    }

    // cipressos extras ao redor de vilas
    for(let i=0;i<16;i++){
      const x=-280 + (Math.random()-0.5)*60, z=20+Math.random()*80;
      const foot=this.terrain.getFootprintHeight(x,z,1.8,1.8);
      const cy=new THREE.Mesh(new THREE.ConeGeometry(1.1,7,8), new THREE.MeshStandardMaterial({color:0x1a3a12}));
      cy.position.set(x,foot.minH+3.5,z); this.worldScene.vegetationGroup.add(cy);
      const br=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.42,0.28,5), new THREE.MeshStandardMaterial({color:0x3b2f1e}));
      br.position.set(x,foot.minH+0.05,z); this.worldScene.vegetationGroup.add(br);
    }
  }

  createRealSquares(){
    // Praças genéricas que dão vida urbana sem pesar — planadas em minH
    const squares=[
      {x:155,z:-28,w:22,d:18},{x:10,z:-100,w:18,d:14},{x:-25,z:-290,w:14,d:14},{x:-340,z:-250,w:16,d:12},
    ];
    squares.forEach(s=>{
      const fp=this.terrain.getFootprintHeight(s.x,s.z,s.w,s.d);
      const p=new THREE.Mesh(new THREE.PlaneGeometry(s.w,s.d), new THREE.MeshStandardMaterial({color:0xc9b8a0, roughness:0.96}));
      p.rotation.x=-Math.PI/2; p.position.set(s.x, fp.minH+0.05, s.z); this.worldScene.streetGroup.add(p);
      // fonte central
      const f=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.8,0.42,12), new THREE.MeshStandardMaterial({color:0xa8c0d0, roughness:0.3}));
      f.position.set(s.x, fp.minH+0.31, s.z); this.worldScene.streetGroup.add(f);
      const wat=new THREE.Mesh(new THREE.CircleGeometry(1.35,14), new THREE.MeshStandardMaterial({color:0x5aa0c8, transparent:true, opacity:0.55}));
      wat.rotation.x=-Math.PI/2; wat.position.set(s.x, fp.minH+0.53, s.z); this.worldScene.streetGroup.add(wat);
    });
  }

  // Helper: ancora herói com podium completo calçado + saia perimetral
  anchorHero(group, x,z, w,d){
    const foot=this.terrain.getFootprintHeight(x,z,w,d);
    group.position.set(x, foot.minH, z);
    const pw=w+8, pd=d+8;
    const podium=new THREE.Mesh(new THREE.PlaneGeometry(pw,pd), new THREE.MeshStandardMaterial({color:0xc9c7bc, roughness:0.93}));
    podium.rotation.x=-Math.PI/2; podium.position.y=0.10; podium.receiveShadow=true; group.add(podium);
    const curbH=0.16; const curbMat=new THREE.MeshStandardMaterial({color:0x9a9a92});
    const c1=new THREE.Mesh(new THREE.BoxGeometry(pw,curbH,0.14),curbMat); c1.position.set(0,curbH/2+0.10,pd/2); group.add(c1);
    const c2=c1.clone(); c2.position.set(0,curbH/2+0.10,-pd/2); group.add(c2);
    const c3=new THREE.Mesh(new THREE.BoxGeometry(0.14,curbH,pd),curbMat); c3.position.set(pw/2,curbH/2+0.10,0); group.add(c3);
    const c4=c3.clone(); c4.position.set(-pw/2,curbH/2+0.10,0); group.add(c4);
    const skirtD=Math.max(1.4, foot.slope+1.1);
    const skMat=new THREE.MeshStandardMaterial({color:0x7a7a78}); 
    const skirt=new THREE.Mesh(new THREE.BoxGeometry(pw,skirtD, pd), skMat); skirt.position.y=-skirtD/2+0.10; group.add(skirt);
    const ao=new THREE.Mesh(new THREE.PlaneGeometry(pw+4,pd+4), new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:0.28, depthWrite:false}));
    ao.rotation.x=-Math.PI/2; ao.position.y=0.05; group.add(ao);
    return foot;
  }

  getClosestBuilding(pos, maxDist=18){
    let best=null, bestDist=Infinity;
    for(const b of this.buildings){
      const d=Math.hypot(b.position.x-pos.x, b.position.z-pos.z);
      if(d<maxDist && d<bestDist){ best=b; bestDist=d; }
    }
    return best? {building:best, dist:bestDist} : null;
  }

  checkCollision(pos, radius=0.6){
    for(const box of this.colliders){
      const cx = (box.min.x+box.max.x)*0.5;
      const cz = (box.min.z+box.max.z)*0.5;
      if(Math.abs(pos.x-cx) > 18 || Math.abs(pos.z-cz) > 18) continue;
      const closest = new THREE.Vector3(
        THREE.MathUtils.clamp(pos.x, box.min.x, box.max.x),
        pos.y,
        THREE.MathUtils.clamp(pos.z, box.min.z, box.max.z)
      );
      const dx=pos.x-closest.x, dz=pos.z-closest.z;
      if(dx*dx+dz*dz < radius*radius){
        return { hit:true, box };
      }
    }
    return { hit:false };
  }

  updateNightLights(dayFactor){
    const night = 1 - dayFactor;
    const lampIntensity = THREE.MathUtils.clamp((night-0.25)/0.5,0,1);
    this.worldScene.buildingGroup.traverse(obj=>{
      if(obj.isMesh && obj.material && obj.material.emissive && obj.material.userData && obj.material.userData.isWindowLight){
        obj.material.emissiveIntensity = lampIntensity * 1.7 * (0.75+Math.random()*0.25);
      }
      if(obj.userData && obj.userData.isLamp && obj.material.emissive){
        obj.material.emissiveIntensity = lampIntensity * 2.2;
      }
    });
    this.worldScene.streetGroup.traverse(obj=>{
      if(obj.userData && obj.userData.isLamp && obj.material.emissive){
        obj.material.emissiveIntensity = lampIntensity * 1.6;
      }
    });
  }
}
