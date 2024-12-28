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
    <button
      onclick={() => {
        setTheme(Theme.Light);
        isDarkMode = false;
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }}
      class={isDarkMode ? '' : 'active'}
    >
      <LightIcon />
      <span class="visible-hidden">Change to light mode</span>
    </button>
    <button
      onclick={() => {
        setTheme(Theme.Dark);
        isDarkMode = true;
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
      }}
      class={isDarkMode ? 'active' : ''}
    >
      <DarkIcon />
      <span class="visible-hidden">Change to dark mode</span>
    </button>
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

  .nav-link {
    color: var(--surface-text-color);
    background-color: var(--surface-color);
    padding: 8px;
  }

  .dark-light-mode-container {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    gap: 8px;
    z-index: 20;
    width: fit-content;
    justify-self: end;
    align-self: center;
  }

  button {
    border: 1px solid var(--logo-color);
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
