<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let notes = data.notes;
</script>

<section>
  <h1>Notes</h1>
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

  article {
    padding: 12px 20px;
    box-shadow: 2px 2px 12px #333;
    background-color: var(--surface-color);
    border: 4px solid var(--surface-border);
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

  h1 {
    margin: unset;
  }

  h2 {
    margin: unset;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px 20px 20px;
  }

  .tag-container {
    display: flex;
    gap: 8px;
  }

  .tag-container > span {
    font-weight: 700;
    padding: 4px;
  }
</style>
