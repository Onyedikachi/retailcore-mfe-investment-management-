// @ts-nocheck
import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ serviceKey: "user" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "get",
        };
      },
    }),
    getUsers: builder.query<any, any>({
      query: (payload) => {
        return {
          url: `/users?${new URLSearchParams(payload)}`,
          method: "get",
        };
      },
    }),
    getUsersPermissions: builder.query<any, any>({
      query: (payload) => {
        return {
          url: `/users/fetch/by-permission?${new URLSearchParams(payload)}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useGetUsersPermissionsQuery } = authApi;
