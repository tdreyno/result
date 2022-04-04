/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { map } from "../map"

describe("map", () => {
  test("Ok", () => {
    const r = map(i => i * 2, ok(5))

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toBe(10)
    }
  })

  test("Err", () => {
    const result = err<null, number>(null)
    expect(map(i => i * 2, result).ok).toBeFalsy()
  })
})
