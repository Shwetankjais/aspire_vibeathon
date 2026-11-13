/**
 * village/index.js — Animated Sundarpur: Flood & Fire modules
 * Owner: Antigravity
 *
 * Usage (via dynamic import or static import by the host):
 *
 *   import { createFloodScene, floodStillFrames } from './village/index.js';
 *   import { createFireScene,  fireStillFrames  } from './village/index.js';
 *
 * Both modules implement:
 *   createScene({ world, assets }) → { render({ elapsedMs, stage, motion, phase }), dispose() }
 *
 * world   – DOM element provided by the shared 3D host (or the fallback harness)
 * assets  – shared geometry/character helpers (passed through; CSS-only modules ignore)
 */

export { createScene as createFloodScene, floodStillFrames } from './flood-scene.js';
export { createScene as createFireScene,  fireStillFrames  } from './fire-scene.js';

