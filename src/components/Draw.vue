<script setup lang="ts">
import { watch } from 'vue';
import { currentMode } from './utils'
import { useDraw } from './Trail'


const { 
  handlePointerDown,
  handlePointerMove,
  handleUp,
  pathData,
  pathColor,
  pathDataHistory,
} = useDraw()

watch(currentMode, () => {
  pathDataHistory.value = []
})
</script>

<template>
  <div v-show="currentMode === 'Draw'" class="panel">
    <svg
      class="svg-container"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handleUp"
    >
      <path
        :d="pathData"
        :stroke="pathColor"
        :fill="pathColor"
      />

      <path
        v-for="(item, index) in pathDataHistory"
        :key="index"
        :d="item.path"
        :stroke="item.color"
        :fill="item.color"
      />
    </svg>
  </div>
</template>
<style scoped>
.panel {
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2147483647;
  pointer-events: none;
}
.svg-container{
  height: 100%;
  width: 100%;
  touch-action: none;
  pointer-events: auto;
}
</style>
