import assert from 'node:assert/strict';
import {EXTRA_SPRITES,drawExtraSprite} from '../assets/td-kit/extra-sprites.mjs';
import {KINDS,validateMap} from '../editor/map-data.mjs';
let depth=0,draws=0;const ctx=new Proxy({save(){depth++;},restore(){depth--;},fill(){draws++;}}, {get:(obj,key)=>key in obj?obj[key]:()=>{}});
for(const kind of EXTRA_SPRITES){assert(KINDS.includes(kind));drawExtraSprite(ctx,kind);drawExtraSprite(ctx,kind,1.5);assert.equal(depth,0);assert.equal(validateMap({version:1,objects:[{kind,x:0,y:0,scale:1,rotation:0}]}).objects[0].kind,kind);}
assert(draws>0);assert.throws(()=>drawExtraSprite(ctx,'unknown'),RangeError);assert.throws(()=>drawExtraSprite(ctx,'terrain:grass',0),RangeError);
console.log('Extra sprites: categories, drawing, scaling and map compatibility OK');
