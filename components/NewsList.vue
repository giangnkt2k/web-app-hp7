<script lang="ts" setup>
import { INews } from '~~/types/news'

const { newsService } = useApiServices()

const isLoading = ref(false)
const isFinished = ref(false)
const newsList = ref<INews[]>([])
const currentPage = ref(1)

const getNews = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await newsService(currentPage.value)

  if (response.data.data) {
    newsList.value.push(...response.data.data.data)

    if (response.data.data.data.length < 30) {
      isFinished.value = true
    }
    isLoading.value = false
    currentPage.value++
  } else {
    isFinished.value = true
  }
}
</script>

<template>
  <van-list
    v-model:loading="isLoading"
    :finished="isFinished"
    :finished-text="$t('news-list.finished-text')"
    :loading-text="$t('news-list.loading-text')"
    @load="getNews"
  >
    <NewsListItem v-for="(news, index) in newsList" :key="index" :news="news" />
  </van-list>
</template>

<style scoped></style>
