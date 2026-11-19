# Custom World — handoff: TD, Map Editor and 2D avatar

## Context and preferences
- Repository is private. Keep the existing Lobby; do not make the repository public.
- Read `RULES_INDEX.md` and the two TD handoffs before deciding mechanics. Record new approved rules in the consolidated rules index and relevant detail documents; distinguish approved rules, provisional values, and proposals.
- The owner prefers a classic isometric 2D RTS look, with technology/base-themed TD and original reusable art. Existing cliff, tree, bush and rock style was approved as a reference for future map pieces. Avoid copying copyrighted game art.
- User wants reusable item definitions and separately layered global/item/map rules, including map-specific restrictions and bonuses. The architecture is discussed in `RULES_INDEX.md`; a rules engine is **not yet implemented**.

## What exists
- `index.html`: original 2D Lobby preserved with a TD link and updated scenery.
- `td/`: single-client experimental five-wave TD; not multiplayer. Full approved design remains 50 waves; numerical balance is provisional. Unit tests include a simulated five-wave win, not a complete manual playthrough.
- `editor/`: separate experimental map editor, with categorized thumbnails, placing, moving, scaling, image-plane rotation, deletion, camera pan, and local JSON export/import. Unsaved work is lost when closing or refreshing. The maps are decorative only and cannot yet be played as TD: no path editor, collision, or gameplay integration.
- `assets/td-kit/`: reusable original procedural 2D Canvas drawings for towers, environment, extra props and avatar. These are code-based prototype art, not 3D models or separate PNG assets. Terrain cliffs and vegetation in TD are decorative, without collision/elevation effects.
- `avatar2d/`: separate 2D character preview and customization concept. Four approximate discrete views, not continuous 3D rotation, no walking frames, and not integrated with Lobby or the existing 3D avatar. Uses its own browser localStorage key and does not replace existing 3D data.
- `tests/`: Node tests for TD simulation, map validation and reusable drawing functions. See individual READMEs for limitations.

## Most recent user request / next discussion
- User supplied an illustration of an anime-influenced fantasy adventurer and wants a character concept inspired by that image. They asked to discuss first and then generate an example before further modifying the game. A later attempt to apply the flatter map-sprite look was explicitly canceled and reverted.
- Image generation failed with `API key not valid`; no concept image was created. Ask the owner to configure a valid image-generation provider/key without sharing secrets, or agree on another approach. The user-provided reference was in the previous conversation; ask for it again if unavailable. Do not claim the procedural current avatar matches it.
- Existing avatar concept and 3D avatar should remain intact until a replacement is agreed and tested.

## Run and test
Serve the repository root as static files (for example `npx --yes http-server . -p 8080`), then open `/`, `/td/`, `/editor/`, or `/avatar2d/`. Node.js is needed for the suggested server/tests. Run `node tests/td-engine.test.mjs`, `node tests/editor-map.test.mjs`, `node tests/tower-sprites.test.mjs`, `node tests/environment-sprites.test.mjs`, `node tests/extra-sprites.test.mjs`, `node tests/avatar-sprite.test.mjs`, and `node tests/glb-loader.test.mjs`.

Current production branch is `main` and Cloudflare Pages is connected to it per `PROJECT_STATUS.md`. Pushing to main may trigger deployment. No multiplayer, account-wide settings synchronization, public sharing, or playable custom-map loader should be implied by these prototypes.
