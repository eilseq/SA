import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

export const makeComposer = (renderer) => {
  const composer = new EffectComposer(renderer);

  const animate = () => {
    requestAnimationFrame(animate);
    composer.render();
  };
  animate();

  return {
    composePostprocessing: (passes) => {
      composer.reset();
      for (const pass of passes) {
        composer.addPass(pass);
      }
    },
    animate,
  };
};
