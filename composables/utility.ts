export const useUtility = () => {
  const { $toast } = useNuxtApp();
  const { t } = useI18n();

  const showApiError = (message: string) => {
    $toast.fail(message);
  };

  return {
    showApiError,
    t,
  };
};
