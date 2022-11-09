<template>
    <div class="login">
      <div class="logo">
        <van-image
          width="100"
          height="100"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </div>
      <div class="login__form">
        <h1>{{ $t("login") }}</h1>
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="username" name="Username" placeholder="Username"
            :rules="[{ required: true, message:$t('register_mess_login_require') }]"
            :label="$t('login_username')" />
            <van-field
              v-model="password"
              type="password"
              name="Password"
              :label="$t('login_password')"
              placeholder="Password"
              :rules="[{ required: true, message:$t('register_mess_password_require') }]"
            />
            <van-field
              v-model="rePassword"
              type="password"
              name="RePassword"
              :label="$t('register_repassword')"
              placeholder="Repeat Password"
              :rules="[{ required: true, message: 'Password is required' }]"
            />
            <van-field v-model="institutionCode" name="Institution code" placeholder="Institution code"
            :rules="[{ required: true, message:$t('register_mess_institutionCode_require') }]"
            :label="$t('register_institutionCode')" />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              {{ $t('register') }}
            </van-button>
          </div>
        </van-form>
        <van-grid :border="false" :column-num="2">
          <van-grid-item text="" />
          <van-grid-item to="/login" :text="$t('register_mess_haveAcc')" />
        </van-grid>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  
  const username = ref("");
  const password = ref("");
  const rePassword = ref("");
  const institutionCode = ref("");

  
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
  