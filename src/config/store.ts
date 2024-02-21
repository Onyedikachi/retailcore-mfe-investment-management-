import {
  investmentApi,
  linkApi,
  authApi,
  accountApi,
  currencyApi,
  productMgtApi
} from "../api";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  [investmentApi?.reducerPath]: investmentApi?.reducer,
  [linkApi?.reducerPath]: linkApi?.reducer,
  [authApi?.reducerPath]: authApi?.reducer,
  [accountApi?.reducerPath]: accountApi?.reducer,
  [currencyApi?.reducerPath]: currencyApi?.reducer,
  [productMgtApi.reducerPath]: productMgtApi.reducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(investmentApi?.middleware)
        .concat(linkApi?.middleware)
        .concat(authApi?.middleware)
        .concat(accountApi?.middleware)
        .concat(currencyApi?.middleware)
        .concat(productMgtApi?.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof persistReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
