// Enchanted forest art direction: violet dusk, luminous mushrooms, warm cottages and layered rock cliffs.
export function createEnchantedWorld(THREE,scene,height){
const m=(c,e=0)=>new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:e});
const bark=m(0x64445c),stone=[m(0x68618c),m(0x77709b),m(0x55577e)],pink=m(0xe85a91,.08),violet=m(0x7857b6,.08),blue=m(0x3c93b8,.08),leaf=m(0x537e76),glow=m(0x79f6ff,.85),warm=m(0xffb56e,.6),grass=[m(0x4a786b),m(0x628879),m(0x76688a)],rock=m(0x77728e);
const geo={trunk:new THREE.CylinderGeometry(.7,1.25,1,7),cap:new THREE.SphereGeometry(1,9,5,0,Math.PI*2,0,Math.PI/2),rock:new THREE.DodecahedronGeometry(1,0),cone:new THREE.ConeGeometry(1,1,6),orb:new THREE.OctahedronGeometry(1,0),blade:new THREE.ConeGeometry(1,1,3)};
function put(g,material,x,y,z,sx=1,sy=1,sz=1,cast=false){const o=new THREE.Mesh(g,material);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=cast;o.receiveShadow=true;scene.add(o);return o}
function mushroom(x,z,size,color){const y=height(x,z);put(geo.trunk,bark,x,y+size*2,z,size*.42,size*4,size*.42,true);const cap=put(geo.cap,color,x,y+size*4,z,size*3.3,size*1.35,size*3.3,true);cap.rotation.z=.05;put(new THREE.TorusGeometry(size*2.3,size*.13,5,12),glow,x,y+size*4,z).rotation.x=Math.PI/2;}
function cliff(x,z,scale){const y=height(x,z);for(let j=0;j<5;j++){const a=j*2.4,r=scale*(.45+j*.08),p=put(geo.rock,stone[j%3],x+Math.cos(a)*r,y+scale*(.6+j*.4),z+Math.sin(a)*r,scale*(.8+j*.06),scale*(1+j*.15),scale*.72,true);p.rotation.y=j*.7}}
function fir(x,z,size){const y=height(x,z);put(geo.trunk,bark,x,y+size*2,z,size*.25,size*4,size*.25,true);for(let j=0;j<3;j++){const p=put(geo.cone,leaf,x,y+size*(3+j*1.7),z,size*(2.2-j*.35),size*(3-j*.25),size*(2.2-j*.35),true);p.rotation.y=j*.3}}
function lantern(x,z){const y=height(x,z);put(geo.trunk,bark,x,y+2.3,z,.22,4.6,.22);put(geo.orb,warm,x,y+4.9,z,.7,.95,.7);const light=new THREE.PointLight(0xffa45b,1.5,20,2);light.position.set(x,y+5,z);scene.add(light)}
function flowers(x,z,seed){const y=height(x,z);for(let j=0;j<6;j++){const a=j*2.4,dx=Math.sin(a)*1.5,dz=Math.cos(a)*1.5;put(geo.blade,grass[j%3],x+dx,y+.55,z+dz,.2,1.2,.2);if(j%2===0)put(geo.orb,j===0?glow:pink,x+dx,y+.85,z+dz,.24,.4,.24)}}
// Visible immediately around spawn; leave walkable roads and cottage entrances clear.
for(let i=0;i<30;i++){const a=i*2.39996,r=53+(i%7)*7,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<16||Math.abs(z)<16)continue;if(i%4===0)mushroom(x,z,1.1+(i%3)*.35,i%2?pink:violet);else if(i%4===1)fir(x,z,1.3);else if(i%4===2)cliff(x,z,2.3);else flowers(x,z,i)}
for(const [x,z,c] of [[-95,-75,pink],[95,-75,blue],[-95,75,violet],[95,75,pink],[-120,10,violet],[120,10,blue]])mushroom(x,z,2.5,c);
for(const [x,z] of [[-110,-100],[110,-100],[-110,100],[110,100],[-145,40],[145,-40]])cliff(x,z,7);
for(const [x,z] of [[-29,-20],[29,-20],[-29,20],[29,20],[-15,36],[15,36]])lantern(x,z);
for(let i=0;i<80;i++){const a=i*2.39996,r=29+(i%13)*5,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<13||Math.abs(z)<13)continue;flowers(x,z,i)}
// Layered skyline creates a fantasy valley rather than an empty horizon.
for(let i=0;i<22;i++){const a=i*Math.PI*2/22,r=185+(i%3)*15;cliff(Math.cos(a)*r,Math.sin(a)*r,10+(i%4)*2)}
}
