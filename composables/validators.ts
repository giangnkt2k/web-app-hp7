import * as validators from '@vuelidate/validators'

export const useValidators = () => {
  const { t } = useI18n()

  const { createI18nMessage } = validators

  const messagePath = (data: { $validator: string; $propertyPath: string }) =>
  `validations.${data.$validator}.${data.$propertyPath}`

  const withI18n = createI18nMessage({ t, messagePath })

  const required = withI18n(validators.required)
  const sameAs = withI18n(validators.sameAs, { withArguments: true })

  return {
    required,
    sameAs
  }
}
