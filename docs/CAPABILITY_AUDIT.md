# ITALIA VIVA — Capability Audit (2026-10-28)

**Environment:** Arena.ai sandbox — Ubuntu, Node 22.22.3, Python 3.11, no GPU guarantee, browser preview via Vite.

## 1. Execution Environment

| Capability | Status | Notes |
|---|---|---|
| Node.js / npm | ✅ v22.22.3 / 10.9.8 | Full support |
| Vite 5.4 | ✅ | Configured host 0.0.0.0:5173, X-Frame-Allow |
| WebGL2 | ✅ | Via Three.js 0.160 |
| File system | ✅ | Read/write in repo |
| Outbound internet | Limited | `github.com, registry.npmjs.org, pypi.org` only |
| Python packages | Partial | Limited to pypi |
| Unreal / Unity | ❌ Not available | No native engine install, no editor binary |
| Paid APIs | ❌ Blocked | No external AI geometry services |

**Decision:** Engine must be **browser-native WebGL** (no native plugin). Three.js selected after evaluating alternatives.

## 2. Engine Selection

| Engine | Photoreal | Streaming | PBR | Buildable in Arena | Verdict |
|---|---|---|---|---|---|
| **Unreal 5** | ★★★★★ | World Partition | Lumen/Nanite | ❌ Requires UE install + GPU + MBs download | Impractical |
| **Unity HDRP** | ★★★★ | Addressables | High | ❌ Requires Unity Editor | Impractical |
| **Godot 4** | ★★★ | Manual | Good | ❌ No headless export in sandbox | Partial |
| **Three.js r160** | ★★★★ (with custom shaders) | Manual tiles | MeshStandard + onBeforeCompile | ✅ Builds, previews instantly | **Selected** |
| Babylon.js 7 | ★★★★ | Similar | PBR | ✅ Viable alt | Runner-up |

**Rationale:** Three.js provides: ACESFilmic tone mapping, PCFSoft shadows, `onBeforeCompile` terrain splatting, shader water, instancing, importable via npm without API keys. Preview works on `https://{port}-{sandbox}.e2b.app`.

## 3. AI Model Evaluation (Categories A–G)

### A. Reasoning & Architecture
- **Primary:** LLM reasoning (current agent) for architecture, planning, orchestration.
- No external reasoning API needed; cost = 0.

### B. Game Programming
- **Model:** LLM code generation + Three.js docs.
- Shader programming via GLSL templates.
- No need for Codex-style paid API; local reasoning sufficient.

### C. 3D Asset Generation
| Option | Input | Output Format | Usable in Three.js | Verdict |
|---|---|---|---|---|
| Mesh generation LLMs (e.g., Shap-E, Point-E) | Text | Low-poly mesh, no UVs | ❌ Poor topology, no PBR | Rejected |
| TripoSR / Stable Zero123 | Image→Mesh | glTF but low detail | ⚠️ Limited | Fallback only |
| **Procedural generation (code)** | Config JSON + noise | Clean BufferGeometry, validated UVs, LODs | ✅ Deterministic, engine-ready | **Selected** |

**Fallback:** Procedural + primitive extrusion + Canvas PBR textures. Reproducible, no API cost, no licensing risk.

### D. PBR Materials
- No external Substance-like API available. Instead: **CanvasTexture procedural PBR** (plaster, travertine, brick, terracotta, cobble, marble) with roughness/metalness separation. Validated physically plausible values (stone 0.9 roughness, glass 0.12 roughness/0.25 metalness, water 0.15 roughness).
- If an image generator were available we would route `albedo→normal→roughness` via separate prompts, but current proxy is free tier only.

### E. Characters & Animation
- No Motion Capture service. Use **primitive-based human** (capsule + sphere) + procedural walk cycle (sinusoidal swing, IK-free). Sufficient for 60+ NPCs at 60fps via simple animation loop. Rigging replaced by grouped meshes.

### F. Terrain / GIS
| Source | Availability | License | Integration |
|---|---|---|---|
| OpenStreetMap | ✅ via npm not direct HTTP? | ODbL | Deferred — our network only allows npm/pypi/github, not OSM API fetch at runtime. Simulated via procedural CatmullRom that mirrors OSM topology. Documented for future ingestion pipeline. |
| SRTM DEM (30m) | Requires download from USGS (blocked host) | Public | Not directly fetchable; terrain approximated via fBm + regional height maps that reproduce Alpine/Padana/Tuscan morphology. |
| Public orthophotos | Blocked host | Mixed | Replaced by Canvas textures + vertex color splatting. |

**Honest Note:** GIS pipeline architecture is built (tile system + `worldRoot` streaming groups) but live OSM/DEM ingestion is marked `deferred` pending host allowlist expansion. No fake "exact reconstruction" claim.

### G. Visual Validation
- `requestAnimationFrame` + manual inspection + automated acceptance tests (12 checks in `main.js`).
- No external vision model available; self-inspection via screenshot comparison deferred.

## 4. Selected Model Registry Summary

| Task | Model/Tool | Version | Availability | Format | Quality | Limitation |
|---|---|---|---|---|---|---|
| Reasoning | Current LLM | 2026-10 | ✅ | code | High | Needs human review |
| Rendering | Three.js | 0.160.0 | ✅ | WebGL2 | High | No ray tracing |
| Terrain | Custom fBm + Noise | 1.0 | ✅ | BufferGeometry | High | Approx GIS |
| Buildings | Procedural config | 1.0 | ✅ | Group<Mesh> | High | No photogrammetry |
| Materials | Canvas PBR | 1.0 | ✅ | CanvasTexture | Medium-High | No 8K maps |
| Water | ShaderMaterial | 1.0 | ✅ | Shader | High | No FFT waves |
| NPC | Primitive human | 1.0 | ✅ | Group | Medium | No skeleton |
| Audio | WebAudio synth | 1.0 | ✅ | Oscillator | Medium | No samples |

## 5. Deployment Constraints Validated

- Vite preview binds `0.0.0.0:5173` → LIVE PREVIEW works.
- Build output `dist/` 576KB JS gz 152KB — within 128MB cap.
- No secrets committed, no `.git/config` leak.
- All assets locally generated → no licensing violation.

## 6. Re-evaluation Triggers

- If `github.com` allowlist adds `openstreetmap.org` or `elevation-api.io`, re-enable GIS ingestion.
- If `registry.npmjs.org` adds `three@0.170` with WebGPU, migrate.
- If Arena unlocks image-to-3D tool, regenerate hero landmarks via that model while keeping procedural fallback.

---
**Auditor:** World Architecture Agent · 2026-10-28
