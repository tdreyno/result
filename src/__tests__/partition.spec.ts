import { Ok, Err, partition } from "../result"

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

  test(".partition Ok then mixed values", () => {
    const { items, errors } = Ok([1, Err(2), 3]).partition()

    expect(items).toEqual([1, 3])
    expect(errors).toEqual([2])
  })

  test(".partition Ok then mixed results", () => {
    const { items, errors } = Ok([Ok(1), Err(2), Ok(3)]).partition()

    expect(items).toEqual([1, 3])
    expect(errors).toEqual([2])
  })

  test(".partition single", () => {
    const { items, errors } = Ok(1).partition()

    expect(items).toEqual([1])
    expect(errors).toHaveLength(0)
  })

  test(".partition Err", () => {
    const { items, errors } = Err(1).partition()

    expect(items).toHaveLength(0)
    expect(errors).toEqual([1])
  })
})
