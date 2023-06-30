<script setup lang="ts">
import { usePressCtrl } from '../utils'
import { useDraw } from './Trail'

const { isPressCtrlAlt } = usePressCtrl()

const { 
  handlePointerDown,
  handlePointerMove,
  handleUp,
  pathData,
  pathColor,
  pathDataHistory,
} = useDraw()

watch(isPressCtrlAlt, (newVal) => {
  if (!newVal) {
    pathDataHistory.value = []
  }
})
</script>

<template>
  <div v-show="isPressCtrlAlt" class="panel">
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
