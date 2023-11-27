// @ts-nocheck
import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const linkApi = createApi({
  reducerPath: "linkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://utilities-api.dev.bepeerless.co/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Requests"],
  endpoints: (builder) => ({
    getLinks: builder.query<any, any>({
      query: () => {
        return {
          url: `/quick-link/all`,
          method: "get",
        };
      },
    }),

    addLink: builder.mutation<{ id: string }, { id: string }>({
      query: (data) => {
        return {
          url: `/quick-link`,
          method: "post",
          body: data,
        };
      },
    }),
    onQueryStarted() {
      // Clear previous errors when making the query
      linkApi.util.resetApiState(linkApi.endpoints.rejectRequest);
    },
  }),
});

export const { useGetLinksQuery, useAddLinkMutation } = linkApi;
