import * as THREE from "three";

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
    uniform sampler2D uTexture;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
        vec4 texel = texture2D(uTexture, vUv);
        texel.xyz += texel.xyz/uColor;
        gl_FragColor = texel;
    }
`;

const makeUniforms = () => ({
  tDiffuse: { value: null },
  uColor: {
    value: new THREE.Color(
      `hsl(${random() * 360}deg, ${random() * 100}%, ${random() * 70}%)`
    ),
  },
});

export const makeHue = () => {
  const pass = new ShaderPass({
    uniforms: makeUniforms(),
    vertexShader,
    fragmentShader,
  });

  // setInterval(() => {
  //   pass.uniforms.uColor.value.setHSL(random(), random(), random());
  // }, 1000);

  return pass;
};
