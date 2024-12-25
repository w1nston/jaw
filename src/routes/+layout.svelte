<script>
  import '../styles/baseline.css';
  import '../styles/globals.css';
  import '../styles/vars.css';
  import NavBar from '../features/navigation/views/NavBar.svelte';

  let { children } = $props();
</script>

<NavBar />

<div class="background-glass"></div>
{@render children()}

<style>
  .background-glass {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(8px);
    background-color: aliceblue;
  }
</style>
