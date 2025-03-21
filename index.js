import { CanvasCapture } from "canvas-capture";
import * as THREE from "three";

import { setContainer, setSize } from "./src/pipeline/renderer";
import { composer, composePostprocessing } from "./src/pipeline/composer";

import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { code, random } from "./src/utility/random";
import { makeWave } from "./src/shaders/wave";
import { makeHue } from "./src/shaders/hue";
import { makeCrt } from "./src/shaders/crt";
import { makeCompression } from "./src/shaders/compression";
import { makeWavemin } from "./src/shaders/wavemin";
import { makeHueLow } from "./src/shaders/huelow";
import { makeNTSCtoYUV } from "./src/shaders/ntscToYuv";

setSize(4096, 4096); //4K portrait
// setSize(2 * 4096, 2 * 4096); //8K portrait
setContainer(document.body);
// setSize(window.innerWidth, window.innerHeight);

const source = () => `https://picsum.photos/4096/4096`;
// const source = () => `tokyo_nomad_${Math.floor(Math.random() * 20 + 1)}.jpg`;
// const source = () => `https://fakeface.rest/face/view`;
// const source = () => `JPG/IMG_${Math.floor(random() * 148)}.jpeg`;
// const source = () => "kind.webp";

new THREE.TextureLoader().load(source(), (texture) => {
  const fxChain = [new TexturePass(texture)];
  // fxChain.push(makeNTSCtoYUV());
  // if (random() > 0.35) fxChain.push(makeHue());
  // fxChain.push(makeHueLow());
  // if (random() > 0.35) fxChain.push(makeHue());
  // if (random() > 0.35) fxChain.push(makeWave());

  fxChain.push(makeCrt());

  // if (random() > 0.35) fxChain.push(makeWave());
  fxChain.push(makeWavemin());
  // if (random() > 0.35) fxChain.push(makeWavemin());
  // fxChain.push(makeCrt());

  // if (random() > 0.35) fxChain.push(makeCrt());

  // if (random() > 0.35) fxChain.push(makeWave());
  // if (random() > 0.35) fxChain.push(makeWavemin());

  // if (random() > 0.35) fxChain.push(makeCompression());

  composePostprocessing(fxChain);

  composer.render();
  composer.render();

  CanvasCapture.takePNGSnapshot({ name: "SA3/" + code, dpi: 300 }).then(() => {
    setTimeout(() => window.location.reload(), 4000);
  });
});
