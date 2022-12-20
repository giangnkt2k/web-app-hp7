<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.statusInformation') }}  {{ (userInformation?.verification_status === APP_USER_VERIFY_STATUS.VERIFIED) ? '验证' : '未经证实' }}
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.realNameInfor") }}
    </div>
    <van-form
      :readonly="userInformation?.verification_status !== APP_USER_VERIFY_STATUS.NOT_VERIFIED"
      @submit="submitKycRequest"
    >
      <div class="mx-5  bg-light-50 rounded-md">
        <van-cell-group inset>
          <van-field
            v-model="form.realName"
            :label="$t('page.profile.kyc.realName')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.realName')})"
            name="real-name"
            :error="$v.realName.$error"
            :error-message="$v.realName.$errors[0]?.$message.toString()"
            @blur="$v.realName.$touch"
          />
          <van-field
            v-model="form.phone"
            type="tel"
            :label="$t('page.profile.kyc.phone')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.phone')})"
            name="phone"
            :error="$v.phone.$error"
            :error-message="$v.phone.$errors[0]?.$message.toString()"
            @blur="$v.phone.$touch"
          />
          <van-field
            v-model="form.identityNumber"
            type="digit"
            :label="$t('page.profile.kyc.identityNumber')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})"
            name="identity-number"
            :error="$v.identityNumber.$error"
            :error-message="$v.identityNumber.$errors[0]?.$message.toString()"
            @blur="$v.identityNumber.$touch"
          />
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
            <van-uploader
              v-model="idCardFont"
              :disabled="idCardFont.length > 0"
              max-count="1"
              :after-read="uploadFrontDoc"
            >
              <template #preview-cover="{ file }">
                <div class="bg-[#0000004d] text-center text-12px text-white p-1 w-full absolute bottom-0 van-ellipsis van-ellipsis">
                  {{ file?.name }}
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
          <van-uploader
            v-model="idCardBack"
            :disabled="idCardBack.length > 0"
            max-count="1"
            :after-read="uploadBackDoc"
          >
            <template #preview-cover="{ file }">
              <div class="bg-[#0000004d] text-center text-12px text-white p-1 w-full absolute bottom-0 van-ellipsis">
                {{ file?.name }}
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
          <van-field
            v-model="form.affiliatedBank"
            :label="$t('page.profile.kyc.affiliatedBank')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})"
            name="affiliatedBank"
            :error="$v.affiliatedBank.$error"
            :error-message="$v.affiliatedBank.$errors[0]?.$message.toString()"
            @blur="$v.affiliatedBank.$touch"
          />
          <van-field
            v-model="form.cardNumber"
            type="digit"
            :label="$t('page.profile.kyc.cardNumber')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.cardNumber')})"
            name="cardNumber"
            :error="$v.cardNumber.$error"
            :error-message="$v.cardNumber.$errors[0]?.$message.toString()"
            @blur="$v.cardNumber.$touch"
          />
          <van-field
            v-model="form.accountName"
            type="text"
            :label="$t('page.profile.kyc.username')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.username')})"
            name="accountName"
            :error="$v.accountName.$error"
            :error-message="$v.accountName.$errors[0]?.$message.toString()"
            @blur="$v.accountName.$touch"
          />
          <van-field
            v-model="form.branch"
            :label="$t('page.profile.kyc.branch')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.branch')})"
            name="branch"
            :error="$v.branch.$error"
            :error-message="$v.branch.$errors[0]?.$message.toString()"
            @blur="$v.branch.$touch"
          />
        </van-cell-group>
      </div>
      <div
        v-if="userInformation?.verification_status === APP_USER_VERIFY_STATUS.NOT_VERIFIED"
        class="mx-5 my-5"
      >
        <van-button
          type="primary"
          block
          native-type="submit"
          :disabled="$v.$invalid"
          :loading="isSubmitting"
        >
          {{ $t('page.profile.submit') }}
        </van-button>
      </div>
    </van-form>
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.notice') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UploaderFileListItem } from 'vant'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { UploaderAfterRead } from 'vant/lib/uploader/types'
import { useAuthenticationStore } from '~~/stores/authentication'
import { APP_USER_VERIFY_STATUS } from '~~/types/user'

const userStore = useAuthenticationStore()
const { setUserData } = userStore
const { userInformation } = storeToRefs(userStore)
const { $routesList, $typedRouter } = useNuxtApp()
const { required } = useValidators()
const { uploadFrontIdService, uploadBackIdService, kycService, userInfoService } = useApiServices()
const { getFileUrl } = useUtility()
const isSubmitting = ref(false)

const idCardFont = ref<UploaderFileListItem[]>([])
const idCardBack = ref<UploaderFileListItem[]>([])

const form = reactive({
  realName: '',
  phone: '',
  identityNumber: '',
  idFront: '',
  idBack: '',
  affiliatedBank: '',
  cardNumber: '',
  accountName: '',
  branch: ''
})

const rules = computed(() => ({
  realName: {
    required
  },
  phone: {
    required
  },
  identityNumber: {
    required
  },
  idFront: {
    required
  },
  idBack: {
    required
  },
  affiliatedBank: {
    required
  },
  cardNumber: {
    required
  },
  accountName: {
    required
  },
  branch: {
    required
  }
}))

const $v = useVuelidate(rules, form)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const uploadFrontDoc: UploaderAfterRead = async (data: {file: File, status: 'uploading' | undefined}) => {
  const uploadData = new FormData()
  uploadData.append('file', data.file)
  data.status = 'uploading'
  const res = await uploadFrontIdService(uploadData)

  if (res?.data) {
    form.idFront = res.data.filename
  }

  data.status = undefined
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const uploadBackDoc: UploaderAfterRead = async (data: {file: File, status: 'uploading' | undefined}) => {
  const uploadData = new FormData()
  uploadData.append('file', data.file)

  data.status = 'uploading'
  const res = await uploadBackIdService(uploadData)

  if (res?.data) {
    form.idBack = res.data.filename
  }

  data.status = undefined
}

const submitKycRequest = async () => {
  isSubmitting.value = true
  const res = await kycService(form)

  if (res?.data) {
    const userInfo = await userInfoService()

    if (userInfo.data) {
      setUserData(userInfo.data)
    }

    $typedRouter.push({ name: $routesList.profile })
  }

  isSubmitting.value = false
}

onMounted(() => {
  if (userInformation.value) {
    if (userInformation.value.id_front) {
      form.idFront = getFileUrl(userInformation.value.id_front.id)
      idCardFont.value = [
        {
          isImage: true,
          url: getFileUrl(userInformation.value.id_front.id)
        }
      ]

      $v.value.idFront.$touch()
    }

    if (userInformation.value.id_back) {
      form.idBack = getFileUrl(userInformation.value.id_back.id)
      idCardBack.value = [
        {
          isImage: true,
          url: getFileUrl(userInformation.value.id_back.id)
        }
      ]
      $v.value.idBack.$touch()
    }

    form.accountName = userInformation.value.account_holder
    form.affiliatedBank = userInformation.value.bank_name
    form.branch = userInformation.value.bank_branch
    form.cardNumber = userInformation.value.bank_number
    form.identityNumber = userInformation.value.id_number
    form.phone = userInformation.value.phone
    form.realName = userInformation.value.real_name
  }
})
</script>
<style lang="scss" scoped>
</style>
