import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";

import { parseQueryParams } from "../utils/parseQueryParams";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";
// baseQuery: axiosBaseQuery({ serviceKey: "investment" }),
console.log(
  "🚀 ~ file: investmentApi.ts:9 ~ axiosBaseQuery({ serviceK",
  axiosBaseQuery({ serviceKey: "investment" })
);
export const investmentApi: any = createApi({
  reducerPath: "investmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://retailcore-investment-management-api.dev.bepeerless.co/v1",
    prepareHeaders: (headers) => {
      const token = getToken();

      // If we have a token set in state, let's assume that we should be passing it.
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
  endpoints: (builder) => ({
    getProductActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: urls.ACTIVITY_LOG,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getPostProducts: builder.mutation<
      IGetProducts,
      {
        filter_by: string;
        status_In: number[];
        search: string;
        start_Date: string;
        end_Date: string;
        page: number;
        page_Size: number;
      }
    >({
      query: (params) => {
        if (!params?.filter_by) return;
        return {
          url: urls.PRODUCT,
          method: "post",
          body: cleanObject(params),
        };
      },
    }),
    getPostRequests: builder.mutation<
      IGetProducts,
      {
        filter_by: string;
        status_In: number[];
        search: string;
        start_Date: string;
        end_Date: string;
        page: number;
        page_Size: number;
      }
    >({
      query: (params) => {
        if (!params?.filter_by) return;
        return {
          url: urls.REQUESTS,
          method: "post",
          body: params,
        };
      },
    }),
    createProduct: builder.mutation<
      ICreateProduct,
      {
        data: ICreateProduct;
      }
    >({
      query: (data) => {
        return {
          url: urls.PRODUCT_CREATE,
          method: "post",
          body: data,
        };
      },
    }),

    modifyProduct: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/modify/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),

    getProductStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.PRODUCT_STATS}?${new URLSearchParams({
            // ...data,
            filterBy: data.filter_by,
          })}`,
          method: "get",
        };
      },
    }),
    getRequestStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.REQUEST_STATS}?${new URLSearchParams({
            // ...data,
            filterBy: data.filter_by,
          })}`,
          method: "get",
        };
      },
    }),

    getProduct: builder.query<any, any>({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/${data}`,
          method: "get",
        };
      },
    }),

    validateName: builder.mutation<
      any,
      {
        data: { name: string };
      }
    >({
      query: (data) => {
        return {
          url: urls.VALIDATE_NAME,
          method: "post",
          body: data,
        };
      },
    }),

    uploadDocument: builder.mutation<
      any,
      {
        data: any;
      }
    >({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/uploadsingledocument`,
          method: "post",
          body: data,
        };
      },
    }),
    getPermissions: builder.mutation<
      any,
      {
        data: any;
      }
    >({
      query: (data) => {
        return {
          url: `users/permissions`,
          method: "post",
          body: data,
        };
      },
    }),
    activateProduct: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/reactivate`,
          method: "put",
          body: data,
        };
      },
    }),

    deactivateProduct: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/deactivate`,
          method: "put",
          body: data,
        };
      },
    }),

    getProductByCode: builder.query<any, any>({
      query: (params) => {
        return {
          url: urls.PRODUCT + "/" + params,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useCreateProductMutation,
  useValidateNameMutation,
  useGetProductQuery,
  useGetProductStatsQuery,
  useGetRequestStatsQuery,
  useActivateProductMutation,
  useDeactivateProductMutation,
  useModifyProductMutation,
  useGetPostRequestsMutation,
  useGetPostProductsMutation,
  useGetLedgersQuery,
  useGetProductActivitiesQuery,
  useGetProductByCodeQuery,
  useUploadDocumentMutation,
  useGetPermissionsMutation,
} = investmentApi;
