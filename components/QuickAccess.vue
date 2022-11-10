<script lang="ts" setup>
const { t } = useUtility()

const quickAccessItemsFirstPage = computed(() => [
  { icon: 'Global-Network', name: t('quick-access.items.global-indexes') },
  { icon: 'business_growth', name: t('quick-access.items.big-deal') },
  { icon: 'global-data', name: t('quick-access.items.market') },
  { icon: 'IPOfuck', name: t('quick-access.items.ipo') },
  { icon: 'caiwuFinance1', name: t('quick-access.items.main-ranking') },
  { icon: 'data', name: t('quick-access.items.north-fund') },
  { icon: 'bookmark-add', name: t('quick-access.items.watch-list') },
  { icon: 'Pound-Rise', name: t('quick-access.items.gain-list') },
  { icon: 'Dollar-Fall', name: t('quick-access.items.drop-list') },
  { icon: 'shuju', name: t('quick-access.items.economic-data') }
])

const quickAccessItemsSecondPage = computed(() =>
  [
    { icon: 'exchange', name: t('quick-access.items.turnover-rate') },
    { icon: 'heartbeat', name: t('quick-access.items.amplitude-list') }
  ]
)
</script>

<template>
  <van-swipe
    lazy-render
    indicator-color="var(--van-blue)"
    class="pb-5 mb-2.5 bg-white"
    :loop="false"
  >
    <van-swipe-item>
      <van-grid :column-num="5" :border="false" :icon-size="24" clickable>
        <van-grid-item
          v-for="(item, index) in quickAccessItemsFirstPage"
          :key="index"
          icon-prefix="vicon"
          :icon="item.icon"
          :text="item.name"
        />
      </van-grid>
    </van-swipe-item>
    <van-swipe-item>
      <van-grid :column-num="5" :border="false" :icon-size="24" clickable>
        <van-grid-item v-for="(item, index) in quickAccessItemsSecondPage" :key="index" icon-prefix="vicon" :icon="item.icon" :text="item.name" />
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped></style>
