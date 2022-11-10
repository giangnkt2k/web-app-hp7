<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'
import { IStock } from '~~/types/stock'

const { carouselsService, chinaIndexesService } = useApiServices()
const slides = ref<ISlideItem[]>([])
const chinaIndexes = ref<IStock[]>([])

const getCarousels = async () => {
  const response = await carouselsService()

  if (response.data && response.data.data.data) {
    slides.value = response.data.data.data
  }
}

const getChinaIndexes = async () => {
  const response = await chinaIndexesService()

  if (response.data && response.data.data) {
    chinaIndexes.value = response.data.data
  }
}

getCarousels()
getChinaIndexes()
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
      <StockListItem v-for="(item, index) in chinaIndexes" :key="index" :stock="item" />
    </van-cell-group>

    <v-title>
      {{ $t('home.news') }}
    </v-title>
    <NewsList />
  </div>
</template>

<style scoped></style>
