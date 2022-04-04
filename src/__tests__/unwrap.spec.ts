/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { unwrap } from "../unwrap"

describe("upwrap", () => {
  test("ok", () => {
    const r = unwrap(ok(5))
    expect(r).toBe(5)
  })

  test("err", () => {
    expect(() => unwrap(err(5))).toThrow()
  })

  test("err with default", () => {
    expect(unwrap(err(5), e => e * 2)).toBe(10)
  })
})
