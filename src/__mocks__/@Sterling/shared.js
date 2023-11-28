export const axiosBaseQuery = jest.fn();
export const auth$ = {
  subscribe: jest.fn(() => ({
    unsubscribe: jest.fn(),
  })),
};
export const AppConfig = {
  branch: "https://retailcore-investment-management-api.dev.bepeerless.co/v1",
};

export const getToken = jest.fn();
export const isTokenValid = jest.fn();
export const usePermission = jest.fn();

export const ProductData = [
  {
    id: 1,
    branchName: "Product Royal",
    branchCode: "TM-01",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
  {
    id: 2,
    branchName: "Product Sunshine",
    branchCode: "TM-02",
    description: "Leading with excellent customer se...",
    state: 0,
    updatedOn: new Date(),
  },
  {
    id: 3,
    branchName: "Product Pride",
    branchCode: "TM-03",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
];
