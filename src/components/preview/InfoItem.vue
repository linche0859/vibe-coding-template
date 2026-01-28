<template>
  <div class="flex items-start gap-2">
    <div class="flex flex-shrink-0 py-0.5">
      <slot name="icon" />
    </div>
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
