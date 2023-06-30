<script setup lang="ts">
import { usePressAlt } from '../utils'
import { useMouseTail } from './Trail'

const { isPressAlt } = usePressAlt()

const { 
  handlePointerDown,
  handlePointerMove,
  handleUp,
  pathData,
  pathColor
} = useMouseTail()
</script>

<template>
  <div v-show="isPressAlt" class="panel">
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
  position: fixed;
  bottom: 0;
  right: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 2147483647;
  pointer-events: none;
}
.svg-container{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  touch-action: none;
  pointer-events: auto;
}
</style>
