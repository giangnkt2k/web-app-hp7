<script lang="ts" setup>
import { IStock } from "~~/types/stock";

const route = useRoute();
const { searchStockService } = useApiServices();

const { searchKey } = useSearch();
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

if (route.query.query?.toString()) {
  searchKey.value = route.query.query?.toString();
}

watch(
  () => route.query.query,
  () => {
    stocks.value = [];
    search(1);
  }
);

onBeforeUnmount(() => {
  searchKey.value = "";
});
</script>

<template>
  <div>
    <van-sticky>
      <SearchBar />
    </van-sticky>

    <van-empty
      v-if="isFinished && !stocks.length"
      :description="$t('page.search.empty')"
    />
    <StockList
      v-else
      v-model:is-loading="isLoading"
      :stocks="stocks"
      :is-finished="isFinished"
      @load="search"
    />
  </div>
</template>

<style scoped></style>
