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

    mat3 RGBtoAlternate = mat3(
        0.393,  0.769,  0.189,
        0.349,  0.686,  0.168,
        0.272,  0.534,  0.131
    );

    mat3 AlternateToRGB = mat3(
        1.909, -1.481,  0.644,
    -0.532,  1.682, -0.349,
    -0.111, -0.579,  1.764
    );

  void main() {
      vec2 uv = vUv;
      vec3 color = texture2D(tDiffuse, uv).rgb;

    //   uv += vec2(
    //     0.05 * scale * uv.y * color.r,
    //     0.05 * scale * uv.x * color.g
    //   );
    //   color = texture2D(tDiffuse, uv).rgb;
  
      color *= RGBtoAlternate;
      color.b /= 1.5 * fract(1.0 + uv.y * 10.1);
      color.g *= 0.9 * fract(0.1 + uv.y * 10.1);
      color *= AlternateToRGB;
  
      gl_FragColor = vec4(color, 1.0);
  }
`;

const makeUniforms = () => ({
  scale: { value: random() * 0.1 + 0.01 },
  tDiffuse: { value: null },
});

export const makeCrtGptChange = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  return pass;
};
