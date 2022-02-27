/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Ok, Err, isErr, isOk } from "../result"

describe("mapError", () => {
  test("Ok", () => {
    expect(isOk(Ok<null, number>(null).mapError(i => i * 2))).toBeTruthy()
  })

  test("Err", () => {
    const r = Err(5).mapError(i => i * 2)

    expect(isErr(r)).toBeTruthy()

    if (isErr(r)) {
      expect(r.error).toBe(10)
    }
  })
})
