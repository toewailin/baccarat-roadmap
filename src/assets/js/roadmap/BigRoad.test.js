import { describe, expect, test } from 'vitest'

import BigRoad from './BigRoad'

describe('Should parse results correctly', () => {
  test('Should push correctly', () => {
    const bigroad = new BigRoad({
      results: 'pbp'.split(''),
      rows: 4,
      cols: 4
    })

    expect(bigroad.roadmap).toEqual([
      ['p', 'b', 'p', 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ])
  })

  test('Should go to next column', () => {
    const bigroad = new BigRoad({
      results: 'pbpppbbp'.split(''),
      rows: 4,
      cols: 4
    })

    expect(bigroad.roadmap).toEqual([
      ['p', 'b', 'p', 0],
      ['p', 'b', 0, 0],
      ['p', 0, 0, 0],
      [0, 0, 0, 0]
    ])
  })

  test('Should truncate column', () => {
    const bigroad = new BigRoad({
      results: 'pbpppbbpppbbbppbbbbppbbbppbbbbpppppppbbbppbbbpppb'.split(''),
      rows: 4,
      cols: 4
    })

    expect(bigroad.roadmap).toEqual([
      ['b', 'p', 'b', 0],
      ['b', 'p', 0, 0],
      ['b', 'p', 0, 0],
      ['p', 0, 0, 0]
    ])
  })

  test('Should continue last mark (1)', () => {
    const bigroad = new BigRoad({
      results: 'ppppp'.split(''),
      rows: 4,
      cols: 4
    })

    expect(bigroad.roadmap).toEqual([
      ['p', 0, 0, 0],
      ['p', 0, 0, 0],
      ['p', 0, 0, 0],
      ['p', 'p', 0, 0]
    ])
  })

  test('Should continue last mark (2)', () => {
    const bigroad = new BigRoad({
      results: 'pppppbbbbb'.split(''),
      rows: 4,
      cols: 4
    })

    expect(bigroad.roadmap).toEqual([
      ['p', 'b', 0, 0],
      ['p', 'b', 0, 0],
      ['p', 'b', 'b', 0],
      ['p', 'p', 'b', 0]
    ])
  })
})
