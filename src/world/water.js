import * as THREE from 'three';

export class WaterSystem {
  constructor(worldScene){
    this.worldScene = worldScene;
    this.group = worldScene.waterGroup;
    this.waters = [];
  }

  create(){
    // Venetian canal network (central low area) + Arno river + fountains
    this.createCanalNetwork();
    this.createRiver();
    this.createFountain();
  }

  createCanalNetwork(){
    const waterMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        deepColor: { value: new THREE.Color(0x0a2a3a) },
        shallowColor: { value: new THREE.Color(0x2d6b5e) },
        sunDir: { value: new THREE.Vector3(0.5,0.8,0.2) },
        sunColor: { value: new THREE.Color(0xfff1c1) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorld;
        void main(){
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position,1.0);
          vWorld = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 deepColor;
        uniform vec3 shallowColor;
        uniform vec3 sunDir;
        uniform vec3 sunColor;
        varying vec2 vUv;
        varying vec3 vWorld;
        // simple 2D noise
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i+vec2(1.0,0.0));
          float c = hash(i+vec2(0.0,1.0));
          float d = hash(i+vec2(1.0,1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
        }
        void main(){
          vec2 uv = vUv * 6.0;
          float n1 = noise(uv + time*0.06);
          float n2 = noise(uv*1.7 - time*0.04);
          float wave = (n1*0.55 + n2*0.45);
          vec3 base = mix(deepColor, shallowColor, wave*0.6 + 0.2);
          // sun specular
          vec3 viewDir = normalize(cameraPosition - vWorld);
          vec3 halfDir = normalize(sunDir + viewDir);
          // fake normal from noise gradient
          float dX = noise(uv+vec2(0.05,0.0)) - noise(uv-vec2(0.05,0.0));
          float dY = noise(uv+vec2(0.0,0.05)) - noise(uv-vec2(0.0,0.05));
          vec3 N = normalize(vec3(dX*3.0, 1.0, dY*3.0));
          float spec = pow(max(dot(N, halfDir),0.0), 90.0) * 0.55;
          // fresnel
          float fres = pow(1.0 - max(dot(N, viewDir),0.0), 3.0) * 0.35;
          vec3 col = base + spec * sunColor + fres * vec3(0.6,0.8,1.0);
          // depth edge foam approximated by uv distance to border
          float edge = min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y));
          float foam = smoothstep(0.0, 0.08, edge) ;
          col = mix(vec3(0.85,0.9,0.88)*0.2, col, foam);
          gl_FragColor = vec4(col, 0.96);
        }
      `,
      transparent:true
    });

    // Main canal: S-shaped through Venice district (center)
    const canalPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-140, 0.4, -220),
      new THREE.Vector3(-60, 0.4, -160),
      new THREE.Vector3(30, 0.4, -120),
      new THREE.Vector3(90, 0.4, -60),
      new THREE.Vector3(60, 0.4, 20),
      new THREE.Vector3(-10, 0.4, 50),
    ]);
    const canalGeo = this.createRibbonFromCurve(canalPath, 22, 110);
    const canalMesh = new THREE.Mesh(canalGeo, waterMat);
    canalMesh.name='Canal_Grande';
    this.group.add(canalMesh);
    this.waters.push({ mesh: canalMesh, mat: waterMat });

    // Secondary canals grid
    for(let i=0;i<3;i++){
      const path2 = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-180 + i*70, 0.38, -90 + i*30),
        new THREE.Vector3(-100 + i*50, 0.38, -30 + i*20),
        new THREE.Vector3(-30 + i*40, 0.38, 40 + i*10),
      ]);
      const g2 = this.createRibbonFromCurve(path2, 10, 50);
      const m2 = new THREE.Mesh(g2, waterMat.clone());
      m2.material.uniforms = THREE.UniformsUtils.clone(waterMat.uniforms);
      this.group.add(m2);
      this.waters.push({ mesh:m2, mat:m2.material });
    }

    // Keep reference to update sunDir
    this.canalMat = waterMat;
  }

  createRibbonFromCurve(curve, width, segments){
    const pts = curve.getPoints(segments);
    const geo = new THREE.BufferGeometry();
    const verts=[], uvs=[], indices=[];
    for(let i=0;i<pts.length;i++){
      const p = pts[i];
      const tangent = i < pts.length-1 ? new THREE.Vector3().subVectors(pts[i+1], p).normalize() : new THREE.Vector3().subVectors(p, pts[i-1]).normalize();
      const left = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(width/2);
      const right = left.clone().negate();
      verts.push(p.x+left.x, p.y, p.z+left.z);
      verts.push(p.x+right.x, p.y, p.z+right.z);
      uvs.push(0, i/pts.length);
      uvs.push(1, i/pts.length);
      if(i<pts.length-1){
        const a = i*2, b=a+1, c=a+2, d=a+3;
        indices.push(a,b,c, b,d,c);
      }
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts,3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs,2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  createRiver(){
    // Arno-like river across Tuscan zone
    const riverPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-900, 0.6, 120),
      new THREE.Vector3(-500, 0.7, 100),
      new THREE.Vector3(-200, 0.7, 90),
      new THREE.Vector3(100, 0.65, 110),
      new THREE.Vector3(500, 0.6, 140),
      new THREE.Vector3(900, 0.55, 180),
    ]);
    const geo = this.createRibbonFromCurve(riverPath, 38, 120);
    const mat = this.canalMat.clone();
    mat.uniforms = THREE.UniformsUtils.clone(this.canalMat.uniforms);
    mat.uniforms.deepColor.value = new THREE.Color(0x0e2e1f);
    mat.uniforms.shallowColor.value = new THREE.Color(0x3a7a5a);
    const mesh = new THREE.Mesh(geo, mat);
    this.group.add(mesh);
    this.waters.push({ mesh, mat });
  }

  createFountain(){
    // Piazza fountain (Rome)
    const fountainGeo = new THREE.CylinderGeometry(8, 9, 0.8, 24);
    const fountainMat = new THREE.MeshStandardMaterial({ color:0xd8d0c0, roughness:0.7 });
    const fountain = new THREE.Mesh(fountainGeo, fountainMat);
    fountain.position.set(180, 1.2, -40);
    this.worldScene.streetGroup.add(fountain);
    const waterDisc = new THREE.CircleGeometry(7, 24);
    waterDisc.rotateX(-Math.PI/2);
    const wmat = this.canalMat.clone(); wmat.uniforms = THREE.UniformsUtils.clone(this.canalMat.uniforms);
    const wmesh = new THREE.Mesh(waterDisc, wmat);
    wmesh.position.set(0,0.5,0);
    fountain.add(wmesh);
    this.waters.push({ mesh:wmesh, mat:wmat });
  }

  update(time, sunDir, sunColor){
    this.waters.forEach(w=>{
      w.mat.uniforms.time.value = time*0.001;
      if(sunDir) w.mat.uniforms.sunDir.value.copy(sunDir);
      if(sunColor) w.mat.uniforms.sunColor.value.copy(sunColor);
    });
  }
}
