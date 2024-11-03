import type { PageLoad } from './$types'
import type { Component } from 'svelte'

/**
 * Dynamically loads the svelte component for the post (only possible in +page.js)
 * and pass on the data from +page.server.ts
 */
export const load: PageLoad = async ({ data }) => {
  // load the markdown file based on slug
  const component: { default: Component } = data.post.isIndexFile
    ? // vite requires relative paths and explicit file extensions for dynamic imports
      // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      await import(`../../../../posts/${data.post.slug}/index.md`)
    : await import(`../../../../posts/${data.post.slug}.md`)

  return {
    post: data.post,
    component: component.default,
    layout: {
      fullWidth: true
    }
  }
}
