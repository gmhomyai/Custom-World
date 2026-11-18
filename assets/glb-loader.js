/** Load a GLB once and create independent scene instances sharing GPU resources. */
export function createGlbLibrary(loader) {
  if (!loader || typeof loader.loadAsync !== 'function') throw new TypeError('A GLTFLoader is required');
  const pending = new Map();
  return Object.freeze({
    async instantiate(url) {
      if (!pending.has(url)) {
        const load = loader.loadAsync(url).catch(error => {
          pending.delete(url);
          throw error;
        });
        pending.set(url, load);
      }
      const gltf = await pending.get(url);
      if (!gltf.scene) throw new Error(`GLB has no default scene: ${url}`);
      return gltf.scene.clone(true);
    }
  });
}

export const fantasyCottageV2Url = new URL('./models/fantasy_cottage_v2.glb', import.meta.url).href;
