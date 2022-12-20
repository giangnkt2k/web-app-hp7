import numeral from 'numeral'
import { buildUrl } from 'build-url-ts'
import { ApiRoutes } from '~~/types/api'

export const useUtility = () => {
  const { $toast, $dayjs, $t } = useNuxtApp()
  const config = useRuntimeConfig()

  const showApiError = (message: string) => {
    $toast.fail(message)
  }

  const toMoneyFormat = (amount: number | string, format = '0,0.00') => numeral(amount).format(format)

  const dateFormatter = (date: string | number | Date, format = 'DD/MM/YYYY') => {
    return $dayjs(date).format(format)
  }

  const getFileUrl = (id: number) => {
    return buildUrl(config.public.API_ENDPOINT, {
      path: `${ApiRoutes.READ_FILES}/${id}`
    })
  }

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter,
    getFileUrl,
    t: $t
  }
}
