<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let thoughts = data.thoughts;
</script>

<section>
  <h1>Thoughts</h1>
  {#if thoughts.length < 1}
    <div class="empty-container">
        <p class="empty">Currently thinking...</p>
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

  .empty {
    background-color: var(--surface-color-primary);
    color: var(--text-color-primary);
    padding: 8px;
    width: fit-content;
    border: 4px solid #3a8964;
    transform: rotate(-2deg);
  }
</style>
