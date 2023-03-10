import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const defaultVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const makeShaderPass = ({ uniforms, vertexShader, fragmentShader }) => {
  const pass = new ShaderPass({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  const updateUniforms = (newUniforms) => {
    for (const key in newUniforms) {
      pass.uniforms[key] = { value: newUniforms[key] };
    }
  };

  return {
    pass,
    updateUniforms,
  };
};

export const addPass = (fxChain, initUniforms, uniforms, fragmentShader) => {
  const { pass, updateUniforms } = makeShaderPass({
    uniforms,
    vertexShader: defaultVertexShader,
    fragmentShader,
  });

  if (initUniforms) {
    updateUniforms(initUniforms);
  }

  fxChain.push(pass);

  return { updateUniforms };
};
