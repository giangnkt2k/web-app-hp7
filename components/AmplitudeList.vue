<script lang="ts" setup>
import { IStock } from '~~/types/stock'

const { amplitudeListService } = useApiServices()

const currentPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStock[]>([])

const getData = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await amplitudeListService(currentPage.value)

  if (response.data.data) {
    const rawData = response.data.data

    if (rawData.length > 0) {
      const tempData = rawData.map((item) => {
        return {
          N: item.name,
          FS: item.scode,
          P: item.price,
          ZF: item.Increase,
          M: '',
          S: '',
          C: '',
          NV: 0,
          Tick: 0,
          B1: 0,
          B2: 0,
          B3: 0,
          B4: 0,
          B5: 0,
          B1V: 0,
          B2V: 0,
          B3V: 0,
          B4V: 0,
          B5V: 0,
          S1: 0,
          S2: 0,
          S3: 0,
          S4: 0,
          S5: 0,
          S1V: 0,
          S2V: 0,
          S3V: 0,
          S4V: 0,
          S5V: 0,
          ZT: 0,
          DT: 0,
          O: 0,
          H: 0,
          L: 0,
          YC: 0,
          A: 0,
          V: 0,
          OV: 0,
          IV: 0,
          SY: 0,
          SJ: 0,
          HS: 0,
          ZS: 0,
          LS: 0,
          Z: 0,
          Z2: 0,
          VF: 0,
          JS: 0,
          YJS: 0,
          HD: 0,
          YHD: 0,
          AVP: 0,
          SY2: 0,
          QJ: 0,
          QR: '',
          MT: 0
        }
      })
      stocks.value.push(...tempData)
    }

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
      :is-finished="isFinished"
      :offset-top="0"
      @load="getData"
    />
  </div>
</template>

<style scoped></style>
