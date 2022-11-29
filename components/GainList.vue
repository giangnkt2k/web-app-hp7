<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { searchStockService } = useApiServices()

const currentPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStock[]>([])

const search = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await searchStockService(undefined, currentPage.value)

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

</script>

<template>
  <div>
    <StockTable
      v-model:is-loading="isLoading"
      :stocks="stocks"
      :offset-top="0"
      :is-finished="isFinished"
      @load="search"
    />
  </div>
</template>

<style scoped></style>
