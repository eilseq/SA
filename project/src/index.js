import { CanvasCapture } from "canvas-capture";

import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";

import { makeSa1Pass } from "./sa1";
import { makeWave } from "./wave";
import { makeWave2 } from "./wave2";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});
document.body.appendChild(renderer.domElement);

function onLoad(texture) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 1;

  const composer = new EffectComposer(renderer);

  const texturePass = new TexturePass(texture);
  composer.addPass(texturePass);

  composer.addPass(makeWave());
  for (let index = 0; index < $fx.getParam("iterations"); index++) {
    composer.addPass(makeSa1Pass(index));
  }
  composer.addPass(makeWave2());

  CanvasCapture.init(renderer.domElement);
  CanvasCapture.bindKeyToPNGSnapshot("s");

  composer.render(scene, camera);
  const animate = () => {
    requestAnimationFrame(animate);
    composer.render(scene, camera);
    CanvasCapture.checkHotkeys();
  };
  animate();
}

const texture = new THREE.TextureLoader().load(
  $fx.getParam("source") + ".jpg",
  () => onLoad(texture)
);

// THREE.CanvasTexture();

// const video = document.createElement("video");
// video.src = "input.mp4";
// video.muted = true;
// video.loop = true;
// video.play();
// const texture = new THREE.VideoTexture(video);
// onLoad(texture);

// in make uniform

// let i = 0;
// const a = [random() * 250, random() * 250, random() * 250, random() * 250];
// setInterval(() => {
//   uniforms.magnitudeRed.value = a[i % 4] * c;
//   i++;
// }, 429);

// let k = 0;
// const aa = [
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
//   random() * 250,
// ];
// setInterval(() => {
//   uniforms.T.value = aa[k % aa.length] * c;
//   k++;
// }, 429 / 8);

//outside make uniform
// let c = 2;
// setInterval(() => {
//   c = random() * 5;
// }, 429 * 2);

// setInterval(() => {
//   video.currentTime = random() * video.duration;
//   video.width = window.innerWidth * random() * 20;
// }, 429);
