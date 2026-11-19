import assert from 'node:assert/strict';
import {drawEnvironmentSprite,ENVIRONMENT_SPRITES} from '../assets/td-kit/environment-sprites.mjs';
let depth=0,draws=0;
const ctx=new Proxy({save(){depth++;},restore(){depth--;},fill(){draws++;}}, {get:(obj,key)=>key in obj?obj[key]:()=>{}});
assert.deepEqual([...ENVIRONMENT_SPRITES],['cliff','tree','bush','rock']);
for(const kind of ENVIRONMENT_SPRITES){drawEnvironmentSprite(ctx,kind);drawEnvironmentSprite(ctx,kind,1.2);assert.equal(depth,0);}
assert(draws>0);assert.throws(()=>drawEnvironmentSprite(ctx,'unknown'),RangeError);assert.throws(()=>drawEnvironmentSprite(ctx,'tree',0),RangeError);
console.log('Environment sprites: four types, scaling and canvas state OK');
