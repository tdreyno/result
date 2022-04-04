import { Result } from "./result"

export const tap = <E, V>(
  fn: (a: V) => void,
  result: Result<E, V>,
): Result<E, V> => {
  if (result.ok) {
    fn(result.value)
  }

  return result
}

export const tapError = <E, V>(
  fn: (e: E) => void,
  result: Result<E, V>,
): Result<E, V> => {
  if (!result.ok) {
    fn(result.error)
  }

  return result
}
