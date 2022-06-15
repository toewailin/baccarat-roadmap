import _defaultsDeep from 'lodash/defaultsDeep'
import BreadPlate from './BreadPlate'
import BigRoad from './BigRoad'
import BigEyeBoy from './BigEyeBoy'
import SmallRoad from './SmallRoad'
import CockroachPig from './CockroachPig'

function attachToContext (obj, ctx) {
  for (const key in obj) {
    ctx[key] = obj[key]
  }
}

export default class Roadmap {
  constructor (_options) {
    const options = _defaultsDeep(_options, {
      results: [],
      config: {
        breadplate: {
          show_options: false,
          rows: 6,
          cols: 9
        },
        bigroad: {
          show_options: false,
          rows: 6,
          cols: 26
        },
        bigeyeboy: {
          show_options: false,
          rows: 6,
          cols: 26
        },
        smallroad: {
          show_options: false,
          rows: 6,
          cols: 19
        },
        cockroachPig: {
          show_options: false,
          rows: 6,
          cols: 19
        }
      }
    })

    attachToContext(options, this)

    this.breadplate = new BreadPlate({
      results: this.results,
      rows: this.config.breadplate.rows,
      cols: this.config.breadplate.cols
    })

    this.bigroad = new BigRoad({
      results: this.results,
      rows: this.config.bigroad.rows,
      cols: this.config.bigroad.cols
    })

    this.bigeyeboy = new BigEyeBoy({
      bigRoadMatrix: this.bigroad.matrix,
      rows: this.config.bigeyeboy.rows,
      cols: this.config.bigeyeboy.cols
    })

    this.smallroad = new SmallRoad({
      bigRoadMatrix: this.bigroad.matrix,
      rows: this.config.smallroad.rows,
      cols: this.config.smallroad.cols
    })

    this.cockroachPig = new CockroachPig({
      bigRoadMatrix: this.bigroad.matrix,
      rows: this.config.cockroachPig.rows,
      cols: this.config.cockroachPig.cols
    })
  }

  push (key) {
    this.results.push(key)

    this.breadplate.push(key)

    this.bigroad.push(key)

    this.bigeyeboy.bigRoadMatrix = this.bigroad.matrix
    this.bigeyeboy.traverseBigRoadScheme()

    this.smallroad.bigRoadMatrix = this.bigroad.matrix
    this.smallroad.traverseBigRoadScheme()

    this.cockroachPig.bigRoadMatrix = this.bigroad.matrix
    this.cockroachPig.traverseBigRoadScheme()
  }
}
