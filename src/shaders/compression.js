import { addPass } from "../utility/shaderPass";

export const addCompression = (fxChain, initUniforms) =>
  addPass(
    fxChain,
    initUniforms,

    // uniforms
    {
      amount: { value: 0 },
    },

    // fragmentShader
    `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;

      float amount = 1.0;

      void main() {
        vec4 color = texture2D(tDiffuse, vUv);
        vec3 rgb = color.rgb;

        // Apply the transfer function
        rgb = tanh(rgb * amount) / tanh(amount);

        gl_FragColor = vec4(rgb, color.a);
      }
    `
  );
