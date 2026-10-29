import * as THREE from 'three';

/**
 * ============================================================================
 * MOUNTAINS — Organized Alpine System (Ruas | Casas | Montanhas)
 * Focus: Dolomiti peaks + Apennine ridge + forested foothills
 * ============================================================================
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
    this.createFoothillForests();
  }

  // ---------------------------------------------------------------------------
  // DOLOMITI: 10 sharp spires with correct geology (Tre Cime, Marmolada style)
  // ---------------------------------------------------------------------------
  createDolomitiPeaks() {
    const peaks = [
      { x: -90, z: -680, h: 95, r: 48, type: 'tre_cime' },
      { x: 20, z: -730, h: 120, r: 58, type: 'marmolada' },
      { x: 95, z: -690, h: 88, r: 46, type: 'pale' },
      { x: -145, z: -750, h: 78, r: 40, type: 'pale' },
      { x: 65, z: -640, h: 72, r: 44, type: 'tre_cime' },
      { x: -30, z: -610, h: 58, r: 36, type: 'foothill' },
      { x: 140, z: -720, h: 65, r: 38, type: 'pale' },
      { x: -60, z: -760, h: 82, r: 42, type: 'tre_cime' },
      { x: 0, z: -660, h: 60, r: 34, type: 'foothill' },
      { x: 110, z: -660, h: 55, r: 32, type: 'foothill' },
    ];

    peaks.forEach(p => {
      const baseY = this.terrain.computeHeight(p.x, p.z);
      
      // Main peak - Dolomite limestone
      const coneGeo = new THREE.ConeGeometry(p.r * 0.7, p.h, p.type === 'tre_cime' ? 4 : 12);
      if (p.type === 'tre_cime') coneGeo.scale(1, 1, 0.75); // Dolomite walls are vertical
      
      const isHigh = p.h > 85;
      const mat = new THREE.MeshStandardMaterial({
        color: isHigh ? 0xe0e2e5 : p.type === 'foothill' ? 0xb8a89a : 0xd4c9b8,
        roughness: 0.88,
        flatShading: p.type === 'tre_cime'
      });
      
      const mesh = new THREE.Mesh(coneGeo, mat);
      mesh.position.set(p.x, baseY + p.h * 0.45, p.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      if (p.type === 'tre_cime') mesh.rotation.y = Math.random() * Math.PI * 0.25;
      this.group.add(mesh);

      // Snow cap for high peaks
      if (p.h > 80) {
        const snowH = p.h * 0.18;
        const snowGeo = new THREE.ConeGeometry(p.r * 0.32, snowH, 8);
        const snowMat = new THREE.MeshStandardMaterial({ 
          color: 0xffffff, 
          roughness: 0.4,
          metalness: 0.02
        });
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(p.x, baseY + p.h * 0.92, p.z);
        this.group.add(snow);
      }

      // Cliff walls - Dolomite vertical faces
      if (p.type !== 'foothill') {
        const cliffH = 24 + Math.random() * 8;
        const cliffGeo = new THREE.CylinderGeometry(p.r * 0.88, p.r * 0.95, cliffH, 12, 1, true);
        const cliffMat = new THREE.MeshStandardMaterial({ 
          color: 0xa89a8a, 
          roughness: 0.92, 
          side: THREE.DoubleSide 
        });
        const cliff = new THREE.Mesh(cliffGeo, cliffMat);
        cliff.position.set(p.x, baseY + 10, p.z);
        this.group.add(cliff);
      }

      // Secondary spires for Tre Cime realism
      if (p.type === 'tre_cime' && p.h > 70) {
        for (let i = 0; i < 2; i++) {
          const sx = p.x + (Math.random() - 0.5) * 18;
          const sz = p.z + (Math.random() - 0.5) * 18;
          const sh = p.h * (0.55 + Math.random() * 0.15);
          const sr = p.r * 0.4;
          const sGeo = new THREE.ConeGeometry(sr * 0.6, sh * 0.7, 6);
          const sMat = new THREE.MeshStandardMaterial({ color: 0xc9b8a5, roughness: 0.9 });
          const sMesh = new THREE.Mesh(sGeo, sMat);
          const sY = this.terrain.computeHeight(sx, sz);
          sMesh.position.set(sx, sY + sh * 0.4, sz);
          this.group.add(sMesh);
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // APENNINE: Tuscany-Emilia gentle ridge (casas + ruas foothill transition)
  // ---------------------------------------------------------------------------
  createApennineRidge() {
    const ridgePoints = [
      { x: -140, z: -180, s: 32 },
      { x: -100, z: -280, s: 36 },
      { x: -55, z: -360, s: 38 },
      { x: -20, z: -480, s: 34 },
      { x: 35, z: -580, s: 30 },
      { x: 75, z: -620, s: 26 },
    ];
    
    ridgePoints.forEach(pt => {
      const h = this.terrain.computeHeight(pt.x, pt.z);
      const hillGeo = new THREE.SphereGeometry(pt.s, 12, 8);
      hillGeo.scale(1, 0.38, 1);
      const hillMat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color().setHSL(0.22, 0.18, 0.45 + Math.random() * 0.05),
        roughness: 0.95 
      });
      const hill = new THREE.Mesh(hillGeo, hillMat);
      hill.position.set(pt.x, h + 5, pt.z);
      hill.receiveShadow = true;
      this.group.add(hill);
      
      // Forested cap
      const forestGeo = new THREE.SphereGeometry(pt.s * 0.7, 8, 6);
      forestGeo.scale(1, 0.35, 1);
      const forestMat = new THREE.MeshStandardMaterial({ color: 0x3a5a2a, roughness: 0.95 });
      const forest = new THREE.Mesh(forestGeo, forestMat);
      forest.position.set(pt.x, h + 12, pt.z);
      this.group.add(forest);
    });
  }

  // ---------------------------------------------------------------------------
  // FOOTHILL FORESTS: transition between montanhas and casas
  // ---------------------------------------------------------------------------
  createFoothillForests() {
    // Add tree clusters at mountain base
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 400 - 20;
      const z = -580 + Math.random() * -180;
      const y = this.terrain.getHeightAt(x, z);
      if (y > 45) continue; // don't place on peaks
      
      const cluster = new THREE.Group();
      const count = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < count; j++) {
        const ox = (Math.random() - 0.5) * 8;
        const oz = (Math.random() - 0.5) * 8;
        const treeGeo = new THREE.ConeGeometry(1.2 + Math.random() * 0.6, 6 + Math.random() * 4, 7);
        const treeMat = new THREE.MeshStandardMaterial({ color: 0x1a3a1e, roughness: 0.9 });
        const tree = new THREE.Mesh(treeGeo, treeMat);
        tree.position.set(ox, 3, oz);
        tree.castShadow = true;
        cluster.add(tree);
      }
      cluster.position.set(x, y + 0.1, z);
      this.group.add(cluster);
    }
  }
}
