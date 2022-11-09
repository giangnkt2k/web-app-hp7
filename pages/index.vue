<script lang="ts" setup>
const config = useRuntimeConfig();
</script>

<template>
  <div>Page: {{ $t("hello") }}</div>
  <van-button type="primary"> {{ config.public.API_ENDPOINT }}</van-button>
</template>

<style scoped></style>
