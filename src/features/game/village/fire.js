import * as THREE from 'three';

// Localized fire on the east side of one house; the west door and route stay clear.
export function createScene({ world }) {
  const group = new THREE.Group();
  group.name = 'home-fire-sequence';
  world.root.add(group);
  const smoke = Array.from({ length: 9 }, (_, i) => {
    const puff = world.addSphere(group, 0x726965, 0.24 + i * 0.025, [0.5, 2, -2]);
    puff.material.transparent = true;
    puff.material.opacity = 0.55;
    return puff;
  });
  const flames = Array.from({ length: 5 }, (_, i) => {
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.14 + (i % 2) * 0.06, 0.65, 7),
      new THREE.MeshStandardMaterial({ color: i % 2 ? 0xf2b64d : 0xde793e, emissive: 0x91401d, emissiveIntensity: 0.35, roughness: 0.85 }));
    flame.position.set(0.65 + (i % 2) * 0.18, 0.8 + i * 0.16, -2.4 + i * 0.18);
    group.add(flame);
    return flame;
  });
  const glow = new THREE.PointLight(0xffb462, 0, 4, 2);
  glow.position.set(1.1, 1.2, -1.8);
  group.add(glow);
  const people = [world.addVillager(group, [-0.8, 0, -1.1], 0x647899), world.addVillager(group, [-1.25, 0, -0.85], 0xd5a451)];
  people.forEach((person, i) => { person.name = `fire-villager-${i}`; });
  const starts = people.map(person => person.position.clone());
  // A pale stone ring marks the clear outdoor meeting place, away from the house.
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.045, 5, 24), new THREE.MeshStandardMaterial({ color: 0xd9cdac }));
  ring.rotation.x = Math.PI / 2;
  ring.position.set(-4, 0.035, 3);
  group.add(ring);
  return {
    render({ elapsedMs = 0, stage = 0, motion = false, phase = 'question' }) {
      ring.visible = phase === 'feedback';
      const growth = motion ? Math.min(1, elapsedMs / 6000) : [0.12, 0.8, 1][stage];
      smoke.forEach((puff, i) => {
        const rise = motion ? ((elapsedMs / 2300 + i * 0.5) % 4.5) : i * 0.45;
        puff.position.set(0.55 + rise * 0.28, 1.8 + rise * 0.6, -2 - rise * 0.12);
        puff.scale.setScalar((0.55 + rise * 0.22) * (0.6 + growth * 0.4));
        puff.material.opacity = (0.45 - rise * 0.06) * (0.6 + growth * 0.4);
      });
      flames.forEach((flame, i) => {
        flame.visible = stage > 0;
        // Slow breathing, never flashing or rapid flicker.
        const breath = motion ? 1 + Math.sin(elapsedMs / 1500 + i) * 0.08 : 1;
        flame.scale.set(1, (0.55 + growth * 0.45) * breath, 1);
      });
      glow.intensity = stage > 0 ? 2.5 : 0;
      people.forEach((person, i) => {
        person.position.copy(starts[i]);
        person.rotation.y = Math.PI / 2;
        if (phase === 'feedback' && stage === 2) {
          const escape = motion ? Math.min(1, Math.max(0, (elapsedMs - 8000) / 3500)) : 1;
          // Bend around the front house, then follow the clear southern lane.
          const corner = new THREE.Vector3(0.1 - i * 0.15, 0, 2.5 + i * 0.2);
          const destination = new THREE.Vector3(-4 + i * 0.4, 0, 3 + i * 0.3);
          const firstLeg = escape < 0.5;
          person.position.lerpVectors(firstLeg ? starts[i] : corner,
            firstLeg ? corner : destination, firstLeg ? escape * 2 : (escape - 0.5) * 2);
          person.rotation.y = firstLeg ? Math.PI / 8 : -Math.PI / 2;
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
