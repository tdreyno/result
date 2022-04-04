/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { mapError } from "../map"

describe("mapError", () => {
  test("Ok", () => {
    const resultA = ok<null, number>(null)
    const resultB = mapError(i => i * 2, resultA)

    expect(resultB.ok).toBeTruthy()
  })

  test("Err", () => {
    const r = mapError(i => i * 2, err(5))

    expect(r.ok).toBeFalsy()

    if (!r.ok) {
      expect(r.error).toBe(10)
    }
  })
})
