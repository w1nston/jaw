<script lang="ts">
  import sanitizeHtml from 'sanitize-html';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { initSyntaxHighlighting } from '$lib/adapters/syntax-highlighting/prismjs/syntaxUtils.server';

  let { data }: { data: PageData } = $props();

  let stuffs = $state('');
  
  async function initialize() {
    let content = '';

    if (data.stuffs.content instanceof Promise) {
      content = await data.stuffs.content;
    }

    stuffs = sanitizeHtml(content, {
      allowedClasses: {
        code: ['language-*']
      }
    });

  }

  onMount(async () => {
    await initialize();
    initSyntaxHighlighting();
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/prism.css" />
  <script src="/prism.js"></script>
</svelte:head>

<section>
  {@html stuffs}
</section>

<style>
  section {
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }
</style>
