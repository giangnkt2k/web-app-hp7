import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { userInfoService } = useApiServices()
  const isAuthorized = useIsAuthorized()

  const userInformation = ref<IUserInfo>()

  const getUserData = async () => {
    if (isAuthorized.value) {
      const response = await userInfoService()
      setUserData(response.data.data)
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
