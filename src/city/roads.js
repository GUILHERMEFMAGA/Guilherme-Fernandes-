import * as THREE from 'three';

export class RoadSystem {
  constructor(worldScene, terrain){
    this.worldScene=worldScene; this.terrain=terrain;
    this.group=worldScene.streetGroup;
  }
  create(){
    this.createHighway();
    this.createCityStreets();
    this.createCountryRoads();
  }

  createRoadMesh(curve, width, material){
    const pts=curve.getPoints(120);
    const geo=new THREE.BufferGeometry();
    const verts=[], uvs=[], indices=[];
    for(let i=0;i<pts.length;i++){
      const p=pts[i];
      const yCenter=this.terrain.getHeightAt(p.x, p.z)+0.08;
      p.y=yCenter;
      const tangent=i<pts.length-1? new THREE.Vector3().subVectors(pts[i+1], p).normalize() : new THREE.Vector3().subVectors(p, pts[i-1]).normalize();
      const left=new THREE.Vector3(-tangent.z,0,tangent.x).normalize().multiplyScalar(width/2);
      // CORREÇÃO FLUTUAÇÃO: altura PER-VÉRTICE (cada borda no seu terreno real)
      const lx=p.x+left.x, lz=p.z+left.z, rx=p.x-left.x, rz=p.z-left.z;
      const yLeft=this.terrain.getHeightAt(lx, lz)+0.08;
      const yRight=this.terrain.getHeightAt(rx, rz)+0.08;
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

  createHighway(){
    // A1 autostrada north-south
    const curve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-260,-0.5,-860),
      new THREE.Vector3(-180,0,-500),
      new THREE.Vector3(-120,0,-200),
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(120,0,260),
      new THREE.Vector3(200,0,600),
      new THREE.Vector3(240,0,980),
    ]);
    const mat=new THREE.MeshStandardMaterial({ color:0x2a2e33, roughness:0.92 });
    const mesh=this.createRoadMesh(curve, 9, mat);
    this.group.add(mesh);
    // lane markings
    const lineMat=new THREE.MeshStandardMaterial({ color:0xffffff });
    const lineCurve=new THREE.CatmullRomCurve3(curve.points.map(p=>p.clone()));
    const lineMesh=this.createRoadMesh(lineCurve, 0.22, lineMat);
    lineMesh.position.y=0.015;
    // dashed effect via vertex alpha not implemented - solid for now
    this.group.add(lineMesh);
  }

  createCityStreets(){
    // grid in Roma area
    const mat=new THREE.MeshStandardMaterial({ color:0x3a3d42, roughness:0.9 });
    for(let i=0;i<5;i++){
      const x=120+i*18;
      const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(x,0,-80), new THREE.Vector3(x,0,40) ]);
      this.group.add(this.createRoadMesh(curve,6,mat));
    }
    for(let z=-60; z<=30; z+=18){
      const curve=new THREE.CatmullRomCurve3([ new THREE.Vector3(110,0,z), new THREE.Vector3(260,0,z) ]);
      this.group.add(this.createRoadMesh(curve,6,mat));
    }
    // Venezia car-free stone paths along canals
    const stoneCan=document.createElement('canvas'); stoneCan.width=256; stoneCan.height=256;
    const sctx=stoneCan.getContext('2d'); sctx.fillStyle='#9a9a9a'; sctx.fillRect(0,0,256,256);
    for(let i=0;i<120;i++){ const x=Math.random()*256, y=Math.random()*256; sctx.fillStyle=`rgba(0,0,0,0.08)`; sctx.fillRect(x,y,18,12); sctx.strokeStyle='rgba(255,255,255,0.2)'; sctx.strokeRect(x,y,18,12); }
    const stoneTex=new THREE.CanvasTexture(stoneCan); stoneTex.wrapS=stoneTex.wrapT=THREE.RepeatWrapping; stoneTex.repeat.set(6,6);
    const stoneMat=new THREE.MeshStandardMaterial({ map:stoneTex, roughness:0.95 });
    for(let i=0;i<4;i++){
      const curve=new THREE.CatmullRomCurve3([
        new THREE.Vector3(-140+i*30,0,-180+i*10),
        new THREE.Vector3(-80+i*20,0,-100+i*20),
        new THREE.Vector3(-20+i*20,0,-20+i*10),
      ]);
      this.group.add(this.createRoadMesh(curve, 4.2, stoneMat));
    }
  }

  createCountryRoads(){
    // cypress road - white gravel
    const gravelMat=new THREE.MeshStandardMaterial({ color:0xd8d0b8, roughness:0.97 });
    const curve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-220,0,-340),
      new THREE.Vector3(-220,0,-120),
      new THREE.Vector3(-240,0,20),
      new THREE.Vector3(-300,0,120),
    ]);
    this.group.add(this.createRoadMesh(curve, 5, gravelMat));

    // mountain pass serpentine
    const mcurve=new THREE.CatmullRomCurve3([
      new THREE.Vector3(-200,0,-620),
      new THREE.Vector3(-80,0,-650),
      new THREE.Vector3(40,0,-620),
      new THREE.Vector3(120,0,-580),
      new THREE.Vector3(60,0,-520),
    ]);
    const mMat=new THREE.MeshStandardMaterial({ color:0x4a4a4a, roughness:0.92 });
    this.group.add(this.createRoadMesh(mcurve, 7, mMat));
  }
}
