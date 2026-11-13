// Draw uniformly across every eligible scene and Rapid Pick pair.
export function createVisualDraw(pool, random = Math.random) {
  const scenes = pool.filter(scenario => scenario.format === 'scene');
  const rapid = pool.filter(scenario => scenario.format === 'rapid');
  const pairs = scenes.flatMap(scene => rapid.map(prompt => [scene, prompt]));
  if (pairs.length === 0) throw new Error('Visual Challenges needs both formats');
  let previous;

  return () => {
    const eligible = pairs.length === 1 ? pairs : pairs.filter(pair => pair !== previous);
    previous = eligible[Math.floor(random() * eligible.length)];
    return [...previous];
  };
}
