<script lang="ts" setup>
import { IStock } from "~~/types/stock";

const route = useRoute();
const { searchStockService } = useApiServices();

const searchKey = ref<string>(route.query.query?.toString() || "");
const currentPage = ref(1);
const isLoading = ref(false);
const isFinished = ref(false);
const stocks = ref<IStock[]>([]);

const search = async (page?: number) => {
  isFinished.value = false;
  isLoading.value = true;
  currentPage.value = page ?? currentPage.value;

  const response = await searchStockService(searchKey.value, currentPage.value);

  if (response.data.data) {
    stocks.value.push(...response.data.data);

    if (response.data.data.length < 20) {
      isFinished.value = true;
    }
    isLoading.value = false;
    currentPage.value++;
  } else {
    isFinished.value = true;
  }
};
</script>

<template>
  <div>
    <van-sticky>
      <SearchBar
        v-model="searchKey"
        show-action
        :placeholder="$t('page.search.search-field.placeholder')"
        background="var(--van-primary-color)"
        shape="round"
        @search="search(1)"
      />
    </van-sticky>

    <StockList
      v-model:is-loading="isLoading"
      :stocks="stocks"
      :is-finished="isFinished"
      @load="search"
    />
  </div>
</template>

<style scoped></style>
