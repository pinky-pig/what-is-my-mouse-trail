import { getStroke } from 'perfect-freehand'

/**
 * 注入的 DOM 节点显示逻辑
 * @returns 是否按下了alt键，按下返回true，否则返回false
 */
export function usePressAlt() {
  const isPressAlt = ref(false)
  const { AltLeft } = useMagicKeys()
  watch(AltLeft, (v) => {
    if (v)
      isPressAlt.value = true
    else
      isPressAlt.value = false
  })

  return {
    isPressAlt,
  }
}

export function getSvgPathFromStroke(stroke: any) {
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

/**
 * 鼠标小尾巴
 */
export function useMouseTail() {
  const config_linear = { size: 18, start: { taper: true } }

  const points = ref<(number[] | { x: number, y: number, pressure?: number })[]>([])
  const pathData = ref('')

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
    handlePointerDown,
    handlePointerMove,
    handleUp,
  }
}
