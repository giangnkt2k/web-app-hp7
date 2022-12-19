import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { userInfoService } = useApiServices()

  const userInformation = ref<IUserInfo>()

  const frozenBalance = computed(() => userInformation.value?.positions?.reduce((sum: number, position) => {
    sum += (position.quantity * position.stock.P)

    return sum
  }, 0) || 0)

  const balance = computed(() => (userInformation.value?.balance_avail || 0) + frozenBalance.value)

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
    frozenBalance,

    setUserData,
    getUserData
  }
})
