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
  uniform float width;
  uniform float height;
  uniform float distortion1;
  uniform float amplitude1;
  uniform float distortion2;
  uniform float amplitude2;
  uniform float distortion3;
  uniform float amplitude3;
  uniform float distortion4;
  uniform float amplitude4;
  uniform float magnitudeRed;
  uniform float magnitudeGreen;
  uniform float magnitudeBlue;
  uniform float T;
  uniform int rule0;
  uniform int rule1;
  uniform int rule2;
  uniform int rule3;
  uniform int rule4;
  uniform int rule5;
  uniform sampler2D tDiffuse;
  varying vec2 vUv;

  float f(float size, float n, float distortion, float amplitude){
    return -((size - n) * distortion + n * (1.0 - distortion)) * amplitude + (1.0 - amplitude) * ((size - n) * distortion + n * (1.0 - distortion));
  }

  float bitwiseXor(float a, float b)
  {
      float result = 0.0;
      for(int n = 0; n < 6; n++)
      {
          result += mod(floor(a) + floor(b), 2.0);
          result /= 2.0;
      };
      return result;
  }

  void main() {
    vec4 texelColor = texture2D(tDiffuse, vUv);
    vec3 color = texelColor.rgb;

    float x = vUv.x * width;
    float y = vUv.y * height;

    int x1 = int(f(width, x, distortion1, amplitude1));
    int x2 = int(f(width, x, distortion2, amplitude2) + T);
    int y1 = int(f(height, y, distortion3, amplitude3));
    int y2 = int(f(height, y, distortion4, amplitude4) + T);

    float mooR = magnitudeRed - T / mod(float(x1 % y1), float(y2 ^ rule0 ^ x2 * rule1));
    float mooG = magnitudeGreen - T / mod(float(x1 % y1), float(y2 ^ rule2 ^ x2 * rule3));
    float mooB = magnitudeBlue - T / mod(float(x1 % y1), float(y2 ^ rule4 ^ x2 * rule5));

    // float x1 = f(width, x, distortion1, amplitude1);
    // float x2 = f(width, x, distortion2, amplitude2) + T;
    // float y1 = f(height, y, distortion3, amplitude3);
    // float y2 = f(height, y, distortion4, amplitude4) + T;

    // float mooR = magnitudeRed - T / mod(mod(x1, y1), mod(y2 + rule0 + x2 * rule3, y2));
    // float mooG = magnitudeGreen - T / mod(mod(x1, y1), mod(y2 + rule1 + x2 * rule4, y2));
    // float mooB = magnitudeBlue - T / mod(mod(x1, y1), mod(y2 + rule2 + x2 * rule5, y2));

    // float mooR = magnitudeRed - T / mod(mod(x1, y1), mod(y2 + rule0 + x2 * rule3, y2));
    // float mooG = magnitudeGreen - T / mod(mod(x1, y2), mod(y1 + rule1 + x1 * rule4, y2));
    // float mooB = magnitudeBlue - T / mod(mod(x1, y1), mod(y2 + rule2 + x2 * rule5, y2));

    // float mooR = magnitudeRed - T / mod(mod(x1, y1), mod(y2 + rule0 + x2 / rule3, y2));
    // float mooG = magnitudeGreen - T / mod(mod(x1, y2), mod(y1 + rule1 + x1 / rule4, y2));
    // float mooB = magnitudeBlue - T / mod(mod(x1, y1), mod(y2 + rule2 + x2 / rule5, y2));

    color.r = (mod(color.r * 255.0, mooR) - magnitudeRed / 2.0) * 255.0 - mod(256.0, magnitudeRed) - 1.0;
    color.g = (mod(color.g * 255.0, mooG) - magnitudeGreen / 2.0) * 255.0 - mod(256.0, magnitudeGreen) - 1.0;
    color.b = (mod(color.b * 255.0, mooB) - magnitudeBlue / 2.0) * 255.0 - mod(256.0, magnitudeBlue) - 1.0;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const constantUniforms = {
  width: { value: window.innerWidth },
  height: { value: window.innerHeight },
  magnitudeRed: { value: Math.pow(2, Math.floor(random() * 5) + 1) },
  magnitudeGreen: {
    value: Math.pow(2, Math.floor(random() * 5) + 1),
  },
  magnitudeBlue: {
    value: Math.pow(2, Math.floor(random() * 5) + 1),
  },
  T: { value: Math.pow(2, Math.floor(random() * 4)) },
  rule0: { value: Math.floor(random() * 2) },
  rule1: { value: Math.floor(random() * 2) },
  rule2: { value: Math.floor(random() * 2) },
  rule3: { value: Math.floor(random() * 2) },
  rule4: { value: Math.floor(random() * 2) },
};

const makeUniforms = (tDiffuse) => {
  const uniforms = {
    distortion1: { value: random() },
    amplitude1: { value: random() },
    distortion2: { value: random() },
    amplitude2: { value: random() },
    distortion3: { value: random() },
    amplitude3: { value: random() },
    distortion4: { value: random() },
    amplitude4: { value: random() },
    tDiffuse: { value: tDiffuse || null },
    ...constantUniforms,
  };

  return uniforms;
};

export const makeSA2 = () =>
  new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });
