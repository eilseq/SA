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

  void main() {
    vec2 uv = vUv;
    
    float distortion = 0.1;
    float distortionFreq = 10.0;
    float noise = texture2D(tDiffuse, uv).r;

    uv += distortion * vec2(
      cos(scale * distortionFreq + uv.y * 10.0) * texture2D(tDiffuse, uv).r,
      sin(scale * distortionFreq + uv.x * 10.0) * texture2D(tDiffuse, uv).g
    );
    
    vec4 distorted = texture2D(tDiffuse, uv);
    gl_FragColor = distorted;
  }
`;

const makeUniforms = () => ({
  scale: { value: random() * 1 + 0.01 },
  tDiffuse: { value: null },
});

export const makeWave = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
