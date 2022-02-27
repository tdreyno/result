/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Ok, Err, isErr, isOk } from "../result"

describe("chain", () => {
  test("Ok", () => {
    const r = Ok(5).chain(i => Ok(i * 2))

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toBe(10)
    }
  })

  test("Err", () => {
    expect(isErr(Err<null, number>(null).chain(i => Ok(i * 2)))).toBeTruthy()
  })
})
