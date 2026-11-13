import * as THREE from 'three';
import { disposeTree } from './world.js';
export function createScene({ world }) {
  const group=new THREE.Group(); world.root.add(group);
  const cracks=[];
  for(let i=0;i<6;i++) {
    const crack=world.addBox(group,'#594b40',[.07,.02,.37],[-.65+(i%2)*.13,.08,1.9-i*.28]); crack.rotation.y=(i%2?1:-1)*.45;cracks.push(crack);
  }
  const dust=Array.from({length:10},(_,i)=>world.addSphere(group,'#d4bd98',.12+(i%3)*.04,[-3+(i%4)*.3,.25,-1.3+Math.floor(i/4)*.2]));
  const person=world.addVillager(group,[-2,0,1.7],'#526d90');
  const roof=world.houses[0].roof;
  return {
    render({elapsedMs,stage,motion,phase}) {
      const shaking=motion && stage<2;
      world.root.rotation.z=shaking?Math.sin(elapsedMs*.028)*.008:0;
      cracks.forEach((c,i)=>{c.visible=stage>0;c.scale.z=motion?Math.min(1,Math.max(0,(elapsedMs-4000-i*120)/700)):1;});
      roof.rotation.z=stage>0?.18:0;roof.position.y=stage>0?1.38:1.65;
      dust.forEach((d,i)=>{d.visible=stage>0;d.position.y=.2+(motion?(elapsedMs*.00006+i*.08)% .7:i*.025);d.scale.setScalar(stage===2?.5:1);});
      person.visible=phase==='feedback'&&stage===2&&(!motion||elapsedMs>=8500);
      const progress=motion?Math.min(1,Math.max(0,(elapsedMs-8500)/2500)):1;
      person.position.set(-2-progress*1.3,0,1.75+progress*1.1);
    },
    dispose(){world.root.rotation.z=0;roof.rotation.z=0;roof.position.y=1.65;group.removeFromParent();disposeTree(group);}
  };
}
