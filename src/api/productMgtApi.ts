import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

const formApi =
    "https://customer-management-forms-api.qa.bepeerless.co/v1";
const customerApi = "https://customer-management-api.qa.bepeerless.co/v1";
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
                    url: `${productApi}/charges`,
                    method: "get",
                };
            },
        }),
        getApplicableTaxes: builder.query<any, any>({
            query: () => {
                return {
                    url: `${productApi}/taxes`,
                    method: "get",
                };
            },
        }),
    }),
});

export const {
    useGetApplicableChargesQuery,
    useGetApplicableTaxesQuery
} = productMgtApi;