<script lang="ts" setup>
import { HotIndustry } from '~~/types/host-industry'

type Props = {
  indexes: HotIndustry[]
}
defineProps<Props>()

const { toMoneyFormat } = useUtility()

</script>

<template>
  <div>
    <h2 class="py-5px px-12px font-bold text-xl">
      热门行业
    </h2>
    <van-row gutter="20" :wrap="true" class="py-10px px-12px">
      <van-col v-for="(item, index) in indexes" :key="index" span="8">
        <div class="bg-light-50 shadow-lg rounded-lg py-12px px-10px">
          <div class="font-bold text-lg text-left">
            {{ item.Increase }}
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
              {{ item.Increase_share }}
            </div>
            <div class="mt-2 whitespace-nowrap">
              <div class="pr-1">
                {{ toMoneyFormat(item.plate) }}
              </div>
              <div
                class="text-success text-xs"
                :class="{
                  'text-danger': item.Increase < 0
                }"
              >
                {{ toMoneyFormat(item.shares) }}%
              </div>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<style scoped></style>
