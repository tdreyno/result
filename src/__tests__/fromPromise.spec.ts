/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { isErr, isOk, fromPromise } from "../result"

describe("toResult", () => {
  test("ok", async () => {
    const r = await fromPromise(Promise.resolve(5))

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toBe(5)
    }
  })

  test("err", async () => {
    const r = await fromPromise(Promise.reject(5))

    expect(isErr(r)).toBeTruthy()

    if (isErr(r)) {
      expect(r.error).toBe(5)
    }
  })
})
