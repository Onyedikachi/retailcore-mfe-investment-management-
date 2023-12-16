// mswHandlers.js
import { rest } from "msw";
import { response } from "./responses.json";

const baseUrl =
  "https://dev2-retailcore-teams-management-api.dev.bepeerless.co/v1";
const utilBaseUrl = `https://utilities-api.dev.bepeerless.co/v1`;
export const handlers = [
  rest.get(`${baseUrl}/investments`, (req, res, ctx) => {
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getInvestmentsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/quick-link/all`, (req, res, ctx) => {
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getInvestmentsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.post(`${baseUrl}/investment`, (req, res, ctx) => {
    if (ctx.status == 200) {
      return res(ctx.json(response.getInvestmentsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/investments/members/1`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getInvestmentsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/investment/B071`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getInvestmentResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/investments/analytics`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.investmentsAnalyticsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(
    `https://dev2-retailcore-teams-management-api.dev.bepeerless.co/v1/Investment/template`,
    (req, res, ctx) => {
      const mockXLSXData = `
   Name, Age
   Alice, 28
   Bob, 24
`;

      const blob = new Blob([mockXLSXData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (ctx.status == 200) {
        return res(ctx.json({ file: blob }));
      } else {
        return res(
          ctx.status(404),
          ctx.json({
            error: "Data not found",
          })
        );
      }
    }
  ),

  rest.get(`${baseUrl}/requests`, (req, res, ctx) => {
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getRequestsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/requests/edit/1`, (req, res, ctx) => {
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getRequestsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/requests/edit-bulk/1`, (req, res, ctx) => {
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.getRequestsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/requests/analytics`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.requestAnalyticsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/approve/1`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    return res(ctx.json(response.requestAnalyticsResponse));
    if (ctx.status == 200) {
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/location/countries`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.requestAnalyticsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.get(`${baseUrl}/location/lga`, (req, res, ctx) => {
    // const { filter } = req.params;
    // Simulate different responses based on the investmentId
    if (ctx.status == 200) {
      return res(ctx.json(response.requestAnalyticsResponse));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),
  rest.post(`${baseUrl}/validate-name`, (req, res, ctx) => {
    if (ctx.status == 200) {
      return res(ctx.json({ success: true }));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "Data not found",
        })
      );
    }
  }),

  // rest.get(
  //   `https://utilities-api.dev.bepeerless.co/v1/quick-link/all/ProductFactory`,
  //   (req, res, ctx) => {
  //     // const { filter } = req.params;
  //     // Simulate different responses based on the investmentId
  //     if (ctx.status == 200) {
  //       return res(ctx.json(response.requestAnalyticsResponse));
  //     } else {
  //       return res(
  //         ctx.status(500),
  //         ctx.json({
  //           status: "error",
  //           error: "Something went wrong",
  //         })
  //       );
  //     }
  //   }
  // ),


  // rest.post(
  //   `https://utilities-api.dev.bepeerless.co/v1/quick-link`,
  //   (req, res, ctx) => {
  //     // const { filter } = req.params;
  //     // Simulate different responses based on the investmentId
  //     if (ctx.status == 200) {
  //       return res(ctx.json(response.requestAnalyticsResponse));
  //     } else {
  //       return res(
  //         ctx.status(500),
  //         ctx.json({
  //           status: "error",
  //           error: "Something went wrong",
  //         })
  //       );
  //     }
  //   }
  //   ),
    rest.get(`https://retailcore-investment-management-api.dev.bepeerless.co/v1/product/product-details`,
    (req, res, ctx) => {

      if (req.id !== null ) {
        return res(ctx.json(response.getProductDetailResponseOne));
      } else {
        return res(
          ctx.status(500),
          ctx.json({
            status: "error",
            error: "Something went wrong",
          })
        );
      }
    })
    // Add more handlers for different endpoints as needed
];
