<script lang="ts" setup>
import { KLineData } from 'klinecharts'
import { ChartType } from '~~/types/chart'
import { IPosition } from '~~/types/position'
import { IStock, IStockKlineData } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.stock-details.title'
})

const { $dayjs } = useNuxtApp()
const { stockDetailsService, stockKlineDataService } = useApiServices()
const route = useRoute()
const { toMoneyFormat } = useUtility()
const selectedTimeRange = useSelectedTimeRange()

const stockDetails = ref<IStock>()
const userHold = ref<IPosition | null>(null)
const stockKlineData = ref<IStockKlineData[]>([])

const stockCode = computed(() => route.params.stockCode.toString())
const canSell = computed(() => !!userHold.value && (Number(userHold.value.count || 0) - Number(userHold.value.count_today || 0)) > 0)
const isDown = computed(() => (stockDetails.value?.ZF || 0) < 0)
const klineData = computed<KLineData[]>(() => [...stockKlineData.value.map(data => ({
  close: data.C,
  high: data.H,
  low: data.L,
  open: data.O,
  timestamp: $dayjs.unix(data.Tick).valueOf(),
  volume: data.V,
  turnover: data.A
}))])
const chartType = computed(() =>
  selectedTimeRange.value === 'line' ? ChartType.AREA : ChartType.CANDLE_SOLID
)

const getStockDetails = async () => {
  const response = await stockDetailsService(stockCode.value)

  if (response.data?.data) {
    stockDetails.value = response.data.data
    userHold.value = response.data.hold
  }
}

const getStockKline = async () => {
  stockKlineData.value = []
  const response = await stockKlineDataService(stockCode.value, selectedTimeRange.value === 'line' ? '5M' : selectedTimeRange.value)

  if (response.data?.data) {
    stockKlineData.value = response.data.data
  }
}

const init = () => {
  getStockDetails()
  getStockKline()
}

init()

onUnmounted(() => {
  selectedTimeRange.value = '15M'
})
</script>

<template>
  <div>
    <van-sticky>
      <TheHeader />
    </van-sticky>

    <van-row class="p-3 text-xs">
      <van-col span="24" class="text-28px font-bold text-success" :class="{'text-danger': isDown}">
        {{ stockDetails?.P }}
      </van-col>
      <van-col span="24" class="font-bold mt-2 text-success font-normal" :class="{'text-danger': isDown}">
        <div class="flex items-center">
          <van-icon class-prefix="vicon" :name="isDown ? 'arrow-down' : 'arrow-up'" />
          <div>
            {{ toMoneyFormat((stockDetails?.P || 0) - (stockDetails?.YC || 0)) }} <span class="ml-3">[{{ toMoneyFormat(stockDetails?.ZF || '') }}%]</span>
          </div>
        </div>
      </van-col>

      <van-col span="8">
        <div>{{ $t('page.stock-details.high') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.H || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8">
        <div>{{ $t('page.stock-details.low') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.L || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8" class="text-right mb-3">
        <div>{{ $t('page.stock-details.volume') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.V || 0, '0,0') }}</div>
      </van-col>

      <van-col span="8">
        <div>{{ $t('page.stock-details.open') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.O || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8">
        <div>{{ $t('page.stock-details.turnover-rate') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.HS || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8" class="text-right mb-3">
        <div>{{ $t('page.stock-details.total-market-cap') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.ZS || 0, '0,0') }}</div>
      </van-col>

      <van-col span="8">
        <div>{{ $t('page.stock-details.close') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.YC || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8">
        <div>{{ $t('page.stock-details.turnover') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.A || 0, '0,0') }}</div>
      </van-col>
      <van-col span="8" class="text-right mb-3">
        <div>{{ $t('page.stock-details.circulation-market-cap') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.LS || 0, '0,0') }}</div>
      </van-col>

      <van-col span="8">
        <div>{{ $t('page.stock-details.p-b-ratio') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.SJ || 0, '0,0') }}%</div>
      </van-col>
      <van-col span="8" />
      <van-col span="8" class="text-right mb-3">
        <div>{{ $t('page.stock-details.total-share-capital') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.Z || 0, '0,0') }}</div>
      </van-col>

      <van-col span="8">
        <div>{{ $t('page.stock-details.amplitude') }}</div>
        <div>{{ stockDetails?.VF }}</div>
      </van-col>
      <van-col span="8" />
      <van-col span="8" class="text-right mb-3">
        <div>{{ $t('page.stock-details.outstanding-share-captial') }}</div>
        <div>{{ toMoneyFormat(stockDetails?.Z2 || 0, '0,0') }}</div>
      </van-col>
    </van-row>

    <van-row class="px-3">
      <van-col span="24" class="!min-h-300px">
        <KLineChart :data="klineData" :chart-type="chartType" @reload="getStockKline" />
      </van-col>
    </van-row>

    <van-row class="p-3">
      <van-col span="12" class="mb-1">
        {{ $t('page.stock-details.buy-1') }}: {{ stockDetails?.B1 }}
      </van-col>
      <van-col span="12">
        {{ $t('page.stock-details.sell-1') }}: {{ stockDetails?.S1 }}
      </van-col>

      <van-col span="12" class="mb-1">
        {{ $t('page.stock-details.buy-2') }}: {{ stockDetails?.B2 }}
      </van-col>
      <van-col span="12">
        {{ $t('page.stock-details.sell-2') }}: {{ stockDetails?.S2 }}
      </van-col>

      <van-col span="12" class="mb-1">
        {{ $t('page.stock-details.buy-3') }}: {{ stockDetails?.B3 }}
      </van-col>
      <van-col span="12">
        {{ $t('page.stock-details.sell-3') }}: {{ stockDetails?.S3 }}
      </van-col>

      <van-col span="12" class="mb-1">
        {{ $t('page.stock-details.buy-4') }}: {{ stockDetails?.B4 }}
      </van-col>
      <van-col span="12">
        {{ $t('page.stock-details.sell-4') }}: {{ stockDetails?.S4 }}
      </van-col>

      <van-col span="12" class="mb-1">
        {{ $t('page.stock-details.buy-5') }}: {{ stockDetails?.B5 }}
      </van-col>
      <van-col span="12">
        {{ $t('page.stock-details.sell-5') }}: {{ stockDetails?.S5 }}
      </van-col>
    </van-row>

    <van-sticky position="bottom">
      <van-row class="p-2 bg-white shadow-light-900" gutter="12">
        <van-col :span="canSell ? 12 : 24">
          <van-button block class="!bg-success !text-white !rounded-md" size="small">
            {{ $t('stock-details.button.buy') }}
          </van-button>
        </van-col>
        <van-col v-if="canSell" span="12">
          <van-button block class="!bg-danger !text-white !rounded-md">
            {{ $t('stock-details.button.sell') }}
          </van-button>
        </van-col>
      </van-row>
    </van-sticky>
  </div>
</template>

<style scoped></style>
