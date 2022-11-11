<script lang="ts" setup>
import { IStock } from '~~/types/stock'

type Props = {
  indexes: IStock[]
  clickable?: boolean
}

defineProps<Props>()
</script>

<template>
  <van-row gutter="20" :wrap="true" :clickable="clickable" class="py-10px px-12px">
    <IndexQuotesListItem v-for="index in indexes" :key="index.C" :index="index" :to="clickable ? {name: $routesList.stockStockCode, params: {stockCode: index.FS}} : undefined" />
  </van-row>
</template>

<style scoped></style>
