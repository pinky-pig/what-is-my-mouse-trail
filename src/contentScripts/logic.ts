
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
