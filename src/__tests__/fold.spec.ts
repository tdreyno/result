/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { fold } from "../fold"

describe("fold", () => {
  test("ok", () => {
    const okFn = jest.fn()
    const errFn = jest.fn()

    const r = fold(
      v => {
        okFn(v)

        return v * 2
      },
      e => {
        errFn(e)

        return 0
      },
      ok(5),
    )

    expect(okFn).toHaveBeenCalledWith(5)
    expect(errFn).not.toHaveBeenCalledWith()
    expect(r).toBe(10)
  })

  test("err", () => {
    const okFn = jest.fn()
    const errFn = jest.fn()

    const r = fold(
      v => {
        okFn(v)

        return 0
      },
      e => {
        errFn(e)

        return e * 2
      },
      err(5),
    )

    expect(okFn).not.toHaveBeenCalledWith()
    expect(errFn).toHaveBeenCalledWith(5)
    expect(r).toBe(10)
  })
})
