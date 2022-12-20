<script lang="ts" setup>
import { HotIndustry } from '~~/types/market'

type Props = {
  indexes: HotIndustry[],
  title : string
}
defineProps<Props>()

const { toMoneyFormat } = useUtility()

</script>

<template>
  <div class="py-10px px-10px">
    <h2 class="font-bold text-lg py-10px">
      {{ $t(title) }}
    </h2>
    <van-row
      gutter="20"
      :wrap="true"
    >
      <van-col
        v-for="(item, index) in indexes"
        :key="index"
        span="8"
      >
        <div class="bg-light-50 shadow-lg rounded-lg py-12px px-5px">
          <div class="font-bold text-left">
            {{ item.plate }}
          </div>
          <div
            class="font-medium text-left mt-1"
          >
            <div
              class="text-success"
              :class="{
                'text-danger': item.Increase < 0
              }"
            >
              {{ item.Increase }}%
            </div>
            <div class="mt-2 whitespace-nowrap">
              <div class="pr-1">
                {{ item.shares }}
              </div>
              <div
                class="text-success text-xs"
                :class="{
                  'text-danger': item.Increase_share < 0
                }"
              >
                {{ toMoneyFormat(item.Increase_share) }}%
              </div>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<style scoped></style>
