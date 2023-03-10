import * as THREE from "three";

import { setContainer, setSize } from "./src/pipeline/renderer";
import { composePostprocessing } from "./src/pipeline/composer";

import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { random } from "./src/utility/random";

import { makeSA2 } from "./src/shaders/sa2";
import { makeL233 } from "./src/shaders/l233";
import { makeWave } from "./src/shaders/wave";
import { makeOverlapPass } from "./src/shaders/overlap";

const effectConstructors = [makeSA2, makeL233, makeWave, makeOverlapPass];
const makeRandomEffect = () => {
  const effectIndex = Math.floor(random() * effectConstructors.length);
  return effectConstructors[effectIndex]();
};

const createRandomEffectChain = (size) => {
  const chain = [];
  for (let index = 0; index < 1 + Math.floor(random() * (size - 1)); index++) {
    chain.push(makeRandomEffect());
  }
  chain.push(makeOverlapPass());
  return chain;
};

setContainer(document.body);
// setSize(3000, 3000);
setSize(window.innerWidth, window.innerHeight);

const source = `https://picsum.photos/1000`;
console.log(source);

new THREE.TextureLoader().load(source, (texture) => {
  const chain = [new TexturePass(texture)].concat(createRandomEffectChain(10));
  composePostprocessing(chain);
});
