import { lazy } from "react";
import { paths } from "./paths";

export const routes = [
  {
    path: paths.INVESTMENT_DASHBOARD,
    name: "Product Modification View",
    exact: true,
    component: lazy(() => import("../pages/investment/IndexComponent")),
  },

  {
    path: paths.INVESTMENT_TEST,
    name: "Investment Test",
    exact: true,
    component: lazy(() => import("../pages/investment/TestComponents")),
  },

  {
    path: paths.CREATE_PRODUCT,
    name: "Create Term Deposit",
    exact: true,
    component: lazy(
      () =>
        import(
          "../pages/investment/term-deposit/create-term-deposit/IndexComponent"
        )
    ),
  },
  {
    path: paths.TERM_DEPOSIT_SUMMARY,
    name: "Term Deposit Summary",
    exact: true,
    component: lazy(() => import("../pages/investment/term-deposit/Summary")),
  },
];

export default routes;
