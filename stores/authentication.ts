import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { $typedRouter, $routesList } = useNuxtApp()
  const { userInfoService, getUserFrozenBalanceService } = useApiServices()
  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  const userInformation = ref<IUserInfo>()

  const frozenBalance = ref(0)

  const balance = computed(() => (userInformation.value?.balance_avail || 0) + frozenBalance.value)

  const getUserData = async () => {
    const response = await userInfoService()
    const frozenBalanceRes = await getUserFrozenBalanceService()
    if (response?.data && frozenBalanceRes?.data) {
      setUserData(response?.data)
      frozenBalance.value = frozenBalanceRes.data.amount
    }
  }

  const setUserData = (data: IUserInfo) => {
    userInformation.value = data
  }

  const logout = () => {
    accessToken.value = ''
    isAuthorized.value = false
    $typedRouter.push({ name: $routesList.login })
  }
  return {
    userInformation,
    balance,
    frozenBalance,

    logout,
    setUserData,
    getUserData
  }
})
