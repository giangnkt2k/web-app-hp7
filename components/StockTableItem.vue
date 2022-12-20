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
    <van-row class="items-center">
      <van-col
        span="12"
        class="pl-4"
      >
        <div class="mb-1">
          {{ stock.N }}
        </div>
        <div class="text-xs text-gray-400">
          {{ stock.FS }}
        </div>
      </van-col>
      <van-col
        span="6"
        class="text-right text-success"
        :class="{ '!text-danger': isPriceDown }"
      >
        {{ stock.P }}
      </van-col>
      <van-col
        span="6"
        class="text-right pr-4 text-success"
        :class="{ '!text-danger': isPriceDown }"
      >
        {{ stock.ZF }}%
      </van-col>
    </van-row>
  </van-cell>
</template>

<style scoped>

</style>
