<script lang="ts" setup>
import { IStock } from '~~/types/stock'
// import { HotIndustry } from '~~/types/host-industry'

const { chinaIndexesService } = useApiServices()
const chinaIndexes = ref<IStock[]>([])
// const hotIndustry = ref<HotIndustry[]>([])
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
    <!-- <HotIndustry :indexes="hotIndustry" /> -->
  </div>
</template>

<style scoped></style>
