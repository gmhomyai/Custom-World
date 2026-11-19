// Reusable original 2D concept art. Draw at a screen-space ground anchor (0, 0).
// This module has no dependency on a game, camera, or simulation state.
export const TOWER_SPRITE_TYPES = Object.freeze(['rapid','air','slow','ultimate','versatile','damage','speed']);
export function drawTowerSprite(ctx,{type,color='#c8d6c2',level=0,charge=0}) {
 if(!TOWER_SPRITE_TYPES.includes(type))throw new RangeError(`Unknown tower sprite: ${type}`);
 const circle=(x,y,r,fill,stroke)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}};
 const polygon=(points,fill,stroke='#293027')=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}};
 ctx.save();ctx.textAlign='center';ctx.fillStyle='#0b1c15aa';ctx.beginPath();ctx.ellipse(0,9,19,7,0,0,Math.PI*2);ctx.fill();
 polygon([[-17,4],[0,-3],[17,4],[0,12]],'#454c3c');polygon([[-17,4],[0,12],[0,16],[-17,8]],'#292f29');polygon([[0,12],[17,4],[17,8],[0,16]],'#626653');
 ctx.strokeStyle='#b4b99a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-14,4);ctx.lineTo(0,-1);ctx.lineTo(14,4);ctx.stroke();
 ctx.fillStyle='#cfad62';ctx.fillRect(-13,6,3,2);ctx.fillRect(10,6,3,2);
 polygon([[-11,4],[-10,-13],[0,-17],[10,-13],[11,4],[0,8]],'#8a9787');polygon([[0,-17],[10,-13],[11,4],[0,8]],'#57675e');
 polygon([[-8,-11],[0,-14],[0,4],[-8,1]],'#a3aea0');polygon([[2,-13],[8,-11],[9,0],[2,3]],'#61766a');
 ctx.strokeStyle='#3f5149';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-7,-7);ctx.lineTo(-1,-9);ctx.moveTo(-7,-4);ctx.lineTo(-1,-6);ctx.moveTo(-7,-1);ctx.lineTo(-1,-3);ctx.stroke();
 ctx.fillStyle='#d4ddd0';for(const [x,y] of [[-9,-11],[7,-10],[-9,2],[8,1]])ctx.fillRect(x,y,2,2);
 if(type==='rapid'){
  polygon([[-14,-13],[-11,-21],[0,-25],[11,-21],[14,-13],[0,-8]],'#738773');polygon([[0,-25],[11,-21],[14,-13],[0,-8]],'#4b6053');
  ctx.strokeStyle='#354941';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-5,-17);ctx.lineTo(-16,-29);ctx.moveTo(3,-19);ctx.lineTo(-8,-31);ctx.stroke();ctx.strokeStyle='#d7bf83';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-16,-29);ctx.lineTo(-13,-30);ctx.moveTo(-8,-31);ctx.lineTo(-5,-32);ctx.stroke();circle(1,-17,3,color,'#f3e7c8');
 }else if(type==='air'){
  polygon([[-13,-12],[-13,-23],[0,-28],[13,-23],[13,-12],[0,-7]],'#677b73');polygon([[0,-28],[13,-23],[13,-12],[0,-7]],'#405950');
  for(const x of [-8,0,8]){polygon([[x-3,-20],[x-3,-36],[x,-42],[x+3,-36],[x+3,-20]],'#c2d5d0','#4d6460');polygon([[x-3,-36],[x,-42],[x+3,-36]],'#6cadd2',null);}
 }else if(type==='slow'){
  polygon([[-12,-11],[-10,-24],[0,-28],[10,-24],[12,-11],[0,-7]],'#607e7c');ctx.strokeStyle='#a2c9cb';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,-17);ctx.lineTo(-16,-30);ctx.moveTo(12,-17);ctx.lineTo(16,-30);ctx.stroke();
  polygon([[0,-39],[8,-30],[0,-20],[-8,-30]],'#91e8ef','#e6ffff');circle(-2,-31,2,'#fff');ctx.strokeStyle='#a1f5ff';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,-29,15,6,0,0,Math.PI*2);ctx.stroke();
 }else if(type==='ultimate'){
  polygon([[-14,-11],[-12,-30],[0,-36],[12,-30],[14,-11],[0,-6]],'#685a74');polygon([[0,-36],[12,-30],[14,-11],[0,-6]],'#443d58');
  polygon([[-8,-29],[0,-48],[8,-29],[0,-21]],'#c496eb','#f4e2ff');circle(0,-33,5,'#f0ceff','#fff');ctx.strokeStyle='#c4add7';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-14,-11);ctx.lineTo(-17,-35);ctx.moveTo(14,-11);ctx.lineTo(17,-35);ctx.stroke();
 }else if(type==='versatile'){
  polygon([[-15,-13],[-11,-23],[0,-28],[11,-23],[15,-13],[0,-7]],'#897a65');polygon([[0,-28],[11,-23],[15,-13],[0,-7]],'#615b4e');
  ctx.strokeStyle='#3d4c43';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(1,-19);ctx.lineTo(-15,-31);ctx.stroke();ctx.strokeStyle='#a9b7a2';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-15,-31);ctx.lineTo(-18,-33);ctx.stroke();circle(3,-20,4,color,'#f4e8c7');
 }else if(type==='damage'){
  polygon([[-11,-12],[-8,-27],[0,-32],[8,-27],[11,-12],[0,-8]],'#806778');ctx.fillStyle='#de9db5';ctx.fillRect(-2,-29,4,18);ctx.fillRect(-7,-23,14,4);circle(0,-30,6,'#ed89b2','#fff1f7');
  ctx.strokeStyle='#ed89b2';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-22,16,6,0,0,Math.PI*2);ctx.stroke();
 }else if(type==='speed'){
  polygon([[-10,-12],[-7,-30],[0,-34],[7,-30],[10,-12],[0,-8]],'#557966');ctx.strokeStyle='#b4e8c3';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-31);ctx.lineTo(0,-42);ctx.moveTo(-10,-36);ctx.lineTo(10,-36);ctx.stroke();
  polygon([[0,-44],[9,-37],[0,-31],[-9,-37]],'#8de1a6','#e6fff0');polygon([[-5,-21],[0,-26],[0,-23],[5,-23],[0,-18],[0,-21]],'#e1ffdf',null);
 }
 if(level>=2){ctx.strokeStyle='#e3c576';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-13,3);ctx.lineTo(0,9);ctx.lineTo(13,3);ctx.stroke();}
 if(level>=4){circle(0,-29,13,null,'#ffe7ac99');polygon([[-3,-42],[0,-47],[3,-42],[0,-39]],'#fbe2a1');}
 if(type==='ultimate'&&charge>0){const glow=8+charge*18;circle(0,-30,glow,'#d69aff55','#f7dcff');circle(0,-30,glow+5,null,'#d7a8ff99');}
 ctx.restore();
}
