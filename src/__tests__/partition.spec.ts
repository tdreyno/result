import { Ok, Err, partition } from "../result"

describe("partition", () => {
  test("empty", () => {
    const r = partition([])

    expect(r.items).toHaveLength(0)
    expect(r.errors).toHaveLength(0)
  })

  test("oks", () => {
    const r = partition([Ok(1), Ok(2), Ok(3)])

    expect(r.items).toEqual([1, 2, 3])
    expect(r.errors).toHaveLength(0)
  })

  test("errs", () => {
    const r = partition([Err(1), Err(2), Err(3)])

    expect(r.items).toHaveLength(0)
    expect(r.errors).toEqual([1, 2, 3])
  })

  test("mixed", () => {
    const r = partition([Ok(1), Err(2), Ok(3)])

    expect(r.items).toEqual([1, 3])
    expect(r.errors).toEqual([2])
  })
})
