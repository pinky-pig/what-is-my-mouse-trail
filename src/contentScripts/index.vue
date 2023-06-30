<script setup lang="ts">
import { usePressAlt } from './logic'
// https://github.com/steveruizok/perfect-freehand
import { getStroke } from 'perfect-freehand'

function getSvgPathFromStroke(stroke: any) {
  if (!stroke.length)
    return ''
  const d = stroke.reduce(
    (acc: any[], [x0, y0]: any, i: number, arr: string | any[]) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q'],
  )
  d.push('Z')
  return d.join(' ')
}

const svgPointerEvent = ref(true)

const config_draw = {
  size: 16,
  smoothing: 0.5,
  thinning: 0.5,
  streamline: 0.5,
  easing: (t: any) => t,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
}
const config_linear = { size: 18, start: { taper: true } }

const pathColor = ref('#000000')
async function getCurrentColor() {
  pathColor.value = '#000000'
}

// 默认是false，橡皮擦效果，直接消失。
// true，不会消失，除非alt
const mode = ref(false)
async function getCurrentMode() {
  mode.value = false
}

const points = ref<(number[] | {
  x: number
  y: number
  pressure?: number
})[]>([])
const pathData = ref('')
const pathDataHistory = ref<{
  path: string
  color: string
}[]>([])
watch(() => points.value, () => {
  const config_option = mode.value ? config_draw : config_linear
  const stroke = getStroke(points.value, config_option)
  pathData.value = getSvgPathFromStroke(stroke)
}, {
  deep: true,
})

watch(svgPointerEvent, (_v) => {
  pathData.value = ''
  points.value = []
  pathDataHistory.value = []
})

async function handlePointerDown(e: PointerEvent | any) {
  e.target.setPointerCapture(e.pointerId)

  await getCurrentColor()
  await getCurrentMode()
  points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]

  if (!mode.value)
    loop()
}

function handlePointerMove(e: PointerEvent | any) {
  if (e.buttons !== 1)
    return
  if (!svgPointerEvent.value)
    return

  points.value = [...points.value, [e.offsetX, e.offsetY, e.pressure]]
}

let timestamp = 0
let interval = 0
function handleUp(_e: PointerEvent | any) {
  cancelAnimationFrame(interval)

  if (mode.value) {
    pathDataHistory.value.push({
      path: pathData.value,
      color: pathColor.value,
    })
  }

  pathData.value = ''
}
function loop() {
  const now = Date.now()
  const elapsed2 = now - timestamp
  if (elapsed2 > 32) {
    if (points.value.length > 1) {
      points.value.splice(0, Math.ceil(points.value.length * 0.1))
      timestamp = now
    }
  }
  interval = requestAnimationFrame(loop)
}


const { isPressAlt } = usePressAlt()
</script>

<template>
  <div v-show="isPressAlt" class="panel">
    <svg
      style="position: absolute;left: 0; top: 0;height: 100%; width: 100%; touch-action: none;"
      :style="{ pointerEvents: svgPointerEvent ? 'auto' : 'none' }"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handleUp"
    >
      <path
        :d="pathData"
        stroke="currentColor"
        fill="currentColor"
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
</style>
