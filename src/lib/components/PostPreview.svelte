<script>
  import Card from './Card.svelte'
  import ArrowRightIcon from './ArrowRightIcon.svelte'

  /** @type {{post: any, eyebrow?: import('svelte').Snippet,}} */
  let { post, eyebrow: _eyebrow } = $props()
</script>

<Card href={`/post/${post.slug}`} data-sveltekit-prefetch>
  {#snippet eyebrow()}
    {@render _eyebrow?.()}
  {/snippet}
  {#snippet title()}
    {post.title}
  {/snippet}
  {#snippet description()}
    <div class="prose dark:prose-invert">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html post.preview.html}
    </div>
  {/snippet}
  {#snippet actions()}
    <div>
      <div class="flex items-center text-teal-500">
        <span class="text-sm font-medium">Read</span>
        <ArrowRightIcon class="ml-1 size-4" />
      </div>
    </div>
  {/snippet}
</Card>

<style>
  .prose > :global(p) {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
