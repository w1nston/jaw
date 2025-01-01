<script lang="ts">
  import Logo from './Logo.svelte';
  import DarkIcon from './DarkIcon.svelte';
  import LightIcon from './LightIcon.svelte';
  import { onDestroy, onMount } from 'svelte';

  const THEME_STORAGE_KEY = 'theme';

  let isDarkMode = $state(false);

  type ITheme = {
    Dark: 'dark';
    Light: 'light';
  };

  let Theme: ITheme = {
    Dark: 'dark',
    Light: 'light'
  };

  function setTheme(theme: 'dark' | 'light') {
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  function handleThemeChange(event: MediaQueryListEvent) {
    isDarkMode = event.matches;
  }

  onMount(() => {
    let savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      isDarkMode = savedTheme === 'dark';

      document.body.classList.toggle(isDarkMode ? 'dark-theme' : 'light-theme');
    } else {
      let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      mediaQuery.addEventListener('change', handleThemeChange);

      onDestroy(() => {
        mediaQuery.removeEventListener('change', handleThemeChange);
      });

      let prefersDark = mediaQuery.matches;
      isDarkMode = prefersDark;
    }
  });
</script>

<section class="stack">
  <nav class="nav">
    <a href="/">
      <Logo />
      <span class="visible-hidden">Go to home route</span>
    </a>
    <a class="nav-link" href="/stuff">Stuff</a>
    <a class="nav-link" href="/notes">Notes</a>
  </nav>

  <section class="dark-light-mode-container">
    <article class="toggle-area">
      <button
        name="test"
        onclick={() => {
          setTheme(isDarkMode ? Theme.Light : Theme.Dark);
          isDarkMode = !isDarkMode;

          if (isDarkMode) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
          } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
          }
        }}
        class="theme-btn"
      >
        {#if isDarkMode}
          <DarkIcon />
          <span class="visible-hidden">Change to light mode</span>
        {:else}
          <LightIcon />
          <span class="visible-hidden">Change to dark mode</span>
        {/if}
      </button>
    </article>
  </section>
</section>

<style>
  :root {
    --animation-delay: 200ms;
  }

  .nav {
    display: flex;
    align-items: center;
    position: relative;
    padding: var(--spacing-lg);
    z-index: 20;
    gap: var(--spacing-md);
  }

  .nav :nth-child(odd):not(:first-child) {
    transform: rotate(2deg);
  }

  .nav :nth-child(even):not(:first-child) {
    transform: rotate(-2deg);
  }

  .nav-link {
    color: var(--surface-text-color);
    background-color: var(--surface-color);
    padding: var(--spacing-sm);
  }

  .dark-light-mode-container {
    display: flex;
    justify-content: flex-start;
    padding: var(--spacing-lg);
    gap: var(--spacing-sm);
    z-index: 20;
    width: fit-content;
    justify-self: end;
    align-self: center;
  }

  .toggle-area {
    display: flex;
    color: var(--surface-text-color);
    justify-content: flex-end;
    cursor: pointer;
  }

  button {
    border: var(--normal) solid var(--logo-color);
    background: none;
    cursor: pointer;
    border-radius: 24px;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  @keyframes slide-spin {
    from {
      transform: none;
    }
    to {
      transform: translateX(-8px) rotate(420deg);
    }
  }

  .theme-btn:focus {
    animation: slide-spin var(--animation-delay);
  }

  .theme-btn:active {
    animation: none;
  }

  .stack {
    display: grid;
  }

  .stack > * {
    grid-area: 1 / -1;
  }
</style>
