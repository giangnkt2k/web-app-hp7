<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profileDeposit}" />

    <div class="mt-10 p-3">
      <h2 class="van-doc-demo-block__title ">
        {{ $t("page.profile.deposit.infoDeposit") }}
      </h2>
      <van-cell-group>
        <van-cell :title="$t('page.profile.deposit.money')" :value="money" />
        <van-cell :title="$t('page.profile.deposit.status')" :value="readableStatus" />
      </van-cell-group>
    </div>
    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
import { DEPOSIT_STATUS } from '~~/types/deposit'

const { depositDetailService } = useApiServices()
const route = useRoute()

const money = ref(0)
const status = ref<DEPOSIT_STATUS>(DEPOSIT_STATUS.PENDING)

const readableStatus = computed(() => status.value === DEPOSIT_STATUS.APPROVED ? '已审核' : '拒审')
const getDepositDetail = async () => {
  const res = await depositDetailService(Number(route.params.depositId.toString()))
  money.value = res.data.amount
  status.value = res.data.status
}
getDepositDetail()
</script>
