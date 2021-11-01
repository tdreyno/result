import { Ok, Err, isOk } from "../result"

describe("recover", () => {
  test("Ok", () => {
    expect(isOk(Ok(null).recover(() => Err(null)))).toBeTruthy()
  })

  test("Err", () => {
    const r = Err(5).recover(i => Ok(i * 2))
    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toBe(10)
    }
  })
})
