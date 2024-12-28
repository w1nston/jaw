<script lang="ts">
  import sanitizeHtml from 'sanitize-html';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { initSyntaxHighlighting } from '$lib/adapters/syntax-highlighting/prismjs/syntaxUtils';

  let { data }: { data: PageData } = $props();
  let specificStuffDraft = $state('');

  async function initialize() {
    let content = '';

    if (data.specificStuffDraft.content instanceof Promise) {
      content = await data.specificStuffDraft.content;
    } else {
      content = data.specificStuffDraft.content;
    }

    specificStuffDraft = sanitizeHtml(content, {
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
    {@html specificStuffDraft}
</section>

<style>
  section {
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }
</style>
