import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

const makeRenderPass = (scene, camera) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 1;

  const pass = addPass(new RenderPass(scene, camera));
  return pass;
};
