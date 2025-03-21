import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

import { getRenderer } from "./renderer";

export const composer = new EffectComposer(getRenderer());

export const composePostprocessing = (passes) => {
  composer.reset();
  for (const pass of passes) {
    composer.addPass(pass);
  }

  return composer;
};

// export const animate = () => {
//   composer.render();
//   requestAnimationFrame(animate);
// };
// animate();
