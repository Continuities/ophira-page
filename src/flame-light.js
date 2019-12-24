import * as THREE from 'three';
import { random } from './util';

const sphere = new THREE.SphereBufferGeometry(5, 16, 8);

const FlameLight = (debug) => {
  const group = new THREE.Group();
  const red = new THREE.PointLight(0xD54801, 2, 0);
  const orange = new THREE.PointLight(0xffba56, 2, 0);
  
  group.add(red);
  group.add(orange);

  if (debug) {
    group.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
  }
  
  group.flicker = () => {
    orange.intensity = random(0.7, 1);
    red.intensity = random(0.7, 1);
  };

  return group;
};

export default FlameLight;