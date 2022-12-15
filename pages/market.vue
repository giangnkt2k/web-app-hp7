<template>
  <div>
    <TheHeader :title="$t('page.market')" />
    <SearchBar />
    <van-tabs v-model:active="activeName" color="#ffe100">
      <van-tab :title="$t('page.market.indexMarket')" :name="MarketPageTabs.INDEX_QUOTES">
        <IndexQuotesList :indexes="chinaIndexes" />
      </van-tab>
      <van-tab :title="$t('page.market.shanghaiAndShenzhen')" :name="MarketPageTabs.CHINA_STOCKS">
        <CnQuotation />
      </van-tab>
      <van-tab :title="$t('page.market.amplitudeList')" :name="MarketPageTabs.AMPLITUDE">
        <AmplitudeList />
      </van-tab>
      <van-tab :title="$t('page.market.turnoverRate')" :name="MarketPageTabs.TURNOVER">
        <TurnoverList />
      </van-tab>
      <van-tab :title="$t('page.market.gainList')" :name="MarketPageTabs.UP">
        <GainList />
      </van-tab>
      <van-tab :title="$t('page.market.dropList')" :name="MarketPageTabs.DOWN">
        <DropList />
      </van-tab>
    </van-tabs>

    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
import { MarketPageTabs } from '~~/types/market'
import { IStock } from '~~/types/stock'

const { searchStockService } = useApiServices()
const route = useRoute()

const chinaIndexes = useState<IStock[]>(() => [])
const activeName = useState(() => route.query.tab?.toString() || MarketPageTabs.INDEX_QUOTES)

const getChinaIndexes = async () => {
  const response = await searchStockService(undefined, undefined, 3)

  if (response?.data && response.data.data) {
    chinaIndexes.value = response.data.data
  }

  return response.data.data
}

await useAsyncData(getChinaIndexes)
</script>
<style lang="scss" scoped>
</style>
