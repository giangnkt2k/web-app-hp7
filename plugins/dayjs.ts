import dayjs, { extend } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default defineNuxtPlugin(() => {
  extend(utc)
  extend(timezone)

  return {
    provide: {
      dayjs
    }
  }
})
