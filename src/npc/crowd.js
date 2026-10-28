import * as THREE from 'three';

function createHumanMesh(variant=0){
  const g=new THREE.Group();
  const skinCol=[0xf2c9a0,0xe8b89a,0xd9a88a,0xc9a07a][variant%4];
  const shirtCol=[0x2a6a9a,0x8a3a3a,0x2a4a2a,0x3a3a4a,0xc9a86a,0xffffff][variant%6];
  const pantsCol=[0x2a3a5a,0x3a2a1a,0x1a1a1a,0x4a4a4a][variant%4];

  const torsoGeo=new THREE.CapsuleGeometry(0.24,0.48,4,8);
  const torsoMat=new THREE.MeshStandardMaterial({ color:shirtCol, roughness:0.9 });
  const torso=new THREE.Mesh(torsoGeo, torsoMat); torso.position.y=1.02; torso.frustumCulled=false; g.add(torso);

  const headGeo=new THREE.SphereGeometry(0.21,10,8);
  const headMat=new THREE.MeshStandardMaterial({ color:skinCol, roughness:0.7 });
  const head=new THREE.Mesh(headGeo, headMat); head.position.y=1.42; g.add(head);
  const hairGeo=new THREE.SphereGeometry(0.22,8,6,0,Math.PI*2,0,Math.PI*0.55);
  const hairMat=new THREE.MeshStandardMaterial({ color:[0x1a1a1a,0x6a3a1a,0xd8c9a0,0x3a3a3a][variant%4] });
  const hair=new THREE.Mesh(hairGeo, hairMat); hair.position.y=1.46; hair.rotation.x=0.1; g.add(hair);

  const armGeo=new THREE.CapsuleGeometry(0.07,0.36,4,6);
  const armMat=new THREE.MeshStandardMaterial({ color:skinCol });
  const armL=new THREE.Mesh(armGeo, armMat); armL.position.set(-0.31,0.96,0); armL.rotation.z=0.15; g.add(armL);
  const armR=armL.clone(); armR.position.set(0.31,0.96,0); armR.rotation.z=-0.15; g.add(armR);
  g.userData.arms=[armL,armR];

  const legGeo=new THREE.CapsuleGeometry(0.09,0.45,4,6);
  const legMat=new THREE.MeshStandardMaterial({ color:pantsCol });
  const legL=new THREE.Mesh(legGeo, legMat); legL.position.set(-0.11,0.42,0); g.add(legL);
  const legR=legL.clone(); legR.position.set(0.11,0.42,0); g.add(legR);
  g.userData.legs=[legL,legR];

  const shoeGeo=new THREE.BoxGeometry(0.14,0.06,0.22);
  const shoeMat=new THREE.MeshStandardMaterial({ color:0x1a1a1a });
  const shoeL=new THREE.Mesh(shoeGeo, shoeMat); shoeL.position.set(-0.11,0.06,0.04); g.add(shoeL);
  const shoeR=shoeL.clone(); shoeR.position.set(0.11,0.06,0.04); g.add(shoeR);

  if(variant%3===0){
    const bag=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.24,0.08), new THREE.MeshStandardMaterial({color:0x3a2a1a}));
    bag.position.set(0.28,0.85, -0.12); g.add(bag);
  }

  g.castShadow=true;
  return g;
}

export class CrowdSystem {
  constructor(worldScene, terrain, buildingSystem){
    this.worldScene=worldScene; this.terrain=terrain; this.buildingSystem=buildingSystem;
    this.group=worldScene.npcGroup;
    this.npcs=[];
    this.targetDensity=0.65;
    this.navPoints=[];
    this.frameCount=0;
  }

  generate(density=0.65){
    this.targetDensity=density;
    this.navPoints=[
      {pos:new THREE.Vector3(20,-80), radius:38, name:'venezia'},
      {pos:new THREE.Vector3(180,-20), radius:42, name:'roma'},
      {pos:new THREE.Vector3(-240,-400), radius:30, name:'milano'},
      {pos:new THREE.Vector3(-280,60), radius:22, name:'toscana'},
      {pos:new THREE.Vector3(0,-700), radius:26, name:'dolomiti'},
      {pos:new THREE.Vector3(-220,-20), radius:18, name:'villa'},
    ];
    this.spawnInHubs();
    // reduced wanderers for perf: 22 instead of 38
    for(let i=0;i<22;i++){
      const x=(Math.random()-0.5)*1200, z=(Math.random()-0.5)*1000;
      if(this.buildingSystem.getClosestBuilding(new THREE.Vector3(x,0,z), 18)) {
        this.spawnWanderer(x,z);
      }
    }
  }

  spawnInHubs(){
    this.navPoints.forEach(hub=>{
      const count=Math.round(6*this.targetDensity* (hub.name==='venezia'?1.4: hub.name==='roma'?1.3:1));
      for(let i=0;i<count;i++){
        const ang=Math.random()*Math.PI*2, r=Math.random()*hub.radius*0.75;
        const x=hub.pos.x + Math.cos(ang)*r;
        const z=hub.pos.y + Math.sin(ang)*r;
        const y=this.terrain.getHeightAt(x,z);
        const npc=this.createNPC(x,y,z);
        npc.userData.hub=hub.name;
        npc.userData.state='idle';
        npc.userData.idleTimer=Math.random()*4;
        this.npcs.push(npc); this.group.add(npc);
      }
    });
  }

  spawnWanderer(x,z){
    const y=this.terrain.getHeightAt(x,z);
    const npc=this.createNPC(x,y,z);
    npc.userData.state='walk';
    npc.userData.target=this.randomRoadTarget(x,z);
    this.npcs.push(npc); this.group.add(npc);
  }

  createNPC(x,y,z){
    const variant=Math.floor(Math.random()*6);
    const mesh=createHumanMesh(variant);
    mesh.position.set(x,y,z);
    mesh.scale.set(0.96+Math.random()*0.08,1,0.96+Math.random()*0.08);
    mesh.userData.variant=variant;
    mesh.userData.speed=0.55 + Math.random()*0.55;
    mesh.userData.dir=new THREE.Vector3(Math.cos(Math.random()*Math.PI*2),0,Math.sin(Math.random()*Math.PI*2));
    mesh.userData.walkPhase=Math.random()*Math.PI*2;
    mesh.userData.pauseTimer=0;
    mesh.frustumCulled=true;
    return mesh;
  }

  randomRoadTarget(x,z){
    const hub=this.navPoints[Math.floor(Math.random()*this.navPoints.length)];
    return new THREE.Vector3(hub.pos.x + (Math.random()-0.5)*20, 0, hub.pos.y + (Math.random()-0.5)*20);
  }

  update(delta, playerPos, isInterior){
    if(isInterior){
      this.group.visible=false;
      return;
    } else this.group.visible=true;

    this.frameCount++;
    const time=performance.now()*0.001;
    // stagger NPC updates: only update 50% per frame for far NPCs to save CPU
    const updateEvery = 1; // we will still update near ones every frame

    for(let idx=0; idx<this.npcs.length; idx++){
      const npc=this.npcs[idx];
      const dist=Math.hypot(npc.position.x-playerPos.x, npc.position.z-playerPos.z);

      // LOD culling: hide ultra-far (>220m) completely, simple drift
      if(dist>220){
        npc.visible=false;
        continue;
      } else npc.visible=true;

      // far NPCs: only update every 3 frames
      if(dist>140 && (this.frameCount%3 !== idx%3)) continue;

      if(npc.userData.state==='idle'){
        npc.userData.idleTimer-=delta;
        if(npc.userData.idleTimer<=0){
          npc.userData.state='walk';
          npc.userData.target=this.randomRoadTarget(npc.position.x, npc.position.z);
        }
        npc.rotation.y += Math.sin(time*0.6 + npc.userData.walkPhase)*0.002;
      } else {
        const to=new THREE.Vector3(npc.userData.target.x, npc.position.y, npc.userData.target.z).sub(npc.position);
        to.y=0;
        const d=to.length();
        if(d<1.5){
          npc.userData.state='idle';
          npc.userData.idleTimer=2+Math.random()*5;
        } else {
          to.normalize();
          // Only check building collision if near (dist<35) to save CPU
          if(dist<60){
            const ahead=new THREE.Vector3().copy(npc.position).addScaledVector(to, 1.8);
            const col=this.buildingSystem.checkCollision(ahead, 0.7);
            if(col.hit){
              const box=col.box;
              const center=new THREE.Vector3((box.min.x+box.max.x)/2,0,(box.min.z+box.max.z)/2);
              const avoid=new THREE.Vector3(npc.position.x-center.x,0,npc.position.z-center.z).normalize().multiplyScalar(0.9);
              to.add(avoid).normalize();
            }
          }
          npc.userData.dir.lerp(to, 0.08); npc.userData.dir.normalize();
          npc.position.addScaledVector(npc.userData.dir, npc.userData.speed*delta);
          npc.position.y=this.terrain.getHeightAt(npc.position.x, npc.position.z);

          const targetYaw=Math.atan2(npc.userData.dir.x, npc.userData.dir.z);
          // faster lerp for near, slower for far
          npc.rotation.y=THREE.MathUtils.lerp(npc.rotation.y, targetYaw, dist<40?0.12:0.06);

          // only animate legs for near ( <60m ) to save CPU
          if(dist<65){
            npc.userData.walkPhase += delta*6 * (npc.userData.speed);
            const swing=Math.sin(npc.userData.walkPhase)*0.32;
            const arms=npc.userData.arms, legs=npc.userData.legs;
            if(arms){
              arms[0].rotation.x= swing;
              arms[1].rotation.x=-swing;
            }
            if(legs){
              legs[0].rotation.x=-swing*0.7;
              legs[1].rotation.x= swing*0.7;
            }
            npc.position.y += Math.abs(Math.sin(npc.userData.walkPhase))*0.02;
          }

          if(dist<3.2){
            npc.userData.dir.addScaledVector(new THREE.Vector3().subVectors(npc.position, playerPos).normalize(), 0.03);
            npc.userData.dir.normalize();
          }
        }
      }
    }
  }

  setDensity(v){
    this.targetDensity=v/100;
    const keep=Math.round(this.npcs.length*this.targetDensity);
    this.npcs.forEach((npc,i)=> npc.visible = i< keep || Math.random()< this.targetDensity);
  }
}
