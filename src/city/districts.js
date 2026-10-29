import * as THREE from 'three';

/**
 * City Districts - Organized urban planning system
 * Each district defines a rectified grid for streets and aligned building blocks
 */

export const DISTRICTS = {
  roma_centro: {
    id: 'roma_centro',
    region: 'roma',
    center: { x: 180, z: -8 },
    size: { w: 210, d: 160 },
    grid: { cols: 6, rows: 4, blockW: 26, blockD: 22, streetW: 7 },
    style: 'roman'
  },
  venezia_isole: {
    id: 'venezia_isole',
    region: 'venezia',
    center: { x: 18, z: -88 },
    size: { w: 160, d: 130 },
    grid: { cols: 4, rows: 3, blockW: 22, blockD: 18, streetW: 5 },
    style: 'venetian'
  },
  firenze_centro: {
    id: 'firenze_centro',
    region: 'firenze',
    center: { x: -62, z: -142 },
    size: { w: 170, d: 140 },
    grid: { cols: 4, rows: 3, blockW: 24, blockD: 20, streetW: 6 },
    style: 'renaissance'
  },
  milano_centro: {
    id: 'milano_centro',
    region: 'milano',
    center: { x: -238, z: -395 },
    size: { w: 180, d: 150 },
    grid: { cols: 4, rows: 3, blockW: 26, blockD: 22, streetW: 8 },
    style: 'modern'
  },
  bologna_portici: {
    id: 'bologna_portici',
    region: 'bologna',
    center: { x: -28, z: -285 },
    size: { w: 120, d: 90 },
    grid: { cols: 3, rows: 2, blockW: 22, blockD: 18, streetW: 6 },
    style: 'portico'
  },
  napoli_lungomare: {
    id: 'napoli_lungomare',
    region: 'napoli',
    center: { x: 320, z: 175 },
    size: { w: 160, d: 110 },
    grid: { cols: 4, rows: 2, blockW: 24, blockD: 18, streetW: 7 },
    style: 'mediterranean'
  },
  genova_porto: {
    id: 'genova_porto',
    region: 'genova',
    center: { x: -340, z: -235 },
    size: { w: 110, d: 90 },
    grid: { cols: 3, rows: 2, blockW: 20, blockD: 16, streetW: 6 },
    style: 'harbor'
  }
};

export class DistrictSystem {
  constructor(worldScene, terrain, roadSystem, buildingSystem) {
    this.worldScene = worldScene;
    this.terrain = terrain;
    this.roads = roadSystem;
    this.buildings = buildingSystem;
  }

  generateAll() {
    Object.values(DISTRICTS).forEach(d => this.generateDistrict(d));
  }

  generateDistrict(district) {
    const { center, grid } = district;
    const halfW = grid.cols * (grid.blockW + grid.streetW) / 2;
    const halfD = grid.rows * (grid.blockD + grid.streetW) / 2;

    // Create street grid
    for (let c = 0; c <= grid.cols; c++) {
      const x = center.x - halfW + c * (grid.blockW + grid.streetW) + grid.streetW / 2;
      if (c === 0 || c === grid.cols) continue; // outer handled by main roads
      this.createStreetSegment(
        { x, z: center.z - halfD },
        { x, z: center.z + halfD },
        grid.streetW
      );
    }
    for (let r = 0; r <= grid.rows; r++) {
      const z = center.z - halfD + r * (grid.blockD + grid.streetW) + grid.streetW / 2;
      if (r === 0 || r === grid.rows) continue;
      this.createStreetSegment(
        { x: center.x - halfW, z },
        { x: center.x + halfW, z },
        grid.streetW
      );
    }

    // Mark district bounds for building system to align
    this.worldScene.userData = this.worldScene.userData || {};
    this.worldScene.userData.districts = this.worldScene.userData.districts || [];
    this.worldScene.userData.districts.push(district);
  }

  createStreetSegment(a, b, width) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(a.x, 0, a.z),
      new THREE.Vector3(b.x, 0, b.z)
    ]);
    const mat = new THREE.MeshStandardMaterial({ color: 0x1e2127, roughness: 0.96 });
    const mesh = this.roads.createRoadMesh(curve, width, mat);
    this.roads.group.add(mesh);
    this.roads.createSidewalkPair(curve, width, 1.8);
  }
}
