<script lang="ts" setup>
import { IStock } from '~~/types/stock'

type Props = {
  indexes: IStock[]
  clickable?: boolean
}

defineProps<Props>()
</script>

<template>
  <van-grid :column-num="3" :clickable="clickable">
    <IndexListItem v-for="index in indexes" :key="index.C" :index="index" :to="clickable ? {name: $routesList.stockStockCode, params: {stockCode: index.FS}} : undefined" />
  </van-grid>
</template>

<style scoped></style>
