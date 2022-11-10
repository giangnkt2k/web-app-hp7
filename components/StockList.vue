<script lang="ts" setup>
import { IStock } from '~~/types/stock'

type Props = {
  isLoading?: boolean;
  isFinished?: boolean;
  stocks: IStock[];
  offsetTop?: number;
};

type Emits = {
  (event: 'load'): void;
  (event: 'update:is-loading', value: boolean): void;
};

const props = withDefaults(defineProps<Props>(), { offsetTop: 54 })
const emit = defineEmits<Emits>()

const isLoadingComputed = computed({
  get () {
    return !!props.isLoading
  },
  set (value) {
    emit('update:is-loading', value)
  }
})
</script>

<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-row class="text-xs py-2.5 bg-gray-100">
        <van-col span="12" class="pl-4">
          {{ $t("stock-list.headers.name") }}
        </van-col>
        <van-col span="6" class="text-right">
          {{ $t("stock-list.headers.price") }}
        </van-col>
        <van-col span="6" class="text-right pr-4">
          {{ $t("stock-list.headers.change") }}
        </van-col>
      </van-row>
    </van-sticky>
    <van-list
      v-model:loading="isLoadingComputed"
      :finished="isFinished"
      :finished-text="$t('stock-list.finished-text')"
      :loading-text="$t('stock-list.loading-text')"
      @load="$emit('load')"
    >
      <StockListItem v-for="stock in stocks" :key="stock.FS" :stock="stock" />
    </van-list>
  </div>
</template>

<style scoped></style>
