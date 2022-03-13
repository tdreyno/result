import { PartitionedResults } from "./result"

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
