# Custom World — Central World 3D (prototype)

## Run locally

```bash
cd world3d
npm install
npm run dev
```

Open the URL printed by Vite. Production build: `npm run build`; deploy `world3d/dist` to Cloudflare Pages (build command `cd world3d && npm install && npm run build`, output `world3d/dist`).

## Current scope

- Three.js browser-rendered 3D, deterministic terrain with seed, 50m chunks in a 600m world, simple buildings and roads.
- Avatar movement, jumping, orbit camera, touch controls and HUD toggle.
- Single-player proof of concept. No networking, account persistence, avatar customization or game rules yet.

## Next engineering tasks

- Terrain chunk seams and geometry caching, shared resources and instancing, collision and camera occlusion.
- Replace primitive avatar and buildings with optimized GLB assets.
- Implement AOI server, authenticated player sessions and authoritative movement checks.
- Profile mobile performance and add graphics presets.

The original root 2D lobby prototype is retained unchanged. This prototype lives in `world3d/` to avoid disrupting it.
