import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
    uniform sampler2D tDiffuse;
    uniform sampler2D tInput;
    varying vec2 vUv;

    void main() {
        vec4 texel1 = texture2D(tDiffuse, vUv);
        vec4 texel2 = texture2D(tInput, vUv / 1.1 + 0.1); // zoom x2
        vec3 color = texel1.rgb / (1.0 - texel2.rgb);
        
        float alpha = texel1.a * texel2.a * 0.1;

        // Use the alpha channel of the incoming texture as a mask
        alpha = alpha * step(0.001, texel2.a);

        gl_FragColor = vec4(color, alpha);
    }
`;

const makeUniforms = () => ({
  tDiffuse: { value: null },
  tInput: { value: null },
});

export const makeDiff = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
