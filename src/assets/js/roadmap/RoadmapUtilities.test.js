import { expect, test } from 'vitest'

import RoadmapUtilities from './RoadmapUtilities'

test('Identity dictionary should be correct', () => {
  const roadmap = new RoadmapUtilities()

  expect(roadmap.identityDictionary).toEqual({
    b: 'banker',
    p: 'player',
    t: 'tie',
    q: 'banker',
    w: 'banker',
    e: 'banker',
    f: 'player',
    g: 'player',
    h: 'player',
    i: 'tie',
    j: 'tie',
    k: 'tie',
    l: 'banker',
    m: 'banker',
    n: 'banker',
    o: 'banker'
  })
})
