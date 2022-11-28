import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { userInfoService } = useApiServices()

  const userInformation = ref<IUserInfo>()
  const isAuthorized = useIsAuthorized()

  const getUserData = async () => {
    if (isAuthorized.value) {
      const response = await userInfoService()
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
