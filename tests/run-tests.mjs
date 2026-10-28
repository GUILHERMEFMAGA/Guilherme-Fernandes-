import fs from 'fs';
import path from 'path';

const checks = [
  { name:'package.json exists', test:()=> fs.existsSync('package.json') },
  { name:'index.html has ITALIA VIVA', test:()=> fs.readFileSync('index.html','utf8').includes('ITALIA VIVA') },
  { name:'Three.js dependency', test:()=> JSON.parse(fs.readFileSync('package.json','utf8')).dependencies.three },
  { name:'Terrain system exists', test:()=> fs.existsSync('src/world/terrain.js') },
  { name:'Building system exists', test:()=> fs.existsSync('src/city/buildings.js') },
  { name:'PBR materials exist', test:()=> fs.existsSync('src/materials/pbr.js') },
  { name:'Player controls exist', test:()=> fs.existsSync('src/player/controls.js') },
  { name:'Time system exists', test:()=> fs.existsSync('src/systems/time.js') },
  { name:'Crowd system exists', test:()=> fs.existsSync('src/npc/crowd.js') },
  { name:'Docs exist', test:()=> fs.existsSync('docs/CAPABILITY_AUDIT.md') && fs.existsSync('docs/MODEL_REGISTRY.md') },
  { name:'Build output exists', test:()=> fs.existsSync('dist/index.html') },
  { name:'Dist size < 2MB', test:()=> { const s=fs.statSync('dist/assets/index-Cc3V4UP_.js'); return s.size < 2_000_000; }},
];

let pass=0, fail=0;
for(const c of checks){
  try{
    const ok=c.test();
    console.log(`${ok?'✓':'✗'} ${c.name} ${ok?'PASS':'FAIL'}`);
    if(ok) pass++; else fail++;
  }catch(e){ console.log(`✗ ${c.name} ERROR ${e.message}`); fail++; }
}
console.log(`\nTests: ${pass} pass, ${fail} fail`);
process.exit(fail>0?1:0);
