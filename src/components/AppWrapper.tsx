import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer, Zoom } from "react-toastify";
import { store } from "../config/store";

function AppWrapper({ children }) {
  let persistor = persistStore(store());

  return (
    <div data-testid="app">
      <Provider data-testid="store" store={store()}>
        <PersistGate loading={<div>loading...</div>} persistor={persistor}>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            draggable={false}
            // icon={false}
            transition={Zoom}
          />
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default AppWrapper;
