import { ShaderMaterial } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
    varying vec2 vUv;

    void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float time;
    uniform float distortionx;
    uniform float distortiony;
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    float rand(float n) {
        return fract(sin(n) * 43758.5453123);
    }

    void main() {
        vec2 uv = vUv;

        // Add distortion to UV coordinates
        uv += sin(vec2(distortionx, distortiony));
        vec4 texel = texture2D(tDiffuse, uv);

        // Output the final color
        gl_FragColor = texel;
    }
`;

const uniforms = {
  tDiffuse: { value: null },
  distortionx: { value: 0 },
  distortiony: { value: 0.5 },
};

export const material = new ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

export const pass = new ShaderPass({
  uniforms,
  vertexShader,
  fragmentShader,
});
