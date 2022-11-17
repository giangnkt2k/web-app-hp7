<template>
  <div>
    <TheHeader :back-to="'/profile'" :title="$t('profile.cell.silverCertificateTransferOut')" />
    <div class="wd__body px-3">
      <h3 class="font-bold text-md my-3">
        {{ $t('profile.cell.silverCertificateTransferOut.title') }}
      </h3>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="transferAmount"
            name="transfer amount"
            type="digit"
            :label="$t('profile.silverCertificateTransferOut.transferAmount')"
            :placeholder="$t('profile.silverCertificateTransferOut.transferAmount')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
          <van-field
            v-model="withdrawPassword"
            name="withdrawPassword"
            type="password"
            :label="$t('profile.silverCertificateTransferOut.wdPassword')"
            :placeholder="$t('profile.silverCertificateTransferOut.wdPassword.ph')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
          <van-field
            v-model="availableBalance"
            name="available Balance"
            :label="$t('profile.silverCertificateTransferOut.availableBalance')"
            readonly
          />
          <van-field
            v-model="accName"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.accName')"
            readonly
          />
          <van-field
            v-model="depositoryBank"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.depositoryBank')"
            readonly
          />
          <van-field
            v-model="cardNumber"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.cardNumber')"
            readonly
          />
          <van-field
            v-model="branch"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.branch')"
            :placeholder="$t('profile.silverCertificateTransferOut.branch')"
            readonly
          />
        </van-cell-group>
        <div class="m-4">
          <van-button round block type="primary" native-type="submit">
            {{ $t("profile.silverCertificateTransferOut.submit") }}
          </van-button>
        </div>
      </van-form>
      <div class="wd__report pt-3 font-bold text-sm">
        <h3 class="my-1">
          {{ $t('profile.silverCertificateTransferOut.dearUser') }}
        </h3>
        <div class="mt-3">
          {{ $t('profile.silverCertificateTransferOut.dearUserContent') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Toast } from 'vant'
import { createApp } from 'vue'
import { useAuthenticationStore } from '~~/stores/authentication'
const app = createApp()
app.use(Toast)

const userStore = useAuthenticationStore()
const { userInformation } = storeToRefs(userStore)
const { withdrawMoney } = useApiServices()

const transferAmount = ref(0)
const withdrawPassword = ref('')
const availableBalance = ref(userInformation.value?.balance_avail)
const accName = ref(userInformation.value?.accountname || '')
const depositoryBank = ref(userInformation.value?.bankname || '')
const cardNumber = ref(userInformation.value?.banknumber || '')
const branch = ref(userInformation.value?.bankbranch || '')

const onSubmit = async () => {
  const res = await withdrawMoney(transferAmount.value, withdrawPassword.value)
  if (res.data.code === 1) {
    Toast.fail(res.data.msg)
  } else {
    Toast.success(res.data.msg)
  }
}
</script>
