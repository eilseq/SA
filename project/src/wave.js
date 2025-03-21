import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float wavePhase;
  uniform float waveFreq;
  uniform sampler2D tDiffuse;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    float distortion = 0.1;

    uv += distortion * vec2(
      cos(wavePhase + uv.y * waveFreq) * texture2D(tDiffuse, uv).r,
      sin(wavePhase + uv.x * waveFreq) * texture2D(tDiffuse, uv).b
    );
    
    vec4 distorted = texture2D(tDiffuse, uv);
    gl_FragColor = distorted;
  }
`;

const makeUniforms = () => ({
  wavePhase: { value: $fx.getParam("wavePhase1") },
  waveFreq: { value: $fx.getParam("waveFreq1") },
  tDiffuse: { value: null },
});

export const makeWave = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  setInterval(() => {
    pass.material.uniforms.wavePhase.value += 0.1;
  }, 10);

  return pass;
};
