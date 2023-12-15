import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { cleanObject } from "@app/utils/cleanObject";

export const accountApi: any = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({ serviceKey: "accounting" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Get Ledgers"],
  endpoints: (builder) => ({
    getGlClass: builder.query<any, any>({
      query: () => {
        return {
          url: "accounting/glclass",
          method: "get",
        };
      },
    }),
    getLedgers: builder.query<any, any>({
      query: (data) => {
        console.log("🚀 ~ file: accountApi.ts:35 ~ data:", data)
        return {
          url: `accounting/gl/leaf-ledgers/?${new URLSearchParams(
            cleanObject(data)
          )}`,
          method: "get",
        };
      },
    }),
     
  }),
});

export const { useGetLedgersQuery, useGetGlClassQuery } = accountApi;
