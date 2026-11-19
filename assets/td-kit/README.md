# TD environment asset experiments

This folder holds early original 2D isometric fantasy environment concepts. The first sheet is a visual exploration of trees, shrubs and rocks, based on the general style described from the user's reference, not a direct copy or an extracted asset.

`tower-sprites.mjs` provides original procedural Canvas artwork for the seven TD tower types. Import `drawTowerSprite(ctx, {type, color, level, charge})`, translate the context to the desired screen-space ground anchor, and call it. Supported types are exported as `TOWER_SPRITE_TYPES`. The artwork has no built-in collision or gameplay rules; a map must provide those separately. The current TD uses these drawings. They are prototypes, not separate transparent image files.

`environment-sprites.mjs` provides `drawEnvironmentSprite(ctx, kind, scale)` for `cliff`, `tree`, `bush`, and `rock`. Translate to the object's screen-space ground anchor before drawing. Artwork is upright in the same isometric view, with shaded sides and ground shadows. Keep this style for subsequent assets. The sprites are decorative; maps must separately define any collision, elevation and placement rules.

`extra-sprites.mjs` adds reusable ground tiles, military props, monsters, and buildings. The available names are exported as `EXTRA_SPRITES`; call `drawExtraSprite(ctx, kind, scale)` at the screen-space ground anchor. These are decorative prototypes, with no gameplay or collision attached.

`avatar-sprite.mjs` contains an original 2D character concept. Draw with `drawAvatarSprite(ctx, options)` at a ground anchor; `direction` can be `front`, `right`, `back` or `left`. These are approximate drawn views, not continuous 3D rotation. Preview and basic customization are in `avatar2d/`; walking frames and integration with the existing 3D avatar or Lobby are not implemented.

The proposed nature concept sheet was not generated because image generation was unavailable. Future images should be separated into sprites, with documented anchors and footprints, checked for consistency and cleared for use.
