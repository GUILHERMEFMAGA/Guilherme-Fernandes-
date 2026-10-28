import * as THREE from 'three';
import { createPBRMaterial } from '../materials/pbr.js';

export class InteriorSystem {
  constructor(worldScene, buildingSystem){
    this.worldScene=worldScene; this.buildingSystem=buildingSystem;
    this.group=worldScene.interiorGroup;
    this.activeInterior=null;
    this.doorProxies=[]; // for interaction prompts
  }

  // Interiors are not separate scenes loaded in streaming; they are built as hidden rooms inside building bounds
  // that are revealed via fade/teleport. To keep performance, we keep them detached and attach on demand.

  prepareInteriors(){
    // Create door proxies for ray detection already via building meshes' door groups
    // We'll collect building doors
    this.buildingSystem.buildings.forEach(b=>{
      if(!b.enterable) return;
      // door proxy position is front face center
      const doorPos=new THREE.Vector3(b.position.x, b.position.y+1.1, b.position.z + b.size.d/2 +0.7);
      this.doorProxies.push({ pos: doorPos, building:b });
    });
  }

  findNearbyDoor(playerPos, radius=3.2){
    let best=null, bestDist=Infinity;
    for(const d of this.doorProxies){
      const dist=Math.hypot(d.pos.x-playerPos.x, d.pos.z-playerPos.z);
      if(dist<radius && dist<bestDist){ best=d; bestDist=dist; }
    }
    return best;
  }

  enterBuilding(building, player){
    if(this.activeInterior) return;
    // build interior room on the fly
    const interior=this.buildInteriorMesh(building);
    interior.position.copy(building.position);
    interior.position.y = building.position.y+0.02;
    // Hide exterior? we teleport player inside, keep exterior hidden via fog maybe
    // Instead of trying to clip, we move player to interior and hide exterior buildings opacity reduce
    this.group.add(interior);
    this.activeInterior={ mesh: interior, building, entryPos: player.position.clone() };
    // teleport player inside
    player.position.set(building.position.x, building.position.y+1.0, building.position.z);
    player.velocity.y=0;
    // dim exterior by setting visibility flag
    this.worldScene.buildingGroup.visible=false;
    this.worldScene.streetGroup.visible=false;
    this.worldScene.vegetationGroup.visible=false;
    // keep terrain
    return interior;
  }

  exitBuilding(player){
    if(!this.activeInterior) return;
    this.group.remove(this.activeInterior.mesh);
    this.activeInterior.mesh.traverse(o=>{ if(o.geometry) o.geometry.dispose(); if(o.material && o.material.dispose) o.material.dispose(); });
    this.activeInterior=null;
    this.worldScene.buildingGroup.visible=true;
    this.worldScene.streetGroup.visible=true;
    this.worldScene.vegetationGroup.visible=true;
    // move player slightly outside door
    const b=this.buildingSystem.buildings.find(x=>x.id===this.lastBuildingId) || this.buildingSystem.buildings[0];
    // we stored entryPos
    // Use stored entryPos if available
  }

  // quick exit to previous entryPos
  exitToEntry(player){
    if(!this.activeInterior) return;
    player.position.copy(this.activeInterior.entryPos);
    player.position.y+=0.3;
    this.group.remove(this.activeInterior.mesh);
    this.activeInterior=null;
    this.worldScene.buildingGroup.visible=true;
    this.worldScene.streetGroup.visible=true;
    this.worldScene.vegetationGroup.visible=true;
  }

  buildInteriorMesh(building){
    const g=new THREE.Group();
    const w=building.size.w, d=building.size.d, h=building.size.h-1.2;
    const innerW=w-0.8, innerD=d-0.8, innerH=Math.min(2.8, h);

    // Floor parquet
    const floorCan=document.createElement('canvas'); floorCan.width=512; floorCan.height=512;
    const fctx=floorCan.getContext('2d'); fctx.fillStyle='#8a6a3a'; fctx.fillRect(0,0,512,512);
    for(let y=0;y<512;y+=28){ fctx.fillStyle='rgba(0,0,0,0.08)'; fctx.fillRect(0,y,512,2); for(let x=0;x<512;x+=90){ fctx.strokeStyle='rgba(0,0,0,0.07)'; fctx.strokeRect(x,y,90,28); } }
    const floorTex=new THREE.CanvasTexture(floorCan); floorTex.wrapS=floorTex.wrapT=THREE.RepeatWrapping; floorTex.repeat.set(2,2);
    const floorMat=new THREE.MeshStandardMaterial({ map:floorTex, roughness:0.75 });
    const floor=new THREE.Mesh(new THREE.BoxGeometry(innerW,0.12,innerD), floorMat);
    floor.position.y=0.06; floor.receiveShadow=true; g.add(floor);

    // Walls
    const wallMat=new THREE.MeshStandardMaterial({ color:0xf4ece0, roughness:0.92 });
    const wallThickness=0.12;
    const wallY=innerH/2;
    // back
    const back=new THREE.Mesh(new THREE.BoxGeometry(innerW, innerH, wallThickness), wallMat);
    back.position.set(0, wallY, -innerD/2); g.add(back);
    // sides
    const left=new THREE.Mesh(new THREE.BoxGeometry(wallThickness, innerH, innerD), wallMat);
    left.position.set(-innerW/2, wallY,0); g.add(left);
    const right=left.clone(); right.position.x=innerW/2; g.add(right);
    // front wall with door opening (simulated as wall with gap)
    const frontLeft=new THREE.Mesh(new THREE.BoxGeometry((innerW-1.4)/2, innerH, wallThickness), wallMat);
    frontLeft.position.set(-innerW/4-0.35, wallY, innerD/2); g.add(frontLeft);
    const frontRight=frontLeft.clone(); frontRight.position.x= innerW/4+0.35; g.add(frontRight);
    const frontTop=new THREE.Mesh(new THREE.BoxGeometry(1.4, innerH-2.2, wallThickness), wallMat);
    frontTop.position.set(0, innerH- (innerH-2.2)/2, innerD/2); g.add(frontTop);

    // Ceiling
    const ceil=new THREE.Mesh(new THREE.BoxGeometry(innerW,0.08,innerD), new THREE.MeshStandardMaterial({color:0xffffff, roughness:0.95}));
    ceil.position.y=innerH+0.04; g.add(ceil);

    // Furnishings depending on region
    this.furnish(g, building, innerW, innerD, innerH);

    // Lighting: point lights
    const pl=new THREE.PointLight(0xfff1c1, 18, 9, 1.6);
    pl.position.set(0, innerH-0.2,0); g.add(pl);
    const pl2=new THREE.PointLight(0xfff1c1, 8, 6, 2);
    pl2.position.set(-innerW*0.3, innerH-0.4, -innerD*0.3); g.add(pl2);

    // Windows with light planes
    const winMat=new THREE.MeshStandardMaterial({color:0x8ab0d0, emissive:0x334a6a, emissiveIntensity:0.18, transparent:true, opacity:0.55});
    const win1=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6), winMat); win1.position.set(-innerW/2+0.07,1.6,0); win1.rotation.y=Math.PI/2; g.add(win1);
    const win2=win1.clone(); win2.position.set(innerW/2-0.07,1.6,0); win2.rotation.y=-Math.PI/2; g.add(win2);

    return g;
  }

  furnish(g, building, w,d,h){
    const region=building.region;
    // common pieces
    const addTable=(x,z, rot=0)=>{
      const table=new THREE.Group(); table.position.set(x,0.38,z); table.rotation.y=rot;
      const top=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.06,1.0), new THREE.MeshStandardMaterial({color:0x6a4a2a, roughness:0.8}));
      top.position.y=0.38; table.add(top);
      for(let i=0;i<4;i++){
        const leg=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,0.76,6), new THREE.MeshStandardMaterial({color:0x4a3520}));
        leg.position.set((i%2?0.7:-0.7),0, (i<2?0.4:-0.4)); table.add(leg);
      }
      g.add(table);
      // chairs
      for(let c=0;c<2;c++){
        const chair=new THREE.Group(); chair.position.set(x + (c?0.95:-0.95),0.25,z+0.2);
        const seat=new THREE.Mesh(new THREE.BoxGeometry(0.48,0.06,0.48), new THREE.MeshStandardMaterial({color:0x8a6a42})); seat.position.y=0.25; chair.add(seat);
        const back=new THREE.Mesh(new THREE.BoxGeometry(0.48,0.42,0.04), new THREE.MeshStandardMaterial({color:0x8a6a42})); back.position.set(0,0.5,-0.22); chair.add(back);
        g.add(chair);
      }
    };

    const addSofa=(x,z)=>{
      const sofa=new THREE.Group(); sofa.position.set(x,0.22,z);
      const base=new THREE.Mesh(new THREE.BoxGeometry(1.9,0.45,0.9), new THREE.MeshStandardMaterial({color:0x8a4a3a, roughness:0.95}));
      base.position.y=0.22; sofa.add(base);
      const back=new THREE.Mesh(new THREE.BoxGeometry(1.9,0.55,0.15), new THREE.MeshStandardMaterial({color:0x7a3a2a})); back.position.set(0,0.55,-0.38); sofa.add(back);
      g.add(sofa);
    };

    const addKitchen=(x,z)=>{
      const counter=new THREE.Mesh(new THREE.BoxGeometry(2.4,0.88,0.62), new THREE.MeshStandardMaterial({color:0xf4ece0, roughness:0.6}));
      counter.position.set(x,0.44,z); g.add(counter);
      const top=new THREE.Mesh(new THREE.BoxGeometry(2.4,0.06,0.62), new THREE.MeshStandardMaterial({color:0x8a8a88, roughness:0.5}));
      top.position.set(x,0.88,z); g.add(top);
      // upper cabinets
      for(let i=0;i<3;i++){
        const cab=new THREE.Mesh(new THREE.BoxGeometry(0.72,0.55,0.32), new THREE.MeshStandardMaterial({color:0xe8e0d0}));
        cab.position.set(x-0.72+i*0.72,1.45,z); g.add(cab);
      }
      // fridge
      const fridge=new THREE.Mesh(new THREE.BoxGeometry(0.6,1.65,0.6), new THREE.MeshStandardMaterial({color:0xffffff, metalness:0.15, roughness:0.5}));
      fridge.position.set(x+1.6,0.82,z); g.add(fridge);
    };

    const addBed=(x,z)=>{
      const bed=new THREE.Group(); bed.position.set(x,0.28,z);
      const frame=new THREE.Mesh(new THREE.BoxGeometry(2.0,0.28,1.45), new THREE.MeshStandardMaterial({color:0x6a4a2a})); frame.position.y=0.14; bed.add(frame);
      const mattress=new THREE.Mesh(new THREE.BoxGeometry(1.95,0.18,1.4), new THREE.MeshStandardMaterial({color:0xf4ece0})); mattress.position.y=0.32; bed.add(mattress);
      const pillow=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.12,0.55), new THREE.MeshStandardMaterial({color:0xffffff})); pillow.position.set(-0.55,0.42,0); bed.add(pillow);
      g.add(bed);
    };

    const addBookshelf=(x,z)=>{
      const shelf=new THREE.Group(); shelf.position.set(x,0.7,z);
      for(let i=0;i<4;i++){
        const board=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.04,0.32), new THREE.MeshStandardMaterial({color:0x6a4a2a}));
        board.position.y=i*0.42; shelf.add(board);
      }
      const side1=new THREE.Mesh(new THREE.BoxGeometry(0.04,1.4,0.32), new THREE.MeshStandardMaterial({color:0x6a4a2a})); side1.position.set(-0.53,0.7,0); shelf.add(side1);
      const side2=side1.clone(); side2.position.x=0.53; shelf.add(side2);
      // books
      for(let i=0;i<5;i++){
        const book=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.36,0.22), new THREE.MeshStandardMaterial({color: 0xc9a86a + Math.random()*0x222222}));
        book.position.set(-0.35+i*0.16,0.21,0); shelf.add(book);
      }
      g.add(shelf);
    };

    if(region==='venezia' || region==='roma'){
      // elegant apartment
      addSofa(-w*0.25, -d*0.22);
      addTable( w*0.18, 0.6, 0.2);
      addBookshelf(w*0.38, -d*0.34);
      // painting
      const painting=new THREE.Mesh(new THREE.PlaneGeometry(1.1,0.75), new THREE.MeshStandardMaterial({color:0xd8b48a}));
      painting.position.set(0,1.6,-d/2+0.07); g.add(painting);
      const frame=new THREE.Mesh(new THREE.BoxGeometry(1.14,0.79,0.02), new THREE.MeshStandardMaterial({color:0xc9a86a})); frame.position.copy(painting.position); frame.position.z-=0.01; g.add(frame);
    } else if(region==='toscana'){
      addTable(0, -0.2, 0.4);
      addKitchen(w*0.32, d*0.28);
      addBookshelf(-w*0.38, -d*0.2);
      // fireplace
      const fp=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.0,0.32), new THREE.MeshStandardMaterial({color:0x8a6a42, roughness:0.9}));
      fp.position.set(-w*0.38,0.5,d*0.28); g.add(fp);
    } else if(region==='dolomiti'){
      // alpine hut cozy
      addTable(0,0,0);
      const bunk=new THREE.Mesh(new THREE.BoxGeometry(2.0,0.45,0.9), new THREE.MeshStandardMaterial({color:0x5a4a30})); bunk.position.set(w*0.3,0.22, -d*0.25); g.add(bunk);
      addKitchen(-w*0.28, d*0.22);
    } else {
      addSofa(-w*0.2, -d*0.2);
      addTable(0.6,0.4,0.1);
      addBed(w*0.28, -d*0.28);
    }

    // rugs
    const rugCan=document.createElement('canvas'); rugCan.width=256; rugCan.height=256; const rctx=rugCan.getContext('2d');
    rctx.fillStyle='#c9a86a'; rctx.fillRect(0,0,256,256); rctx.strokeStyle='#8a6a42'; rctx.lineWidth=8; rctx.strokeRect(8,8,240,240);
    for(let i=0;i<6;i++){ rctx.fillStyle=`rgba(120,80,40,0.12)`; rctx.beginPath(); rctx.arc(128+Math.cos(i)*40,128+Math.sin(i)*40, 18,0,Math.PI*2); rctx.fill(); }
    const rugTex=new THREE.CanvasTexture(rugCan); const rug=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.6), new THREE.MeshStandardMaterial({map:rugTex, roughness:0.95}));
    rug.rotation.x=-Math.PI/2; rug.position.set(0,0.021,0.3); g.add(rug);

    // lamp
    const lamp=new THREE.Group(); lamp.position.set(-w*0.38,0.8,-d*0.35);
    const stand=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1.2,8), new THREE.MeshStandardMaterial({color:0x1a1a1a, metalness:0.4})); stand.position.y=0.6; lamp.add(stand);
    const shade=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.32,16,1,true), new THREE.MeshStandardMaterial({color:0xf4e8c1, side:THREE.DoubleSide, emissive:0xffe9c0, emissiveIntensity:0.18})); shade.position.y=1.25; lamp.add(shade);
    g.add(lamp);
  }
}
