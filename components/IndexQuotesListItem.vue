<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'
import { IStock } from '~~/types/stock'

type Props = {
  index: IStock
  to?: RouteLocationRaw
}

const props = defineProps<Props>()

const { toMoneyFormat } = useUtility()

const changed = computed(() => props.index.P - props.index.YC)
</script>

<template>
  <van-col span="8">
    <div class="bg-light-50 shadow-lg rounded-lg py-12px px-10px">
      <div class="font-bold text-lg text-left">
        {{ index.N }}
      </div>
      <div
        class="font-medium text-left mt-1 text-success"
        :class="{
          'text-danger': changed < 0
        }"
      >
        <div>
          {{ index.P }}
        </div>
        <div class="text-xs mt-2 whitespace-nowrap">
          <span class="pr-1">{{ toMoneyFormat(changed) }}</span>
          <span class="pl-1">{{ toMoneyFormat(index.ZF) }}%</span>
        </div>
      </div>
    </div>
  </van-col>
</template>

<style scoped></style>
