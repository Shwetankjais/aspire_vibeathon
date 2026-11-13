import * as THREE from 'three';

// River → lower fields. Every pedestrian remains on the elevated, dry west side.
export function createScene({ world }) {
  const group = new THREE.Group();
  group.name = 'river-flood-sequence';
  world.root.add(group);
  const water = world.addBox(group, 0x429fa7, [1, 0.12, 8], [4, 0.04, 0]);
  water.material.transparent = true;
  water.material.opacity = 0.78;
  water.material.roughness = 0.25;
  const ripples = Array.from({ length: 15 }, (_, i) => {
    const ripple = world.addBox(group, 0xbce4d8, [0.38 + (i % 3) * 0.16, 0.012, 0.035], [0, 0, 0]);
    ripple.material.transparent = true;
    ripple.material.opacity = 0.65;
    return ripple;
  });
  // Fence and crops provide a visible height reference as the water rises.
  for (let i = 0; i < 6; i++) {
    world.addBox(group, 0xb9986b, [0.09, 0.55, 0.09], [1.5, 0.27, -2.5 + i]);
    if (i < 5) world.addBox(group, 0xb9986b, [0.06, 0.07, 1], [1.5, 0.4, -2 + i]);
  }
  const people = [
    world.addVillager(group, [-0.6, 0, 2], 0xeab057),
    world.addVillager(group, [-1, 0, 2.4], 0x646f9b),
    world.addVillager(group, [-1.4, 0, 2.1], 0x9a6263),
  ];
  people.forEach((person, i) => { person.name = `flood-villager-${i}`; });
  const starts = people.map(person => person.position.clone());
  return {
    render({ elapsedMs = 0, stage = 0, motion = false, phase = 'question' }) {
      const t = motion ? Math.min(1, Math.max(0, elapsedMs / 8000)) : [0, 0.5, 1][stage];
      const spread = 0.8 + t * 4.1;
      water.scale.x = spread;
      water.position.set(5.25 - spread / 2, 0.04 + t * 0.32, 0);
      water.scale.y = 1 + t * 3;
      const surface = water.position.y + 0.06 * water.scale.y;
      ripples.forEach((ripple, i) => {
        const travel = motion ? elapsedMs / 6500 : 0;
        ripple.position.set(5.15 - (0.1 + (i % 5) / 5) * spread,
          surface + 0.012, ((i * 0.61 + travel) % 7.5) - 3.75);
        ripple.scale.x = Math.min(1, spread / 2);
      });
      people.forEach((person, i) => {
        person.position.copy(starts[i]);
        person.rotation.y = -Math.PI / 2;
        if (phase === 'feedback' && stage === 2) {
          const retreat = motion ? Math.min(1, Math.max(0, (elapsedMs - 8000) / 3000)) : 1;
          person.position.x = THREE.MathUtils.lerp(starts[i].x, -4 + i * 0.32, retreat);
          person.position.z = THREE.MathUtils.lerp(starts[i].z, 3 + i * 0.3, retreat);
          person.rotation.y = -Math.PI / 2;
        }
      });
    },
    dispose() {
      group.removeFromParent();
      group.traverse(node => {
        node.geometry?.dispose();
        if (Array.isArray(node.material)) node.material.forEach(material => material.dispose());
        else node.material?.dispose();
      });
    },
  };
}
