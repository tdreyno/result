import { Ok, Err, isErr, isOk, combine, attempt } from "../result"

describe("Result", () => {
  describe("map", () => {
    test("Ok", () => {
      expect(Ok(5).map(i => i * 2).value).toBe(10)
    })

    test("Err", () => {
      expect(isErr(Err(null).map(i => i * 2))).toBeTruthy()
    })
  })

  describe("mapError", () => {
    test("Ok", () => {
      expect(isOk(Ok(null).mapError(i => i * 2))).toBeTruthy()
    })

    test("Err", () => {
      expect(Err(5).mapError(i => i * 2).error).toBe(10)
    })
  })

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

  describe("chain", () => {
    test("Ok", () => {
      const r = Ok(5).chain(i => Ok(i * 2))
      expect(isOk(r)).toBeTruthy()

      if (isOk(r)) {
        expect(r.value).toBe(10)
      }
    })

    test("Err", () => {
      expect(isErr(Err(null).chain(i => i * 2))).toBeTruthy()
    })
  })

  describe("recover", () => {
    test("Ok", () => {
      expect(isOk(Ok(null).chainError(() => Err(null)))).toBeTruthy()
    })

    test("Err", () => {
      const r = Err(5).chainError(i => Ok(i * 2))
      expect(isOk(r)).toBeTruthy()

      if (isOk(r)) {
        expect(r.value).toBe(10)
      }
    })
  })

  describe("combine", () => {
    test("empty", () => {
      const r = combine([])

      expect(isOk(r)).toBeTruthy()

      if (isOk(r)) {
        expect(r.value).toEqual([])
      }
    })

    test("oks", () => {
      const r = combine([Ok(1), Ok(2), Ok(3)])

      expect(isOk(r)).toBeTruthy()

      if (isOk(r)) {
        expect(r.value).toEqual([1, 2, 3])
      }
    })

    test("errs", () => {
      const r = combine([Ok(1), Err(5), Ok(3)])

      expect(isErr(r)).toBeTruthy()

      if (isErr(r)) {
        expect(r.error).toBe(5)
      }
    })
  })

  describe("attempt", () => {
    test("ok", () => {
      const r = attempt(() => 5)

      expect(isOk(r)).toBeTruthy()

      if (isOk(r)) {
        expect(r.value).toBe(5)
      }
    })

    test("err", () => {
      const r = attempt(() => {
        throw 5
      })

      expect(isErr(r)).toBeTruthy()

      if (isErr(r)) {
        expect(r.error).toBe(5)
      }
    })
  })

  describe("getOrElse", () => {
    test("ok", () => {
      expect(Ok(5).getOrElse(1)).toBe(5)
    })

    test("err", () => {
      expect(Err(null).getOrElse(5)).toBe(5)
    })
  })

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
})
