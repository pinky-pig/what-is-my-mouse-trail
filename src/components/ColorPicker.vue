<script setup lang="ts">
import { currentColor } from './utils';
const color = computed({
  get: () => currentColor.value,
  set: (val) => (currentColor.value = val),
})

const inputRef = ref<HTMLInputElement | null>(null)
function handlePickColor() {
  inputRef.value && (inputRef.value as HTMLElement).click()
}

</script>

<template>
  <div class="main" :style="{ background: color }" @click="handlePickColor">
    <input class="color-picker" ref="inputRef" v-model="color" type="color">
  </div>
</template>

<style scoped>
.main {
  width: 80px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
}
.color-picker{
  position: relative;
  z-index: -1;
}
</style>
