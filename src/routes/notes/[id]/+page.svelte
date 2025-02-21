<script lang="ts">
  import sanitizeHtml from 'sanitize-html';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { initSyntaxHighlighting } from '$lib/adapters/syntax-highlighting/prismjs/syntaxUtils';

  let { data }: { data: PageData } = $props();

  let note = $state('');

  async function initialize() {
    let content = '';

    if (data.note.content instanceof Promise) {
      content = await data.note.content;
    } else {
      content = data.note.content;
    }

    note = sanitizeHtml(content, {
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
  {@html note}
</section>

<style>
  section {
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }


  @media (min-width: 640px) {
    section {
      max-width: 60vw;
      margin: 0 auto;
    }
  }
</style>
