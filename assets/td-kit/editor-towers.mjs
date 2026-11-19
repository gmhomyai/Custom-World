// Map Editor V2 original procedural isometric turret concepts; decorative only.
// Ground anchor is (0,0); no gameplay stats or collision are implied.
export const EDITOR_TOWER_TYPES=Object.freeze(["rapid","versatile","sniper","rocket","heavy","mortar","air","flame","lightning","ultimate","slow","freeze","poison","magnet","radar","mine","repair","command","resource","speed"]);
export const EDITOR_TOWER_NAMES=Object.freeze({"rapid":"ป้อมยิงเร็ว","versatile":"ป้อมอเนกประสงค์","sniper":"ป้อมซุ่มยิง","rocket":"ป้อมลูกซอง","heavy":"ป้อมปืนกลหนัก","mortar":"ป้อมครก","air":"ป้อมอากาศ","flame":"ป้อมไฟ","lightning":"ป้อมสายฟ้า","ultimate":"ป้อมพลังงาน","slow":"ป้อมชะลอ","freeze":"ป้อมแช่แข็ง","poison":"ป้อมพิษ","magnet":"ป้อมแม่เหล็ก","radar":"ป้อมรบกวนสัญญาณ","mine":"ป้อมทุ่นระเบิด","repair":"ป้อมซ่อมบำรุง","command":"ป้อมทหาร","resource":"ป้อมขุดทรัพยากร","speed":"ป้อมเสริมความเร็ว"});
const ACCENTS={rapid:'#49c8ff',versatile:'#ffb454',sniper:'#ff5d78',rocket:'#ffb533',heavy:'#58baff',mortar:'#ffb85d',air:'#7fcfff',flame:'#ff782f',lightning:'#a47cff',ultimate:'#43efb3',slow:'#4fe4f4',freeze:'#83dbff',poison:'#77ed42',magnet:'#d180ff',radar:'#a8f055',mine:'#ff557c',repair:'#51f8a3',command:'#ffc65c',resource:'#ffb73e',speed:'#6df7be'};
export function drawEditorTower(ctx,type,scale=1){
 if(!EDITOR_TOWER_TYPES.includes(type))throw new RangeError('Unknown editor turret: '+type);
 const accent=ACCENTS[type],poly=(pts,fill,stroke='#172b3e')=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.4;ctx.stroke();}},line=(pts,color,width=3)=>{ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.stroke();},dot=(x,y,r,color)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();};
 ctx.save();ctx.scale(scale,scale);ctx.lineJoin='round';
 ctx.fillStyle='#000a18a0';ctx.beginPath();ctx.ellipse(2,8,25,8,0,0,Math.PI*2);ctx.fill();
 poly([[-25,0],[0,-11],[25,0],[0,11]],'#455c79');poly([[-25,0],[0,11],[0,17],[-25,5]],'#263c58');poly([[0,11],[25,0],[25,5],[0,17]],'#1b304c');
 poly([[-21,-1],[0,-10],[21,-1],[0,8]],'#8098ae');poly([[-16,-3],[0,-10],[16,-3],[0,4]],'#26364f');
 line([[-18,4],[-9,8]],accent,2.5);line([[9,8],[18,4]],accent,2.5);
 poly([[-12,-4],[-10,-17],[0,-23],[11,-17],[13,-4],[0,3]],'#546b87');poly([[0,-23],[11,-17],[13,-4],[0,3]],'#2a3f5b');
 poly([[-9,-17],[0,-22],[9,-17],[0,-12]],'#9bb0c1');line([[-8,-6],[7,0]],accent,2);
 const barrel=(x,y,dx=-17,dy=-13,w=6)=>{line([[x+2,y+2],[x+dx+2,y+dy+2]],'#10283d',w+3);line([[x,y],[x+dx,y+dy]],'#b4c5d1',w);line([[x+dx,y+dy],[x+dx-3,y+dy-2]],accent,2);};
 if(['rapid','heavy','versatile','sniper','mortar','flame'].includes(type)){
  poly([[-12,-20],[-7,-29],[4,-33],[15,-26],[13,-17],[0,-13]],'#6e829b');poly([[4,-33],[15,-26],[13,-17],[0,-13]],'#344b6c');
  if(type==='rapid'){barrel(-3,-25,-16,-9,5);barrel(4,-22,-17,-9,5);}
  if(type==='heavy'){for(let i=0;i<4;i++)barrel(-2+i*3,-25+i*1.5,-18,-9,3);}
  if(type==='versatile'){barrel(0,-26,-21,-13,8);dot(7,-24,4,accent);}
  if(type==='sniper'){barrel(0,-26,-28,-18,4);line([[-14,-37],[-5,-43]],accent,2);dot(8,-25,3,accent);}
  if(type==='mortar'){barrel(-3,-25,13,-26,10);dot(10,-50,4,'#ffce70');}
  if(type==='flame'){barrel(0,-25,-20,-8,9);poly([[-22,-34],[-31,-44],[-23,-40],[-27,-54],[-15,-43],[-17,-37]],'#ff9a32','#ffdf65');}
 }else if(type==='rocket'||type==='air'){
  for(let i=-1;i<=1;i++){const x=i*8;poly([[x-4,-21],[x-4,-39],[x,-48],[x+4,-39],[x+4,-21]],type==='rocket'?'#8793a8':'#b3d5e2');poly([[x-4,-39],[x,-48],[x+4,-39]],type==='rocket'?'#ffc14d':'#50c9ff',null);}
 }else if(type==='lightning'||type==='ultimate'||type==='slow'||type==='freeze'||type==='poison'||type==='speed'){
  poly([[-9,-19],[-7,-37],[0,-42],[7,-37],[9,-19],[0,-12]],'#556b8e');dot(0,-39,7,accent);
  if(type==='lightning'){line([[-21,-44],[-13,-38],[-18,-32],[-9,-28]],accent,2);line([[21,-44],[13,-38],[18,-32],[9,-28]],accent,2);}
  if(type==='ultimate'){poly([[0,-58],[11,-39],[0,-24],[-11,-39]],accent,'#dcfff4');}
  if(type==='slow'||type==='speed'){ctx.strokeStyle=accent;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-36,21,7,0,0,Math.PI*2);ctx.stroke();}
  if(type==='freeze'){for(let i=0;i<6;i++){let a=i*Math.PI/3;line([[Math.cos(a)*9,-38+Math.sin(a)*9],[Math.cos(a)*17,-38+Math.sin(a)*17]],'#d9faff',2);}}
  if(type==='poison'){poly([[-8,-42],[8,-42],[10,-25],[-10,-25]],'#6ddf4c');dot(-4,-48,3,accent);dot(8,-51,2,accent);}
 }else if(type==='magnet'){line([[-11,-39],[-11,-53],[11,-53],[11,-39]],'#b8c5da',9);line([[-11,-39],[-11,-45]],'#ff5e71',7);line([[11,-39],[11,-45]],'#57b8ff',7);}
 else if(type==='radar'){line([[0,-20],[0,-48]],'#a9b8c7',4);for(let i=0;i<3;i++){ctx.strokeStyle=accent;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-48,8+i*7,Math.PI*1.15,Math.PI*1.85);ctx.stroke();}dot(0,-48,3,accent);}
 else if(type==='mine'){for(let i=0;i<4;i++){let x=(i-1.5)*8;poly([[x-4,-20],[x,-34-(i%2)*5],[x+4,-20]],'#ff667f');}dot(0,-19,4,accent);}
 else if(type==='repair'){poly([[-12,-36],[10,-36],[12,-19],[-12,-19]],'#60b99b');poly([[-3,-34],[3,-34],[3,-29],[8,-29],[8,-24],[3,-24],[3,-20],[-3,-20],[-3,-24],[-8,-24],[-8,-29],[-3,-29]],'#d4ffe6',null);line([[12,-32],[22,-47]],'#8ca9be',4);dot(22,-47,4,accent);}
 else if(type==='command'){poly([[-13,-34],[0,-41],[13,-34],[13,-17],[-13,-17]],'#8e9caa');line([[0,-41],[0,-55]],'#d9e3e6',2);poly([[0,-55],[13,-51],[0,-47]],accent);}
 else if(type==='resource'){line([[-14,-19],[-6,-52],[7,-52],[16,-19]],'#9daab5',4);line([[-9,-39],[11,-39]],accent,3);poly([[13,-22],[21,-29],[28,-22],[21,-13]],'#ffc548');}
 ctx.restore();
}
