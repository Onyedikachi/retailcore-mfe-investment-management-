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
  // {
  //   path: paths.BOOK_INVESTMENT,
  //   name: "Investment Booking",
  //   exact: true,
  //   component: lazy(
  //     () => import("../pages/management/book-investment/IndexComponent")
  //   ),
  // },
  // {
  //   path: paths.MANAGE_INVESTMENT,
  //   name: "Investment Booking",
  //   exact: true,
  //   component: lazy(
  //     () => import("@app/pages/management/manage-investment/IndexComponent")
  //   ),
  // },

  {
    path: paths.TERM_DEPOSIT_SUMMARY,
    name: "Term Deposit Summary",
    exact: true,
    component: lazy(() => import("../pages/investment/term-deposit/Summary")),
  },
  // {
  //   path: paths.BOOKING_SUMMARY,
  //   name: "Booking Summary",
  //   exact: true,
  //   component: lazy(() => import("../pages/management/SummaryComponent")),
  // },
  
  // {
  //   path: paths.INVESTMENT_MANAGEMENT,
  //   name: "Investment Management",
  //   exact: true,
  //   component: lazy(() => import("../pages/management/IndexComponent")),
  // },
];

export const routes2 = [

  {
    path: paths.BOOK_INVESTMENT,
    name: "Investment Booking",
    exact: true,
    component: lazy(
      () => import("../pages/management/book-investment/IndexComponent")
    ),
  },
  {
    path: paths.MANAGE_INVESTMENT,
    name: "Investment Booking",
    exact: true,
    component: lazy(
      () => import("@app/pages/management/manage-investment/IndexComponent")
    ),
  },

  {
    path: paths.BOOKING_SUMMARY,
    name: "Booking Summary",
    exact: true,
    component: lazy(() => import("../pages/management/SummaryComponent")),
  },

  {
    path: paths.INVESTMENT_MANAGEMENT,
    name: "Investment Management",
    exact: true,
    component: lazy(() => import("../pages/management/IndexComponent")),
  },
  { 
    path: paths.CREATE_TREASURY_BILL,
    name: "Create Treasury Bill",
    exact: true,
    component: lazy(() => import("../pages/treasury_bill/IndexComponent")) }
];

export default routes;
