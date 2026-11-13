# Living Village integration handoff

Base: 9b48a5c0d674b0c10eccb36b2a7c449036629d2c. Branch: codex/animated-sundarpur. No deployment authorized.

Modules: src/features/game/village/{earthquake,flood,fire}.js.
Each exports createScene({ world, assets }) -> { render({ elapsedMs, stage, motion, phase }), dispose() }.
Three.js is bundled locally. Import * as THREE from 'three' when needed.
World: { root, houses, villagers, addBox, addSphere, addVillager }. root is a THREE.Group; house entries are {group, roof}; villagers are groups. Helpers addBox(parent, color, [w,h,d], [x,y,z]), addSphere(parent,color,radius,[x,y,z]), addVillager(parent,[x,y,z],color) return Object3D. Module-owned objects must live in a new group attached to root and be removed in dispose(). No DOM or clocks in modules.
Coordinates: y up; x -6..6 left/right; z -4..4 back/front; ground y=0; river at x=4; village houses at [-3,0,-2], [0,0,-2], [-2,0,1]; dry meeting point x=-4,z=3. Camera [11,10,15] looking at [0,0,0]. Houses have height 1.3 and roofs at y=1.6.
Stages: 0 onset, 1 escalation, 2 aftermath. elapsedMs is host-owned monotonic animation time. motion false means deterministic still pose for stage. phase question prohibits escape or instructional action; neutral onlookers only. phase feedback permits safe response demonstration. Calm/reduced motion are still-only. No scenario choice text, timers, scores or engine imports.
