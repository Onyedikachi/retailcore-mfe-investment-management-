import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { cleanObject } from "@app/utils/cleanObject";

export const currencyApi: any = createApi({
  reducerPath: "currencyApi",
  baseQuery: axiosBaseQuery({ serviceKey: "currency" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Get Ledgers"],
  endpoints: (builder) => ({
    getDefaultCurrency: builder.query<any, any>({
      query: () => {
        return {
          url: "currency/default-currency",
          method: "get",
        };
      },
    }),

    getCurrencies: builder.query<any, any>({
      query: (data) => {
        return {
          url: `currency?${new URLSearchParams(cleanObject(data))}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetCurrenciesQuery, useGetDefaultCurrencyQuery } = currencyApi;
