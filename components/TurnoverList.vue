<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { searchStockService } = useApiServices()

const currentPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStock[]>([])

const getData = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await searchStockService(undefined, currentPage.value)

  if (response.data) {
    stocks.value.push(...response.data)

    if (response.data.length < 20) {
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
      :is-finished="isFinished"
      :offset-top="0"
      @load="getData"
    />
  </div>
</template>

<style scoped></style>
