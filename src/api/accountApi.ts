import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { cleanObject } from "@app/utils/cleanObject";

const accountEnquiries =
  "https://dev2-peerless-seabaas-accountenquiries.dev.bepeerless.co/Accounts/";
export const accountApi: any = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dev2-retailcore-account-and-jounalposting-api.dev.bepeerless.co/api/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Get Ledgers"],
  endpoints: (builder) => ({
    getGlClass: builder.query<any, any>({
      query: () => {
        return {
          url: "glclass",
          method: "get",
        };
      },
    }),

    getLedgers: builder.query<any, any>({
      query: (data) => {
        return {
          url: `accounts/gl?${new URLSearchParams(cleanObject(data))}`,
          method: "get",
        };
      },
    }),
    getAccountDataById: builder.query<any, any>({
      query: (data) => {
        return {
          url: `${accountEnquiries}DoBalanceEnquiryByAccountNo?AccountNumber=${data}`,
          method: "get",
        };
      },
    }),
    getAccountListDataById: builder.query<any, any>({
      query: (data) => {
        return {
          url: `${accountEnquiries}GetAccountsByCustomerId?CustomerId=${data}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetLedgersQuery,
  useGetGlClassQuery,
  useGetAccountDataByIdQuery,
  useGetAccountListDataByIdQuery,
} = accountApi;
