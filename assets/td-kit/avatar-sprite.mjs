// Original 2D three-quarter character concept, drawn at a ground anchor.
export const AVATAR_2D_DEFAULTS=Object.freeze({skin:'#d9ad88',hair:'#433630',shirt:'#6b8c78',pants:'#59685b',shoes:'#3d4940',hairStyle:'short',outfit:'casual'});
export function drawAvatarSprite(ctx,options={}){
 const a={...AVATAR_2D_DEFAULTS,...options},direction=['front','right','back','left'].includes(options.direction)?options.direction:'front';
 const ellipse=(x,y,rx,ry,fill)=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();};
 const polygon=(points,fill,stroke='#34443b')=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}};
 ctx.save();ctx.lineJoin='round';if(direction==='left')ctx.scale(-1,1);ellipse(4,3,18,6,'#10221b88');
 polygon([[-9,-28],[-2,-26],[-3,-5],[-10,-4]],a.pants);polygon([[1,-27],[9,-30],[10,-8],[3,-5]],a.pants);
 polygon([[-11,-7],[-3,-7],[-2,-2],[-8,0],[-14,-2]],a.shoes);polygon([[3,-8],[10,-10],[14,-5],[9,-2],[3,-3]],a.shoes);
 ctx.save();ctx.translate(0,-6);
 if(a.hairStyle==='long'){ctx.save();ctx.translate(0,-55);ctx.scale(.8,.8);ctx.translate(0,55);polygon([[-11,-58],[-10,-77],[1,-84],[12,-76],[15,-45],[5,-39],[-11,-43]],a.hair);ctx.restore();}
 if(a.outfit==='adventurer')polygon([[-15,-42],[-18,-51],[-13,-59],[-8,-57],[-7,-38]],'#675c46');
 polygon([[-12,-46],[-8,-51],[8,-53],[13,-46],[10,-24],[1,-20],[-10,-23]],a.shirt);
 polygon([[1,-51],[8,-53],[13,-46],[10,-24],[1,-20]],'#233e3555',null);
 polygon([[-12,-45],[-16,-41],[-15,-30],[-11,-27],[-8,-32],[-9,-40]],a.shirt);polygon([[11,-46],[15,-41],[16,-31],[12,-27],[9,-32],[9,-40]],a.shirt);
 ellipse(-13,-29,3,4,a.skin);ellipse(13,-29,3,4,a.skin);
 if(a.outfit==='adventurer'){ctx.strokeStyle='#d9c294';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-8,-49);ctx.lineTo(8,-26);ctx.stroke();ctx.fillStyle='#ad9165';ctx.fillRect(2,-31,6,5);}
 if(a.outfit==='sport'){ctx.strokeStyle='#e1e8d1';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-8,-40);ctx.lineTo(8,-43);ctx.moveTo(-8,-36);ctx.lineTo(8,-39);ctx.stroke();}
 polygon([[-4,-55],[4,-56],[5,-49],[0,-47],[-4,-49]],a.skin);
 ctx.save();ctx.translate(0,-55);ctx.scale(.8,.8);ctx.translate(0,55);
 polygon([[-11,-74],[-7,-81],[3,-83],[11,-78],[12,-65],[8,-58],[1,-55],[-8,-59],[-12,-66]],a.skin);
 polygon([[3,-82],[11,-78],[12,-65],[8,-58],[1,-55],[4,-65]],'#8e604833',null);
 if(direction==='back')polygon([[-12,-67],[-13,-78],[-9,-83],[1,-85],[10,-81],[13,-75],[12,-63],[7,-57],[-5,-58],[-11,-63]],a.hair);
 else if(a.hairStyle==='spiky')polygon([[-12,-68],[-14,-78],[-10,-76],[-8,-87],[-4,-82],[2,-89],[5,-82],[10,-85],[12,-76],[11,-71],[5,-76],[-3,-75],[-9,-70]],a.hair);
 else polygon([[-12,-69],[-12,-77],[-8,-83],[1,-85],[9,-82],[12,-76],[11,-72],[5,-75],[-1,-74],[-7,-70]],a.hair);
 if(a.hairStyle==='bun')ellipse(-5,-83,5,5,a.hair);
 if(direction!=='back'){ctx.fillStyle='#f6e9d4';ellipse(-5,-68,3,3.5,'#f6e9d4');if(direction==='front')ellipse(5,-69,3,3.5,'#f6e9d4');ellipse(-4.5,-68,1.7,2.5,'#3a302c');if(direction==='front')ellipse(5.5,-69,1.7,2.5,'#3a302c');ctx.strokeStyle='#8c5f50';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-62);ctx.lineTo(4,-63);ctx.stroke();}
 ctx.restore();ctx.restore();ctx.restore();
}
