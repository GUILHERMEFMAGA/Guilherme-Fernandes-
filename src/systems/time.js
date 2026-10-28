import * as THREE from 'three';

export class TimeSystem {
  constructor(worldScene){
    this.worldScene=worldScene;
    this.timeHours=11.35; // start late morning photogenic
    this.paused=false;
    this.timeScale= 18; // 18 game minutes per real second => full day ~80 sec if auto. We'll use manual slider primarily and slow auto.
    this.autoAdvance=false;
  }

  update(delta){
    if(!this.paused && this.autoAdvance){
      this.timeHours += (delta/3600)*this.timeScale*60; // delta seconds -> game hours
      if(this.timeHours>=24) this.timeHours-=24;
    }
  }

  setTime(h){
    this.timeHours = THREE.MathUtils.clamp(h,0,24);
  }

  getDisplay(){
    const totalMin=Math.floor(this.timeHours*60)%1440;
    const hh=Math.floor(totalMin/60).toString().padStart(2,'0');
    const mm=(totalMin%60).toString().padStart(2,'0');
    return `${hh}:${mm}`;
  }

  getDayFactor(){
    // 0 night, 1 day approximation via sun altitude
    const hourAngle = ((this.timeHours-12)/12)*Math.PI;
    const altitudeFactor=Math.cos(hourAngle);
    const sunY = Math.max(-300, altitudeFactor*900+120);
    return THREE.MathUtils.clamp((sunY+200)/900,0,1);
  }
}
