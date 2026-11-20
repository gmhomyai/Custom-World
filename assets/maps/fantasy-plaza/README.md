# Custom World — Fantasy Plaza Lobby Background

## Source asset
Expected file: `assets/maps/fantasy-plaza/lobby-plaza.png`

Generated artwork: original isometric fantasy plaza, empty of player characters, with central magical fountain, four-way stone paths, fantasy buildings and vegetation around edges.

**Actual generated dimensions:** 1495 x 1052 RGB PNG (not 2560 x 1800). This is a concept/background asset, not yet a seamless tilemap. The asset PNG must be copied into this directory before integration.

## OpenCode handoff
1. Place the original PNG at `assets/maps/fantasy-plaza/lobby-plaza.png`.
2. Inspect the actual project and compare its map/camera architecture with this repository.
3. Preserve existing movement, collision, controls, character editor, and multiplayer code.
4. Add an opt-in background mode in the Lobby; keep the existing procedural background as fallback.
5. Render the map at its native aspect ratio, with a camera transform and viewport culling as appropriate. Do not stretch the image.
6. Define walkable areas and collision obstacles separately. A flattened background image has no collision data, occlusion layers, or tile metadata.
7. Test desktop/mobile, character scaling, camera bounds, FPS, and safe fallbacks before merging.

**Important:** A single flattened PNG does not provide independent foreground layers, scrolling beyond image edges, or a true 2560 x 1800 world. Those require separate authored assets or map geometry.

No production files are changed by this document.
