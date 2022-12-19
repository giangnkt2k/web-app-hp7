<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { searchStockService } = useApiServices()
const chinaIndexes = useState<IStock[]>(() => [])

const getChinaIndexes = async () => {
  const response = await searchStockService(undefined, undefined, 3)

  if (response?.data) {
    chinaIndexes.value = response.data
  }

  return response.data
}

await useAsyncData(getChinaIndexes)

</script>

<template>
  <IndexQuotesList :indexes="chinaIndexes" />
</template>

<style scoped></style>
