<script setup lang="ts">

const color = ref("#3aa757")
chrome.storage.local.get(["color"]).then((res) => {
  color.value = res.color || "#3aa757"
})

const inputRef = ref<HTMLInputElement | null>(null)
function handlePickColor() {
  inputRef.value && (inputRef.value as HTMLElement).click()
}

watchEffect(() => {
  chrome.storage.local.set({ color: color.value })
})
</script>

<template>
  <main class="main" :style="{ background: color }" @click="handlePickColor">
    <p class="place-holder-text">Color Picker</p>
    <p class="logo-name">What is my mouse trail</p>
    <input class="color-picker" ref="inputRef" v-model="color" type="color">
  </main>
</template>

<style scoped>
.main {
  width: 240px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
}
.place-holder-text{
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #b8b8b8;
  font-size: 18px;
  font-style: italic;
  font-family: fantasy;
}
.logo-name{
  position: absolute;
  top: 30%;
  left: 66%;
  transform: translate(-50%, -50%);
  color: #b8b8b8;
  font-size: 18px;
  font-style: italic;
  font-family: fantasy;
}
.color-picker{
  position: absolute;
  z-index: -1;
  left: 11px;
}
</style>
