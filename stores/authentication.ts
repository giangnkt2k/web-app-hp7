import { defineStore } from 'pinia'
import { IUserInfo } from '~~/types/user'
export const useAuthenticationStore = defineStore('authentication-store', () => {
  const { $typedRouter, $routesList } = useNuxtApp()
  const { userInfoService } = useApiServices()
  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  const userInformation = ref<IUserInfo>()

  const frozenBalance = computed(
    () => Number(
      (userInformation.value?.positions?.reduce((sum: number, position) => {
        sum += (position.quantity * position.stock.P)

        return sum
      }, 0) || 0).toFixed(2)
    )
  )

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
