<template>
  <div class="input-form">
    <label>{{ label }}</label>
    <input
      v-model="modelValue"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    modelValue: {
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
.input-form {
  display: block;

  label {
    display: block;
    font-size: pxToRem(11);
    color: theme("colors.gray.200");
  }

  input {
    background-color: rgba(64, 64, 64, 0.5);
    border: 1px solid rgba(64, 64, 64, 0.7);
    border-radius: 3px;
    padding: 5px 7px;
    width: 100%;
    font-size: pxToRem(13);
  }
}
</style>
