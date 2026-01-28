<template>
  <div>
    <div class="mb-2 text-sm lg:mb-3 lg:text-base">{{ title }}</div>
    <div class="space-y-2 text-sm">
      <CheckItem v-for="(item, index) in items" :key="index" :text="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckItem from './CheckItem.vue'

defineProps<{
  title: string
  items: string[]
}>()
</script>
