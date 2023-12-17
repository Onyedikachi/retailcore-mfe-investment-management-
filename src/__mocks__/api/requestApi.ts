// @ts-nocheck
import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import {
  IGetRequests,
  IGetRequestById,
  IGetActivities,
} from "./types/requestApi.types";

import { parseQueryParams } from "../utils/parseQueryParams";
import urls from "../helpers/url_helpers";

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: axiosBaseQuery({ serviceKey: "team" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getRequests: builder.mutation<
      IGetRequests,
      {
        page?: number;
        page_size?: number;
        filter_by?: string;
        status__in?: any[];
        request_type__in?: any[];
        start_date?: string;
        end_date?: string;
        initiator?: any[];
        q?: string;
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
      providesTags: ["Requests"],
    }),
    getRequestAnalytics: builder.query<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/analytics?filterBy=${data.filter_by}`,
          method: "get",
        };
      },
    }),
    getRequestById: builder.query<any, IGetRequestById>({
      query: (params) => {
        return {
          url: urls.REQUESTS + "/" + params.requestId,
          method: "get",
          params: parseQueryParams({}),
        };
      },
      providesTags: ["Requests"],
    }),
    getRequestActivities: builder.query<any, IGetActivities>({
      query: (params) => {
        if (!params.requestId) {
          return { data: null }; // Return empty data to simulate skipping the query
        }
        return {
          url: urls.REQUEST_ACTIVITIES + "/" + params.requestId,
          method: "get",
          params: parseQueryParams({ page: params.page }),
        };
      },
      providesTags: ["Requests"],
    }),
    approveRequest: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/approve/${data.id}`,
          method: "put",
        };
      },
    }),

    rejectRequest: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/reject/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    deleteRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/delete/${data}`,
          method: "delete",
        };
      },
    }),
    updateProductRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/edit/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    updateBulkProductRequest: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `${urls.REQUESTS}/edit-bulk/${data.id}`,
          method: "put",
          body: data,
        };
      },
    }),
    onQueryStarted() {
      // Clear previous errors when making the query
      requestApi.util.resetApiState(requestApi.endpoints.rejectRequest);
    },
  }),
});

export const {
  useGetRequestsMutation,
  useGetRequestAnalyticsQuery,
  useGetRequestByIdQuery,
  useGetRequestActivitiesQuery,
  useApproveRequestMutation,
  useRejectRequestMutation,
  useDeleteRequestMutation,
  useUpdateProductRequestMutation,
  useUpdateBulkProductRequestMutation,
} = requestApi;
