import * as THREE from 'three';

export class PlayerControls {
  constructor(camera, domElement, terrain, buildingSystem){
    this.camera=camera;
    this.domElement=domElement;
    this.terrain=terrain;
    this.buildingSystem=buildingSystem;

    this.position=new THREE.Vector3(0, 8, 150); // start in Toscana/Tuscan villa area for nice view
    this.velocity=new THREE.Vector3();
    this.yaw= Math.PI*0.1;
    this.pitch=0.02;
    this.eyeHeight=1.72;
    this.speedWalk=3.2;
    this.speedRun=6.0;
    this.isRunning=false;
    this.isLocked=false;
    this.gravity=-14;
    this.jumpVelocity=5.2;
    this.onGround=true;

    // input state
    this.keys={};
    this.mouseSensitivity=0.0022;

    this.camera.position.copy(this.position);
    this.updateCameraRotation();

    // listeners
    window.addEventListener('keydown', e=> this.onKeyDown(e));
    window.addEventListener('keyup', e=> this.onKeyUp(e));
    domElement.addEventListener('click', ()=>{ if(!this.isLocked) domElement.requestPointerLock(); });
    document.addEventListener('pointerlockchange', ()=> this.onLockChange());
    document.addEventListener('mousemove', e=> this.onMouseMove(e));
    // touch for mobile (simple joystick via touch drag)
    domElement.addEventListener('touchstart', e=> e.preventDefault(), {passive:false});

    this.collisionRadius=0.55;
    this.lastGroundedY=0;
  }

  onKeyDown(e){
    this.keys[e.code]=true;
    if(e.code==='Space'){ e.preventDefault(); this.tryJump(); }
  }
  onKeyUp(e){ this.keys[e.code]=false; }

  onLockChange(){
    this.isLocked = document.pointerLockElement===this.domElement;
    const hint=document.getElementById('pointer-hint');
    if(hint) hint.classList.toggle('hidden', this.isLocked);
  }

  onMouseMove(e){
    if(!this.isLocked) return;
    const dx=e.movementX||0, dy=e.movementY||0;
    this.yaw -= dx*this.mouseSensitivity;
    this.pitch -= dy*this.mouseSensitivity;
    this.pitch = THREE.MathUtils.clamp(this.pitch, -Math.PI/2+0.05, Math.PI/2-0.05);
    this.updateCameraRotation();
  }

  updateCameraRotation(){
    this.camera.rotation.order='YXZ';
    this.camera.rotation.y=this.yaw;
    this.camera.rotation.x=this.pitch;
  }

  tryJump(){
    if(this.onGround){
      this.velocity.y=this.jumpVelocity;
      this.onGround=false;
    }
  }

  getForwardVector(){
    const dir=new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    dir.y=0; dir.normalize();
    return dir;
  }
  getRightVector(){
    const f=this.getForwardVector();
    return new THREE.Vector3(f.z,0,-f.x);
  }

  update(delta, interiorActive){
    const forward=this.getForwardVector();
    const right=this.getRightVector();

    let move=new THREE.Vector3();
    if(this.keys['KeyW'] || this.keys['ArrowUp']) move.addScaledVector(forward,1);
    if(this.keys['KeyS'] || this.keys['ArrowDown']) move.addScaledVector(forward,-1);
    if(this.keys['KeyA'] || this.keys['ArrowLeft']) move.addScaledVector(right,-1);
    if(this.keys['KeyD'] || this.keys['ArrowRight']) move.addScaledVector(right,1);

    if(move.lengthSq()>0) move.normalize();
    this.isRunning = !!this.keys['ShiftLeft'] || !!this.keys['ShiftRight'];

    const speed = this.isRunning? this.speedRun : this.speedWalk;
    // In interior, slower
    const effectiveSpeed = interiorActive? speed*0.7 : speed;

    // horizontal velocity
    const wishVel=move.multiplyScalar(effectiveSpeed);

    // Apply with lerp for smoothness
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, wishVel.x, 0.18);
    this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, wishVel.z, 0.18);

    // gravity
    if(!interiorActive){
      this.velocity.y += this.gravity*delta;
    } else {
      // interior floor is flat
      this.velocity.y = THREE.MathUtils.lerp(this.velocity.y, this.gravity*0.25, 0.1);
    }

    // integrate
    const nextPos=this.position.clone().addScaledVector(this.velocity, delta);

    // terrain collision only when not interior
    if(!interiorActive){
      const groundH=this.terrain.getHeightAt(nextPos.x, nextPos.z);
      const targetY=groundH+this.eyeHeight;
      if(nextPos.y < targetY){
        nextPos.y=targetY;
        this.velocity.y=0;
        this.onGround=true;
        this.lastGroundedY=targetY;
      } else {
        // check if close to ground
        if(Math.abs(nextPos.y - targetY) < 0.4 && this.velocity.y<=0){
          // snap slightly to prevent floating
          if(this.velocity.y<0 && nextPos.y < targetY+0.5) {
            // allow falling but not too far
          }
        }
        if(nextPos.y <= targetY+0.05 && this.velocity.y<=0) this.onGround=true; else this.onGround=false;
        // prevent sinking through terrain when walking down slopes: gradually lerp
        if(this.onGround) nextPos.y=THREE.MathUtils.lerp(nextPos.y, targetY, 0.35);
      }

      // building collision
      if(this.buildingSystem){
        const col=this.buildingSystem.checkCollision(nextPos, this.collisionRadius);
        if(col.hit){
          // simple slide: cancel horizontal velocity component into building
          // compute push direction from box center
          const box=col.box;
          const center=new THREE.Vector3((box.min.x+box.max.x)/2,0,(box.min.z+box.max.z)/2);
          const toPlayer=new THREE.Vector3(nextPos.x-center.x,0,nextPos.z-center.z);
          // if inside, push out along smallest overlap axis
          const sizeX=box.max.x-box.min.x, sizeZ=box.max.z-box.min.z;
          const overlapX=(sizeX/2+this.collisionRadius)-Math.abs(toPlayer.x);
          const overlapZ=(sizeZ/2+this.collisionRadius)-Math.abs(toPlayer.z);
          if(overlapX>0 && overlapZ>0){
            if(overlapX<overlapZ){
              nextPos.x += Math.sign(toPlayer.x)*overlapX+0.02;
              this.velocity.x=0;
            } else {
              nextPos.z += Math.sign(toPlayer.z)*overlapZ+0.02;
              this.velocity.z=0;
            }
          } else {
            // alternative: just cancel velocity
            this.velocity.x*=0.2; this.velocity.z*=0.2;
            // revert to previous position's horizontal
            nextPos.x=this.position.x;
            nextPos.z=this.position.z;
          }
        }
      }

      // water barrier (don't let player walk into canal water unless bridge)
      // simplified: if inside canal ribbon area, push out? We'll allow wading but slow
      // Could detect y ~0.4 water level and x near canal; for now just slow
      if(nextPos.y < 0.65){
        // near water
        this.velocity.x*=0.92; this.velocity.z*=0.92;
      }
    } else {
      // interior bounds: stay within room
      // building size interior: we let interior system clamp
      // simple: keep within ~4m radius from center
      const center=this.position; // we will clamp via exterior reference?
      // We'll assume interior room is ~7m wide; clamp locally
      // Use nextPos relative to interior center approximated as current building pos
      // For now just allow movement but keep y fixed to floor
      nextPos.y=THREE.MathUtils.clamp(nextPos.y, this.position.y-0.3, this.position.y+0.6);
      // keep y
      // simple wall collision: restrict to 3.2 radius from interior center
      // interior center is stored in interiorSystem; we can query active interior
      // For now clamp to building's interior via radius check
      // We'll do generic clamp: if distance from interior origin > 3.8, push back
      // This will be handled externally with interior bounds
    }

    this.position.copy(nextPos);
    // prevent falling through world
    if(this.position.y < -10) { this.position.y=8; this.velocity.set(0,0,0); }
    this.camera.position.copy(this.position);
    this.updateCameraRotation();
  }

  teleport(x,y,z){
    this.position.set(x,y,z);
    this.velocity.set(0,0,0);
    this.camera.position.copy(this.position);
  }

  getPosition(){ return this.position.clone(); }
}
