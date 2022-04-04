import { Result, ok } from "./result"

import { map } from "./map"

export const combine = <E, V>(items: Array<Result<E, V>>): Result<E, V[]> =>
  items.reduce((acc: Result<E, V[]>, r: Result<E, V>) => {
    if (!acc.ok) {
      return acc
    }

    if (!r.ok) {
      return r as unknown as Result<E, V[]> // Force V type
    }

    return map(i => [...i, r.value], acc) as Result<E, V[]>
  }, ok<V[], E>([]))
