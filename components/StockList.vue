<script lang="ts" setup>
import { IStock } from "~~/types/stock";

type Props = {
  isLoading?: boolean;
  isFinished?: boolean;
  stocks: IStock[];
};

type Emits = {
  (event: "load"): void;
  (event: "update:is-loading", value: boolean): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isLoadingComputed = computed({
  get() {
    return !!props.isLoading;
  },
  set(value) {
    emit("update:is-loading", value);
  },
});
</script>

<template>
  <van-list
    v-model:loading="isLoadingComputed"
    :finished="isFinished"
    :finished-text="$t('stock-list.finished-text')"
    :loading-text="$t('stock-list.loading-text')"
    @load="$emit('load')"
  >
    <van-cell v-for="stock in stocks" :key="stock.FS" :title="stock.N" />
  </van-list>
</template>

<style scoped></style>
