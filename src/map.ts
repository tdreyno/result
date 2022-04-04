import { Result, err, ok } from "./result"

import { fromPromise } from "./fromPromise"

export const map = <E, V, V2>(
  fn: (a: V) => V2,
  result: Result<E, V>,
): Result<E, V2> => (result.ok ? ok(fn(result.value)) : result)

export const mapPromise = <E, V, V2>(
  fn: (a: V) => Promise<V2>,
  result: Result<E, V>,
): Promise<Result<E, V2>> =>
  result.ok ? fromPromise(fn(result.value)) : Promise.resolve(result)

export const mapError = <E, V, E2>(
  fn: (e: E) => E2,
  result: Result<E, V>,
): Result<E2, V> => (result.ok ? result : err(fn(result.error)))
