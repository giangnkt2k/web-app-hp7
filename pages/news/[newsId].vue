<script lang="ts" setup>
import { IArticleDetails } from '~~/types/news'

definePageMeta({
  pageTitle: 'page.news.title'
})

const route = useRoute()
const { articleDetailsService } = useApiServices()

const articleDetails = ref<IArticleDetails>()

const newsId = computed(() => route.params.newsId.toString())

const getArticleDetails = async () => {
  const response = await articleDetailsService(newsId.value)

  if (response.data && response.data.data) {
    articleDetails.value = response.data.data
  }
}

getArticleDetails()
</script>

<template>
  <div>
    <van-sticky>
      <TheHeader :back-to="{name: $routesList.index}" />
    </van-sticky>
    <van-skeleton :loading="!articleDetails" row="6" :class="{'mt-3': !articleDetails}">
      <div v-if="!!articleDetails" class="px-4 pb-50px">
        <h1 class="text-lg font-bold my-3">
          {{ articleDetails.detail.title }}
        </h1>
        <div class="text-xs">
          {{ articleDetails.detail.category }} {{ articleDetails.detail.date }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="text-sm" v-html="articleDetails.content" />
      </div>
    </van-skeleton>
  </div>
</template>

<style scoped></style>
