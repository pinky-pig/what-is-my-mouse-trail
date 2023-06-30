import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../utils'
/**
 * 鼠标小尾巴
 */
export function useMouseTail() {
  const config_linear = { size: 18, start: { taper: true } }

  const points = ref<(number[] | { x: number, y: number, pressure?: number })[]>([])
  const pathData = ref('')
  const pathColor = ref('#000000')

  watch(() => points.value, () => {
    const stroke = getStroke(points.value, config_linear)
    pathData.value = getSvgPathFromStroke(stroke)
  }, { deep: true, })


  async function handlePointerDown(e: PointerEvent ) {
    e.target && (e.target as HTMLElement).setPointerCapture(e.pointerId)
    points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]
    loop()
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1)
      return

    points.value = [...points.value, [e.offsetX, e.offsetY, e.pressure]]
  }

  let stopAnimationFrame = 0
  function handleUp() {
    cancelAnimationFrame(stopAnimationFrame)
    pathData.value = ''
  }

  let timestamp = 0
  function loop() {
    const now = Date.now()
    const elapsed2 = now - timestamp
    if (elapsed2 > 32) {
      if (points.value.length > 1) {
        points.value.splice(0, Math.ceil(points.value.length * 0.1))
        timestamp = now
      }
    }
    stopAnimationFrame = requestAnimationFrame(loop)
  }

  return {
    pathData,
    pathColor,
    handlePointerDown,
    handlePointerMove,
    handleUp,
  }
}

/**
 * 跟上面的方法一样，只不过鼠标抬起的时候，将 path 存到了 history 里面，达到保存绘制的效果
 * @returns 
 */
export function useDraw() {
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
  const points = ref<(number[] | { x: number, y: number, pressure?: number })[]>([])
  const pathData = ref('')
  const pathColor = ref('#000000')
  const pathDataHistory = ref<{
    path: string
    color: string
  }[]>([])

  watch(() => points.value, () => {
    const stroke = getStroke(points.value, config_draw)
    pathData.value = getSvgPathFromStroke(stroke)
  }, { deep: true, })


  async function handlePointerDown(e: PointerEvent ) {
    e.target && (e.target as HTMLElement).setPointerCapture(e.pointerId)
    points.value = [[e.clientX, e.clientY, e.pressure ?? 0.5]]
  }

  function handlePointerMove(e: PointerEvent) {
    if (e.buttons !== 1)
      return

    pathDataHistory.value.push({
      path: pathData.value,
      color: pathColor.value,
    })

    points.value = [...points.value, [e.offsetX, e.offsetY, e.pressure]]
  }

  function handleUp() {
    pathData.value = ''
  }


  return {
    pathData,
    pathColor,
    pathDataHistory,
    handlePointerDown,
    handlePointerMove,
    handleUp,
  }
}
