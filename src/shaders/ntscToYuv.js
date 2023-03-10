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
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  void main() {
    vec3 yuv = texture2D(tDiffuse, vUv).rgb;
    float y = yuv.r;
    float cb = yuv.g;
    float cr = yuv.b;
    
    float u = -1.402*(cr - 0.5) / (0.2989*cb + 0.5870*y - 0.1140);
    float v = 1.772*(cb - 0.5) / (0.2989*cb + 0.5870*y - 0.1140);

    gl_FragColor = vec4(y, u, v, 1.0);
  }
`;

const makeUniforms = () => ({
  tDiffuse: { value: null },
});

export const makeNTSCtoYUV = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
