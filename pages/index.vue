<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'
import { IStock } from '~~/types/stock'

definePageMeta({
  pageTitle: 'page.home.title'
})

const slides = ref<ISlideItem[]>([])
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
