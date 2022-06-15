<template>
  <div class="home">
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

    <div class="actions">
      <base-input
        v-model="manualMarks"
        label="Marks"
        type="search"
      />

      <base-button
        class="bg-blue-500"
        @click="saveManualResult"
      >
        Save
      </base-button>
    </div>

    <div class="roadmap-container">
      <div
        v-if="roadmap"
        class="roadmap"
      >
        <div class="roadmap__item roadmap__item--bread-plate">
          <div class="roadmap__item--title">
            Bread Plate
          </div>

          <RoadmapOptions
            v-model="config.breadplate"
            class="roadmap__item--options"
            @save="saveConfig('breadplate')"
          />

          <div class="grid">
            <div
              v-for="(row, rowKey) in roadmap.breadplate.matrix"
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
              v-for="(row, rowKey) in roadmap.bigroad.matrix"
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
              v-for="(row, rowKey) in roadmap.bigeyeboy.matrix"
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
              v-for="(row, rowKey) in roadmap.smallroad.matrix"
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
              v-for="(row, rowKey) in roadmap.cockroachPig.matrix"
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
  </div>
</template>

<script>
// @ is an alias to /src
import Roadmap from '@/assets/js/roadmap/Roadmap'
import RoadmapUtilities from '@/assets/js/roadmap/RoadmapUtilities'

import RoadmapOptions from './components/RoadmapOptions.vue'

export default {
  name: 'Home',

  components: {
    RoadmapOptions
  },

  data () {
    return {
      manualMarks: '',

      results: [],

      roadmap: null,
      roadmapUtils: null,

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
    this.roadmapUtils = new RoadmapUtilities()
    this.initRoadmap()
  },

  methods: {
    clearRoadmap () {
      this.results = []
      this.initRoadmap()
    },

    initRoadmap () {
      this.roadmap = new Roadmap({
        results: this.results,
        config: this.config
      })
    },

    push (key) {
      this.results.push(key)

      this.roadmap.push(key)
    },

    // eslint-disable-next-line vue/no-unused-properties
    formatArray (arr) {
      const str = JSON.stringify(arr)

      return str
        .replace(/(\[)(\[)/g, '$1\n$2')
        .replace(/(\])(\])/g, '$1\n$2')
        .replace(/(\],)(\[)/g, '$1\n$2')
        .replace(/(\[.)/g, '  $1')
    },

    saveConfig (configKey) {
      const config = this.config[configKey]

      config.show_options = false

      this.initRoadmap()
    },

    saveManualResult () {
      const manualResultsArray = this.manualMarks.split('')

      const isValidResults = manualResultsArray.every(mark => {
        return this.roadmapUtils.identityDictionary[mark]
      })

      if (!isValidResults) {
        return alert('Invalid marks')
      }

      this.results = manualResultsArray
      this.initRoadmap()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./styles/Home";
</style>
