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
export function usePressCtrl() {
  const isPressCtrlAlt = ref(false)
  const { Ctrl_AltLeft, Meta_AltLeft } = useMagicKeys()
  watch(Ctrl_AltLeft, (v) => {
    if (v)
      isPressCtrlAlt.value = true
    else
      isPressCtrlAlt.value = false
  })
  watch(Meta_AltLeft, (v) => {
    if (v)
      isPressCtrlAlt.value = true
    else
      isPressCtrlAlt.value = false
  })

  return {
    isPressCtrlAlt,
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
