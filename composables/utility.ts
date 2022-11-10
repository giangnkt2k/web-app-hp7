import numeral from 'numeral'

export const useUtility = () => {
  const { $toast, $dayjs } = useNuxtApp()
  const { t } = useI18n()

  const showApiError = (message: string) => {
    $toast.fail(message)
  }

  const toMoneyFormat = (amount: number | string, format = '0.00') => {
    return numeral(amount).format(format)
  }

  const dateFormatter = (date: string | number | Date, format = 'DD/MM/YYYY') => {
    return $dayjs(date).format(format)
  }

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter,
    t
  }
}
