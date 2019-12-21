import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import style from './index.css';
import duck from '../static/gltf/Duck/Duck.gltf';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const controls = new OrbitControls(camera, renderer.domElement);

// Load the model
loader.load(duck, 

  // onLoad callback
  gltf => {
		scene.add( gltf.scene );
    (function animate() {
      requestAnimationFrame(animate);
      controls.update();
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