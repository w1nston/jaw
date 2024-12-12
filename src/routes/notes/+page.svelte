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
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </article>
    </a>
  {/each}
</section>

<style>
  a {
    text-decoration: none;
    color: #eaff76;
  }

  article {
    background-color: #3d9970;
    padding: 12px 20px;
  }

  .even {
    transform: rotate(2deg);
  }

  .odd {
    transform: rotate(-2deg);
  }

  h2 {
    margin: unset;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .tag-container {
    display: flex;
    gap: 8px;
  }

  .tag {
    background-color: #eaff76;
    font-weight: 700;
    color: #3d9970;
    padding: 4px;
  }
</style>
