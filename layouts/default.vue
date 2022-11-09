<script lang="ts" setup>
const theme = {
  primaryColor: "#ffe100",
};
</script>

<template>
  <van-config-provider :theme-vars="theme">
    <slot />
  </van-config-provider>
</template>

<style scoped></style>
