<script lang="ts" setup>
import { RouteLocationRaw } from 'vue-router'

type Props = {
  backTo?: RouteLocationRaw
  title?: string
}

const props = withDefaults(defineProps<Props>(), { backTo: '/', title: '' })

const router = useRouter()
const route = useRoute()
const { t } = useUtility()

const navTitle = computed(() => t(props.title || route.meta.pageTitle || ''))

const back = () => {
  if (props.backTo) {
    router.push(props.backTo)
  }
}
</script>

<template>
  <van-nav-bar
    left-arrow
    class="!bg-primary"
    :border="false"
    @click-left="back"
  >
    <template v-if="!!backTo" #left>
      <van-icon name="arrow-left" color="white" size="18" class="mr-1" />
      <span class="text-white">
        {{ $t('the-navbar.back') }}
      </span>
    </template>
    <template #title>
      <div class="text-white font-bold">
        {{ navTitle }}
      </div>
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
