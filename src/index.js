import { CanvasCapture } from "canvas-capture";
import * as THREE from "three";

import { setContainer, setSize } from "./pipeline/renderer";
import { composer, composePostprocessing } from "./pipeline/composer";

import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { code, random } from "./utility/random";
import { makeWave } from "./shaders/wave";
import { makeHue } from "./shaders/hue";
import { makeCrt } from "./shaders/crt";
import { makeCompression } from "./shaders/compression";
import { makeWavemin } from "./shaders/wavemin";
import { makeHueLow } from "./shaders/huelow";
import { makeNTSCtoYUV } from "./shaders/ntscToYuv";

setSize(4096, 4096); //4K portrait
setContainer(document.body);

const source = () => "https://picsum.photos/1024/1024"

new THREE.TextureLoader().load(source(), (texture) => {
  const fxChain = [new TexturePass(texture)];
  fxChain.push(makeNTSCtoYUV());
  fxChain.push(makeHue());
  fxChain.push(makeHueLow());
  if (random() > 0.35) fxChain.push(makeHue());
  if (random() > 0.35) fxChain.push(makeWave());

  fxChain.push(makeCrt());

  if (random() > 0.35) fxChain.push(makeWave());
  fxChain.push(makeWavemin());
  if (random() > 0.35) fxChain.push(makeWavemin());

  if (random() > 0.35) fxChain.push(makeCrt());

  if (random() > 0.35) fxChain.push(makeWave());
  if (random() > 0.35) fxChain.push(makeWavemin());

  if (random() > 0.35) fxChain.push(makeCompression());

  composePostprocessing(fxChain);
  composer.render();

  CanvasCapture.takePNGSnapshot({ name: "SA" + code, dpi: 300 }).then(() => {
    setTimeout(() => window.location.reload(), 4000);
  });
});
