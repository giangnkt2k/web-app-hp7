<template>
  <div>
    <TheHeader :title="$t('page.market')" />
    <SearchBar />
    <van-tabs v-model:active="activeName" color="#ffe100" lazy-render>
      <van-tab :title="$t('page.market.indexMarket')" :name="MarketPageTabs.INDEX_QUOTES">
        <IndexQuotes />
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

const route = useRoute()
const activeName = ref(route.query.tab?.toString() || MarketPageTabs.INDEX_QUOTES)

</script>
<style lang="scss" scoped>
</style>
