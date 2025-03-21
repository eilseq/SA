import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float scale;
  uniform float waveFreq;
  uniform sampler2D tDiffuse;
  uniform float distortion;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    uv += distortion * vec2(
      cos(uv.x * waveFreq) * scale * texture2D(tDiffuse, uv).b,
      sin(uv.y * waveFreq) * texture2D(tDiffuse, uv).g
    );
    
    vec4 distorted = texture2D(tDiffuse, uv);
    gl_FragColor = distorted;
  }
`;

const makeUniforms = () => ({
  distortion: { value: $fx.getParam("waveDistortion2") },
  scale: { value: $fx.getParam("waveCosAmp2") },
  waveFreq: { value: $fx.getParam("waveFreq2") },
  tDiffuse: { value: null },
});

export const makeWave2 = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  let t = 0;
  setInterval(() => {
    pass.material.uniforms.scale.value = 10 * Math.sin(t);
    t += 0.003;
  }, 25);

  return pass;
};
