import { Ok, Err } from "../result"

describe("getOrElse", () => {
  test("ok", () => {
    expect(Ok(5).getOrElse(1)).toBe(5)
  })

  test("err", () => {
    expect(Err(null).getOrElse(5)).toBe(5)
  })
})
