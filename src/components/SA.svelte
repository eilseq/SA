<script>
  import { onMount } from "svelte";

  import * as THREE from "three";
  import { FloatType, WebGLRenderer } from "three";
  import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
  import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";
  import { CanvasCapture } from "canvas-capture";

  import { HSLtoColor } from "../utility/conversion";
  import { code, random } from "../utility/random";
  import { addCompression } from "../shaders/compression";
  import { addCrt } from "../shaders/crt";
  import { addHue } from "../shaders/hue";
  import { addWave } from "../shaders/wave";

  let rendererCanvas;

  const snapshot = () => {
    CanvasCapture.takePNGSnapshot({ name: "SA" + code, dpi: 300 });
  };

  let render = () => {};

  onMount(() => {
    //4K portrait
    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
      type: FloatType,
      canvas: rendererCanvas,
    });
    renderer.setSize(4096, 4096, false);
    CanvasCapture.init(renderer.domElement);

    const composer = new EffectComposer(renderer);
    const composePostprocessing = (passes) => {
      composer.reset();
      for (const pass of passes) {
        composer.addPass(pass);
      }
      return composer;
    };

    const source = () => "http://localhost:3000/random-image";

    const makeWavePreset1 = () => {
      return {
        mode: 0,
        amplitude1: random(),
        amplitude2: random(),
        phase1: random(),
        phase2: random(),
        freq1: random() * 10,
        freq2: random() * 10,
      };
    };

    const makeWavePreset2 = () => {
      const amp = random() * 0.1;
      const phase = random();
      return {
        mode: 1,
        amplitude1: amp,
        amplitude2: amp,
        phase1: phase * 0.01 * random(),
        phase2: phase * 0.01 * random(),
        freq1: 10,
        freq2: 10,
      };
    };

    const makeWavePreset3 = () => {
      const amp = random() * 0.1;
      const phase = random();
      return {
        mode: 2,
        amplitude1: amp,
        amplitude2: amp,
        phase1: phase * 0.01 * random(),
        phase2: phase * 0.01 * random(),
        freq1: 2,
        freq2: 10,
      };
    };

    const makeCrtPreset1 = () => {
      return {
        scale: { value: random() },
        time: { value: random() },
      };
    };

    new THREE.TextureLoader().load(source(), (texture) => {
      const fxChain = [new TexturePass(texture)];

      const { updateUniforms: updateHue } = addHue(fxChain);

      composePostprocessing(fxChain);
      composer.render();
      const texturePass = new TexturePass(texture);

      render = () => {
        const fxChain = [texturePass];

        updateHue({
          color: HSLtoColor(random(), random(), random()),
        });

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset1());
        }

        addCrt(fxChain, makeCrtPreset1());

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset1());
        }
        addWave(fxChain, makeWavePreset2());

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset2());
        }

        if (random() > 0.35) {
          addCrt(fxChain, makeCrtPreset1());
        }

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset1());
        }

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset2());
        }

        if (random() > 0.35) {
          addWave(fxChain, makeWavePreset3());
        }

        if (random() > 0.35) {
          addCompression(fxChain);
        }

        composePostprocessing(fxChain);

        composer.render();
      };
    });

    setTimeout(() => render(), 2000);
  });
</script>

<canvas bind:this={rendererCanvas} on:click={snapshot}></canvas>

<style>
  canvas {
    width: 30vmin;
    height: 30vmin;
  }

  canvas:hover {
    cursor: pointer;
  }
</style>
