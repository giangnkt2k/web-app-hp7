<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { IUserDeposit } from '~~/types/user'
import { useAuthenticationStore } from '~~/stores/authentication'

const { $routesList, $typedRouter } = useNuxtApp()
const { depositListService, addNewDeposit } = useApiServices()

const deposit = ref()
const isDepositPopupVisible = ref(false)
const depositList = ref<IUserDeposit[]>([])

const authStore = useAuthenticationStore()
const { userInformation } = storeToRefs(authStore)

const getDepositDetail = async () => {
  const res = await depositListService()

  if (res?.data) {
    depositList.value = res.data
  }
}

const submitDeposit = async () => {
  const idUser = (userInformation.value?.id) ? userInformation.value?.id : 1
  await addNewDeposit(Number(deposit.value), idUser)
  isDepositPopupVisible.value = false
  getDepositDetail()
}
const addDeposit = () => {
  isDepositPopupVisible.value = true
}

const goToDetail = (depositId : number) => {
  $typedRouter.push({ name: $routesList.profileDepositDepositId, params: { depositId } })
}

getDepositDetail()

</script>

<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="my-7 mx-3">
      <div class="my-3 px-4">
        <van-button round icon="plus" type="success" block @click="addDeposit">
          {{ $t("page.profile.deposit.addNew") }}
        </van-button>
      </div>
      <van-cell-group class="mb-8" inset>
        <div v-for="(item, index) in depositList" :key="index" @click="goToDetail(item.id)">
          <van-cell :title="item.amount" :value="item.is_reviewed ? '已审核' : '拒审'" :label="$dayjs(item.created_at).format('HH:mm DD-MM-YYYY')" />
        </div>
      </van-cell-group>
    </div>
    <van-popup
      v-model:show="isDepositPopupVisible"
      closeable
      close-icon="close"
      position="bottom"
    >
      <div class="pt-12 pb-3 bg-gray-200">
        <van-cell-group inset>
          <van-field
            v-model="deposit"
            :label="$t('page.profile.deposit.money')"
            placeholder=""
            input-align="right"
            type="number"
          />
        </van-cell-group>

        <div class="px-4 mt-4">
          <van-button type="primary" block round @click="submitDeposit">
            {{ $t("page.profile.submit") }}
          </van-button>
        </div>
      </div>
    </van-popup>

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
