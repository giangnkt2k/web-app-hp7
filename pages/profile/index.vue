<script lang="ts" setup>
const userName = ref('User name')
const realName = ref('Real name')

</script>

<template>
  <div class="mx-5 mt-20">
    <div>
      <div class="flex">
        <van-image
          round
          width="5rem"
          height="5rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="ml-5 pt-2 pl-2">
          <h1> {{ userName }} </h1>
          <h3>{{ realName }}</h3>
        </div>
      </div>

      <div class="mt-10 p-3 bg-light-50 rounded-md">
        <div class="flex">
          <p>{{ $t('profile.totalAssets') }}</p>
          <van-icon name="eye-o" color="black" size="18" class="ml-3" />
        </div>
        <div class="my-3 text-2xl font-bold">
          593243.23
        </div>
        <div class="flex justify-between">
          <div>
            {{ $t('profile.available') }} 30000000
          </div>
          <div>
            {{ $t('profile.freeze') }} 231241414
          </div>
        </div>
      </div>

      <div class="mt-5 p-3 bg-light-50 rounded-md flex justify-center">
        <div class="border-r p-2 text-center">
          <div class="text-sm">
            Total market capitalization
          </div>
          <div class="text-xl font-bold">
            95514.00
          </div>
        </div>
        <div class="p-2 text-center">
          <div class="text-sm">
            Profit and loss of open positions
          </div>
          <div class="text-xl font-bold">
            44791.00
          </div>
        </div>
      </div>

      <div class="mt-5 mb-15 bg-light-50 rounded-md">
        <van-cell-group>
          <van-cell icon="records" title="Transaction history" is-link to="" />
          <van-cell icon="thumb-circle-o" title="My Subscription" is-link to="" />
          <van-cell icon="orders-o" title="Breakdown of funds" is-link to="" />
          <van-cell icon="peer-pay" title="Silver certificate transfer out" is-link to="" />
          <van-cell icon="description" title="Deposit" is-link to="profile/deposit" />
          <van-cell icon="cash-on-deliver" title="List of withdrawals" is-link to="" />
          <van-cell icon="contact" title="Real-name authentication" is-link to="profile/kyc" />
          <van-cell icon="browsing-history-o" title="Login password" is-link to="" />
          <van-cell icon="browsing-history" title="Withdrawal password" is-link to="" />
        </van-cell-group>
      </div>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
