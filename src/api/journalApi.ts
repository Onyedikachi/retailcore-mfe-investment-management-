import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { cleanObject } from "@app/utils/cleanObject";

const accountEnquiries =
  "https://peerless-seabaas-accountenquiries.qa.bepeerless.co/Accounts/";
export const journalApi: any = createApi({
  reducerPath: "journalApi",
  baseQuery: axiosBaseQuery({ serviceKey: "journalPosting" }),
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
          url: "glclass",
          method: "get",
        };
      },
    }),

    getLedgers: builder.query<any, any>({
      query: (data) => {
        return {
          url: `accounts/gl?${new URLSearchParams(cleanObject(data))}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetLedgersQuery, useGetGlClassQuery } = journalApi;
