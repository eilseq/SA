import { ShaderMaterial, UniformsUtils } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vhsShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0.0 },
    uScanlineIntensity: { value: 0.05 },
    uScanlineCount: { value: 720 },
    uNoiseIntensity: { value: 0.2 },
    uNoiseScale: { value: 1.0 },
    uColorShiftIntensity: { value: 0.05 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uScanlineIntensity;
    uniform float uScanlineCount;
    uniform float uNoiseIntensity;
    uniform float uNoiseScale;
    uniform float uColorShiftIntensity;
    varying vec2 vUv;
    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    void main() {
      vec2 uv = vUv;
      vec4 color = texture2D(tDiffuse, uv);
      float scanline = clamp(abs(sin(uv.y * uScanlineCount * 3.14)), 0.0, 1.0);
      color.rgb *= 1.0 - (scanline * uScanlineIntensity);
      float noise = rand(uv * uNoiseScale) - 0.5;
      color.rgb += noise * uNoiseIntensity;
      color.rgb += sin(uTime) * uColorShiftIntensity;
      gl_FragColor = color;
    }
  `,
};

const vhsMaterial = new ShaderMaterial({
  uniforms: UniformsUtils.clone(vhsShader.uniforms),
  vertexShader: vhsShader.vertexShader,
  fragmentShader: vhsShader.fragmentShader,
});

setInterval(() => {
  vhsShader.uniforms.uTime.value += 0.1;
  vhsShader.uniforms.uColorShiftIntensity.value *= fxrand();
  vhsShader.uniforms.uColorShiftIntensity.value /= fxrand();
  vhsShader.uniforms.uScanlineCount.value *= fxrand();
  vhsShader.uniforms.uScanlineCount.value /= fxrand();
  vhsShader.uniforms.uNoiseIntensity.value *= fxrand();
  vhsShader.uniforms.uNoiseIntensity.value /= fxrand();
  vhsShader.uniforms.uNoiseScale.value *= fxrand();
  vhsShader.uniforms.uNoiseScale.value /= fxrand();
}, 10);

export const vhsPass = new ShaderPass(vhsMaterial);
