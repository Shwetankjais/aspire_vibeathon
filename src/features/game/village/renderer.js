import * as THREE from 'three';
import { createWorld, disposeTree } from './world.js';
import { createScene as earthquake } from './earthquake.js';
import { createScene as flood } from './flood.js';
import { createScene as fire } from './fire.js';

export function createRenderer(container, hazard) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  const scene = new THREE.Scene();
  let controller, observer, sun;
  function dispose() {
    observer?.disconnect();
    controller?.dispose();
    disposeTree(scene);
    sun?.shadow.map?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }
  try {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor('#c8d6c1');
    scene.fog = new THREE.Fog('#c8d6c1', 24, 48);
    const camera = new THREE.OrthographicCamera(-9, 9, 8, -8, .1, 70);
    camera.position.set(11, 10, 15);
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight('#fff4dd', '#65745a', 2.6));
    sun = new THREE.DirectionalLight('#ffe2ac', 3);
    sun.position.set(-6, 12, 6);
    sun.castShadow = true;
    Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12 });
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);
    const world = createWorld();
    scene.add(world.root);
    controller = ({ earthquake, flood, fire }[hazard])?.({ world, assets: {} });
    // Initialize safe question poses before any resize can draw a scene.
    controller?.render({ elapsedMs: 0, stage: 0, motion: false, phase: 'question' });
    container.prepend(renderer.domElement);
    let width = 0, height = 0;
    function resize() {
      const w = container.clientWidth, h = container.clientHeight;
      if (!w || !h || (w === width && h === height)) return;
      width = w; height = h;
      renderer.setSize(w, h, false);
      const aspect = w / h;
      camera.left = -8.5 * aspect; camera.right = 8.5 * aspect;
      camera.top = 8.5; camera.bottom = -8.5;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }
    observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    return {
      render(state) { resize(); controller?.render(state); renderer.render(scene, camera); },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
