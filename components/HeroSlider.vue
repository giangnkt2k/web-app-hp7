<script lang="ts" setup>
import { ISlideItem } from '~~/types/hero-slide'

type Props = {
  slides: ISlideItem[];
};

defineProps<Props>()
</script>

<template>
  <div class="p-3">
    <div class="rounded-xl overflow-hidden aspect-w-2 aspect-h-1">
      <div>
        <van-swipe
          :autoplay="3000"
          lazy-render
          indicator-color="white"
          class="h-full w-full"
        >
          <van-swipe-item
            v-for="image in slides"
            :key="image.id"
          >
            <van-image
              :src="image.uri"
              class="h-full w-full"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
