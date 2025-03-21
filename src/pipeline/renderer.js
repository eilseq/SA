import { WebGLRenderer } from "three";

export const makeRenderer = () => {
  const renderer = new WebGLRenderer({
    preserveDrawingBuffer: true,
  });

  return renderer;
};
