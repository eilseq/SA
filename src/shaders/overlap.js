import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const vertexShader = `
    varying vec2 vUv;

    void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// const fragmentShader = `
//     uniform sampler2D tDiffuse;
//     uniform float time;
//     varying vec2 vUv;

//     float rand(vec2 co) {
//         return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
//     }

//     void main() {
//         vec2 p = vUv;
//         vec4 color = texture2D(tDiffuse, p);

//         float displacement = sin(time * 10.0 + p.x * 100.0);
//         float xOffset = rand(vec2(p.y, time * 0.2)) * displacement;
//         float yOffset = rand(vec2(p.x, time * 0.3)) * displacement;

//         vec2 displacedUV = vec2(p.x + time, p.y + time);
//         vec4 displacedColor = texture2D(tDiffuse, displacedUV);

//         // gl_FragColor = displacedColor;
//         gl_FragColor = mix(color, displacedColor, 0.5);

//     }
// `;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float time;
varying vec2 vUv;

void main() {
    vec2 p = vUv;
    
    // Calculate the offset based on time and UV coordinates
    float offset = sin(time * 5.0 + p.y * 1.0) * 0.02;
    
    // Sample colors from the texture
    vec4 currentColor = texture2D(tDiffuse, p);
    vec4 previousColor = texture2D(tDiffuse, vec2(p.x - offset, p.y));
    
    // Mix the current color with the previous color
    vec4 finalColor = mix(currentColor, previousColor, 0.5);
    
    gl_FragColor = finalColor;
}

`;

const uniforms = {
  time: { value: 0 },
  tDiffuse: { value: null },
};

setInterval(() => {
  uniforms.time.value += 0.001;
}, 100);

export const makeOverlapPass = () =>
  new ShaderPass({
    uniforms,
    vertexShader,
    fragmentShader,
  });
