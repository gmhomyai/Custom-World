# Co-op Tower Defense — 5-wave prototype

Run a static HTTP server from the repository root, for example `npx --yes http-server . -p 8080`, then open `http://localhost:8080/` and follow the TD link, or open `/td/` directly. Node.js is only required for the suggested server and tests; the game runs in a browser. Run tests with `node tests/td-engine.test.mjs` and `node tests/glb-loader.test.mjs`.

Choose a tower and click valid ground. Click a tower to select it, or drag a selection box; U upgrades and Shift+S sells. With no build or ghost selected, click empty ground to walk there; the camera follows the builder. Right-drag pans the camera. WASD, arrow keys and on-screen buttons also move the builder and cancel a click-to-move order. If there is insufficient gold, placing creates a FIFO ghost; click a ghost and then a new location to move it, or cancel it. The game starts with 20 seconds preparation and has 5 seconds between cleared waves. All costs, stats, enemy counts and starting lives are provisional.

Construction is instant for gameplay. The builder walks over and performs a short cosmetic hammer animation afterward, including for an automatically built ghost. Moving manually cancels the animation; if several towers are built together, the builder visits the latest one.

The camera-follow checkbox defaults to on. Turn it off to keep the camera in place while the builder moves; right-drag still pans. Turning it back on centers the camera on the builder. This setting applies only to the current page session.

The lower command panel contains the minimap, selected tower information, and build controls. Click or drag on the minimap to move the camera; this turns camera-follow off so it stays at the chosen location. Re-enable follow to return to the builder. The minimap shows the road, towers, enemies, builder, and the camera viewport.

The TD engine test also simulates a complete five-wave win using normal income, upgrades and builds; this is not a substitute for manual balance and interface testing.

Cliff faces are decorative only: they do not change movement, pathing, tower placement, range, or line of sight. Real height-based gameplay would require separate map data and rules.

The shared procedural tower art lives in `assets/td-kit/tower-sprites.mjs`. Run `node tests/tower-sprites.test.mjs` to check all seven sprite types.
Reusable cliff, tree, bush and rock art lives in `assets/td-kit/environment-sprites.mjs`; test with `node tests/environment-sprites.test.mjs`.

This is a single-client slice, not multiplayer. The full design targets 50 waves; this prototype stops at five and has no bosses. The simulation is separated from rendering, and the path is represented as a list of lanes for future work, but multiplayer, multiple active lanes, difficulty selection, full settings, audio and approved visual polish are not implemented. No server-authoritative behavior or account persistence is implied.
