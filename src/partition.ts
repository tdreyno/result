import { Result } from "./result"

export type PartitionedResults<V, E> = { items: V[]; errors: E[] }

export const partition = <E, V>(items: Array<Result<E, V>>) =>
  items.reduce(
    (acc, r) => {
      if (r.ok) {
        acc.items.push(r.value)
      } else {
        acc.errors.push(r.error)
      }

      return acc
    },
    { items: [], errors: [] } as PartitionedResults<V, E>,
  )

export const emptyPartitionedResult = <V, E>(): PartitionedResults<V, E> => ({
  items: [],
  errors: [],
})

export const flattenPartitionedResults = <V, E>(
  results: Array<PartitionedResults<V, E>>,
): PartitionedResults<V, E> =>
  results.reduce((acc, { items, errors }) => {
    acc.items = acc.items.concat(items)
    acc.errors = acc.errors.concat(errors)
    return acc
  }, emptyPartitionedResult<V, E>())
