import * as THREE from 'three';

export class VegetationSystem {
  constructor(worldScene, terrain){
    this.worldScene = worldScene;
    this.terrain = terrain;
    this.group = worldScene.vegetationGroup;
  }

  create(){
    this.createCypressAlley();
    this.createOliveGroves();
    this.createForest();
    this.createGardens();
  }

  makeCypress(x,z, scale=1){
    const h = 18*scale + Math.random()*4;
    const trunkGeo = new THREE.CylinderGeometry(0.18*scale, 0.32*scale, h*0.12, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color:0x4a3520, roughness:0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = h*0.06;

    const foliageGeo = new THREE.ConeGeometry(1.2*scale, h*0.9, 8);
    const foliageMat = new THREE.MeshStandardMaterial({ color:0x1a3a12, roughness:0.85 });
    const foliage = new THREE.Mesh(foliageGeo, foliageMat);
    foliage.position.y = h*0.55;

    const g = new THREE.Group();
    g.add(trunk); g.add(foliage);
    g.position.set(x, this.terrain.getHeightAt(x,z), z);
    g.castShadow=true;
    // random lean
    g.rotation.z = (Math.random()-0.5)*0.06;
    g.scale.set(0.95+Math.random()*0.1,1,0.95+Math.random()*0.1);
    return g;
  }

  createCypressAlley(){
    // Iconic Tuscan cypress road
    const alleyX = -220;
    for(let i=0;i<22;i++){
      const z = -340 + i*28;
      const left = this.makeCypress(alleyX-6, z, 1.1+Math.random()*0.15);
      const right = this.makeCypress(alleyX+6, z, 1.1+Math.random()*0.15);
      this.group.add(left); this.group.add(right);
    }
  }

  makeOlive(x,z){
    const g = new THREE.Group();
    const trunkGeo = new THREE.CylinderGeometry(0.2,0.45,3,6);
    const trunkMat=new THREE.MeshStandardMaterial({color:0x5a4a30, roughness:0.95});
    const trunk=new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y=1.4;
    trunk.rotation.z=(Math.random()-0.5)*0.3;
    const crownGeo=new THREE.SphereGeometry(2.2,8,6);
    crownGeo.scale(1,0.75,1);
    const crownMat=new THREE.MeshStandardMaterial({color:0x5a6b3a, roughness:0.9});
    const crown=new THREE.Mesh(crownGeo,crownMat);
    crown.position.y=3.8;
    // deform vertices slightly for natural look
    const pos=crown.geometry.attributes.position;
    for(let i=0;i<pos.count;i++){ pos.setX(i, pos.getX(i)*(0.9+Math.random()*0.2)); pos.setZ(i, pos.getZ(i)*(0.9+Math.random()*0.2)); }
    pos.needsUpdate=true;
    g.add(trunk); g.add(crown);
    g.position.set(x, this.terrain.getHeightAt(x,z), z);
    return g;
  }

  createOliveGroves(){
    // grid grove in Tuscan hills
    const origin={x:-280,z: 80};
    for(let ix=0; ix<6; ix++){
      for(let iz=0; iz<5; iz++){
        const x = origin.x + ix*14 + (Math.random()-0.5)*4;
        const z = origin.z + iz*14 + (Math.random()-0.5)*4;
        this.group.add(this.makeOlive(x,z));
      }
    }
    // vineyard rows (PERF: 4x12)
    for(let row=0; row<4; row++){
      const z0 = 160 + row*6;
      for(let c=0;c<12;c++){
        const x = -360 + c*12;
        const vineGeo=new THREE.BoxGeometry(0.18,0.9,0.18);
        const vineMat=new THREE.MeshStandardMaterial({color:0x3a4d1a, roughness:0.9});
        const vine=new THREE.Mesh(vineGeo,vineMat);
        vine.position.set(x, this.terrain.getHeightAt(x,z0)+0.45, z0+Math.sin(c)*0.3);
        this.group.add(vine);
        // leaves cluster
        const leafGeo=new THREE.SphereGeometry(0.45,6,5);
        const leafMat=new THREE.MeshStandardMaterial({color:0x5a7a2e});
        const leaf=new THREE.Mesh(leafGeo,leafMat);
        leaf.position.set(x, this.terrain.getHeightAt(x,z0)+0.9, z0);
        leaf.scale.set(1.2,0.6,1.2);
        this.group.add(leaf);
      }
    }
  }

  createForest(){
    // PERFORMANCE: floresta leve
    for(let i=0;i<40;i++){
      const x = (Math.random()-0.5)*1100;
      const z = -900 + Math.random()*280;
      const h = 10+Math.random()*8;
      const pine = this.makePine(x,z,h);
      this.group.add(pine);
    }
    for(let i=0;i<20;i++){
      const x = (Math.random()-0.5)*900;
      const z = -250 + Math.random()*300;
      const oak = this.makeOak(x,z);
      this.group.add(oak);
    }
  }

  makePine(x,z,h){
    const g=new THREE.Group();
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.18,0.36, h*0.18,6), new THREE.MeshStandardMaterial({color:0x3d2b18, roughness:0.95}));
    trunk.position.y=h*0.09;
    g.add(trunk);
    for(let l=0;l<3;l++){
      const cone=new THREE.Mesh(new THREE.ConeGeometry(1.6 - l*0.35, 4.5 - l*0.7, 8), new THREE.MeshStandardMaterial({color:0x1e3a1e, roughness:0.9}));
      cone.position.y= h*0.22 + l*2.2;
      g.add(cone);
    }
    g.position.set(x, this.terrain.getHeightAt(x,z), z);
    g.scale.set(0.9+Math.random()*0.2,1,0.9+Math.random()*0.2);
    return g;
  }

  makeOak(x,z){
    const g=new THREE.Group();
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.42,3.2,6), new THREE.MeshStandardMaterial({color:0x4a3820}));
    trunk.position.y=1.6;
    g.add(trunk);
    const crown=new THREE.Mesh(new THREE.SphereGeometry(2.8,8,7), new THREE.MeshStandardMaterial({color:0x2d4a1e, roughness:0.92}));
    crown.position.y=4.2; crown.scale.set(1.3,0.9,1.3);
    g.add(crown);
    g.position.set(x, this.terrain.getHeightAt(x,z), z);
    return g;
  }

  createGardens(){
    // formal Italian garden near villa
    const gardenCenter={x: -80, z: -10};
    for(let ix=-2; ix<=2; ix++){
      for(let iz=-1; iz<=1; iz++){
        const box=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.45,1.1), new THREE.MeshStandardMaterial({color:0x7a9a4a}));
        box.position.set(gardenCenter.x+ix*2.4, this.terrain.getHeightAt(gardenCenter.x+ix*2.4, gardenCenter.z+iz*2.4)+0.22, gardenCenter.z+iz*2.4);
        this.group.add(box);
      }
    }
    // lemon trees
    for(let i=0;i<6;i++){
      const x=gardenCenter.x + (Math.random()-0.5)*14;
      const z=gardenCenter.z + (Math.random()-0.5)*8;
      const lemon=this.makeLemonTree(x,z);
      this.group.add(lemon);
    }
  }

  makeLemonTree(x,z){
    const g=new THREE.Group();
    const trunk=new THREE.Mesh(new THREE.CylinderGeometry(0.12,0.18,1.8,6), new THREE.MeshStandardMaterial({color:0x5a4a2a}));
    trunk.position.y=0.9; g.add(trunk);
    const crown=new THREE.Mesh(new THREE.SphereGeometry(1.2,7,6), new THREE.MeshStandardMaterial({color:0x3a5a1a}));
    crown.position.y=1.9; g.add(crown);
    // lemons
    for(let i=0;i<3;i++){
      const lemon=new THREE.Mesh(new THREE.SphereGeometry(0.16,6,5), new THREE.MeshStandardMaterial({color:0xe8d020}));
      lemon.position.set((Math.random()-0.5)*0.9, 1.7+Math.random()*0.5, (Math.random()-0.5)*0.9);
      g.add(lemon);
    }
    g.position.set(x, this.terrain.getHeightAt(x,z), z);
    return g;
  }
}
