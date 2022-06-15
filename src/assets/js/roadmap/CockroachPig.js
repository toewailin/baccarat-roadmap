import RoadmapUtilities from './RoadmapUtilities'

import _get from 'lodash/get'
import _findLastIndex from 'lodash/findLastIndex'
import _defaultsDeep from 'lodash/defaultsDeep'

export default class BigEyeBoy extends RoadmapUtilities {
  constructor (_options) {
    super()

    const options = _defaultsDeep(_options, {
      results: [],
      rows: 6,
      cols: 9,
      bigRoadMatrix: []
    })

    for (const key in options) {
      this[key] = options[key]
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
     * The Starting point corresponds to cell E2 on the Big Road scorecard.
     * If E2 is empty, the starting point is F1
     */

    const E2 = [1, 4]
    const F1 = [0, 5]

    const c2HasValue = this.bigRoadMatrix[E2[0]][E2[1]]
    const d1HasValue = this.bigRoadMatrix[F1[0]][F1[1]]

    if (!c2HasValue && !d1HasValue) {
      return
    }

    let [initialRow, initialCol] = c2HasValue ? E2 : F1

    while (true) {
      const col = this.bigRoadMatrix[initialRow][initialCol]
      const isFirstRow = initialRow === 0

      const nextCoordinates = this.getBigRoadCoordinatesByIndex(col.index + 1)

      /**
       * If first row, check the lenghts of previous 2 columns
       */
      if (isFirstRow) {
        /**
         * Get the column exactly to the right
         */
        const prevColALength = this.getColumnLength(initialCol - 1)

        /**
         * Get the 3rd column to the right
         */
        const prevColBLength = this.getColumnLength(initialCol - 4)

        this.push(prevColALength === prevColBLength ? 'red' : 'blue', {
          big_road_index: col.index
        })

        if (nextCoordinates) {
          initialRow = nextCoordinates[0]
          initialCol = nextCoordinates[1]
          continue
        } else {
          break
        }
      }

      /**
       * If non first row, check the left col and the upper left column
       */
      const leftColLower = this.bigRoadMatrix[initialRow][initialCol - 3]
      const leftColUpper = this.bigRoadMatrix[initialRow - 1][initialCol - 3]

      const leftColLowerIdentity = this.identityDictionary[_get(leftColLower, 'value')]
      const leftColUpperIdentity = this.identityDictionary[_get(leftColUpper, 'value')]

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
        initialRow = nextCoordinates[0]
        initialCol = nextCoordinates[1]
        continue
      } else {
        break
      }
    }
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
    const rootIdentity = this.identityDictionary[column.value]

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
        rootIdentity === this.identityDictionary[bottomCol.value]
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
        rootIdentity === this.identityDictionary[rightCol.value]
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

    if (this._hasFullRow) {
      this.matrix = this._truncateFirstColumn()
      this.previousCoordinates = [row, column - 1]
    }
  }
}
