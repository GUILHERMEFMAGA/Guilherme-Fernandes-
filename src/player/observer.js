import * as THREE from 'three';

// Olho Observador — modo cinematográfico, não FPS
// Inspirado em drone + satélite + olho humano: orbita, voo livre, sem gravidade, sem colisão bruta
export class ObserverControls {
  constructor(camera, domElement, terrain, buildingSystem){
    this.camera=camera;
    this.domElement=domElement;
    this.terrain=terrain;
    this.buildingSystem=buildingSystem;

    // Estado principal: câmera livre no espaço
    this.position = new THREE.Vector3(-320, 95, 140); // vista aérea cinematográfica inicial (Toscana → Veneza)
    this.target = new THREE.Vector3(-80, 8, 20); // ponto de interesse
    this.up = new THREE.Vector3(0,1,0);

    // esférico para órbita
    this.spherical = new THREE.Spherical();
    this.sphericalDelta = new THREE.Spherical();
    this.offset = new THREE.Vector3();

    this.spherical.setFromVector3(new THREE.Vector3().subVectors(this.position, this.target));

    this.camera.position.copy(this.position);
    this.camera.lookAt(this.target);

    // inputs
    this.keys={};
    this.mouseDown=false;
    this.mouseButton=-1;
    this.mouseX=0; this.mouseY=0;
    this.shift=false;
    this.wheelDelta=0;

    this.rotateSpeed=0.0032;
    this.panSpeed=0.9;
    this.zoomSpeed=1.12;
    this.flySpeed=42; // m/s base (escala Itália)
    this.fastMultiplier=3.2;

    this.damping=0.92;
    this.velocity=new THREE.Vector3();
    this.angularVel=new THREE.Vector2();

    this.minDistance=4;
    this.maxDistance=900;
    this.minPolar=0.08;
    this.maxPolar=Math.PI/2 - 0.02; // não ir abaixo do chão

    this.mode='orbit'; // 'orbit' | 'fly' | 'cinematic'
    this.cinematicT=0;
    this.cinematicPath=null;

    this.enabled=true;

    this.setupListeners();
    this.updateCameraRotation();
  }

  setupListeners(){
    window.addEventListener('keydown', e=> this.onKeyDown(e));
    window.addEventListener('keyup', e=> this.onKeyUp(e));
    this.domElement.addEventListener('mousedown', e=> this.onMouseDown(e));
    window.addEventListener('mouseup', e=> this.onMouseUp(e));
    window.addEventListener('mousemove', e=> this.onMouseMove(e));
    this.domElement.addEventListener('wheel', e=> this.onWheel(e), {passive:false});
    this.domElement.addEventListener('contextmenu', e=> e.preventDefault());
    // touch
    this.domElement.addEventListener('touchstart', e=> this.onTouchStart(e), {passive:false});
    this.domElement.addEventListener('touchmove', e=> this.onTouchMove(e), {passive:false});
    this.domElement.addEventListener('touchend', e=> this.onTouchEnd(e));
  }

  onKeyDown(e){
    this.keys[e.code]=true;
    if(e.code==='ShiftLeft' || e.code==='ShiftRight') this.shift=true;
    if(e.code==='KeyC'){ // alterna cinemático
      this.mode = this.mode==='cinematic' ? 'orbit' : 'cinematic';
      if(this.mode==='cinematic') this.startCinematic();
    }
    if(e.code==='KeyO'){ this.mode='orbit'; }
    if(e.code==='KeyF'){ this.mode='fly'; }
    if(e.code==='Space'){
      e.preventDefault();
      this.goToNextLandmark();
    }
  }
  onKeyUp(e){ this.keys[e.code]=false; if(e.code==='ShiftLeft'||e.code==='ShiftRight') this.shift=false; }

  onMouseDown(e){
    this.mouseDown=true;
    this.mouseButton=e.button;
    this.mouseX=e.clientX; this.mouseY=e.clientY;
    if(e.button===0 && !e.altKey){
      // left drag = orbit in orbit mode, look in fly mode
    }
  }
  onMouseUp(e){ this.mouseDown=false; }
  onMouseMove(e){
    if(!this.mouseDown) return;
    const dx=e.clientX - this.mouseX;
    const dy=e.clientY - this.mouseY;
    this.mouseX=e.clientX; this.mouseY=e.clientY;

    if(this.mode==='cinematic') return; // bloqueia durante cinemática manual

    if(this.mouseButton===2 || (this.mouseButton===0 && e.altKey) || this.keys['AltLeft'] || this.keys['AltRight']){
      // pan
      this.pan(dx, dy);
    } else {
      // orbit / look
      if(this.mode==='fly'){
        this.angularVel.x -= dx * 0.0026;
        this.angularVel.y -= dy * 0.0026;
      } else {
        this.sphericalDelta.theta -= dx * this.rotateSpeed;
        this.sphericalDelta.phi   -= dy * this.rotateSpeed;
      }
    }
  }
  onWheel(e){
    e.preventDefault();
    const s = e.deltaY>0 ? this.zoomSpeed : 1/this.zoomSpeed;
    const newRadius = THREE.MathUtils.clamp(this.spherical.radius * s, this.minDistance, this.maxDistance);
    this.spherical.radius = newRadius;
    // também ajusta offset pra zoom suave
    this.wheelDelta = s;
  }
  onTouchStart(e){
    if(e.touches.length===1){
      this.mouseDown=true;
      this.mouseX=e.touches[0].clientX; this.mouseY=e.touches[0].clientY;
    }
    e.preventDefault();
  }
  onTouchMove(e){
    if(!this.mouseDown || e.touches.length!==1) return;
    const dx=e.touches[0].clientX - this.mouseX;
    const dy=e.touches[0].clientY - this.mouseY;
    this.mouseX=e.touches[0].clientX; this.mouseY=e.touches[0].clientY;
    this.sphericalDelta.theta -= dx * this.rotateSpeed * 1.2;
    this.sphericalDelta.phi   -= dy * this.rotateSpeed * 1.2;
    e.preventDefault();
  }
  onTouchEnd(e){ this.mouseDown=false; }

  pan(dx, dy){
    const offset = new THREE.Vector3();
    offset.copy(this.position).sub(this.target);
    let targetDistance = offset.length();
    targetDistance *= Math.tan( (this.camera.fov/2) * Math.PI/180 );
    const panLeft = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 0);
    panLeft.multiplyScalar( -dx * targetDistance * 0.0012 );
    const panUp = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 1);
    panUp.multiplyScalar( dy * targetDistance * 0.0012 );
    const pan = new THREE.Vector3().addVectors(panLeft, panUp);
    this.target.add(pan);
    this.position.add(pan);
  }

  startCinematic(){
    // cria path que sobrevoa todas as regiões de forma suave
    const pts=[
      new THREE.Vector3(-320, 110, 140), // Toscana alto
      new THREE.Vector3(-80, 65, 40),   // Villa
      new THREE.Vector3(35, 55, -40),   // Veneza
      new THREE.Vector3(180, 70, -20),  // Roma
      new THREE.Vector3(60, 85, 120),   // centro
      new THREE.Vector3(-240, 80, -420),// Milano
      new THREE.Vector3(-10, 140, -320),// transição Dolomiti
      new THREE.Vector3(0, 95, -700),   // Dolomiti
    ];
    this.cinematicPath = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
    this.cinematicT=0;
  }

  goToNextLandmark(){
    const landmarks=[
      {pos:new THREE.Vector3(35, 42, -105), target:new THREE.Vector3(35, 12, -80), name:'venezia'}, // Campanile
      {pos:new THREE.Vector3(210, 78, 20), target:new THREE.Vector3(210, 6, -55), name:'roma'}, // Colosseum elevado
      {pos:new THREE.Vector3(-260, 85, -340), target:new THREE.Vector3(-240, 8, -420), name:'milano'}, // Duomo
      {pos:new THREE.Vector3(-310, 65, 110), target:new THREE.Vector3(-280, 6, 60), name:'toscana'}, // Toscana villa
      {pos:new THREE.Vector3(40, 160, -620), target:new THREE.Vector3(0, 12, -700), name:'dolomiti'}, // Dolomiti
    ];
    // acha mais próximo e vai pro próximo
    let bestIdx=0, bestDist=Infinity;
    landmarks.forEach((lm,i)=>{
      const d=lm.pos.distanceTo(this.position);
      if(d<bestDist){ bestDist=d; bestIdx=i; }
    });
    const next=landmarks[(bestIdx+1)%landmarks.length];
    this.flyTo(next.pos, next.target, 2.2);
  }

  flyTo(pos, target, duration=1.8){
    this.mode='fly';
    const startPos=this.position.clone();
    const startTarget=this.target.clone();
    const startTime=performance.now();
    const animate=()=>{
      const t=Math.min((performance.now()-startTime)/(duration*1000),1);
      const eased= 1 - Math.pow(1-t, 3); // easeOutCubic
      this.position.lerpVectors(startPos, pos, eased);
      this.target.lerpVectors(startTarget, target, eased);
      if(t<1) requestAnimationFrame(animate);
      else {
        this.mode='orbit';
        this.spherical.setFromVector3(new THREE.Vector3().subVectors(this.position, this.target));
      }
    };
    animate();
  }

  teleport(x,y,z){
    // mantém distância atual mas mira no novo ponto
    const h=this.spherical.radius;
    this.target.set(x, y-1, z);
    // recalcula posição pra manter distância
    const dir=new THREE.Vector3().subVectors(this.position, this.target).normalize().multiplyScalar(h);
    if(dir.length()<1) dir.set(0, h*0.6, h*0.8);
    this.position.copy(this.target).add(dir);
    this.spherical.setFromVector3(dir);
  }

  getPosition(){ return this.position.clone(); }

  update(delta, interiorActive){
    if(!this.enabled) return;

    if(this.mode==='cinematic' && this.cinematicPath){
      this.cinematicT += delta * 0.018; // ~55s loop completo
      if(this.cinematicT>1) this.cinematicT-=1;
      const pos=this.cinematicPath.getPointAt(this.cinematicT);
      const lookAt=this.cinematicPath.getPointAt(Math.min(this.cinematicT+0.02, 1));
      // altura adaptativa: mantém 35m acima do terreno
      const gh = this.terrain ? this.terrain.getHeightAt(pos.x, pos.z) : 0;
      pos.y = Math.max(pos.y, gh+28);
      this.position.lerp(pos, 0.04);
      this.target.lerp(lookAt, 0.05);
      this.spherical.setFromVector3(new THREE.Vector3().subVectors(this.position, this.target));
    } else if(this.mode==='fly'){
      // voo livre WASD + QE
      const forward=new THREE.Vector3(); this.camera.getWorldDirection(forward);
      const right=new THREE.Vector3().crossVectors(forward, this.up).normalize();
      const up=new THREE.Vector3(0,1,0);
      let move=new THREE.Vector3();
      if(this.keys['KeyW']) move.add(forward);
      if(this.keys['KeyS']) move.sub(forward);
      if(this.keys['KeyA']) move.sub(right);
      if(this.keys['KeyD']) move.add(right);
      if(this.keys['KeyQ'] || this.keys['Space']) move.add(up);
      if(this.keys['KeyE'] || this.keys['ControlLeft']) move.sub(up);
      if(move.lengthSq()>0){
        move.normalize();
        const speed=this.flySpeed * (this.shift? this.fastMultiplier:1) * delta;
        // escala com altitude: voa mais rápido alto
        const altFactor = THREE.MathUtils.clamp(this.position.y/80, 0.5, 4);
        move.multiplyScalar(speed * altFactor);
        this.position.add(move);
        this.target.add(move);
      }
      // rotação por mouse arrasto já em angularVel, aplica damping
      if(this.angularVel.lengthSq()>0.000001){
        // transforma angular em delta esférico
        this.sphericalDelta.theta -= this.angularVel.x;
        this.sphericalDelta.phi   -= this.angularVel.y;
        this.angularVel.multiplyScalar(0.88);
      }
    }

    // aplica delta esférico com damping
    if(this.mode!=='fly' || this.angularVel.lengthSq()>0){
      this.spherical.theta += this.sphericalDelta.theta * 0.85;
      this.spherical.phi   += this.sphericalDelta.phi * 0.85;
      this.sphericalDelta.theta *= 0.88;
      this.sphericalDelta.phi   *= 0.88;

      // clamp
      this.spherical.phi = THREE.MathUtils.clamp(this.spherical.phi, this.minPolar, this.maxPolar);
      this.spherical.radius = THREE.MathUtils.clamp(this.spherical.radius, this.minDistance, this.maxDistance);

      const offset=new THREE.Vector3().setFromSpherical(this.spherical);
      this.position.copy(this.target).add(offset);
    }

    // evita enterrar no terreno: mantém 3.5m acima do solo
    if(this.terrain){
      const gh=this.terrain.getHeightAt(this.position.x, this.position.z);
      if(this.position.y < gh+3.5){
        this.position.y = gh+3.5;
        // ajusta target se necessário
        if(this.target.y < gh+1.2) this.target.y = gh+1.2;
        this.spherical.setFromVector3(new THREE.Vector3().subVectors(this.position, this.target));
      }
    }

    // atualiza câmera
    this.camera.position.copy(this.position);
    this.camera.lookAt(this.target);
  }

  updateCameraRotation(){
    // compat com código antigo
    this.camera.lookAt(this.target);
  }

  // compat API pro main.js antigo
  get positionRef(){ return this.position; }
}
