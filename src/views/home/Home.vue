<template>
  <div class="home">
    <div class="roadmap-container">
      <div class="roadmap">
        <div class="roadmap__item roadmap__item--bread-plate">
          <div class="roadmap__item--title">
            Bread Plate
          </div>

          <RoadmapOptions
            v-model="config.breadplate"
            class="roadmap__item--options"
            @save="
              initRoadmap(),
              config.breadplate.show_options = false
            "
          />

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
                  'bg-red-500': col && col.value === 'b',
                  'bg-blue-500': col && col.value === 'p',
                  'bg-green-500': col && col.value === 't',
                }"
              >
                <small>{{ col.index }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--big-road">
          <div class="roadmap__item--title">
            Big Road
          </div>

          <RoadmapOptions
            v-model="config.bigroad"
            class="roadmap__item--options"
            @save="
              initRoadmap(),
              config.bigroad.show_options = false
            "
          />

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
                <small>{{ col.index }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--big-eye-boy">
          <div class="roadmap__item--title">
            Big Eye Boy
          </div>

          <RoadmapOptions
            v-model="config.bigeyeboy"
            class="roadmap__item--options"
            @save="
              initRoadmap(),
              config.bigeyeboy.show_options = false
            "
          />

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
                <small>{{ col.big_road_index }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--small-road">
          <div class="roadmap__item--title">
            Small Road
          </div>

          <RoadmapOptions
            v-model="config.smallroad"
            class="roadmap__item--options"
            @save="
              initRoadmap(),
              config.smallroad.show_options = false
            "
          />

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
                <small>{{ col ? col.big_road_index : '' }}</small>
              </div>
            </div>
          </div>
        </div>

        <div class="roadmap__item roadmap__item--cockroach-pig">
          <div class="roadmap__item--title">
            Cockroach Pig
          </div>

          <RoadmapOptions
            v-model="config.cockroachPig"
            class="roadmap__item--options"
            @save="
              initRoadmap(),
              config.cockroachPig.show_options = false
            "
          />

          <div class="grid">
            <div
              v-for="(row, rowKey) in cockroachPig.matrix"
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
                <small>{{ col ? col.big_road_index : '' }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="actions">
      <base-button
        class="bg-blue-500 text-white"
        @click="push('p')"
      >
        Player
      </base-button>

      <base-button
        class="bg-red-500 text-white"
        @click="push('b')"
      >
        Banker
      </base-button>

      <base-button
        class="bg-green-500 text-white"
        @click="push('t')"
      >
        Tie
      </base-button>

      <base-button
        class="bg-white text-black"
        @click="clearRoadmap"
      >
        Clear
      </base-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BreadPlate from '@/assets/js/roadmap/BreadPlate'
import BigRoad from '@/assets/js/roadmap/BigRoad'
import BigEyeBoy from '@/assets/js/roadmap/BigEyeBoy'
import SmallRoad from '@/assets/js/roadmap/SmallRoad'
import CockroachPig from '@/assets/js/roadmap/CockroachPig'

import RoadmapOptions from './components/RoadmapOptions.vue'

export default {
  name: 'Home',

  components: {
    RoadmapOptions
  },

  data () {
    return {
      results: [],
      breadplate: {},
      bigroad: {},
      bigeyeboy: {},
      smallroad: {},
      cockroachPig: {},
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
    }
  },

  created () {
    this.initRoadmap()
  },

  methods: {
    clearRoadmap () {
      this.results = []
      this.initRoadmap()
    },

    initRoadmap () {
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
    },

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

      this.cockroachPig.bigRoadMatrix = this.bigroad.matrix
      this.cockroachPig.traverseBigRoadScheme()
      this.cockroachPig.__ob__.dep.notify()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/Home";
</style>
