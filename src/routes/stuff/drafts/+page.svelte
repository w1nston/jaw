<script lang="ts">
  import ContentSurface from '$lib/components/ContentSurface.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let drafts = data.drafts;
</script>

<section>
  <h1>Stuff in progress</h1>
  {#if drafts.length < 1}
    <p>Nothing here...</p>
  {:else}
    {#each drafts as draft, index}
      <a href={`/stuff/drafts/${draft.id}`}>
        <ContentSurface title={draft.title} abstract={draft.abstract} tags={draft.tags} {index} />
      </a>
    {/each}
  {/if}
</section>

<style>
  h1 {
    margin: unset;
  }

  a {
    text-decoration: none;
    max-width: 344px;
  }

  section {
    display: flex;
    flex-direction: column;
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
    gap: var(--spacing-lg);
  }
</style>
