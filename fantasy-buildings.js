// V13: richer stylized fantasy architecture. Shared low-poly geometry and materials.
export function createFantasyBuildings(THREE,scene,height,worldMaterials){
 const mat=c=>new THREE.MeshLambertMaterial({color:c});
 const timber=worldMaterials.material('wood'),trim=mat(0x3c2e2b),stone=worldMaterials.material('stone'),cream=worldMaterials.material('plaster'),glass=mat(0x8ce4ec),gold=mat(0xf6ca70);
 const roofs=[worldMaterials.material('roof',0xd58e85),worldMaterials.material('roof',0x83a9cb),worldMaterials.material('roof',0xbaa0d9),worldMaterials.material('roof',0xd1aa7d)];let index=0;
 function part(group,geo,material,x,y,z){const mesh=new THREE.Mesh(geo,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh}
 function beam(group,w,h,d,x,y,z,m=timber){return part(group,new THREE.BoxGeometry(w,h,d),m,x,y,z)}
 function turret(group,x,z,roof){beam(group,4.5,11,4.5,x,5.5,z,stone);part(group,new THREE.ConeGeometry(4.5,6,5),roof,x,14,z);beam(group,.5,12,.5,x-2.2,6,z-2.2);beam(group,.5,12,.5,x+2.2,6,z+2.2)}
 return function building(x,z,color,label){const g=new THREE.Group();g.position.set(x,height(x,z),z);scene.add(g);const roof=roofs[index++%roofs.length],plaster=worldMaterials.material('plaster',color);
 beam(g,16,1.1,14,0,.55,0,stone);beam(g,14,9,12,0,5.5,0,plaster);
 for(const bx of [-6.7,6.7])for(const bz of [-5.7,5.7])beam(g,.85,10,.85,bx,5.6,bz);
 for(const y of [2.1,9.5]){beam(g,15,.55,.7,0,y,6.1);beam(g,15,.55,.7,0,y,-6.1);beam(g,.7,.55,12,7.1,y,0);beam(g,.7,.55,12,-7.1,y,0)}
 // Steep overhanging roof with two visible slopes, ridge and carved finials.
 for(const side of [-1,1]){const slope=beam(g,18,.75,10.6,0,13.2,side*3.25,roof);slope.rotation.x=side*.57}
 beam(g,18.7,.8,.85,0,16.0,0,trim);
 for(const bx of [-8.8,8.8])part(g,new THREE.SphereGeometry(.65,8,6),gold,bx,16,0);
 // Front porch, stone stairs, door and luminous windows.
 beam(g,6,.65,4.4,0,1.4,8,stone);beam(g,5,.35,2.4,0,.5,10,stone);beam(g,3.5,6,.35,0,4.1,6.28,timber);beam(g,.35,6.5,.55,-2,4.2,6.5,trim);beam(g,.35,6.5,.55,2,4.2,6.5,trim);
 part(g,new THREE.SphereGeometry(.25,8,6),gold,1.15,4.3,6.6);
 for(const wx of [-4.6,4.6]){beam(g,2.6,3.2,.28,wx,6.4,6.25,trim);beam(g,2.1,2.7,.3,wx,6.4,6.48,glass);beam(g,.23,2.8,.38,wx,6.4,6.7,trim);beam(g,2.5,.22,.38,wx,6.4,6.7,trim);beam(g,3,.35,.8,wx,4.6,6.5,stone)}
 // Small corner tower and stacked roof silhouette.
 turret(g,-7.3,-5.8,roof);beam(g,4.8,4.5,4.8,5.3,12.4,-3.6,plaster);part(g,new THREE.ConeGeometry(4.8,5.5,4),roof,5.3,17.2,-3.6).rotation.y=Math.PI/4;
 // Hanging sign is an actual timber sign, not a floating billboard.
 beam(g,.3,3,.3,0,11.3,8);beam(g,9,2.1,.45,0,11.2,8.3,trim);const sign=document.createElement('canvas');sign.width=512;sign.height=128;const c=sign.getContext('2d');c.fillStyle='#322824';c.fillRect(0,0,512,128);c.strokeStyle='#caa46c';c.lineWidth=9;c.strokeRect(9,9,494,110);c.fillStyle='#ffe4b4';c.font='bold 43px sans-serif';c.textAlign='center';c.fillText(label,256,81);const texture=new THREE.CanvasTexture(sign);const board=part(g,new THREE.PlaneGeometry(8.8,1.8),new THREE.MeshBasicMaterial({map:texture,transparent:false,side:THREE.DoubleSide}),0,11.2,8.57);board.castShadow=false;
 return g}
}
