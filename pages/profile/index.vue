<script lang="ts" setup></script>

<template>
  <div>
    <div class="mx-5 mt-20">
      <div class="flex">
        <van-image
          round
          width="5rem"
          height="5rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="ml-5">
          <h1> hahaa </h1>
          <h3>Real name</h3>
        </div>
      </div>

      <div class="mt-10 p-3 bg-light-50 rounded-md">
        <div class="flex">
          <p>Total assets</p>
          <van-icon name="eye-o" color="black" size="18" class="ml-3" />
        </div>
        <div class="my-3 text-2xl font-bold">
          593243.23
        </div>
        <div class="flex justify-between">
          <div>
            Availiable: 30000000
          </div>
          <div>
            Freeze: 231241414
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
          <van-cell icon="description" title="Deposit list" is-link to="" />
          <van-cell icon="cash-on-deliver" title="List of withdrawals" is-link to="" />
          <van-cell icon="contact" title="Real-name authentication" is-link to="profile/kyc" />
          <van-cell icon="browsing-history-o" title="Login password" is-link to="" />
          <van-cell icon="browsing-history" title="Withdrawal password" is-link to="" />
        </van-cell-group>
      </div>

      <TheBottomNavigation />
    </div>
  </div>
</template>

<style scoped></style>
