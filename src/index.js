import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import style from './index.css';
import duck from '../static/gltf/Duck/Duck.gltf';
import FlameLight from './flame-light';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

const flame1 = FlameLight();
flame1.position.set(30, -20, 10);
scene.add(flame1);
const flame2 = FlameLight();
flame2.position.set(-30, -20, 10);
scene.add(flame2);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Load the model
loader.load(duck, 

  // onLoad callback
  gltf => {
		scene.add( gltf.scene );
    (function animate() {
      requestAnimationFrame(animate);
      gltf.scene.rotation.y += 0.01;
      if (Math.random() < 0.2) {
        flame1.flicker();
      }
      if (Math.random() < 0.2) {
        flame2.flicker();
      }
      renderer.render(scene, camera);
    })();
	},

	// Loading callback
	xhr => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},

	// Error callback
	error => {
		console.log( 'An error happened' );
	}
);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});