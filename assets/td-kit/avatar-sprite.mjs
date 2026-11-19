// Shared high-detail 2D chibi renderer. All parts are drawn at a ground anchor.
// Same source powers the character editor, its item previews and the Lobby.
export const AVATAR_2D_DEFAULTS=Object.freeze({skin:'#f1c49d',hair:'#67412f',shirt:'#497cba',pants:'#4b5779',shoes:'#463d40',hairStyle:'short',outfit:'casual',accessory:'none',head:'none',armor:'none',legs:'default',feet:'default',weapon:'none'});
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
 // Independent cape accessory is behind the torso, so any outfit may use it.
 if(a.accessory==='cape'){
  path([[-14,-55],[-25,-48],[-30,-10],[-13,-15],[0,-11],[13,-15],[30,-10],[25,-48],[14,-55]],'#863d67','#382b4b',2);
  path([[-14,-51],[-22,-43],[-25,-15],[-14,-20]],'#dc789a80',null);
  line([[15,-52],[24,-19]],'#f2afbf80',1.5);
 }
 // Equipment layer: trousers and footwear, independent from the outfit.
 if(a.legs==='cargo'){
  for(const x of [-12,5]){path([[x,-24],[x+8,-24],[x+8,-15],[x,-15]],'#657457','#303e3c');line([[x+2,-21],[x+6,-21]],'#d6d2a1',1);}
 }else if(a.legs==='plate'){
  for(const x of [-13,3]){path([[x,-27],[x+11,-27],[x+12,-9],[x+1,-9]],'#a3b6c7','#34495b',1.5);line([[x+3,-23],[x+9,-23]],'#e8f6ff',1.5);}
 }
 if(a.feet==='boots'){
  path([[-16,-13],[-3,-13],[-3,-3],[-17,-3]],'#72503d','#3a3033',1.5);path([[3,-13],[16,-13],[18,-3],[3,-3]],'#72503d','#3a3033',1.5);
  line([[-13,-9],[-6,-9]],'#dfbc83',2);line([[6,-9],[13,-9]],'#dfbc83',2);
 }else if(a.feet==='mech'){
  for(const x of [-15,3]){path([[x,-14],[x+12,-14],[x+15,-2],[x-3,-2]],'#819eb5','#2a4159',1.7);line([[x+2,-8],[x+10,-8]],'#66efff',2);}
 }
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
 // Material seams, stitching, and distinct equipment silhouettes.
 if(a.outfit==='military'){
  path([[-16,-54],[-9,-58],[-3,-49],[-10,-35],[-16,-37]],'#65765c','#34483d',1.7);
  path([[16,-54],[9,-58],[3,-49],[10,-35],[16,-37]],'#65765c','#34483d',1.7);
  path([[-11,-49],[-3,-49],[-3,-37],[-11,-37]],'#52634a','#263b35');
  path([[3,-49],[11,-49],[11,-37],[3,-37]],'#52634a','#263b35');
  line([[-10,-45],[-4,-45]],'#b6c4a0',1.2);line([[4,-45],[10,-45]],'#b6c4a0',1.2);
  path([[-22,-42],[-14,-42],[-14,-38],[-22,-38]],'#405b45');
  path([[14,-42],[22,-42],[22,-38],[14,-38]],'#405b45');
  for(const x of [-10,10]){ell(x,-31,1.3,1.3,'#e0c58c');}
 }else if(a.outfit==='powered'){
  path([[-17,-55],[-25,-51],[-28,-39],[-19,-36],[-13,-45]],'#a9b7c6','#26344a',2);
  path([[17,-55],[25,-51],[28,-39],[19,-36],[13,-45]],'#a9b7c6','#26344a',2);
  path([[-15,-53],[-7,-59],[7,-59],[15,-53],[12,-33],[-12,-33]],'#718aa5','#26344a',2);
  path([[-11,-50],[0,-54],[11,-50],[8,-37],[-8,-37]],'#344b68','#a5bfd0');
  ell(0,-44,6,6,'#c4faff','#356d94',2);ell(0,-44,3.3,3.3,'#62dfff');
  line([[-22,-49],[-18,-45]],'#d6f6ff',2);line([[18,-45],[22,-49]],'#d6f6ff',2);
  path([[-13,-27],[-2,-27],[-2,-10],[-14,-10]],'#8c9fae','#314255',1.8);
  path([[2,-27],[13,-27],[14,-10],[2,-10]],'#8c9fae','#314255',1.8);
  line([[-11,-13],[-5,-13]],'#91efff',2);line([[5,-13],[11,-13]],'#91efff',2);
 }
 // Equipment layer: torso armor is independent of outfit and color.
 if(a.armor==='leather'){
  path([[-14,-54],[-8,-58],[8,-58],[14,-54],[12,-32],[-12,-32]],'#795642','#352f35',2);
  path([[-9,-51],[9,-51],[7,-37],[-7,-37]],'#a37b55','#594038');
  line([[-12,-48],[12,-36]],'#e0bd80',2);
 }else if(a.armor==='plate'||a.armor==='mech'){
  const mech=a.armor==='mech';
  path([[-16,-54],[-8,-60],[8,-60],[16,-54],[13,-33],[-13,-33]],mech?'#5b7899':'#aebac3','#2d3e55',2);
  path([[-12,-51],[0,-55],[12,-51],[10,-38],[-10,-38]],mech?'#253e60':'#d6dfe3','#607287');
  ell(0,-45,mech?5:3,mech?5:3,mech?'#5cecff':'#d7bb70','#536e7b');
  line([[-13,-36],[13,-36]],mech?'#80eaff':'#f3f6f7',2);
  path([[-17,-54],[-24,-52],[-26,-44],[-17,-42]],mech?'#6987a8':'#b8c6ce','#34495c');
  path([[17,-54],[24,-52],[26,-44],[17,-42]],mech?'#6987a8':'#b8c6ce','#34495c');
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
 // Fine strand highlights follow the selected hairstyle and direction.
 line([[-20,-104],[-17,-109],[-12,-112]],'#ffffff2e',1.2);
 line([[5,-114],[12,-111],[17,-106]],'#ffffff38',1.3);
 line([[19,-102],[21,-97]],'#171a2d55',1.2);
 if(a.hairStyle==='long'){line([[-23,-88],[-23,-66]],'#ffffff30',1.4);line([[22,-88],[23,-64]],'#ffffff2b',1.4);}
 if(a.hairStyle==='spiky'){line([[-14,-113],[-12,-118]],'#ffffff50',1.4);line([[8,-116],[12,-119]],'#ffffff45',1.4);}
 if(a.head==='none'&&a.outfit==='military'){
  // Beret-like soft tactical cap; hair and face remain visible.
  path([[-23,-108],[-17,-120],[-2,-124],[14,-119],[22,-109],[18,-104],[-19,-103]],'#526b55','#293f3a',2);
  line([[-18,-106],[18,-106]],'#b1bd9b',2);
  ell(4,-116,2.2,2.2,'#d9c18c');
 }else if(a.head==='none'&&a.outfit==='powered'){
  // Open-faced sci-fi crown preserves the character's facial expression.
  path([[-24,-104],[-21,-115],[-12,-120],[-7,-110],[8,-110],[14,-120],[23,-113],[25,-102],[17,-105],[11,-108],[-11,-108],[-18,-104]],'#9eafc4','#30435d',2);
  path([[-13,-110],[13,-110],[9,-105],[-9,-105]],'#55d6ec','#245e7d');
  ell(-20,-93,3,7,'#728ca9','#293d59');ell(20,-93,3,7,'#728ca9','#293d59');
  line([[-8,-109],[8,-109]],'#ecffff',1.3);
 }
 // Headgear equipment layer, separate from outfit and hair.
 if(a.head==='helmet'){
  path([[-25,-103],[-21,-116],[-12,-121],[13,-121],[22,-115],[25,-103],[22,-97],[-22,-97]],'#68775d','#304338',2);
  path([[-24,-101],[24,-101],[21,-95],[-21,-95]],'#405843','#293b34');
  line([[-13,-115],[11,-115]],'#bdc7a6',1.5);
 }else if(a.head==='crown'){
  path([[-21,-112],[-23,-126],[-12,-119],[-4,-135],[5,-120],[17,-130],[21,-112]],'#e8c15b','#846142',2);
  ell(0,-121,3,4,'#6cddf1','#fff1ae');ell(-15,-118,2,2,'#d86c88');ell(14,-118,2,2,'#d86c88');
 }else if(a.head==='tech'){
  path([[-24,-104],[-21,-117],[-8,-124],[8,-124],[21,-117],[24,-104],[18,-100],[-18,-100]],'#849db6','#2b4059',2);
  path([[-16,-108],[16,-108],[12,-103],[-12,-103]],'#61e4f0','#34647c');
  ell(-22,-96,3,6,'#5d7896');ell(22,-96,3,6,'#5d7896');
 }
 // Foreground hand-held items: drawn after face/hair/headgear to avoid being hidden. to the right-hand anchor.
 if(a.weapon==='sword'){
  line([[20,-28],[33,-57]],'#a4b6c7',5);line([[20,-28],[33,-57]],'#f3f9ff',2);
  line([[15,-34],[27,-30]],'#c5a56c',4);ell(19,-27,3,3,'#e2c17c');
 }else if(a.weapon==='staff'){
  line([[20,-21],[32,-90]],'#704c3b',4);ell(32,-92,7,9,'#6ad8ff','#c7f6ff',2);ell(30,-95,2,3,'#fff');
 }else if(a.weapon==='blaster'){
  path([[18,-31],[30,-38],[44,-37],[45,-30],[29,-28],[25,-19],[20,-19]],'#667f99','#293c55',2);
  path([[35,-36],[46,-36],[46,-31],[35,-31]],'#68e8fc','#39708a');
 }
 // Independent facial accessories: glasses, goggles, and floating magical halo.
 if(!back && a.accessory==='glasses'){
  if(side){ell(10,-82,9,11,'#d8f4ff30','#293c55',2.3);line([[18,-84],[23,-86]],'#293c55',2.2);}
  else {ell(-10,-82,10,11,'#d8f4ff24','#293c55',2.3);ell(10,-82,10,11,'#d8f4ff24','#293c55',2.3);line([[-1,-84],[1,-84]],'#293c55',2);}
 }else if(!back && a.accessory==='goggles'){
  path([[-24,-91],[24,-91],[22,-76],[-22,-76]],'#324c67d9','#192d46',2);
  if(side){ell(9,-83,10,7,'#70e9ef9c','#d5fbff',1.5);}
  else{ell(-10,-83,9,7,'#70e9ef9c','#d5fbff',1.5);ell(10,-83,9,7,'#70e9ef9c','#d5fbff',1.5);}
  line([[-17,-87],[17,-87]],'#ffffff99',1.3);
 }
 if(a.accessory==='halo'){
  ell(0,-132,19,5,'#b8ffff50','#e9e3a1',3);
  ell(0,-132,14,2,'#fff4b4a0');
 }
 ctx.restore();
}
