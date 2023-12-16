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

  rest.get(
    `https://utilities-api.dev.bepeerless.co/v1/quick-link/all`,
    (req, res, ctx) => {
      // const { filter } = req.params;
      // Simulate different responses based on the investmentId
      if (ctx.status == 200) {
        return res(ctx.json(response.requestAnalyticsResponse));
      } else {
        return res(
          ctx.status(500),
          ctx.json({
            status: "error",
            error: "Something went wrong",
          })
        );
      }
    }
  ),


  rest.post(
    `https://utilities-api.dev.bepeerless.co/v1/quick-link`,
    (req, res, ctx) => {
      // const { filter } = req.params;
      // Simulate different responses based on the investmentId
      if (ctx.status == 200) {
        return res(ctx.json(response.requestAnalyticsResponse));
      } else {
        return res(
          ctx.status(500),
          ctx.json({
            status: "error",
            error: "Something went wrong",
          })
        );
      }
    }
    ),
    rest.get(`https://retailcore-investment-management-api.dev.bepeerless.co/v1/product/product-details`,
    (req, res, ctx) => {
      console.log(req, ctx, "form msw")
      if (req!=null) {
        return res(ctx.json({
          "succeeded": true,
          "message": "product details",
          "errors": null,
          "data": {
              "id": "4473a62d-5e40-4aa0-8bf4-3c179004c35b",
              "productCode": "f041",
              "state": 2,
              "recentUpdated": false,
              "recentlyUpdatedMeta": null,
              "productInfo": {
                  "productName": "Free Loan",
                  "slogan": "LOADNF",
                  "description": "tHIS IS A FREE LOAN",
                  "startDate": "2023-12-15T00:00:00Z",
                  "endDate": null,
                  "currency": "NGN"
              },
              "customerEligibility": {
                  "customerCategory": 0,
                  "customerType": [],
                  "ageGroupMin": 0,
                  "ageGroupMax": 40,
                  "requireDocument": [
                      {
                          "id": "aee02b4b-94eb-574f-1407-73aac2169577",
                          "name": "Signature"
                      },
                      {
                          "id": "1479ef2b-94fd-8445-ed54-f46d91f951f2",
                          "name": "Valid Identification document"
                      },
                      {
                          "id": "8abd6a81-5a40-d049-dbaa-fc43e7afbbfc",
                          "name": "Proof of residential address"
                      }
                  ]
              },
              "pricingConfiguration": {
                  "applicableTenorMin": 0,
                  "applicableTenorMinUnit": 1,
                  "applicableTenorMax": 1000,
                  "applicableTenorMaxUnit": 1,
                  "applicablePrincipalMin": 0,
                  "applicablePrincipalMax": 20000000,
                  "interestRateRangeType": 2,
                  "interestRateConfigModels": [
                      {
                          "min": 0,
                          "max": 0,
                          "principalMin": 0,
                          "principalMax": 0,
                          "tenorMin": 0,
                          "tenorMinUnit": 1,
                          "tenorMax": 0,
                          "tenorMaxUnit": 1
                      }
                  ],
                  "interestRateMin": 0,
                  "interestRateMax": 20,
                  "interestComputationMethod": 2
              },
              "liquidation": {
                  "part_AllowPartLiquidation": true,
                  "part_MaxPartLiquidation": 12,
                  "part_RequireNoticeBeforeLiquidation": true,
                  "part_NoticePeriod": 0,
                  "part_NoticePeriodUnit": 1,
                  "part_LiquidationPenalty": 0,
                  "part_LiquidationPenaltyPercentage": 0,
                  "part_SpecificCharges": [],
                  "early_AllowEarlyLiquidation": false,
                  "early_RequireNoticeBeforeLiquidation": true,
                  "early_NoticePeriod": 0,
                  "early_NoticePeriodUnit": 1,
                  "early_LiquidationPenalty": 0,
                  "early_LiquidationPenaltyPercentage": 0,
                  "early_SpecificCharges": []
              },
              "productGlMappings": [
                  {
                      "accountName": "Test asset primum ledger 100",
                      "accountId": "e5f1cfff-b165-40db-9c4f-d05b41cd334a",
                      "glAccountType": 0
                  },
                  {
                      "accountName": "Test asset primum ledger 21",
                      "accountId": "2e018e63-a752-4667-9b64-1c3c93c76f50",
                      "glAccountType": 1
                  },
                  {
                      "accountName": "Test asset primum ledger 11",
                      "accountId": "35a69d04-c6bf-43fc-bc78-10342c65e20a",
                      "glAccountType": 2
                  }
              ],
              "isDraft": false,
              "productType": 0
          }
      }));
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
