import { Result, err, ok } from "./result"

export const attempt = <V, E = unknown>(fn: () => V): Result<E, V> => {
  try {
    return ok(fn())
  } catch (e) {
    return err(e as E)
  }
}
