// Shared high-detail 2D chibi renderer. All parts are drawn at a ground anchor.
// Same source powers the character editor, its item previews and the Lobby.
export const AVATAR_2D_DEFAULTS=Object.freeze({skin:'#f1c49d',hair:'#67412f',shirt:'#497cba',pants:'#4b5779',shoes:'#463d40',hairStyle:'short',outfit:'casual'});
export function drawAvatarSprite(ctx,options={}){
 const a={...AVATAR_2D_DEFAULTS,...options};
 const direction=['front','right','back','left'].includes(a.direction)?a.direction:'front';
 const side=direction==='right'||direction==='left',back=direction==='back';
 const path=(points,fill,stroke='#4d3941',w=1.3)=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=w;ctx.stroke();}};
 const ell=(x,y,rx,ry,fill,stroke=null,w=1.5)=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.lineWidth=w;ctx.strokeStyle=stroke;ctx.stroke();}};
 const line=(pts,color,w=1.5)=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.stroke();};
 ctx.save();ctx.lineJoin='round';if(direction==='left')ctx.scale(-1,1);
 ell(2,1,22,5,'#101a2290');
 // boots and small legs
 path([[-14,-27],[-2,-27],[-3,-7],[-13,-7]],a.pants);
 path([[3,-27],[14,-27],[14,-7],[3,-7]],a.pants);
 line([[-12,-20],[-4,-20]],'#ffffff30',2);line([[5,-20],[13,-20]],'#ffffff30',2);
 path([[-14,-10],[-3,-10],[0,-1],[-7,1],[-18,-2]],a.shoes,'#292c39',2);
 path([[3,-10],[14,-10],[19,-2],[9,1],[2,-2]],a.shoes,'#292c39',2);
 line([[-17,-2],[-7,0]],'#c5b5a0',2);line([[9,0],[18,-2]],'#c5b5a0',2);
 // arms and sleeves
 path([[-15,-55],[-24,-49],[-22,-28],[-14,-27],[-10,-36]],a.shirt,'#3e3d4b',2);
 path([[15,-55],[24,-49],[22,-28],[14,-27],[10,-36]],a.shirt,'#3e3d4b',2);
 ell(-19,-28,5,6,a.skin,'#aa7869');ell(19,-28,5,6,a.skin,'#aa7869');
 ell(-21,-29,2,2,'#ffe7c6');ell(17,-29,2,2,'#ffe7c6');
 // outfit silhouette
 path([[-14,-55],[-7,-59],[8,-59],[15,-55],[16,-30],[10,-23],[-11,-23],[-16,-30]],a.shirt,'#344253',2);
 path([[2,-58],[9,-58],[15,-53],[13,-30],[3,-24]],'#111d3550',null);
 path([[-14,-32],[15,-32],[12,-25],[-12,-25]],'#29394e');
 line([[-13,-32],[14,-32]],'#d5b88c',2);
 path([[-4,-34],[5,-34],[5,-29],[-4,-29]],'#e3b865','#5e4a40');
 if(a.outfit==='adventurer'){
  path([[-15,-55],[-21,-51],[-15,-41],[-6,-48]],'#8a6544');
  path([[15,-55],[21,-51],[15,-41],[6,-48]],'#8a6544');
  line([[-10,-56],[9,-29]],'#dfc59b',4);line([[-10,-56],[9,-29]],'#7e563d',2);
  path([[7,-37],[16,-37],[16,-26],[7,-26]],'#aa744d','#5c453e',2);
  path([[-12,-27],[-8,-20],[-3,-27]],'#d7b878');
 }else if(a.outfit==='sport'){
  line([[-7,-55],[-5,-32]],'#e7f5f5',3);line([[5,-55],[7,-32]],'#e7f5f5',3);
  line([[-12,-44],[12,-44]],'#ffffffb0',2);
  path([[-15,-30],[15,-30],[12,-24],[-12,-24]],'#f2f6ff');
 }else{
  path([[-7,-58],[0,-49],[7,-58]],'#f5e4d0','#af9b90');
  line([[0,-49],[0,-33]],'#e8d2a5',2);
  ell(0,-42,2,2,'#f6d18b');ell(0,-36,2,2,'#f6d18b');
 }
 // neck, ears, head: oversized anime-chibi proportions
 path([[-6,-63],[6,-63],[6,-53],[-6,-53]],a.skin,'#b98470');
 if(a.hairStyle==='long'){
  path([[-23,-94],[-18,-110],[0,-117],[20,-110],[24,-92],[25,-54],[13,-48],[8,-75],[-12,-75],[-17,-49],[-26,-57]],a.hair,'#392d3b',2);
  line([[-21,-79],[-19,-56]],'#ffffff35',2);
 }
 if(a.hairStyle==='bun'){ell(-16,-109,10,10,a.hair,'#392d3b',2);ell(15,-110,9,9,a.hair,'#392d3b',2);}
 ell(-21,-81,5,9,a.skin,'#b78070',1.5);ell(21,-81,5,9,a.skin,'#b78070',1.5);
 ell(-21,-81,2,4,'#e4a18e');ell(21,-81,2,4,'#e4a18e');
 // large rounded face and cheek shading
 path([[-22,-94],[-19,-105],[-8,-111],[10,-110],[21,-102],[23,-90],[22,-72],[16,-62],[5,-58],[-7,-59],[-17,-66],[-23,-78]],a.skin,'#966b64',2);
 ell(-13,-75,8,5,'#ef9e9950');ell(14,-75,8,5,'#ef9e9950');
 ell(-10,-96,9,8,'#ffffff20');
 if(!back){
  if(side){
   ell(9,-82,7,11,'#fffaf3','#77585b',1.5);ell(12,-82,4.5,8,'#3b485d');ell(13,-85,2.7,5,'#182339');ell(11,-88,2.3,3.2,'#fff');
   line([[2,-96],[15,-96]],'#52383e',2.5);
   ell(21,-75,3,2,'#e99a92');line([[14,-69],[18,-70]],'#a86d69',1.5);
  }else{
   for(const x of [-10,10]){
    ell(x,-82,8,11,'#fffaf5','#725965',1.5);
    ell(x+1,-81,5.5,8,'#4c5b70');ell(x+1,-82,3.4,6,'#1d2d47');
    ell(x-1,-87,2.7,3.2,'#fff');ell(x+4,-77,1.4,1.6,'#c8e9ff');
    line([[x-7,-96],[x+6,-96]],'#593b40',2.2);
   }
   ell(-17,-73,4.5,2.5,'#ed8f9a75');ell(17,-73,4.5,2.5,'#ed8f9a75');
   ell(0,-74,2,1.5,'#df9d89');
   line([[-3,-67],[0,-65],[4,-67]],'#9c6264',1.7);
  }
 }
 // layered hair cap and strands; rear view covers face
 path([[-24,-89],[-25,-102],[-18,-113],[-6,-119],[10,-118],[22,-109],[26,-98],[23,-84],[17,-92],[12,-91],[5,-96],[-2,-91],[-11,-95],[-17,-87]],a.hair,'#352e3c',2);
 path([[-21,-102],[-13,-113],[0,-116],[14,-112],[21,-104],[13,-107],[6,-102],[-3,-107],[-12,-100]],'#ffffff24',null);
 if(back){
  path([[-22,-97],[-15,-111],[0,-118],[17,-111],[23,-98],[21,-70],[10,-59],[-8,-59],[-21,-72]],a.hair,'#352e3c',2);
  line([[-15,-101],[-10,-75]],'#ffffff25',2);line([[12,-106],[17,-78]],'#ffffff25',2);
 }else if(a.hairStyle==='spiky'){
  path([[-24,-100],[-31,-115],[-18,-111],[-16,-125],[-5,-115],[3,-132],[11,-115],[24,-124],[22,-108],[30,-108],[21,-91],[11,-97],[2,-93],[-9,-99]],a.hair,'#352e3c',2);
  path([[-12,-114],[-4,-121],[2,-110],[9,-120]],'#ffffff35',null);
 }else if(a.hairStyle==='long'){
  path([[-24,-102],[-12,-116],[4,-119],[19,-110],[22,-94],[10,-99],[2,-90],[-7,-95],[-18,-87]],a.hair,'#352e3c',2);
  line([[-19,-93],[-17,-66]],'#ffffff40',2);
 }else if(a.hairStyle==='bun'){
  path([[-24,-100],[-13,-114],[4,-117],[21,-109],[23,-96],[11,-99],[2,-91],[-9,-97]],a.hair,'#352e3c',2);
 }else{
  path([[-23,-103],[-13,-116],[0,-119],[18,-113],[24,-101],[18,-95],[10,-100],[4,-91],[-4,-98],[-14,-91],[-22,-92]],a.hair,'#352e3c',2);
 }
 line([[-15,-111],[-3,-115],[9,-111]],'#ffffff45',2);
 ctx.restore();
}
