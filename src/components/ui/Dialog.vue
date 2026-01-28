<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useEmitAsProps } from 'radix-vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <DialogRoot v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </DialogRoot>
</template>
