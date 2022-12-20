<script lang="ts" setup>
import { IPosition } from '~~/types/position'
import { IStock } from '~~/types/stock'

type Props = {
  position: IPosition;
  stock: IStock;
  isSellable?: boolean;
}

type Emits = {
  (event: 'sold'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { toMoneyFormat, showApiError, t } = useUtility()
const { $toast } = useNuxtApp()
const { sellStockLimitService } = useApiServices()

const isSelling = ref(false)

const pl = computed(() => props.stock.P * Number(props.position.quantity) - Number(props.position.price) * Number(props.position.quantity))
const plPercent = computed(() => toMoneyFormat(pl.value / (Number(props.position.price) * Number(props.position.quantity)) * 100))
const isLost = computed(() => pl.value < 0)

const sellStock = async () => {
  isSelling.value = true
  await sellStockLimitService(props.position.id).catch(() => {
    showApiError(t('stock-details.sell.fail'))
  })

  $toast.success(t('stock-details.sell.success'))
  isSelling.value = false
  emit('sold')
}
</script>

<template>
  <van-cell
    :clickable="!isSellable"
    :to="{name: $routesList.stockStockCode, params: {stockCode: stock.FS}}"
  >
    <van-row class="items-center">
      <van-col span="6">
        <div>
          {{ stock.N }}
        </div>
        <div class="text-xs text-gray-400 mt-1">
          {{ stock.FS }}
        </div>
      </van-col>

      <van-col
        span="9"
        class="text-center"
      >
        <template v-if="Number(position.quantity)">
          <div>{{ position.price }}</div>
          <div>{{ stock.P }}</div>
        </template>
        <template v-else>
          <div>{{ $t('position-table-item.subscription.cost') }}</div>
          <div>{{ position.price }}</div>
        </template>
      </van-col>
      <van-col
        :span="isSellable ? 5 : 9"
        class="text-right pr-2"
      >
        <template v-if="Number(position.quantity)">
          <div
            class="text-success"
            :class="{'text-danger': isLost}"
          >
            <div>{{ toMoneyFormat(pl) }}</div>
            <div>{{ plPercent }}%</div>
          </div>
        </template>
        <template v-else>
          {{ $t('position-table-item.daily-limit-subscription-in-progress') }}
        </template>
      </van-col>
      <van-col
        v-if="isSellable"
        span="4"
      >
        <van-button
          :loading="isSelling"
          class="w-full !bg-danger !text-white"
          @click.stop="sellStock"
        >
          {{ $t('stock-details.button.sell') }}
        </van-button>
      </van-col>
    </van-row>
  </van-cell>
</template>

<style scoped></style>
