<script lang="ts" setup>
import { KLineData } from 'klinecharts'
import { storeToRefs } from 'pinia'
import { ChartType } from '~~/types/chart'
import { UserHolding } from '~~/types/position'
import { IBuyStockReqBody, IStock, IStockKlineData } from '~~/types/stock'
import { useAuthenticationStore } from '~~/stores/authentication'

definePageMeta({
  pageTitle: 'page.stock-details.title'
})

const { $dayjs, $toast, $t } = useNuxtApp()
const { stockDetailsService, stockKlineDataService, buyingStockLimitService } = useApiServices()

const route = useRoute()
const { toMoneyFormat } = useUtility()
const selectedTimeRange = useSelectedTimeRange()

const userStore = useAuthenticationStore()
const { getUserData } = userStore

const { userInformation } = storeToRefs(userStore)

const stockDetails = ref<IStock>()
const userHold = ref<UserHolding | null>(null)
const stockKlineData = ref<IStockKlineData[]>([])
const isShowPopUpBuy = ref(false)
const buyQuantity = ref(100)
const isShowPopUpSell = ref(false)
const currentPrice = ref(0)
const checkedBuyQuantity = ref('')
const availableToBuy = ref(0)
const availableToSell = ref(0)
const isBuying = ref(false)

const stockCode = computed(() => route.params.stockCode.toString())
const canSell = computed(() => !!userHold.value && (Number(userHold.value.total_count || 0) - Number(userHold.value.today_count || 0)) > 0)
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
const ceilingPrice = computed(() =>
  toMoneyFormat(stockDetails.value?.ZT || ((stockDetails.value?.YC || 0) + ((stockDetails.value?.YC || 0) * 0.1)))
)
const floorPrice = computed(() =>
  toMoneyFormat(stockDetails.value?.DT || ((stockDetails.value?.YC || 0) - ((stockDetails.value?.YC || 0) * 0.1)))
)

watch(
  () => checkedBuyQuantity.value,
  (value) => {
    switch (value) {
      case 'all':
        buyQuantity.value = availableToBuy.value
        break
      case 'half':
        buyQuantity.value = availableToBuy.value / 2
        break
      case '1/3':
        buyQuantity.value = availableToBuy.value / 3
        break
      case '1/4':
        buyQuantity.value = availableToBuy.value / 4
        break
      default:
        break
    }
  }
)

const getStockDetails = async () => {
  const response = await stockDetailsService(stockCode.value)

  if (response?.data) {
    stockDetails.value = response.data.stock_data
    currentPrice.value = stockDetails.value.P
    userHold.value = response.data.user_holding
  }
}

const getStockKline = async () => {
  stockKlineData.value = []
  const response = await stockKlineDataService(stockCode.value, selectedTimeRange.value === 'line' ? '5M' : selectedTimeRange.value)
  if (response.data) {
    stockKlineData.value = response.data
    stockKlineData.value.reverse()
  }
}

const openPopupBuyStock = () => {
  isShowPopUpBuy.value = true
  const balanceUser = Number(userInformation.value?.balance_avail)
  availableToBuy.value = 100 * (Math.floor(Number(Math.floor(balanceUser / currentPrice.value).toFixed(2)) / 100)) || 0
}

const openPopupSellStock = () => {
  isShowPopUpSell.value = true
  availableToSell.value = Number(userHold.value?.total_count || 0) - Number(userHold.value?.today_count || 0)
}

const buyStock = async () => {
  isBuying.value = true
  const payload: IBuyStockReqBody = {
    quantity: buyQuantity.value,
    stockCode: stockDetails.value?.FS || ''
  }
  await buyingStockLimitService(payload).catch(() => {
    $toast.fail({
      message: $t('stock-details.bought.fail')
    })
  })

  init()

  $toast.success({
    message: $t('stock-details.bought.success')
  })

  isBuying.value = false
  isShowPopUpBuy.value = false
}

const init = () => {
  getUserData()
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
          <van-button block class="!bg-success !text-white !rounded-md" size="small" @click="openPopupBuyStock">
            {{ $t('stock-details.button.buy') }}
          </van-button>
        </van-col>
        <van-col v-if="canSell" span="12">
          <van-button block class="!bg-danger !text-white !rounded-md" size="small" @click="openPopupSellStock">
            {{ $t('stock-details.button.sell') }}
          </van-button>
        </van-col>
      </van-row>
      <!-- Buy  -->
      <van-popup
        v-model:show="isShowPopUpBuy"
        closeable
        round
        close-icon="close"
        position="bottom"
      >
        <div class="font-bold text-xl text-center my-3">
          {{ $t('stock-details.button.buy') }}
        </div>
        <div class="px-3 py-4">
          <div>
            <span class="text-lg pr-1">{{ stockDetails?.N }} </span>
            <span class="font-light">{{ stockDetails?.C }}</span>
          </div>
          <div class="text-xs">
            <span>
              {{ $t('stock-details.buy.ceilingPrice') }}: {{ ceilingPrice }}
            </span>
            &nbsp;&nbsp;
            <span>
              {{ $t('stock-details.buy.floorPrice') }}: {{ floorPrice }}
            </span>
          </div>
        </div>
        <div>
          <van-cell-group inset>
            <van-field v-model="currentPrice" type="text" readonly :label="$t('stock-details.buy.currentPrice')" />
            <div class="van-cell van-field">
              <span class="van-cell__title van-field__label">{{ $t('stock-details.buy.fast') }}</span>
              <van-stepper v-model="buyQuantity" min="100" step="100" />
            </div>
            <div class="van-cell van-field">
              <van-radio-group v-model="checkedBuyQuantity" direction="horizontal" :max="1">
                <van-radio name="all">
                  {{ $t('stock-details.buy.fullPosition') }}
                </van-radio>
                <van-radio name="half">
                  {{ $t('stock-details.buy.halfWarehouse') }}
                </van-radio>
                <van-radio name="1/3">
                  1/3
                </van-radio>
                <van-radio name="1/4">
                  1/4
                </van-radio>
              </van-radio-group>
            </div>
          </van-cell-group>

          <div class="px-3 py-4">
            {{ $t('stock-details.buy.availableToBuy') }}{{ availableToBuy }}
          </div>

          <div class="px-3 py-2">
            <van-button
              :disabled="availableToBuy < 1"
              type="success"
              round
              block
              size="small"
              :loading="isBuying"
              @click="buyStock"
            >
              {{ $t('stock-details.buy.buyLimitBoard') }}
            </van-button>
          </div>
        </div>
      </van-popup>
      <!-- Sell -->
      <van-popup
        v-model:show="isShowPopUpSell"
        closeable
        round
        close-icon="close"
        position="bottom"
      >
        <div class="font-bold text-xl text-center my-3">
          {{ $t('sell.title') }}
        </div>

        <div>
          <PositionTable is-sellable :stock-code="stockCode" @reload="init" />
        </div>
      </van-popup>
    </van-sticky>
  </div>
</template>

<style lang="scss" scoped>
:deep(.van-popup) {
  background-color: #f7f8fa;
}
</style>
