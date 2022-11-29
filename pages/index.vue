<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'
import { IStock } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.home.title'
})

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
const chinaIndexes = ref<IStock[]>([])
const watchList = ref<IStock[]>([])
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
      <StockListItem v-for="(item, index) in watchList" :key="index" :stock="item" />
    </van-cell-group>

    <v-title>
      {{ $t('home.news') }}
    </v-title>
    <NewsList />

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
