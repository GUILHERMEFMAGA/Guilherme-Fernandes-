import * as THREE from 'three';
import { Noise } from '../utils/noise.js';
import { getPBR } from '../materials/pbr.js';

export class TerrainSystem {
  constructor(worldScene){
    this.worldScene = worldScene;
    this.noise = new Noise(42);
    this.group = worldScene.terrainGroup;
    this.tiles = [];
  }

  generate(){
    // Create large ground plane with vertex displacement representing Italy's varied geography
    // We'll make several zones: Po Valley flat, Tuscan hills, Alpine mountains, coastal
    // For vertical slice, we make a 2000x2000 terrain with height variation

    const size = 2000;
    const segments = 220;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI/2);

    const pos = geo.attributes.position;
    const colors = [];
    const uv2 = [];

    for(let i=0;i<pos.count;i++){
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // normalized -1000..1000 -> 0..1
      const nx = x/size + 0.5;
      const nz = z/size + 0.5;

      // Define zones: north = Dolomites high, center = Tuscan hills, south = flat + coast, west = gentle
      let h = 0;
      // base continent slope: north high
      const northFactor = Math.pow(Math.max(0, (nz < 0.35 ? (0.35 - nz)/0.35 : 0)), 1.2); // 0..1 in north band
      const hillFactor = Math.exp(-Math.pow((nz-0.55)/0.22,2)) * 0.6; // tuscan hills central
      const coastFactor = nz > 0.85 ? (nz-0.85)/0.15 : 0;

      // fBm for detail
      const n1 = this.noise.fbm(x*0.0012, z*0.0012, 4, 2.1, 0.5) * 35;
      const n2 = this.noise.fbm(x*0.003, z*0.003, 3, 2, 0.5) * 8;
      const ridge = this.noise.ridge(x*0.0008, z*0.0008) * 12;

      h += n1 * (0.5 + hillFactor*0.8 + northFactor*1.2);
      h += n2 * 0.5;
      h += ridge * hillFactor;

      // Alpine peaks in far north: create dramatic mountains
      if(nz < 0.28){
        const peakNoise = this.noise.fbm(x*0.002 + 100, z*0.002, 5,2,0.5);
        h += northFactor * (120 + peakNoise*60);
        // sharp ridges
        h += northFactor * Math.pow(Math.abs(this.noise.perlin2(x*0.001, z*0.001)), 0.6)*80;
      }

      // tuscan rolling hills: smooth undulation
      if(nz >0.35 && nz <0.75){
        const tuscan = this.noise.fbm(x*0.0009+50, z*0.0009, 4,2,0.5);
        h += hillFactor * tuscan * 45;
        // gentle valleys
        const valley = Math.sin(x*0.004 + Math.cos(z*0.002)*2) * 6 * hillFactor;
        h+= valley;
      }

      // coast: slightly descending to sea level
      if(nz >0.82){
        h = THREE.MathUtils.lerp(h, -2 + Math.sin(x*0.01)*0.5, coastFactor*0.85);
      }

      // river valley Po diagonal
      const riverDist = Math.abs((x*0.3 + z) - 200)/900;
      if(riverDist <0.12 && nz>0.3 && nz<0.62){
        h -= (0.12 - riverDist)/0.12 * 8;
      }

      // Add overall slight slope for drainage
      h += (nz-0.5)*4;

      pos.setY(i, h);

      // vertex color for splatting debug (will use shader mix)
      // We'll store height for later material blending
      colors.push( h*0.02, northFactor, coastFactor);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    // Create material with triplanar-like splatting via onBeforeCompile
    const rockyMat = this.createTerrainMaterial();

    const mesh = new THREE.Mesh(geo, rockyMat);
    mesh.receiveShadow = true;
    mesh.castShadow = false;
    mesh.name = 'Terrain_Main';
    this.group.add(mesh);
    this.mesh = mesh;

    // Add border sea plane
    this.createSea();
    // Add lake Como/Garda in north area
    this.createLakes();

    return mesh;
  }

  createTerrainMaterial(){
    // Generate blended textures: grass, rock, soil
    const canvasGrass = document.createElement('canvas'); canvasGrass.width=512; canvasGrass.height=512;
    const g = canvasGrass.getContext('2d');
    g.fillStyle='#6b8c42'; g.fillRect(0,0,512,512);
    for(let i=0;i<5000;i++){ g.fillStyle=`rgba(${60+Math.random()*20},${110+Math.random()*30},${40+Math.random()*20},0.15)`; g.fillRect(Math.random()*512,Math.random()*512,2,2); }
    const texGrass = new THREE.CanvasTexture(canvasGrass); texGrass.wrapS=texGrass.wrapT=THREE.RepeatWrapping; texGrass.repeat.set(28,28);

    const canvasRock = document.createElement('canvas'); canvasRock.width=256; canvasRock.height=256;
    const cr = canvasRock.getContext('2d'); cr.fillStyle='#9a9a95'; cr.fillRect(0,0,256,256);
    for(let i=0;i<4000;i++){ cr.fillStyle=`rgba(0,0,0,${Math.random()*0.08})`; cr.fillRect(Math.random()*256,Math.random()*256,1,1); }
    const texRock = new THREE.CanvasTexture(canvasRock); texRock.wrapS=texRock.wrapT=THREE.RepeatWrapping; texRock.repeat.set(18,18);

    const canvasSoil = document.createElement('canvas'); canvasSoil.width=256; canvasSoil.height=256;
    const cs = canvasSoil.getContext('2d'); cs.fillStyle='#8a6a42'; cs.fillRect(0,0,256,256);
    for(let i=0;i<3000;i++){ cs.fillStyle=`rgba(40,30,20,0.07)`; cs.fillRect(Math.random()*256,Math.random()*256,2,1); }
    const texSoil = new THREE.CanvasTexture(canvasSoil); texSoil.wrapS=texSoil.wrapT=THREE.RepeatWrapping; texSoil.repeat.set(20,20);

    const mat = new THREE.MeshStandardMaterial({
      map: texGrass,
      roughness:0.95,
      metalness:0,
    });

    // Custom blending based on height and slope
    mat.onBeforeCompile = (shader)=>{
      shader.uniforms.texRock = { value: texRock };
      shader.uniforms.texSoil = { value: texSoil };
      shader.uniforms.texGrass = { value: texGrass };
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
         uniform sampler2D texGrass;
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
          // distance fade detail: add subtle variation
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
    // beach transition
    const beachGeo = new THREE.PlaneGeometry(3000, 120, 1,1); beachGeo.rotateX(-Math.PI/2);
    const beachCan = document.createElement('canvas'); beachCan.width=256; beachCan.height=256;
    const bctx=beachCan.getContext('2d'); bctx.fillStyle='#d8c9a0'; bctx.fillRect(0,0,256,256);
    for(let i=0;i<2000;i++){ bctx.fillStyle=`rgba(0,0,0,0.06)`; bctx.fillRect(Math.random()*256,Math.random()*256,1,1); }
    const beachTex=new THREE.CanvasTexture(beachCan); beachTex.wrapS=beachTex.wrapT=THREE.RepeatWrapping; beachTex.repeat.set(12,2);
    const beachMat=new THREE.MeshStandardMaterial({ map:beachTex, roughness:0.95});
    const beach=new THREE.Mesh(beachGeo, beachMat);
    beach.position.set(0,-1.0, 980);
    beach.receiveShadow=true;
    this.group.add(beach);
  }

  createLakes(){
    // Lake Como style in north-west
    const lakeGeo = new THREE.CircleGeometry(120, 32);
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

  getHeightAt(x,z){
    if(!this.mesh) return 0;
    // brute force via raycast is heavy; approximate via noise re-evaluation
    // For gameplay we will use mesh raycaster with prebuilt BVH-like simple sampling
    // Use a temporary raycaster
    const ray = new THREE.Raycaster(new THREE.Vector3(x, 500, z), new THREE.Vector3(0,-1,0));
    const hits = ray.intersectObject(this.mesh);
    if(hits.length) return hits[0].point.y;
    return 0;
  }
}
