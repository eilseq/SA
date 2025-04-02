import { addPass } from "../utility/shaderPass";
import { makeColorFromHSL } from "../utility/colors";
import { random } from "../utility/random";

export const addHue1 = (fxChain) => {
  const uniforms = {
    tDiffuse: null,
    color: makeColorFromHSL(random(), random(), random()),
  };
  return addHue(fxChain, uniforms);
};

export const addHue = (fxChain, uniforms) =>
  addPass(fxChain, uniforms, fragmentShader);

const fragmentShader = `
      uniform sampler2D tDiffuse;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          texel.xyz /= color;
          gl_FragColor = texel;
      }
    `;
