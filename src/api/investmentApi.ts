import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

const formApi ="https://customer-management-forms-api.dev.bepeerless.co/v1"
const customerApi = "https://customer-management-api.dev.bepeerless.co/v1"
const productApi = "https://product-mgt-api.dev.bepeerless.co/v1"
export const investmentApi: any = createApi({
  reducerPath: "investmentApi",
  baseQuery: axiosBaseQuery({ serviceKey: "investment" }),
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
          url: `${urls.ACTIVITY_LOG}?${new URLSearchParams(
            cleanObject(params)
          )}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getProductRequestActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${urls.REQUEST_ACTIVITY_LOG}?${new URLSearchParams(
            cleanObject(params)
          )}`,
          method: "get",
        };
      },
    }),
    getCharges: builder.query<any, any>({
      query: () => {
        return {
          url: `${productApi}/charges/state?state=active`,
          method: "get",
        };
      },
    }),
    getCustomerSearch: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApi}/customer/search?search=${params}`,
          method: "get",
        };
      },
    }),
    getAccountBalance: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApi}/accounts/${params}`,
          method: "get",
        };
      },
    }),
    getCustomerProfile: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApi}/customer/profile/${params}`,
          method: "get",
        };
      },
    }),
    getFormType: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${formApi}/form/customer/published/type/${params}`,
          method: "get",
        };
      },
    }),
    getFormDocuments: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${customerApi}/column-map/form-documents/${params}`,
          method: "get",
        };
      },
    }),

    getSystemAlert: builder.query<any, any>({
      query: () => {
        return {
          url: `${urls.SYSTEM_ALERT}`,
          method: "get",
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
          body: cleanObject(params),
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
    createInvestment: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: urls.INVESTMENT_CREATE,
          method: "post",
          body: data,
        };
      },
    }),

    modifyProduct: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.PRODUCT}/edit`,
          method: "put",
          body: data,
        };
      },
    }),
    modifyInvestment: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/edit`,
          method: "put",
          body: data,
        };
      },
    }),
    modifyRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/edit/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    modifyInvestmentRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/edit/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    bookingCalc: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_CALC}`,
          method: "post",
          body: data,
        };
      },
    }),

    deleteProductRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/delete/${data}`,
          method: "delete",
        };
      },
    }),
    getProductStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.PRODUCT_STATS}?${new URLSearchParams(
            cleanObject({
              ...data,
              filterBy: data.filter_by,
            })
          )}`,
          method: "get",
        };
      },
    }),
    getProductDetail: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `${urls.PRODUCT_DETAILS}?${new URLSearchParams(
            cleanObject(data)
          )}`,
          method: "get",
        };
      },
    }),
    getRequestDetail: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `${urls.REQUESTS}/${data.id}`,
          method: "get",
        };
      },
    }),

    getRequestStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.REQUEST_STATS}?${new URLSearchParams(
            cleanObject({
              // ...data,
              filterBy: data.filter_by,
            })
          )}`,
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
          url: `${urls.PRODUCT}/upload-document`,
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
          url: `${urls.PRODUCT}/reactivate/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),

    approveProduct: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/approve/${data.id}`,
          method: "put",
        };
      },
    }),
    rejectProduct: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/reject/${data.id}`,
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
    getPostInvestment: builder.mutation<
      any,
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
          url: urls.INVESTMENT,
          method: "post",
          body: cleanObject(params),
        };
      },
    }),
    getPostInvestmentRequests: builder.mutation<
      any,
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
          url: urls.INVESTMENT_REQUEST,
          method: "post",
          body: cleanObject(params),
        };
      },
    }),
    getInvestmentActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${urls.INVESTMENT_ACTIVITY_LOG}?${new URLSearchParams(
            cleanObject(params)
          )}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getInvestmentRequestActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${urls.INVESTMENT_REQUEST_ACTIVITY_LOG}?${new URLSearchParams(
            cleanObject(params)
          )}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    
    getInvestmentStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.INVESTMENT_STATS}?${new URLSearchParams(
            cleanObject({
              ...data,
              filterBy: data.filter_by,
            })
          )}`,
          method: "get",
        };
      },
    }),
    getInvestmentRequestStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.INVESTMENT_REQUEST_STATS}?${new URLSearchParams(
            cleanObject({
              ...data,
              filterBy: data.filter_by,
            })
          )}`,
          method: "get",
        };
      },
    }),
    getInvestmentDetail: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `${urls.INVESTMENT}/${data.id}`,
          method: "get",
        };
      },
    }),

    getInvestmentRequestDetail: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `${urls.INVESTMENT_REQUEST}/${data.id}`,
          method: "get",
        };
      },
    }),
    deleteInvestmentRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/delete/${data}`,
          method: "delete",
        };
      },
    }),
    getInvestmentDashboardStats: builder.query<any, any>({
      query: () => {
        return {
          url: `${urls.INVESTMENT_DASHBOARD_STATS}`,
          method: "get",
        };
      },
    }),
    approveInvestment: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/approve/${data.id}`,
          method: "put",
        };
      },
    }),
    rejectInvestment: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/reject/${data.id}`,
          method: "put",
          body: data,
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
  useModifyRequestMutation,
  useGetPostRequestsMutation,
  useGetPostProductsMutation,
  useGetProductActivitiesQuery,
  useGetProductByCodeQuery,
  useUploadDocumentMutation,
  useGetPermissionsMutation,
  useDeleteProductRequestMutation,
  useGetProductActivityLogQuery,
  useGetProductRequestActivityLogQuery,
  useGetChargesQuery,
  useGetProductDetailQuery,
  useGetRequestDetailQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useGetSystemAlertQuery,
  useGetCustomerSearchQuery,
  useGetAccountBalanceQuery,
  useGetCustomerProfileQuery,
  useCreateInvestmentMutation,
  useGetInvestmentActivityLogQuery,
  useGetInvestmentRequestActivityLogQuery,
  useGetPostInvestmentRequestsMutation,
  useGetPostInvestmentMutation,
  useGetInvestmentRequestStatsQuery,
  useGetInvestmentStatsQuery,
  useGetInvestmentDetailQuery,
  useDeleteInvestmentRequestMutation,
  useGetInvestmentRequestDetailQuery,
  useBookingCalcMutation,
  useModifyInvestmentMutation,
  useModifyInvestmentRequestMutation,
  useGetInvestmentDashboardStatsQuery,
  useGetFormDocumentsQuery,
  useGetFormTypeQuery,
  useApproveInvestmentMutation,
  useRejectInvestmentMutation,
} = investmentApi;
