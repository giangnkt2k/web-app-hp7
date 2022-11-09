<script lang="ts" setup>
import { SearchProps } from "vant";

const { $typedRouter, $routesList } = useNuxtApp();
const { searchKey } = useSearch();

const onSearch = () => {
  $typedRouter.push({
    name: $routesList.search,
    query: {
      query: searchKey.value,
    },
  });
};
</script>

<template>
  <van-search
    v-model="searchKey"
    show-action
    :placeholder="$t('page.search.search-field.placeholder')"
    background="var(--van-primary-color)"
    shape="round"
    @search="onSearch"
  >
    <template #action>
      <div class="text-white font-medium">
        {{ $t("page.search.search-button.label") }}
      </div>
    </template>
  </van-search>
</template>

<style scoped></style>
