<script setup lang="ts">
import { currentMode } from './utils'
import { useMouseTail } from './Trail'

const { 
  handlePointerDown,
  handlePointerMove,
  handleUp,
  pathData,
  pathColor
} = useMouseTail()
</script>

<template>
  <div v-show="currentMode === 'MouseTrail'" class="panel">
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
