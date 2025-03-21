import * as THREE from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

$fx.params([
  {
    id: "source",
    name: "source",
    type: "bigint",
    options: {
      min: 1,
      max: 14,
      step: 1,
    },
  },
  {
    id: "wavePhase1",
    name: "wavePhase1",
    type: "number",
    options: {
      min: 0.0000001,
      max: 1,
      step: 0.0000001,
    },
  },
  {
    id: "waveFreq1",
    name: "waveFreq1",
    type: "number",
    options: {
      min: 1,
      max: 1100,
      step: 0.1,
    },
  },
  {
    id: "waveDistortion2",
    name: "waveDistortion2",
    type: "number",
    options: {
      min: 0.0000001,
      max: 0.1,
      step: 0.0000001,
    },
  },
  {
    id: "waveCosAmp2",
    name: "waveCosAmp2",
    type: "number",
    options: {
      min: 0.0000001,
      max: 1,
      step: 0.0000001,
    },
  },
  {
    id: "waveFreq2",
    name: "waveFreq2",
    type: "number",
    options: {
      min: 1,
      max: 50,
      step: 0.1,
    },
  },
  {
    id: "speed",
    name: "speed",
    default: 0.1,
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 0.01,
    },
  },
  {
    id: "time",
    name: "time",
    type: "number",
    options: {
      min: 0.01,
      max: 100,
      step: 0.01,
    },
  },
  {
    id: "iterations",
    name: "Iterations",
    type: "bigint",
    options: {
      min: 1,
      max: 5,
      step: 1,
    },
  },
  {
    id: "magnitudeR",
    name: "magnitude R",
    type: "number",
    options: {
      min: 0.01,
      max: 50,
      step: 0.01,
    },
  },
  {
    id: "magnitudeG",
    name: "magnitude G",
    type: "number",
    options: {
      min: 0.01,
      max: 50,
      step: 0.01,
    },
  },
  {
    id: "magnitudeB",
    name: "magnitude B",
    type: "number",
    options: {
      min: 0.01,
      max: 50,
      step: 0.01,
    },
  },
  {
    id: "rule0",
    name: "rule 0",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "rule1",
    name: "rule 1",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "rule2",
    name: "rule 2",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "rule3",
    name: "rule 3",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "rule4",
    name: "rule 4",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "rule5",
    name: "rule 5",
    type: "number",
    options: {
      min: 0,
      max: 1,
      step: 1,
    },
  },
  {
    id: "dist1",
    name: "dist 1",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "amp1",
    name: "amp 1",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "dist2",
    name: "dist 2",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "amp2",
    name: "amp 2",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "dist3",
    name: "dist 3",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "amp3",
    name: "amp 3",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "dist4",
    name: "dist 4",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
  {
    id: "amp4",
    name: "amp 4",
    type: "number",
    options: {
      min: 0.01,
      max: 1,
      step: 0.00000000000001,
    },
  },
]);

const params = {
  width: { value: window.innerWidth },
  height: { value: window.innerHeight },
  magnitudeRed: { value: $fx.getParam("magnitudeR") },
  magnitudeGreen: { value: $fx.getParam("magnitudeG") },
  magnitudeBlue: { value: $fx.getParam("magnitudeB") },
  time: { value: $fx.getParam("time") },
  rule0: { value: $fx.getParam("rule0") },
  rule1: { value: $fx.getParam("rule1") },
  rule2: { value: $fx.getParam("rule2") },
  rule3: { value: $fx.getParam("rule3") },
  rule4: { value: $fx.getParam("rule4") },
  rule5: { value: $fx.getParam("rule5") },
  distortion1: { value: $fx.getParam("dist1") },
  amplitude1: { value: $fx.getParam("amp1") },
  distortion2: { value: $fx.getParam("dist2") },
  amplitude2: { value: $fx.getParam("amp2") },
  distortion3: { value: $fx.getParam("dist3") },
  amplitude3: { value: $fx.getParam("amp3") },
  distortion4: { value: $fx.getParam("dist4") },
  amplitude4: { value: $fx.getParam("amp4") },
};

const makeUniforms = (n) => {
  const uniforms = {
    ...params,
    tDiffuse: { value: null },
  };

  const speed = -0.002 * $fx.getParam("speed") + 0.0005;
  const animateUniforms = () => {
    uniforms.time.value += speed;
    uniforms.magnitudeRed.value += speed % 255;
    uniforms.magnitudeGreen.value += speed % 255;
    uniforms.magnitudeBlue.value += speed % 255;
  };

  let timeout;
  window.addEventListener("keydown", (e) => {
    if (e.key === "p") {
      if (timeout) {
        clearInterval(timeout);
        timeout = null;
      } else {
        timeout = setInterval(animateUniforms, 1);
      }
    }
  });

  window.addEventListener("dblclick", (e) => {
    if (timeout) {
      clearInterval(timeout);
      timeout = null;
    } else {
      timeout = setInterval(animateUniforms, 1);
    }
  });

  window.addEventListener("touchstart", (e) => {
    if (timeout) {
      clearInterval(timeout);
      timeout = null;
    } else {
      timeout = setInterval(animateUniforms, 1);
    }
  });

  return uniforms;
};

const makeSa1 = (n) => {
  return new THREE.ShaderMaterial({
    uniforms: makeUniforms(n),
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
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
        
        uniform float time;

        uniform int rule0;
        uniform int rule1;
        uniform int rule2;
        uniform int rule3;
        uniform int rule4;
        uniform int rule5;
        
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
    
        float f(float size, float n, float distortion, float amplitude){
          return 
            size * (distortion + n * (1.0 - 2.0 * distortion)) * (1.0 - amplitude);
        }
  
        void main() {
          vec4 texelColor = texture2D(tDiffuse, vUv);
          vec3 color = texelColor.rgb;
      
          int x1 = int(f(width, vUv.x, distortion1, amplitude1));
          int x2 = int(f(width, vUv.x, distortion2, amplitude2) + time);
          int y1 = int(f(height, vUv.y, distortion3, amplitude3));
          int y2 = int(f(height, vUv.y, distortion4, amplitude4) + time);

          float car = time / mod(float(x1 % y1), float(y2 ^ rule0 ^ x2 * rule3));
          float cag = time / mod(float(x1 % y1), float(y2 ^ rule1 ^ x2 * rule4));
          float cab = time / mod(float(x1 % y1), float(y2 ^ rule2 ^ x2 * rule5));

          vec3 magnitude = vec3(magnitudeRed, magnitudeGreen, magnitudeBlue);
          vec3 threshold = magnitude - vec3(car, cag, cab);

          color = mod(color * 255.0, threshold) - magnitude / 2.0;
          color *= 255.0;
          color -= mod(vec3(256.0), magnitude) - 1.0;
      
          gl_FragColor = vec4(color, 1.0);
        }
    `,
  });
};

export const makeSa1Pass = (n) => new ShaderPass(makeSa1(n));
