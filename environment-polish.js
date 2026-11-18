// V16 environment polish: layered fountain, terrain accents and restrained warm lighting.
export function addEnvironmentPolish(THREE,scene,height){
const m=(c,em=0)=>new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:em});const stone=m(0x9b91a5),rim=m(0xc8b7a9),water=m(0x35d8c8,.55),crystal=m(0x85f6ff,.85),gold=m(0xd8ad75),grass=[m(0x426d68),m(0x698977),m(0x79768c)],flower=[m(0xd976a7,.15),m(0x9ad4ec,.35),m(0xffca87,.2)];
const add=(geo,mat,x,y,z)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.receiveShadow=true;scene.add(o);return o};
const ring=(radius,tube,y,material)=>{const o=add(new THREE.TorusGeometry(radius,tube,6,48),material,0,y,0);o.rotation.x=Math.PI/2;return o};
// Existing fountain remains under the upgraded tiers to avoid breaking old terrain.
add(new THREE.CylinderGeometry(4.7,5.2,.55,24),rim,0,1.75,0);add(new THREE.CylinderGeometry(3.9,3.9,.12,24),water,0,2.08,0);ring(4.45,.22,2.08,gold);
add(new THREE.CylinderGeometry(.8,1.2,3.6,8),stone,0,3.7,0);add(new THREE.CylinderGeometry(2.4,2.9,.48,16),rim,0,5.35,0);add(new THREE.CylinderGeometry(2.1,2.1,.1,16),water,0,5.63,0);ring(2.25,.16,5.65,gold);
const gem=add(new THREE.OctahedronGeometry(1.25),crystal,0,7.4,0);gem.rotation.z=.2;
for(let i=0;i<8;i++){const a=i*Math.PI/4,x=Math.cos(a)*5.3,z=Math.sin(a)*5.3;add(new THREE.OctahedronGeometry(.4),crystal,x,1.8,z)}
// Flat emissive bands suggest enchanted water without real-time reflections or extra lights.
const rune=m(0x8dfff1,.75);
ring(3.25,.045,2.16,rune);ring(2.75,.035,2.16,rune);ring(1.55,.045,5.72,rune);
// One instanced mesh for all decorative motes keeps particle draw calls bounded.
const motes=new THREE.InstancedMesh(new THREE.OctahedronGeometry(.12,0),crystal,36);
const dummy=new THREE.Object3D();
for(let i=0;i<36;i++){
 const angle=i*2.399963,radius=7+(i%6)*1.55;
 dummy.position.set(Math.cos(angle)*radius,2+(i%7)*.65,Math.sin(angle)*radius);
 dummy.scale.setScalar(.55+(i%4)*.2);dummy.rotation.set(0,angle,angle*.2);dummy.updateMatrix();motes.setMatrixAt(i,dummy.matrix);
}
motes.instanceMatrix.needsUpdate=true;motes.computeBoundingSphere();scene.add(motes);
// Shared low-poly geometry and materials for hundreds of small environmental accents.
const tuft=new THREE.ConeGeometry(.18,.85,3),pebble=new THREE.DodecahedronGeometry(.38,0),bud=new THREE.OctahedronGeometry(.25,0);
function noise(a,b){const v=Math.sin(a*127.1+b*311.7+1626)*43758.5453;return v-Math.floor(v)}
for(let i=0;i<380;i++){const a=i*2.399963,r=29+Math.sqrt(i/380)*115,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<13||Math.abs(z)<13||Math.abs(x)>275||Math.abs(z)>275)continue;const y=height(x,z),v=noise(i,21);if(v<.72){const blade=add(tuft,grass[i%3],x,y+.38,z);blade.rotation.z=(v-.5)*.4;blade.scale.setScalar(.7+(i%4)*.2)}else if(v<.9){const rock=add(pebble,stone,x,y+.23,z);rock.scale.set(.8+(i%3)*.35,.5,1)}else{add(bud,flower[i%3],x,y+.5,z)}}
// Warm window pools without expensive per-building shadow lights.
for(const [x,z] of [[-45,-45],[45,-45],[-45,45],[45,45]]){const l=new THREE.PointLight(0xffb37a,.85,17,2);l.position.set(x,height(x,z)+7,z+7);scene.add(l)}
}
