import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

const customerApiUrl =
  "https://customer-management-api.qa.bepeerless.co/v1";

export const customerApi: any = createApi({
  reducerPath: "customerApi",
  baseQuery: axiosBaseQuery({ serviceKey: "customer" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCorporateCustomerType: builder.query<any, any>({
      query: () => {
        return {
          url: `${customerApiUrl}/column-map/corporate-categories?formType=smeLegacy`,
          method: "get",
        };
      },
    }),

    getCustomerSearch: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApiUrl}/customer/search?${new URLSearchParams(
            params
          )}`,
          method: "get",
        };
      },
    }),

    getAccountBalance: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApiUrl}/accounts/${params}`,
          method: "get",
        };
      },
    }),
    getCustomerProfile: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApiUrl}/customer/profile/${params}`,
          method: "get",
        };
      },
    }),

    getFormDocuments: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApiUrl}/column-map/form-documents?formType=${params}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetAccountBalanceQuery,
  useGetCustomerProfileQuery,
  useGetFormDocumentsQuery,
  useGetCorporateCustomerTypeQuery,
  useGetCustomerSearchQuery,
} = customerApi;
