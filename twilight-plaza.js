// Original, procedural sunset and paving inspired by the fantasy plaza reference.
export function createTwilightPlaza(THREE,scene){
 const sky=document.createElement('canvas');sky.width=512;sky.height=256;
 const ctx=sky.getContext('2d');
 const gradient=ctx.createLinearGradient(0,0,0,256);
 for(const [stop,color] of [[0,'#3d466b'],[.34,'#82738f'],[.47,'#e8a18b'],[.51,'#f8c99d'],[.58,'#9b8d9d'],[1,'#535b75']])gradient.addColorStop(stop,color);
 ctx.fillStyle=gradient;ctx.fillRect(0,0,512,256);
 // Soft painted bands at the horizon keep the sky readable without extra lights.
 for(let i=0;i<16;i++){const y=78+(i%5)*8,x=(i*97)%512;ctx.fillStyle=i%2?'#ffe2bf18':'#6f69851c';ctx.fillRect(x,y,90+(i%4)*30,2+(i%3)*2)}
 const skyTexture=new THREE.CanvasTexture(sky);skyTexture.mapping=THREE.EquirectangularReflectionMapping;skyTexture.colorSpace=THREE.SRGBColorSpace;scene.background=skyTexture;

 const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;
 const c=canvas.getContext('2d');c.fillStyle='#52495e';c.fillRect(0,0,1024,1024);
 let seed=9341;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const colors=['#8c8298','#998da1','#81798d','#a499a8'];
 for(let row=0;row<8;row++)for(let col=-1;col<9;col++){
  const x=col*128+(row%2)*64,y=row*128,w=122,h=122;
  c.fillStyle=colors[Math.floor(rand()*colors.length)];c.fillRect(x+3,y+3,w,h);
  c.strokeStyle='#d5c6cb55';c.lineWidth=2;c.beginPath();c.moveTo(x+7,y+120);c.lineTo(x+7,y+8);c.lineTo(x+119,y+8);c.stroke();
  c.strokeStyle='#37334899';c.lineWidth=3;c.beginPath();c.moveTo(x+8,y+121);c.lineTo(x+121,y+121);c.lineTo(x+121,y+9);c.stroke();
  if(rand()>.3){const px=x+20+rand()*65,py=y+25+rand()*55;c.strokeStyle='#4d455977';c.lineWidth=2;c.beginPath();c.moveTo(px,py);c.lineTo(px+12,py+8);c.lineTo(px+9,py+17);c.lineTo(px+23,py+26);c.stroke()}
 }
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
 const paving=new THREE.MeshLambertMaterial({map:texture,color:0xe3dbe3});
 const edge=new THREE.MeshStandardMaterial({color:0x9c6d50,roughness:.65,metalness:.2});
 const rim=new THREE.Mesh(new THREE.TorusGeometry(24.4,.48,8,96),edge);rim.rotation.x=Math.PI/2;rim.position.y=.35;rim.receiveShadow=true;scene.add(rim);
 return paving;
}
