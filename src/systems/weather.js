import * as THREE from 'three';

export class WeatherSystem {
  constructor(worldScene, renderer){
    this.worldScene=worldScene;
    this.renderer=renderer;
    this.current='clear';
    this.target='clear';
    this.transition=1;
    this.rainGroup=null;
    this.rainParticles=null;
    this.fogOverride=null;
  }

  setWeather(name){
    this.target=name;
    this.transition=0;
    this.current=name; // immediate for now with fade via update
    this.applyVisuals();
  }

  applyVisuals(){
    if(this.current==='rain'){
      this.ensureRain();
      if(this.rainGroup) this.rainGroup.visible=true;
    } else {
      if(this.rainGroup) this.rainGroup.visible=false;
    }
    // fog handled in worldScene.updateSky via weather param
  }

  ensureRain(){
    if(this.rainGroup) return;
    this.rainGroup=new THREE.Group();
    const count=2200;
    const geo=new THREE.BufferGeometry();
    const pos=new Float32Array(count*3);
    const vel=new Float32Array(count);
    for(let i=0;i<count;i++){
      pos[i*3]= (Math.random()-0.5)*300;
      pos[i*3+1]= Math.random()*80+12;
      pos[i*3+2]= (Math.random()-0.5)*300;
      vel[i]= 1.2+Math.random()*0.8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    geo.setAttribute('vel', new THREE.BufferAttribute(vel,1));
    const mat=new THREE.PointsMaterial({ color:0xc9d8e8, size:0.18, transparent:true, opacity:0.62 });
    this.rainParticles=new THREE.Points(geo, mat);
    this.rainGroup.add(this.rainParticles);
    // splashes decals (simple small circles on ground would be extra)
    this.worldScene.scene.add(this.rainGroup);
  }

  update(delta, playerPos){
    // animate rain
    if(this.rainGroup && this.rainGroup.visible && this.rainParticles){
      this.rainGroup.position.set(playerPos.x, 0, playerPos.z);
      const pos=this.rainParticles.geometry.attributes.position;
      const vel=this.rainParticles.geometry.attributes.vel;
      for(let i=0;i<pos.count;i++){
        pos.setY(i, pos.getY(i) - vel.getX(i)*delta*28);
        if(pos.getY(i) < 0.4){
          pos.setY(i, 65+Math.random()*25);
          pos.setX(i, (Math.random()-0.5)*300);
          pos.setZ(i, (Math.random()-0.5)*300);
        }
      }
      pos.needsUpdate=true;
    }
  }
}
