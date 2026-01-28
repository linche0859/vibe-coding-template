export interface CourseData {
  header: {
    title: string
    badge: string
    subtitle: string
    ctaButton: {
      text: string
      link: string
      gaTag: string
    }
  }
  courseIncludes: {
    title: string
    items: string[]
  }
  eventInfo: {
    title: string
    date: string
    time: string
    method: string
  }
}

export interface Template {
  id: string
  name: string
  data: CourseData
  isDefault: boolean
}
