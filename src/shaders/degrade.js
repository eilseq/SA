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
    uniform float degrade;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    float rand(float n) {
        return fract(sin(n) * 43758.5453123);
    }

    void main() {
        vec4 texel = texture2D(tDiffuse, vUv);

        if (rand(texel.r + texel.g + texel.b) < degrade
        ) {
            discard;
        }

        gl_FragColor = texel;
    }
`;

const uniforms = {
  tDiffuse: { value: null },
  degrade: { value: 0.6 },
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
