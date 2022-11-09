<script lang="ts" setup>
import { SearchProps } from "vant";

interface Props extends Partial<SearchProps> {}
defineProps<Props>();
</script>

<template>
  <van-search v-bind="$props">
    <template #action>
      <div class="text-white font-medium">
        {{ $t("page.search.search-button.label") }}
      </div>
    </template>
  </van-search>
</template>

<style scoped></style>
