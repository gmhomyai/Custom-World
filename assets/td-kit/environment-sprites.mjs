// Original isometric-style Canvas decorations, drawn relative to a ground anchor.
export const ENVIRONMENT_SPRITES = Object.freeze(['cliff','tree','bush','rock']);
export function drawEnvironmentSprite(ctx,kind,scale=1){
 if(!ENVIRONMENT_SPRITES.includes(kind))throw new RangeError(`Unknown environment sprite: ${kind}`);
 if(!Number.isFinite(scale)||scale<=0)throw new RangeError('Scale must be positive');
 const circle=(x,y,r,fill)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();};
 const polygon=(points,fill,stroke='#293027')=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}};
 ctx.save();ctx.scale(scale,scale);
 if(kind==='cliff'){
  ctx.fillStyle='#182c2188';ctx.beginPath();ctx.ellipse(7,13,72,20,0,0,Math.PI*2);ctx.fill();
  polygon([[-67,-2],[-42,10],[-10,18],[24,13],[60,0],[60,19],[25,33],[-9,38],[-44,28],[-67,14]],'#465547','#283a32');
  polygon([[-67,-2],[-42,10],[-10,18],[-9,38],[-44,28],[-67,14]],'#63735b','#34463a');
  polygon([[-10,18],[24,13],[60,0],[60,19],[25,33],[-9,38]],'#394d42','#293d33');
  polygon([[-67,-2],[-52,-17],[-25,-27],[8,-30],[38,-21],[60,0],[24,13],[-10,18],[-42,10]],'#758b61','#415740');
  polygon([[-51,-5],[-34,-17],[-9,-22],[22,-19],[39,-10],[15,-1],[-12,4],[-35,2]],'#8b9c71',null);
  ctx.strokeStyle='#a6b69199';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-52,-7);ctx.lineTo(-27,-20);ctx.lineTo(-5,-24);ctx.stroke();
  ctx.strokeStyle='#263a3099';ctx.lineWidth=1;for(const [px,py] of [[-51,11],[-32,19],[-15,23],[10,21],[35,15],[49,9]]){ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+3,py+8);ctx.lineTo(px+7,py+10);ctx.stroke();}
  ctx.fillStyle='#485f43';for(const [px,py] of [[-34,-9],[-25,-12],[15,-13],[29,-9]]){ctx.beginPath();ctx.ellipse(px,py,5,2,0,0,Math.PI*2);ctx.fill();}
 }else{
  ctx.fillStyle='#17291ea0';ctx.beginPath();ctx.ellipse(5,5,kind==='tree'?23:15,kind==='tree'?7:5,0,0,Math.PI*2);ctx.fill();
  if(kind==='tree'){
   polygon([[-5,4],[-4,-26],[-1,-32],[4,-25],[5,4],[0,8]],'#72583b','#3b3b2b');polygon([[0,6],[1,-25],[5,-27],[5,4]],'#493e2e',null);
   ctx.strokeStyle='#b69a6b';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-2,-17);ctx.lineTo(-2,-2);ctx.moveTo(2,-20);ctx.lineTo(1,-8);ctx.stroke();
   for(const [px,py,r,c] of [[-12,-26,12,'#294d35'],[10,-28,13,'#264634'],[0,-35,16,'#315b3b'],[-9,-38,11,'#417349'],[7,-42,12,'#4e8051'],[0,-48,9,'#61945b'],[-15,-31,7,'#4a7b4c'],[14,-35,7,'#3a6c43']])circle(px,py,r,c);
   circle(-5,-47,3,'#91b97988');circle(5,-42,2,'#aecb8a88');
  }else if(kind==='bush'){
   for(const [px,py,r,c] of [[-9,-4,8,'#294c33'],[9,-4,8,'#294933'],[0,-9,11,'#37663c'],[-6,-12,7,'#4b7a49'],[5,-14,7,'#5e8e55']])circle(px,py,r,c);
   circle(-4,-15,2,'#a2bd7b');circle(6,-12,2,'#91af71');
  }else{
   polygon([[-15,2],[-11,-10],[-3,-17],[8,-15],[15,-5],[13,3],[1,8],[-10,6]],'#788476','#39473c');
   polygon([[-11,-10],[-3,-17],[8,-15],[4,-9],[-4,-7]],'#a5ad97',null);polygon([[4,-9],[8,-15],[15,-5],[13,3],[1,8]],'#586b5f',null);
   ctx.strokeStyle='#46594d';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-5,-7);ctx.lineTo(-1,-3);ctx.lineTo(-3,2);ctx.moveTo(4,-9);ctx.lineTo(6,-4);ctx.lineTo(10,-2);ctx.stroke();
  }
 }
 ctx.restore();
}
