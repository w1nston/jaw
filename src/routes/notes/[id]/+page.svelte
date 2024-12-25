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

  onMount(() => {
    setTimeout(() => {
      //@ts-ignore
      Prism.highlightAll();
    }, 0);
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/prism.css" />
</svelte:head>

<section>
  {@html note}
</section>

{@html '<script src="/prism.js"></script>'}

<style>
  section {
    padding: 0 20px 20px 20px;
  }
</style>
