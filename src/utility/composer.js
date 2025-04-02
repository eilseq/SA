import { CanvasCapture } from "canvas-capture";
import { FloatType, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";

export const composePostprocessing = (fxChain, canvas) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
    type: FloatType,
    canvas,
  });

  renderer.setSize(2 * 4096, 2 * 4096, false);
  CanvasCapture.init(canvas);

  const composer = new EffectComposer(renderer);
  for (const pass of fxChain) {
    composer.addPass(pass);
  }

  return composer;
};

setInterval(() => {
  window.location.reload();
}, 60000);
