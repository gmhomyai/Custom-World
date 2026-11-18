// World V11: lightweight, static landmarks and decoration, separate from Avatar Studio.
export function addWorldDetails(THREE,scene,height){
 const material=c=>new THREE.MeshLambertMaterial({color:c});
 const wood=material(0x8a6141),roof=material(0xb65743),wall=material(0xf0d6a5),dark=material(0x304b57),gold=material(0xffd46d),flowerColors=[material(0xff7f91),material(0xffd969),material(0xb18bea)];
 function object(geo,mat,x,y,z,shadow=false){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;scene.add(o);return o}
 function cube(w,h,d,x,z,m,y=0){return object(new THREE.BoxGeometry(w,h,d),m,x,height(x,z)+y+h/2,z,true)}
 function post(x,z){const y=height(x,z);object(new THREE.CylinderGeometry(.17,.22,5,6),dark,x,y+2.5,z);object(new THREE.SphereGeometry(.6,8,6),gold,x,y+5.15,z)}
 function bench(x,z,angle=0){const g=new THREE.Group();const seat=new THREE.Mesh(new THREE.BoxGeometry(3.5,.25,.9),wood);seat.position.y=.85;g.add(seat);const back=new THREE.Mesh(new THREE.BoxGeometry(3.5,1,.2),wood);back.position.set(0,1.4,-.4);g.add(back);for(const dx of [-1.3,1.3]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.25,.85,.65),dark);leg.position.set(dx,.43,0);g.add(leg)}g.position.set(x,height(x,z),z);g.rotation.y=angle;scene.add(g)}
 // Crossroads and village plaza: continuous stone sidewalks and a decorative outer ring.
 const paving=material(0xd7c8a6),border=material(0x968a7b);
 for(const side of [-1,1]){cube(2,.12,160,side*10,0,paving);cube(160,.12,2,0,side*10,paving)}
 object(new THREE.TorusGeometry(26,.45,6,48),border,0,.22,0).rotation.x=Math.PI/2;
 for(const [x,z] of [[-19,-19],[19,-19],[-19,19],[19,19]]){post(x,z)}
 for(const [x,z,r] of [[-17,-29,0],[17,-29,Math.PI],[-17,29,0],[17,29,Math.PI]])bench(x,z,r);
 // Village market stalls, with distinct colored awnings.
 const stalls=[[ -64,15,0xe6a45a],[-64,-15,0x6b9eb9],[64,15,0x93b783],[64,-15,0xce8ab0]];
 for(const [x,z,c] of stalls){cube(8,1.2,5,x,z,wood);cube(9,.45,6,x,z,material(c),4.6);for(const dx of [-3.8,3.8])for(const dz of [-2.3,2.3])cube(.25,3.8,.25,x+dx,z+dz,dark,1.2)}
 // Four distinctive district markers: garden, guild flags, housing courtyard and portal arch.
 const garden=material(0x4c9b64),path=material(0xe5d2ad);
 for(const [x,z] of [[-48,18],[-48,25],[-41,18],[-41,25]]){object(new THREE.SphereGeometry(1.65,7,5),garden,x,height(x,z)+1.1,z)}
 for(const [x,z] of [[-36,58],[-52,58]]){post(x,z)}
 for(const [x,z] of [[36,57],[53,57]]){cube(.35,9,.35,x,z,dark);cube(3,2,.18,x+1.5,z,material(0x7356b8),6.4)}
 for(const [x,z] of [[34,-60],[55,-60]])cube(1.2,8,1.2,x,z,dark);
 cube(22,2,1.2,44.5,-60,material(0x5d96c6),7);
 // Park patches and flowerbeds beside the square; deterministic placement.
 for(let i=0;i<42;i++){const a=i*2.39996,r=30+(i%7)*2.4,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<13||Math.abs(z)<13)continue;const m=flowerColors[i%flowerColors.length];object(new THREE.SphereGeometry(.32,5,4),m,x,height(x,z)+.35,z)}
 // Wooden signboards around the four roads.
 const signMat=material(0x6e4e38);
 for(const [x,z] of [[0,-35],[0,35],[-35,0],[35,0]]){cube(.25,3,.25,x,z,wood);cube(3.2,1.2,.3,x,z,signMat,2.5)}
}
