import {ENVIRONMENT_SPRITES} from '../assets/td-kit/environment-sprites.mjs';
import {EDITOR_TOWER_TYPES} from '../assets/td-kit/editor-towers.mjs';
import {EXTRA_SPRITES} from '../assets/td-kit/extra-sprites.mjs';
export const WIDTH=1200,HEIGHT=800,MAX_OBJECTS=1000;
export const KINDS=Object.freeze([...ENVIRONMENT_SPRITES,...EDITOR_TOWER_TYPES.map(type=>`tower:${type}`),...EXTRA_SPRITES]);
export function validateMap(data){
 if(!data||data.version!==1||!Array.isArray(data.objects)||data.objects.length>MAX_OBJECTS)throw new Error('ไฟล์แผนที่ไม่ถูกต้อง หรือมีชิ้นส่วนมากเกินไป');
 return {version:1,objects:data.objects.map((o,i)=>{if(!o||!KINDS.includes(o.kind)||![o.x,o.y,o.scale,o.rotation].every(Number.isFinite)||o.x<0||o.x>WIDTH||o.y<0||o.y>HEIGHT||o.scale<.5||o.scale>2||o.rotation< -180||o.rotation>180)throw new Error(`ชิ้นส่วนลำดับ ${i+1} ไม่ถูกต้อง`);return {kind:o.kind,x:o.x,y:o.y,scale:o.scale,rotation:o.rotation};})};
}
