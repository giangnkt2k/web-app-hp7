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
          <van-field v-model="username" name="Username" :placeholder="$t('login_username')"
          :rules="[{ required: true, message: $t('login_validate_require_username') }]"
          :label="$t('login_username')" />
          <van-field
            v-model="password"
            type="password"
            name="Password"
            :label="$t('login_passwoerd')"
            :placeholder="$t('login_passwoerd')"
            :rules="[{ required: true, message: $t('login_validate_password') }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            {{ $t('login') }}
          </van-button>
        </div>
      </van-form>
      <van-grid :border="false" :column-num="2">
        <van-grid-item text="" />
        <van-grid-item to="/register" :text="$t('login_register')" />
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
