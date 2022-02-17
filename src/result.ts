/* eslint-disable @typescript-eslint/no-unused-vars */
class Ok_<V, E> {
  constructor(public value: V) {}

  map<V2>(fn: (a: V) => V2): Result<E, V2> {
    return Ok(fn(this.value))
  }

  mapPromise<V2>(fn: (a: V) => Promise<V2>): Promise<Result<E, V2>> {
    return fromPromise(fn(this.value))
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

  chainPromise<E2, V2>(
    fn: (a: V) => Promise<Result<E2, V2>>,
  ): Promise<Result<E | E2, V2>> {
    return fn(this.value)
  }

  recover(_fn: (a: E) => Result<E, V>): Result<E, V> {
    return Ok(this.value)
  }

  recoverPromise(_fn: (a: E) => Promise<Result<E, V>>): Promise<Result<E, V>> {
    return Promise.resolve(Ok(this.value))
  }

  fold<R>(okFn: (a: V) => R, _errFn: (e: E) => R): R {
    return okFn(this.value)
  }

  unwrap(_withDefault?: (e: E) => V): V {
    return this.value
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

  mapPromise<V2>(_fn: (a: V) => Promise<V2>): Promise<Result<E, V2>> {
    return Promise.resolve(Err(this.error))
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

  mapChain<E2, V2>(
    _fn: (a: V) => Promise<Result<E2, V2>>,
  ): Promise<Result<E | E2, V2>> {
    return Promise.resolve(Err(this.error))
  }

  recover(fn: (a: E) => Result<E, V>): Result<E, V> {
    return fn(this.error)
  }

  recoverPromise(fn: (a: E) => Promise<Result<E, V>>): Promise<Result<E, V>> {
    return fn(this.error)
  }

  fold<R>(_okFn: (a: V) => R, errFn: (e: E) => R): R {
    return errFn(this.error)
  }

  unwrap(_withDefault?: (e: E) => V): V {
    if (_withDefault) {
      return _withDefault(this.error)
    }

    throw new Error(`Cannot unwrap Err result.`)
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

export const partition = <E, V>(items: Array<Result<E, V>>) =>
  items.reduce(
    (acc, r) => {
      if (isOk(r)) {
        acc.items.push(r.value)
      } else {
        acc.errors.push(r.error)
      }

      return acc
    },
    { items: [] as V[], errors: [] as E[] },
  )

export const attempt = <V, E = unknown>(fn: () => V): Result<E, V> => {
  try {
    return Ok(fn())
  } catch (e) {
    return Err(e as E)
  }
}

export const fromPromise = async <V, E = unknown>(
  promiseOrFn: Promise<V> | (() => Promise<V>),
): Promise<Result<E, V>> =>
  (promiseOrFn instanceof Promise ? promiseOrFn : promiseOrFn())
    .then(v => Ok<V, E>(v))
    .catch((e: E) => Err(e))
