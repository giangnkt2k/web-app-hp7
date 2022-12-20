<template>
  <div>
    <TheHeader
      :back-to="'/profile'"
      :title="$t('profile.change-password.title')"
    />
    <div class="px-3 py-3">
      <div class="pb-2">
        {{ $t('profile.change-password.title') }}
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="form.password"
            type="password"
            name="password"
            :label="$t('profile.change-password.currentPassword')"
            :placeholder="$t('profile.change-password.currentPassword.ph')"
            :error="$v.password.$error"
            :error-message="$v.password.$errors[0]?.$message.toString()"
            @blur="$v.password.$touch"
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
          <van-button
            :loading="isLoading"
            :disabled="$v.$invalid"
            round
            block
            type="primary"
            @click="onSubmit"
          >
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
  password: '',
  newPassword: '',
  repeatNewPassword: ''
})

const isLoading = ref(false)
const rules = computed(() => ({
  password: {
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
  isLoading.value = true

  await changePasswordService({
    password: form.password,
    newPassword: form.newPassword
  }).catch(() => {
    $toast.fail($t('message.fail.changePassword'))
  })

  $toast.success($t('message.success.changePassword'))

  isLoading.value = false
}

</script>
