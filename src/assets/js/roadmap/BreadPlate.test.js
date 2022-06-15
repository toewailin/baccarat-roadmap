import { describe, expect, test } from 'vitest'

import BreadPlate from './BreadPlate'

describe('Should parse results correctly', () => {
  test('Should push correctly', () => {
    const breadplate = new BreadPlate({
      results: 'pbp'.split(''),
      rows: 6,
      cols: 9
    })

    expect(breadplate.roadmap).toEqual([
      ['p', 0, 0, 0, 0, 0, 0, 0, 0],
      ['b', 0, 0, 0, 0, 0, 0, 0, 0],
      ['p', 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  })

  test('Should go to next column', () => {
    const breadplate = new BreadPlate({
      results: 'pbpppbbp'.split(''),
      rows: 6,
      cols: 9
    })

    expect(breadplate.roadmap).toEqual([
      ['p', 'b', 0, 0, 0, 0, 0, 0, 0],
      ['b', 'p', 0, 0, 0, 0, 0, 0, 0],
      ['p', 0, 0, 0, 0, 0, 0, 0, 0],
      ['p', 0, 0, 0, 0, 0, 0, 0, 0],
      ['p', 0, 0, 0, 0, 0, 0, 0, 0],
      ['b', 0, 0, 0, 0, 0, 0, 0, 0]
    ])
  })

  test('Should truncate column', () => {
    const breadplate = new BreadPlate({
      results: 'pbpppbbpppbbbppbbbbppbbbppbbbbpppppppbbbppbbbpppb'.split(''),
      rows: 6,
      cols: 9
    })

    expect(breadplate.roadmap).toEqual([
      ['b', 'b', 'b', 'p', 'p', 'p', 'b', 'b', 0],
      ['p', 'p', 'p', 'p', 'p', 'b', 'b', 0, 0],
      ['p', 'p', 'p', 'b', 'p', 'b', 'b', 0, 0],
      ['p', 'b', 'b', 'b', 'p', 'b', 'p', 0, 0],
      ['b', 'b', 'b', 'b', 'p', 'p', 'p', 0, 0],
      ['b', 'b', 'b', 'b', 'p', 'p', 'p', 0, 0]
    ])
  })
})
