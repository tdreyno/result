/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { isErr, isOk, attempt } from "../result"

describe("attempt", () => {
  test("ok", () => {
    const r = attempt(() => 5)

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toBe(5)
    }
  })

  test("err", () => {
    const r = attempt(() => {
      throw 5
    })

    expect(isErr(r)).toBeTruthy()

    if (isErr(r)) {
      expect(r.error).toBe(5)
    }
  })
})
