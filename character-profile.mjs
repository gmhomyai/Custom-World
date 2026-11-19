// Shared 2D character profile used by avatar editor and Lobby.
// Versioned browser-local data; server persistence will be added later.
import {AVATAR_2D_DEFAULTS} from './assets/td-kit/avatar-sprite.mjs';
import {AVATAR_HAIR_STYLES,AVATAR_OUTFITS,AVATAR_ACCESSORIES} from './avatar-items.js';
export const CHARACTER_STORAGE_KEY='custom-world-character-v1';
const LEGACY_KEY='custom-world-avatar-2d-concept-v1';
const COLORS=['skin','hair','shirt','pants','shoes'];
export function validateCharacter(raw){
 const avatar={...AVATAR_2D_DEFAULTS};
 if(!raw||typeof raw!=='object')return avatar;
 for(const key of COLORS)if(typeof raw[key]==='string'&&/^#[0-9a-f]{6}$/i.test(raw[key]))avatar[key]=raw[key];
 if(AVATAR_HAIR_STYLES.some(x=>x.id===raw.hairStyle))avatar.hairStyle=raw.hairStyle;
 if(AVATAR_OUTFITS.some(x=>x.id===raw.outfit))avatar.outfit=raw.outfit;
 if(AVATAR_ACCESSORIES.some(x=>x.id===raw.accessory))avatar.accessory=raw.accessory;
 return avatar;
}
export function loadCharacter(){try{return validateCharacter(JSON.parse(localStorage.getItem(CHARACTER_STORAGE_KEY)||localStorage.getItem(LEGACY_KEY)||'null'));}catch{return validateCharacter(null);}}
export function saveCharacter(character){const data=validateCharacter(character);localStorage.setItem(CHARACTER_STORAGE_KEY,JSON.stringify({version:1,...data}));localStorage.setItem(LEGACY_KEY,JSON.stringify(data));return data;}
