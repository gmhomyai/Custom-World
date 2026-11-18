// V19: GPU-instanced fantasy ground cover. Tier groups allow actual detail reduction.
export function addDenseGroundCover(THREE,scene,height){
 const groups=[{name:'base',min:0,count:420},{name:'medium',min:.4,count:750},{name:'high',min:.7,count:1100},{name:'ultra',min:1,count:1700}];
 const bladeGeo=new THREE.ConeGeometry(.22,1.15,3),flowerGeo=new THREE.OctahedronGeometry(.22),stoneGeo=new THREE.DodecahedronGeometry(.35,0);
 const grassMats=[new THREE.MeshLambertMaterial({color:0x608a78,side:THREE.DoubleSide}),new THREE.MeshLambertMaterial({color:0x77977c,side:THREE.DoubleSide}),new THREE.MeshLambertMaterial({color:0x49766e,side:THREE.DoubleSide})];
 const bloomMats=[new THREE.MeshLambertMaterial({color:0xff91bc,emissive:0x4c162e,emissiveIntensity:.4}),new THREE.MeshLambertMaterial({color:0x9ceaf1,emissive:0x2b8d9d,emissiveIntensity:.5})];
 const stoneMat=new THREE.MeshLambertMaterial({color:0x8c829c});const dummy=new THREE.Object3D();
 function rand(i,k){const x=Math.sin(i*127.17+k*311.91+19.7)*43758.5453;return x-Math.floor(x)}
 for(let tier=0;tier<groups.length;tier++){const def=groups[tier],group=new THREE.Group();group.userData.graphicsDecoration=true;group.userData.graphicsMinQuality=def.min;
 const blades=grassMats.map(mat=>new THREE.InstancedMesh(bladeGeo,mat,def.count));const blooms=bloomMats.map(mat=>new THREE.InstancedMesh(flowerGeo,mat,Math.ceil(def.count/8)));const rocks=new THREE.InstancedMesh(stoneGeo,stoneMat,Math.ceil(def.count/14));
 const bi=[0,0,0],fi=[0,0];let ri=0;for(let i=0;i<def.count;i++){const a=i*2.399963+rand(i,tier)*.3,r=27+Math.sqrt(rand(i+23,tier+1))*205,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<15||Math.abs(z)<15||Math.abs(x)>275||Math.abs(z)>275)continue;const y=height(x,z),v=rand(i,tier+4),scale=.65+rand(i,9)*.9;dummy.position.set(x,y+.5*scale,z);dummy.rotation.set(0,rand(i,3)*6.28,(v-.5)*.35);dummy.scale.set(scale,scale,scale);dummy.updateMatrix();const j=i%3;blades[j].setMatrixAt(bi[j]++,dummy.matrix);
 if(i%8===0){dummy.position.y=y+.85;dummy.scale.setScalar(.65+rand(i,12));dummy.updateMatrix();const f=i%2;blooms[f].setMatrixAt(fi[f]++,dummy.matrix)}if(i%14===0){dummy.position.y=y+.2;dummy.scale.set(.7,.35,.7);dummy.updateMatrix();rocks.setMatrixAt(ri++,dummy.matrix)}}
 for(let j=0;j<blades.length;j++){blades[j].count=bi[j];blades[j].instanceMatrix.needsUpdate=true;blades[j].frustumCulled=false;group.add(blades[j])}for(let j=0;j<blooms.length;j++){blooms[j].count=fi[j];blooms[j].instanceMatrix.needsUpdate=true;blooms[j].frustumCulled=false;group.add(blooms[j])}rocks.count=ri;rocks.instanceMatrix.needsUpdate=true;rocks.frustumCulled=false;group.add(rocks);scene.add(group)}
}
