<script lang="ts" setup>
import { IPosition } from '~~/types/position'

type Props = {
  offsetTop?: number
  isSellable?: boolean
  stockCode?: string
}

type Emits = {
  (event: 'reload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { positionsService, sellablePositionsService } = useApiServices()

const isFinished = useState(() => false)
const positions = useState<IPosition[]>(() => [])
const currentPage = useState(() => 1)

const getPositions = async (page?: number) => {
  isFinished.value = false
  currentPage.value = page ?? currentPage.value

  const response = await (props.isSellable && props.stockCode ? sellablePositionsService(props.stockCode) : positionsService(currentPage.value))

  if (response?.data) {
    // Set new positions
    positions.value.push(...response.data.data)

    isFinished.value = !!props.isSellable
    // If the result is smaller than 20. It means there's no more data
    if (response.data.data.length < 20) {
      isFinished.value = true
    }

    currentPage.value++
  } else {
    isFinished.value = true
  }

  return {
    positions: positions.value
  }
}

const removeItem = (index: number) => {
  positions.value.splice(index, 1)
  emit('reload')
}

const { pending, refresh } = await useAsyncData(() => getPositions())

onUnmounted(() => {
  isFinished.value = false
  positions.value = []
  currentPage.value = 1
})
</script>

<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-row class="text-xs py-2.5 bg-gray-100 px-4">
        <van-col span="6">
          {{ $t("position-list.headers.name") }}
        </van-col>
        <van-col span="9" class="text-center">
          {{ $t("position-list.headers.cost-price") }}
        </van-col>
        <van-col :span="isSellable ? 5 : 9" class="text-right pr-2">
          {{ $t("position-list.headers.profit-lost") }}
        </van-col>
      </van-row>
    </van-sticky>
    <van-list
      v-model:loading="pending"
      :finished="isFinished"
      :finished-text="$t('position-table.finished-text')"
      :loading-text="$t('position-table.loading-text')"
      @load="refresh"
    >
      <PositionTableItem
        v-for="(position, index) in positions"
        :key="index"
        :position="position"
        :stock="position.stock"
        :is-sellable="isSellable"
        @sold="removeItem(index)"
      />
    </van-list>
  </div>
</template>

<style scoped></style>
