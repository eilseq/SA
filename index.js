import { CanvasCapture } from "canvas-capture";
import * as THREE from "three";

import { setContainer, setSize } from "./src/pipeline/renderer";
import { composer, composePostprocessing } from "./src/pipeline/composer";

import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { code, random } from "./src/utility/random";
import { makeWave } from "./src/shaders/wave";
import { makeHue } from "./src/shaders/hue";
import { makeCrt } from "./src/shaders/crt";
import { makeFeedback } from "./src/shaders/feedback";
import { makeWavemin } from "./src/shaders/wavemin";

setContainer(document.body);
// setSize(4096, 4096); //4K portrait
// setSize(3000, 3000); //4K portrait
setSize(window.innerWidth, window.innerHeight);

let i = 131;
const source = () => `https://picsum.photos/1024/1024`;
// const source = () => `MKC3.png`;
// const source = () => `https://fakeface.rest/face/view`;
// const source = () => `IMG_${Math.floor(i)}.jpg`;
// const source = () => `JPG/IMG_${Math.floor(random() * 148)}.jpeg`;
// const source = () => `IMG_${Math.floor(random() * 148)}.jpg`;

new THREE.TextureLoader().load(source(), (texture) => {
  composePostprocessing([
    new TexturePass(texture),
    // makeHue(),
    makeWave(),
    makeCrt(),
    makeWave(),
    // makeCrt(),
    // makeWavemin(),
  ]);
  composer.render();
  composer.render();
  composer.render();
  composer.render();
  composer.render();
  // const srcCanvas = composer.renderer.domElement;

  // new Hydra({
  //   detectAudio: false,
  //   // autoLoop: false,
  // });

  // s0.init({ src: srcCanvas });

  // src(s0).mult(src(s0).scale(1.1)).out();

  // CanvasCapture.takePNGSnapshot({ name: "" + code, dpi: 300 }).then(() => {
  //   // setTimeout(() => window.location.reload(), 4000);
  // });
});
