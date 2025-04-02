<script>
  import { onMount } from "svelte";

  import * as THREE from "three";
  import { TexturePass } from "three/examples/jsm/postprocessing/TexturePass.js";
  import { CanvasCapture } from "canvas-capture";

  import { code, maybe } from "../utility/random";

  import { composePostprocessing } from "../utility/composer";
  import { saOriginal } from "../compositions/sa-original";
  import { sa4 } from "../compositions/sa4";

  let rendererCanvas;

  const snapshot = () => {
    CanvasCapture.takePNGSnapshot({ name: "SA" + code, dpi: 300 });
  };

  onMount(() => {
    const source = () => "http://localhost:3000/random-image";
    // const source = () => "https://picsum.photos/1024";

    new THREE.TextureLoader().load(source(), (texture) => {
      const texturePass = new TexturePass(texture);
      const fxChain = [texturePass];

      // sa4(fxChain);
      saOriginal(fxChain);

      if (rendererCanvas) {
        const composer = composePostprocessing(fxChain, rendererCanvas);
        composer.render();
      }
    });
  });
</script>

<canvas bind:this={rendererCanvas} on:click={snapshot}></canvas>

<style>
  canvas {
    width: 100vmin;
    height: 100vmin;
  }

  canvas:hover {
    cursor: pointer;
  }
</style>
