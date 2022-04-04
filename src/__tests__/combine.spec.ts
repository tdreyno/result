/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { combine } from "../combine"

describe("combine", () => {
  test("empty", () => {
    const r = combine([])

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toEqual([])
    }
  })

  test("oks", () => {
    const r = combine([ok(1), ok(2), ok(3)])

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toEqual([1, 2, 3])
    }
  })

  test("errs", () => {
    const r = combine([ok(1), err(5), ok(3)])

    expect(!r.ok).toBeTruthy()

    if (!r.ok) {
      expect(r.error).toBe(5)
    }
  })
})
