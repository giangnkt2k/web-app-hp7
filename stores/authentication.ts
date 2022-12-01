import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { userInfoService } = useApiServices()

  const userInformation = ref<IUserInfo>()

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
    setUserData,
    userInformation,
    getUserData
  }
})
