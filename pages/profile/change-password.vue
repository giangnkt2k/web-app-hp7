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
            v-model="form.oldPassword"
            type="password"
            name="currentPassword"
            :label="$t('profile.change-password.currentPassword')"
            :placeholder="$t('profile.change-password.currentPassword.ph')"
            :error="$v.oldPassword.$error"
            :error-message="$v.oldPassword.$errors[0]?.$message.toString()"
            @blur="$v.oldPassword.$touch"
          />
          <van-field
            v-model="form.newPassword"
            type="password"
            name="newPassword"
            :label="$t('profile.change-password.newPassword')"
            :placeholder="$t('profile.change-password.newPassword.ph')"
            :error="$v.newPassword.$error"
            :error-message="$v.newPassword.$errors[0]?.$message.toString()"
            @blur="$v.newPassword.$touch"
          />
          <van-field
            v-model="form.repeatNewPassword"
            type="password"
            name="reNewPassword"
            :label="$t('profile.change-password.reNewPassword')"
            :placeholder="$t('profile.change-password.reNewPassword.ph')"
            :error="$v.repeatNewPassword.$error"
            :error-message="$v.repeatNewPassword.$errors[0]?.$message.toString()"
            @blur="$v.repeatNewPassword.$touch"
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
import { useVuelidate } from '@vuelidate/core'

const { $toast, $t } = useNuxtApp()
const { changePasswordService } = useApiServices()
const { required, sameAs } = useValidators()

const form = reactive({
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: ''
})

const rules = computed(() => ({
  oldPassword: {
    required
  },
  newPassword: {
    required
  },
  repeatNewPassword: {
    required,
    sameAs: sameAs(form.newPassword)
  }
}))

const $v = useVuelidate(rules, form)

const onSubmit = async () => {
  if ($v.value.$error) {
    return
  }
  const res = await changePasswordService({
    oldpassword: form.oldPassword,
    password: form.newPassword
  })
  if (res.data.code === 1) {
    $toast.fail(res.data.msg)
  } else {
    $toast.success(res.data.msg)
  }
}

</script>
