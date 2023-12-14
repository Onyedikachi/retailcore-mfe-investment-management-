import { configureStore } from "@reduxjs/toolkit";
import { linkApi, investmentApi, authApi } from "@app/api";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      // [linkApi?.reducerPath]: linkApi?.reducer,
      [investmentApi?.reducerPath]: investmentApi?.reducer,
      // [authApi?.reducerPath]: authApi?.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
        .concat(linkApi?.middleware)
        .concat(authApi?.middleware)
        .concat(investmentApi?.middleware),
  });
};
