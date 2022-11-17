import { defineStore } from 'pinia'
import { IUserInfor } from '~~/types/user'
export const useAthenticationStore = defineStore('authentication-store', () => {
  const { userInfor } = useApiServices()

  const userInformation = ref<IUserInfor>()

  const getUserData = async () => {
    const response = await userInfor()
    userInformation.value = response.data
  }

  const setUserData = (data: IUserInfor) => {
    userInformation.value = data
  }

  return {
    setUserData,
    userInformation,
    getUserData
  }
})
