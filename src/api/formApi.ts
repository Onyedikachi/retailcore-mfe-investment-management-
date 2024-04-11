import { axiosBaseQuery, getToken } from "@Sterling/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import { cleanObject } from "@app/utils/cleanObject";

export const formApi: any = createApi({
  reducerPath: "formApi",
  baseQuery: axiosBaseQuery({ serviceKey: "customerFormBuilder" }),
  keepUnusedDataFor: 0,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Get Account"],
  endpoints: (builder) => ({
    getFormType: builder.query<any, any>({
      query: (params) => {
        return {
          url: `${formApi}/form/customer/published/type/${params}`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useGetFormTypeQuery } = formApi;
