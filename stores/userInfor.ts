import { defineStore } from 'pinia'
import { IUserData } from '~~/types/api'

export const useUserInfor = defineStore('user-store', () => {
  const UserInformation = ref<IUserData>()

  const setUserData = (data: IUserData) => {
    UserInformation.value = data
    // eslint-disable-next-line no-console
    console.log('data', UserInformation.value)
  }

  return {
    setUserData,
    UserInformation
  }
})
