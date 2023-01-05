<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '~~/stores/authentication'
import { IBlockDeal, COMMON_STATUS } from '~~/types/block-deal'

const { getBlockDealService, buyingBlockStockService } = useApiServices()
const { convertTimeStampToDate } = useUtility()
const { $toast, $t } = useNuxtApp()

const userStore = useAuthenticationStore()
const { getUserData } = userStore
const { userInformation } = storeToRefs(userStore)

const blockDeals = ref<IBlockDeal[]>([])
const activeBlockDetail = ref([])
const isShowPopUpBuy = ref(false)
const availableToBuy = ref(0)
const currentBlockStock = ref<IBlockDeal>()
const buyQuantity = ref(0)
const isBuying = ref(false)

const getBlockDealList = async () => {
  const res = await getBlockDealService()
  blockDeals.value = res.data.data
  // eslint-disable-next-line no-console
  console.log(blockDeals.value)
}

const openPopupBuyStock = (item: IBlockDeal) => {
  isShowPopUpBuy.value = true
  currentBlockStock.value = item
  buyQuantity.value = item.quantity
  const balanceUser = Number(userInformation.value?.balance_avail)
  availableToBuy.value = 100 * (Math.floor(Number(Math.floor(balanceUser / item.stock_detail.P).toFixed(2)) / 100)) || 0
}

const buyBlockDeal = async (item?: IBlockDeal) => {
  const res = await buyingBlockStockService({
    stock_code: item?.stock_code,
    trx_key: item?.trx_key,
    quantity: buyQuantity.value
  })
  if (res.status === 201) {
    init()
    $toast.success({
      message: $t('stock-details.bought.success')
    })
  } else {
    $toast.fail({
      message: $t('stock-details.bought.fail')
    })
  }

  isBuying.value = false
  isShowPopUpBuy.value = false
}
const init = () => {
  getUserData()
}
init()
getBlockDealList()
</script>

<template>
  <div>
    <TheHeader :title="$t('quick-access.items.big-deal')" />
    <SearchBar />
    <div class="my-1">
      <van-collapse
        v-for="(item, index) in blockDeals"
        :key="index"
        v-model="activeBlockDetail"
      >
        <van-collapse-item
          :title="`${item.stock_name} ${item.stock_code}`"
          :name="index"
        >
          <van-cell-group>
            <van-cell
              :title="$t('page.profile.deposit.status')"
              :value="item.status"
            >
              <template #value>
                <van-tag type="primary">
                  {{ item.status }}
                </van-tag>
              </template>
            </van-cell>
            <van-cell
              :title="$t('stock-details.buy.quantity')"
              :value="item.quantity"
            />
            <van-cell
              :title="$t('stock-list.headers.price')"
              :value="item.quantity * Number(item.stock_detail.P)"
            />
            <van-cell
              :title="$t('page.block-stock.start-time')"
              :value="convertTimeStampToDate(item.start_time)"
            />
            <van-cell
              :title="$t('page.block-stock.end-time')"
              :value="convertTimeStampToDate(item.end_time)"
            />
            <van-cell v-if="item.status === COMMON_STATUS.OPENING">
              <van-button
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                block
                @click="openPopupBuyStock(item)"
              >
                {{ $t('stock-details.button.buy') }}
              </van-button>
            </van-cell>
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </div>
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
          <span class="text-lg pr-1">{{ currentBlockStock?.stock_detail?.N }} </span>
          <span class="font-light">{{ currentBlockStock?.stock_detail?.C }}</span>
        </div>
      </div>
      <div>
        <van-cell-group inset>
          <van-field
            :model-value="currentBlockStock?.stock_detail.P"
            type="text"
            readonly
            :label="$t('stock-details.buy.currentPrice')"
          />
          <div class="van-cell van-field">
            <span class="van-cell__title van-field__label">{{ $t('stock-details.buy.fast') }}</span>
            <van-stepper
              v-model="buyQuantity"
              :min="currentBlockStock?.quantity"
              step="100"
            />
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
            @click="buyBlockDeal(currentBlockStock)"
          >
            {{ $t('stock-details.buy.buyLimitBoard') }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<style scoped></style>
