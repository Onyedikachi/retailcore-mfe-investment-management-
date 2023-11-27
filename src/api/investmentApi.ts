import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import {
  IGetInvestments,
  ICreateInvestment,
} from "./types/investmentApi.types";

import { parseQueryParams } from "../utils/parseQueryParams";
import urls from "../helpers/url_helpers";

export const investmentApi: any = createApi({
  reducerPath: "investmentApi",
  baseQuery: axiosBaseQuery({ serviceKey: "team" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Investmentes", "Create_Investment"],
  endpoints: (builder) => ({
    getInvestmentes: builder.query<
      IGetInvestments,
      {
        page?: number;
        filter_by?: string;
        status?: string | number;
        q?: string;
      }
    >({
      query: (params) => {
        return {
          url: urls.INVESTMENT,
          method: "get",
          params: parseQueryParams(params),
        };
      },
      providesTags: ["Investmentes"],
    }),
    getPostInvestmentes: builder.mutation<
      IGetInvestments,
      {
        page?: number;
        page_size?: number;
        filter_by?: string;
        status__in?: any[];
        start_date?: string;
        end_date?: string;
        q?: string;
      }
    >({
      query: (params) => {
        if (!params?.filter_by) return;
        return {
          url: urls.INVESTMENT,
          method: "post",
          body: params,
        };
      },
    }),
    createInvestment: builder.mutation<
      ICreateInvestment,
      {
        data: ICreateInvestment;
      }
    >({
      query: (data) => {
        return {
          url: urls.CREATE,
          method: "post",
          body: data,
        };
      },
    }),

    modifyInvestment: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/modify/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),

    getInvestmentAnalytics: builder.query<any, any>({
      query: (data) => {
        if (!data.filter_by) return;
        return {
          url: `${urls.INVESTMENT}/analytics?filterBy=${data.filter_by}`,
          method: "get",
        };
      },
    }),
    getInvestmentTemplate: builder.query<any, any>({
      query: () => {
        return {
          url: `${urls.GET_TEMPLATE}`,
          method: "get",
        };
      },
    }),

    getLedgers: builder.query<any, any>({
      query: (data) => {
        return {
          url: `ledgers?page=${data.page}&page_size=${data.size}&state=${data.state}&search=${data.search}`,
          method: "get",
        };
      },
    }),

    getInvestment: builder.query<any, any>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/${data}`,
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
    validateAddress: builder.mutation<
      any,
      {
        data: { name: string };
      }
    >({
      query: (data) => {
        return {
          url: urls.VALIDATE_ADDRESS,
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
          url: `${urls.INVESTMENT}/uploadsingledocument`,
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
    activateInvestment: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/reactivate`,
          method: "put",
          body: data,
        };
      },
    }),

    deactivateInvestment: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.INVESTMENT}/deactivate`,
          method: "put",
          body: data,
        };
      },
    }),
    getInvestmentActivities: builder.query<any, any>({
      query: (params) => {
        if (!params.requestId) {
          return { data: null }; // Return empty data to simulate skipping the query
        }
        return {
          url: urls.INVESTMENT + "/activities/" + params.requestId,
          method: "get",
          params: parseQueryParams({ page: params.page }),
        };
      },
    }),
    getInvestmentByCode: builder.query<any, any>({
      query: (params) => {
        return {
          url: urls.INVESTMENT + "/" + params,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetInvestmentesQuery,
  useCreateInvestmentMutation,
  useValidateNameMutation,
  useGetInvestmentQuery,
  useGetInvestmentAnalyticsQuery,
  useGetInvestmentMembersQuery,
  useAddInvestmentMemberMutation,
  useUpdateInvestmentMutation,
  useActivateInvestmentMutation,
  useDeactivateInvestmentMutation,
  useModifyInvestmentMutation,
  useGetPostInvestmentesMutation,
  useGetLedgersQuery,
  useGetInvestmentActivitiesQuery,
  useGetInvestmentByCodeQuery,
  useValidateAddressMutation,
  useUploadDocumentMutation,
  useGetPermissionsMutation,
  useGetInvestmentTemplateQuery,
} = investmentApi;
