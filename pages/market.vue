<template>
  <div>
    <TheHeader :title="$t('page.market')" />
    <SearchBar />
    <van-tabs v-model:active="activeName" color="#ffe100" lazy-render>
      <van-tab :title="$t('page.market.indexMarket')" name="IndexQuotes">
        <IndexQuotes />
      </van-tab>
      <van-tab :title="$t('page.market.shanghaiAndShenzhen')" name="CnQuotation">
        <CnQuotation />
      </van-tab>
      <van-tab :title="$t('page.market.amplitudeList')" name="Amplitube">
        content of tab 3
      </van-tab>
      <van-tab :title="$t('page.market.turnoverRate')" name="TurnOver">
        content of tab 3
      </van-tab>
      <van-tab :title="$t('page.market.gainList')" name="RiseRank">
        content of tab 3
      </van-tab>
      <van-tab :title="$t('page.market.dropList')" name="FallRank">
        content of tab 3
      </van-tab>
    </van-tabs>

    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
const activeName = ref('IndexQuotes')

</script>
<style lang="scss" scoped>
</style>
