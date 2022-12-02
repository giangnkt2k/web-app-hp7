<script lang="ts" setup>
definePageMeta({
  pageTitle: 'page.position.title'
})

const headerRef = ref<HTMLElement>()
</script>

<template>
  <div>
    <van-sticky>
      <TheHeader ref="headerRef" />
    </van-sticky>

    <PositionTable />

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
