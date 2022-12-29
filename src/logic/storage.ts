import { useStorageLocal } from '~/composables/useStorageLocal'

export const storageDemo = useStorageLocal('webext-demo', 'Storage Demo')

export const storageColor = useStorageLocal('color', '#000000')
export const storageMode = useStorageLocal('mode', false)
