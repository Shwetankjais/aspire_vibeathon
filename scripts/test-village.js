import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createWorld, disposeTree } from '../src/features/game/village/world.js';
import { createScene as flood } from '../src/features/game/village/flood.js';
import { createScene as fire } from '../src/features/game/village/fire.js';
import { createScene as earthquake } from '../src/features/game/village/earthquake.js';

function snapshot(root) {
  const result = [];
  root.traverse(node => result.push({ name: node.name, visible: node.visible,
    position: node.position.toArray(), rotation: node.rotation.toArray(), scale: node.scale.toArray(),
    opacity: node.material?.opacity }));
  return result;
}
for (const [hazard, createScene] of Object.entries({ earthquake, flood, fire })) {
  test(`${hazard}: still poses are independent of animation time and dispose removes owned nodes`, () => {
    const world = createWorld();
    const initial = snapshot(world.root);
    const controller = createScene({ world });
    for (const phase of ['question', 'feedback']) for (let stage = 0; stage < 3; stage++) {
      controller.render({ elapsedMs: 0, stage, motion: false, phase });
      const first = snapshot(world.root);
      controller.render({ elapsedMs: 17891, stage, motion: false, phase });
      assert.deepEqual(snapshot(world.root), first);
    }
    controller.dispose();
    assert.deepEqual(snapshot(world.root), initial);
    disposeTree(world.root);
  });
}
for (const [hazard, createScene] of Object.entries({ flood, fire })) {
  test(`${hazard}: no answer demonstration during question, and feedback routes avoid houses and tree trunks`, () => {
    const world = createWorld();
    const controller = createScene({ world });
    const people = [];
    world.root.traverse(node => { if (node.name.startsWith(`${hazard}-villager-`)) people.push(node); });
    assert.ok(people.length >= 2);
    const starts = people.map(person => person.position.toArray());
    for (const elapsedMs of [0, 4500, 9000, 15000, 60000]) {
      controller.render({ elapsedMs, stage: Math.min(2, Math.floor(elapsedMs / 4000)), motion: true, phase: 'question' });
      assert.deepEqual(people.map(person => person.position.toArray()), starts);
    }
    const trees = [[-5,-1],[-4,2],[1,1],[1,-4],[-5,-3],[2,3]];
    for (let elapsedMs = 8000; elapsedMs <= 12000; elapsedMs += 50) {
      controller.render({ elapsedMs, stage: 2, motion: true, phase: 'feedback' });
      for (const person of people) {
        const { x, z } = person.position;
        for (const house of world.houses) assert.ok(
          Math.abs(x - house.group.position.x) > 0.95 || Math.abs(z - house.group.position.z) > 0.825,
          `${hazard} route crosses house at ${x},${z}`);
        for (const [tx, tz] of trees) assert.ok(Math.hypot(x - tx, z - tz) > 0.26, 'Route crosses tree trunk');
        if (hazard === 'flood') assert.ok(x < 0.15, 'Villager entered flood water');
      }
    }
    assert.notDeepEqual(people.map(person => person.position.toArray()), starts);
    controller.dispose(); disposeTree(world.root);
  });
}
