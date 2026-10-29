import * as THREE from 'three';
import { Noise } from '../utils/noise.js';

export class TerrainSystem {
  constructor(worldScene){
    this.worldScene = worldScene;
    this.noise = new Noise(42);
    this.group = worldScene.terrainGroup;
    this.tiles = [];
    this.heightCache = new Map();
    this.cacheHits=0; this.cacheMiss=0;
  }

  // Pure function replicating generation math - ultra-fast, no raycast
  computeHeight(x,z){
    const size = 2000;
    const nx = x/size + 0.5;
    const nz = z/size + 0.5;

    const northFactor = Math.pow(Math.max(0, (nz < 0.35 ? (0.35 - nz)/0.35 : 0)), 1.2);
    const hillFactor = Math.exp(-Math.pow((nz-0.55)/0.22,2)) * 0.6;
    const coastFactor = nz > 0.85 ? (nz-0.85)/0.15 : 0;

    const n1 = this.noise.fbm(x*0.0012, z*0.0012, 4, 2.1, 0.5) * 35;
    const n2 = this.noise.fbm(x*0.003, z*0.003, 3, 2, 0.5) * 8;
    const ridge = this.noise.ridge(x*0.0008, z*0.0008) * 12;

    let h = 0;
    h += n1 * (0.5 + hillFactor*0.8 + northFactor*1.2);
    h += n2 * 0.5;
    h += ridge * hillFactor;

    if(nz < 0.28){
      const peakNoise = this.noise.fbm(x*0.002 + 100, z*0.002, 5,2,0.5);
      h += northFactor * (120 + peakNoise*60);
      h += northFactor * Math.pow(Math.abs(this.noise.perlin2(x*0.001, z*0.001)), 0.6)*80;
    }
    if(nz >0.35 && nz <0.75){
      const tuscan = this.noise.fbm(x*0.0009+50, z*0.0009, 4,2,0.5);
      h += hillFactor * tuscan * 45;
      const valley = Math.sin(x*0.004 + Math.cos(z*0.002)*2) * 6 * hillFactor;
      h+= valley;
    }
    if(nz >0.82){
      h = THREE.MathUtils.lerp(h, -2 + Math.sin(x*0.01)*0.5, coastFactor*0.85);
    }
    const riverDist = Math.abs((x*0.3 + z) - 200)/900;
    if(riverDist <0.12 && nz>0.3 && nz<0.62){
      h -= (0.12 - riverDist)/0.12 * 8;
    }
    h += (nz-0.5)*4;
    return h;
  }

  getHeightAt(x,z){
    // quantized cache to avoid recomputing same spot many times (player stays near)
    const key = (Math.round(x*2)/2).toFixed(1)+':'+(Math.round(z*2)/2).toFixed(1);
    if(this.heightCache.has(key)) { this.cacheHits++; return this.heightCache.get(key); }
    const h = this.computeHeight(x,z);
    // LRU: keep max 4000 entries
    if(this.heightCache.size>4000) {
      const firstKey=this.heightCache.keys().next().value;
      this.heightCache.delete(firstKey);
    }
    this.heightCache.set(key,h);
    this.cacheMiss++;
    return h;
  }

  generate(){
    const size = 2000;
    const segments = 100; // PERFORMANCE HOTFIX: 100 = 10201 verts, -60% lag (era 150)
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI/2);

    const pos = geo.attributes.position;

    for(let i=0;i<pos.count;i++){
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = this.computeHeight(x,z);
      pos.setY(i, h);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const rockyMat = this.createTerrainMaterial();

    const mesh = new THREE.Mesh(geo, rockyMat);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    mesh.name = 'Terrain_Main';
    this.group.add(mesh);
    this.mesh = mesh;

    this.createSea();
    this.createLakes();

    // Pre-warm cache for spawn area to avoid first-frame stall
    for(let dx=-30; dx<=30; dx+=5) for(let dz=-30; dz<=30; dz+=5) this.getHeightAt(dx,dz);

    return mesh;
  }

  createTerrainMaterial(){
    const canvasGrass = document.createElement('canvas'); canvasGrass.width=256; canvasGrass.height=256;
    const g = canvasGrass.getContext('2d');
    g.fillStyle='#6b8c42'; g.fillRect(0,0,256,256);
    for(let i=0;i<2000;i++){ g.fillStyle=`rgba(${60+Math.random()*20},${110+Math.random()*30},${40+Math.random()*20},0.15)`; g.fillRect(Math.random()*256,Math.random()*256,2,2); }
    const texGrass = new THREE.CanvasTexture(canvasGrass); texGrass.wrapS=texGrass.wrapT=THREE.RepeatWrapping; texGrass.repeat.set(28,28); texGrass.anisotropy=4;

    const canvasRock = document.createElement('canvas'); canvasRock.width=256; canvasRock.height=256;
    const cr = canvasRock.getContext('2d'); cr.fillStyle='#9a9a95'; cr.fillRect(0,0,256,256);
    for(let i=0;i<2000;i++){ cr.fillStyle=`rgba(0,0,0,${Math.random()*0.08})`; cr.fillRect(Math.random()*256,Math.random()*256,1,1); }
    const texRock = new THREE.CanvasTexture(canvasRock); texRock.wrapS=texRock.wrapT=THREE.RepeatWrapping; texRock.repeat.set(18,18);

    const canvasSoil = document.createElement('canvas'); canvasSoil.width=256; canvasSoil.height=256;
    const cs = canvasSoil.getContext('2d'); cs.fillStyle='#8a6a42'; cs.fillRect(0,0,256,256);
    for(let i=0;i<1500;i++){ cs.fillStyle=`rgba(40,30,20,0.07)`; cs.fillRect(Math.random()*256,Math.random()*256,2,1); }
    const texSoil = new THREE.CanvasTexture(canvasSoil); texSoil.wrapS=texSoil.wrapT=THREE.RepeatWrapping; texSoil.repeat.set(20,20);

    const mat = new THREE.MeshStandardMaterial({
      map: texGrass,
      roughness:0.95,
      metalness:0,
    });

    mat.onBeforeCompile = (shader)=>{
      shader.uniforms.texRock = { value: texRock };
      shader.uniforms.texSoil = { value: texSoil };
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>
         varying float vHeight;
         varying vec3 vNw;
        `
      ).replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vHeight = position.y;
         vNw = normal;
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
         uniform sampler2D texRock;
         uniform sampler2D texSoil;
         varying float vHeight;
         varying vec3 vNw;
        `
      ).replace(
        '#include <map_fragment>',
        `
          float slope = 1.0 - dot(vNw, vec3(0.0,1.0,0.0));
          vec4 grass = texture2D(map, vUv * 1.0);
          vec4 rock = texture2D(texRock, vUv * 1.0);
          vec4 soil = texture2D(texSoil, vUv * 1.0);
          float h = vHeight;
          float rockBlend = smoothstep(55.0, 95.0, h) + slope*0.9;
          rockBlend = clamp(rockBlend,0.0,1.0);
          float soilBlend = smoothstep(18.0, 35.0, h) * (1.0-rockBlend) * 0.5;
          vec4 base = mix(grass, soil, soilBlend);
          base = mix(base, rock, rockBlend);
          base.rgb += (rockBlend*0.04);
          diffuseColor *= base;
        `
      );
    };
    return mat;
  }

  createSea(){
    const seaGeo = new THREE.PlaneGeometry(3000, 900, 1,1);
    seaGeo.rotateX(-Math.PI/2);
    const seaMat = new THREE.MeshStandardMaterial({ color:0x0e3a52, roughness:0.15, metalness:0.1, transparent:true, opacity:0.98 });
    const sea = new THREE.Mesh(seaGeo, seaMat);
    sea.position.set(0, -2.2, 1050);
    this.group.add(sea);
    const beachGeo = new THREE.PlaneGeometry(3000, 120, 1,1); beachGeo.rotateX(-Math.PI/2);
    const beachCan = document.createElement('canvas'); beachCan.width=256; beachCan.height=256;
    const bctx=beachCan.getContext('2d'); bctx.fillStyle='#d8c9a0'; bctx.fillRect(0,0,256,256);
    for(let i=0;i<1000;i++){ bctx.fillStyle=`rgba(0,0,0,0.06)`; bctx.fillRect(Math.random()*256,Math.random()*256,1,1); }
    const beachTex=new THREE.CanvasTexture(beachCan); beachTex.wrapS=beachTex.wrapT=THREE.RepeatWrapping; beachTex.repeat.set(12,2);
    const beachMat=new THREE.MeshStandardMaterial({ map:beachTex, roughness:0.95});
    const beach=new THREE.Mesh(beachGeo, beachMat);
    beach.position.set(0,-1.0, 980);
    beach.receiveShadow=true;
    this.group.add(beach);
  }

  createLakes(){
    const lakeGeo = new THREE.CircleGeometry(120, 24);
    lakeGeo.rotateX(-Math.PI/2);
    const lakeMat = new THREE.MeshStandardMaterial({ color:0x123a5a, roughness:0.18, metalness:0.15, transparent:true, opacity:0.95 });
    const lake = new THREE.Mesh(lakeGeo, lakeMat);
    lake.position.set(-420, 2.5, -480);
    lake.scale.set(1.4,1,0.8);
    this.group.add(lake);
    const lake2 = lake.clone();
    lake2.position.set(380, 3.0, -520); lake2.scale.set(1.1,1,1.3);
    this.group.add(lake2);
  }
}
