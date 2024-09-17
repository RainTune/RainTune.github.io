import { onMounted, onUnmounted, ref } from 'vue'

export const usePaste = () => {
  const url = ref<string>('')

  function handler(event: any) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items
    console.log('items:', items)
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        const reader = new FileReader()
        reader.onload = function (e: any) {
          url.value = e.target.result
          console.log('url.value:', url.value)
        }
        reader.readAsDataURL(blob)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('paste', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('paste', handler)
  })
  return { pasteUrl: url }
}