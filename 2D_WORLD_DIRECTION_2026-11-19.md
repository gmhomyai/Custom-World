# Custom World — 2D direction decision (2026-11-19)

**Approved:** Replace the planned main 3D world with a polished 2D world (isometric/2.5D presentation permitted). The canonical player character is a customizable 2D sprite used across character editor, Lobby, and future playable maps. Fantasy, military, sci-fi and mixed equipment themes are allowed; no single costume aesthetic is mandatory. Preserve all original full-resolution asset layers and metadata, even if a smaller render is used in a map. Keep existing Lobby layout, map, movement controls, map editor and minigames functional. Retain legacy 3D files for history; do not delete them before auditing dependencies.

**Implemented this commit:** Shared versioned browser-local character profile in `character-profile.mjs`, with migration from the earlier avatar2d localStorage key. The avatar editor saves the shared profile. The Lobby displays the same player's 2D sprite and changes orientation according to movement. Existing NPC placeholder circles and Lobby terrain remain unchanged. The profile is local to the same browser/origin; it is NOT a server-side account or multiplayer character. Existing sprite art is still a simple prototype, not the requested polished high-resolution chibi art.

**Not yet implemented:** Detailed chibi sprite sheets, independently equippable item layers, multi-directional animation, item attachment anchors, asset resolution/LOD policies, map-editor player placement, persistence across devices, server-authoritative inventories, multiplayer, and complete replacement of the legacy 3D world. Implement these in stages without silently altering gameplay rules.

**Validation:** Source changes committed to GitHub. Browser visual regression and Cloudflare deployment status still need confirmation.
