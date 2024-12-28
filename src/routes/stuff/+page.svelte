<script lang="ts">
  import ContentSurface from '$lib/components/ContentSurface.svelte';
  import RssIcon from '$lib/rss/RSSIcon.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let stuff = data.stuff;
</script>

<section>
  <h1 class="heading">
    Stuff
    <a class="rss-icon-container" href="/stuff/feed" download="jaw-stuff-rss.xml">
      <RssIcon />
      <p class="visible-hidden">Link to RSS Feed for "Stuff"</p>
    </a>
  </h1>
  {#if stuff.length < 1}
    <div class="empty-container">
      <p class="empty-stuff">Nothing here yet...</p>
    </div>
  {:else}
    {#each stuff as specificStuff, index}
      <a href={`/stuff/${specificStuff.id}`}>
        <ContentSurface
          {index}
          title={specificStuff.title}
          abstract={specificStuff.abstract}
          tags={specificStuff.tags}
        />
      </a>
    {/each}
  {/if}
</section>

<style>
  .heading {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin: unset;
  }

  section {
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }

  a {
    text-decoration: none;
    max-width: 344px;
  }

  .rss-icon-container {
    display: flex;
    align-self: center;
  }
</style>
