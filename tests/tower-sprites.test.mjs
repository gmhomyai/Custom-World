import assert from 'node:assert/strict';
import {drawTowerSprite,TOWER_SPRITE_TYPES} from '../assets/td-kit/tower-sprites.mjs';
import {TYPES} from '../td/engine.mjs';
assert.deepEqual([...TOWER_SPRITE_TYPES].sort(),Object.keys(TYPES).sort());
let depth=0,draws=0;
const ctx=new Proxy({save(){depth++;},restore(){depth--;},fill(){draws++;}}, {get:(obj,key)=>key in obj?obj[key]:()=>{}});
for(const type of TOWER_SPRITE_TYPES){drawTowerSprite(ctx,{type,level:5,charge:0.3});assert.equal(depth,0);}
assert(draws>0);assert.throws(()=>drawTowerSprite(ctx,{type:'unknown'}),RangeError);
console.log('Reusable tower sprites: seven types, drawing and canvas state OK');
