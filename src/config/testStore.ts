import { configureStore } from "@reduxjs/toolkit";
import { linkApi, investmentApi, authApi, accountApi } from "@app/api";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [linkApi?.reducerPath]: linkApi?.reducer,
      [investmentApi?.reducerPath]: investmentApi?.reducer,
      [authApi?.reducerPath]: authApi?.reducer,
      [accountApi?.reducerPath]: accountApi?.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
        .concat(linkApi?.middleware)
        .concat(authApi?.middleware)
        .concat(accountApi.middleware)
        .concat(investmentApi?.middleware),
  });
};
