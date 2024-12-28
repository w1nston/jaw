<script lang="ts">
  let { title, abstract, tags, index } = $props();
</script>

<article class={(index + 1) % 2 === 0 ? 'even' : 'odd'}>
  <h2>{title}</h2>
  <p>{abstract}</p>
  <div class="tag-container">
    {#each tags as tag}
      <span class="tag">{tag}</span>
    {/each}
  </div>
</article>

<style>
  article {
    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: 2px 2px 12px #333;
    background-color: var(--surface-color);
    border: var(--thick) solid var(--surface-border);
    color: var(--surface-text-color);
  }

  .tag {
    background-color: var(--surface-text-color);
    color: var(--surface-color);
    font-weight: 700;
    padding: var(--spacing-sm);
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

  .tag-container {
    display: flex;
    gap: var(--spacing-sm);
  }
</style>
