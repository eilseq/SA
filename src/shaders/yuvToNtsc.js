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
    float u = yuv.g;
    float v = yuv.b;
    
    float cb = -0.1687*u - 0.3313*v;
    float cr = 0.5*u - 0.4187*v;
    
    gl_FragColor = vec4(y, cb, cr, 1.0);
  }
`;

const makeUniforms = () => ({
  tDiffuse: { value: null },
});

export const makeYUVtoNTSC = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
