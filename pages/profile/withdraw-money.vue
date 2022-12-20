<template>
  <div>
    <TheHeader
      :back-to="'/profile'"
      :title="$t('profile.cell.silverCertificateTransferOut')"
    />
    <div class=" px-3">
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
            :model-value="balance"
            name="available Balance"
            :label="$t('profile.silverCertificateTransferOut.availableBalance')"
            readonly
          />
          <van-field
            :model-value="userInformation?.account_holder || ''"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.accName')"
            readonly
          />
          <van-field
            :model-value="userInformation?.bank_name || ''"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.depositoryBank')"
            readonly
          />
          <van-field
            :model-value="userInformation?.bank_number || ''"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.cardNumber')"
            readonly
          />
          <van-field
            :model-value="userInformation?.bank_branch || ''"
            name="asyncValidator"
            :label="$t('profile.silverCertificateTransferOut.branch')"
            :placeholder="$t('profile.silverCertificateTransferOut.branch')"
            readonly
          />
        </van-cell-group>
        <div class="m-4">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :disabled="transferAmount < 1"
          >
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
import { useAuthenticationStore } from '~~/stores/authentication'

const { $toast } = useNuxtApp()
const userStore = useAuthenticationStore()
const { userInformation, balance } = storeToRefs(userStore)
const { withdrawMoneyService } = useApiServices()

const transferAmount = ref(0)
const withdrawPassword = ref('')

const onSubmit = async () => {
  const res = await withdrawMoneyService(Number(transferAmount.value), withdrawPassword.value)
  if (res.data.code === 1) {
    $toast.fail(res.data.msg)
  } else {
    $toast.success(res.data.msg)
  }
}
</script>
