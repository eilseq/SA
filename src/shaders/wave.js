import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { random } from "../utility/random";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float scale;
  uniform sampler2D tDiffuse;

  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    float distortion = 0.1;
    float distortionFreq = 10.0;
    float noise = texture2D(tDiffuse, uv).r;

    uv += distortion * vec2(
      cos(scale * distortionFreq + uv.y * 10.0) * noise,
      sin(scale * distortionFreq + uv.x * 10.0) * noise
    );
    
    vec4 distorted = texture2D(tDiffuse, uv);
    gl_FragColor = distorted;
  }
`;

const makeUniforms = () => ({
  scale: { value: random() * 0.1 + 0.01 },
  tDiffuse: { value: null },
});

export const makeWave = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  setInterval(() => {
    const { uniforms } = pass;
    uniforms.scale.value += Math.random();
  }, 8 / 30);

  return pass;
};
