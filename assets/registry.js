/** Shared prefab registry for world, minigames, dungeons and user-created maps. */
export function createAssetRegistry(){
 const factories=new Map();
 return Object.freeze({
  register(id,factory){if(typeof id!=='string'||!id||typeof factory!=='function')throw new TypeError('Invalid asset registration');if(factories.has(id))throw new Error('Duplicate asset ID: '+id);factories.set(id,factory);},
  has(id){return factories.has(id)},
  instantiate(id,options={}){const factory=factories.get(id);if(!factory)throw new Error('Unknown asset ID: '+id);return factory(options)},
  ids(){return [...factories.keys()]}
 });
}
