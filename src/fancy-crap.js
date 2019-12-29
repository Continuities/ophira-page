/**
 * This stuff isn't important, so will be defer-loaded
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import skull from '../static/gltf/Skull/scene.gltf';
import FlameLight from './flame-light';

const container = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  container.clientWidth / container.clientHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const loader = new GLTFLoader();

const flame1 = FlameLight();
flame1.position.set(150, -100, 100);
scene.add(flame1);
const flame2 = FlameLight();
flame2.position.set(-150, -100, 100);
scene.add(flame2);

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
camera.position.z = 400;

// Load the model
loader.load(skull, 

  // onLoad callback
  gltf => {
    gltf.scene.rotation.x = 0.6;
    gltf.scene.rotation.y = Math.PI;
		scene.add(gltf.scene);
    document.body.className = 'loaded';

    (function animate() {
      requestAnimationFrame(animate);
      if (window.scrollY >= window.innerHeight) {
        return;
      }
      gltf.scene.rotation.y += 0.01;
      if (Math.random() < 0.2) {
        flame1.flicker();
      }
      if (Math.random() < 0.2) {
        flame2.flicker();
      }
      renderer.render(scene, camera);
    })();
	}
);

window.addEventListener('resize', () => {
  container.style.height = `${window.innerHeight}px`;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});