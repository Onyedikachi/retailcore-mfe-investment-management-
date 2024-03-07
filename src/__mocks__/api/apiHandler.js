import { rest } from "msw";
import { response } from "./responses.json";

const baseUrl = "https://retailcore-teams-management-api.dev.bepeerless.co/v1";
const utilBaseUrl = `https://utilities-api.dev.bepeerless.co/v1`;
export const handlers = [
  rest.get(`${baseUrl}/investments`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getInvestmentsResponse));
  }),
  rest.get(`${baseUrl}/quick-link/all`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getInvestmentsResponse));
  }),
  rest.post(`${baseUrl}/investment`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getInvestmentsResponse));
  }),
  rest.get(`${baseUrl}/investments/members/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getInvestmentsResponse));
  }),
  rest.get(`${baseUrl}/investment/B071`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getInvestmentResponse));
  }),
  rest.get(`${baseUrl}/investments/analytics`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(response.investmentsAnalyticsResponse)
    );
  }),
  rest.get(
    `https://retailcore-teams-management-api.dev.bepeerless.co/v1/Investment/template`,
    (req, res, ctx) => {
      const mockXLSXData = `
        Name, Age
        Alice, 28
        Bob, 24
      `;

      const blob = new Blob([mockXLSXData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      return res(ctx.status(200), ctx.json({ file: blob }));
    }
  ),
  rest.get(`${baseUrl}/requests`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getRequestsResponse));
  }),
  rest.get(`${baseUrl}/requests/edit/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getRequestsResponse));
  }),
  rest.get(`${baseUrl}/requests/edit-bulk/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.getRequestsResponse));
  }),
  rest.get(`${baseUrl}/requests/analytics`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.requestAnalyticsResponse));
  }),
  rest.get(`${baseUrl}/approve/1`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.requestAnalyticsResponse));
  }),
  rest.get(`${baseUrl}/location/countries`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.requestAnalyticsResponse));
  }),
  rest.get(`${baseUrl}/location/lga`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(response.requestAnalyticsResponse));
  }),
  rest.post(`${baseUrl}/validate-name`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
  rest.post(
    `https://utilities-api.dev.bepeerless.co/v1/quick-link/all/ProductFactory`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(response.requestAnalyticsResponse));
    }
  ),
  rest.get(
    `https://retailcore-investment-management-api.dev.bepeerless.co/v1/product/product-details`,
    (req, res, ctx) => {
      if (req.id !== null) {
        return res(
          ctx.status(200),
          ctx.json(response.getProductDetailResponseOne)
        );
      } else {
        return res(
          ctx.status(500),
          ctx.json({ status: "error", error: "Something went wrong" })
        );
      }
    }
  ),
  rest.get(
    `https://retailcore-investment-management-api.dev.bepeerless.co/v1/ProductRequest/4567234567890-`,
    (req, res, ctx) => {
      if (req.id !== null) {
        return res(
          ctx.status(200),
          ctx.json(response.getProductDetailResponseOne)
        );
      } else {
        return res(
          ctx.status(500),
          ctx.json({ status: "error", error: "Something went wrong" })
        );
      }
    }
  ),
];
