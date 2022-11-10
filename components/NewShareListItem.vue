<script lang="ts" setup>
import { INewShare } from '~~/types/new-share'

type Props = {
  share: INewShare
}

const props = defineProps<Props>()
const { t, dateFormatter } = useUtility()

const status = computed(() => {
  let text = ''
  switch (props.share.status) {
    case 0:
      text = 'new-share-list.subscription.subscribing'
      break

    case 1:
      text = 'new-share-list.subscription.subscription-completed'
      break

    case 2:
      text = 'new-share-list.subscription.success'
      break

    case 3:
      text = 'new-share-list.subscription.subscription-failed'
      break

    default:
      break
  }

  return t(text)
})
</script>

<template>
  <div class="px-3 pb-2.5">
    <v-card class="text-xs">
      <van-row class="items-center leading-9">
        <van-col span="12">
          <span class="text-base font-bold">{{ share.p_name }}</span>
          <span class="ml-2">{{ share.market }}{{ share.p_code }}</span>
        </van-col>
        <van-col span="12" class="text-sm font-medium">
          {{ status }}
        </van-col>

        <van-col span="12">
          {{ $t('new-share-list.buy-price') }}: {{ share.subscribe_price }}
        </van-col>
        <van-col span="12">
          {{ $t('new-share-list.share-quantity') }}: {{ share.subscribe_lottery_count }}
        </van-col>

        <van-col span="12">
          {{ $t('new-share-list.subscription-amount') }}: {{ share.subscribe_amount }}
        </van-col>
        <van-col span="12">
          {{ $t('new-share-list.share-won') }}: {{ share.quota_count }}
        </van-col>

        <van-col span="24">
          {{ $t('new-share-list.subscription-time') }}: {{ dateFormatter($dayjs.unix(share.created_at).valueOf(), 'YYYY-MM-DD HH:mm:ss') }}
        </van-col>
        <van-col span="24">
          {{ $t('new-share-list.funded') }}: {{ share.funded_amount }}
        </van-col>
      </van-row>
    </v-card>
  </div>
</template>

<style scoped></style>
