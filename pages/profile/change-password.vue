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
            v-model="form.old_password"
            type="password"
            name="password"
            :label="$t('profile.change-password.currentPassword')"
            :placeholder="$t('profile.change-password.currentPassword.ph')"
            :error="$v.old_password.$error"
            :error-message="$v.old_password.$errors[0]?.$message.toString()"
            @blur="$v.old_password.$touch"
          />
          <van-field
            v-model="form.new_password"
            type="password"
            name="newPassword"
            :label="$t('profile.change-password.newPassword')"
            :placeholder="$t('profile.change-password.newPassword.ph')"
            :error="$v.new_password.$error"
            :error-message="$v.new_password.$errors[0]?.$message.toString()"
            @blur="$v.new_password.$touch"
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
  old_password: '',
  new_password: '',
  repeatNewPassword: ''
})

const isLoading = ref(false)
const rules = computed(() => ({
  old_password: {
    required
  },
  new_password: {
    required
  },
  repeatNewPassword: {
    required,
    sameAs: sameAs(form.new_password)
  }
}))

const $v = useVuelidate(rules, form)

const onSubmit = async () => {
  isLoading.value = true

  await changePasswordService({
    old_password: form.old_password,
    new_password: form.new_password
  }).catch(() => {
    $toast.fail($t('message.fail.changePassword'))
  })

  $toast.success($t('message.success.changePassword'))

  isLoading.value = false
}

</script>
