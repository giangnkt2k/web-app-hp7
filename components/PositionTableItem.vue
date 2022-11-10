<script lang="ts" setup>
import { IPosition } from '~~/types/position'
import { IStock } from '~~/types/stock'

type Props = {
  position: IPosition,
  stock: IStock
}

const props = defineProps<Props>()

const { toMoneyFormat } = useUtility()

const pl = computed(() => props.stock.P * Number(props.position.count) - Number(props.position.price) * Number(props.position.count))
const plPercent = computed(() => toMoneyFormat(pl.value / (Number(props.position.price) * Number(props.position.count)) * 100))
const isLost = computed(() => pl.value < 0)
</script>

<template>
  <van-cell clickable :to="{name: $routesList.stockStockCode, params: {stockCode: stock.FS}}">
    <van-row class="items-center">
      <van-col span="6">
        <div>
          {{ position.p_name }}
          <van-tag v-if="!!position.is_dailylimit && !!Number(position.count)" plain class="!text-10px !p-2px !text-black !border-gray-300 ml-0.5">
            {{ $t('position-table-item.is-limited') }}
          </van-tag>
        </div>
        <div class="text-xs text-gray-400 mt-1">
          {{ stock.FS }}
        </div>
      </van-col>

      <van-col span="6" class="text-center">
        <template v-if="Number(position.count)">
          <div>{{ Number(position.count) - (Number(position.count_today) || 0) }}</div>
          <div>{{ Number(position.count) - (Number(position.count_today_dailylimit) || 0) }}</div>
        </template>

        <template v-else>
          <div>{{ $t('position-table-item.subscription-amount') }}</div>
          <div>{{ Number(position.count_dailylimit_sub) }}</div>
        </template>
      </van-col>

      <van-col span="6" class="text-center">
        <template v-if="Number(position.count)">
          <div>{{ position.price }}</div>
          <div>{{ stock.P }}</div>
        </template>
        <template v-else>
          <div>{{ $t('position-table-item.subscription.cost') }}</div>
          <div>{{ position.price }}</div>
        </template>
      </van-col>
      <van-col span="6" class="text-right">
        <template v-if="Number(position.count)">
          <div class="text-success" :class="{'text-danger': isLost}">
            <div>{{ toMoneyFormat(pl) }}</div>
            <div>{{ plPercent }}%</div>
          </div>
        </template>
        <template v-else>
          {{ $t('position-table-item.daily-limit-subscription-in-progress') }}
        </template>
      </van-col>
    </van-row>
  </van-cell>
</template>

<style scoped></style>
