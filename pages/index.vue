<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'
import { IStock } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.home.title'
})

const { searchStockService } = useApiServices()

const slides = ref<ISlideItem[]>([
  {
    id: 1,
    uri: '//ll1011.oss-cn-hongkong.aliyuncs.com/carousel/202211/img_20221115153259.png',
    order: 0
  },
  {
    id: 2,
    uri: '//ll1011.oss-cn-hongkong.aliyuncs.com/carousel/202211/img_20221115153313.png',
    order: 0
  },
  {
    id: 3,
    uri: '//ll1011.oss-cn-hongkong.aliyuncs.com/carousel/202211/img_20221115153323.png',
    order: 0
  },
  {
    id: 4,
    uri: '//ll1011.oss-cn-hongkong.aliyuncs.com/carousel/202211/img_20221115153501.png',
    order: 0
  },
  {
    id: 5,
    uri: '//ll1011.oss-cn-hongkong.aliyuncs.com/carousel/202211/img_20221115153525.jpg',
    order: 0
  }
])
const chinaIndexes = useState<IStock[]>(() => [])
const watchList = useState<IStock[]>(() => [])

const getChinaIndexes = async () => {
  const response = await searchStockService(undefined, undefined, 3)
  if (response?.data) {
    chinaIndexes.value = response.data
  }
}

const getWatchList = async () => {
  const response = await searchStockService()
  if (response?.data) {
    watchList.value = response.data
  }
}

await useAsyncData(() => {
  return Promise.all([
    getChinaIndexes(),
    getWatchList()
  ])
})
</script>

<template>
  <div>
    <SearchBar />
    <HeroSlider :slides="slides" />
    <QuickAccess />
    <IndexList :indexes="chinaIndexes" clickable />

    <v-title>
      {{ $t('home.watch-list') }}
    </v-title>
    <van-cell-group>
      <van-skeleton :row="100" :loading="!watchList.length">
        <StockListItem v-for="(item, index) in watchList" :key="index" :stock="item" />
      </van-skeleton>
    </van-cell-group>

    <v-title>
      {{ $t('home.news') }}
    </v-title>
    <NewsList />

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
