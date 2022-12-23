<script lang="ts" setup>
import { IStock, IStockSearch } from '~~/types/stock'

const { wishlistService, searchStockService, addOneToWishListService, deleteOneFromWishListService } = useApiServices()

const currentPage = ref(1)
const currentSearchPage = ref(1)
const isLoading = ref(false)
const isFinished = ref(false)
const stocks = ref<IStockSearch[]>([])
const isSearchLoading = ref(false)
const isSearchFinished = ref(false)
const stocksSearched = ref<IStock[]>([])
const isPopupSearchStockOpen = ref(false)
const { searchKey } = useSearch()

const getData = async (page?: number) => {
  stocks.value = []
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value
  const response = await wishlistService(currentPage.value)
  if (response.data) {
    console.log('response', response.data)
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

const handleFavoriteStock = (code: string) => {
  for (let i = 0; i < stocksSearched.value.length; i++) {
    if (stocksSearched.value[i].FS === code) {
      stocksSearched.value[i].user_id = stocksSearched.value[i].user_id ? 0 : 1
    }
  }
}

const onSearch = async (page?: number) => {
  isSearchFinished.value = false
  isSearchLoading.value = true

  currentSearchPage.value = page ?? currentSearchPage.value
  const response = await searchStockService(searchKey.value, currentSearchPage.value)

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

const addStockToWishList = async (stock: IStock) => {
  await addOneToWishListService(stock)
  getData(1)
  handleFavoriteStock(stock.FS)
}

const deleteStockFromWishList = async (stock: IStock) => {
  await deleteOneFromWishListService(stock)
  getData(1)
  handleFavoriteStock(stock.FS)
}

const handleWishlist = (stock: IStock) => {
  const existed = !!stocks.value.find(({ C }) => C === stock.C)
  if (!existed) {
    addStockToWishList(stock)
  } else {
    deleteStockFromWishList(stock)
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
    <div class="bg-light-50 pb-10">
      <StockTable
        v-model:is-loading="isLoading"
        :stocks="stocks"
        :offset-top="0"
        :is-finished="isFinished"
        @load="getData"
      />
      <!-- Button open search stock  -->
      <div class="text-center pb-10">
        <van-button
          icon="plus"
          type="default"
          @click="openPopupSearchStock"
        >
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
                <van-col
                  span="12"
                  class="pl-4"
                >
                  <div class="mb-1">
                    {{ stock.N }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{ stock.FS }}
                  </div>
                </van-col>
                <van-col
                  span="12"
                  class="text-right"
                >
                  <van-icon
                    class="!text-2xl"
                    color="#f03957"
                    :name="(stock.user_id) ? 'like': 'like-o'"
                    @click="handleWishlist(stock)"
                  />
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
