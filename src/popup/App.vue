<script setup lang="ts">

const color = ref("#3aa757")
chrome.storage.local.get(["color"]).then((res) => {
  color.value = res.color || "#3aa757"
})

const inputRef = ref<HTMLInputElement | null>(null)
function handlePickColor() {
  inputRef.value && (inputRef.value as HTMLElement).click()
}
</script>

<template>
  <main class="main" :style="{ background: color }" @click="handlePickColor">
    <input class="color-picker" ref="inputRef" v-model="color" type="color">
  </main>
</template>

<style scoped>
.main {
  width: 240px;
  height: 200px;
  border-radius: 5px;
}
.color-picker{
  position: absolute;
  z-index: -1;
  left: 11px;
}
</style>
