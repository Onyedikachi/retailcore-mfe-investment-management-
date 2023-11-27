import { configureStore } from "@reduxjs/toolkit";
import { investmentApi } from "../../api";

const preloadedState = {
  investmentApi: {
    // initial state
  },
};

export const store = configureStore({
  reducer: {
    [investmentApi.reducerPath]: investmentApi.reducer,
  },
  preloadedState,
});
