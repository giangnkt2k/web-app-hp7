<script lang="ts" setup>
import { ChartTimeRangeValue, IChartTimeRange } from '~~/types/chart'

interface Props {
  timeRange: ChartTimeRangeValue;
}

interface Emits {
  (event: 'update:time-range', value: ChartTimeRangeValue): void;
  (event: 'reload'): void;
}

defineProps<Props>()
defineEmits<Emits>()

const timeRanges: IChartTimeRange[] = [
  {
    text: '1m',
    value: '1M'
  },
  {
    text: '5m',
    value: '5M'
  },
  {
    text: '15m',
    value: '15M'
  },
  {
    text: '1H',
    value: '1H'
  },
  {
    text: '1D',
    value: 'D'
  }
]
</script>

<template>
  <div class="chart-toolbar">
    <div class="flex items-center flex-grow overflow-auto">
      <button
        class="chart-toolbar__time-range"
        :class="{
          'chart-toolbar__time-range--active': timeRange === 'line',
        }"
        @click="
          $emit('update:time-range', 'line');
          $emit('reload');
        "
      >
        {{ $t("kline.toolbar.line") }}
      </button>
      <button
        v-for="(range, index) in timeRanges"
        :key="index"
        class="chart-toolbar__time-range"
        :class="{
          'chart-toolbar__time-range--active': range.value === timeRange,
        }"
        @click="
          $emit('update:time-range', range.value);
          $emit('reload');
        "
      >
        {{ range.text }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart-toolbar {
  @apply text-[#76808f] border-b border-[#ebedf1] flex items-center;
  @apply relative w-full h-[fit-content] min-h-29px overflow-hidden;
}

.chart-toolbar__time-range {
  @apply py-1 px-2 hover:text-blue-600 text-sm leading-tight rounded-sm;
}

.chart-toolbar__time-range--active {
  @apply bg-blue-600 bg-opacity-20 text-blue-600;
}
</style>
