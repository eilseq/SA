import { WebGLRenderer } from "three";

const renderer = new WebGLRenderer({
  preserveDrawingBuffer: true,
});

export const setContainer = (container) => {
  container.appendChild(renderer.domElement);
};

export const setSize = (width, height) => {
  renderer.setSize(width, height);
};

export const getRenderer = () => renderer;
