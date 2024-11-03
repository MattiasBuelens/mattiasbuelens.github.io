import { posts } from '$lib/data/posts'

export async function load(): Promise<{ posts: unknown[] }> {
  return {
    posts: posts.slice(0, 5)
  }
}
