import { Ok, Err, partition, Result } from "../result"

describe("partition", () => {
  test("empty", () => {
    const { items, errors } = partition([])

    expect(items).toHaveLength(0)
    expect(errors).toHaveLength(0)
  })

  test("oks", () => {
    const { items, errors } = partition([Ok(1), Ok(2), Ok(3)])

    expect(items).toEqual([1, 2, 3])
    expect(errors).toHaveLength(0)
  })

  test("errs", () => {
    const { items, errors } = partition([Err(1), Err(2), Err(3)])

    expect(items).toHaveLength(0)
    expect(errors).toEqual([1, 2, 3])
  })

  test("mixed", () => {
    const { items, errors } = partition([Ok(1), Err(2), Ok(3)])

    expect(items).toEqual([1, 3])
    expect(errors).toEqual([2])
  })

  test(".partition Ok then mixed results", () => {
    const { items, errors } = Ok<Result<number, number>[], number>([
      Ok<number, number>(1),
      Err<number, number>(2),
      Ok<number, number>(3),
    ]).partition()

    expect(items).toEqual([1, 3])
    expect(errors).toEqual([2])
  })

  test(".partition single", () => {
    expect(() => Ok(1).partition()).toThrowError()
  })

  test(".partition Err", () => {
    const { items, errors } = Err(1).partition()

    expect(items).toHaveLength(0)
    expect(errors).toEqual([1])
  })
})
