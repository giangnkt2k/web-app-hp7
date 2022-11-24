<script lang="ts" setup>
import { IStockSearch } from '~~/types/stock'

const { wishlistService, searchOptionalStock, addOneToWishList, deleteOneFromWishList } = useApiServices()

const currentPage = ref(1)
const currentSearchPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStockSearch[]>([])
const isSearchLoading = ref(false)
const isSearchFinished = ref(false)
const stocksSearched = ref<IStockSearch[]>([])
const isPopupSearchStockOpen = ref(false)
const { searchKey } = useSearch()

const getData = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value
  stocks.value = []
  const response = await wishlistService(currentPage.value)

  if (response.data.data) {
    stocks.value.push(...response.data.data)

    if (response.data.data.length < 20) {
      isFinished.value = true
    }
    isLoading.value = false
    currentPage.value++
  } else {
    isFinished.value = true
  }
}

const onSearch = async (page?: number) => {
  console.log('onSearch', currentSearchPage.value)
  isSearchFinished.value = false
  isSearchLoading.value = true
  stocksSearched.value = []

  currentSearchPage.value = page ?? currentSearchPage.value
  const response = await searchOptionalStock(searchKey.value, currentSearchPage.value)

  if (response.data.data) {
    stocksSearched.value.push(...response.data.data)

    if (response.data.data.length < 20) {
      isSearchFinished.value = true
    }
    isSearchLoading.value = false
    currentSearchPage.value++
  } else {
    isSearchFinished.value = true
  }
}

const openPopupSearchStock = () => {
  isPopupSearchStockOpen.value = true
}

const addStockToWishList = async (stock: IStockSearch) => {
  await addOneToWishList(stock)
  getData(1)
  onSearch(1)
}

const deleteStockFromWishList = async (code : string) => {
  await deleteOneFromWishList(code)
  getData(1)
  onSearch(1)
}

const handleWishlist = (stock: IStockSearch) => {
  if (stock.is_optional === 0 || stock.is_optional === undefined) {
    addStockToWishList(stock)
  } else {
    deleteStockFromWishList(stock.FS)
  }
}

watch(
  () => searchKey.value,
  () => {
    stocksSearched.value = []
    onSearch(1)
  }
)

</script>

<template>
  <div>
    <!-- Header  -->
    <van-nav-bar class="!bg-primary">
      <template #title>
        <div class="text-white font-bold">
          {{ $t('wl.title') }}
        </div>
      </template>
    </van-nav-bar>
    <!-- Body  -->
    <div class="bg-light-50">
      <StockTable
        v-model:is-loading="isLoading"
        :stocks="stocks"
        :offset-top="0"
        :is-finished="isFinished"
        @load="getData"
      />
      <!-- Button open search stock  -->
      <div class="text-center pt-5 pb-10">
        <van-button icon="plus" type="default" @click="openPopupSearchStock">
          {{ $t("wl.btn.add") }}
        </van-button>
      </div>
      <!-- Popup search stock  -->
      <van-popup
        v-model:show="isPopupSearchStockOpen"
        closeable
        close-icon="close"
        position="bottom"
        :style="{ height: '80%' }"
      >
        <div class="mt-6">
          <h1 class="font-bold text-lg p-4">
            {{ $t('wl.popup.title') }}
          </h1>
        </div>
        <div class="mt-2">
          <van-search
            v-model="searchKey"
            shape="round"
            placeholder="Placeholder"
            @search="onSearch"
          />
          <van-list
            v-model:loading="isSearchLoading"
            :finished="isSearchFinished"
            :finished-text="$t('stock-list.finished-text')"
            :loading-text="$t('stock-list.loading-text')"
            @load="onSearch"
          >
            <van-cell
              v-for="stock in stocksSearched"
              :key="stock.FS"
              class="!px-0"
            >
              <van-row class="items-center">
                <van-col span="12" class="pl-4">
                  <div class="mb-1">
                    {{ stock.N }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ stock.FS }}
                  </div>
                </van-col>
                <van-col span="12" class="text-right">
                  <van-icon class="!text-2xl" color="#f03957" :name="(stock.is_optional === 0 || stock.is_optional === undefined) ? 'like-o' : 'like'" @click="handleWishlist(stock)" />
                </van-col>
              </van-row>
            </van-cell>
          </van-list>
        </div>
      </van-popup>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
