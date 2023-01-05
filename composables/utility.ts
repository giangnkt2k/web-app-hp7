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

  const convertTimeStampToDate = (time: number, format = 'DD/MM/YYYY HH:mm:ss') => {
    return $dayjs.unix(time).format(format)
  }

  const getFileUrl = (name: string) => {
    return buildUrl(config.public.LINK_IMG, {
      path: `${ApiRoutes.READ_FILES}/${name}`
    })
  }

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter,
    getFileUrl,
    t: $t,
    convertTimeStampToDate
  }
}
