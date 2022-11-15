<script lang="ts" setup>
const { $routesList, $typedRouter } = useNuxtApp()

const deposit = ref()
const showPopupDeposit = ref(false)

const submitDeposit = () => {
  // TODO: ....call api get deposit id
  const depositId = 1
  $typedRouter.push({ name: $routesList.profileDepositDepositId, params: { depositId } })
}
const addDeposit = () => {
  showPopupDeposit.value = true
}
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
      <van-cell-group inset>
        <van-cell title="10000" value="Accept" label="10:10:00" />
        <van-cell title="100000" value="Deny" label="10:10:00" />
      </van-cell-group>
    </div>
    <van-popup
      v-model:show="showPopupDeposit"
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
