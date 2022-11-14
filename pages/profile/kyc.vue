<template>
  <div>
    <van-nav-bar
      title="Real-name authentication"
      left-text="Back"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="mx-5 mt-20   bg-light-50 rounded-md">
      <van-cell-group inset>
        <van-field v-model="realName" label="Real name" />
        <van-field v-model="tel" type="tel" label="Phone" />
        <div class="text-sm py-3 px-4">
          <div class="kyc__label pb-2">
            ID card (front)
          </div>
          <van-uploader v-model="idCardFont" :disabled="idCardFont.length > 0" max-count="1" image-fit>
            <template #preview-cover="{ file }">
              <div class="preview-cover van-ellipsis">
                {{ file.name }}
              </div>
            </template>
          </van-uploader>
        </div>
        <div class="text-sm py-3 px-4">
          <div class="kyc__label pb-2">
            ID card (back)
          </div>
          <van-uploader v-model="idCardBack" :disabled="idCardBack.length > 0" max-count="1" image-fit>
            <template #preview-cover="{ file }">
              <div class="preview-cover van-ellipsis">
                {{ file.name }}
              </div>
            </template>
          </van-uploader>
        </div>
      </van-cell-group>
    </div>
    <div class="mx-5 my-5">
      <van-button type="primary" block>
        Submmit
      </van-button>
    </div>
    <TheBottomNavigation />
  </div>
</template>
<script lang="ts" setup>
const onClickLeft = () => history.back()
const realName = ref('')
const tel = ref('')
const idCardFont = ref([])
const idCardBack = ref([])
// const
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
