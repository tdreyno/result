/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { fromPromise } from "../fromPromise"

describe("toResult", () => {
  test("ok", async () => {
    const r = await fromPromise(Promise.resolve(5))

    expect(r.ok).toBeTruthy()

    if (r.ok) {
      expect(r.value).toBe(5)
    }
  })

  test("err", async () => {
    const r = await fromPromise(Promise.reject(5))

    expect(!r.ok).toBeTruthy()

    if (!r.ok) {
      expect(r.error).toBe(5)
    }
  })
})
