export const axiosBaseQuery = jest.fn();
export const auth$ = {
  subscribe: jest.fn(() => ({
    unsubscribe: jest.fn(),
  })),
};
export const AppConfig = {
  product: "https://retailcore-investment-management-api.dev.bepeerless.co/v1",
};

export const getToken = jest.fn();
export const isTokenValid = jest.fn();
export const usePermission = jest.fn();

export const ProductData = [
  {
    id: 1,
    productName: "Product Royal",
    productCode: "TM-01",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
  {
    id: 2,
    productName: "Product Sunshine",
    productCode: "TM-02",
    description: "Leading with excellent customer se...",
    state: 0,
    updatedOn: new Date(),
  },
  {
    id: 3,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
];
