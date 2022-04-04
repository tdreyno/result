/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { tapError } from "../tap"

describe("tapError", () => {
  test("Ok", () => {
    const fn = jest.fn()

    tapError(fn, ok(5))

    expect(fn).not.toHaveBeenCalledWith()
  })

  test("Err", () => {
    const fn = jest.fn()

    tapError(fn, err(5))

    expect(fn).toHaveBeenCalledWith(5)
  })
})
