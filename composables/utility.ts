import numeral from 'numeral'

export const useUtility = () => {
  const { $toast } = useNuxtApp()
  const { t } = useI18n()

  const showApiError = (message: string) => {
    $toast.fail(message)
  }

  const toMoneyFormat = (amount: number | string, format = '0,0[.]00') => {
    return numeral(amount).format(format)
  }

  return {
    showApiError,
    toMoneyFormat,
    t
  }
}
