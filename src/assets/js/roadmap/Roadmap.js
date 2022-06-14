export default class Roadmap {
  constructor () {
    this.indentityDictionary = {
      b: 'banker', // banker
      p: 'player', // player
      t: 'tie', // tie
      q: 'banker', // banker banker-pair
      w: 'banker', // banker banker-pair player-pair
      e: 'banker', // banker player-pair
      f: 'player', // player banker-pair
      g: 'player', // player banker-pair player-pair
      h: 'player', // player player-pair
      i: 'tie', // tie banker-pair
      j: 'tie', // tie banker-pair player-pair
      k: 'tie', // tie player-pair
      l: 'banker', // banker
      m: 'banker', // banker banker-pair
      n: 'banker', // banker banker-pair player-pair
      o: 'banker' // banker player-pair
    }
  }

  get bankerIdentities () {
    return Object.entries(this.indentityDictionary)
      .filter(x => x[1] === 'banker')
      .map(x => x[0])
  }

  get playerIdentities () {
    return Object.entries(this.indentityDictionary)
      .filter(x => x[1] === 'player')
      .map(x => x[0])
  }

  get tieIdentities () {
    return Object.entries(this.indentityDictionary)
      .filter(x => x[1] === 'tie')
      .map(x => x[0])
  }

  get hasFullRow () {
    return this.matrix.some(row => {
      return !!row[this.cols - 1]
    })
  }

  truncateFirstColumn () {
    const tail = ([, ...t]) => t

    return this.matrix.map(row => {
      return [...tail(row), 0]
    })
  }

  get roadmap () {
    return this.matrix.map(row => {
      return row.map(col => {
        return col ? col.value : 0
      })
    })
  }
}
