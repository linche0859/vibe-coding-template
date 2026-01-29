<template>
  <div 
    class="space-y-4 rounded-lg border border-neutral-light-400 bg-gray-50 p-6 dark:border-neutral-heavy-400 dark:bg-gray-900"
    :data-template-id="template.id"
  >
    <!-- 模板標題列 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ displayName }}</h2>
        <span
          v-if="template.isDefault"
          class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          預設模板
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          @click="handleDuplicate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          建立副本
        </button>
        <button
          v-if="!template.isDefault"
          class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 flex items-center gap-2"
          @click="handleDelete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/>
          </svg>
          刪除模板
        </button>
      </div>
    </div>

    <!-- 編輯器 & 預覽區 -->
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <!-- 左側：編輯器 -->
      <div class="overflow-auto">
        <Editor :data="template.data" @update:data="handleUpdate" />
      </div>

      <!-- 右側：預覽與複製 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">預覽</h3>

        <!-- 預覽卡片 -->
        <div class="rounded-lg border border-neutral-light-400 bg-white p-6 dark:border-neutral-heavy-400 dark:bg-gray-800">
          <Card :data="template.data" />
        </div>

        <!-- HTML 程式碼預覽 -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              生成的 HTML 程式碼：
            </h4>
            <button
              class="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              :class="
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              "
              @click="handleCopy"
            >
              <svg
                v-if="!copied"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ copied ? '已複製！' : '複製 HTML' }}
            </button>
          </div>
          <pre
            class="max-h-96 overflow-auto rounded-lg bg-gray-800 p-4 text-xs text-gray-100"
          ><code>{{ generatedHTML }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Template } from '../types/course'
import Editor from './Editor.vue'
import Card from './preview/Card.vue'
import { generateHTML, beautifyHTML, copyToClipboard } from '../utils/export'

const props = defineProps<{
  template: Template
}>()

const emit = defineEmits<{
  'update:template': [template: Template]
  delete: []
  duplicate: []
}>()

const copied = ref(false)
let copiedTimeout: number | undefined

const generatedHTML = computed(() => {
  return beautifyHTML(generateHTML(props.template.data))
})

const displayName = computed(() => {
  const badge = props.template.data.header.badge.trim()
  return badge || '模板'
})

function handleUpdate(data: any) {
  emit('update:template', { ...props.template, data })
}

async function handleCopy() {
  const success = await copyToClipboard(generatedHTML.value)
  if (success) {
    copied.value = true
    if (copiedTimeout) clearTimeout(copiedTimeout)
    copiedTimeout = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

function handleDelete() {
  emit('delete')
}

function handleDuplicate() {
  emit('duplicate')
}
</script>
