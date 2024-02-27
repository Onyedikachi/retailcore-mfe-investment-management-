import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";


const productApi = "https://dev2-product-mgt-api.dev.bepeerless.co/v1";

export const productMgtApi: any = createApi({
    reducerPath: "magagementApi",
    baseQuery: axiosBaseQuery({ serviceKey: "management" }),
    keepUnusedDataFor: 0,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === REHYDRATE && action.payload) {
            return action.payload[reducerPath];
        }
    },
    endpoints: (builder) => ({
        getApplicableCharges: builder.query<any, any>({
            query: () => {
                return {
                    url: `${productApi}/charges?state=Active`,
                    method: "get",
                };
            },
        }),
        getApplicableTaxes: builder.query<any, any>({
            query: () => {
                return {
                    url: `${productApi}/tax/state?state=Active`,
                    method: "get",
                };
            },
        }),
        getTax: builder.query<any, any>({
            query: (data) => {
                if (!data.id) return;
                return {
                    url: `${productApi}/tax/${data.id}`,
                    method: "get",
                };
            },
        }),
        getCharge: builder.query<any, any>({
            query: (data) => {
                if (!data.id) return;
                return {
                    url: `${productApi}/charges/${data.id}/entities`,
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
} = productMgtApi;
