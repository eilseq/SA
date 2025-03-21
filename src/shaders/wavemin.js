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

    uv -= vec2(
      amplitude1 * sin(phase1 + uv.y * freq1) * color.r,
      amplitude2 * cos(phase2 + uv.x * freq2) * color.g
    );

    vec3 distorted = texture2D(tDiffuse, uv).rgb;
    distorted = distorted;

    gl_FragColor = vec4(distorted, 1.0);
  }
`;

const amp = random() * 0.1;
const phase = random();

const makeUniforms = () => ({
  amplitude1: { value: amp },
  amplitude2: { value: amp },
  phase1: { value: phase * 0.01 * random() },
  phase2: { value: phase * 0.01 * random() },
  freq1: { value: 10 },
  freq2: { value: 10 },
  tDiffuse: { value: null },
});

export const makeWavemin = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  window.onclick = () => {
    console.log(pass.material.uniforms.scale.value);
  };
  return pass;
};
