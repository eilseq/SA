import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import { getRenderer } from "./renderer";

const composer = new EffectComposer(getRenderer());

export const composePostprocessing = (passes) => {
  composer.reset();
  for (const pass of passes) {
    composer.addPass(pass);
  }
};

export const animate = () => {
  requestAnimationFrame(animate);
  composer.render();
};
animate();
