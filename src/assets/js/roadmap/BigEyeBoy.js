import Roadmap from './Roadmap'

import _get from 'lodash/get'
import _findLastIndex from 'lodash/findLastIndex'

export default class BigEyeBoy extends Roadmap {
  constructor (_options) {
    super()

    const options = {
      results: [],
      rows: 6,
      cols: 9,
      bigRoadMatrix: []
    }

    for (const key in options) {
      this[key] = _options[key] || options[key]
    }

    this.traverseBigRoadScheme()
  }

  reset () {
    /**
     * Define initial values
     */
    this.previousCoordinates = [0, 0]
    this.previousColor = null
    this.index = 0

    this.matrix = Array.from({ length: this.rows }, () => {
      return Array.from({ length: this.cols }, () => 0)
    })
  }

  traverseBigRoadScheme () {
    this.reset()

    /**
     * https://www.livecasinocomparer.com/live-casino-games/live-baccarat/baccarat-roadmaps
     * The Starting point corresponds to cell B2 on the Big Road scorecard.
     * If B2 is empty, the starting point is C1
     */

    const B2 = [1, 1]
    const C1 = [0, 2]

    const b2HasValue = this.bigRoadMatrix[B2[0]][B2[1]]
    const c1HasValue = this.bigRoadMatrix[C1[0]][C1[1]]

    if (!c1HasValue && !b2HasValue) {
      return
    }

    const initialCoordinates = b2HasValue ? B2 : C1

    while (true) {
      const col = this.bigRoadMatrix[initialCoordinates[0]][initialCoordinates[1]]
      const isFirstRow = initialCoordinates[0] === 0

      const nextCoordinates = this.getBigRoadCoordinatesByIndex(col.index + 1)

      /**
       * If first row, check the lenghts of previous 2 columns
       */
      if (isFirstRow) {
        const prevColALength = this.getColumnLength(initialCoordinates[1] - 1)
        const prevColBLength = this.getColumnLength(initialCoordinates[1] - 2)

        this.push(prevColALength === prevColBLength ? 'red' : 'blue', {
          big_road_index: col.index
        })

        if (nextCoordinates) {
          initialCoordinates[0] = nextCoordinates[0]
          initialCoordinates[1] = nextCoordinates[1]
          continue
        } else {
          break
        }
      }

      /**
       * If non first row, check the left col and the upper left column
       */
      const leftColLower = this.bigRoadMatrix[initialCoordinates[0]][initialCoordinates[1] - 1]
      const leftColUpper = this.bigRoadMatrix[initialCoordinates[0] - 1][initialCoordinates[1] - 1]

      const leftColLowerIdentity = this.indentityDictionary[_get(leftColLower, 'value')]
      const leftColUpperIdentity = this.indentityDictionary[_get(leftColUpper, 'value')]

      const isMatch = [
        /**
         * if they are both empty
         */
        leftColLower === leftColUpper,

        /**
         * If they have the same identity
         */
        leftColLowerIdentity === leftColUpperIdentity
      ].some(Boolean)

      this.push(isMatch ? 'red' : 'blue', {
        big_road_index: col.index
      })

      if (nextCoordinates) {
        initialCoordinates[0] = nextCoordinates[0]
        initialCoordinates[1] = nextCoordinates[1]
        continue
      } else {
        break
      }
    }

    console.log(this.matrix)
  }

  getBigRoadCoordinatesByIndex (index) {
    for (let rowIdx = 0; rowIdx < this.bigRoadMatrix.length; rowIdx++) {
      const row = this.bigRoadMatrix[rowIdx]

      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const col = row[colIdx]
        if (col.index === index) {
          return [rowIdx, colIdx]
        }
      }
    }

    return false
  }

  getColumnLength (columnIdx) {
    const coordinates = [0, columnIdx]
    const column = this.bigRoadMatrix[coordinates[0]][coordinates[1]]
    const rootIdentity = this.indentityDictionary[column.value]

    /**
     * If initial column is empty, return 0
     */
    if (!column) {
      return 0
    }

    /**
     * Starting with one which includes the root node
     */
    let traversalCount = 1
    let lastIndex = column.index
    let isEnd = false

    while (!isEnd) {
      /**
       * Check bottom if have the same identity and is the next index
       */
      const bottomCol = _get(this.bigRoadMatrix, [coordinates[0] + 1, coordinates[1]], {})
      if (
        bottomCol.index === lastIndex + 1 &&
        rootIdentity === this.indentityDictionary[bottomCol.value]
      ) {
        lastIndex = bottomCol.index
        traversalCount++
        coordinates[0]++
        continue
      }

      /**
       * Check right if have the same identity and is the next index
       */
      const rightCol = _get(this.bigRoadMatrix, [coordinates[0], coordinates[1] + 1], {})
      if (
        rightCol.index === lastIndex + 1 &&
        rootIdentity === this.indentityDictionary[rightCol.value]
      ) {
        lastIndex = rightCol.index
        traversalCount++
        coordinates[1]++
        continue
      }

      isEnd = true
    }

    return traversalCount
  }

  getNextCoordinates (color) {
    const [prevRow, prevColumn] = this.previousCoordinates

    /**
     * If initial data
     */
    if (this.previousColor === null) {
      return [0, 0]
    }

    /**
     * If same identity
     */
    if (this.previousColor === color) {
      const bottomPosition = _get(this.matrix, [prevRow + 1, prevColumn])

      /**
       * If bottom position is empty
       */
      if (bottomPosition === 0) {
        return [prevRow + 1, prevColumn]
      }

      /**
       * Else, just increment column to the right
       */
      return [prevRow, prevColumn + 1]
    }

    /**
     * Fallback. If not the same identity
     */
    const lastColIdx = _findLastIndex(this.matrix[0], Boolean)
    const initialPosition = _get(this.matrix, [0, lastColIdx])

    if (initialPosition === 0) {
      return [0, lastColIdx]
    }

    /**
     * Else, just increment column to the right
     */
    return [0, lastColIdx + 1]
  }

  push (color, _options = {}) {
    if (!['red', 'blue'].includes(color)) {
      return console.warn(`${color} is not a valid color.`)
    }

    const options = Object.assign({
      big_road_index: undefined
    }, _options)

    const [row, column] = this.getNextCoordinates(color)

    this.previousCoordinates = [row, column]
    this.previousColor = color

    this.matrix[row][column] = {
      value: color,
      index: this.index++,
      big_road_index: options.big_road_index
    }

    if (this.hasFullRow) {
      this.matrix = this.truncateFirstColumn()
      this.previousCoordinates = [row, column - 1]
    }
  }
}
