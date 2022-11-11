<template>
  <div>
    <div class="market__title text-center text-light-50 font-bold text-xl">
      Market
    </div>
    <SearchBar />
    <van-tabs v-model:active="activeName" color="#ffe100" lazy-render>
      <van-tab title="指数行情" name="IndexQuotes">
        <IndexQuotes />
      </van-tab>
      <van-tab title="沪深" name="CnQuotation">
        content of tab 2
      </van-tab>
      <van-tab title="振幅榜" name="Amplitube">
        content of tab 3
      </van-tab>
      <van-tab title="换手率" name="TurnOver">
        content of tab 3
      </van-tab>
      <van-tab title="涨幅榜" name="RiseRank">
        content of tab 3
      </van-tab>
      <van-tab title="跌幅榜" name="FallRank">
        content of tab 3
      </van-tab>
    </van-tabs>

    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
const activeName = ref('IndexQuotes')
watch(
  () => activeName,
  () => {
    // eslint-disable-next-line no-console
    getIndex()
  }
)
const getIndex = () => {
  // eslint-disable-next-line no-console
  console.log('getaaaa')
}
</script>
<style lang="scss" scoped>
.market__title {
  background-color: #ffe100;
  height: 46px;
  line-height: 46px;
}
</style>
