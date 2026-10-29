import * as THREE from 'three';

export class WorldScene {
  constructor(renderer){
    this.renderer = renderer;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87b6d8);
    this.scene.fog = new THREE.FogExp2(0xc9d8e8, 0.0007);

    // Sky dome gradient via custom shader
    this.skyGeo = new THREE.SphereGeometry(4000, 32, 15);
    this.skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: new THREE.Color(0x1a2a4a) },
        bottomColor: { value: new THREE.Color(0x87b6d8) },
        offset: { value: 400 },
        exponent: { value: 0.7 },
        sunPosition: { value: new THREE.Vector3(500, 800, 200) },
        sunColor: { value: new THREE.Color(0xfff1c1) },
        time: { value: 12 }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main(){
          vec4 worldPos = modelMatrix * vec4(position,1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        uniform vec3 sunPosition;
        uniform vec3 sunColor;
        varying vec3 vWorldPosition;
        void main(){
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          float f = max(pow(max(h,0.0), exponent), 0.0);
          vec3 col = mix(bottomColor, topColor, f);
          // horizon glow
          float horizon = pow(1.0 - max(h,0.0), 3.0) * 0.35;
          col += vec3(1.0,0.9,0.7) * horizon;
          // sun disc approximated
          vec3 sunDir = normalize(sunPosition);
          vec3 viewDir = normalize(vWorldPosition);
          float sun = pow(max(dot(viewDir, sunDir),0.0), 420.0) * 2.5;
          col += sun * sunColor;
          // subtle stars at night via h based on time uniform
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    this.sky = new THREE.Mesh(this.skyGeo, this.skyMat);
    this.scene.add(this.sky);

    // Stars dome (only visible at night)
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const pos = new Float32Array(starCount*3);
    for(let i=0;i<starCount;i++){
      const theta = Math.random()*Math.PI*2;
      const phi = Math.acos(2*Math.random()-1);
      const r = 3500;
      pos[i*3] = r*Math.sin(phi)*Math.cos(theta);
      pos[i*3+1]= r*Math.cos(phi)*0.9 + 300;
      pos[i*3+2]= r*Math.sin(phi)*Math.sin(theta);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos,3));
    const starMat = new THREE.PointsMaterial({ color:0xffffff, size:3.2, sizeAttenuation:false, transparent:true, opacity:0, depthWrite:false });
    this.stars = new THREE.Points(starGeo, starMat);
    this.scene.add(this.stars);

    // Lights
    this.sun = new THREE.DirectionalLight(0xfff6e0, 2.2);
    this.sun.position.set(600, 900, 300);
    this.sun.castShadow = true;
    // PERFORMANCE: sombra baixa = +30 FPS no modo olho
    this.sun.shadow.mapSize.set(512,512);
    this.sun.shadow.camera.near=1; this.sun.shadow.camera.far=1400;
    this.sun.shadow.camera.left=-400; this.sun.shadow.camera.right=400; this.sun.shadow.camera.top=400; this.sun.shadow.camera.bottom=-400;
    this.sun.shadow.bias = -0.001;
    this.sun.shadow.autoUpdate = true;
    this.scene.add(this.sun);
    this.sunTarget = new THREE.Object3D(); this.sunTarget.position.set(0,0,0); this.scene.add(this.sunTarget);
    this.sun.target = this.sunTarget;

    this.ambient = new THREE.HemisphereLight(0x8fb3d8, 0x3a2a1a, 0.65);
    this.scene.add(this.ambient);

    // Moon
    this.moon = new THREE.DirectionalLight(0x9bb0ff, 0.0);
    this.moon.position.set(-600, 500, -300);
    this.scene.add(this.moon);

    // Groups for streaming
    this.worldRoot = new THREE.Group();
    this.scene.add(this.worldRoot);
    this.buildingGroup = new THREE.Group(); this.worldRoot.add(this.buildingGroup);
    this.terrainGroup = new THREE.Group(); this.worldRoot.add(this.terrainGroup);
    this.waterGroup = new THREE.Group(); this.worldRoot.add(this.waterGroup);
    this.vegetationGroup = new THREE.Group(); this.worldRoot.add(this.vegetationGroup);
    this.streetGroup = new THREE.Group(); this.worldRoot.add(this.streetGroup);
    this.interiorGroup = new THREE.Group(); this.worldRoot.add(this.interiorGroup);
    this.npcGroup = new THREE.Group(); this.worldRoot.add(this.npcGroup);
    this.propGroup = new THREE.Group(); this.worldRoot.add(this.propGroup);

    // Environment reflection probe approximated with cube camera placeholder
    this.envLightIntensity = 1.0;
  }

  updateSky(timeHours, weather='clear'){
    // time 0-24, 12 = noon
    const t = timeHours;
    // sun orbit: altitude and azimuth
    const solarNoon = 12;
    const hourAngle = ((t - solarNoon)/12)*Math.PI; // -pi to pi
    const declination = THREE.MathUtils.degToRad(18); // summer-ish
    const alt = Math.sin(declination)*Math.sin(THREE.MathUtils.degToRad(41)) + Math.cos(declination)*Math.cos(THREE.MathUtils.degToRad(41))*Math.cos(hourAngle);
    // Actually altitude computed simpler: lerp between -0.35 night and 0.95 noon via cos
    const altitudeFactor = Math.cos(hourAngle); // 1 at noon, -1 midnight
    const altitude01 = (altitudeFactor +1)/2; // 0..1
    // sun position
    const sunDist = 2500;
    const sunX = Math.sin(hourAngle)*sunDist*0.85;
    const sunY = Math.max(-300, altitudeFactor*900 + 120);
    const sunZ = Math.cos(hourAngle)*sunDist*0.45;

    this.sun.position.set(sunX, sunY, sunZ);
    this.moon.position.set(-sunX, -sunY+600, -sunZ);
    this.skyMat.uniforms.sunPosition.value.copy(this.sun.position);
    this.skyMat.uniforms.time.value = t;

    // sun intensity & color
    const dayFactor = THREE.MathUtils.clamp((sunY+200)/900, 0,1);
    // dayFactor = 0 night, 1 noon
    const sunIntensity = THREE.MathUtils.lerp(0, 2.4, Math.pow(dayFactor,0.9));
    this.sun.intensity = sunIntensity;
    this.moon.intensity = (1-dayFactor)*0.35;

    // sun color shift at sunrise/sunset
    const warm = new THREE.Color(0xff8a4a);
    const noonCol = new THREE.Color(0xfff6e0);
    const sunCol = new THREE.Color().lerpColors(warm, noonCol, Math.pow(dayFactor,0.7));
    this.sun.color.copy(sunCol);
    this.skyMat.uniforms.sunColor.value.copy(sunCol);

    // sky colors
    let top, bottom, fogCol, ambientInt;
    if(dayFactor > 0.15){
      // day
      const dawnFactor = THREE.MathUtils.clamp((dayFactor-0.15)/0.3,0,1);
      const dawnTop = new THREE.Color(0x2a3a5c);
      const dayTop = new THREE.Color(0x1a2a4a);
      top = new THREE.Color().lerpColors(dawnTop, dayTop, dawnFactor);
      const dawnBot = new THREE.Color(0xffb86a);
      const dayBot = new THREE.Color(0x87b6d8);
      bottom = new THREE.Color().lerpColors(dawnBot, dayBot, dawnFactor);
      fogCol = new THREE.Color().lerpColors(new THREE.Color(0xd6a88a), new THREE.Color(0xc9d8e8), dawnFactor);
      ambientInt = THREE.MathUtils.lerp(0.35,0.75, dayFactor);
    } else {
      // night / twilight
      const nightTop = new THREE.Color(0x020616);
      const twiTop = new THREE.Color(0x1a2a4a);
      const blend = THREE.MathUtils.clamp((dayFactor)/0.15,0,1);
      top = new THREE.Color().lerpColors(nightTop, twiTop, blend);
      const nightBot = new THREE.Color(0x0a1020);
      const twiBot = new THREE.Color(0x3a2a4a);
      bottom = new THREE.Color().lerpColors(nightBot, twiBot, blend);
      fogCol = new THREE.Color().lerpColors(new THREE.Color(0x0a1420), new THREE.Color(0x2a3a5c), blend);
      ambientInt = THREE.MathUtils.lerp(0.18,0.35, blend);
    }

    // weather modifies
    if(weather==='overcast'){ top.lerp(new THREE.Color(0x6a768a),0.35); bottom.lerp(new THREE.Color(0xa0a8b8),0.35); fogCol.lerp(new THREE.Color(0x9aa8b8),0.2); this.sun.intensity*=0.45; }
    if(weather==='rain'){ top.lerp(new THREE.Color(0x4a5568),0.35); bottom.lerp(new THREE.Color(0x8a94a8),0.45); }
    if(weather==='fog'){ fogCol = new THREE.Color(0xd8dde3); this.scene.fog = new THREE.FogExp2(fogCol, 0.0022); } else {
      const fogDensity = THREE.MathUtils.lerp(0.0012, 0.0005, dayFactor);
      this.scene.fog = new THREE.FogExp2(fogCol, weather==='overcast'?0.001: fogDensity);
    }

    this.skyMat.uniforms.topColor.value.copy(top);
    this.skyMat.uniforms.bottomColor.value.copy(bottom);
    // ambient
    this.ambient.color.copy(bottom);
    this.ambient.groundColor.copy(fogCol);
    this.ambient.intensity = ambientInt;

    // stars opacity
    const nightNess = 1 - dayFactor;
    this.stars.material.opacity = THREE.MathUtils.clamp((nightNess-0.4)/0.6,0,1) * (weather==='clear'?1:0.25);
    if(weather==='fog') this.stars.material.opacity*=0.1;

    // renderer exposure tweak
    if(this.renderer){
      this.renderer.toneMappingExposure = THREE.MathUtils.lerp(0.65, 1.05, dayFactor);
    }

    return { sunY, dayFactor, fogCol };
  }
}
