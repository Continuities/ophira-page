import * as THREE from 'three';
import { random } from './util';

const FlameLight = () => {
  const group = new THREE.Group();
  const red = new THREE.PointLight(0xD54801, 2, 50);
  const orange = new THREE.PointLight(0xffba56, 2, 50);
  group.add(red);
  group.add(orange);
  
  group.flicker = () => {
    orange.intensity = random(0.7, 1);
    red.intensity = random(0.7, 1);
  };

  return group;
};

export default FlameLight;