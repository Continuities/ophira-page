/**
 * This stuff isn't important, so will be defer-loaded
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import model from '../static/gltf/ophira.glb';
import FlameLight from './flame-light';
import LightningLight from './lightning-light';
import { isStormy } from './weather';

const container = document.getElementById('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  container.clientWidth / container.clientHeight, 
  0.1, 
  2000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const loader = new GLTFLoader();

const moon = new THREE.PointLight(0x081935, 1, 0);
moon.position.set(0, 20, 3);
scene.add(moon);

const forceLightning = false;

let light1, light2;
(async () => {
  const lightning = forceLightning || await isStormy();
  if (lightning) {
    light1 = LightningLight();
    light1.position.set(10, 20, 3);
    scene.add(light1);
    light2 = LightningLight(0xffeeff);
    light2.position.set(-10, 20, 3);
    scene.add(light2);
  }
  else {
    light1 = FlameLight();
    light1.position.set(10, -20, 3);
    scene.add(light1);
    light2 = FlameLight();
    light2.position.set(-10, -20, 3);
    scene.add(light2);
  }
})();

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);
camera.position.z = 1;
camera.position.y = -0.15;

// Load the model
loader.load(model, 

  // onLoad callback
  gltf => {
    gltf.scene.rotation.z = Math.PI;
		scene.add(gltf.scene);
    document.body.className = 'loaded';

    (function animate() {
      requestAnimationFrame(animate);
      if (window.scrollY >= window.innerHeight) {
        return;
      }
      gltf.scene.rotation.y += 0.01;
      light1 && light1.frame();
      light2 && light2.frame();
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