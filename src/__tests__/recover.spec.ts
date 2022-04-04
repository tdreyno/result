/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { recover } from "../recover"

describe("recover", () => {
  test("Ok", () => {
    expect(recover(() => err(null), ok(null)).ok).toBeTruthy()
  })

  test("Err", () => {
    const r = recover(i => ok(i * 2), err(5))
    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toBe(10)
    }
  })
})
