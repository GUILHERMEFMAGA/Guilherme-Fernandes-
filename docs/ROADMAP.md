# ITALIA VIVA — Production Roadmap

## Phase 1 — Capability Audit & Foundation ✅ (2026-10-28)
- Inspect Arena sandbox, select Three.js, define coordinate system, scaffold Vite + renderer + sky.
- Acceptance: playable scene launches.

## Phase 2 — Vertical Slice ✅ (This Release)
- Terrain (Alps→coast), water (Venice canals + Arno), roads (autostrada + vicoli), 5 regional building sets, 5 hero landmarks, interiors (enterable 42%), cypress/olive/forest, crowd, day-night, weather, audio, map, save.
- Acceptance: walkable street, enter building, day→night transition, reflections, no gaps.

## Phase 3 — Geographic Foundation ✅ (Partial)
- National 2km tile, major terrain forms, hydrology. OSM/DEM pipeline architected but not live due host allowlist.
- Next: ingest OSM PBF via `osm-pbf-parser` (npm) when network allowed; add elevation via `terrain-rgb` tiles.

## Phase 4 — Regional Expansion (Next Sprint)
- Add Sardinia, Sicily, Puglia hubs (palette + vegetation). Generate 120 extra buildings using existing `BuildingSystem`.
- Import building footprints from GeoJSON dump (requires host allowlist for `download.geofabrik.de`).

## Phase 5 — Asset Library (Ongoing)
- Expand PBR to 12 materials (include marble vein normal via Canvas bump). Add LOD2 (Decimate) & impostors.

## Phase 6 — Interiors (Ongoing)
- Raise enterable to 70% via template variants (shop, museo, stazione). Add door animation + interior culling portal.

## Phase 7 — Population & Traffic
- Add vehicle path-following (cars on autostrada) + tram movement. Add schedule system (home→work→piazza).

## Phase 8 — Time/Weather/Water Polish
- Volumetric fog, screen-space reflections, wetness puddles (shader roughness lerp), snow accumulation in Dolomiti via vertex color.

## Phase 9 — Performance
- InstancedMesh for trees, Occlusion culling via `THREE.BatchedMesh`, streaming worker for terrain chunks.

## Phase 10 — National Expansion
- Tile Italy into 20×20 km chunks, stream on demand. Maintain quality bar: no region ships without passing 18-point Final Acceptance Test.

## Known Issues
- Terrain raycast `getHeightAt` uses brute force per frame → cache heightmap float texture next.
- NPCs occasionally clip through narrow bridges → need NavMesh baking.
- Interior wall thickness 0.12m causes z-fighting at grazing angles → increase to 0.15m.
- No photogrammetry for Duomo details → silhouette correct, ornament simplified.

## Metrics (Vertical Slice)
- Buildings: 180+ (incl. 7 heroes) · Enterable: ~75 · Trees: ~220 · NPCs: ~68 · Draw calls: ~210 · FPS: 55–60 on M1 (balanced) · Build size: 576KB
