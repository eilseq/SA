<script>
  import SA from "./components/SA.svelte";
</script>

<main>
  <SA />
</main>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    width: 100vw;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
