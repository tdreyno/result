import { Ok, Err } from "../result"

describe("fold", () => {
  test("ok", () => {
    const okFn = jest.fn()
    const errFn = jest.fn()

    const r = Ok(5).fold(
      v => {
        okFn(v)

        return v * 2
      },
      e => {
        errFn(e)

        return 0
      },
    )

    expect(okFn).toHaveBeenCalledWith(5)
    expect(errFn).not.toHaveBeenCalledWith()
    expect(r).toBe(10)
  })

  test("err", () => {
    const okFn = jest.fn()
    const errFn = jest.fn()

    const r = Err(5).fold(
      v => {
        okFn(v)

        return 0
      },
      e => {
        errFn(e)

        return e * 2
      },
    )

    expect(okFn).not.toHaveBeenCalledWith()
    expect(errFn).toHaveBeenCalledWith(5)
    expect(r).toBe(10)
  })
})
