import Roadmap from './Roadmap'

import _findLastIndex from 'lodash/findLastIndex'
import _get from 'lodash/get'

export default class BigRoad extends Roadmap {
  constructor (_options) {
    super()

    /**
     * Define options
     */
    const options = {
      results: [],
      rows: 6,
      cols: 26
    }

    for (const key in options) {
      this[key] = _options[key] || options[key]
    }

    /**
     * Define initial values
     */
    this.previousCoordinates = [0, 0]
    this.previousIdentity = null
    this.index = 0

    this.matrix = Array.from({ length: this.rows }, () => {
      return Array.from({ length: this.cols }, () => 0)
    })

    /**
     * Push results
     */
    this.results.forEach(this.push.bind(this))
  }

  getNextCoordinate (identity) {
    const [prevRow, prevColumn] = this.previousCoordinates

    /**
     * If initial data
     */
    if (this.previousIdentity === null) {
      return [0, 0]
    }

    /**
     * If same identity
     */
    if (this.previousIdentity === identity) {
      const bottomPosition = _get(this.matrix, [prevRow + 1, prevColumn])

      /**
       * Bottom position is empty
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

  push (key) {
    const identity = this.indentityDictionary[key]

    if (!identity) {
      return console.warn(`${key} is not a valid key.`)
    }

    const isTie = this.tieIdentities.includes(key)

    const [nextRow, nextCol] = this.getNextCoordinate(identity)
    const [prevRow, prevCol] = JSON.parse(JSON.stringify(this.previousCoordinates))

    const prevColValue = _get(this.matrix[prevRow][prevCol], 'value')
    const isAnotherTie = isTie && this.tieIdentities.includes(prevColValue)

    /**
     * If previous col is tie and the current identity
     * is also tie
     */
    if (isAnotherTie) {
      return this.matrix[prevRow][prevCol].tie_count++
    }

    this.previousCoordinates = [nextRow, nextCol]
    this.previousIdentity = identity

    this.matrix[nextRow][nextCol] = {
      value: key,
      index: this.index++,
      tie_count: isTie ? 1 : 0
    }

    if (this.hasFullRow) {
      this.matrix = this.truncateFirstColumn()
      this.previousCoordinates = [nextRow, nextCol - 1]
    }
  }
}
