import { Result } from "./result"

export const recover = <E, V>(
  fn: (a: E) => Result<E, V>,
  result: Result<E, V>,
): Result<E, V> => (result.ok ? result : fn(result.error))

export const recoverPromise = <E, V>(
  fn: (a: E) => Promise<Result<E, V>>,
  result: Result<E, V>,
): Promise<Result<E, V>> =>
  result.ok ? Promise.resolve(result) : fn(result.error)
