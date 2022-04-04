import { Result } from "./result"

export const fold = <E, V, R>(
  okFn: (a: V) => R,
  errFn: (e: E) => R,
  result: Result<E, V>,
): R => (result.ok ? okFn(result.value) : errFn(result.error))
