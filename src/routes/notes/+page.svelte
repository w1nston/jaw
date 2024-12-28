<script lang="ts">
  import type { PageData } from './$types';
  import RSSIcon from '$lib/rss/RSSIcon.svelte';
  import ContentSurface from '$lib/components/ContentSurface.svelte';

  let { data }: { data: PageData } = $props();
  let notes = data.notes;
</script>

<section>
  <h1 class="heading">
    Notes
    <a class="rss-icon-container" href="/notes/feed" download="jaw-notes-rss.xml">
      <RSSIcon />
      <p class="visible-hidden">Link to RSS Feed for "Notes"</p>
    </a>
  </h1>
  {#each notes as note, index}
    <a href={`/notes/${note.id}`}>
      <ContentSurface {index} title={note.title} abstract={note.abstract} tags={note.tags} />
    </a>
  {/each}
</section>

<style>
  a {
    text-decoration: none;
    max-width: 344px;
  }

  .rss-icon-container {
    display: flex;
    align-self: center;
  }

  .heading {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  h1 {
    margin: unset;
  }


  section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }

</style>
