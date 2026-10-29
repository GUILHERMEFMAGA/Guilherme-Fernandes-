# Project Organization — ITALIA VIVA

## Structure Overview (Organizado)

```
src/
├── city/                  # Urban systems
│   ├── districts.js       # District grid definitions (Roma, Venezia, Firenze...)
│   ├── buildings.js       # Factory + blocks + heroes
│   ├── roads.js           # Road mesh, sidewalks, markings
│   └── interiors.js       # Enterable interiors
├── world/                 # Natural world
│   ├── terrain.js         # Heightmap, flattening, vertex colors
│   ├── mountains.js       # Dolomiti peaks, Apennine ridge
│   ├── water.js           # Sea, lakes, canals
│   └── vegetation.js      # Forests, vineyards, gardens
├── engine/
│   └── scene.js           # WorldScene, sky, lights, groups
├── player/
│   ├── observer.js        # L'OCCHIO controls
│   └── controls.js        # Legacy FPS (compat)
├── npc/
│   └── crowd.js           # Population
├── systems/
│   ├── streaming.js       # LOD + culling (far 650/950)
│   ├── time.js / weather.js / audio.js
│   └── time.js
├── materials/
│   └── pbr.js             # PBR factory
└── ui/
    ├── minimap.js
    └── style.css
```

## Fixes Applied (Corrigido)

### Cidade
- **Anti-flutuação 100%**: `getFootprintHeight()` amostras 5 pontos, âncora em `minH`, ilha de calçada 3.2m + saia 1.2m + AO. City flatten 0.42 blend em 8 centros.
- **Quarteirões organizados**: `createUrbanBlocks()` Roma 3x2, Firenze 2x2, Venezia/Milano etc alinhados à rua; `districts.js` define grades oficiais.
- **Densidade equilibrada**: ~350 prédios (40 Roma, 38 Firenze...) suficiente pra vista aérea sem travar.

### Ruas
- **Per-vertex heights**: cada borda da rua sampleia `getHeightAt(lx,lz)` separado → sem flutuação em ladeira.
- **Sidewalks & curbs**: par elevado +0.19 + meio-fio 0.11, sempre visível até 1200m (isRoadMesh).
- **Contraste**: asfalto `0x1a1d24` quase preto, zebras 7 faixas, alamedas de plátanos.

### Montanhas
- **Dolomiti dedicadas**: `mountains.js` 6 picos (Tre Cime estilo) com cones + neve + falésias; Apennine ridge 4 colinas.
- **Vertex colors**: verde <12m, ocre 12-32, rocha 32-95, neve >95 → montanhas brancas visíveis sem shader que quebrava (sky azul bug).

### Organização
- Headers `=== SECTION ===` em terrain/buildings/roads
- Módulos separados: `mountains.js`, `districts.js`
- Pipeline em `main.js`: terrain → mountains → water → roads → districts → buildings → vegetation

## Performance
- Terrain 110 segs (12k verts), shadow 512, far 650/950, detail 180/110, crowd 12/20, vegetation culling 420/650.
