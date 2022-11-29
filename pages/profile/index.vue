<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '~~/stores/authentication'

const userStore = useAuthenticationStore()
const { userInformation } = storeToRefs(userStore)
const router = useRouter()
const accessToken = useAccessToken()

const isHiddenBalance = ref(false)

const hiddenBalance = () => {
  isHiddenBalance.value = !isHiddenBalance.value
}

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
          src="~/public/img/default_avatar.jpg"
        />
        <div class="ml-5 pt-2 pl-2">
          <h1> {{ userInformation?.username || '' }} </h1>
          <h3>{{ userInformation?.real_name || '' }}</h3>
        </div>
      </div>
      <div class="mt-10 p-3 bg-light-50 rounded-md">
        <div class="flex">
          <p>{{ $t('profile.totalAssets') }}</p>
          <van-icon :name="isHiddenBalance ? 'eye-o': 'closed-eye'" color="black" size="18" class="ml-3" @click="hiddenBalance" />
        </div>
        <div class="my-3 text-2xl font-bold">
          <span v-if="isHiddenBalance">{{ userInformation?.balance || '' }}</span>
          <span v-else>******</span>
        </div>
        <div class="flex">
          <div>
            {{ $t('profile.available') }}
            <span v-if="isHiddenBalance">  {{ userInformation?.balance_avail || '' }} </span>
            <span v-else>******</span>
          </div>
          <div class="pl-6">
            {{ $t('profile.freeze') }}
            <span v-if="isHiddenBalance"> {{ userInformation?.balance_frozen || 0 }} </span>
            <span v-else>******</span>
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
              <span v-if="isHiddenBalance">{{ userInformation?.hold_value || '' }}</span>
              <span v-else>******</span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="p-2 text-center">
            <div class="text-sm">
              {{ $t('profile.profitAndLoss') }}
            </div>
            <div class="text-xl font-bold">
              <span v-if="isHiddenBalance">{{ userInformation?.profit || '' }} </span>
              <span v-else>******</span>
            </div>
          </div>
        </van-grid-item>
      </van-grid>

      <div class="mt-5 mb-5 bg-light-50 rounded-md">
        <van-cell-group>
          <van-cell icon="records" :title="$t('profile.transaction-history.tab')" is-link to="" />
          <van-cell icon="thumb-circle-o" :title="$t('profile.my-subscription.tab')" is-link to="" />
          <van-cell icon="orders-o" :title="$t('profile.breakdown-of-funds.tab')" is-link to="" />
          <van-cell icon="peer-pay" :title="$t('profile.cell.silverCertificateTransferOut')" is-link to="profile/withdraw-money" />
          <van-cell icon="description" :title="$t('profile.deposit.tab')" is-link to="profile/deposit" />
          <van-cell icon="cash-on-deliver" :title="$t('profile.list-of-withdrawals.tab')" is-link to="profile/withdrawal-list" />
          <van-cell icon="contact" :title="$t('profile.kyc.tab')" is-link to="profile/kyc" />
          <van-cell icon="browsing-history-o" :title="$t('profile.change-password.tab')" is-link to="profile/change-password" />
          <van-cell icon="browsing-history" :title="$t('profile.change-withdrawal-password.tab')" is-link to="profile/change-withdrawal-password" />
        </van-cell-group>
      </div>
      <div class=" mb-20">
        <van-button hairline block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="logout">
          {{ $t('profile.logout.tab') }}
        </van-button>
      </div>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
