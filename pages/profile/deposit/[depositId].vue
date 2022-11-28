<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profileDeposit}" />

    <div class="mt-10 p-3">
      <h2 class="van-doc-demo-block__title ">
        {{ $t("page.profile.deposit.infoDeposit") }}
      </h2>
      <van-cell-group>
        <van-cell :title="$t('page.profile.deposit.money')" :value="money" />
        <van-cell :title="$t('page.profile.deposit.status')" :value="status" />
      </van-cell-group>
    </div>
    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
const { depositDetailService2 } = useApiServices()
const route = useRoute()

const money = ref(0)
const status = ref('')
const getDepositDetail = async () => {
  const res = await depositDetailService2(Number(route.params.depositId.toString()))
  money.value = res.data.amount
  status.value = (res.data.is_reviewed) ? '已审核' : '拒审'
}
getDepositDetail()
</script>
