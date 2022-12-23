<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="mt-3 mb-7 mx-3">
      <van-cell-group
        class="mb-8"
        inset
      >
        <div
          v-for="(item, index) in withdrawalList"
          :key="index"
        >
          <van-cell
            :title="item.amount"
            :value="item.is_approved ? '已审核' : '拒审'"
            :label="item.created_at"
          />
        </div>
      </van-cell-group>
      <div class="my-3 text-center text-[#969799] ">
        {{ $t('list.empty') }}}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IUserWithdrawal } from '~~/types/user'

const { withdrawalHistoryService } = useApiServices()
const withdrawalList = ref<IUserWithdrawal[]>([])

const getWithdrawalHistory = async () => {
  const res = await withdrawalHistoryService()

  if (res?.data) {
    withdrawalList.value = res.data.data
  }
}

getWithdrawalHistory()

</script>
