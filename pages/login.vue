<template>
  <div class="login">
    <div class="logo">
      <img width="100" height="100" src="/img/logo.jpg">
    </div>
    <div class="login__form">
      <h1 class="font-bold text-2xl">{{ $t("login") }}</h1>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="Username"
            :placeholder="$t('login.title.username')"
            :rules="[
              {
                required: true,
                message: $t('login.validate.require.username'),
              },
            ]"
            :label="$t('login.title.username')"
          />
          <van-field
            v-model="password"
            type="password"
            name="Password"
            :label="$t('login.title.password')"
            :placeholder="$t('login.title.password')"
            :rules="[
              { required: true, message: $t('login.validate.require.password') },
            ]"
          />
        </van-cell-group>
        <div class="m-16px">
          <van-button round block type="primary" native-type="submit">
            {{ $t("login") }}
          </van-button>
        </div>
      </van-form>
      <van-row class="py-10px px-16px">
        <van-col span="12"></van-col>
        <van-col span="12" class="text-xs text-right">
          <nuxt-link :to="{name: $routesList.register}">{{ $t('login.register') }}</nuxt-link>
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
<style lang="scss" scoped>
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

  h1 {
  text-align: center;
  margin: 0.67em 0;
  }
}


</style>
