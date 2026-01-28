export function validateURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function validateDateFormat(date: string): boolean {
  const dateRegex = /^\d{2}\/\d{2}$/
  return dateRegex.test(date)
}

export function getValidationError(type: 'url' | 'date', value: string): string {
  if (type === 'url' && !validateURL(value)) {
    return '請輸入有效的 URL 格式'
  }
  if (type === 'date' && !validateDateFormat(value)) {
    return '請輸入 MM/DD 格式的日期'
  }
  return ''
}
