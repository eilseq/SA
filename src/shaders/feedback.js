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
  uniform sampler2D bufferTexture;
  
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    vec4 sum = texture2D(bufferTexture, uv);
    vec4 src = texture2D(tDiffuse, uv);
    sum.rgb = mix(sum.rbg, src.rgb, 0.01);

    gl_FragColor = sum;
    
  }
`;

const makeUniforms = (bufferTexture) => ({
  tDiffuse: { value: null },
  bufferTexture: { value: bufferTexture },
  tInput: { value: null },
});

export const makeFeedback = (bufferTexture) => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(bufferTexture),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
