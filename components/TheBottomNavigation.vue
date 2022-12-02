<script lang="ts" setup>
const route = useRoute()

const active = computed(() => route.name?.toString())
</script>

<template>
  <div class="max-w-500px w-screen fixed bottom-0 mx-auto">
    <van-tabbar :model-value="active" :fixed="false" @update:model-value="$typedRouter.push({name: $event})">
      <van-tabbar-item :name="$routesList.index" icon="home-o">
        {{ $t('bottom-bar.home') }}
      </van-tabbar-item>
      <van-tabbar-item name="market" icon="chart-trending-o">
        {{ $t('bottom-bar.market') }}
      </van-tabbar-item>
      <van-tabbar-item :name="$routesList.position" icon="cluster-o">
        {{ $t('bottom-bar.position') }}
      </van-tabbar-item>
      <van-tabbar-item name="profile" icon="manager-o">
        {{ $t('bottom-bar.profile') }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
