# Blue Knight integration (work in progress)

This branch adds an **optional** Canvas 2D sprite-sheet renderer. It does not replace the existing customizable avatar or change gameplay.

## Required assets
Place these transparent PNGs in this directory:
- `idle.png`
- `run.png`
- `attack.png`
- `jump.png`
- `defeat.png`

Each image must be an actual **6-column x 4-row** uniform sprite sheet, with row order **front, back, left, right**. Verify alpha, consistent frame sizes, feet baseline and character continuity before enabling. AI-generated sheets are drafts until manually validated. In particular, `jump.png` was reported missing.

## Integration API
```js
import {drawBlueKnight,blueKnightSpriteUrl} from './assets/characters/blue-knight/blue-knight-sprite.mjs';
const img = new Image();
img.src = blueKnightSpriteUrl('idle');
img.onload = () => drawBlueKnight(ctx,img,{x:400,y:280,direction:'front',frame:0,width:80,height:100});
```

The renderer returns false when the image is not ready or the grid is invalid. Preserve the existing `drawAvatarSprite` as a fallback until all assets are validated.

## Safe rollout
1. Upload and validate all five sprite sheets; do not use a checkerboard-pattern background.
2. Test front/back/left/right orientation, animation timing, baseline and frame clipping.
3. Wire only the local Lobby player behind an opt-in toggle; keep existing character customization intact.
4. Test movement, NPCs, browser storage, mobile controls and performance.
5. Only after approval, migrate additional player/NPC renderers and remove unused code.

This GitHub repository's current `main` has a standalone `index.html` Lobby prototype; do not assume the separate local `app.js` / `server.mjs` / `build.mjs` project has the same structure. Compare local changes before merging or pulling.
