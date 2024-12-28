<script lang="ts">
  import type { PageData } from './$types';
  import RSSIcon from '$lib/rss/RSSIcon.svelte';

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
      <article class={(index + 1) % 2 === 0 ? 'even' : 'odd'}>
        <h2>{note.title}</h2>
        <p>{note.abstract}</p>
        <div class="tag-container">
          {#each note.tags as tag}
            <span class="note-tag">{tag}</span>
          {/each}
        </div>
      </article>
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

  article {
    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: 2px 2px 12px #333;
    background-color: var(--surface-color);
    border: var(--thick) solid var(--surface-border);
    color: var(--surface-text-color);
  }

  .note-tag {
    background-color: var(--surface-text-color);
    color: var(--surface-color);
  }

  .even {
    transform: rotate(2deg);
  }

  .odd {
    transform: rotate(-2deg);
  }

  .heading {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  h1 {
    margin: unset;
  }

  h2 {
    margin: unset;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
  }

  .tag-container {
    display: flex;
    gap: var(--spacing-sm);
  }

  .tag-container > span {
    font-weight: 700;
    padding: 4px;
  }
</style>
