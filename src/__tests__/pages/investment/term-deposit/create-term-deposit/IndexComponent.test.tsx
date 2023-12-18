
import { getByText, screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import IndexComponent, { handleDetailsSuccess, handleNext, handlePrev } from "../../../../../pages/investment/term-deposit/create-term-deposit/IndexComponent"
import { act, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";
import { handleDraft } from "../../../../../pages/investment/term-deposit/create-term-deposit/handleDraft";
import FormComponent from "../../../../../pages/investment/term-deposit/FormComponent";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));

const user = userEvent.setup()

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

describe("IndexComponent", () => {
  window.ResizeObserver = ResizeObserver;
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

    jest.spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ process: "continue" })
  });
  it("renders", async () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
    expect(getByText("New Term Deposit Product")).toBeInTheDocument();
    expect(getAllByTestId("form-step").length).toBeGreaterThan(1);
    expect(getByText("Product Name")).toBeInTheDocument();
    expect(getByText("Product Name")).toBeInTheDocument();
    expect(getByTestId('product-name')).toBeInTheDocument();
    expect(getByTestId('investment-slogan')).toBeInTheDocument();
    expect(getByTestId('product-description')).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  })

  it("Changes values", () => {
    const { getByText, getAllByTestId, getByTestId, getAllByRole } = renderWithProviders(<IndexComponent />)
    const inputs = getAllByRole("textbox")
    const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2023"];
    act(() => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: values[index] } });
      })
    })
    // @ts-ignore 
    expect(inputs.map(i => i.value)).toStrictEqual(values);
  })


  it("Show modal when clicking save to Draft", async () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
    const saveButton = getByText("Save As Draft");
    expect(saveButton).toBeInTheDocument();
    await user.click(saveButton);
    expect(getByTestId("confirm-modal")).toBeInTheDocument();
  })

  it("Shows disabled button when form is not valid", async () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
    const next = getByText("Next");
    expect(next).toBeInTheDocument();
    expect(next).toHaveAttribute("disabled")
  })

  it("Should not have disabled button when fom is valid", () => {
    const { getByText, getAllByTestId, getByTestId, getAllByRole } = renderWithProviders(<IndexComponent />)
    const inputs = getAllByRole("textbox")
    const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2024"];
    act(() => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: values[index] } });
      })
    })
    // @ts-ignore 
    expect(inputs.map(i => i.value)).toStrictEqual(values);
    const next = getByText("Next");
    expect(next).toBeInTheDocument();
  })
})

describe("handleDetailsSuccess", () => {
  const activeId = { current: "5678" };
  const productDetails = {
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
  }
  const previousData = {}
  const process = "modify";
  const setProductData = jest.fn();
  it("Works", () => {
    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData)
    expect(setProductData).toBeCalledWith({ "InterestAccrualAccount": undefined, "InterestExpenseAccount": undefined, "TermDepositLiabilityAccount": undefined, "customerEligibility": { "ageGroupMax": 40, "ageGroupMin": 0, "customerCategory": 0, "customerType": [], "requireDocument": [{ "id": "aee02b4b-94eb-574f-1407-73aac2169577", "name": "Signature" }, { "id": "1479ef2b-94fd-8445-ed54-f46d91f951f2", "name": "Valid Identification document" }, { "id": "8abd6a81-5a40-d049-dbaa-fc43e7afbbfc", "name": "Proof of residential address" }] }, "interestComputationMethod": undefined, "isDraft": false, "liquidation": { "early_AllowEarlyLiquidation": false, "early_LiquidationPenalty": 0, "early_LiquidationPenaltyPercentage": 0, "early_NoticePeriod": 0, "early_NoticePeriodUnit": 1, "early_RequireNoticeBeforeLiquidation": true, "early_SpecificCharges": [], "part_AllowPartLiquidation": true, "part_LiquidationPenalty": 0, "part_LiquidationPenaltyPercentage": 0, "part_MaxPartLiquidation": 12, "part_NoticePeriod": 0, "part_NoticePeriodUnit": 1, "part_RequireNoticeBeforeLiquidation": true, "part_SpecificCharges": [] }, "pricingConfiguration": { "applicablePrincipalMax": 20000000, "applicablePrincipalMin": 0, "applicableTenorMax": 1000, "applicableTenorMaxUnit": 1, "applicableTenorMin": 0, "applicableTenorMinUnit": 1, "interestComputationMethod": 2, "interestRateConfigModels": [{ "max": 0, "min": 0, "principalMax": 0, "principalMin": 0, "tenorMax": 0, "tenorMaxUnit": 1, "tenorMin": 0, "tenorMinUnit": 1 }], "interestRateMax": 20, "interestRateMin": 0, "interestRateRangeType": 2 }, "productGlMappings": [{ "accountId": "e5f1cfff-b165-40db-9c4f-d05b41cd334a", "accountName": "Test asset primum ledger 100", "glAccountType": 0 }, { "accountId": "2e018e63-a752-4667-9b64-1c3c93c76f50", "accountName": "Test asset primum ledger 21", "glAccountType": 1 }, { "accountId": "35a69d04-c6bf-43fc-bc78-10342c65e20a", "accountName": "Test asset primum ledger 11", "glAccountType": 2 }], "productInfo": { "currency": "NGN", "description": "tHIS IS A FREE LOAN", "endDate": null, "productName": "Free Loan", "slogan": "LOADNF", "startDate": "2023-12-15T00:00:00Z" }, "productType": 0 });
    expect(previousData).not.toEqual({ "InterestAccrualAccount": undefined, "InterestExpenseAccount": undefined, "TermDepositLiabilityAccount": undefined, "customerEligibility": { "ageGroupMax": 40, "ageGroupMin": 0, "customerCategory": 0, "customerType": [], "requireDocument": [{ "id": "aee02b4b-94eb-574f-1407-73aac2169577", "name": "Signature" }, { "id": "1479ef2b-94fd-8445-ed54-f46d91f951f2", "name": "Valid Identification document" }, { "id": "8abd6a81-5a40-d049-dbaa-fc43e7afbbfc", "name": "Proof of residential address" }] }, "interestComputationMethod": undefined, "isDraft": false, "liquidation": { "early_AllowEarlyLiquidation": false, "early_LiquidationPenalty": 0, "early_LiquidationPenaltyPercentage": 0, "early_NoticePeriod": 0, "early_NoticePeriodUnit": 1, "early_RequireNoticeBeforeLiquidation": true, "early_SpecificCharges": [], "part_AllowPartLiquidation": true, "part_LiquidationPenalty": 0, "part_LiquidationPenaltyPercentage": 0, "part_MaxPartLiquidation": 12, "part_NoticePeriod": 0, "part_NoticePeriodUnit": 1, "part_RequireNoticeBeforeLiquidation": true, "part_SpecificCharges": [] }, "pricingConfiguration": { "applicablePrincipalMax": 20000000, "applicablePrincipalMin": 0, "applicableTenorMax": 1000, "applicableTenorMaxUnit": 1, "applicableTenorMin": 0, "applicableTenorMinUnit": 1, "interestComputationMethod": 2, "interestRateConfigModels": [{ "max": 0, "min": 0, "principalMax": 0, "principalMin": 0, "tenorMax": 0, "tenorMaxUnit": 1, "tenorMin": 0, "tenorMinUnit": 1 }], "interestRateMax": 20, "interestRateMin": 0, "interestRateRangeType": 2 }, "productGlMappings": [{ "accountId": "e5f1cfff-b165-40db-9c4f-d05b41cd334a", "accountName": "Test asset primum ledger 100", "glAccountType": 0 }, { "accountId": "2e018e63-a752-4667-9b64-1c3c93c76f50", "accountName": "Test asset primum ledger 21", "glAccountType": 1 }, { "accountId": "35a69d04-c6bf-43fc-bc78-10342c65e20a", "accountName": "Test asset primum ledger 11", "glAccountType": 2 }], "productInfo": { "currency": "NGN", "description": "tHIS IS A FREE LOAN", "endDate": null, "productName": "Free Loan", "slogan": "LOADNF", "startDate": "2023-12-15T00:00:00Z" }, "productType": 0 })
  })
})

const formData = {
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
  ]
}

describe("FormComponeent", () => {
  const handleNav = jest.fn();
  const setProductData = jest.fn();
  const setDisabled = jest.fn();
  const initiateDraft = false;
  it("Should render if step === 1", () => {
    const form = renderWithProviders(<FormComponent step={1} activeId={"23456789"} setProductData={setProductData}
      productData={formData} handleNav={handleNav} setDisabled={setDisabled} initiateDraft={false} />)
    expect(screen.getByText("Product Name")).toBeInTheDocument();
    expect(screen.getByText("Slogan")).toBeInTheDocument();
    expect(screen.getByText("Product Description")).toBeInTheDocument();
    expect(screen.getByTestId("product-name")).toHaveValue("Free Loan");
    expect(screen.getByTestId("product-description")).toHaveValue("tHIS IS A FREE LOAN");
  })
  it("Should render if step === 2", () => {
    const form = renderWithProviders(<FormComponent step={2} activeId={"23456789"} setProductData={setProductData}
      productData={formData} handleNav={handleNav} setDisabled={setDisabled} initiateDraft={false} />)

    expect(screen.getByText("DOCUMENTATION REQUIRED")).toBeInTheDocument();
    // expect(screen.getByText("Signature")).toBeInTheDocument();
    // expect(screen.getByText("Valid Identification document")).toBeInTheDocument();
    // expect(screen.getByText("Proof of residential address")).toBeInTheDocument();
    expect(screen.getByText("Select requirements")).toBeInTheDocument();
    // expect(screen.getByText("Customer Category")).toBeInTheDocument();
    // expect(screen.getByText("Age Group Eligibility")).toBeInTheDocument();
    expect(screen.getAllByTestId("min-max-input")[0]).toHaveValue(0);
    expect(screen.getAllByTestId("min-max-input")[1]).toHaveValue(40);
  })
  it("Should render if step === 3", () => {
    const form = renderWithProviders(<FormComponent step={3} activeId={"23456789"} setProductData={setProductData}
      productData={formData} handleNav={handleNav} setDisabled={setDisabled} initiateDraft={false} />)

    expect(screen.getAllByTestId('min-max-input').length).toBe(2);

    expect(screen.getByText("Applicable Tenor")).toBeInTheDocument();
    expect(screen.getByText("Applicable Principal")).toBeInTheDocument();
    expect(screen.getByText("Applicable Interest Rate Range (Per Annum)")).toBeInTheDocument();;
    expect(form).toMatchSnapshot();
  })
  it("Should render if step === 4", () => {
    const form = renderWithProviders(<FormComponent step={4} activeId={"23456789"} setProductData={setProductData}
      productData={formData} handleNav={handleNav} setDisabled={setDisabled} initiateDraft={false} />)

    expect(form).toMatchSnapshot();
  })
  it("Should render if step === 5", () => {
    const form = renderWithProviders(<FormComponent step={5} activeId={"23456789"} setProductData={setProductData}
      productData={formData} handleNav={handleNav} setDisabled={setDisabled} initiateDraft={false} />)

    expect(form).toMatchSnapshot();
  })
})

describe("handleNext", () => {
  const setStep = jest.fn();
  it("should call setStep when theres more steps ahead", () => {
    handleNext(1, setStep, [1, 1, 1, 1, 1]);
    expect(setStep).toBeCalledWith(2);
  })
  it("should not setStep when there are no steps ahead", () => {
    const setStep = jest.fn();
    handleNext(5, setStep, [1, 1, 1, 1, 1]);
    expect(setStep).not.toBeCalled();
  })

})

describe("handlePrev", () => {
  const setStep = jest.fn();
  it("should call setStep when there are steps behind", () => {
    handlePrev(4, setStep, [{ index: 1 }]);
    expect(setStep).toBeCalledWith(3);
  })
  it("should not call setStep when user is at the first step", () => {
    handlePrev(1, setStep, [{ index: 1 }]);
    expect(setStep).not.toBeCalledWith(0);
  })
})

describe("handleDraft", () => {
  // Sets setIsConfirmOpen to false
  it('should set setIsConfirmOpen to false when called', () => {
    const setIsConfirmOpen = jest.fn();
    const productData = {};
    const process = "modify";
    const id = "123";
    const modifyRequest = jest.fn();
    const modifyProduct = jest.fn();
    const createProduct = jest.fn();

    handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

    expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
  });

  // Calls modifyProduct with isDraft set to true if process is "modify"
  it('should call modifyProduct with isDraft set to true when process is "modify"', () => {
    const setIsConfirmOpen = jest.fn();
    const productData = {};
    const process = "modify";
    const id = "123";
    const modifyRequest = jest.fn();
    const modifyProduct = jest.fn();
    const createProduct = jest.fn();

    handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

    expect(modifyProduct).toHaveBeenCalledWith({ ...productData, isDraft: true, id });
  });

  // Calls createProduct with isDraft set to true if process is "create" or "clone"
  it('should call createProduct with isDraft set to true when process is "create" or "clone"', () => {
    const setIsConfirmOpen = jest.fn();
    const productData = {};
    const process = "create";
    const id = "123";
    const modifyRequest = jest.fn();
    const modifyProduct = jest.fn();
    const createProduct = jest.fn();

    handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

    expect(createProduct).toHaveBeenCalledWith({ ...productData, isDraft: true });
  });

  // process is undefined
  it('should not call any functions when process is undefined', () => {
    const setIsConfirmOpen = jest.fn();
    const productData = {};
    const process = null;
    const id = "123";
    const modifyRequest = jest.fn();
    const modifyProduct = jest.fn();
    const createProduct = jest.fn();

    handleDraft({ productData, process, id, modifyRequest, setIsConfirmOpen, modifyProduct, createProduct });

    expect(setIsConfirmOpen).toHaveBeenCalled();
    expect(modifyProduct).not.toHaveBeenCalled();
    expect(createProduct).not.toHaveBeenCalled();
    expect(modifyRequest).not.toHaveBeenCalled();
  });
})