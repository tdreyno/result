/* eslint-disable tree-shaking/no-side-effects-in-initialization */

import { err, ok } from "../result"

import { partition } from "../partition"

describe("partition", () => {
  test("empty", () => {
    const { items, errors } = partition([])

    expect(items).toHaveLength(0)
    expect(errors).toHaveLength(0)
  })

  test("oks", () => {
    const { items, errors } = partition([ok(1), ok(2), ok(3)])

    expect(items).toEqual([1, 2, 3])
    expect(errors).toHaveLength(0)
  })

  test("errs", () => {
    const { items, errors } = partition([err(1), err(2), err(3)])

    expect(items).toHaveLength(0)
    expect(errors).toEqual([1, 2, 3])
  })

  test("mixed", () => {
    const { items, errors } = partition([ok(1), err(2), ok(3)])

    expect(items).toEqual([1, 3])
    expect(errors).toEqual([2])
  })
})
