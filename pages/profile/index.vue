<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '~~/stores/authentication'

const userStore = useAuthenticationStore()
const { userInformation } = storeToRefs(userStore)
const router = useRouter()

const accessToken = useAccessToken()

const logout = () => {
  accessToken.value = ''
  router.push('login')
}
</script>

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
        <div class="ml-5 pt-2 pl-2">
          <h1> {{ userInformation?.loginname || '' }} </h1>
          <h3>{{ userInformation?.realname || '' }}</h3>
        </div>
      </div>

      <div class="mt-10 p-3 bg-light-50 rounded-md">
        <div class="flex">
          <p>{{ $t('profile.totalAssets') }}</p>
          <van-icon name="eye-o" color="black" size="18" class="ml-3" />
        </div>
        <div class="my-3 text-2xl font-bold">
          {{ userInformation?.balance || '' }}
        </div>
        <div class="flex justify-between">
          <div>
            {{ $t('profile.available') }} {{ userInformation?.balance_avail || '' }}
          </div>
          <div>
            {{ $t('profile.freeze') }} {{ userInformation?.balance_frozen || 0 }}
          </div>
        </div>
      </div>

      <van-grid :column-num="2" class="mt-5 rounded-md ">
        <van-grid-item>
          <div class="p-2 text-center">
            <div class="text-sm">
              {{ $t('profile.totalMarketCapitalization') }}
            </div>
            <div class="text-xl font-bold">
              {{ userInformation?.hold_value || '' }}
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="p-2 text-center">
            <div class="text-sm">
              {{ $t('profile.profitAndLoss') }}
            </div>
            <div class="text-xl font-bold">
              {{ userInformation?.profit || '' }}
            </div>
          </div>
        </van-grid-item>
      </van-grid>

      <div class="mt-5 mb-5 bg-light-50 rounded-md">
        <van-cell-group>
          <van-cell icon="records" title="Transaction history" is-link to="" />
          <van-cell icon="thumb-circle-o" title="My Subscription" is-link to="" />
          <van-cell icon="orders-o" title="Breakdown of funds" is-link to="" />
          <van-cell icon="peer-pay" :title="$t('profile.cell.silverCertificateTransferOut')" is-link to="profile/withdraw-money" />
          <van-cell icon="description" title="Deposit" is-link to="profile/deposit" />
          <van-cell icon="cash-on-deliver" title="List of withdrawals" is-link to="" />
          <van-cell icon="contact" title="Real-name authentication" is-link to="profile/kyc" />
          <van-cell icon="browsing-history-o" :title="$t('profile.change-password.tab')" is-link to="profile/change-password" />
          <van-cell icon="browsing-history" :title="$t('profile.change-withdrawal-password.tab')" is-link to="profile/change-withdrawal-password" />
        </van-cell-group>
      </div>
      <div class=" mb-20">
        <van-button hairline block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="logout">
          Logout
        </van-button>
      </div>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
