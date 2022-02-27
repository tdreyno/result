/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Ok, Err } from "../result"

describe("upwrap", () => {
  test("ok", () => {
    const r = Ok(5).unwrap()
    expect(r).toBe(5)
  })

  test("err", () => {
    expect(() => Err(5).unwrap()).toThrow()
  })

  test("err with default", () => {
    expect(Err(5).unwrap(e => e * 2)).toBe(10)
  })
})
