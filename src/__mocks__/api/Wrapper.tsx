import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

import { AppStore, RootState, store as S } from "../../config/store";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  route?: string;
}

interface IWrapper {
  children: React.ReactNode;
}

export function renderWithProviders(
  ui: React.ReactElement | null,
  {
    preloadedState = {},
    store = S(preloadedState),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  setupListeners(store.dispatch);
  jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
  }));
  function Wrappers({ children }: PropsWithChildren<IWrapper>): JSX.Element {
    window.history.pushState({}, "Test page", route);
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrappers, ...renderOptions }) };
}
