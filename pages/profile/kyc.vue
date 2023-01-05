<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.statusInformation') }}  {{ (userInformation?.is_verified) ? '验证' : '未经证实' }}
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.realNameInfor") }}
    </div>
    <van-form
      :readonly="userInformation?.is_verified ? true : false"
      @submit="submitKycRequest"
    >
      <div class="mx-5  bg-light-50 rounded-md">
        <van-cell-group inset>
          <van-field
            v-model="form.real_name"
            :label="$t('page.profile.kyc.realName')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.realName')})"
            name="real-name"
            :error="$v.real_name.$error"
            :error-message="$v.real_name.$errors[0]?.$message.toString()"
            @blur="$v.real_name.$touch"
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
            v-model="form.id_number"
            type="digit"
            :label="$t('page.profile.kyc.identityNumber')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})"
            name="identity-number"
            :error="$v.id_number.$error"
            :error-message="$v.id_number.$errors[0]?.$message.toString()"
            @blur="$v.id_number.$touch"
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
            v-model="form.bank_name"
            :label="$t('page.profile.kyc.affiliatedBank')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.affiliatedBank')})"
            name="affiliatedBank"
            :error="$v.bank_name.$error"
            :error-message="$v.bank_name.$errors[0]?.$message.toString()"
            @blur="$v.bank_name.$touch"
          />
          <van-field
            v-model="form.bank_number"
            type="digit"
            :label="$t('page.profile.kyc.cardNumber')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.cardNumber')})"
            name="cardNumber"
            :error="$v.bank_number.$error"
            :error-message="$v.bank_number.$errors[0]?.$message.toString()"
            @blur="$v.bank_number.$touch"
          />
          <van-field
            v-model="form.account_holder"
            type="text"
            :label="$t('page.profile.kyc.username')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.username')})"
            name="accountName"
            :error="$v.account_holder.$error"
            :error-message="$v.account_holder.$errors[0]?.$message.toString()"
            @blur="$v.account_holder.$touch"
          />
          <van-field
            v-model="form.bank_branch"
            :label="$t('page.profile.kyc.branch')"
            :placeholder="$t('please.input',{fieldName:$t('page.profile.kyc.branch')})"
            name="branch"
            :error="$v.bank_branch.$error"
            :error-message="$v.bank_branch.$errors[0]?.$message.toString()"
            @blur="$v.bank_branch.$touch"
          />
        </van-cell-group>
      </div>
      <div
        v-if="!userInformation?.is_verified"
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
  real_name: '',
  phone: '',
  id_number: '',
  id_front: '',
  id_back: '',
  bank_name: '',
  bank_number: '',
  account_holder: '',
  bank_branch: ''
})

const rules = computed(() => ({
  real_name: {
    required
  },
  phone: {
    required
  },
  id_number: {
    required
  },
  id_front: {
    required
  },
  id_back: {
    required
  },
  bank_name: {
    required
  },
  bank_number: {
    required
  },
  account_holder: {
    required
  },
  bank_branch: {
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
    form.id_front = res.data
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
    form.id_back = res.data
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
      form.id_front = getFileUrl(userInformation.value.id_front)
      idCardFont.value = [
        {
          isImage: true,
          url: getFileUrl(userInformation.value.id_front)
        }
      ]

      $v.value.id_front.$touch()
    }

    if (userInformation.value.id_back) {
      form.id_back = getFileUrl(userInformation.value.id_back)
      idCardBack.value = [
        {
          isImage: true,
          url: getFileUrl(userInformation.value.id_back)
        }
      ]
      $v.value.id_back.$touch()
    }

    form.account_holder = userInformation.value.account_holder
    form.bank_name = userInformation.value.bank_name
    form.bank_branch = userInformation.value.bank_branch
    form.bank_number = userInformation.value.bank_number
    form.id_number = userInformation.value.id_number
    form.phone = userInformation.value.phone
    form.real_name = userInformation.value.real_name
  }
})
</script>
<style lang="scss" scoped>
</style>
