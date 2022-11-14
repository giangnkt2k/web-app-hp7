<script lang="ts" setup>
import { IStock } from '~~/types/stock'
import { HotIndustry } from '~~/types/host-industry'

const { chinaIndexesService } = useApiServices()
const chinaIndexes = ref<IStock[]>([])
const hotIndustry = ref<HotIndustry[]>([])
const getChinaIndexes = async () => {
  const response = await chinaIndexesService()

  if (response.data && response.data.data) {
    chinaIndexes.value = response.data.data
  }
}
const getHotIndustry = () => {
  hotIndustry.value = [{
    Increase: 1,
    Increase_share: 1,
    plate: 'string',
    shares: 'string'
  },
  {
    Increase: 11,
    Increase_share: 11,
    plate: 'string1',
    shares: 'string1'
  },
  {
    Increase: 2,
    Increase_share: 2,
    plate: 'string2',
    shares: 'string2'
  }]
}
getHotIndustry()
getChinaIndexes()

</script>

<template>
  <div>
    <!-- <IndexQuotesList :indexes="chinaIndexes" /> -->
    <HotIndustryList :indexes="hotIndustry" />
    <HotIndustryList :indexes="hotIndustry" />
    <HotIndustryList :indexes="hotIndustry" />
    <HotIndustryList :indexes="hotIndustry" />
    <HotIndustryList :indexes="hotIndustry" />
  </div>
</template>

<style scoped></style>
