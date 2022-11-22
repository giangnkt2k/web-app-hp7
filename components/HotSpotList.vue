<script lang="ts" setup>
import { HotSpot } from '~~/types/market'

type Props = {
  indexes: HotSpot[],
  title : string
}
defineProps<Props>()

</script>

<template>
  <div class="py-10px px-10px">
    <h2 class="font-bold text-lg py-10px">
      {{ $t(title) }}
    </h2>
    <van-row gutter="20" :wrap="true">
      <van-col v-for="(item, index) in indexes" :key="index" span="8" class="mb-2">
        <div class="bg-light-50 shadow-lg rounded-lg py-12px px-5px">
          <div class="font-bold text-left">
            {{ item.title }}
          </div>
          <div
            class="font-medium text-left mt-1"
          >
            <div
              class="text-success"
              :class="{
                'text-danger': item.up_down < 0
              }"
            >
              {{ item.up_down }}%
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<style scoped></style>
