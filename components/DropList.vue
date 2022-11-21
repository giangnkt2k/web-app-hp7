<script lang="ts" setup>
import { IStock } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.search.title'
})

const route = useRoute()
const { dropListService } = useApiServices()
const searchKey = ref('shanghai')

const searchHeader = ref<HTMLElement>()
const currentPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStock[]>([])

const { height: searchHeaderHeight } = useElementBounding(searchHeader)

const search = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await dropListService(currentPage.value)

  if (response.data.data) {
    stocks.value.push(...response.data.data)

    if (response.data.data.length < 20) {
      isFinished.value = true
    }
    isLoading.value = false
    currentPage.value++
  } else {
    isFinished.value = true
  }
}

if (route.query.query?.toString()) {
  searchKey.value = route.query.query?.toString()
}

watch(
  () => route.query.query,
  () => {
    stocks.value = []
    search(1)
  }
)

onBeforeUnmount(() => {
  searchKey.value = 'shanghai'
})
</script>

<template>
  <div>
    <StockTable
      v-model:is-loading="isLoading"
      :stocks="stocks"
      :is-finished="isFinished"
      :offset-top="searchHeaderHeight"
      @load="search"
    />
  </div>
</template>

<style scoped></style>
