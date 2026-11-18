// V15: curated enchanted grove, built from shared geometries and materials.
export function addEnchantedGrove(THREE,scene,height){
const mat=(c,e=0)=>new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:e});
const bark=mat(0x654458),stone=mat(0x746a90),path=mat(0x9c8295),pink=mat(0xd96ca5,.16),violet=mat(0x7755b6,.12),cyan=mat(0x77e7e4,.8),warm=mat(0xffbe78,.6),foliage=[mat(0x4e8c83),mat(0x668d78),mat(0x806b9e)],moss=mat(0x567c70);
const stemGeo=new THREE.CylinderGeometry(.7,1.1,1,6),capGeo=new THREE.SphereGeometry(1,9,6,0,Math.PI*2,0,Math.PI/2),rockGeo=new THREE.DodecahedronGeometry(1),bladeGeo=new THREE.ConeGeometry(1,1,3),orbGeo=new THREE.OctahedronGeometry(1),tileGeo=new THREE.BoxGeometry(1,.15,1);
const center={x:27,z:-31};
function put(geo,m,x,y,z,sx=1,sy=1,sz=1){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.receiveShadow=true;scene.add(o);return o}
function mushroom(x,z,s,color){const y=height(x,z);put(stemGeo,bark,x,y+s*1.5,z,s*.28,s*3,s*.28);put(capGeo,color,x,y+s*3,z,s*2.2,s*.9,s*2.2);put(orbGeo,cyan,x,y+s*3.15,z,s*.25,s*.2,s*.25)}
function flower(x,z,i){const y=height(x,z),s=.45+(i%4)*.15;put(bladeGeo,foliage[i%3],x,y+s*.6,z,s*.45,s*1.4,s*.45);put(orbGeo,i%5===0?cyan:i%3===0?pink:violet,x,y+s*1.5,z,s*.35,s*.4,s*.35)}
// Organic stepping-stone path from the plaza toward the grove.
for(let i=0;i<12;i++){const t=i/11,x=11+center.x*t,z=-12+(center.z+12)*t+Math.sin(t*Math.PI)*3;const tile=put(tileGeo,path,x,height(x,z)+.08,z,3.2,1.0,2.4);tile.rotation.y=t*.4}
// Framed clearing with tall mushroom canopies and rocky edges.
for(let i=0;i<15;i++){const a=i*Math.PI*2/15,r=13+(i%3)*2.3,x=center.x+Math.cos(a)*r,z=center.z+Math.sin(a)*r;if(i%3===0)mushroom(x,z,2.4+(i%4)*.35,i%2?pink:violet);else{const y=height(x,z),rock=put(rockGeo,stone,x,y+1.1,z,1.6+(i%3)*.4,1.5+(i%4)*.3,1.5);rock.rotation.y=a;put(orbGeo,moss,x,y+2.3,z,.55,.35,.55)}}
// Dense small foliage, but no particle systems or extra dynamic shadows.
for(let i=0;i<160;i++){const a=i*2.399963,r=2+Math.sqrt(i/160)*22,x=center.x+Math.cos(a)*r,z=center.z+Math.sin(a)*r;if(r<5||Math.abs(x)<12||Math.abs(z)<12)continue;flower(x,z,i)}
// A tiny magical stone altar as a focal point.
const x=center.x,z=center.z,y=height(x,z);put(rockGeo,stone,x,y+1,z,3.2,.85,3.2);put(rockGeo,stone,x,y+2.1,z,2.1,.5,2.1);put(orbGeo,cyan,x,y+4.1,z,1.3,2.1,1.3);const light=new THREE.PointLight(0x66e9eb,1.8,19,2);light.position.set(x,y+4.3,z);scene.add(light);
// Warm entrance lanterns, no additional lights to keep mobile cost bounded.
for(const [lx,lz] of [[15,-17],[40,-42]]){const ly=height(lx,lz);put(stemGeo,bark,lx,ly+2.3,lz,.18,4.6,.18);put(orbGeo,warm,lx,ly+4.8,lz,.55,.75,.55)}
}
