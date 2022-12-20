<script lang="ts" setup>
import { IUserDeposit } from '~~/types/user'
import { IDepositAccount } from '~~/types/deposit-account'
import { DEPOSIT_STATUS } from '~~/types/deposit'

const { $routesList, $typedRouter } = useNuxtApp()
const { depositListService, addNewDepositService, getDepositAccountsService } = useApiServices()

const deposit = ref<number>()
const isDepositPopupVisible = ref(false)
const isDepositAccountVisible = ref(false)
const depositList = ref<IUserDeposit[]>([])
const depositAccounts = ref<IDepositAccount[]>([])
const depositAccount = ref<string>('')
const isLoading = ref(false)
const isFinished = ref(false)
const page = ref(1)
const pageSize = ref(20)

const depositAccountOptions = computed(() => depositAccounts.value.map(account => ({
  text: account.bank_name,
  value: account.id
})))
const computedDepositAccount = computed(() => depositAccounts.value.find(({ id }) => id === Number(depositAccount.value)))

const getDepositList = async () => {
  const res = await depositListService(page.value, pageSize.value)

  if (res?.data) {
    depositList.value.push(...res.data.data)

    if (res.data.data.length < pageSize.value) {
      isFinished.value = true
    }
    isLoading.value = false
    page.value++
  } else {
    isFinished.value = true
  }
}

const getDepositAccounts = async () => {
  const response = await getDepositAccountsService()

  if (response?.data) {
    depositAccounts.value = response.data
  }
}

const submitDeposit = async () => {
  const response = await addNewDepositService(Number(deposit.value), Number(depositAccount.value))

  if (response?.data) {
    isDepositPopupVisible.value = false
    $typedRouter.push({ name: $routesList.profileDepositDepositId, params: { depositId: response.data.id } })
  }
}
const addDeposit = () => {
  isDepositPopupVisible.value = true
}

const goToDetail = (depositId : number) => {
  $typedRouter.push({ name: $routesList.profileDepositDepositId, params: { depositId } })
}

getDepositList()
getDepositAccounts()

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
      <van-list
        v-model:loading="isLoading"
        :finished="isFinished"
        :finished-text="$t('page.profile.deposit.finished-text')"
        :loading-text="$t('page.profile.deposit.loading-text')"
        @load="getDepositList"
      >
        <van-cell
          v-for="(item, index) in depositList"
          :key="index"
          :title="item.amount"
          :value="item.status === DEPOSIT_STATUS.APPROVED ? '已审核' : '拒审'"
          :label="$dayjs(item.created_at).format('HH:mm DD-MM-YYYY')"
          clickable
          @click="goToDetail(item.id)"
        />
      </van-list>
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
            input-align="right"
            type="number"
          />

          <van-field
            :model-value="computedDepositAccount?.bank_name"
            :label="$t('page.profile.deposit.deposit-account')"
            input-align="right"
            readonly
            is-link
            @click="isDepositAccountVisible = true"
          />
        </van-cell-group>

        <div class="px-4 mt-4">
          <van-button type="primary" block round @click="submitDeposit">
            {{ $t("page.profile.submit") }}
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="isDepositAccountVisible"
      closeable
      close-icon="close"
      position="bottom"
    >
      <van-cascader
        v-model="depositAccount"
        :title="$t('page.profile.deposit.deposit-account')"
        :options="depositAccountOptions"
        @close="isDepositAccountVisible = false"
        @finish="isDepositAccountVisible = false"
      />
    </van-popup>

    <TheBottomNavigation />
  </div>
</template>

<style scoped></style>
