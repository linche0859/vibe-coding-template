<template>
  <div class="space-y-6 rounded-lg border border-neutral-light-400 bg-white p-6 dark:border-neutral-heavy-400 dark:bg-gray-800">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">編輯課程內容</h3>

    <!-- 頭部區塊 -->
    <div class="space-y-4">
      <h4 class="font-medium text-gray-700 dark:text-gray-300">頭部資訊</h4>

      <div class="space-y-2">
        <Label for="title">標題</Label>
        <Input
          id="title"
          v-model="localData.header.title"
          type="text"
        />
      </div>

      <div class="space-y-2">
        <Label for="badge">場次標籤</Label>
        <Input
          id="badge"
          v-model="localData.header.badge"
          type="text"
          :class="badgeError ? 'border-red-500' : ''"
          @input="handleBadgeInput"
        />
        <p v-if="badgeError" class="mt-1 text-xs text-red-500">{{ badgeError }}</p>
      </div>

      <div class="space-y-2">
        <Label for="subtitle">副標題</Label>
        <Input
          id="subtitle"
          v-model="localData.header.subtitle"
          type="text"
        />
      </div>
    </div>

    <!-- CTA 區塊 -->
    <div class="space-y-4 border-t border-neutral-light-400 pt-6 dark:border-neutral-heavy-400">
      <h4 class="font-medium text-gray-700 dark:text-gray-300">行動呼籲按鈕</h4>

      <div class="space-y-2">
        <Label for="cta-text">按鈕文字</Label>
        <Input
          id="cta-text"
          v-model="localData.header.ctaButton.text"
          type="text"
        />
      </div>

      <div class="space-y-2">
        <Label for="cta-link">報名連結</Label>
        <Input
          id="cta-link"
          v-model="localData.header.ctaButton.link"
          type="url"
          :class="linkError ? 'border-red-500' : ''"
          @input="handleLinkInput"
        />
        <p v-if="linkError" class="mt-1 text-xs text-red-500">{{ linkError }}</p>
      </div>

      <div class="space-y-2">
        <Label for="ga-tag">GA 追蹤標籤</Label>
        <Input
          id="ga-tag"
          v-model="localData.header.ctaButton.gaTag"
          type="text"
        />
      </div>
    </div>

    <!-- 課程包括區塊 -->
    <div class="space-y-4 border-t border-neutral-light-400 pt-6 dark:border-neutral-heavy-400">
      <h4 class="font-medium text-gray-700 dark:text-gray-300">課程包括</h4>

      <div class="space-y-2">
        <Label for="includes-title">區塊標題</Label>
        <Input
          id="includes-title"
          v-model="localData.courseIncludes.title"
          type="text"
        />
      </div>

      <div class="space-y-2">
        <div v-for="(_item, index) in localData.courseIncludes.items" :key="index" class="flex gap-2">
          <Input
            v-model="localData.courseIncludes.items[index]"
            type="text"
            class="flex-1"
            :placeholder="`項目 ${index + 1}`"
          />
          <Button
            v-if="localData.courseIncludes.items.length > 1"
            variant="destructive"
            size="default"
            @click="removeIncludeItem(index)"
          >
            刪除
          </Button>
        </div>
        <Button
          variant="outline"
          class="w-full border-dashed"
          @click="addIncludeItem"
        >
          + 新增項目
        </Button>
      </div>
    </div>

    <!-- 活動資訊區塊 -->
    <div class="space-y-4 border-t border-neutral-light-400 pt-6 dark:border-neutral-heavy-400">
      <h4 class="font-medium text-gray-700 dark:text-gray-300">活動資訊</h4>

      <div class="space-y-2">
        <Label for="event-title">區塊標題</Label>
        <Input
          id="event-title"
          v-model="localData.eventInfo.title"
          type="text"
        />
      </div>

      <div class="space-y-2">
        <Label for="event-date">日期 (MM/DD)</Label>
        <Input
          id="event-date"
          v-model="localData.eventInfo.date"
          type="text"
          placeholder="03/03"
          :class="dateError ? 'border-red-500' : ''"
          @input="handleDateInput"
        />
        <p v-if="dateError" class="mt-1 text-xs text-red-500">{{ dateError }}</p>
      </div>

      <div class="space-y-2">
        <Label for="event-time">時間</Label>
        <Input
          id="event-time"
          v-model="localData.eventInfo.time"
          type="text"
          placeholder="7:00pm - 9:00pm"
        />
      </div>

      <div class="space-y-2">
        <Label for="event-method">上課方式</Label>
        <Input
          id="event-method"
          v-model="localData.eventInfo.method"
          type="text"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { CourseData } from '../types/course'
import { getValidationError } from '../utils/validation'
import Input from './ui/Input.vue'
import Label from './ui/Label.vue'
import Button from './ui/Button.vue'

const props = defineProps<{
  data: CourseData
}>()

const emit = defineEmits<{
  'update:data': [data: CourseData]
}>()

const localData = ref<CourseData>(JSON.parse(JSON.stringify(props.data)))
const linkError = ref('')
const dateError = ref('')
const badgeError = ref('')
const isUpdatingFromProps = ref(false)

watch(
  () => props.data,
  (newData) => {
    isUpdatingFromProps.value = true
    localData.value = JSON.parse(JSON.stringify(newData))
    nextTick(() => {
      isUpdatingFromProps.value = false
    })
  },
  { deep: true }
)

// 監聽 localData 變化，即時更新預覽（支援中文輸入法）
watch(
  localData,
  (newData) => {
    if (!isUpdatingFromProps.value) {
      emit('update:data', newData)
    }
  },
  { deep: true }
)


function handleLinkInput() {
  linkError.value = getValidationError('url', localData.value.header.ctaButton.link)
}

function handleDateInput() {
  dateError.value = getValidationError('date', localData.value.eventInfo.date)
}

function handleBadgeInput() {
  // Extract date from badge (e.g., "03/03 場次" -> "03/03")
  const dateMatch = localData.value.header.badge.match(/\d{2}\/\d{2}/)
  if (dateMatch) {
    badgeError.value = getValidationError('date', dateMatch[0])
  } else {
    badgeError.value = ''
  }
}

function addIncludeItem() {
  localData.value.courseIncludes.items.push('')
}

function removeIncludeItem(index: number) {
  localData.value.courseIncludes.items.splice(index, 1)
}
</script>
