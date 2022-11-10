<template>
  <div class="login">
    <div class="logo">
      <img width="100" height="100" src="../assets/img/logo.jpg">
    </div>
    <div class="login__form">
      <h1 class="font-bold text-2xl">{{ $t("login") }}</h1>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="Username"
            :placeholder="$t('login_username')"
            :rules="[
              {
                required: true,
                message: $t('login_validate_require_username'),
              },
            ]"
            :label="$t('login_username')"
          />
          <van-field
            v-model="password"
            type="password"
            name="Password"
            :label="$t('login_password')"
            :placeholder="$t('login_password')"
            :rules="[
              { required: true, message: $t('login_validate_password') },
            ]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            {{ $t("login") }}
          </van-button>
        </div>
      </van-form>
      <van-row style="padding: 10px 16px;">
        <van-col span="12"></van-col>
        <van-col span="12" class="text-xs text-right">
          <nuxt-link :to="{name: $routeList.register}">{{ $t('login_register') }}</nuxt-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
const username = ref("");
 
const password = ref("");

const onSubmit = () => {
  console.log("submmit");
};
</script>
<style scoped>
.logo {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.login__form {
  width: 100%;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
}

.login__form h1 {
  text-align: center;
  margin: 0.67em 0;
}
</style>
