<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let thoughts = data.thoughts;
</script>

<section>
  <h1>Thoughts</h1>
  {#if thoughts.length < 1}
    <div class="empty-container">
      <p class="empty-thoughts">Currently thinking...</p>
    </div>
  {:else}
    {#each thoughts as thought, index}
      <p>Todo...</p>
    {/each}
  {/if}
</section>

<style>
  section {
    padding: 0 20px 20px 20px;
  }

  h1 {
    margin: unset;
  }

  .empty-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
  }

  .empty-thoughts {
    background-color: var(--surface-color);
    color: var(--surface-text-color);
    border: 4px solid var(--surface-border);
    padding: 8px;
    width: fit-content;
    transform: rotate(-2deg);
  }
</style>
