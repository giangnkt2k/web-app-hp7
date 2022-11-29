<script lang="ts" setup>
const route = useRoute()
const { t } = useUtility()

const pageTitle = computed(() => t(route.meta.pageTitle || 'page.home.title'))

useHead({
  title: pageTitle
})
</script>

<template>
  <div
    class="max-w-500px mx-auto"
  >
    <slot />
  </div>
</template>

<style scoped></style>
