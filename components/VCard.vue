<script lang="ts" setup></script>

<template>
  <div class="v-card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.v-card {
  @apply rounded-lg p-2.5 bg-white;

  box-shadow: 0 0.125rem 0.3125rem 0.0625rem rgb(64 60 67 / 16%);
}
</style>
