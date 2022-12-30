<script setup lang="ts">
import 'uno.css'
import { getStroke } from 'perfect-freehand'
import type { StorageLikeAsync } from '@vueuse/core'
import { useMagicKeys } from '@vueuse/core'
import { storage } from 'webextension-polyfill'
import { storageColor, storageMode } from '~/logic/storage'

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

const { AltLeft } = useMagicKeys()
const svgPointerEvent = ref(false)
watch(AltLeft, (v) => {
  if (v)
    svgPointerEvent.value = true
  else
    svgPointerEvent.value = false
})

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

const storageLocal: StorageLikeAsync = {
  removeItem(key: string) {
    return storage.local.remove(key)
  },

  setItem(key: string, value: string) {
    return storage.local.set({ [key]: value })
  },

  async getItem(key: string) {
    return (await storage.local.get(key))[key]
  },
}

const pathColor = ref(storageColor)
const getCurrentColor = async (key: string) => {
  await (storageLocal.getItem(key) as Promise<string | null>).then((res) => {
    pathColor.value = res
  })
}

// 默认是false，橡皮擦效果，直接消失。
// true，不会消失，除非alt
const mode = ref(storageMode)
const getCurrentMode = async (key: string) => {
  await (storageLocal.getItem(key) as Promise<string | null>).then((res) => {
    mode.value = res === 'true'
  })
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

watch(svgPointerEvent, (v) => {
  pathData.value = ''
  points.value = []
  pathDataHistory.value = []
})

async function handlePointerDown(e: PointerEvent | any) {
  e.target.setPointerCapture(e.pointerId)

  await getCurrentColor('color')
  await getCurrentMode('mode')
  points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]

  if (!mode.value)
    loop()
}

function handlePointerMove(e: PointerEvent | any) {
  if (e.buttons !== 1)
    return
  if (!svgPointerEvent.value)
    return

  points.value = [...points.value, [e.clientX, e.clientY, e.pressure]]
}

let timestamp = 0
let interval = 0
function handleUp(e: PointerEvent | any) {
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
    <path :d="pathData" :stroke="pathColor" :fill="pathColor" />

    <path
      v-for="(item, index) in pathDataHistory"
      :key="index"
      :d="item.path"
      :stroke="item.color"
      :fill="item.color"
    />
  </svg>
</template>

