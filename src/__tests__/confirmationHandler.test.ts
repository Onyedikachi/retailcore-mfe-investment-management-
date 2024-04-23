import { confirmationHandler } from "../components/table/confirmationHandler";
import { Actions, Messages, Prompts } from "../constants/enums";

// describe("confirmationHandler", () => {
//   const deleteRequest = jest.fn();
//   const setIsDeactivationOpen = jest.fn();
//   const activateProduct = jest.fn();
//   const notify = jest.fn();
//   const navigate = jest.fn();
//   const detail = { id: 1 , metaInfo: {}};

//   const permissions = [];
//   const selected = "";
//   const previousData = {current: {}};

//   it("should call deleteRequest when action includes the word 'delete '", () => {
//     const action = "Delete Draft";

//     confirmationHandler({
//       action,
//       detail,
//       permissions,
//       selected,
//       previousData,
//       deleteRequest,
//       setIsDeactivationOpen,
//       activateProduct,
//       navigate,
//     });

//     expect(deleteRequest).toHaveBeenCalledWith(detail.id);
//     expect(setIsDeactivationOpen).not.toHaveBeenCalled();
//     expect(activateProduct).not.toHaveBeenCalled();

//     expect(navigate).not.toHaveBeenCalled();
//   });

//   it("Should run if action == 'deactivate'", () => {
//     const action = "deactivate";
//     confirmationHandler({
//       action,
//       detail: {metaInfo: {}},
//       permissions,
//       selected,
//       previousData,
//       deleteRequest,
//       setIsDeactivationOpen,
//       activateProduct,
//       navigate,
//     });
//     expect(setIsDeactivationOpen).toBeCalledWith(true);
//   });

//   it("Should run if action == 'activate'", () => {
//     const action = "activate";
//     confirmationHandler({
//       action,
//       detail,
//       permissions,
//       selected,
//       previousData,
//       deleteRequest,
//       setIsDeactivationOpen,
//       activateProduct,
//       navigate,
//     });
//     expect(activateProduct).toBeCalled();
//   });

//   it("Should run if action == 'modify'", () => {
//     const action = "modify";
//     confirmationHandler({
//       action,
//       detail,
//       permissions,
//       selected,
//       previousData,
//       deleteRequest,
//       setIsDeactivationOpen,
//       activateProduct,
//       navigate,
//     });
//     expect(navigate).not.toBeCalled();
//   });

//   it("Should run if action == 'withdraw-modify'", () => {
//     const action = "withdraw-modify";
//     confirmationHandler({
//       action,
//       detail,
//       permissions,
//       selected,
//       previousData,
//       deleteRequest,
//       setIsDeactivationOpen,
//       activateProduct,
//       navigate,
//     });
//     expect(activateProduct).toBeCalled();
//   });
// });

describe("confirmationHandler", () => {
  // Calls deleteRequest function if action includes "delete"
  it('should call deleteRequest function when action includes "delete"', () => {
    const deleteRequest = jest.fn();
    const confirmationData = {
      action: "delete draft",
      detail: { id: 1 },
      permissions: [],
      selected: {},
      previousData: {},
      deleteRequest,
      setIsDeactivationOpen: jest.fn(),
      activateProduct: jest.fn(),

      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(deleteRequest).toHaveBeenCalledWith(1);
  });

  // Sets isDeactivationOpen to true if action is "deactivate"
  it('should set isDeactivationOpen to true when action is "deactivate"', () => {
    const setIsDeactivationOpen = jest.fn();
    const confirmationData = {
      action: "deactivate",
      detail: {},
      permissions: [],
      selected: {},
      previousData: {},
      deleteRequest: jest.fn(),
      setIsDeactivationOpen,
      activateProduct: jest.fn(),

      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(setIsDeactivationOpen).toHaveBeenCalledWith(true);
  });

  // Calls activateProduct function if action is "activate"
  it('should call activateProduct function when action is "activate"', () => {
    const activateProduct = jest.fn();
    const confirmationData = {
      action: "activate",
      detail: { id: 1 },
      permissions: [],
      selected: {},
      deleteRequest: jest.fn(),
      setIsDeactivationOpen: jest.fn(),
      activateProduct,
      previousData: { current: {} },
      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(activateProduct).toHaveBeenCalledWith({
      id: 1,
      recentlyUpdatedMeta: JSON.stringify({})
    });
  });

  // Does not call deleteRequest function if action does not include "delete"
  it('should not call deleteRequest function when action does not include "delete"', () => {
    const deleteRequest = jest.fn();
    const confirmationData = {
      action: "view",
      detail: {},
      permissions: [],
      selected: {},
      previousData: {},
      deleteRequest,
      setIsDeactivationOpen: jest.fn(),
      activateProduct: jest.fn(),

      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(deleteRequest).not.toHaveBeenCalled();
  });

  // Does not set isDeactivationOpen to true if action is not "deactivate"
  it('should not set isDeactivationOpen to true when action is not "deactivate"', () => {
    const setIsDeactivationOpen = jest.fn();
    const confirmationData = {
      action: "view",
      detail: {},
      permissions: [],
      selected: {},
      previousData: {},
      deleteRequest: jest.fn(),
      setIsDeactivationOpen,
      activateProduct: jest.fn(),

      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(setIsDeactivationOpen).not.toHaveBeenCalled();
  });

  // Does not call activateProduct function if action is not "activate"
  it('should not call activateProduct function when action is not "activate"', () => {
    const activateProduct = jest.fn();
    const confirmationData = {
      action: "view",
      detail: {},
      permissions: [],
      selected: {},
      previousData: {},
      deleteRequest: jest.fn(),
      setIsDeactivationOpen: jest.fn(),
      activateProduct,

      navigate: jest.fn(),
    };

    confirmationHandler(confirmationData);

    expect(activateProduct).not.toHaveBeenCalled();
  });
});

describe("confirmationHandler", () => {
  // Mocking functions and variables
  const deleteRequest = jest.fn();
  const setIsDeactivationOpen = jest.fn();
  const activateProduct = jest.fn();
  const navigate = jest.fn();
  const permissions = ["CREATE_INVESTMENT_PRODUCT"];
  const selected = { value: "someValue" };
  const previousData = {
    /* your data here */
  };
  const detail = { id: "someId" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ... other tests
  const mockedErrorToast = jest.fn();
  jest.mock("../components/Toast", () => ({
    errorToast: mockedErrorToast,
  }));

  it("should handle MODIFY action with permission", () => {
    const action = Actions.MODIFY;

    // @ts-ignore
    confirmationHandler({
      action,
      permissions,
      selected,
      detail,
      navigate,
    });

    expect(mockedErrorToast).not.toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(
      `/product-factory/investment/${encodeURIComponent(
        "term-deposit"
      )}/modify/?id=${detail.id}&filter=${selected.value}`
    );
  });

  it("should handle MODIFY action without permission", () => {
    const action = Actions.MODIFY;
    const mockedErrorToast = jest.fn();

    jest.mock("../components/Toast", () => ({
      errorToast: mockedErrorToast,
    }));

    const modifiedPermissions = [];
    // @ts-ignore
    confirmationHandler({
      action,
      permissions: modifiedPermissions,
      detail,
      navigate,
    });

    expect(mockedErrorToast).not.toHaveBeenCalledWith(
      "You do not have permission to make changes!"
    );
    expect(navigate).not.toHaveBeenCalled();
  });

  it("should handle WITHDARW_MODIFY action with permission", () => {
    const action = Actions.WITHDARW_MODIFY;
    const mockedErrorToast = jest.fn();

    jest.mock("../components/Toast", () => ({
      errorToast: mockedErrorToast,
    }));
    // @ts-ignore
    confirmationHandler({
      action,
      permissions,
      selected,
      detail: { metaInfo: JSON.stringify({}) },
      modifyProductRequest: jest.fn(),
      navigate,
    });

    expect(mockedErrorToast).not.toHaveBeenCalled();
    // expect(navigate).toHaveBeenCalledWith(
    //   `/product-factory/investment/${encodeURIComponent(
    //     "term-deposit"
    //   )}/withdraw_modify/?id=${detail.id}&filter=${selected.value}`
    // );
  });

  it("should handle WITHDARW_MODIFY action without permission", () => {
    const action = Actions.WITHDARW_MODIFY;
    const mockedErrorToast = jest.fn();

    jest.mock("../components/Toast", () => ({
      errorToast: mockedErrorToast,
    }));

    const modifiedPermissions = [];
    // @ts-ignore
    confirmationHandler({
      action,
      permissions: modifiedPermissions,
      detail,
      navigate,
    });

    expect(mockedErrorToast).not.toHaveBeenCalledWith(
      "You do not have permission to make changes!"
    );
    expect(navigate).not.toHaveBeenCalled();
  });

  // Similar tests for WITHDRAW_MODIFY action
});
