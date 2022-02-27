/* eslint-disable tree-shaking/no-side-effects-in-initialization */
import { Ok, Err } from "../result"

describe("tapError", () => {
  test("Ok", () => {
    const fn = jest.fn()

    Ok(5).tapError(fn)

    expect(fn).not.toHaveBeenCalledWith()
  })

  test("Err", () => {
    const fn = jest.fn()

    Err(5).tapError(fn)

    expect(fn).toHaveBeenCalledWith(5)
  })
})
