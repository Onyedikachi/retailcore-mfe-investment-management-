import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { IGetProducts, ICreateProduct } from "./types/investmentApi.types";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

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
    // getCharges: builder.query<any, any>({
    //   query: () => {
    //     return {
    //       url: `${productApi}/charges/state?state=active`,
    //       method: "get",
    //     };
    //   },
    // }),
    // getCustomerSearch: builder.query<any, any>({
    //   query: (params) => {
    //     return {
    //       url: `${customerApi}/customer/search?${new URLSearchParams(params)}`,
    //       method: "get",
    //     };
    //   },
    // }),
    getInvestmentCertificate: builder.query<any, any>({
      query: (params) => {
        return {
          url: `/investment/certificate?${new URLSearchParams(params)}`,
          method: "get",
        };
      },
    }),
    // getAccountBalance: builder.query<any, any>({
    //   query: (params) => {
    //     return {
    //       url: `${customerApi}/accounts/${params}`,
    //       method: "get",
    //     };
    //   },
    // }),
    // getCustomerProfile: builder.query<any, any>({
    //   query: (params) => {
    //     return {
    //       url: `${customerApi}/customer/profile/${params}`,
    //       method: "get",
    //     };
    //   },
    // }),
    // getFormType: builder.query<any, any>({
    //   query: (params) => {
    //     return {
    //       url: `${formApi}/form/customer/published/type/${params}`,
    //       method: "get",
    //     };
    //   },
    // }),
    // getFormDocuments: builder.query<any, any>({
    //   query: (params) => {
    //     return {
    //       url: `${customerApi}/column-map/form-documents?formType=${params}`,
    //       method: "get",
    //     };
    //   },
    // }),

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
        const { investmentType } = data;
        return {
          url:
            investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_CREATE
              : urls.INVESTMENT_CREATE,
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
        const { investmentType } = data;
        return {
          url: `${
            investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE
              : urls.INVESTMENT
          }/edit`,
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
        const { investmentType } = data;
        return {
          url: `${
            investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST
          }/edit/${data?.id}`,
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
          url: `${urls.REQUESTS}/delete/${data.id}`,
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
    // Tch
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
        customerCategory?: number;
        type?: string;
      }
    >({
      query: (params) => {
        if (!params?.filter_by) return;
        return {
          url:
            params.type === "security-purchase"
              ? urls.SECURITY_PURCHASE
              : urls.INVESTMENT,
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
        type?: string;
      }
    >({
      query: (params) => {
        if (!params?.filter_by) return;
        return {
          url:
            params?.type === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST,
          method: "post",
          body: cleanObject(params),
        };
      },
    }),
    calcTotalConsideration: builder.mutation<any, any>({
      query: (params) => {
        return {
          url: `${urls.SECURITY_PURCHASE}/calc-totalconsideration`,
          method: "post",
          body: cleanObject(params),
        };
      },
    }),
    getInvestmentActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${
            params?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_ACTIVITY_LOG
              : urls.INVESTMENT_ACTIVITY_LOG
          }?${new URLSearchParams(cleanObject(params))}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getInvestmentRequestActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${
            params?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST_ACTIVITY_LOG
              : urls.INVESTMENT_REQUEST_ACTIVITY_LOG
          }?${new URLSearchParams(cleanObject(params))}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getSecurityPurchaseActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${urls.SECURITY_PURCHASE_ACTIVITY_LOG}?${new URLSearchParams(
            cleanObject(params)
          )}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),
    getSecurityPurchaseRequestActivityLog: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${
            urls.SECURITY_PURCHASE_REQUEST_ACTIVITY_LOG
          }?${new URLSearchParams(cleanObject(params))}`,
          method: "get",
          params: cleanObject(params),
        };
      },
    }),

    getInvestmentStats: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${
            data?.type === "security-purchase"
              ? urls.SECURITY_PURCHASE_STATS
              : urls.INVESTMENT_STATS
          }?${new URLSearchParams(
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
          url: `${
            data?.type === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST_STATS
              : urls.INVESTMENT_REQUEST_STATS
          }?${new URLSearchParams(
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
          url:
            data?.investmentType === "security-purchase"
              ? `SecurityPurchase/details?id=${data.id}`
              : `${urls.INVESTMENT}/${data.id}`,
          method: "get",
        };
      },
    }),

    getInvestmentRequestDetail: builder.query<any, any>({
      query: (data) => {
        if (!data.id) return;
        return {
          url: `${
            data?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST
          }/${data.id}`,
          method: "get",
        };
      },
    }),
    deleteInvestmentRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${
            data?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST
          }/delete/${data.id}`,
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
    approveInvestment: builder.mutation<
      { id: string; investmentType: string },
      { id: string; investmentType: string }
    >({
      query: (data) => {
        return {
          url: `${
            data?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST
          }/approve/${data.id}`,
          method: "put",
        };
      },
    }),
    rejectInvestment: builder.mutation<
      { id: string; investmentType: string },
      { id: string; investmentType: string }
    >({
      query: (data) => {
        return {
          url: `${
            data?.investmentType === "security-purchase"
              ? urls.SECURITY_PURCHASE_REQUEST
              : urls.INVESTMENT_REQUEST
          }/reject/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    earlyLiquidate: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/early-liquidate`,
          method: "put",
          body: data,
        };
      },
    }),
    partLiquidate: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/part-liquidate`,
          method: "put",
          body: data,
        };
      },
    }),
    liquidationCalculation: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/liquidation-amount`,
          method: "post",
          body: data,
        };
      },
    }),
    topUpCalculation: builder.mutation({
      query: (data) => {
        return {
          ...(data?.amounttoTopUp && {
            url: `${urls.INVESTMENT}/topup-amount`,
          }),
          ...(data?.amounttoWithdraw && {
            url: `${urls.INVESTMENT}/withdrawal-amount`,
          }),
          method: "post",
          body: data,
        };
      },
    }),

    editEarlyLiquidate: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/edit-earlyliquidation/${data?.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    editPartLiquidate: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_REQUEST}/edit-partliquidation/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    topUpInvestment: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT_TOPUP}`,
          method: "put",
          body: data,
        };
      },
    }),
    withdrawPrincipal: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.WITHDRAW_PRINCIPAL}`,
          method: "put",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useTopUpInvestmentMutation,
  useWithdrawPrincipalMutation,
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
  useGetProductDetailQuery,
  useGetRequestDetailQuery,
  useApproveProductMutation,
  useRejectProductMutation,
  useGetSystemAlertQuery,
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
  useGetSecurityPurchaseActivityLogQuery,
  useGetSecurityPurchaseRequestActivityLogQuery,
  useApproveInvestmentMutation,
  useRejectInvestmentMutation,
  useEarlyLiquidateMutation,
  usePartLiquidateMutation,
  useLiquidationCalculationMutation,
  useTopUpCalculationMutation,
  useEditEarlyLiquidateMutation,
  useEditPartLiquidateMutation,
  useGetInvestmentCertificateQuery,
  useCalcTotalConsiderationMutation,
} = investmentApi;
