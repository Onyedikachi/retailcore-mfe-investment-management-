export const axiosBaseQuery = jest.fn();
export const auth$ = {
  subscribe: jest.fn(() => ({
    unsubscribe: jest.fn(),
  })),
};
export const AppConfig = {
  branch: "https://retailcore-branches-management-api.dev.bepeerless.co/v1",
};

export const getToken = jest.fn();
export const isTokenValid = jest.fn();
export const usePermission = jest.fn();

export const BranchData = [
  {
    id: 1,
    branchName: "Branch Royal",
    branchCode: "TM-01",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
  {
    id: 2,
    branchName: "Branch Sunshine",
    branchCode: "TM-02",
    description: "Leading with excellent customer se...",
    state: 0,
    updatedOn: new Date(),
  },
  {
    id: 3,
    branchName: "Branch Pride",
    branchCode: "TM-03",
    description: "Leading with excellent customer se...",
    state: 1,
    updatedOn: new Date(),
  },
];
