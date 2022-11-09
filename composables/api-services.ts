import { ApiRoutes } from "~~/types/api";

export const useApiServices = () => {
  const { $api } = useNuxtApp();
  const { showApiError, t } = useUtility();

  $api.interceptors.response.use(
    (response) => {
      if (response.data.code != 0) {
        showApiError(response.data.msg);
      }

      return response;
    },
    (error) => {
      if (process.dev) {
        console.log(error);
      }

      showApiError(t("api.error.general"));
    }
  );

  const loginService = (username: string, password: string) => {
    return $api.post(ApiRoutes.LOGIN, { loginname: username, password });
  };

  return {
    loginService,
  };
};
