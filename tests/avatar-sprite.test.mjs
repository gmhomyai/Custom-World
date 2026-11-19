import assert from 'node:assert/strict';
import {drawAvatarSprite,AVATAR_2D_DEFAULTS} from '../assets/td-kit/avatar-sprite.mjs';
let depth=0,draws=0;const ctx=new Proxy({save(){depth++;},restore(){depth--;},fill(){draws++;}}, {get:(obj,key)=>key in obj?obj[key]:()=>{}});
for(const hairStyle of ['short','spiky','long','bun'])for(const outfit of ['casual','adventurer','sport'])for(const direction of ['front','right','back','left']){drawAvatarSprite(ctx,{...AVATAR_2D_DEFAULTS,hairStyle,outfit,direction});assert.equal(depth,0);}
assert(draws>0);console.log('2D avatar: hair and outfit variants draw without leaking canvas state: OK');
