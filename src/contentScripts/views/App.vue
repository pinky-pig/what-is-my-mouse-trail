<script setup lang="ts">
import 'uno.css'
import { getStroke } from 'perfect-freehand'
import { useMagicKeys } from '@vueuse/core'

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

const points = ref<(number[] | {
  x: number
  y: number
  pressure?: number
})[]>([])
const pathData = ref('')
watch(() => points.value, () => {
  const stroke = getStroke(points.value, { size: 18, start: { taper: true } })
  pathData.value = getSvgPathFromStroke(stroke)
}, {
  deep: true,
})

function handlePointerDown(e: PointerEvent | any) {
  e.target.setPointerCapture(e.pointerId)
  points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]
  loop()
}

function handlePointerMove(e: PointerEvent | any) {
  if (e.buttons !== 1)
    return
  points.value = [...points.value, [e.clientX, e.clientY, e.pressure]]
}

let timestamp = 0
let interval = 0
function handleUp(e: PointerEvent | any) {
  cancelAnimationFrame(interval)
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

const { AltLeft } = useMagicKeys()
const svgPointerEvent = ref(false)
watch(AltLeft, (v) => {
  if (v)
    svgPointerEvent.value = true
  else
    svgPointerEvent.value = false
})
</script>

<template>
  <svg
    v-show="svgPointerEvent"
    class=" fixed right-0 top-0 w-full h-full z-999999999 "
    :style="{ pointerEvents: svgPointerEvent ? 'auto' : 'none' }"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handleUp"
  >
    <path :d="pathData" stroke="gray" fill="gray" />
  </svg>
</template>

