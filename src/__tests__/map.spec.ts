import { Ok, Err, isErr, isOk } from "../result"

describe("map", () => {
  test("Ok", () => {
    const r = Ok(5).map(i => i * 2)

    expect(isOk(r)).toBeTruthy()

    if (isOk(r)) {
      expect(r.value).toBe(10)
    }
  })

  test("Err", () => {
    expect(isErr(Err<null, number>(null).map(i => i * 2))).toBeTruthy()
  })
})
