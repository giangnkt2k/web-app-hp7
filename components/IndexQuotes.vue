<script lang="ts" setup>
import { IStock } from '~~/types/stock'
import { HotIndustry, HotSpot } from '~~/types/market'

const { chinaIndexesService, hotIndustryService, hotConceptService, hotSpotService } = useApiServices()
const chinaIndexes = ref<IStock[]>([])
const hotIndustry = ref<HotIndustry[]>([])
const hotConcept = ref<HotIndustry[]>([])
const hotSpot = ref<HotSpot[]>([])
const getChinaIndexes = async () => {
  const response = await chinaIndexesService()

  if (response.data && response.data.data) {
    chinaIndexes.value = response.data.data
  }
}
const getHotIndustry = async () => {
  const response = await hotIndustryService()

  if (response.data && response.data.data) {
    hotIndustry.value = response.data.data
  }
}
const getHotConcept = async () => {
  const response = await hotConceptService()

  if (response.data && response.data.data) {
    hotConcept.value = response.data.data
  }
}
const getHotSpot = async () => {
  const response = await hotSpotService()

  if (response.data && response.data.data) {
    hotSpot.value = response.data.data
  }
}
getHotIndustry()
getChinaIndexes()
getHotConcept()
getHotSpot()

</script>

<template>
  <div>
    <IndexQuotesList :indexes="chinaIndexes" />
    <HotIndustryList :indexes="hotIndustry" :title="'page.market.hotIndustry'" />
    <HotIndustryList :indexes="hotConcept" :title="'page.market.hotConcept'" />
    <HotSpotList :indexes="hotSpot" :title="'page.market.hotSpot'" />
  </div>
</template>

<style scoped></style>
