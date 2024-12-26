<script>
  import '../styles/baseline.css';
  import '../styles/globals.css';
  import '../styles/vars.css';
  import '../styles/colors.css';
  import NavBar from '../features/navigation/NavBar.svelte';

  let { children } = $props();
</script>

<NavBar />

{@render children()}
