import Roadmap from './Roadmap'

import _get from 'lodash/get'

export default class BreadPlate extends Roadmap {
  constructor (_options) {
    super()

    const options = {
      results: [],
      rows: 6,
      cols: 9
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

  getNextCoordinates () {
    const [prevRow, prevColumn] = this.previousCoordinates

    /**
     * If initial data
     */
    if (this.previousIdentity === null) {
      return [0, 0]
    }

    /**
     * Check if the next row is still available
     */
    const initialPosition = _get(this.matrix, [prevRow + 1, prevColumn])

    if (initialPosition === 0) {
      return [prevRow + 1, prevColumn]
    }

    /**
     * Else, just move to the next column on the first row
     */
    return [0, prevColumn + 1]
  }

  push (key) {
    const identity = this.indentityDictionary[key]

    if (!identity) {
      return console.warn(`${key} is not a valid key.`)
    }

    const [row, column] = this.getNextCoordinates(identity)

    this.previousCoordinates = [row, column]
    this.previousIdentity = identity

    this.matrix[row][column] = {
      value: key,
      index: this.index++
    }

    if (this.hasFullRow) {
      this.matrix = this.truncateFirstColumn()
      this.previousCoordinates = [row, column - 1]
    }
  }
}
