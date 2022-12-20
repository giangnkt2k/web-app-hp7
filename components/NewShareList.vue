<script lang="ts" setup>
import { INewShare } from '~~/types/new-share'

const { userNewSharesService } = useApiServices()

const isLoading = ref(false)
const isFinished = ref(false)
const newShares = ref<INewShare[]>([])
const currentPage = ref(1)

const getNewShares = async (page?: number) => {
  isFinished.value = false
  isLoading.value = true
  currentPage.value = page ?? currentPage.value

  const response = await userNewSharesService(currentPage.value)

  // Set new shares
  if (response.data?.data?.data) {
    newShares.value.push(...response.data.data.data)

    // If the result is smaller than 20. It means there's no more data
    if (response.data.data.data.length < 20) {
      isFinished.value = true
    }

    isLoading.value = false
    currentPage.value++
  } else {
    isFinished.value = true
  }
}
</script>

<template>
  <div>
    <van-list
      v-model:loading="isLoading"
      :finished="isFinished"
      :finished-text="$t('new-share-list.finished-text')"
      :loading-text="$t('new-share-list.loading-text')"
      class="pt-3"
      @load="getNewShares"
    >
      <NewShareListItem
        v-for="(share, index) in newShares"
        :key="index"
        :share="share"
      />
    </van-list>
  </div>
</template>

<style scoped></style>
