export interface Ok<V> {
  ok: true
  value: V
  error: undefined
}

export interface Err<E> {
  ok: false
  value: undefined
  error: E
}

export type Result<E, V> = Ok<V> | Err<E>

export const ok = <V, E = unknown>(value: V): Result<E, V> => ({
  ok: true,
  value,
  error: undefined,
})

export const err = <E, V = unknown>(error: E): Result<E, V> => ({
  ok: false,
  error,
  value: undefined,
})
