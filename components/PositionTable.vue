<script lang="ts" setup>
import { IPosition, IPositionRestocks } from '~~/types/position'

type Props = {
  offsetTop?: number
}

defineProps<Props>()

const { positionsService } = useApiServices()

const isLoading = ref(false)
const isFinished = ref(false)
const positions = ref<IPosition[]>([])
const restocks = ref<IPositionRestocks>({})
const currentPage = ref(1)

const getPositions = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await positionsService(currentPage.value)

  // Set restocks
  if (response.data?.reStocks) {
    restocks.value = {
      ...restocks.value,
      ...response.data.reStocks
    }
  }

  // Set new positions
  if (response.data?.data?.data) {
    positions.value.push(...response.data.data.data)

    // If the result is smaller than 20. It means there's no more data
    if (response.data.data.data.length < 20) {
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
    <van-sticky :offset-top="offsetTop">
      <van-row class="text-xs py-2.5 bg-gray-100 px-4">
        <van-col span="6">
          {{ $t("position-list.headers.name") }}
        </van-col>
        <van-col span="6" class="text-center">
          {{ $t("position-list.headers.open-available") }}
        </van-col>
        <van-col span="6" class="text-center">
          {{ $t("position-list.headers.cost-price") }}
        </van-col>
        <van-col span="6" class="text-right">
          {{ $t("position-list.headers.profit-lost") }}
        </van-col>
      </van-row>
    </van-sticky>
    <van-list
      v-model:loading="isLoading"
      :finished="isFinished"
      :finished-text="$t('position-table.finished-text')"
      :loading-text="$t('position-table.loading-text')"
      @load="getPositions"
    >
      <PositionTableItem v-for="(position, index) in positions" :key="index" :position="position" :stock="restocks[position.p_code]" />
    </van-list>
  </div>
</template>

<style scoped></style>
