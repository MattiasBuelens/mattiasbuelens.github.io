import type { PageServerLoad } from './$types'
import { posts } from '$lib/data/posts'
import { paginate } from '$lib/util'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params }) => {
  const page = params.page ? parseInt(params.page, 10) : 1
  const limit = 10

  const postsForPage = paginate(posts, { limit, page })

  // if page doesn't exist, 404
  if (postsForPage.length === 0 && page > 1) {
    throw error(404, 'Page not found')
  }

  return {
    posts: postsForPage,
    page,
    limit
  }
}
