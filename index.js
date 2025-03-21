import * as THREE from "three";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { random } from "./src/utility/random";

import { makeRenderer } from "./src/pipeline/renderer";
import { makeComposer } from "./src/pipeline/composer";

import { makeWave } from "./src/shaders/wave";
import { makeMovingWave } from "./src/shaders/movingWave";
import { makeDiff } from "./src/shaders/diff";

const source = () => `https://picsum.photos/4096/4096`;

const loadTexture = () =>
  new Promise((res, rej) => {
    new THREE.TextureLoader().load(source(), res, () => {}, rej);
  });

const overlay = () => `overlays/video${Math.floor(random() * 2)}.mp4`;
const makeOverlayPass = () => {
  const video = document.createElement("video");
  video.loop = true;
  video.muted = true;

  const videoTexture = new THREE.VideoTexture(video);
  const overlayPass = makeDiff();
  overlayPass.uniforms.tInput.value = videoTexture;
  return { overlayPass, video };
};

const renderer = makeRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); //4K portrait
document.body.appendChild(renderer.domElement);

const { composePostprocessing } = makeComposer(renderer);
const texturePass = new TexturePass();

const { overlayPass, video } = makeOverlayPass();
const fxs = [texturePass, overlayPass, makeWave(), makeMovingWave()];
composePostprocessing(fxs);

const updateTexture = async () => {
  video.pause();
  // if (random() > 0.5) {
  video.src = overlay();
  video.playbackRate = 2;
  // } else {
  // video.src = "overlays/dark.mp4";
  // }
  video.play();

  texturePass.map = null;
  const texture = await loadTexture();
  texturePass.map = texture;
};
updateTexture();
