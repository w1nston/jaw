<script lang="ts">
  import sanitizeHtml from 'sanitize-html';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  let { data }: { data: PageData } = $props();

  let note = sanitizeHtml(data.note.content, {
    allowedClasses: {
      code: ['language-*']
    }
  });

  function initSyntaxHighlighting(delay: number = 10) {
    setTimeout(() => {
        //@ts-ignore
        Prism.highlightAll();
    }, delay);
  }


  onMount(() => {
    initSyntaxHighlighting();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/prism.css" />
  <script src="/prism.js"></script>
</svelte:head>

<section>
  {@html note}
</section>

<style>
  section {
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }
</style>
