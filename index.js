import * as THREE from "three";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { random } from "./src/utility/random";

import { makeRenderer } from "./src/pipeline/renderer";
import { makeComposer } from "./src/pipeline/composer";

import { makeMovingWave } from "./src/shaders/movingWave";
import { makeCrt } from "./src/shaders/crt";

const source = () => `https://picsum.photos/4096/4096`;

const loadTexture = () =>
  new Promise((res, rej) => {
    new THREE.TextureLoader().load(source(), res, () => {}, rej);
  });
const renderer = makeRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const { composePostprocessing } = makeComposer(renderer);
const texturePass = new TexturePass();
const fxs = [texturePass, makeCrt(), makeMovingWave()];
composePostprocessing(fxs);

const updateTexture = async () => {
  const texture = await loadTexture();
  texturePass.map = texture;
  setTimeout(updateTexture, 120000 / Math.floor(1 + random() * 8));
};
updateTexture();
