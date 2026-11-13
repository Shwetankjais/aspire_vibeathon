import * as THREE from 'three';

export function disposeTree(root) {
  root.traverse(node => {
    node.geometry?.dispose();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach(material => material?.dispose());
  });
}
export function createWorld() {
  const root = new THREE.Group();
  function mesh(parent, geometry, color, position) {
    const node = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: .95 }));
    node.position.set(...position); node.castShadow = true; node.receiveShadow = true; parent.add(node); return node;
  }
  const addBox = (parent, color, size, position) => mesh(parent, new THREE.BoxGeometry(...size), color, position);
  const addSphere = (parent, color, radius, position) => mesh(parent, new THREE.SphereGeometry(radius, 12, 8), color, position);
  function addVillager(parent, position, color = '#547ca0') {
    const person = new THREE.Group(); person.position.set(...position); parent.add(person);
    addBox(person, color, [.18,.32,.15], [0,.37,0]);
    addSphere(person, '#d6a16f', .12, [0,.65,0]);
    for (const x of [-.06,.06]) addBox(person, '#524539', [.055,.23,.07], [x,.115,0]);
    for (const x of [-.14,.14]) addBox(person, color, [.06,.26,.07], [x,.36,0]);
    return person;
  }
  addBox(root, '#a7b97b', [13,.5,10], [0,-.3,0]);
  for (const [x,z,r] of [[-5,-4,2.8],[-1,-5,3],[4,-5,2.6]]) {
    const hill = addSphere(root, '#829b68', r, [x,-.65,z]); hill.scale.y=.55;
  }
  addBox(root, '#72b7bd', [2,.06,10], [4,.015,0]);
  for (let i=0;i<9;i++) {
    const road=addBox(root,'#e1c797',[1.4,.06,1.4],[-1.2+Math.sin(i*.65)*1.1,.035,4-i]); road.rotation.y=.15;
  }
  const houses = [[-3,-2],[0,-2],[-2,1]].map(([x,z],i)=>{
    const group=new THREE.Group(); group.position.set(x,0,z);root.add(group);
    addBox(group,['#f2d9ac','#e9c59a','#f3e4c8'][i],[1.6,1.3,1.35],[0,.65,0]);
    const roof=mesh(group,new THREE.ConeGeometry(1.35,.85,4),'#b75e43',[0,1.65,0]); roof.rotation.y=Math.PI/4;roof.scale.z=.9;
    addBox(group,'#604b3a',[.35,.7,.04],[0,.35,.7]);
    for(const wx of [-.53,.53]) addBox(group,'#619098',[.3,.32,.05],[wx,.85,.7]);
    addBox(group,'#dac3a3',[.24,.65,.25],[.47,1.8,-.28]);
    return {group,roof};
  });
  for(const [x,z] of [[-5,-1],[-4,2],[1,1],[1,-4],[-5,-3],[2,3]]) {
    addBox(root,'#87654a',[.16,1,.16],[x,.5,z]);
    addSphere(root,'#627f50',.65,[x,1.25,z]);
    addSphere(root,'#7b945b',.48,[x-.15,1.65,z]);
  }
  addBox(root,'#dfd5ad',[1.3,.04,1.1],[-4,.04,3]);
  return {root,houses,villagers:[],addBox,addSphere,addVillager};
}
