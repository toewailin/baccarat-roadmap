<template>
  <button
    class="px-4 py-2 font-semibold text-sm rounded"
    @click="e => $emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {

}
</script>
