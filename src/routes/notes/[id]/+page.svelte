<script lang="ts">
  import sanitizeHtml from 'sanitize-html';
  import type { PageData } from './$types';
  import { onMount } from 'svelte';

  let { data }: { data: PageData } = $props();

  let note = sanitizeHtml(data.note.content);

  onMount(() => {
    // @ts-ignore
    Prism.highlightAll();

    console.log('note?', note);
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
    padding: 0 20px 20px 20px;
  }
</style>
