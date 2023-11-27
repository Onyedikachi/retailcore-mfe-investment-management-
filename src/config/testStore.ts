import { configureStore } from "@reduxjs/toolkit";
import { linkApi, investmentApi } from "@app/api";

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [linkApi?.reducerPath]: linkApi?.reducer,
      [investmentApi?.reducerPath]: investmentApi?.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      })
        .concat(linkApi?.middleware)
        .concat(investmentApi?.middleware),
  });
};
