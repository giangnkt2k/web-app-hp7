<script lang="ts" setup>
import { IStock } from '~~/types/stock'

type Props = {
  indexes: IStock[]
  isClickable?: boolean
}

defineProps<Props>()
</script>

<template>
  <van-row gutter="20" :wrap="true" :clickable="isClickable" class="py-10px px-12px">
    <IndexQuotesListItem v-for="index in indexes" :key="index.C" :index="index" :to="isClickable ? {name: $routesList.stockStockCode, params: {stockCode: index.FS}} : undefined" />
  </van-row>
</template>

<style scoped></style>
