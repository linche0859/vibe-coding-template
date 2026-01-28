<template>
  <div class="flex flex-col gap-2 lg:gap-3">
    <div class="text-xs lg:text-sm">{{ subtitle }}</div>
    <a
      class="no-inherit inline-flex w-full items-center justify-center gap-1 whitespace-nowrap border-transparent bg-primary-heavy-500 px-4 py-2 text-sm text-neutral-light-0 ring-offset-background transition-colors duration-300 ease-out hover:bg-primary-heavy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-light-200 disabled:text-neutral-light-300 dark:disabled:bg-primary-heavy-900 dark:disabled:text-neutral-heavy-200 lg:rounded-lg lg:px-5 lg:py-2 lg:text-base"
      :class="buttonClass"
      :href="link"
      target="_blank"
      rel="noopener noreferrer"
      :data-ga="gaTag"
    >
      {{ text }}
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtitle: string
  text: string
  link: string
  gaTag: string
  buttonClass?: string
}>()
</script>
