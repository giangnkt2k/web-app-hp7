import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { userInfoService } = useApiServices()

  const userInformation = ref<IUserInfo>()

  const balance = computed(() => (userInformation.value?.balance_avail || 0) + (userInformation.value?.balance_frozen || 0))

  const getUserData = async () => {
    const response = await userInfoService()

    if (response?.data) {
      setUserData(response?.data)
    }
  }

  const setUserData = (data: IUserInfo) => {
    userInformation.value = data
  }

  return {
    userInformation,
    balance,

    setUserData,
    getUserData
  }
})
