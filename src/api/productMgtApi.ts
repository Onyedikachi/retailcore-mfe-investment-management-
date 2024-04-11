import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

// const productApi = "https://product-mgt-api.qa.bepeerless.co/v1";
export const productMgtApi: any = createApi({
  reducerPath: "magagementApi",
  baseQuery: axiosBaseQuery({ serviceKey: "product" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getWideCharges: builder.query<any, any>({
      query: () => {
        return {
          url: `/charges/system-wide`,
          method: "get",
        };
      },
    }),
    getApplicableCharges: builder.query<any, any>({
      query: () => {
        return {
          url: `/charges`,
          method: "get",
        };
      },
    }),
    getApplicableTaxes: builder.query<any, any>({
      query: () => {
        return {
          url: `/tax/state?state=Active`,
          method: "get",
        };
      },
    }),
    getTax: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `/tax/${data.id}`,
          method: "get",
        };
      },
    }),
    getCharges: builder.query<any, any>({
      query: () => {
        return {
          url: `/charges/state?state=active`,
          method: "get",
        };
      },
    }),
    getCharge: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `/charges/${data.id}/entities`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetApplicableChargesQuery,
  useGetApplicableTaxesQuery,
  useGetTaxQuery,
  useGetChargeQuery,
  useGetWideChargesQuery,
  useGetChargesQuery,
} = productMgtApi;
