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
          :rules="[{ required: true, message: 'Username is required' }]"
          :label="$t('login_username')" />
          <van-fiel
            v-model="password"
            type="password"
            name="Password"
            label="Password"
            placeholder="Password"
            :rules="[{ required: true, message: 'Password is required' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>
      <van-grid :border="false" :column-num="2">
        <van-grid-item text="" />
        <van-grid-item to="/register" text="没有账号？去注册" />
      </van-grid>
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
