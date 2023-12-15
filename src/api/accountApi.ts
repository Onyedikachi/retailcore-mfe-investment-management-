import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

import { parseQueryParams } from "../utils/parseQueryParams";
import urls from "../helpers/url_helpers";

export const accountApi: any = createApi({
  reducerPath: "accountApi",
  baseQuery: axiosBaseQuery({ serviceKey: "account" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Get Ledgers"],
  endpoints: (builder) => ({
    getLedgers: builder.query<any, any>({
      query: (data) => {
        return {
          url: `ledgers?page=${data.page}&page_size=${data.size}&state=${data.state}&search=${data.search}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetLedgersQuery } = accountApi;
