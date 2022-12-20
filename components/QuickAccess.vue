<script lang="ts" setup>
import { MarketPageTabs } from '~~/types/market'

const { t } = useUtility()
const { $routesList } = useNuxtApp()

const quickAccessItemsFirstPage = computed(() => [
  { icon: 'global-data', name: t('quick-access.items.market'), route: { name: $routesList.market } },
  {
    icon: 'bookmark-add',
    name: t('quick-access.items.watch-list'),
    route: { name: $routesList.watchList }
  },
  {
    icon: 'Pound-Rise',
    name: t('quick-access.items.gain-list'),
    route: {
      name: $routesList.market,
      query: {
        tab: MarketPageTabs.UP
      }
    }
  },
  {
    icon: 'Dollar-Fall',
    name: t('quick-access.items.drop-list'),
    route: {
      name: $routesList.market,
      query: {
        tab: MarketPageTabs.DOWN
      }
    }
  },
  {
    icon: 'exchange',
    name: t('quick-access.items.turnover-rate'),
    route: {
      name: $routesList.market,
      query: {
        tab: MarketPageTabs.TURNOVER
      }
    }
  },
  {
    icon: 'heartbeat',
    name: t('quick-access.items.amplitude-list'),
    route: {
      name: $routesList.market,
      query: {
        tab: MarketPageTabs.AMPLITUDE
      }
    }
  }
])
</script>

<template>
  <van-swipe
    lazy-render
    indicator-color="var(--van-blue)"
    class="pb-5 mb-2.5 bg-white"
    :loop="false"
  >
    <van-swipe-item>
      <van-grid
        :column-num="5"
        :border="false"
        :icon-size="24"
        clickable
      >
        <van-grid-item
          v-for="(item, index) in quickAccessItemsFirstPage"
          :key="index"
          icon-prefix="vicon"
          :icon="item.icon"
          :text="item.name"
          :to="item.route"
        />
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped></style>
