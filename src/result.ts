/* eslint-disable @typescript-eslint/no-unused-vars */
class Ok_<V, E> {
  constructor(public value: V) {}

  map<V2>(fn: (a: V) => V2): Result<E, V2> {
    return Ok(fn(this.value))
  }

  tap(fn: (a: V) => void): Result<E, V> {
    fn(this.value)

    return Ok(this.value)
  }

  getOrElse(_a: V): V {
    return this.value
  }

  mapError(_fn: (e: E) => unknown): Result<E, V> {
    return Ok(this.value)
  }

  tapError(_fn: (e: E) => void): Result<E, V> {
    return Ok(this.value)
  }

  chain<E2, V2>(fn: (a: V) => Result<E2, V2>): Result<E | E2, V2> {
    return fn(this.value)
  }

  recover<E2, V2>(_fn: (a: E) => Result<E2, V2>): Result<E2, V | V2> {
    return Ok(this.value)
  }

  fold<R>(okFn: (a: V) => R, _errFn: (e: R) => R): R {
    return okFn(this.value)
  }
}

export const Ok = <V, E = unknown>(v: V): Result<E, V> => new Ok_<V, E>(v)
export type Ok<V, E> = Ok_<V, E>
export const isOk = <V, E>(r: Result<E, V>): r is Ok_<V, E> => r instanceof Ok_

class Err_<E, V> {
  constructor(public error: E) {}

  map<V2>(_fn: (a: V) => V2): Result<E, V2> {
    return Err(this.error)
  }

  tap(_fn: (a: V) => void): Result<E, V> {
    return Err(this.error)
  }

  getOrElse(a: V): V {
    return a
  }

  mapError<E2>(fn: (a: E) => E2): Result<E2, V> {
    return Err(fn(this.error))
  }

  tapError(fn: (error: E) => void): Result<E, V> {
    fn(this.error)

    return Err(this.error)
  }

  chain<E2, V2>(_fn: (a: V) => Result<E2, V2>): Result<E | E2, V2> {
    return Err(this.error)
  }

  recover<E2, V2>(fn: (a: E) => Result<E2, V2>): Result<E2, V | V2> {
    return fn(this.error)
  }

  fold<R>(_okFn: (a: V) => R, errFn: (e: E) => R): R {
    return errFn(this.error)
  }
}

export const Err = <E, V = unknown>(e: E): Result<E, V> => new Err_<E, V>(e)
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

export const attempt = <V, E = unknown>(fn: () => V): Result<E, V> => {
  try {
    return Ok(fn())
  } catch (e) {
    return Err(e)
  }
}