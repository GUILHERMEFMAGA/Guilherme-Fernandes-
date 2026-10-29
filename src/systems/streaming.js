import * as THREE from 'three';

// RECURSO AVANÇADO: Streaming + LOD + Occlusão para mundo grande
export class AdvancedStreaming {
  constructor(worldScene, terrain, buildings, vegetation, crowd){
    this.worldScene = worldScene;
    this.terrain = terrain;
    this.buildings = buildings;
    this.vegetation = vegetation;
    this.crowd = crowd;
    
    this.frame = 0;
    this.lastStreamingUpdate = 0;
    this.streamingInterval = 400;
    this.nearDistance = 380;
    this.farDistance = 650;
    this.detailDistance = 180;
    this.overviewFar = 950;
    this.isMoving = false;
    this.moveSpeed = 0;
    this.lastPos = new THREE.Vector3();
    this.visibilityCache = new Map();
    this.frustum = new THREE.Frustum();
    this.frustumMatrix = new THREE.Matrix4();
    this.stats = { visibleBuildings: 0, culled: 0, detailOn: 0 };
  }

  // Detecta se observador está em movimento rápido (causa travado)
  detectMovement(observer, delta){
    const dist = observer.position.distanceTo(this.lastPos);
    this.moveSpeed = dist / Math.max(delta, 0.016);
    this.isMoving = this.moveSpeed > 2.0;
    this.lastPos.copy(observer.position);
    return this.isMoving;
  }

  // Streaming principal - chamado a cada 400ms, NÃO todo frame
  updateStreaming(observer, camera){
    const now = performance.now();
    if(now - this.lastStreamingUpdate < this.streamingInterval) return;
    this.lastStreamingUpdate = now;
    
    // Atualiza frustum para culling avançado
    this.frustumMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.frustumMatrix);
    
    let visibleBuildings = 0;
    let culled = 0;
    let detailOn = 0;
    
    const obsPos = observer.position;
    // OPUS 5.5: adapta alcance à altitude (overview aéreo vê cidade inteira)
    const altitude = obsPos.y;
    // LOD agressivo em overview: vê longe mas sem detalhes (evita travar)
    const farNow = altitude > 90 ? this.overviewFar : (this.isMoving ? 480 : this.farDistance);
    const detailNow = altitude > 90 ? 110 : this.detailDistance;
    
    for(const b of this.buildings.buildings){
      if(!b.mesh) continue;
      const dist = Math.hypot(b.position.x - obsPos.x, b.position.z - obsPos.z);
      const isHero = b.hero;
      const shouldBeVisible = isHero ? (dist < 1200) : (dist < farNow);
      // Desativa frustum culling em overview para não esconder quarteirão atrás
      let inFrustum = true;
      if(shouldBeVisible && altitude < 120){
        const box = new THREE.Box3(
          new THREE.Vector3(b.position.x - b.size.w/2, b.position.y, b.position.z - b.size.d/2),
          new THREE.Vector3(b.position.x + b.size.w/2, b.position.y + b.size.h, b.position.z + b.size.d/2)
        );
        inFrustum = this.frustum.intersectsBox(box);
      }
      const reallyVisible = shouldBeVisible && inFrustum;
      if(b.mesh.visible !== reallyVisible) b.mesh.visible = reallyVisible;
      if(reallyVisible){
        visibleBuildings++;
        const hasDetail = dist < detailNow;
        // Tag: se já não tem cache, aplica
        const cacheKey = b.id + '_detail';
        if(this.visibilityCache.get(cacheKey) !== hasDetail){
          this.visibilityCache.set(cacheKey, hasDetail);
          // Percorre filhos e esconde detalhes (janelas, sacadas)
          b.mesh.traverse(obj=>{
            if(obj.userData && obj.userData.isDetail){
              obj.visible = hasDetail;
              if(hasDetail) detailOn++;
            }
          });
        } else if(hasDetail) detailOn++;
      } else {
        culled++;
      }
    }
    
    // 2. VEGETAÇÃO: culling leve — árvores visíveis até 800m em overview
    const vegGroup = this.vegetation ? this.vegetation.group : this.worldScene.vegetationGroup;
    if(vegGroup){
      for(const veg of vegGroup.children){
        const dist = Math.hypot(veg.position.x - obsPos.x, veg.position.z - obsPos.z);
        const lim = altitude > 90 ? 650 : 420;
        const shouldBeVisible = dist < lim;
        if(veg.visible !== shouldBeVisible) veg.visible = shouldBeVisible;
      }
    }
    
    // 3. RUAS/PROPS: ruas SEMPRE visíveis, props com culling moderado
    const streetGroup = this.worldScene.streetGroup;
    if(streetGroup){
      for(const prop of streetGroup.children){
        const dist = Math.hypot(prop.position.x - obsPos.x, prop.position.z - obsPos.z);
        const isRoadMesh = prop.geometry && prop.geometry.attributes.position && prop.geometry.attributes.position.count > 200;
        const lim = isRoadMesh ? 1200 : (altitude > 90 ? 700 : 450);
        if(prop.visible !== (dist < lim)) prop.visible = dist < lim;
      }
    }
    
    this.stats = { visibleBuildings, culled, detailOn };
  }

  // Render adaptativo: quando mexe muito, baixa qualidade automaticamente
  getAdaptiveQuality(observer, basePixelRatio){
    if(this.isMoving){
      if(this.moveSpeed > 25){
        // Movimento extremo: modo ultra-performance
        return { pixelRatio: Math.min(basePixelRatio * 0.65, 0.9), shadows: false, crowd: false };
      } else if(this.moveSpeed > 10){
        return { pixelRatio: basePixelRatio * 0.85, shadows: false, crowd: true };
      }
    }
    return { pixelRatio: basePixelRatio, shadows: true, crowd: true };
  }
}
