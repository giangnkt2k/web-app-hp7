import { defineStore } from 'pinia'
import { IUserData } from '~~/types/api'

export const useAthenticationStore = defineStore('authentication-store', () => {
  const userInformation = ref<IUserData>()

  const setUserData = (data: IUserData) => {
    userInformation.value = data
  }

  return {
    setUserData,
    userInformation
  }
})
