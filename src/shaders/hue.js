import { HSLtoColor } from "../utility/conversion";
import { addPass } from "../utility/shaderPass";

export const addHue = (fxChain, initUniforms) =>
  addPass(
    fxChain,
    initUniforms,

    // uniforms
    {
      tDiffuse: { value: null },
      color: {
        value: HSLtoColor(180, 0, 0),
      },
    },

    // fragmentShader
    `
      uniform sampler2D tDiffuse;
      uniform vec3 color;
      varying vec2 vUv;

      void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          texel.xyz /= color;
          gl_FragColor = texel;
      }
    `
  );
