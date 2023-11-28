import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Layout from "./layouts/Layout";
import InvestmentManagement from "./pages/investment/IndexComponent";
import { Suspense } from "react";
import PreLoader from "./components/PreLoader";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/investment-management"
            element={<Layout data-testid="outlet" />}
          >
            <Route index element={<InvestmentManagement />} />
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
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
