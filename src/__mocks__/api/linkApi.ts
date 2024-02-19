// @ts-nocheck
import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { MODULENAME } from "@app/constants";
export const linkApi = createApi({
  reducerPath: "linkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dev2-utilities-api.dev.bepeerless.co/v1`,
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
          url: `/quick-link/all/${MODULENAME}`,
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
    updateLink: builder.mutation<any, any>({
      query: ({ moduleName, moduleLink }) => {
        return {
          url: `/quick-link/update/${moduleName}/${moduleLink}`,
          method: "patch",
        };
      },
    }),
    onQueryStarted() {
      // Clear previous errors when making the query
      linkApi.util.resetApiState(linkApi.endpoints.rejectRequest);
    },
  }),
});

export const { useGetLinksQuery, useAddLinkMutation, useUpdateLinkMutation } =
  linkApi;
