import * as THREE from "three";

export const glitchMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(3000, 3000) },
    tDiffuse: { value: null },
  },

  vertexShader: `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

  fragmentShader: `
        uniform float time;
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

            float glitch = random(vec2(x, y) + time) / 20.0;

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
    `,
});
