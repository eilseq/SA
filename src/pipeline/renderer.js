import { CanvasCapture } from "canvas-capture";
import { FloatType, WebGLRenderer } from "three";
// import { animate } from "./composer";

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
  type: FloatType,
});

export const setContainer = (container) => {
  container.appendChild(renderer.domElement);
};

export const setSize = (width, height) => {
  renderer.setSize(width, height);
};

export const setPixelRatio = (ratio) => {
  renderer.setPixelRatio(ratio);
};

export const getRenderer = () => renderer;

CanvasCapture.init(renderer.domElement);
CanvasCapture.bindKeyToPNGSnapshot("s");

// animate();
