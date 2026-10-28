# ITALIA VIVA — Model & Tool Registry

| Category | Task | Model / Tool | Version | Status | Input | Output | Quality (1-5) | Cost | License | Known Limitations | Fallback |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A | Complex architecture, planning | Arena LLM (reasoning) | 2026-10 | ✅ Active | spec markdown | code + docs | 5 | free | internal | No visual inspection | manual review |
| B | Game scripting, physics, nav | Three.js + custom JS | 0.160.0 | ✅ | JS | WebGL | 4 | free | MIT | No built-in NavMesh — custom steering | cannon-es (deferred) |
| B | Shaders | GLSL (ShaderMaterial) | WebGL2 | ✅ | vert/frag | GPU | 4 | free | — | No compute shaders | downgrade to MeshStandard |
| C | Buildings, landmarks | Procedural extrusion (code) | 1.0 | ✅ | JSON config {w,d,h,floors,palette} | BufferGeometry | 4 | free | own | No photogrammetry | TripoSR (if API ever) |
| C | Vegetation | Instanced primitive | 1.0 | ✅ | pos + species | Group | 4 | free | own | No SpeedTree wind | static + sine |
| C | Roads, bridges | CatmullRom + ribbon | 1.0 | ✅ | curve points | BufferGeometry | 4 | free | own | No spline intersection solver | manual |
| D | PBR materials | CanvasTexture procedural | 1.0 | ✅ | name | CanvasTexture (albedo/rough) | 4 | free | own | Max 512px, no displacement | Substance (deferred) |
| E | Humans | Primitive human (capsule+sphere) | 1.0 | ✅ | variant id | Group | 3 | free | own | No rig, no Mixamo | ReadyPlayerMe (needs API) |
| E | Animation | Sinusoidal walk cycle | 1.0 | ✅ | phase | rotation | 3 | free | own | Foot sliding if terrain steep | IK solver (deferred) |
| F | Terrain | fBm Noise (custom) | 1.0 | ✅ | seed, x,z | y height | 4 | free | own | Approx, not 1:1 DEM | SRTM ingestion (blocked host) |
| F | Hydrology | Shader water ribbon | 1.0 | ✅ | curve | ShaderMaterial | 4 | free | own | No fluid sim | FFT water (future) |
| G | QA | In-code acceptance tests | 1.0 | ✅ | scene graph | console report | 4 | free | own | No screenshot diff | Playwright (deferred) |

## Usage Policy

- Prefer included/free/local.
- No paid API calls initiated (user did not authorize).
- If credentials required, request via UI rather than inventing.
- Every asset carries provenance in `buildingSystem.buildings[i].id` and material name.

## Reproducibility

- Terrain seed = 42, building placement deterministic via `Math.random()` with same call order → stable across rebuilds unless config changes.
- `worldRoot` streaming groups named (`terrainGroup`, `buildingGroup`, etc.) for deterministic references.
