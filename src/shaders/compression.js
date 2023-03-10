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
  varying vec2 vUv;

  float amount = 1.0;

  void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    vec3 rgb = color.rgb;

    // Apply the transfer function
    rgb = tanh(rgb * amount) / tanh(amount);

    gl_FragColor = vec4(rgb, color.a);
  }
`;

const makeUniforms = () => ({
  tDiffuse: { value: null },
});

export const makeCompression = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
