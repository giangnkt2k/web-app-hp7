<template>
  <div>
    <TheHeader :back-to="{name: $routesList.profile}" />
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.statusInformation') }}  {{ statusInformation }}
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.realNameInfor") }}
    </div>
    <div class="mx-5  bg-light-50 rounded-md">
      <van-cell-group inset>
        <van-field v-model="realName" :label="$t('page.profile.kyc.realName')" />
        <van-field v-model="tel" type="tel" :label="$t('page.profile.kyc.phone')" />
        <van-field v-model="identityNumber" type="digit" :label="$t('page.profile.kyc.identityNumber')" />
      </van-cell-group>
    </div>
    <div class="font-bold text-xl mx-5 my-5">
      {{ $t("page.profile.kyc.uploadID") }}
    </div>
    <div class="mx-5  bg-light-50 rounded-md">
      <div class="text-sm py-3 px-4 ">
        <div class="flex justify-between">
          <div class="kyc__label pb-2 pl-3">
            {{ $t('page.profile.kyc.idCardFront') }}
          </div>
          <van-uploader v-model="idCardFont" :disabled="idCardFont.length > 0" max-count="1">
            <template #preview-cover="{ file }">
              <div class="preview-cover van-ellipsis">
                {{ file.name }}
              </div>
            </template>
          </van-uploader>
        </div>
        <van-divider />
      </div>
      <div class="text-sm px-4 flex justify-between">
        <div class="kyc__label pb-2 pl-3">
          {{ $t('page.profile.kyc.idCardBack') }}
        </div>
        <van-uploader v-model="idCardBack" :disabled="idCardBack.length > 0" max-count="1">
          <template #preview-cover="{ file }">
            <div class="preview-cover van-ellipsis">
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
        <van-field v-model="affiliatedBank" :label="$t('page.profile.kyc.affiliatedBank')" />
        <van-field v-model="cardNumber" type="digit" :label="$t('page.profile.kyc.cardNumber')" />
        <van-field v-model="username" type="text" :label="$t('page.profile.kyc.username')" />
        <van-field v-model="branch" type="digit" :label="$t('page.profile.kyc.branch')" />
      </van-cell-group>
    </div>
    <div class="mx-5 my-5">
      <van-button type="primary" block>
        {{ $t('page.profile.submit') }}
      </van-button>
    </div>
    <div class="kyc__notice mx-5 my-5 text-xs font-bold">
      {{ $t('page.profile.kyc.notice') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const { $routesList } = useNuxtApp()

const statusInformation = ref('')
const realName = ref('')
const tel = ref('')
const identityNumber = ref('')
const idCardFont = ref([])
const idCardBack = ref([])
const affiliatedBank = ref('')
const cardNumber = ref('')
const username = ref('')
const branch = ref('')
</script>
<style lang="scss" scoped>
  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
  .kyc__label {
    color:#646566;
  }
</style>
