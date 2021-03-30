import * as THREE from 'three';
import { random } from './util';

const sphere = new THREE.SphereBufferGeometry(5, 16, 8);

const LightningLight = (colour=0x9cc1ee, debug) => {
  const group = new THREE.Group();
  const lightning = new THREE.PointLight(colour, 0, 0);
  
  group.add(lightning);

  if (debug) {
    group.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
  }

  const zap = () => {
    lightning.intensity = 2;
    setTimeout(() => {
      lightning.intensity = 0;
    }, random(10, 100));
  };
  
  group.frame = () => {
    if (Math.random() < 0.01) {
      zap();
    }
  };

  group.flicker = () => {
    lightning.intensity = random(0.2, 0.5);
  };

  return group;
};

export default LightningLight;