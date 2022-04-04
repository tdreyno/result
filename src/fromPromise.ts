import { Result, err, ok } from "./result"

export const fromPromise = async <V, E = unknown>(
  promiseOrFn: Promise<V> | (() => Promise<V>),
): Promise<Result<E, V>> =>
  (promiseOrFn instanceof Promise ? promiseOrFn : promiseOrFn())
    .then(v => ok<V, E>(v))
    .catch((e: E) => err<E, V>(e))
