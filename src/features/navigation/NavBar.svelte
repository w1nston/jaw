<script>
  import Logo from './Logo.svelte';
  import DarkIcon from './DarkIcon.svelte';
  import LightIcon from './LightIcon.svelte';
</script>

<section class="stack">
  <nav class="nav">
    <a href="/">
      <Logo />
    </a>
    <a class="nav-link" href="/thoughts">Thoughts</a>
    <a class="nav-link" href="/notes">Notes</a>
  </nav>

  <section class="dark-light-mode-container">
    <button class="active"><LightIcon /></button>
    <button><DarkIcon /></button>
  </section>
</section>

<style>
  .nav {
    display: flex;
    align-items: center;
    position: relative;
    padding: 20px;
    z-index: 20;
    gap: 16px;
  }

  .nav :nth-child(odd):not(:first-child) {
    transform: rotate(2deg);
  }

  .nav :nth-child(even):not(:first-child) {
    transform: rotate(-2deg);
  }

  .nav > a {
    padding: 8px;
  }

  .dark-light-mode-container {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    gap: 8px;
    z-index: 10;
  }

  button {
    border: 1px solid #0042ff;
    background: none;
    cursor: pointer;
    border-radius: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    opacity: 0.4;
  }

  .active {
    opacity: 1;
  }

  .stack {
    display: grid;
  }

  .stack > * {
    grid-area: 1 / -1;
  }
</style>
