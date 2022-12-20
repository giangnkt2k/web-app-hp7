<script lang="ts" setup>
import { IStock } from '~~/types/stock'

type Props = {
  stock: IStock;
};

const props = defineProps<Props>()

const isPriceDown = computed(() => props.stock.ZF < 0)
</script>

<template>
  <van-cell
    class="!px-0"
    clickable
    @click="
      $typedRouter.push({
        name: $routesList.stockStockCode,
        params: { stockCode: stock.FS },
      })
    "
  >
    <van-row class="items-center w-full">
      <van-col
        span="12"
        class="pl-4"
      >
        <div class="mb-1 font-bold">
          {{ stock.N }}
        </div>
        <div class="text-xs text-gray-400">
          {{ stock.FS }}
        </div>
      </van-col>
      <van-col
        span="12"
        class="text-right pr-4"
      >
        <div>
          {{ stock.P }}
        </div>
        <div
          class="text-success text-xs"
          :class="{ '!text-danger': isPriceDown }"
        >
          {{ stock.ZF }}%
        </div>
      </van-col>
    </van-row>
  </van-cell>
</template>

<style scoped>

</style>
