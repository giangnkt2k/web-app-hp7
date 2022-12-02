<template>
  <div class="register">
    <div class="logo">
      <img width="100" height="100" src="/img/logo.jpg">
    </div>
    <div class="register__form">
      <h1 class="font-bold text-2xl">
        {{ $t("register") }}
      </h1>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="Username"
            :placeholder="$t('please.input', {fieldName:$t('login.title.username')})"
            :error="$v.username.$error"
            :error-message="$v.username.$errors[0]?.$message.toString()"
            :label="$t('login.title.username')"
            @blur="$v.username.$touch"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="Password"
            :label="$t('login.title.password')"
            :placeholder="$t('please.input', {fieldName:$t('login.title.password')})"
            :error="$v.password.$error"
            :error-message="$v.password.$errors[0]?.$message.toString()"
            @blur="$v.password.$touch"
          />
          <van-field
            v-model="form.repeatNewPassword"
            type="password"
            name="repeatNewPassword"
            :label="$t('register.title.repassword')"
            :placeholder="$t('please.input', {fieldName:$t('register.title.repassword')})"
            :error="$v.repeatNewPassword.$error"
            :error-message="$v.repeatNewPassword.$errors[0]?.$message.toString()"
            @blur="$v.repeatNewPassword.$touch"
          />
          <van-field
            v-model="form.institutionCode"
            name="Institution code"
            :placeholder="$t('please.input', {fieldName:$t('register.title.institutionCode')})"
            :error="$v.institutionCode.$error"
            :error-message="$v.institutionCode.$errors[0]?.$message.toString()"
            :label="$t('register.title.institutionCode')"
            @blur="$v.institutionCode.$touch"
          />
        </van-cell-group>
        <div class="m-16px">
          <van-button
            :loading="isRegistering"
            round
            block
            type="primary"
            native-type="submit"
            :disabled="$v.$invalid"
          >
            {{ $t("register") }}
          </van-button>
        </div>
      </van-form>
      <van-row class="py-10px px-16px">
        <van-col span="12" />
        <van-col span="12" class="text-xs text-right">
          <nuxt-link :to="{ name: $routesList.login }">
            {{
              $t("register.mess.haveAcc")
            }}
          </nuxt-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
const { required, sameAs } = useValidators()
const { registerService } = useApiServices()
const { $toast, $t, $routesList, $typedRouter } = useNuxtApp()

const form = reactive({
  username: '',
  password: '',
  repeatNewPassword: '',
  institutionCode: ''
})

const isRegistering = ref(false)

const rules = computed(() => ({
  username: {
    required
  },
  password: {
    required
  },
  institutionCode: {
    required
  },
  repeatNewPassword: {
    required,
    sameAs: sameAs(form.password)
  }
}))

const $v = useVuelidate(rules, form)

const onSubmit = async () => {
  isRegistering.value = true
  const res = await registerService(form.username, form.password, form.institutionCode).catch(() => {
    $toast.fail($t('message.fail.register'))
  })
  if (res?.status !== 201) {
    $toast.fail($t('message.fail.register'))
  } else {
    $toast.success($t('message.success.register'))
    $typedRouter.push({ name: $routesList.login })
  }

  isRegistering.value = false
}
</script>
<style lang="scss" scoped>
.logo {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.register__form {
  width: 100%;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);

  h1 {
  text-align: center;
  margin: 0.67em 0;
  }
}
</style>
