import * as THREE from 'three';

/**
 * Dolomiti Mountain System - Dedicated high-quality peaks
 * Organized module for alpine terrain
 */
export class MountainSystem {
  constructor(worldScene, terrain) {
    this.worldScene = worldScene;
    this.terrain = terrain;
    this.group = worldScene.terrainGroup;
    this.noise = terrain.noise;
  }

  generate() {
    this.createDolomitiPeaks();
    this.createApennineRidge();
  }

  createDolomitiPeaks() {
    // 6 major Dolomiti spires around 0,-700
    const peaks = [
      { x: -80, z: -680, h: 85, r: 45, sharp: 1.0 },
      { x: 20, z: -730, h: 110, r: 55, sharp: 1.2 },
      { x: 90, z: -690, h: 95, r: 48, sharp: 1.0 },
      { x: -140, z: -750, h: 75, r: 38, sharp: 0.9 },
      { x: 60, z: -640, h: 70, r: 42, sharp: 0.85 },
      { x: -30, z: -610, h: 55, r: 35, sharp: 0.7 },
    ];

    peaks.forEach(p => {
      const coneGeo = new THREE.ConeGeometry(p.r * 0.65, p.h, 12);
      const peakY = this.terrain.computeHeight(p.x, p.z);
      const mat = new THREE.MeshStandardMaterial({
        color: p.h > 90 ? 0xe8e8e8 : 0xc9c9c9,
        roughness: 0.85,
        flatShading: false
      });
      const mesh = new THREE.Mesh(coneGeo, mat);
      mesh.position.set(p.x, peakY + p.h * 0.42, p.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.group.add(mesh);

      // snow cap
      if (p.h > 85) {
        const snowGeo = new THREE.ConeGeometry(p.r * 0.28, 14, 10);
        const snowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(p.x, peakY + p.h * 0.92, p.z);
        this.group.add(snow);
      }

      // cliff walls at base
      const cliffGeo = new THREE.CylinderGeometry(p.r * 0.85, p.r * 0.9, 22, 10, 1, true);
      const cliffMat = new THREE.MeshStandardMaterial({ color: 0x9a8a7a, roughness: 0.9, side: THREE.DoubleSide });
      const cliff = new THREE.Mesh(cliffGeo, cliffMat);
      cliff.position.set(p.x, peakY + 8, p.z);
      this.group.add(cliff);
    });
  }

  createApennineRidge() {
    // Apennine ridge Tuscan-Emilian
    const ridgePoints = [
      { x: -120, z: -200 }, { x: -80, z: -350 }, { x: -20, z: -480 }, { x: 40, z: -580 }
    ];
    ridgePoints.forEach(pt => {
      const h = this.terrain.computeHeight(pt.x, pt.z);
      const hillGeo = new THREE.SphereGeometry(28, 10, 8);
      hillGeo.scale(1, 0.45, 1);
      const hillMat = new THREE.MeshStandardMaterial({ color: 0x8a9a6a, roughness: 0.95 });
      const hill = new THREE.Mesh(hillGeo, hillMat);
      hill.position.set(pt.x, h + 6, pt.z);
      this.group.add(hill);
    });
  }
}
