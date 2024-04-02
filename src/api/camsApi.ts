import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

export const camsApi: any = createApi({
  reducerPath: "camsApi",
  baseQuery: axiosBaseQuery({ serviceKey: "cams" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAccounts: builder.query<any, any>({
      query: (data) => {
        return {
          url: `Accounts/GetAccounts?${new URLSearchParams(cleanObject(data))}`,
          method: "get",
        };
      },
    }),
    getAccountDataById: builder.query<any, any>({
      query: (data) => {
        return {
          url: `Accounts/DoBalanceEnquiryByAccountNo?AccountNumber=${data}`,
          method: "get",
        };
      },
    }),
    getAccountListDataById: builder.query<any, any>({
      query: (data) => {
        return {
          url: `Accounts/GetAccountsByCustomerId?CustomerId=${data}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetAccountDataByIdQuery,
  useGetAccountListDataByIdQuery,
  useGetAccountsQuery,
} = camsApi;
