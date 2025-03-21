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
  uniform float time;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  mat3 rgbToYuv = mat3(
     0.299,     0.587,     0.114,
    -0.14713,  -0.28886,   0.436,
     0.615,    -0.51498,  -0.10001
  );

  mat3 yuvToRgb = mat3(
     1.0,      0.0,        1.13983,
     1.0,     -0.39465,   -0.58060,
     1.0,      2.03211,    0.0
  );

  mat3 RGBtoPAL = mat3(
     0.2126,   0.7152,     0.0722,
    -0.1146,  -0.3854,     0.5,
     0.5,     -0.4542,    -0.0458
  );

  mat3 PALtoRGB = mat3(
    1.0,      0.0,        1.5748,
    1.0,     -0.1873,    -0.4681,
    1.0,      1.8556,     0.0
  );

  float noise(vec2 seed) {
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
      vec3 p = vec3(gl_FragCoord.xy * 1.4 / 4096.0, 0.0);
      vec2 uv = vUv;
      vec3 color = texture2D(tDiffuse, vUv).rgb;

      uv += vec2(
        mod(uv.y, fract(color.r)),
        0.0
      );
      uv -= vec2(
        0.0,
        mod(uv.x, fract(color.r))
      );
      color = texture2D(tDiffuse, uv).rgb;

      color *= RGBtoPAL;
      color.r *= 1.4 ;
      color.b = fract(sin(time)) * fract(1.0 + uv.y / uv.x * time * 100.0);
      // color.g += fract(0.1 + uv.y * 10.1);
      color.g *= 2.5;
      color *= PALtoRGB;

      gl_FragColor = vec4(color, 1.0);
  }
`;

const makeUniforms = () => ({
  scale: { value: random() * 0.1 + 0.01 },
  time: { value: 1 },
  tDiffuse: { value: null },
});

export const makeCrt = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  setInterval(() => {
    pass.material.uniforms.time.value -= 0.01;
  }, 1000 / 10);

  return pass;
};
