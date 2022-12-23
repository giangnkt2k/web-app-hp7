<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '~~/stores/authentication'
const userStore = useAuthenticationStore()
const { logout } = userStore
const { userInformation, balance, frozenBalance } = storeToRefs(userStore)

const { isHasWithdrawalPasswordService } = useApiServices()
const isHiddenBalance = ref(false)
const isHasWithdrawalPassword = ref(false)
const hiddenBalance = () => {
  isHiddenBalance.value = !isHiddenBalance.value
}

const hasWithdrawalPassword = async () => {
  const res = await isHasWithdrawalPasswordService()
  isHasWithdrawalPassword.value = res.data
}

hasWithdrawalPassword()
</script>

<template>
  <div>
    <div class="mx-5 mt-20">
      <div class="flex">
        <img
          class="rounded-full"
          src="/img/default_avatar.jpg"
          width="80"
          height="80"
          alt=""
        >
        <div class="ml-5 pt-2 pl-2">
          <h1> {{ userInformation?.username || '' }} </h1>
          <h3>{{ userInformation?.real_name || '' }}</h3>
        </div>
      </div>
      <div class="mt-10 p-3 bg-light-50 rounded-md">
        <div class="flex">
          <p>{{ $t('profile.totalAssets') }}</p>
          <van-icon
            :name="isHiddenBalance ? 'eye-o': 'closed-eye'"
            color="black"
            size="18"
            class="ml-3"
            @click="hiddenBalance"
          />
        </div>
        <div class="my-3 text-2xl font-bold">
          <span v-if="isHiddenBalance">{{ balance }}</span>
          <span v-else>******</span>
        </div>
        <div class="flex">
          <div>
            {{ $t('profile.available') }}
            <span v-if="isHiddenBalance">  {{ userInformation?.balance_avail || 0 }} </span>
            &nbsp;
            <span v-else>******</span>
          </div>
          <div class="pl-6">
            {{ $t('profile.freeze') }}
            <span v-if="isHiddenBalance"> {{ frozenBalance || 0 }} </span>
            &nbsp;
            <span v-else>******</span>
          </div>
        </div>
      </div>

      <div class="mt-5 mb-5 bg-light-50 rounded-md">
        <van-cell-group>
          <van-cell
            icon="peer-pay"
            :title="$t('profile.cell.silverCertificateTransferOut')"
            is-link
            :to="{
              name: isHasWithdrawalPassword ? $routesList.profileWithdrawMoney : $routesList.profileSetWithdrawalPassword
            }"
          />
          <van-cell
            icon="description"
            :title="$t('profile.deposit.tab')"
            is-link
            :to="{name: $routesList.profileDeposit}"
          />
          <van-cell
            icon="cash-on-deliver"
            :title="$t('profile.list-of-withdrawals.tab')"
            is-link
            :to="{name: isHasWithdrawalPassword ? $routesList.profileWithdrawalList : $routesList.profileSetWithdrawalPassword}"
          />
          <van-cell
            icon="contact"
            :title="$t('profile.kyc.tab')"
            is-link
            :to="{name: $routesList.profileKyc}"
          />
          <van-cell
            icon="browsing-history-o"
            :title="$t('profile.change-password.tab')"
            is-link
            :to="{name: $routesList.profileChangePassword}"
          />
          <van-cell
            icon="browsing-history"
            :title="$t('profile.change-withdrawal-password.tab')"
            is-link
            :to="{name: isHasWithdrawalPassword ? $routesList.profileChangeWithdrawalPassword : $routesList.profileSetWithdrawalPassword}"
          />
        </van-cell-group>
      </div>
      <div class=" mb-20">
        <van-button
          hairline
          block
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click="logout"
        >
          {{ $t('profile.logout.tab') }}
        </van-button>
      </div>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
