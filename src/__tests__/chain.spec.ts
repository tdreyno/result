/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { chain } from "../chain"

describe("chain", () => {
  test("Ok", () => {
    const r = chain(i => ok(i * 2), ok(5))

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toBe(10)
    }
  })

  test("Err", () => {
    const result = err<null, number>(null)
    expect(chain(i => ok(i * 2), result).ok).toBeFalsy()
  })
})
