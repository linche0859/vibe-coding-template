<template>
  <div class="flex flex-col gap-6 text-neutral-light-600 dark:text-neutral-light-0 lg:gap-7">
    <div class="flex flex-col gap-3 lg:gap-6">
      <Header :title="data.header.title" :badge="data.header.badge" />
      <CTA
        :subtitle="data.header.subtitle"
        :text="data.header.ctaButton.text"
        :link="data.header.ctaButton.link"
        :ga-tag="data.header.ctaButton.gaTag"
        button-class="rounded-md"
      />
    </div>
    <Includes :title="data.courseIncludes.title" :items="data.courseIncludes.items" />
    <Info
      :title="data.eventInfo.title"
      :date="data.eventInfo.date"
      :time="data.eventInfo.time"
      :method="data.eventInfo.method"
    />
  </div>
</template>

<script setup lang="ts">
import type { CourseData } from '../../types/course'
import Header from './Header.vue'
import CTA from './CTA.vue'
import Includes from './Includes.vue'
import Info from './Info.vue'

defineProps<{
  data: CourseData
}>()
</script>
