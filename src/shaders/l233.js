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
uniform float chaos;
uniform sampler2D tDiffuse;

uniform float angle;
uniform float sides;
uniform vec2 center;

varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 p = vUv * vec2(scale);
    vec2 iuv = floor(p);
    vec2 fuv = fract(p);

    vec2 offset = vec2(random(iuv), random(iuv));
    vec2 uv = (iuv + fuv + offset) / scale;
    
    gl_FragColor = texture2D(tDiffuse, uv);
}
`;

const makeUniforms = () => ({
  scale: { value: Math.floor(random() * 6 + 1) },
  tDiffuse: { value: null },
});

export const makeL233 = () =>
  new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });
