import { addPass } from "../utility/shaderPass";
import { random } from "../utility/random";

export const addCompression1 = (fxChain) => {
  const uniforms = {
    amount: random(),
  };
  return addCompression(fxChain, uniforms);
};

export const addCompression = (fxChain, uniforms) =>
  addPass(fxChain, uniforms, fragmentShader);

const fragmentShader = `
      uniform sampler2D tDiffuse;
      uniform float amount;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(tDiffuse, vUv);
        vec3 rgb = color.rgb;

        // Apply the transfer function
        rgb = tanh(rgb * amount) / tanh(amount);

        gl_FragColor = vec4(rgb, color.a);
      }
    `;
