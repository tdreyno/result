import { Result } from "./result"

export const unwrap = <E, V>(
  result: Result<E, V>,
  withDefault?: (e: E) => V,
): V => {
  if (result.ok) {
    return result.value
  }

  if (withDefault) {
    return withDefault(result.error)
  }

  throw new Error("Tried to unwrap Err Result")
}
