<script lang="ts" setup>
definePageMeta({
  pageTitle: 'page.position.title'
})

const headerRef = ref<HTMLElement>()
const active = ref(0)

const { height } = useElementBounding(headerRef)
</script>

<template>
  <div>
    <van-sticky>
      <TheHeader ref="headerRef" />
    </van-sticky>

    <van-tabs
      v-model:active="active"
      color="var(--van-primary-color)"
      lazy-render
      sticky
      :offset-top="height"
      swipeable
    >
      <van-tab
        :title="$t('position.tab.position.title')"
      >
        <PositionTable />
      </van-tab>

      <van-tab :title="$t('position.tab.ipo.title')">
        <NewShareList />
      </van-tab>
    </van-tabs>

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
