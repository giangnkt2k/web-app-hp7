<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.statusInformation') }}  {{ (userInformation?.verification_status === APP_USER_VERIFY_STATUS.VERIFIED) ? '验证' : '未经证实' }}
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.realNameInfor") }}
    </div>
    <div class="mx-5  bg-light-50 rounded-md">
      <van-cell-group inset>
        <van-field v-model="realName" :label="$t('page.profile.kyc.realName')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.realName')})" />
        <van-field v-model="tel" type="tel" :label="$t('page.profile.kyc.phone')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.phone')})" />
        <van-field v-model="identityNumber" type="digit" :label="$t('page.profile.kyc.identityNumber')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})" />
      </van-cell-group>
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.uploadID") }}
    </div>
    <div class="mx-5  bg-light-50 rounded-md">
      <div class="text-sm py-3 px-4 ">
        <div class="flex justify-between">
          <div class="text-[#646566] pb-2 pl-3">
            {{ $t('page.profile.kyc.idCardFront') }}
          </div>
          <van-uploader v-model="idCardFont" :disabled="idCardFont.length > 0" max-count="1">
            <template #preview-cover="{ file }">
              <div class="bg-[#0000004d] text-center text-12px text-white p-1 w-full absolute bottom-0 van-ellipsis van-ellipsis">
                {{ file.name }}
              </div>
            </template>
          </van-uploader>
        </div>
        <van-divider />
      </div>
      <div class="text-sm px-4 flex justify-between">
        <div class="text-[#646566] pb-2 pl-3">
          {{ $t('page.profile.kyc.idCardBack') }}
        </div>
        <van-uploader v-model="idCardBack" :disabled="idCardBack.length > 0" max-count="1">
          <template #preview-cover="{ file }">
            <div class="bg-[#0000004d] text-center text-12px text-white p-1 w-full absolute bottom-0 van-ellipsis">
              {{ file.name }}
            </div>
          </template>
        </van-uploader>
      </div>
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.bankInfor") }}
    </div>
    <div class="mx-5  bg-light-50 rounded-md">
      <van-cell-group inset>
        <van-field v-model="affiliatedBank" :label="$t('page.profile.kyc.affiliatedBank')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})" />
        <van-field v-model="cardNumber" type="digit" :label="$t('page.profile.kyc.cardNumber')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.cardNumber')})" />
        <van-field v-model="accountName" type="text" :label="$t('page.profile.kyc.username')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.username')})" />
        <van-field v-model="branch" type="digit" :label="$t('page.profile.kyc.branch')" :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.branch')})" />
      </van-cell-group>
    </div>
    <div class="mx-5 my-5">
      <van-button type="primary" block @click="submitKyc">
        {{ $t('page.profile.submit') }}
      </van-button>
    </div>
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.notice') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UploaderFileListItem } from 'vant'
import { storeToRefs } from 'pinia'
import { useAuthenticationStore } from '~~/stores/authentication'
import { APP_USER_VERIFY_STATUS } from '~~/types/user'

const userStore = useAuthenticationStore()
const { userInformation } = storeToRefs(userStore)
const { $routesList, $toast } = useNuxtApp()
const { uploadImageService, kycService } = useApiServices()

const realName = ref('')
const tel = ref('')
const identityNumber = ref('')
const idCardFont = ref<UploaderFileListItem[]>([])
const idCardBack = ref<UploaderFileListItem[]>([])
const affiliatedBank = ref('')
const cardNumber = ref('')
const accountName = ref('')
const branch = ref('')

const submitKyc = async () => {
  if (idCardBack.value[0]?.file && idCardFont.value[0]?.file) {
    const formDataCardBack = new FormData()
    const formDataCardFront = new FormData()
    formDataCardFront.append('file', idCardFont.value[0].file)
    formDataCardBack.append('file', idCardBack.value[0].file)
    await uploadImageService(formDataCardFront, 0)
    await uploadImageService(formDataCardBack, 1)
  }

  const res = await kycService({
    real_name: realName.value,
    phone: tel.value,
    id_number_cccd: identityNumber.value,
    bank_name: affiliatedBank.value,
    bank_number: cardNumber.value,
    account_name: accountName.value,
    bank_branch: branch.value
  })
  if (res.status === 200) {
    $toast.success('已发送身份验证请求')
  }
}

</script>
<style lang="scss" scoped>
</style>
