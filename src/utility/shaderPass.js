import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const addPass = (fxChain, uniforms, fragmentShader) => {
  for (const key in uniforms) {
    uniforms[key] = { value: uniforms[key] };
  }

  const pass = new ShaderPass({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  fxChain.push(pass);
  return pass;
};
