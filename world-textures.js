// V17: tiny procedural tileable textures; no external downloads or image assets.
export function createWorldMaterials(THREE){
 function texture(kind){const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const c=canvas.getContext('2d');let seed=kind.length*911+37;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const colors={grass:['#52796a','#638a72','#456e65','#75937a'],road:['#b68d80','#c39d8b','#a47e76','#d2ad98'],wood:['#684937','#7a5640','#4c382f','#93694a'],plaster:['#d4c4aa','#ead8ba','#c9b69f','#f1dfc5'],roof:['#8b4d59','#a45c65','#754251','#b36c72'],stone:['#817e91','#9893a2','#6b6b81','#aca3a8']};const palette=colors[kind];c.fillStyle=palette[0];c.fillRect(0,0,128,128);
 if(kind==='wood'){for(let y=0;y<128;y+=12){c.fillStyle=palette[1+Math.floor(rnd()*3)];c.fillRect(0,y,128,2);for(let i=0;i<8;i++){c.fillStyle='#30251c55';c.fillRect(rnd()*128,y+3+rnd()*7,12+rnd()*35,.8)}}}
 else if(kind==='roof'){for(let y=0;y<128;y+=20){c.strokeStyle='#382c3955';c.lineWidth=2;c.beginPath();c.moveTo(0,y);c.lineTo(128,y);c.stroke();for(let x=(Math.floor(y/20)%2)*16;x<128;x+=32){c.fillStyle=palette[1+Math.floor(rnd()*3)];c.fillRect(x+2,y+3,28,14);c.fillStyle='#382c393b';c.fillRect(x+1,y,2,18)}}}
 else if(kind==='stone'||kind==='road'){for(let y=0;y<128;y+=32){for(let x=0;x<128;x+=32){const offset=(Math.floor(y/32)%2)*16;c.fillStyle=palette[Math.floor(rnd()*4)];c.fillRect((x+offset)%128+1,y+1,30,30)}}}
 else {for(let i=0;i<1100;i++){c.fillStyle=palette[Math.floor(rnd()*4)];const x=rnd()*128,y=rnd()*128;c.globalAlpha=.08+rnd()*.25;c.fillRect(x,y,kind==='grass'?1+rnd()*5:1+rnd()*3,kind==='grass'?2+rnd()*7:1+rnd()*3)}c.globalAlpha=1}
 const t=new THREE.CanvasTexture(canvas);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=2;return t}
 const maps={};for(const k of ['grass','road','wood','plaster','roof','stone'])maps[k]=texture(k);
 const material=(kind,tint=0xffffff)=>new THREE.MeshLambertMaterial({map:maps[kind],color:tint});
 return {maps,material};
}
