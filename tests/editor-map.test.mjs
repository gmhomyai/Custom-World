import assert from 'node:assert/strict';
import {validateMap,KINDS,MAX_OBJECTS} from '../editor/map-data.mjs';
const object={kind:'tree',x:100,y:200,scale:1,rotation:0};
assert(KINDS.includes('cliff'));assert(KINDS.includes('tower:rapid'));
assert.deepEqual(validateMap(JSON.parse(JSON.stringify({version:1,objects:[object]}))),{version:1,objects:[object]});
for(const invalid of [{version:2,objects:[]},{version:1,objects:[{...object,kind:'bad'}]},{version:1,objects:[{...object,x:-1}]},{version:1,objects:[{...object,scale:4}]},{version:1,objects:[{...object,rotation:181}]},{version:1,objects:Array(MAX_OBJECTS+1).fill(object)}])assert.throws(()=>validateMap(invalid));
console.log('Editor map JSON validation and round-trip: OK');
