/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { tap } from "../tap"

describe("tap", () => {
  test("Ok", () => {
    const fn = jest.fn()

    tap(fn, ok(5))

    expect(fn).toHaveBeenCalledWith(5)
  })

  test("Err", () => {
    const fn = jest.fn()

    tap(fn, err(null))

    expect(fn).not.toHaveBeenCalledWith()
  })
})
