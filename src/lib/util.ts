/**
 * Paginates an array of data.
 */
export function paginate<T>(
  data: readonly T[],
  { page = 1, limit }: { page?: number; limit: number }
): readonly T[] {
  if (limit) {
    return data.slice((page - 1) * limit, page * limit)
  }

  return data
}
