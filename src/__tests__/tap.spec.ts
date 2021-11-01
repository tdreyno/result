import { Ok, Err } from "../result"

describe("tap", () => {
  test("Ok", () => {
    const fn = jest.fn()

    Ok(5).tap(fn)

    expect(fn).toHaveBeenCalledWith(5)
  })

  test("Err", () => {
    const fn = jest.fn()

    Err(null).tap(fn)

    expect(fn).not.toHaveBeenCalledWith()
  })
})
