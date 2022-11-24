<template>
  <div>
    <TheHeader :back-to="'/profile'" :title="$t('profile.change-password.title')" />
    <div class="px-3 py-3">
      <div class="pb-2">
        {{ $t('profile.change-password.title') }}
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="currentPassword"
            type="password"
            name="currentPassword"
            :label="$t('profile.change-password.currentPassword')"
            :placeholder="$t('profile.change-password.currentPassword.ph')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
          <van-field
            v-model="newPassword"
            type="password"
            name="newPassword"
            :label="$t('profile.change-password.newPassword')"
            :placeholder="$t('profile.change-password.newPassword.ph')"
            :rules="[{ required: true, message: $t('mess.required') }]"
          />
          <van-field
            v-model="repeatNewPassword"
            type="password"
            name="reNewPassword"
            :label="$t('profile.change-password.reNewPassword')"
            :placeholder="$t('profile.change-password.reNewPassword.ph')"
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
const { changePassword } = useApiServices()
const currentPassword = ref('')
const newPassword = ref('')
const repeatNewPassword = ref('')

const onSubmit = async () => {
  const res = await changePassword({
    oldpassword: currentPassword.value,
    password: newPassword.value,
    repassword: repeatNewPassword.value
  })
  if (res.data.code === 1) {
    $toast.fail(res.data.msg)
  } else {
    $toast.success(res.data.msg)
  }
}
</script>
