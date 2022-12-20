<script lang="ts" setup>
import { INews } from '~~/types/news'

type Props = {
  news: INews
}

const props = defineProps<Props>()

const hasImage = computed(() => !!props.news.thumbnail_pic_s)
</script>

<template>
  <van-cell
    clickable
    :to="{name: $routesList.newsNewsId, params: {newsId: news.uniquekey}}"
  >
    <van-row gutter="16">
      <van-col :span="hasImage ? 18 : 24">
        <div>{{ news.title }}</div>
        <div class="text-xs text-gray-400 mt-2">
          {{ news.date }}
        </div>
      </van-col>
      <van-col
        v-if="hasImage"
        span="6"
      >
        <van-image
          :src="news.thumbnail_pic_s"
          class="h-full rounded-8px overflow-hidden"
          fit="cover"
        />
      </van-col>
    </van-row>
  </van-cell>
</template>

<style scoped></style>
