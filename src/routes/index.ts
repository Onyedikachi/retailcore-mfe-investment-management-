import { lazy } from "react";
import { paths } from "./paths";

export const routes = [
  {
    path: paths.INVESTMENT_DASHBOARD,
    name: "Product Modification View",
    exact: true,
    component: lazy(
      () => import("../pages/investment/IndexComponent")
    ),
  },
  
];

export default routes;
