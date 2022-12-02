import numeral from 'numeral'

export const useUtility = () => {
  const { $toast, $dayjs, $t } = useNuxtApp()

  const showApiError = (message: string) => {
    $toast.fail(message)
  }

  const toMoneyFormat = (amount: number | string, format = '0,0.00') => numeral(amount).format(format)

  const dateFormatter = (date: string | number | Date, format = 'DD/MM/YYYY') => {
    return $dayjs(date).format(format)
  }

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter,
    t: $t
  }
}
