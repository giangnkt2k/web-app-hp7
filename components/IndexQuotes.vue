<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { searchStockService } = useApiServices()
const chinaIndexes = ref<IStock[]>([])
const getChinaIndexes = async () => {
  const response = await searchStockService(undefined, undefined, 3)

  if (response.data && response.data.data) {
    chinaIndexes.value = response.data.data
  }
}
getChinaIndexes()

</script>

<template>
  <div>
    <IndexQuotesList :indexes="chinaIndexes" />
  </div>
</template>

<style scoped></style>
