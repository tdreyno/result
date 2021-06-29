/* eslint-disable @typescript-eslint/no-unused-vars */
class Ok_<V, E> {
  constructor(public value: V) {}

  map<V2>(fn: (a: V) => V2): Ok_<V2, E> {
    return new Ok_(fn(this.value))
  }

  tap(fn: (a: V) => void): Ok_<V, E> {
    fn(this.value)

    return this
  }

  getOrElse(_a: V): V {
    return this.value
  }

  mapError(_fn: (e: E) => unknown): Ok_<V, E> {
    return this
  }

  tapError(_fn: (e: E) => void): Ok_<V, E> {
    return this
  }

  chain<E, V2>(fn: (a: V) => Result<E, V2>): Result<E, V2> {
    return fn(this.value)
  }

  chainError(_fn: (a: E) => unknown): Ok_<V, E> {
    return this
  }

  fold<R>(okFn: (a: V) => R, _errFn: (e: R) => R): R {
    return okFn(this.value)
  }
}

export const Ok = <V, E = any>(v: V) => new Ok_<V, E>(v)
export type Ok<V, E> = Ok_<V, E>
export const isOk = <V, E>(r: Result<E, V>): r is Ok_<V, E> => r instanceof Ok_

class Err_<E, V> {
  constructor(public error: E) {}

  map(_fn: (a: V) => unknown): Err_<E, V> {
    return this
  }

  tap(_fn: (a: V) => void): Err_<E, V> {
    return this
  }

  getOrElse(a: V): V {
    return a
  }

  mapError<E2>(fn: (a: E) => E2): Err_<E2, V> {
    return new Err_(fn(this.error))
  }

  tapError(fn: (error: E) => void): Err_<E, V> {
    fn(this.error)

    return this
  }

  chain(_fn: (a: V) => unknown): Err_<E, V> {
    return this
  }

  chainError<E2, V2>(fn: (a: E) => Result<E2, V2>): Result<E2, V2> {
    return fn(this.error)
  }

  fold<R>(_okFn: (a: V) => R, errFn: (e: E) => R): R {
    return errFn(this.error)
  }
}

export const Err = <E, V = any>(e: E) => new Err_<E, V>(e)
export type Err<E, V> = Err_<E, V>
export const isErr = <E, V>(r: Result<E, V>): r is Err_<E, V> =>
  r instanceof Err_

export type Result<E, V> = Ok_<V, E> | Err_<E, V>

export const combine = <E, V>(items: Array<Result<E, V>>) =>
  items.reduce((acc, r) => {
    if (isErr(acc)) {
      return acc
    }

    if (isErr(r)) {
      return r as unknown as Result<E, V[]> // Force V type
    }

    return acc.map(i => [...i, r.value])
  }, Ok([]) as Result<E, V[]>)

export const attempt = <V, E = any>(
  fn: (...args: any[]) => V,
): Result<E, V> => {
  try {
    return Ok(fn())
  } catch (e) {
    return Err(e)
  }
}
