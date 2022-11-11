<script lang="ts" setup>
import { IPosition } from '~~/types/position'
import { IStock } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.stock-details.title'
})

const { stockDetailsService } = useApiServices()
const route = useRoute()

const stockDetails = ref<IStock>()
const userHold = ref<IPosition | null>(null)

const stockCode = computed(() => route.params.stockCode.toString())
const canSell = computed(() => !!userHold.value && (Number(userHold.value.count || 0) - Number(userHold.value.count_today || 0)) > 0)

const getStockDetails = async () => {
  const response = await stockDetailsService(stockCode.value)

  if (response.data?.data) {
    stockDetails.value = response.data.data
    userHold.value = response.data.hold
  }
}

const init = () => {
  getStockDetails()
}

init()
</script>

<template>
  <div>
    {{ canSell }}
    <van-sticky>
      <TheHeader />
    </van-sticky>
  </div>
</template>

<style scoped></style>
