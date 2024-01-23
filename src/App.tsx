import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import routes, { routes2 } from "./routes";
import Layout from "./layouts/Layout";
import ProductFactory from "./pages/investment/IndexComponent";
import InvestmentManagement from "./pages/management/IndexComponent";
import { Suspense, useEffect } from "react";
import PreLoader from "./components/PreLoader";
import AppWrapper from "./components/AppWrapper";

function App() {
  
  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/product-factory/investment"
            element={<Layout data-testid="outlet" />}
          >
            <Route index element={<ProductFactory />} />
            {routes.map(({ component: Component, path }) => (
              <Route
                path={path}
                key={path}
                element={
                  <Suspense
                    data-testid="suspense"
                    fallback={<PreLoader data-testid="pre-loader" />}
                  >
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
          <Route
            path="/investment-management"
            element={<Layout data-testid="outlet" />}
          >
            <Route index element={<InvestmentManagement />} />
            {routes2.map(({ component: Component, path }) => (
              <Route
                path={path}
                key={path}
                element={
                  <Suspense
                    data-testid="suspense"
                    fallback={<PreLoader data-testid="pre-loader" />}
                  >
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
          <Route
                        path="*"
                        element={<Navigate to="/investment-management" />}
                    />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
