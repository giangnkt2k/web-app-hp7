<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'

const { carouselsService } = useApiServices()
const slides = ref<ISlideItem[]>([])

const getCarousels = async () => {
  const response = await carouselsService()

  if (response.data && response.data.data.data) {
    slides.value = response.data.data.data
  }
}

getCarousels()
</script>

<template>
  <div class="bg-gray-100">
    <SearchBar />
    <HeroSlider :slides="slides" />
    <QuickAccess />
  </div>
</template>

<style scoped></style>
