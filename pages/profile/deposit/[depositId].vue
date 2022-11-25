<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profileDeposit}" />

    <div class="mt-10 p-3">
      <h2 class="van-doc-demo-block__title ">
        {{ $t("page.profile.deposit.infoDeposit") }}
      </h2>
      <van-cell-group>
        <van-cell :title="$t('page.profile.deposit.money')" value="10000" />
        <van-cell :title="$t('page.profile.deposit.status')" value="Pending" />
      </van-cell-group>
      <h2 class="van-doc-demo-block__title my-2">
        {{ $t("page.profile.deposit.methodTransfer") }}
      </h2>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <template #title>
            <div>{{ $t("page.profile.deposit.methodTransfer.atm") }} <van-icon name="ecard-pay" /></div>
          </template>
          Content 1
        </van-collapse-item>
        <van-collapse-item name="2">
          <template #title>
            <div>{{ $t("page.profile.deposit.methodTransfer.credit") }} <van-icon name="credit-pay" /></div>
          </template>
          Content 1
        </van-collapse-item>
      </van-collapse>
      <div class="mt-4">
        <van-button type="primary" round block @click="submitTransfer">
          {{ $t("page.profile.submit") }}
        </van-button>
      </div>
    </div>
    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
const { $routesList, $typedRouter } = useNuxtApp()
const { addNewDeposit } = useApiServices()

const activeNames = ref(['1'])

const submitTransfer = async () => {
  // TODO: Integrate API to submit the deposit status `paid`
  await addNewDeposit(4, 100000)
  $typedRouter.push({ name: $routesList.profileDeposit })
}
</script>
