<template>
  <div class="roadmap-options">
    <img
      src="@/assets/images/setting.png"
      alt=""
      class="cursor-pointer"
      @click.stop="config.show_options = 1"
    >

    <base-card
      v-if="config.show_options"
      class="settings-card"
      @close="config.show_options = false"
    >
      <template #title>
        Settings
      </template>

      <base-input
        v-model.number="config.rows"
        label="Rows"
        type="search"
      />

      <base-input
        v-model.number="config.cols"
        label="Cols"
        type="search"
      />

      <template #footer>
        <base-button
          class="bg-blue-500 text-white"
          @click="$emit('save')"
        >
          Save
        </base-button>
      </template>
    </base-card>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  computed: {
    config: {
      set (val) {
        this.$emit('input', val)
      },

      get () {
        return this.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.roadmap-options {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;

  img {
    width: 25px;
    height: 25px;
    margin: 10px;
    z-index: 1;
    opacity: 0.3;
    transition: 100ms ease opacity;

    &:hover {
      opacity: 1;
    }
  }

  .settings-card {
    position: absolute;
    width: 300px;
    z-index: 2;
  }
}
</style>
