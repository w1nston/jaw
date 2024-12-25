<script>
  import Logo from './Logo.svelte';
</script>

<nav class="nav">
  <a href="/">
    <Logo />
  </a>
  <a class="nav-link" href="/thoughts">Thoughts</a>
  <a class="nav-link" href="/notes">Notes</a>
</nav>

<style>
  .nav {
    display: flex;
    align-items: center;
    position: relative;
    padding: 20px;
    z-index: 10;
    gap: 16px;
  }

  .nav-link {
    color: var(--text-color-primary);
    background-color: var(--surface-color-primary);
    padding: 8px;
  }

  .nav :nth-child(odd):not(:first-child) {
    transform: rotate(2deg);
  }

  .nav :nth-child(even):not(:first-child) {
    transform: rotate(-2deg);
  }
</style>
