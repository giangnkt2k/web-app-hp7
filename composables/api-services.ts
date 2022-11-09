import { ApiRoutes, IBaseResponse } from "~~/types/api";
import { IStock } from "~~/types/stock";

export const useApiServices = () => {
  const { $api } = useNuxtApp();
  const { showApiError, t } = useUtility();

  // Response Interceptor
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

  const searchStockService = (keyword: string, page = 1) => {
    return $api.get<IBaseResponse<IStock[]>>(ApiRoutes.SEARCH_STOCK, {
      params: {
        keyword,
        page,
      },
    });
  };

  return {
    loginService,
    searchStockService,
  };
};
