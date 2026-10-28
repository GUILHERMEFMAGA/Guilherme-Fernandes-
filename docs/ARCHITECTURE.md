# ITALIA VIVA — Technical Architecture

## Engine & Rendering
- **Three.js 0.160**, `WebGLRenderer` + `ACESFilmicToneMapping`, `PCFSoftShadowMap`, `FogExp2`.
- Shadow map 2048², directional sun with orthographic frustum -800..800.
- Sky dome via custom `ShaderMaterial` (top/bottom color + sun disc + horizon glow). Stars via `Points`.
- ToneMappingExposure lerp 0.65 (night) → 1.05 (noon).

## Coordinate System
- Y-up, units = meters. Origin at geographic center of Italy approx (lat 42°N, lon 12.5°E).
- X = east-west, Z = north-south (negative Z = north toward Alps). Matches Three.js right-handed.
- Terrain 2000×2000 m, segments 220 (48k vertices). Height via `getHeightAt(x,z)` raycast fallback + fBm re-evaluation.

## World Streaming (Hierarchical)
```
National (2000×2000) → Regional (5 hubs: Venezia, Roma, Milano, Toscana, Dolomiti)
→ Neighborhood (building clusters ~260–520m spread)
→ Building (LOD0 high mesh, LOD1 simplified via distance cull)
→ Room (interior Group, hidden until enter)
```
- Groups: `worldRoot/{terrainGroup, buildingGroup, streetGroup, waterGroup, vegetationGroup, interiorGroup, npcGroup, propGroup}`.
- Streaming: all tiles resident for vertical slice; budget allows ≤180 buildings + 200 trees at high quality. Balanced tier reduces shadow + pixelRatio.

## Procedural City Generation
- `REGIONS` config defines palette, floors, density, special flags (alpine, modern, canal).
- `BuildingSystem.generateRegion()` → count = density * spread. Placement respects water exclusion + footprint AABB collider.
- Facade variation: palette index via `sin(x*0.05+z*0.03)`, window cols via width, shutters/balconies via probability, window emissive randomized 42%.
- Roof types: terracotta hip (ConeGeometry) vs alpine gable (ExtrudeGeometry). Doors with house numbers via CanvasTexture.
- Hero landmarks:手工 meshes (Duomo, Colosseum, Campanile) as distinct Groups with archPlanes + spires, not from generic template.

## PBR Pipeline
```
Reference → CanvasTexture generation (512²) → CanvasTexture.repeat + anisotropy 8
→ MeshStandardMaterial (map, roughness 0.85–0.95, metalness 0–0.45)
→ onBeforeCompile terrain splatting (grass/soil/rock via height+slope)
```
- No fake duplicate maps: each PBR set has distinct albedo generation; roughness inferred via value. Metalness physically plausible (glass 0.15, lamp metal 0.5).

## Player
- `PointerLockControls`-style FPS: yaw/pitch, WASD + Shift run, Space jump, gravity -14, jump 5.2 m/s.
- Collision: AABB Box3 per building, radius 0.55m, push-out along smallest overlap. Terrain snap via `getHeightAt`. Water slowdown <0.65m.
- Interiors: `InteriorSystem.enterBuilding()` hides exterior groups, teleports player to interior Group (parquet floor, walls, furniture, point lights + windows). Exit restores.

## Time & Weather
- `TimeSystem`: 0–24h slider, pause, autoAdvance 18×. `WorldScene.updateSky()` computes sun position via hourAngle, blends top/bottom colors, fog, hemisphere light, star opacity.
- `WeatherSystem`: rain via `Points` (2200 particles, vel 1.2–2.0) attached to player, visible only when `clear→rain`. Fog via `FogExp2` density.

## NPCs & Traffic
- Primitive human (capsule torso + sphere head + cylinders). Walk cycle via `sin(phase)` swing arms/legs, bob y.
- Navigation: steering to `navPoints` hubs, building avoidance via `checkCollision(ahead)`. LOD: >160m reduced update (0.02 drift).
- Traffic: tram line as `Line` + cars deferred (would need path-follow).

## Audio
- WebAudio synth: wind (saw 42Hz lowpass), bird chirps (1800Hz sine), bells (220/440Hz), water lapping (80Hz triangle). Region-aware via `playAmbient(regionId)`.

## Persistence & Data
- `localStorage` save: pos, yaw/pitch, time, weather, region. Versioned `v:1.0.0`.
- Asset IDs: `b_<region>_<index>` + hero IDs. Geographic data in `REGIONS`.

## Performance Tiers
- High: pixelRatio 2, shadows on.
- Balanced (default): pixelRatio 1.4, shadows on.
- Performance: pixelRatio 1, shadows off, crowd density 30%.

## Build & Deploy
- Vite build → `dist/` (576KB JS). `npm run dev` → 0.0.0.0:5173 preview.
