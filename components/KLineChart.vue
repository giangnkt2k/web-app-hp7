<script lang="ts" setup>
import { init, Chart, KLineData, dispose } from 'klinecharts'
import { ChartType, DrawableShape } from '~~/types/chart'

type Props = {
  data: KLineData[];
  // TODO: Provide better typing
  chartOptions?: any;
  chartType?: ChartType;
};

interface Emits {
  (event: 'reload'): void;
}

const props = withDefaults(defineProps<Props>(), {
  // Chart settings and options. Docs: https://klinecharts.com/guide/style
  chartOptions: {
    grid: {
      show: true
    }
  },
  chartType: ChartType.CANDLE_SOLID
})

defineEmits<Emits>()

const { t } = useUtility()

const selectedTimeRange = useSelectedTimeRange()

const kLineChartRef = ref<HTMLDivElement>()
const klineInstace = ref<Chart>()
const chartWidth = ref(0)

const isMobileMode = computed(() => chartWidth.value < 500)

const computedChartOptions = computed(() => ({
  candle: {
    type: props.chartType,
    tooltip: {
      labels: [
        t('kline.tooltip.time'),
        t('kline.tooltip.open'),
        t('kline.tooltip.close'),
        t('kline.tooltip.high'),
        t('kline.tooltip.low'),
        t('kline.tooltip.volume')
      ]
    }
  },
  yAxis: {
    inside: isMobileMode.value
  },
  ...props.chartOptions
}))

const createChartShape = (shape: DrawableShape) => {
  klineInstace.value?.createShape(shape)
}

const removeShapes = () => {
  klineInstace.value?.removeShape()
}

onMounted(() => {
  if (kLineChartRef.value) {
    klineInstace.value = init(kLineChartRef.value, computedChartOptions.value)
    klineInstace.value.applyNewData(props.data)
    klineInstace.value.createTechnicalIndicator('MA', false, {
      id: 'candle_pane'
    })
    klineInstace.value.createTechnicalIndicator('VOL', false, { height: 120 })
    klineInstace.value.createTechnicalIndicator('MACD', false, { height: 120 })
    chartWidth.value = klineInstace.value.getWidth().content
  }
})

watch(
  () => props.data,
  (value, oldData) => {
    const oldChartValue = klineInstace.value?.getDataList()
    if (oldChartValue && !!oldChartValue.length && oldData?.length) {
      const newData = value.reduce((chartData: KLineData[], candle) => {
        const existed = oldChartValue.find(
          ({ timestamp }) => timestamp === candle.timestamp
        )
        if (!existed || JSON.stringify(candle) !== JSON.stringify(existed)) {
          chartData.push(candle)
        }

        return chartData
      }, [])
      if (newData.length) {
        newData.forEach((candle) => {
          klineInstace.value?.updateData(candle)
        })
      }
      return
    }

    klineInstace.value?.applyNewData(value)
  },
  {
    immediate: true
  }
)

watch(
  () => computedChartOptions.value,
  (value) => {
    klineInstace.value?.setStyleOptions(value)
  },
  {
    immediate: true
  }
)

onBeforeUnmount(() => {
  if (klineInstace.value) {
    dispose(klineInstace.value)
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col sm:flex-row sm:flex-wrap">
    <ChartToolbar
      v-model:time-range="selectedTimeRange"
      @reload="$emit('reload')"
    />

    <div class="k-line-chart__side-toolbar flex sm:flex-col">
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.HORIZONTAL_STRAIGHT_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="5" y="11.5" width="14" height="1" rx="0.5" />
          <ellipse cx="12" cy="12" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.HORIZONTAL_RAY_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="4.5" y="11.5" width="15" height="1" rx="0.5" />
          <ellipse cx="6" cy="12" rx="1.5" ry="1.5" />
          <ellipse cx="13" cy="12" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.HORIZONTAL_SEGMENT)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="5" y="11.5" width="14" height="1" rx="0.5" />
          <ellipse cx="6" cy="12" rx="1.5" ry="1.5" />
          <ellipse cx="18" cy="12" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.VERTICAL_STRAIGHT_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="11.5" y="4" width="1" height="16" rx="0.5" />
          <ellipse cx="12" cy="12" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.VERTICAL_RAY_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="11.5" y="4.5" width="1" height="15" rx="0.5" />
          <ellipse cx="12" cy="18" rx="1.5" ry="1.5" />
          <ellipse cx="12" cy="11" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.VERTICAL_SEGMENT)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="11.5" y="5" width="1" height="14" rx="0.5" />
          <ellipse cx="12" cy="18" rx="1.5" ry="1.5" />
          <ellipse cx="12" cy="6" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.STRAIGHT_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect
            x="5.989593505859375"
            y="17.303306579589844"
            width="16"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480973816180722,9.303303481670355)"
          />
          <ellipse cx="14" cy="10" rx="1.5" ry="1.5" />
          <ellipse cx="10" cy="14" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.RAY_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect
            x="6.989593505859375"
            y="16.303314208984375"
            width="15"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-9.480979210977239,9.71751925443823)"
          />
          <ellipse cx="13" cy="11" rx="1.5" ry="1.5" />
          <ellipse cx="8" cy="16" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.SEGMENT)"
      >
        <svg viewBox="0 0 24 24">
          <rect
            x="5.989593505859375"
            y="17.303298950195312"
            width="14"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480968421384205,9.30330124707234)"
          />
          <ellipse cx="16" cy="8" rx="1.5" ry="1.5" />
          <ellipse cx="7" cy="17" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.PRICE_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="4.5" y="13.5" width="15" height="1" rx="0.5" />
          <ellipse cx="6" cy="14" rx="1.5" ry="1.5" />
          <path
            d="M8.314036947998046,12.235949340820312L10.985912947998047,12.235949340820312L10.985912947998047,11.517199340820312L10.151922947998047,11.517199340820312L10.151922947998047,7.735949340820312L9.497632947998047,7.735949340820312C9.214422947998047,7.917589340820312,8.915602947998046,8.030869340820313,8.464427947998047,8.108999340820313L8.464427947998047,8.661729340820312L9.274972947998046,8.661729340820312L9.274972947998046,11.517199340820312L8.314036947998046,11.517199340820312L8.314036947998046,12.235949340820312ZM11.581612947998046,12.235949340820312L14.556222947998048,12.235949340820312L14.556222947998048,11.493759340820311L13.597242947998048,11.493759340820311C13.386302947998047,11.493759340820311,13.093332947998046,11.517199340820312,12.864822947998046,11.546499340820311C13.675362947998046,10.724229340820312,14.347242947998048,9.831649340820313,14.347242947998048,9.001579340820312C14.347242947998048,8.151969340820312,13.788642947998046,7.610949340820312,12.948802947998047,7.610949340820312C12.343332947998046,7.610949340820312,11.946852947998046,7.845329340820312,11.532782947998047,8.290639340820313L12.024972947998048,8.778919340820313C12.247632947998046,8.525009340820313,12.511302947998047,8.308219340820312,12.835522947998047,8.308219340820312C13.261302947998047,8.308219340820312,13.501532947998047,8.593369340820313,13.501532947998047,9.044539340820313C13.501532947998047,9.757429340820313,12.792552947998047,10.618759340820311,11.581612947998046,11.726179340820313L11.581612947998046,12.235949340820312ZM16.460522947998047,12.360949340820312C17.312082947998046,12.360949340820312,18.026902947998046,11.894149340820313,18.026902947998046,11.048449340820312C18.026902947998046,10.431259340820311,17.642162947998045,10.050399340820313,17.144112947998046,9.911729340820312L17.144112947998046,9.882429340820313C17.612862947998046,9.696889340820313,17.882402947998045,9.331649340820313,17.882402947998045,8.823839340820312C17.882402947998045,8.032829340820312,17.300362947998046,7.610949340820312,16.44294294799805,7.610949340820312C15.921462947998046,7.610949340820312,15.495682947998047,7.821889340820313,15.110912947998047,8.151969340820312L15.565992947998048,8.722279340820313C15.825752947998048,8.460559340820312,16.083572947998046,8.308219340820312,16.401922947998045,8.308219340820312C16.77888294799805,8.308219340820312,16.99568294799805,8.525009340820313,16.99568294799805,8.892199340820312C16.99568294799805,9.319929340820313,16.730052947998047,9.610949340820312,15.921462947998046,9.610949340820312L15.921462947998046,10.247669340820313C16.88044294799805,10.247669340820313,17.138252947998048,10.530869340820313,17.138252947998048,10.991809340820312C17.138252947998048,11.407829340820314,16.833572947998046,11.642199340820312,16.38239294799805,11.642199340820312C15.974192947998047,11.642199340820312,15.657782947998047,11.433219340820312,15.392162947998047,11.161729340820312L14.978102947998046,11.743759340820311C15.290602947998046,12.097279340820313,15.765212947998048,12.360949340820312,16.460522947998047,12.360949340820312Z"
          />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.PARALLEL_STRAIGHT_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect
            x="7.989593505859375"
            y="20.303314208984375"
            width="16"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-12.016513056401891,11.596198947183439)"
          />
          <rect
            x="3.4586830139160156"
            y="15.292892456054688"
            width="16"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-9.800682931907204,6.924842852749634)"
          />
          <ellipse cx="16" cy="13" rx="1.5" ry="1.5" />
          <ellipse cx="12" cy="17" rx="1.5" ry="1.5" />
          <ellipse cx="9.5" cy="10" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.PRICE_CHANNEL_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect
            x="5.989593505859375"
            y="17.303298950195312"
            width="16"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,0.7071067690849304,0.7071067690849304,-10.480968421384205,9.30330124707234)"
          />
          <rect
            x="5.031974792480469"
            y="13.607009887695312"
            width="12"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,-0.7071067690849304,-0.7071067690849304,11.095440153447726,26.786762123917924)"
          />
          <rect
            x="11.40380859375"
            y="19.303298950195312"
            width="12"
            height="1"
            rx="0.5"
            transform="matrix(0.7071067690849304,-0.7071067690849304,-0.7071067690849304,-0.7071067690849304,16.98959169711361,41.016502553537975)"
          />
          <ellipse cx="14" cy="10" rx="1.5" ry="1.5" />
          <ellipse cx="10" cy="14" rx="1.5" ry="1.5" />
          <ellipse cx="15" cy="15" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button
        class="k-line-chart__icon-wrapper"
        @click="createChartShape(DrawableShape.FIBONACCI_LINE)"
      >
        <svg viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="1" rx="0.5" />
          <rect x="4" y="9" width="16" height="1" rx="0.5" />
          <rect x="4" y="15" width="16" height="1" rx="0.5" />
          <rect x="4" y="18" width="16" height="1" rx="0.5" />
          <rect x="4" y="12" width="16" height="1" rx="0.5" />
          <ellipse cx="12" cy="18.5" rx="1.5" ry="1.5" />
          <ellipse cx="16" cy="6.5" rx="1.5" ry="1.5" />
          <ellipse cx="8" cy="6.5" rx="1.5" ry="1.5" />
        </svg>
      </button>
      <button class="k-line-chart__icon-wrapper" @click="removeShapes">
        <svg viewBox="0 0 1024 1024" style="width: 34px; height: 34px">
          <path
            d="M256 333.872a28.8 28.8 0 0 1 28.8 28.8V768a56.528 56.528 0 0 0 56.544 56.528h341.328A56.528 56.528 0 0 0 739.2 768V362.672a28.8 28.8 0 0 1 57.6 0V768a114.128 114.128 0 0 1-114.128 114.128H341.328A114.128 114.128 0 0 1 227.2 768V362.672a28.8 28.8 0 0 1 28.8-28.8zM405.344 269.648a28.8 28.8 0 0 0 28.8-28.8 56.528 56.528 0 0 1 56.528-56.544h42.656a56.528 56.528 0 0 1 56.544 56.544 28.8 28.8 0 0 0 57.6 0 114.128 114.128 0 0 0-112.64-114.128h-45.648a114.144 114.144 0 0 0-112.64 114.128 28.8 28.8 0 0 0 28.8 28.8z"
          />
          <path
            d="M163.2 266.672a28.8 28.8 0 0 1 28.8-28.8h640a28.8 28.8 0 0 1 0 57.6H192a28.8 28.8 0 0 1-28.8-28.8zM426.672 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8zM597.344 371.2a28.8 28.8 0 0 1 28.8 28.8v320a28.8 28.8 0 0 1-57.6 0V400a28.8 28.8 0 0 1 28.8-28.8z"
          />
        </svg>
      </button>
    </div>

    <div
      ref="kLineChartRef"
      class="flex-grow w-full sm:w-auto sm:h-[calc(100vh-30px)]"
    />
  </div>
</template>

<style lang="scss" scoped>
.k-line-chart__side-toolbar {
  @apply border-b sm:border-r border-[#ebedf1] overflow-auto min-h-9 max-w-screen items-center;
}

.k-line-chart__icon-wrapper {
  @apply min-w-9 min-h-9 rounded-sm hover:bg-blue-400 hover:bg-opacity-10 my-0.5;

  svg {
    @apply fill-[#677294];
  }
}
</style>
