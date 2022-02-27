/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Ok, Err, isErr, isOk, combine } from "../result"

describe("combine", () => {
  test("empty", () => {
    const r = combine([])

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toEqual([])
    }
  })

  test("oks", () => {
    const r = combine([Ok(1), Ok(2), Ok(3)])

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toEqual([1, 2, 3])
    }
  })

  test("errs", () => {
    const r = combine([Ok(1), Err(5), Ok(3)])

    expect(isErr(r)).toBeTruthy()

    if (isErr(r)) {
      expect(r.error).toBe(5)
    }
  })
})
