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
  <van-grid-item :to="to">
    <div class="font-bold text-lg">
      {{ index.N }}
    </div>
    <div
      class="font-medium text-center mt-1 text-success"
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
  </van-grid-item>
</template>

<style scoped></style>
