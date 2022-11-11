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
    <h2>热门行业</h2>
    <van-row gutter="20" :wrap="true" class="py-10px px-12px">
      <van-col v-for="(item, index) in indexes" :key="index" span="8">
        <div class="bg-light-50 shadow-lg rounded-lg py-12px px-10px">
          <div class="font-bold text-lg text-left">
            {{ item.Increase }}
          </div>
          <div
            class="font-medium text-left mt-1 text-success"
            :class="{
              'text-danger': item.Increase < 0
            }"
          >
            <div>
              {{ item.Increase_share }}
            </div>
            <div class="text-xs mt-2 whitespace-nowrap">
              <span class="pr-1">{{ toMoneyFormat(item.plate) }}</span>
              <span class="pl-1">{{ toMoneyFormat(item.shares) }}%</span>
            </div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<style scoped></style>
