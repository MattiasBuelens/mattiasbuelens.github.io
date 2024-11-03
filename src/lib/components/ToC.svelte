<script>
  import { browser } from '$app/environment'
  import { onMount } from 'svelte'
  import Card from './Card.svelte'

  /** @type {{post: any}} */
  let { post } = $props()

  let elements = []
  let headings = $state(post.headings)

  onMount(() => {
    updateHeadings()
    setActiveHeading()
  })

  let activeHeadingIndex = $state(0)
  let activeHeading = $derived(headings[activeHeadingIndex])

  function updateHeadings() {
    headings = post.headings

    if (browser) {
      elements = headings.map((heading) => {
        return document.getElementById(heading.id)
      })
    }
  }

  function setActiveHeading() {
    const scrollY = window.scrollY
    activeHeadingIndex =
      elements.findIndex((element) => element.offsetTop + element.clientHeight > scrollY) - 1

    if (activeHeadingIndex < 0) {
      const pageHeight = document.body.scrollHeight
      const scrollProgress = (scrollY + window.innerHeight) / pageHeight

      if (scrollProgress > 0.5) {
        activeHeadingIndex = headings.length - 1
      } else {
        activeHeadingIndex = 0
      }
    }
  }
</script>

<svelte:window onscroll={setActiveHeading} />

<Card>
  {#snippet description()}
    <ul class="flex flex-col gap-2">
      {#each headings as heading}
        <li
          class="heading border-teal-500 pl-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-100"
          class:active={activeHeading === heading}
          style={`--depth: ${
            // consider h1 and h2 at the same depth, as h1 will only be used for page title
            Math.max(0, heading.depth - 1)
          }`}
        >
          <a href={`#${heading.id}`}>{heading.value}</a>
        </li>
      {/each}
    </ul>
  {/snippet}
</Card>

<style lang="postcss">
  .heading {
    padding-left: calc(var(--depth, 0) * 0.35rem);
  }

  .active {
    @apply -ml-[2px] border-l-2 font-medium text-slate-900;
  }

  /* can't use dark: modifier in @apply */
  :global(.dark) .active {
    @apply text-slate-100;
  }
</style>
