<template>
  <div>
    <TheHeader :back-to="'/profile'" :title="$t('profile.change-withdrawal-password.title')" />
    <div class="px-3 py-3">
      <div class="pb-2">
        {{ $t('profile.change-withdrawal-password.title') }}
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="newPassword"
            type="password"
            name="currentPassword"
            :label="$t('profile.change-withdrawal-password.currentPassword')"
            :placeholder="$t('profile.change-withdrawal-password.currentPassword.ph')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
          <van-field
            v-model="repeatNewPassword"
            type="password"
            name="newPassword"
            :label="$t('profile.change-withdrawal-password.newPassword')"
            :placeholder="$t('profile.change-withdrawal-password.newPassword.ph')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
        </van-cell-group>
        <div class="pt-5">
          <van-button round block type="primary" @click="onSubmit">
            {{ $t('page.profile.submit') }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const { $toast } = useNuxtApp()
const { changeWithdrawalPasswordService } = useApiServices()
const newPassword = ref('')
const repeatNewPassword = ref('')

const onSubmit = async () => {
  const res = await changeWithdrawalPasswordService({
    withdraw_password: newPassword.value,
    rewithdraw_password: repeatNewPassword.value
  })
  if (res.data.code === 1) {
    $toast.fail(res.data.msg)
  } else {
    $toast.success(res.data.msg)
  }
}
</script>
