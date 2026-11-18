# Custom World — Shared Game Asset Library (V23)

เป้าหมาย: สร้างโมเดล พื้นผิว และเอฟเฟกต์เพียงครั้งเดียว แล้วใช้ร่วมกันได้ในโลกกลาง เมือง ดันเจี้ยน และมินิเกม

## Visual Blueprint
- Art direction: enchanted stylized fantasy, twilight peach/violet sky, warm timber houses, cyan magic, glowing mushrooms, stone plaza.
- Reference: ภาพที่ผู้ใช้ส่งในบทสนทนา (ภาพอ้างอิง ไม่ใช่ไฟล์โมเดลหรือ Texture ที่นำไปใช้ในเกมได้โดยตรง)
- Hero scene: ลานน้ำพุเวทมนตร์ อาคารสองฝั่ง ทางเดินหิน ป่าเห็ดเรืองแสง และภูเขาซ้อนชั้น
- Palette: twilight #66577f, rock #746a90, forest #547e70, cyan #85f6ff, warm light #ffb56e, roof #9e453d.
- Priorities: readable silhouette > strong lighting > materials > small props.

## Folder conventions
- `assets/catalog.js`: stable IDs and metadata (model / material / effect / environment)
- `assets/registry.js`: reusable runtime prefab registry and instantiation API
- `assets/scenes/*.json`: scene blueprints, independent of rendering engine
- `assets/models/`: future GLB/GLTF source and optimized variants
- `assets/textures/`: future albedo/normal/roughness/ORM textures
- `assets/effects/`: future shader/particle effect definitions
- `assets/source/`: editable Blender/source files (large binaries via Git LFS or object storage)

## Runtime API
```js
const library = createAssetRegistry();
library.register('building.fantasy-cottage', ({x,z,color,label}) => createBuilding(x,z,color,label));
library.instantiate('building.fantasy-cottage', {x:45,z:45,color:0xe4a974,label:'Guild'});
```

Catalog entries document reusable assets even when the current geometry is still procedural. They are NOT downloadable GLB models yet. Keep stable IDs when swapping procedural meshes for GLB later. Do not dispose shared geometries/materials on instance removal; scene instances own only their transforms and unique state.

## Performance
- Share geometries, materials and texture atlases; prefer InstancedMesh for repeated scenery.
- Ultra / High / Medium / Low choose LOD, effect density, shadow quality and texture size.
- Future: texture compression KTX2, mesh optimization, AOI/Chunk loading and pooling.
- Measure FPS and draw calls in browser before claiming a speed improvement.
