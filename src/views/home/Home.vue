<template>
  <div class="home">
    <div class="roadmap-container">
      <div class="roadmap">
        <div class="roadmap__item roadmap__item--bread-plate">
          <div class="roadmap__item--title">
            Bread Plate
          </div>

          <div class="grid">
            <div
              v-for="(row, rowKey) in breadplate.matrix"
              :key="rowKey"
              class="grid__row"
            >
              <div
                v-for="(col, colKey) in row"
                :key="colKey"
                class="grid__col text-gray-200"
                :class="{
                  'bg-red-500': col && col.value === 'p',
                  'bg-blue-500': col && col.value === 'b',
                  'bg-green-500': col && col.value === 't',
                }"
              >
                {{ col ? col.value : '' }}
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--big-road">
          <div class="roadmap__item--title">
            Big Road
          </div>
          <div class="grid">
            <div
              v-for="(row, rowKey) in bigroad.matrix"
              :key="rowKey"
              class="grid__row"
            >
              <div
                v-for="(col, colKey) in row"
                :key="colKey"
                class="grid__col text-gray-200"
                :class="{
                  'bg-red-500': col && col.value === 'b',
                  'bg-blue-500': col && col.value === 'p',
                  'bg-green-500': col && col.value === 't',
                }"
              >
                {{ col ? col.value : '' }}
                <small>{{ col.index }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--big-eye-boy">
          <div class="roadmap__item--title">
            Big Eye Boy
          </div>
          <div class="grid">
            <div
              v-for="(row, rowKey) in bigeyeboy.matrix"
              :key="rowKey"
              class="grid__row"
            >
              <div
                v-for="(col, colKey) in row"
                :key="colKey"
                class="grid__col text-gray-200"
                :class="{
                  'bg-red-500': col && col.value === 'red',
                  'bg-blue-500': col && col.value === 'blue',
                }"
              >
                {{ col ? col.value : '' }}
                <small>{{ col.big_road_index }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--small-road">
          <div class="roadmap__item--title">
            Small Road
          </div>
          <div class="grid">
            <div
              v-for="(row, rowKey) in smallroad.matrix"
              :key="rowKey"
              class="grid__row"
            >
              <div
                v-for="(col, colKey) in row"
                :key="colKey"
                class="grid__col"
                :class="{
                  'bg-red-500': col && col.value === 'red',
                  'bg-blue-500': col && col.value === 'blue',
                }"
              >
                {{ col ? col.value : '' }}
                <small>{{ col ? col.big_road_index : '' }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--cockroach-pig">
          <div class="roadmap__item--title">
            Cockroach Pig
          </div>
          <div class="grid">
            <div
              v-for="(row, rowKey) in cockroachPig"
              :key="rowKey"
              class="grid__row"
            >
              <div
                v-for="(col, colKey) in row"
                :key="colKey"
                class="grid__col"
              >
                <!--  -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <button
        class="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-full mr-2"
        @click="push('p')"
      >
        Player
      </button>
      <button
        class="px-4 py-2 font-semibold text-sm bg-blue-500 text-white rounded-full mr-2"
        @click="push('b')"
      >
        Banker
      </button>
      <button
        class="px-4 py-2 font-semibold text-sm bg-green-500 text-white rounded-full"
        @click="push('t')"
      >
        Tie
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadPlate from '@/assets/js/roadmap/BreadPlate'
import BigRoad from '@/assets/js/roadmap/BigRoad'
import BigEyeBoy from '@/assets/js/roadmap/BigEyeBoy'
import SmallRoad from '@/assets/js/roadmap/SmallRoad'

export default {
  name: 'Home',

  data () {
    return {
      smallroad: {},
      cockroachPig: [
        Array.from({ length: 13 }),
        Array.from({ length: 13 }),
        Array.from({ length: 13 })
      ],
      bigeyeboy: {},
      bigroad: {},
      breadplate: {}
    }
  },

  created () {
    const results = 'bpbbpbbbbpbpbbpppbbbppbpppbbpp'.split('')

    this.breadplate = new BreadPlate({
      results,
      rows: 6,
      cols: 9
    })

    this.bigroad = new BigRoad({
      results,
      rows: 6,
      cols: 26
    })

    this.bigeyeboy = new BigEyeBoy({
      bigRoadMatrix: this.bigroad.matrix
    })

    this.smallroad = new SmallRoad({
      bigRoadMatrix: this.bigroad.matrix,
      rows: 3,
      cols: 26
    })
  },

  methods: {
    push (key) {
      this.breadplate.push(key)
      this.breadplate.__ob__.dep.notify()

      this.bigroad.push(key)
      this.bigroad.__ob__.dep.notify()

      this.bigeyeboy.bigRoadMatrix = this.bigroad.matrix
      this.bigeyeboy.traverseBigRoadScheme()
      this.bigeyeboy.__ob__.dep.notify()

      this.smallroad.bigRoadMatrix = this.bigroad.matrix
      this.smallroad.traverseBigRoadScheme()
      this.smallroad.__ob__.dep.notify()

      // bigroad.push(key)

      // await bigeyeboy.traverseBigRoadScheme()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/Home";
</style>
