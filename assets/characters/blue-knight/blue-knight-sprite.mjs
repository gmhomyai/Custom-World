// Optional Blue Knight sprite-sheet renderer. Does not modify the existing avatar system.
// Expected sheets: 6 columns x 4 rows, direction order front/back/left/right.
// Call drawBlueKnight(ctx, image, {x,y,direction,frame,width,height,scale}) after loading a PNG.
export const BLUE_KNIGHT_DIRECTIONS = Object.freeze(['front','back','left','right']);
export const BLUE_KNIGHT_ANIMATIONS = Object.freeze(['idle','run','attack','jump','defeat']);
export const BLUE_KNIGHT_COLUMNS = 6;
export const BLUE_KNIGHT_ROWS = 4;
export const BLUE_KNIGHT_ASSET_ROOT = './assets/characters/blue-knight/';
export function blueKnightSpriteUrl(animation) {
  if (!BLUE_KNIGHT_ANIMATIONS.includes(animation)) throw new RangeError('Unknown animation');
  return BLUE_KNIGHT_ASSET_ROOT + animation + '.png';
}
export function drawBlueKnight(ctx, image, {x=0,y=0,direction='front',frame=0,width=64,height=64,scale=1}={}) {
  if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) return false;
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(scale) || scale<=0) return false;
  const row=BLUE_KNIGHT_DIRECTIONS.indexOf(direction);
  if(row<0) return false;
  const sw=image.naturalWidth/BLUE_KNIGHT_COLUMNS, sh=image.naturalHeight/BLUE_KNIGHT_ROWS;
  if(!Number.isInteger(sw)||!Number.isInteger(sh)) return false;
  const col=((Math.floor(frame)%BLUE_KNIGHT_COLUMNS)+BLUE_KNIGHT_COLUMNS)%BLUE_KNIGHT_COLUMNS;
  // Ground anchor: x=center of feet, y=baseline.
  ctx.drawImage(image,col*sw,row*sh,sw,sh,x-width*scale/2,y-height*scale,width*scale,height*scale);
  return true;
}
