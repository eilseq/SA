import * as THREE from "three";

import { setContainer, setSize } from "./src/pipeline/renderer";
import { composePostprocessing } from "./src/pipeline/composer";

import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { random } from "./src/utility/random";

import { makeSA2 } from "./src/shaders/sa2";
import { makeL233 } from "./src/shaders/l233";
import { makeWave } from "./src/shaders/wave";

setContainer(document.body);
setSize(3000, 3000);
// setSize(window.innerWidth, window.innerHeight);

function onLoad(texture) {
  const pipeline = [new TexturePass(texture)];

  const materialL233 = makeL233();
  materialL233.uniforms.scale.value = Math.floor(random() * 10 + 1);
  pipeline.push(materialL233);

  for (let index = 0; index < 2 + Math.floor(random() * 5); index++) {
    const materialSA2 = makeSA2();
    pipeline.push(materialSA2);

    // setInterval(() => {
    //   const speed = 0.0001;
    //   const { uniforms } = materialSA2;
    //   uniforms.T.value += speed;
    //   uniforms.magnitudeRed.value += speed % 255;
    //   uniforms.magnitudeGreen.value += speed % 255;
    //   uniforms.magnitudeBlue.value += speed % 255;
    // }, 4 / 30);

    const materialWave = makeWave();
    pipeline.push(materialWave);

    // setInterval(() => {
    //   const { uniforms } = materialWave;
    //   uniforms.scale.value += 0.0001;
    // }, 8 / 30);
  }

  composePostprocessing(pipeline);
}

const source = `IMG_${1 + Math.floor(random() * 55)}.JPG`;
console.log(source);

const texture = new THREE.TextureLoader().load(source, () => onLoad(texture));
