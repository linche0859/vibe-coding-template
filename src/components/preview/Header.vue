<template>
  <div class="flex items-center justify-between gap-3 break-all">
    <div
      class="flex-shrink-0 text-2xl font-bold text-neutral-light-600 dark:text-neutral-light-0 lg:text-3xl"
    >
      {{ title }}
    </div>
    <div
      class="no-inherit inline-flex flex-shrink-0 items-center gap-1 rounded border border-neutral-light-600 px-1 py-0.5 text-xs text-neutral-light-600 transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:border-neutral-heavy-100 dark:text-neutral-heavy-100 lg:px-1.5 lg:py-1 lg:text-sm"
    >
      {{ badge }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  badge: string
}>()
</script>
