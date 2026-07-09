import { ref, onMounted } from 'vue'

const theme = ref('dark')

export function useTheme() {
  function initTheme() {
    theme.value = 'dark'
    document.documentElement.classList.add('dark')
  }

  onMounted(() => {
    initTheme()
  })

  return {
    theme,
  }
}
