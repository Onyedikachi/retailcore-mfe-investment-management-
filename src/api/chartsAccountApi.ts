import { axiosBaseQuery } from "@Sterling/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import urls from "../helpers/url_helpers";
import { cleanObject } from "@app/utils/cleanObject";

// const customerApi = "https://customer-management-api.qa.bepeerless.co/v1";

export const chartsAccountApi: any = createApi({
  reducerPath: "chartsAccountApi",
  baseQuery: axiosBaseQuery({ serviceKey: "chartsAccount" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
  
  }),
});

export const {} = chartsAccountApi;
