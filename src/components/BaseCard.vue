<template>
  <div class="base-card">
    <div class="card__title">
      <slot name="title"></slot>

      <span
        v-if="!showCloseBtn"
        class="cursor-pointer text-red-500"
        @click="$emit('close', true)"
      >🞬</span>
    </div>

    <div class="card__body">
      <slot></slot>
    </div>

    <div class="card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showCloseBtn: {
      type: [Boolean, Number],
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.base-card {
  background-color: rgba(64, 64, 64, 0.5);
  border: 1px solid rgba(64, 64, 64, 0.8);
  backdrop-filter: blur(5px);
  top: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 5px;

  .card__title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .card__footer {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
