// Ambient audio manager using WebAudio oscillators + buffers
// Since we cannot load external licensed tracks reliably, we synthesize a convincing Italian ambient soundscape.

export class AudioSystem {
  constructor(){
    this.ctx=null;
    this.masterGain=null;
    this.ambientNodes=[];
    this.enabled=true;
    this.volume=0.7;
    this.initialized=false;
  }

  init(){
    if(this.initialized) return;
    try{
      this.ctx=new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain=this.ctx.createGain();
      this.masterGain.gain.value=this.volume;
      this.masterGain.connect(this.ctx.destination);
      this.initialized=true;
    }catch(e){ console.warn('Audio init failed',e); }
  }

  ensureCtx(){
    if(!this.initialized) this.init();
    if(this.ctx && this.ctx.state==='suspended') this.ctx.resume();
  }

  setVolume(v){
    this.volume=v;
    if(this.masterGain) this.masterGain.gain.value=v;
  }

  playAmbient(region='roma'){
    this.ensureCtx();
    if(!this.ctx) return;
    this.stopAmbient();
    // create layered ambient: wind + birds + distant city + water lapping
    // wind: low filtered noise via oscillators
    const windOsc=this.ctx.createOscillator(); windOsc.type='sawtooth'; windOsc.frequency.value=42;
    const windGain=this.ctx.createGain(); windGain.gain.value=0.018;
    const windFilter=this.ctx.createBiquadFilter(); windFilter.type='lowpass'; windFilter.frequency.value=420;
    windOsc.connect(windFilter); windFilter.connect(windGain); windGain.connect(this.masterGain);
    windOsc.start();
    this.ambientNodes.push({osc:windOsc, gain:windGain, filter:windFilter});

    // birds: periodic chirps via short oscillators
    this.birdInterval=setInterval(()=>{
      if(!this.enabled || !this.ctx) return;
      const o=this.ctx.createOscillator(); o.type='sine'; o.frequency.value=1800+Math.random()*1200;
      const g=this.ctx.createGain(); g.gain.value=0; g.gain.setValueAtTime(0,this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime+0.02); g.gain.linearRampToValueAtTime(0,this.ctx.currentTime+0.28);
      o.connect(g); g.connect(this.masterGain); o.start(); o.stop(this.ctx.currentTime+0.3);
    }, 1800+Math.random()*1200);

    // church bell occasional (Roma/Venezia)
    if(region==='roma' || region==='venezia'){
      this.bellInterval=setInterval(()=>{
        if(!this.enabled) return;
        const o=this.ctx.createOscillator(); o.frequency.value=220;
        const g=this.ctx.createGain(); g.gain.value=0.08;
        o.connect(g); g.connect(this.masterGain); o.start(); setTimeout(()=>{ try{o.stop()}catch{} }, 1200);
        // second harmonic
        const o2=this.ctx.createOscillator(); o2.frequency.value=440; const g2=this.ctx.createGain(); g2.gain.value=0.04; o2.connect(g2); g2.connect(this.masterGain); o2.start(); setTimeout(()=>{ try{o2.stop()}catch{} }, 900);
      }, 34000);
    }

    // water lapping for Venezia
    if(region==='venezia'){
      const lapping=setInterval(()=>{
        const o=this.ctx.createOscillator(); o.frequency.value=80; o.type='triangle';
        const g=this.ctx.createGain(); g.gain.value=0.04; g.gain.linearRampToValueAtTime(0,this.ctx.currentTime+0.6);
        const f=this.ctx.createBiquadFilter(); f.frequency.value=200;
        o.connect(f); f.connect(g); g.connect(this.masterGain); o.start(); o.stop(this.ctx.currentTime+0.6);
      }, 2100);
      this.waterInterval=lapping;
    }
  }

  stopAmbient(){
    this.ambientNodes.forEach(n=>{ try{n.osc.stop()}catch{} });
    this.ambientNodes=[];
    if(this.birdInterval) clearInterval(this.birdInterval);
    if(this.bellInterval) clearInterval(this.bellInterval);
    if(this.waterInterval) clearInterval(this.waterInterval);
  }

  playFootstep(surface='cobble'){
    this.ensureCtx(); if(!this.ctx) return;
    const o=this.ctx.createOscillator(); o.frequency.value= surface==='cobble'? 120 : 180;
    const g=this.ctx.createGain(); g.gain.value=0.09;
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime+0.12);
    o.connect(g); g.connect(this.masterGain); o.start(); o.stop(this.ctx.currentTime+0.12);
  }

  playDoor(){
    this.ensureCtx(); if(!this.ctx) return;
    const o=this.ctx.createOscillator(); o.frequency.value=140; const g=this.ctx.createGain(); g.gain.value=0.12;
    o.connect(g); g.connect(this.masterGain); o.start(); o.frequency.linearRampToValueAtTime(90,this.ctx.currentTime+0.18); o.stop(this.ctx.currentTime+0.2);
  }

  updateRegion(pos){
    // choose ambient based on location
    // we won't spam playAmbient every frame; caller should detect region change
  }
}
