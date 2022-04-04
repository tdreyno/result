/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { attempt } from "../attempt"

describe("attempt", () => {
  test("ok", () => {
    const r = attempt(() => 5)

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toBe(5)
    }
  })

  test("err", () => {
    const r = attempt(() => {
      throw 5
    })

    expect(!r.ok).toBeTruthy()

    if (!r.ok) {
      expect(r.error).toBe(5)
    }
  })
})
