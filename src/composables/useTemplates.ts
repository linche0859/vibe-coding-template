import { ref, watch } from 'vue'
import type { Template, CourseData } from '../types/course'

const STORAGE_KEY = 'vibe-coding-templates'

function getDefaultCourseData(): CourseData {
  return {
    header: {
      title: '免費(限時限量)',
      badge: '03/03 場次',
      subtitle: '名額有限，儘早加入',
      ctaButton: {
        text: '立即報名',
        link: 'https://www.surveycake.com/s/enkYa',
        gaTag: '點擊付費課程的立即購課',
      },
    },
    courseIncludes: {
      title: '課程包括：',
      items: [
        '掌握 AI 時代職涯關鍵：看懂正在改變未來的趨勢',
        '普通人如何用 Vibe Coding 翻倍收入與價值：真實做法公開',
        '如何用 Vibe Coding 打造穩定高效的 AI 流程：讓你的想法真正落地',
        '現場 QA：解答你的 Vibe Coding 實戰疑問',
      ],
    },
    eventInfo: {
      title: '活動資訊：',
      date: '03/03',
      time: '7:00pm - 9:00pm',
      method: '線上（報名成功後將透過 Line 與 Email 提供連結）',
    },
  }
}

function loadTemplatesFromStorage(): Template[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load templates from localStorage:', error)
  }

  // Return default template if nothing in storage
  return [
    {
      id: crypto.randomUUID(),
      name: '預設模板',
      data: getDefaultCourseData(),
      isDefault: true,
    },
  ]
}

function saveTemplates(templates: Template[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  } catch (error) {
    console.error('Failed to save templates to localStorage:', error)
  }
}

export function useTemplates() {
  const templates = ref<Template[]>(loadTemplatesFromStorage())

  // Auto-save to localStorage whenever templates change
  watch(
    templates,
    (newTemplates) => {
      saveTemplates(newTemplates)
    },
    { deep: true }
  )

  function generateTemplateName(baseDate: string): string {
    const existingNames = templates.value.map((t) => t.name)
    let name = baseDate
    let counter = 1

    while (existingNames.includes(name)) {
      name = `${baseDate} (${counter})`
      counter++
    }

    return name
  }

  function addTemplate(baseDate: string) {
    const name = generateTemplateName(baseDate)
    const newTemplate: Template = {
      id: crypto.randomUUID(),
      name,
      data: JSON.parse(JSON.stringify(getDefaultCourseData())),
      isDefault: false,
    }

    templates.value.push(newTemplate)
  }

  function deleteTemplate(id: string) {
    const template = templates.value.find((t) => t.id === id)
    if (template?.isDefault) {
      console.warn('Cannot delete default template')
      return false
    }

    templates.value = templates.value.filter((t) => t.id !== id)
    return true
  }

  function updateTemplate(id: string, data: CourseData) {
    const template = templates.value.find((t) => t.id === id)
    if (template) {
      template.data = data
    }
  }

  function duplicateTemplate(id: string): string | undefined {
    const template = templates.value.find((t) => t.id === id)
    if (!template) return undefined

    const baseName = template.name.replace(/ \(\d+\)$/, '')
    const name = generateTemplateName(baseName)

    const newTemplate: Template = {
      id: crypto.randomUUID(),
      name,
      data: JSON.parse(JSON.stringify(template.data)),
      isDefault: false,
    }

    // 在當前模板後面插入新模板
    const currentIndex = templates.value.findIndex((t) => t.id === id)
    templates.value.splice(currentIndex + 1, 0, newTemplate)

    return newTemplate.id
  }

  return {
    templates,
    addTemplate,
    deleteTemplate,
    updateTemplate,
    duplicateTemplate,
  }
}
