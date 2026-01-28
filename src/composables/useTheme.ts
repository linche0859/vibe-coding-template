import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

// 套用主題到 HTML 元素
function applyTheme(newTheme: Theme) {
  const html = document.documentElement
  if (newTheme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

// 全域單例：確保只有一個 theme 實例
const savedTheme = (localStorage.getItem('theme') as Theme | null) || 'dark'
const theme = ref<Theme>(savedTheme)

// 初始化時套用主題
applyTheme(savedTheme)

// 全域 watch：只設置一次
watch(theme, (newTheme) => {
  applyTheme(newTheme)
  localStorage.setItem('theme', newTheme)
})

export function useTheme() {
  // 切換主題
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme,
  }
}
