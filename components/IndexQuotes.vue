<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { chinaIndexesService } = useApiServices()
const chinaIndexes = ref<IStock[]>([])
const getChinaIndexes = async () => {
  const response = await chinaIndexesService()

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
