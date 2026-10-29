/**
 * ============================================================================
 * ROADS — Organized Street Network
 * Sections: Core Mesh | Sidewalks & Curbs | Highways | City Grids | Details
 * ============================================================================
 */
import * as THREE from 'three';

export class RoadSystem {
  // ---------------------------------------------------------------------------
  // CORE
  // ---------------------------------------------------------------------------
  constructor(worldScene, terrain){
    this.worldScene=worldScene; this.terrain=terrain;
    this.group=worldScene.streetGroup;
  }
  create(){
    this.createHighway();
    this.createCityStreets();
    this.createCountryRoads();
  }

  // GEMINI 4 CARBON: per-vertex heights + sidewalks + curbs + markings
  createRoadMesh(curve, width, material, opts={}){
    const pts=curve.getPoints(opts.detail ? opts.detail : 120);
    const geo=new THREE.BufferGeometry();
    const verts=[], uvs=[], indices=[];
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      const yCenter=this.terrain.getHeightAt(p.x, p.z)+0.12;
      p.y=yCenter;
      const tangent=i<pts.length-1? new THREE.Vector3().subVectors(pts[i+1], p).normalize() : new THREE.Vector3().subVectors(p, pts[i-1]).normalize();
      const left=new THREE.Vector3(-tangent.z,0,tangent.x).normalize().multiplyScalar(width/2);
      const lx=p.x+left.x, lz=p.z+left.z, rx=p.x-left.x, rz=p.z-left.z;
      const yLeft=this.terrain.getHeightAt(lx, lz)+0.12;
      const yRight=this.terrain.getHeightAt(rx, rz)+0.12;
      verts.push(lx, yLeft, lz);
      verts.push(rx, yRight, rz);
      uvs.push(0, i/pts.length*10);
      uvs.push(1, i/pts.length*10);
      if(i<pts.length-1){
        const a=i*2,b=a+1,c=a+2,d=a+3;
        indices.push(a,b,c, b,d,c);
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts,3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs,2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    const mesh=new THREE.Mesh(geo, material);
    mesh.receiveShadow=true;
    return mesh;
  }

  createSidewalkPair(curve, roadW, sideW){
    // two sidewalks parallel to road, elevated +0.14, per-vertex
    const sidewalkMats = [
      new THREE.MeshStandardMaterial({ color:0xb9b9b1, roughness:0.92 }),
      new THREE.MeshStandardMaterial({ color:0xb9b9b1, roughness:0.92 })
    ];
    for(let side=0; side<2; side++){
      const sign = side===0 ? 1 : -1;
      const width=sideW;
      const pts=curve.getPoints(100);
      const geo=new THREE.BufferGeometry();
      const verts=[], uvs=[], idx=[];
      for(let i=0;i<pts.length;i++){
        const p=pts[i];
        const tangent=i<pts.length-1? new THREE.Vector3().subVectors(pts[i+1], p).normalize() : new THREE.Vector3().subVectors(p, pts[i-1]).normalize();
        const left=new THREE.Vector3(-tangent.z,0,tangent.x);
        const offsetBase= roadW/2 + 0.08; // small gutter
        const off1 = offsetBase * sign;
        const off2 = (offsetBase + width) * sign;
        const p1x=p.x + left.x*off1, p1z=p.z+left.z*off1;
        const p2x=p.x + left.x*off2, p2z=p.z+left.z*off2;
        const y1=this.terrain.getHeightAt(p1x,p1z)+0.19;
        const y2=this.terrain.getHeightAt(p2x,p2z)+0.19;
        verts.push(p1x,y1,p1z, p2x,y2,p2z);
        uvs.push(0,i/pts.length*8, 1,i/pts.length*8);
        if(i<pts.length-1){ const a=i*2,b=a+1,c=a+2,d=a+3; idx.push(a,b,c,b,d,c); }
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(verts,3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs,2));
      geo.setIndex(idx); geo.computeVertexNormals();
      const ml=new THREE.Mesh(geo, sidewalkMats[side]); ml.receiveShadow=true; this.group.add(ml);
      // curb vertical edge (thin box per segment approximated as continuous mesh)
      const curbPts=curve.getPoints(80);
      const cverts=[], cidx=[];
      for(let i=0;i<curbPts.length;i++){
        const p=curbPts[i];
        const tangent=i<curbPts.length-1? new THREE.Vector3().subVectors(curbPts[i+1], p).normalize() : new THREE.Vector3().subVectors(p, curbPts[i-1]).normalize();
        const left=new THREE.Vector3(-tangent.z,0,tangent.x);
        const off= (roadW/2 + 0.04)*sign;
        const cx=p.x + left.x*off, cz=p.z+left.z*off;
        const yRoad=this.terrain.getHeightAt(cx,cz)+0.08;
        const ySide=yRoad+0.11;
        cverts.push(cx,yRoad,cz, cx,ySide,cz);
        if(i<curbPts.length-1){ const a=i*2,b=a+1,c=a+2,d=a+3; cidx.push(a,c,b, b,c,d); }
      }
      const cgeo=new THREE.BufferGeometry();
      cgeo.setAttribute('position', new THREE.Float32BufferAttribute(cverts,3));
      cgeo.setIndex(cidx); cgeo.computeVertexNormals();
      const curbMat=new THREE.MeshStandardMaterial({color:0x9a9a92, roughness:0.9});
      const curb=new THREE.Mesh(cgeo, curbMat); this.group.add(curb);
    }
  }

  createHighway(){
    const curve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-260,-0.5,-860), new THREE.Vector3(-180,0,-500), new THREE.Vector3(-120,0,-200), new THREE.Vector3(0,0,0), new THREE.Vector3(120,0,260), new THREE.Vector3(200,0,600), new THREE.Vector3(240,0,980),
    ]);
    const mat=new THREE.MeshStandardMaterial({ color:0x2a2e33, roughness:0.92 });
    this.group.add(this.createRoadMesh(curve, 9.5, mat));
    // sidewalks não na highway, mas guard rails + lane dashed via canvas
    const dashCan=document.createElement('canvas'); dashCan.width=128; dashCan.height=8;
    const dc=dashCan.getContext('2d'); dc.fillStyle='#2a2e33'; dc.fillRect(0,0,128,8); dc.fillStyle='#ffffff'; for(let x=0;x<128;x+=24) dc.fillRect(x,3,12,2);
    const dashTex=new THREE.CanvasTexture(dashCan); dashTex.wrapS=THREE.RepeatWrapping; dashTex.repeat.set(40,1);
    const lineMat=new THREE.MeshStandardMaterial({ map:dashTex, roughness:0.9 });
    const lineCurve=new THREE.CatmullRomCurve3(curve.points.map(p=>p.clone()));
    const lineMesh=this.createRoadMesh(lineCurve, 0.6, lineMat); lineMesh.position.y=0.02; this.group.add(lineMesh);
    // guard rail simple posts
    for(let i=0;i<24;i++){
      const t=i/24; const pt=curve.getPoint(t);
      const h=this.terrain.getHeightAt(pt.x,pt.z)+0.35;
      const post1=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.7,0.12), new THREE.MeshStandardMaterial({color:0x8a8a88}));
      post1.position.set(pt.x-5, h, pt.z); this.group.add(post1);
      const post2=post1.clone(); post2.position.set(pt.x+5, h, pt.z); this.group.add(post2);
    }
  }

  createCityStreets(){
    const roadMat=new THREE.MeshStandardMaterial({ color:0x1a1d24, roughness:0.95, metalness:0.02 }); // ULTRA CONTRASTE: quase preto, visto de qualquer altitude
    // Roma cardo/decumanus ampliado: 6 vias com calçadas
    const romaRoads=[];
    for(let i=0;i<5;i++){
      const x=120+i*18;
      const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(x,0,-80), new THREE.Vector3(x,0,40) ]);
      romaRoads.push(curve); this.group.add(this.createRoadMesh(curve,5.8,roadMat)); this.createSidewalkPair(curve,5.8,2.0);
    }
    for(let z=-60; z<=30; z+=18){
      const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(110,0,z), new THREE.Vector3(260,0,z) ]);
      romaRoads.push(curve); this.group.add(this.createRoadMesh(curve,5.8,roadMat)); this.createSidewalkPair(curve,5.8,2.0);
    }
    // faixas de pedestres (zebra) nas interseções romanas
    for(let ix=0; ix<5; ix++){
      for(let zz=-60; zz<=30; zz+=18){
        const cx=120+ix*18, cz=zz;
        this.createZebra(cx,cz,5.8);
      }
    }
    // OPUS 5.5: alamedas de plátanos ao longo das vias principais
    for(let i=0;i<5;i++){ const x=120+i*18;
      for(let z=-70; z<35; z+=14){
        const fp=this.terrain.getFootprintHeight? this.terrain.getFootprintHeight(x+2.8, z, 1,1): {minH:this.terrain.getHeightAt(x+2.8,z)};
        this.addStreetTree(x+3.2, z, fp.minH);
        const fp2=this.terrain.getFootprintHeight(x-2.8, z, 1,1); this.addStreetTree(x-3.2, z, fp2.minH);
      }
    }

    // Firenze grid
    for(let i=0;i<4;i++){
      const x=-90+i*20; const c=new THREE.CatmullRomCurve3([new THREE.Vector3(x,0,-190), new THREE.Vector3(x,0,-90)]);
      this.group.add(this.createRoadMesh(c,5.2,roadMat)); this.createSidewalkPair(c,5.2,1.8);
    }
    for(let z=-180; z<=-100; z+=22){
      const c=new THREE.CatmullRomCurve3([new THREE.Vector3(-100,0,z), new THREE.Vector3(-10,0,z)]);
      this.group.add(this.createRoadMesh(c,5.2,roadMat)); this.createSidewalkPair(c,5.2,1.8);
    }
    for(let ix=0; ix<4; ix++){ for(let zz=-180; zz<=-100; zz+=22){ this.createZebra(-90+ix*20, zz, 5.2); } }
    // Firenze alamedas
    for(let z=-180; z<-100; z+=16){ const fp=this.terrain.getFootprintHeight(-75,z,1,1); this.addStreetTree(-75,z,fp.minH); }

    // Bologna portici line (decor)
    // Venezia stone paths with expanded sidewalks stone
    const stoneCan=document.createElement('canvas'); stoneCan.width=256; stoneCan.height=256;
    const sctx=stoneCan.getContext('2d'); sctx.fillStyle='#9a9a9a'; sctx.fillRect(0,0,256,256);
    for(let i=0;i<120;i++){ const x=Math.random()*256, y=Math.random()*256; sctx.fillStyle=`rgba(0,0,0,0.08)`; sctx.fillRect(x,y,18,12); sctx.strokeStyle='rgba(255,255,255,0.2)'; sctx.strokeRect(x,y,18,12); }
    const stoneTex=new THREE.CanvasTexture(stoneCan); stoneTex.wrapS=stoneTex.wrapT=THREE.RepeatWrapping; stoneTex.repeat.set(6,6);
    const stoneMat=new THREE.MeshStandardMaterial({ map:stoneTex, roughness:0.95 });
    for(let i=0;i<4;i++){
      const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(-140+i*30,0,-180+i*10), new THREE.Vector3(-80+i*20,0,-100+i*20), new THREE.Vector3(-20+i*20,0,-20+i*10) ]);
      this.group.add(this.createRoadMesh(curve, 4.2, stoneMat));
      this.createSidewalkPair(curve,4.2,1.4);
    }

    // Milano grid modern
    for(let i=0;i<3;i++){
      const x=-270+i*22; const c=new THREE.CatmullRomCurve3([new THREE.Vector3(x,0,-470), new THREE.Vector3(x,0,-360)]);
      this.group.add(this.createRoadMesh(c,6.2,roadMat)); this.createSidewalkPair(c,6.2,2.2);
    }

    // Genova serpentine + Napoli lungomare
    const lungC=new THREE.CatmullRomCurve3([new THREE.Vector3(285,0,135), new THREE.Vector3(340,0,160), new THREE.Vector3(375,0,185)]);
    this.group.add(this.createRoadMesh(lungC,6, new THREE.MeshStandardMaterial({color:0x3a3d42}))); this.createSidewalkPair(lungC,6,2.4);
  }

  addStreetTree(x,z, y){
    const g=new THREE.Group(); g.position.set(x,y,z);
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.18,3.2,6), new THREE.MeshStandardMaterial({color:0x4a3820}));
    trunk.position.y=1.6; g.add(trunk);
    const crown=new THREE.Mesh(new THREE.SphereGeometry(1.6,8,6), new THREE.MeshStandardMaterial({color:0x2d5a1e, roughness:0.9}));
    crown.position.y=3.8; crown.scale.set(1.1,0.9,1.1); g.add(crown);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(0.32,0.36,0.14,6), new THREE.MeshStandardMaterial({color:0x5a5a5a}));
    base.position.y=0.07; g.add(base);
    this.group.add(g);
  }

  createZebra(cx,cz,roadW){
    const fp=this.terrain.getFootprintHeight? this.terrain.getFootprintHeight(cx,cz, roadW+1, 3) : {minH: this.terrain.getHeightAt(cx,cz)};
    const y=fp.minH+0.095;
    const group=new THREE.Group(); group.position.set(cx,y,cz);
    // 7 stripes
    for(let i=-3;i<=3;i++){
      const stripe=new THREE.Mesh(new THREE.PlaneGeometry(0.36,2.8), new THREE.MeshStandardMaterial({color:0xffffff, roughness:0.8}));
      stripe.rotation.x=-Math.PI/2; stripe.position.set(i*0.62, 0.01, 0); group.add(stripe);
    }
    // second direction cross (intersections have both)
    const group2=group.clone(); group2.rotation.y=Math.PI/2; // clone includes stripes
    this.group.add(group); this.group.add(group2);
  }

  createCountryRoads(){
    const gravelMat=new THREE.MeshStandardMaterial({ color:0xd8d0b8, roughness:0.97 });
    const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(-220,0,-340), new THREE.Vector3(-220,0,-120), new THREE.Vector3(-240,0,20), new THREE.Vector3(-300,0,120) ]);
    this.group.add(this.createRoadMesh(curve, 5, gravelMat));
    this.createSidewalkPair(curve,5,1.0);
    const mcurve=new THREE.CatmullRomCurve3([ new THREE.Vector3(-200,0,-620), new THREE.Vector3(-80,0,-650), new THREE.Vector3(40,0,-620), new THREE.Vector3(120,0,-580), new THREE.Vector3(60,0,-520) ]);
    const mMat=new THREE.MeshStandardMaterial({ color:0x4a4a4a, roughness:0.92 }); this.group.add(this.createRoadMesh(mcurve, 7, mMat));
  }
}
