import { Result } from "./result"

export const chain = <E, V, E2, V2>(
  fn: (a: V) => Result<E2, V2>,
  result: Result<E, V>,
): Result<E | E2, V2> => (result.ok ? fn(result.value) : result)

export const chainPromise = <E, V, E2, V2>(
  fn: (a: V) => Promise<Result<E2, V2>>,
  result: Result<E, V>,
): Promise<Result<E | E2, V2>> =>
  result.ok ? fn(result.value) : Promise.resolve(result)
