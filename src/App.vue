<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useTemplates } from './composables/useTemplates'
import { useTheme } from './composables/useTheme'
import TemplateItem from './components/TemplateItem.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import ThemeToggle from './components/ThemeToggle.vue'

// 初始化主題
useTheme()

const { templates, deleteTemplate, updateTemplate, duplicateTemplate } = useTemplates()

const showDeleteDialog = ref(false)
const templateToDelete = ref<string | null>(null)

function confirmDelete(id: string) {
  templateToDelete.value = id
  showDeleteDialog.value = true
}

function handleDeleteConfirm() {
  if (templateToDelete.value) {
    deleteTemplate(templateToDelete.value)
  }
  showDeleteDialog.value = false
  templateToDelete.value = null
}

function handleDeleteCancel() {
  showDeleteDialog.value = false
  templateToDelete.value = null
}

function handleTemplateUpdate(template: any) {
  updateTemplate(template.id, template.data)
}

async function handleDuplicate(templateId: string) {
  const newTemplateId = duplicateTemplate(templateId)
  if (newTemplateId) {
    // 等待 DOM 更新
    await nextTick()
    // 滚动到新创建的模板
    const element = document.querySelector(`[data-template-id="${newTemplateId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- 頂部標題與按鈕 -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Vibe Coding HTML 編輯器
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            編輯課程活動資訊並匯出 HTML 程式碼
          </p>
        </div>
        <ThemeToggle />
      </div>

      <!-- 模板列表 -->
      <div class="space-y-8">
        <TemplateItem
          v-for="template in templates"
          :key="template.id"
          :template="template"
          :data-template-id="template.id"
          @update:template="handleTemplateUpdate"
          @delete="confirmDelete(template.id)"
          @duplicate="handleDuplicate(template.id)"
        />
      </div>

      <!-- 空狀態提示 -->
      <div
        v-if="templates.length === 0"
        class="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700"
      >
        <p class="text-gray-500 dark:text-gray-400">尚無模板</p>
      </div>
    </div>

    <!-- 刪除確認對話框 -->
    <ConfirmDialog
      :show="showDeleteDialog"
      title="確認刪除模板"
      message="刪除後將無法復原，確定要刪除此模板嗎？"
      @confirm="handleDeleteConfirm"
      @cancel="handleDeleteCancel"
    />
  </div>
</template>

