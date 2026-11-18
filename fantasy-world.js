// V12 fantasy atmosphere: decorative assets kept separate from game and avatar logic.
export function addFantasyWorld(THREE,scene,height){
 const mats={bark:new THREE.MeshLambertMaterial({color:0x73513e}),pine:new THREE.MeshLambertMaterial({color:0x287b65}),pine2:new THREE.MeshLambertMaterial({color:0x3e9c72}),stone:new THREE.MeshLambertMaterial({color:0x827c92}),rune:new THREE.MeshLambertMaterial({color:0x76e8f0,emissive:0x17606c,emissiveIntensity:.7}),banner:new THREE.MeshLambertMaterial({color:0x7041a0}),gold:new THREE.MeshLambertMaterial({color:0xe7bd68}),wood:new THREE.MeshLambertMaterial({color:0x694a3e})};
 const add=(geo,mat,x,y,z,cast=false)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;scene.add(o);return o};
 const ground=(x,z)=>height(x,z);
 function fantasyTree(x,z,s=1){const y=ground(x,z);add(new THREE.CylinderGeometry(.55*s,.9*s,6*s,6),mats.bark,x,y+3*s,z,true);for(let i=0;i<3;i++){const r=(5-i*.85)*s,h=(7-i*.8)*s;add(new THREE.ConeGeometry(r,h,7),i%2?mats.pine2:mats.pine,x,y+(6+i*3.5)*s,z,true)}}
 function crystal(x,z,s=1){const y=ground(x,z);add(new THREE.CylinderGeometry(.7*s,1.3*s,2*s,6),mats.stone,x,y+s,z);const c=add(new THREE.OctahedronGeometry(2.2*s,0),mats.rune,x,y+3.2*s,z);c.rotation.z=.18;const light=new THREE.PointLight(0x62dbe8,1.3,14*s,2);light.position.set(x,y+3.5*s,z);scene.add(light)}
 function obelisk(x,z){const y=ground(x,z);add(new THREE.CylinderGeometry(2.1,2.8,1.4,6),mats.stone,x,y+.7,z);add(new THREE.CylinderGeometry(.85,1.3,8,6),mats.stone,x,y+5,z,true);add(new THREE.OctahedronGeometry(1.4),mats.rune,x,y+10,z);}
 function banner(x,z){const y=ground(x,z);add(new THREE.CylinderGeometry(.13,.18,9,6),mats.wood,x,y+4.5,z);add(new THREE.BoxGeometry(2.8,3.8,.13),mats.banner,x+1.35,y+6.5,z);add(new THREE.SphereGeometry(.35,8,6),mats.gold,x,y+9,z)}
 // Place outside the central streets, keeping walkable approaches clear.
 for(let i=0;i<38;i++){const a=i*2.399963,r=96+(i%9)*13,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)>278||Math.abs(z)>278||Math.abs(x)<23||Math.abs(z)<23)continue;fantasyTree(x,z,.8+(i%4)*.18)}
 for(const [x,z] of [[-86,-84],[86,-84],[-86,84],[86,84]])crystal(x,z,.9);
 for(const [x,z] of [[-110,0],[110,0],[0,-110],[0,110]])obelisk(x,z);
 for(const [x,z] of [[-31,-31],[31,-31],[-31,31],[31,31]])banner(x,z);
}
