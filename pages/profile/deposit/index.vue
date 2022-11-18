<script lang="ts" setup>
import { IUserDeposit } from '~~/types/user'

const { $routesList, $typedRouter } = useNuxtApp()
const { depositDetailService } = useApiServices()

const deposit = ref()
const isDepositPopupVisible = ref(false)
const depositList = ref([])

const getDepositDetail = async () => {
  const res = await depositDetailService()
  const data = res.data.data.data
  if (data.length > 0) {
    depositList.value = data.map((item:IUserDeposit) => {
      return {
        ...item,
        is_check: (item.is_check === 1) ? '已审核' : '拒审',
        created_at: convertTime(item.created_at)
      }
    })
  }
}
const convertTime = (value:number) => {
  return new Date(value * 1000).toLocaleString()
}

const submitDeposit = () => {
  // TODO: ....call api get deposit id
  const depositId = 1
  $typedRouter.push({ name: $routesList.profileDepositDepositId, params: { depositId } })
}
const addDeposit = () => {
  isDepositPopupVisible.value = true
}

getDepositDetail()

</script>

<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="deposit__body my-7">
      <div class="my-3 px-4">
        <van-button round icon="plus" type="success" block @click="addDeposit">
          {{ $t("page.profile.deposit.addNew") }}
        </van-button>
      </div>
      <van-cell-group v-for="(item, index) in depositList" :key="index" inset>
        <van-cell :title="item.amount" :value="item.is_check" :label="item.created_at" />
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
