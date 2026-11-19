// Reusable procedural 2D props; draw at a screen-space ground anchor.
export const EXTRA_SPRITES=Object.freeze(['terrain:grass','terrain:dirt','terrain:concrete','terrain:water','terrain:sand','terrain:asphalt','weapon:crate','weapon:barrel','weapon:missile','weapon:barricade','weapon:sandbags','weapon:turret','weapon:ammo','monster:walker','monster:flyer','monster:robot','monster:scout','monster:heavy','building:bunker','building:generator','building:radar','building:warehouse','building:wall','building:watchtower','building:antenna','building:tent','nature:pine','nature:stump','nature:flowers','nature:rocks']);
export function drawExtraSprite(ctx,kind,scale=1){
 if(!EXTRA_SPRITES.includes(kind))throw new RangeError(`Unknown sprite: ${kind}`);
 if(!Number.isFinite(scale)||scale<=0)throw new RangeError('Scale must be positive');
 const poly=(pts,fill,stroke='#263a32')=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}};
 const circle=(x,y,r,color)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();};
 ctx.save();ctx.scale(scale,scale);
 const diamond=[[-28,0],[0,-14],[28,0],[0,14]];
 if(kind.startsWith('terrain:')){
  const colors={'terrain:grass':'#698956','terrain:dirt':'#9b805b','terrain:concrete':'#9ca69c','terrain:water':'#538b9a','terrain:sand':'#c0a879','terrain:asphalt':'#59645e'};poly(diamond,colors[kind],'#344c3c');
  if(kind==='terrain:grass'){ctx.strokeStyle='#bfd69a';ctx.beginPath();for(const [x,y] of [[-12,0],[2,-5],[12,3]]){ctx.moveTo(x,y);ctx.lineTo(x-2,y-4);ctx.moveTo(x,y);ctx.lineTo(x+2,y-4);}ctx.stroke();}
  if(kind==='terrain:dirt'){ctx.fillStyle='#cbb08a';for(const [x,y] of [[-10,0],[1,-5],[8,3],[-4,6]])ctx.fillRect(x,y,3,2);}
  if(kind==='terrain:concrete'){ctx.strokeStyle='#d4ddd077';ctx.beginPath();ctx.moveTo(-14,-7);ctx.lineTo(14,7);ctx.moveTo(14,-7);ctx.lineTo(-14,7);ctx.stroke();}
  if(kind==='terrain:water'){ctx.strokeStyle='#d8f3edaa';ctx.beginPath();ctx.moveTo(-15,-1);ctx.lineTo(-7,-1);ctx.moveTo(2,-4);ctx.lineTo(13,-4);ctx.moveTo(-3,5);ctx.lineTo(8,5);ctx.stroke();}
  if(kind==='terrain:sand'){ctx.fillStyle='#e9d09a';for(const [x,y] of [[-14,1],[-3,-5],[9,0],[3,6]])ctx.fillRect(x,y,2,2);}
  if(kind==='terrain:asphalt'){ctx.strokeStyle='#e6cf8b';ctx.lineWidth=2;ctx.setLineDash([7,5]);ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(20,0);ctx.stroke();ctx.setLineDash([]);}
 }else if(kind.startsWith('weapon:')){
  ctx.fillStyle='#15281d99';ctx.beginPath();ctx.ellipse(3,7,19,6,0,0,Math.PI*2);ctx.fill();
  if(kind==='weapon:crate'){poly([[-13,-5],[0,-11],[13,-5],[13,7],[0,13],[-13,7]],'#8e7954');poly([[0,-11],[13,-5],[13,7],[0,13]],'#655b42');ctx.strokeStyle='#c9ae7a';ctx.strokeRect(-7,-3,6,7);}
  if(kind==='weapon:barrel'){poly([[-8,-13],[8,-13],[9,5],[0,9],[-9,5]],'#6b8271');ctx.fillStyle='#b6c6aa';ctx.fillRect(-8,-8,16,2);ctx.fillRect(-8,1,16,2);circle(0,-13,8,'#9bac98');}
  if(kind==='weapon:missile'){poly([[-5,7],[-5,-14],[0,-23],[5,-14],[5,7]],'#adb8ad');poly([[0,-23],[5,-14],[0,-14]],'#df6d5b');poly([[-5,2],[-10,8],[-5,8]],'#d1d9c9');poly([[5,2],[10,8],[5,8]],'#7e9386');}
  if(kind==='weapon:barricade'){poly([[-21,0],[0,-9],[21,0],[21,8],[0,17],[-21,8]],'#7b8472');poly([[-21,0],[0,9],[21,0],[21,3],[0,12],[-21,3]],'#e9c46d');ctx.strokeStyle='#3c4740';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,-3);ctx.lineTo(-6,8);ctx.moveTo(0,-8);ctx.lineTo(7,5);ctx.moveTo(12,-4);ctx.lineTo(17,2);ctx.stroke();}
  if(kind==='weapon:sandbags'){for(const [x,y] of [[-12,2],[0,5],[12,1],[-6,-3],[6,-4]]){ctx.fillStyle='#b49c70';ctx.beginPath();ctx.ellipse(x,y,8,4,-.1,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#756a51';ctx.stroke();}}
  if(kind==='weapon:turret'){poly([[-14,2],[0,-5],[14,2],[0,9]],'#65776a');poly([[-8,-5],[0,-15],[8,-5],[0,0]],'#8f9e8a');ctx.strokeStyle='#34493f';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(1,-8);ctx.lineTo(13,-21);ctx.stroke();circle(1,-8,3,'#dcae72');}
  if(kind==='weapon:ammo'){for(const x of [-8,0,8]){poly([[x-3,5],[x-3,-9],[x,-14],[x+3,-9],[x+3,5]],'#b69a60');ctx.fillStyle='#e0c984';ctx.fillRect(x-2,-7,4,2);}}
 }else if(kind.startsWith('monster:')){
  ctx.fillStyle='#16251c99';ctx.beginPath();ctx.ellipse(0,7,14,5,0,0,Math.PI*2);ctx.fill();
  if(kind==='monster:walker'){poly([[-10,4],[-9,-12],[0,-18],[9,-12],[10,4],[0,9]],'#925c4a');circle(0,-14,7,'#c78268');ctx.fillStyle='#ffdf96';ctx.fillRect(-5,-15,3,2);ctx.fillRect(2,-15,3,2);}
  if(kind==='monster:flyer'){poly([[-5,-13],[-22,-22],[-15,-8],[-5,-4]],'#8a759d');poly([[5,-13],[22,-22],[15,-8],[5,-4]],'#8a759d');circle(0,-12,8,'#c7a7d3');circle(-2,-14,2,'#f9eeff');}
  if(kind==='monster:robot'){poly([[-11,3],[-11,-14],[0,-20],[11,-14],[11,3],[0,9]],'#6d8179');poly([[0,-20],[11,-14],[11,3],[0,9]],'#455e56');ctx.fillStyle='#ef8d73';ctx.fillRect(-7,-12,14,4);ctx.fillStyle='#c9d7c5';ctx.fillRect(-13,2,5,5);ctx.fillRect(8,2,5,5);}
  if(kind==='monster:scout'){poly([[-11,2],[-7,-9],[0,-15],[7,-9],[11,2],[0,7]],'#80925f');circle(0,-11,5,'#b6c891');ctx.fillStyle='#f9eaa1';ctx.fillRect(-5,-11,3,2);ctx.fillRect(2,-11,3,2);}
  if(kind==='monster:heavy'){poly([[-16,4],[-14,-15],[0,-23],[14,-15],[16,4],[0,11]],'#635d51');poly([[0,-23],[14,-15],[16,4],[0,11]],'#404b42');ctx.fillStyle='#de8b68';ctx.fillRect(-9,-14,18,4);ctx.fillStyle='#a8b3a0';ctx.fillRect(-17,1,6,7);ctx.fillRect(11,1,6,7);}
 }else if(kind.startsWith('nature:')){
  ctx.fillStyle='#17291e88';ctx.beginPath();ctx.ellipse(3,6,20,6,0,0,Math.PI*2);ctx.fill();
  if(kind==='nature:pine'){ctx.fillStyle='#705942';ctx.fillRect(-3,-16,6,21);poly([[-18,-14],[0,-46],[18,-14]],'#315b3a');poly([[-15,-25],[0,-54],[15,-25]],'#47754a');poly([[-10,-36],[0,-60],[10,-36]],'#5f8b58');}
  if(kind==='nature:stump'){poly([[-10,-9],[0,-14],[10,-9],[10,4],[0,8],[-10,4]],'#765a3d');poly([[-10,-9],[0,-14],[10,-9],[0,-4]],'#c1a77b');ctx.strokeStyle='#765a3d';ctx.beginPath();ctx.ellipse(0,-9,5,2,0,0,Math.PI*2);ctx.stroke();}
  if(kind==='nature:flowers'){for(const [x,y] of [[-10,0],[0,-4],[9,1]]){ctx.strokeStyle='#658a4c';ctx.beginPath();ctx.moveTo(x,y+5);ctx.lineTo(x,y-4);ctx.stroke();circle(x,y-5,3,'#f3d8a7');circle(x,y-5,1,'#c99b5d');}}
  if(kind==='nature:rocks'){for(const [x,y,r] of [[-10,2,6],[1,-3,8],[11,3,5]]){circle(x,y,r,'#77877a');circle(x-2,y-3,r*.45,'#abb7a2');}}
 }else{
  ctx.fillStyle='#15281d99';ctx.beginPath();ctx.ellipse(4,10,30,9,0,0,Math.PI*2);ctx.fill();
  poly([[-24,1],[-24,-19],[0,-29],[24,-19],[24,1],[0,12]],'#a0ad9d');poly([[0,-29],[24,-19],[24,1],[0,12]],'#5c7065');poly([[-24,-19],[0,-29],[24,-19],[0,-9]],'#c2ccbb');ctx.fillStyle='#3d5760';ctx.fillRect(-17,-15,34,7);ctx.fillStyle='#86c8d0';for(let x=-14;x<=10;x+=8)ctx.fillRect(x,-13,5,3);
  if(kind==='building:bunker'){ctx.fillStyle='#53675b';ctx.fillRect(-13,-28,26,9);ctx.fillStyle='#263b33';ctx.fillRect(-6,-25,12,3);}
  if(kind==='building:generator'){ctx.fillStyle='#657d72';ctx.fillRect(-9,-37,18,14);circle(0,-36,6,'#e5b76f');}
  if(kind==='building:radar'){ctx.strokeStyle='#d5e2d0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-25);ctx.lineTo(0,-43);ctx.stroke();poly([[-12,-44],[0,-40],[12,-44],[8,-35],[0,-32],[-8,-35]],'#b9c8bd');circle(0,-39,3,'#91c5d2');}
  if(kind==='building:warehouse'){poly([[-24,-19],[0,-34],[24,-19],[0,-10]],'#697a68');ctx.strokeStyle='#d6d8ba';ctx.beginPath();ctx.moveTo(-18,-20);ctx.lineTo(0,-30);ctx.lineTo(18,-20);ctx.stroke();}
  if(kind==='building:wall'){poly([[-28,-12],[0,-24],[28,-12],[28,3],[0,15],[-28,3]],'#929d90');poly([[0,-24],[28,-12],[28,3],[0,15]],'#607267');ctx.strokeStyle='#c5d1be';ctx.beginPath();ctx.moveTo(-25,-8);ctx.lineTo(0,3);ctx.lineTo(25,-8);ctx.stroke();}
  if(kind==='building:watchtower'){ctx.fillStyle='#52675a';ctx.fillRect(-12,-43,5,30);ctx.fillRect(7,-43,5,30);poly([[-18,-42],[0,-50],[18,-42],[18,-34],[0,-26],[-18,-34]],'#9fac97');poly([[-21,-42],[0,-54],[21,-42],[0,-32]],'#607566');}
  if(kind==='building:antenna'){ctx.strokeStyle='#b9cbbd';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(0,-58);ctx.moveTo(-10,-42);ctx.lineTo(10,-42);ctx.stroke();circle(0,-59,3,'#e78b78');}
  if(kind==='building:tent'){poly([[-24,0],[-13,-27],[0,-33],[13,-27],[24,0],[0,10]],'#7b8c6c');poly([[0,-33],[13,-27],[24,0],[0,10]],'#576f59');ctx.fillStyle='#30483b';ctx.fillRect(-4,-9,8,11);}
 }
 ctx.restore();
}
