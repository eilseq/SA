import { Color } from "three";
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
  uniform vec3 background;
  uniform float amplitude1;
  uniform float amplitude2;
  uniform float phase1;
  uniform float phase2;
  uniform float freq1;
  uniform float freq2;

  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec3 color = texture2D(tDiffuse, uv).rgb;

    uv += vec2(
      amplitude1 * sin(phase1 + uv.y * freq1) * color.r,
      amplitude2 * cos(phase2 + uv.x * freq2) * color.g
    );

    vec3 distorted = texture2D(tDiffuse, uv).rgb;
    distorted = distorted;

    gl_FragColor = vec4(distorted, 1.0);
  }
`;

const amp = random();
const phase = random();

const makeUniforms = () => ({
  amplitude1: { value: random() },
  amplitude2: { value: random() },
  phase1: { value: random() },
  phase2: { value: random() },
  freq1: { value: random() * 10 },
  freq2: { value: random() * 10 },
  tDiffuse: { value: null },
});

export const makeWave = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  setInterval(() => {
    pass.uniforms.amplitude1.value = random() * 0.1;
    pass.uniforms.amplitude2.value = random() * 0.1;
    pass.uniforms.phase1.value = random() * 0.01;
    pass.uniforms.phase2.value = random() * 0.01;
    pass.uniforms.freq1.value = random() * 10;
    pass.uniforms.freq2.value = random() * 310;
  }, 10);

  return pass;
};
