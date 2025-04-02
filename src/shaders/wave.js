import { addPass } from "../utility/shaderPass";
import { random } from "../utility/random";

export const addWave1 = (fxChain) => {
  const uniforms = {
    tDiffuse: null,
    mode: 0,
    amplitude1: random(),
    amplitude2: random(),
    phase1: random(),
    phase2: random(),
    freq1: random() * 10,
    freq2: random() * 10,
  };
  return addWave(fxChain, uniforms);
};

export const addWave2 = (fxChain) => {
  const amp = random() * 0.1;
  const phase = random();
  const uniforms = {
    tDiffuse: null,
    mode: 1,
    amplitude1: amp,
    amplitude2: amp,
    phase1: phase * 0.01 * random(),
    phase2: phase * 0.01 * random(),
    freq1: 10,
    freq2: 10,
  };
  return addWave(fxChain, uniforms);
};

export const addWave3 = (fxChain) => {
  const amp = random() * 0.1;
  const phase = random();
  const uniforms = {
    tDiffuse: { value: null },
    mode: 2,
    amplitude1: amp,
    amplitude2: amp,
    phase1: phase * 0.01 * random(),
    phase2: phase * 0.01 * random(),
    freq1: 2,
    freq2: 10,
  };
  return addWave(fxChain, uniforms);
};

export const addWave = (fxChain, uniforms) =>
  addPass(fxChain, uniforms, fragmentShader);

const fragmentShader = `
      uniform int mode;

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

        // Mode 0: sin/cos distortion
        if (mode == 0) {
          uv += vec2(
            amplitude1 * sin(phase1 + uv.y * freq1) * color.r,
            amplitude2 * cos(phase2 + uv.x * freq2) * color.g
          );
        }
        // Mode 1: negative sin/cos distortion
        else if (mode == 1) {
          uv -= vec2(
            amplitude1 * sin(phase1 + uv.y * freq1) * color.r,
            amplitude2 * cos(phase2 + uv.x * freq2) * color.g
          );
        }
        // Mode 2: atan/tan distortion
        else if (mode == 2) {
          uv -= vec2(
            amplitude1 * atan(phase1 + uv.y * freq1) * color.r,
            amplitude2 * tan(phase2 + uv.x * freq2) * color.b
          );
        }
        // Mode 3: structural distortion
        else if (mode == 3) {
          uv += vec2(
            sin(phase1 + uv.y * freq1) * texture2D(tDiffuse, uv).r,
            tan(phase2 + uv.x * freq2) * texture2D(tDiffuse, uv).g
          );
        }

        vec3 distorted = texture2D(tDiffuse, uv).rgb;
        gl_FragColor = vec4(distorted, 1.0);
      }
    `;
