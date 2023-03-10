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
    uniform float scale;
    uniform vec2 resolution;
    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
        vec2 p = vUv * resolution.xy / 10.0;

        vec4 color = texture2D(tDiffuse, vUv);

        float x = floor(gl_FragCoord.x / 5.0);
        float y = floor(gl_FragCoord.y / 5.0);

        float glitch = random(vec2(x, y) + scale) / 20.0;

        if (glitch > 0.9) {
            gl_FragColor = vec4(glitch, glitch, glitch, 1.0);
        } else if (glitch > 0.8) {
            gl_FragColor = vec4(1.0, glitch, glitch, 1.0);
        } else if (glitch > 0.7) {
            gl_FragColor = vec4(glitch, 1.0, glitch, 1.0);
        } else if (glitch > 0.6) {
            gl_FragColor = vec4(glitch, glitch, 1.0, 1.0);
        } else {
            gl_FragColor = color;
        }
    }
`;

const uniforms = {
  tDiffuse: { value: null },
  scale: { value: 0.6 },
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
