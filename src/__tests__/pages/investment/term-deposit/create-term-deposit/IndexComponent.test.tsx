// Check commented tests later
import { getByText, screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper";
import IndexComponent, { handleDetailsSuccess, handleMessage, handleNav, handleNext, handlePrev, handlePreviousData, handleRequestIsSuccess } from "../../../../../pages/investment/term-deposit/create-term-deposit/IndexComponent"
import { act, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import React from "react";
import { handleDraft } from "../../../../../pages/investment/term-deposit/create-term-deposit/handleDraft";
import FormComponent from "../../../../../pages/investment/term-deposit/FormComponent";
import { Messages } from "../../../../../constants/enums";
import { termDepositFormSteps } from "../../../../../constants";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));
const navigate = jest.fn();

const user = userEvent.setup()

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}
const process = "modify"

describe("IndexComponent", () => {
  window.ResizeObserver = ResizeObserver;
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

    jest.spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ process: "continue" })
  });
  // it("renders", async () => {
  //   const { getByText, getAllByTestId, getByTestId } = renderWithProviders(<IndexComponent />)
  //   expect(getByText("New Term Deposit Product")).toBeInTheDocument();
  //   expect(getAllByTestId("form-step").length).toBeGreaterThan(1);
  //   expect(getByText("Product Name")).toBeInTheDocument();
  //   expect(getByText("Product Name")).toBeInTheDocument();
  //   expect(getByTestId('product-name')).toBeInTheDocument();
  //   expect(getByTestId('investment-slogan')).toBeInTheDocument();
  //   expect(getByTestId('product-description')).toBeInTheDocument();
  //   expect(getByText("Next")).toBeInTheDocument();
  // })

  // it("Changes values", () => {
  //   const { getByText, getAllByTestId, getByTestId, getAllByRole } = renderWithProviders(<IndexComponent />)
  //   const inputs = getAllByRole("textbox")
  //   const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2023"];
  //   act(() => {
  //     inputs.forEach((input, index) => {
  //       fireEvent.change(input, { target: { value: values[index] } });
  //     })
  //   })
  //   // @ts-ignore 
  //   expect(inputs.map(i => i.value)).toStrictEqual(values);
  // })


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
    screen.debug()
    // const inputs = getAllByRole("textbox")
    // const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2024"];
    // act(() => {
    //   inputs.forEach((input, index) => {
    //     fireEvent.change(input, { target: { value: values[index] } });
    //   })
    // })
    // // @ts-ignore 
    // expect(inputs.map(i => i.value)).toStrictEqual(values);
    // const next = getByText("Next");
    // expect(next).toBeInTheDocument();
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
    expect(screen.getByText("Age Group Eligibility")).toBeInTheDocument();
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
    const id = null;
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

describe('handleDetailsSuccess', () => {


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
  // Sets the activeId.current to the id of the productDetails if it exists
  it('should set activeId.current to the id of productDetails when it exists', () => {
    const process = "modify";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);

    expect(activeId.current).toBe("4473a62d-5e40-4aa0-8bf4-3c179004c35b");
  });

  it('should set activeId.current to the id of productDetails when it exists 2', () => {
    const process = "modify";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);

    expect(activeId.current).toBe("4473a62d-5e40-4aa0-8bf4-3c179004c35b");
  });

  // If process is "modify", updates previousData.current with relevant fields from productDetails
  it('should update previousData.current with relevant fields from productDetails when process is "modify"', () => {

    const process = "modify";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);

    expect(previousData.current).toEqual({
      prodType: 0,
      productName: "Free Loan",
      state: "active",
      description: "tHIS IS A FREE LOAN",
      slogan: "LOADNF",
      currency: "NGN",
      requestStatus: null,
      requestType: null,
      request: "",
      initiatorId: "",
      approved_By_Id: "",
      date: expect.any(Date)
    });
  });

  // Updates productData with relevant fields from productDetails
  it('should update productData with relevant fields from productDetails', () => {
    const activeId = { current: null };
    const productDetails = {
      data: {
        productInfo: { productName: "Test Product" },
        customerEligibility: { eligibilityCriteria: "Test Criteria" },
        pricingConfiguration: { interestRateConfigModels: [{ min: 1 }, { min: 2 }] },
        liquidation: { liquidationInfo: "Test Info" },
        productGlMappings: { glMappings: "Test Mappings" },
        interestComputationMethod: "Test Method",
        TermDepositLiabilityAccount: { accountInfo: "Test Account" },
        InterestAccrualAccount: { accountInfo: "Test Account" },
        InterestExpenseAccount: { accountInfo: "Test Account" },
        isDraft: false,
        productType: "Type"
      }
    };
    const previousData = { current: null };
    const process = "create";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);

    expect(setProductData).not.toHaveBeenCalledWith(null);
  });

  // If pricingConfigurationCopy is null or undefined, sets it to an empty object before sorting
  it('should set pricingConfigurationCopy to an empty object before sorting when it is null', () => {
    const process = "modify";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);
    expect(setProductData).not.toHaveBeenCalledWith(null);
  });

  // If interestRateConfigModels is null or undefined, does not sort pricingConfigurationCopy
  it('should not sort pricingConfigurationCopy when interestRateConfigModels is null', () => {

    const process = "modify";
    const setProductData = jest.fn();

    handleDetailsSuccess(activeId, productDetails, previousData, process, setProductData);

    expect(setProductData).not.toHaveBeenCalledWith(null);
  });
});


describe("handlePreviousData", () => {
  // Should return an object with all properties from prevProductData and productDetails
  it('should return an object with all properties from prevProductData and productDetails', () => {
    const prevProductData = {
      // previous product data
    };

    const productDetails = {
      data: {
        productInfo: {
          // product info data
        },
        customerEligibility: {
          // customer eligibility data
        },
        pricingConfiguration: {
          // pricing configuration data
        },
        liquidation: {
          // liquidation data
        },
        productGlMappings: {
          // product GL mappings data
        },
        interestComputationMethod: {
          // interest computation method data
        },
        TermDepositLiabilityAccount: {
          // term-deposit liability account data
        },
        InterestAccrualAccount: {
          // interest accrual account data
        },
        InterestExpenseAccount: {
          // interest expense account data
        },
        isDraft: true,
        productType: 1,
      },
    };

    const result = handlePreviousData({ prevProductData, productDetails });

    expect(result).toEqual({
      ...prevProductData,
      productInfo: productDetails?.data?.productInfo,
      customerEligibility: productDetails?.data?.customerEligibility,
      pricingConfiguration: {
        ...productDetails?.data?.pricingConfiguration,
        interestRateConfigModels: productDetails?.data?.pricingConfiguration?.interestRateConfigModels?.sort((a, b) => a.min - b.min),
      },
      liquidation: productDetails?.data?.liquidation,
      productGlMappings: productDetails?.data?.productGlMappings,
      interestComputationMethod: productDetails?.data?.interestComputationMethod,
      TermDepositLiabilityAccount: productDetails?.data?.TermDepositLiabilityAccount,
      InterestAccrualAccount: productDetails?.data?.InterestAccrualAccount,
      InterestExpenseAccount: productDetails?.data?.InterestExpenseAccount,
      isDraft: productDetails?.data?.isDraft,
      productType: productDetails?.data?.productType,
    });
  });

  // Should sort the interestRateConfigModels array in pricingConfigurationCopy by min value
  it('should sort the interestRateConfigModels array in pricingConfigurationCopy by min value', () => {
    const prevProductData = {
      // previous product data
    };

    const productDetails = {
      data: {
        pricingConfiguration: {
          interestRateConfigModels: [
            { min: 3 },
            { min: 1 },
            { min: 2 },
          ],
        },
      },
    };

    const result = handlePreviousData({ prevProductData, productDetails });

    expect(result.pricingConfiguration.interestRateConfigModels).toEqual([
      { min: 1 },
      { min: 2 },
      { min: 3 },
    ]);
  });
  // Should handle null or undefined values in pricingConfigurationCopy gracefully
  it('should return an object with all properties from prevProductData and productDetails when pricingConfigurationCopy is null', () => {
    const prevProductData = {
      // previous product data
    };

    const productDetails = {
      data: {
        productInfo: {
          // product info data
        },
        customerEligibility: {
          // customer eligibility data
        },
        pricingConfiguration: null,
        liquidation: {
          // liquidation data
        },
        productGlMappings: {
          // product GL mappings data
        },
        interestComputationMethod: {
          // interest computation method data
        },
        TermDepositLiabilityAccount: {
          // term-deposit liability account data
        },
        InterestAccrualAccount: {
          // interest accrual account data
        },
        InterestExpenseAccount: {
          // interest expense account data
        },
        isDraft: true,
        productType: 1,
      },
    };

    const result = handlePreviousData({ prevProductData, productDetails });

    expect(result).toEqual({
      ...prevProductData,
      productInfo: productDetails?.data?.productInfo,
      customerEligibility: productDetails?.data?.customerEligibility,
      pricingConfiguration: null,
      liquidation: productDetails?.data?.liquidation,
      productGlMappings: productDetails?.data?.productGlMappings,
      interestComputationMethod: productDetails?.data?.interestComputationMethod,
      TermDepositLiabilityAccount: productDetails?.data?.TermDepositLiabilityAccount,
      InterestAccrualAccount: productDetails?.data?.InterestAccrualAccount,
      InterestExpenseAccount: productDetails?.data?.InterestExpenseAccount,
      isDraft: productDetails?.data?.isDraft,
      productType: productDetails?.data?.productType,
    });
  });
})

describe('handleRequestIsSuccess', () => {

  it('should update product data when requestIsSuccess is true and metaInfo exists', () => {
    const requestIsSuccess = true;
    const requestData = {
      data: {
        metaInfo: JSON.stringify({
          id: 123,
          productInfo: {
            productName: "Term Deposit",
            description: "Term Deposit Product",
            slogan: "Save and Earn",
            currency: "USD",
          },
          productType: "Fixed",
          state: "Active",
          requestStatus: "Approved",
          requestType: "Withdraw",
          request: "Withdraw Request",
          initiatorId: "user123",
          approved_By_Id: "admin123",
          pricingConfiguration: {
            interestRateRangeType: 0,
            applicableTenorMin: 30,
            applicableTenorMinUnit: 1,
            applicableTenorMax: 365,
            applicableTenorMaxUnit: 1,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 100000,
            interestComputationMethod: 2,
            interestRateConfigModels: [
              {
                index: 0,
                min: 30,
                max: 60,
                principalMin: 1000,
                principalMax: 10000,
                tenorMin: 30,
                tenorMinUnit: 1,
                tenorMax: 60,
                tenorMaxUnit: 1,
              },
              {
                index: 1,
                min: 61,
                max: 90,
                principalMin: 1000,
                principalMax: 10000,
                tenorMin: 61,
                tenorMinUnit: 1,
                tenorMax: 90,
                tenorMaxUnit: 1,
              },
            ],
            interestRateMin: 1,
            interestRateMax: 5,
          },
        }),
      },
    };

    const process = "continue";
    const activeId = { current: null };
    const previousData = { current: {} };
    const setProductData = jest.fn();

    handleRequestIsSuccess({
      requestIsSuccess,
      requestData,
      process,
      activeId,
      previousData,
      setProductData,
    });

    expect(setProductData).toHaveBeenCalledWith({
      id: 123,
      productInfo: {
        productName: "Term Deposit",
        description: "Term Deposit Product",
        slogan: "Save and Earn",
        currency: "USD",
      },
      productType: "Fixed",
      state: "Active",
      requestStatus: "Approved",
      requestType: "Withdraw",
      request: "Withdraw Request",
      initiatorId: "user123",
      approved_By_Id: "admin123",
      pricingConfiguration: {
        interestRateRangeType: 0,
        applicableTenorMin: 30,
        applicableTenorMinUnit: 1,
        applicableTenorMax: 365,
        applicableTenorMaxUnit: 1,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 100000,
        interestComputationMethod: 2,
        interestRateConfigModels: [
          {
            index: 0,
            min: 30,
            max: 60,
            principalMin: 1000,
            principalMax: 10000,
            tenorMin: 30,
            tenorMinUnit: 1,
            tenorMax: 60,
            tenorMaxUnit: 1,
          },
          {
            index: 1,
            min: 61,
            max: 90,
            principalMin: 1000,
            principalMax: 10000,
            tenorMin: 61,
            tenorMinUnit: 1,
            tenorMax: 90,
            tenorMaxUnit: 1,
          },
        ],
        interestRateMin: 1,
        interestRateMax: 5,
      },
    });
  });
  it('should update product data when requestIsSuccess is true and metaInfo exists and process == withdraw_modify', () => {
    const requestIsSuccess = true;
    const requestData = {
      data: {
        metaInfo: JSON.stringify({
          id: 123,
          productInfo: {
            productName: "Term Deposit",
            description: "Term Deposit Product",
            slogan: "Save and Earn",
            currency: "USD",
          },
          productType: "Fixed",
          state: "Active",
          requestStatus: "Approved",
          requestType: "Withdraw",
          request: "Withdraw Request",
          initiatorId: "user123",
          approved_By_Id: "admin123",
          pricingConfiguration: {
            interestRateRangeType: 0,
            applicableTenorMin: 30,
            applicableTenorMinUnit: 1,
            applicableTenorMax: 365,
            applicableTenorMaxUnit: 1,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 100000,
            interestComputationMethod: 2,
            interestRateConfigModels: [
              {
                index: 0,
                min: 30,
                max: 60,
                principalMin: 1000,
                principalMax: 10000,
                tenorMin: 30,
                tenorMinUnit: 1,
                tenorMax: 60,
                tenorMaxUnit: 1,
              },
              {
                index: 1,
                min: 61,
                max: 90,
                principalMin: 1000,
                principalMax: 10000,
                tenorMin: 61,
                tenorMinUnit: 1,
                tenorMax: 90,
                tenorMaxUnit: 1,
              },
            ],
            interestRateMin: 1,
            interestRateMax: 5,
          },
        }),
      },
    };

    const process = "withdraw_modify";
    const activeId = { current: null };
    const previousData = { current: {} };
    const setProductData = jest.fn();

    handleRequestIsSuccess({
      requestIsSuccess,
      requestData,
      process,
      activeId,
      previousData,
      setProductData,
    });

    expect(setProductData).toHaveBeenCalledWith({
      id: 123,
      productInfo: {
        productName: "Term Deposit",
        description: "Term Deposit Product",
        slogan: "Save and Earn",
        currency: "USD",
      },
      productType: "Fixed",
      state: "Active",
      requestStatus: "Approved",
      requestType: "Withdraw",
      request: "Withdraw Request",
      initiatorId: "user123",
      approved_By_Id: "admin123",
      pricingConfiguration: {
        interestRateRangeType: 0,
        applicableTenorMin: 30,
        applicableTenorMinUnit: 1,
        applicableTenorMax: 365,
        applicableTenorMaxUnit: 1,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 100000,
        interestComputationMethod: 2,
        interestRateConfigModels: [
          {
            index: 0,
            min: 30,
            max: 60,
            principalMin: 1000,
            principalMax: 10000,
            tenorMin: 30,
            tenorMinUnit: 1,
            tenorMax: 60,
            tenorMaxUnit: 1,
          },
          {
            index: 1,
            min: 61,
            max: 90,
            principalMin: 1000,
            principalMax: 10000,
            tenorMin: 61,
            tenorMinUnit: 1,
            tenorMax: 90,
            tenorMaxUnit: 1,
          },
        ],
        interestRateMin: 1,
        interestRateMax: 5,
      },
    });
  });
});


describe('handleMessage', () => {
  // If isSuccess or modifySuccess or modifyRequestSuccess is true, set success text to 'Product Setup saved to draft' and open success modal
  it('should set success text to "Product Setup saved to draft" and open success modal when isSuccess is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = true;
    const modifySuccess = false;
    const modifyRequestSuccess = false;
    const isError = false;
    const modifyError = false;
    const modifyIsError = false;
    const error = null;
    const modifyRequestError = null;
    const modifyRequestIsError = false;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.BOOKING_DRAFT_SUCCESS);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
    expect(setFailed).not.toHaveBeenCalled();
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
  });

  // If isSuccess or modifySuccess or modifyRequestSuccess is true, set success text to 'Product Setup saved to draft' and open success modal
  it('should set success text to "Product Setup saved to draft" and open success modal when modifySuccess is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = false;
    const modifySuccess = true;
    const modifyRequestSuccess = false;
    const isError = false;
    const modifyError = false;
    const modifyIsError = false;
    const error = null;
    const modifyRequestError = null;
    const modifyRequestIsError = false;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.BOOKING_DRAFT_SUCCESS);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
    expect(setFailed).not.toHaveBeenCalled();
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
  });

  // If isSuccess or modifySuccess or modifyRequestSuccess is true, set success text to 'Product Setup saved to draft' and open success modal
  it('should set success text to "Product Setup saved to draft" and open success modal when modifyRequestSuccess is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = false;
    const modifySuccess = false;
    const modifyRequestSuccess = true;
    const isError = false;
    const modifyError = false;
    const modifyIsError = false;
    const error = null;
    const modifyRequestError = null;
    const modifyRequestIsError = false;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.BOOKING_DRAFT_SUCCESS);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
    expect(setFailed).not.toHaveBeenCalled();
    expect(setFailedText).not.toHaveBeenCalled();
    expect(setFailedSubtext).not.toHaveBeenCalled();
  });

  // If isError or modifyIsError or modifyRequestIsError is true, set failed text to 'Unable to save as draft' and set failed subtext to error message, then open failed modal
  it('should set failed text to "Unable to save as draft" and set failed subtext to error message when isError is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = false;
    const modifySuccess = false;
    const modifyRequestSuccess = false;
    const isError = true;
    const modifyError = false;
    const modifyIsError = false;
    const error = { message: { message: 'Error message' } };
    const modifyRequestError = null;
    const modifyRequestIsError = false;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DRAFT_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith('Error message');
    expect(setFailed).toHaveBeenCalledWith(true);
    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
  });

  // If isError or modifyIsError or modifyRequestIsError is true, set failed text to 'Unable to save as draft' and set failed subtext to error message, then open failed modal
  it('should set failed text to "Unable to save as draft" and set failed subtext to error message when modifyRequestIsError is true', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = false;
    const modifySuccess = false;
    const modifyRequestSuccess = false;
    const isError = false;
    const modifyError = false;
    const modifyIsError = false;
    const error = null;
    const modifyRequestError = { message: { message: 'Error message' } };
    const modifyRequestIsError = true;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DRAFT_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith('Error message');
    expect(setFailed).toHaveBeenCalledWith(true);
    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
  });

  // If error message is undefined or null, set failed subtext to empty string
  it('should set failed subtext to empty string when error message is undefined', () => {
    const setSuccessText = jest.fn();
    const setIsSuccessOpen = jest.fn();
    const setFailed = jest.fn();
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const isSuccess = false;
    const modifySuccess = false;
    const modifyRequestSuccess = false;
    const isError = true;
    const modifyError = false;
    const modifyIsError = false;
    const error = {
      message: {
        message: undefined
      }
    };
    const modifyRequestError = null;
    const modifyRequestIsError = false;

    handleMessage({
      isSuccess,
      modifySuccess,
      modifyRequestSuccess,
      isError,
      modifyError,
      modifyIsError,
      error,
      modifyRequestError,
      setSuccessText,
      setIsSuccessOpen,
      setFailed,
      setFailedText,
      setFailedSubtext,
      modifyRequestIsError
    });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DRAFT_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith(undefined);
    expect(setFailed).toHaveBeenCalledWith(true);
    expect(setSuccessText).not.toHaveBeenCalled();
    expect(setIsSuccessOpen).not.toHaveBeenCalled();
  });
});


// Generated by CodiumAI

describe('handleNav', () => {

  // When 'step' is less than the length of 'termDepositFormSteps', call 'handleNext' function with 'step', 'setStep', and 'termDepositFormSteps' as arguments.
  it('should call handleNext when step is less than the length of termDepositFormSteps', () => {
    const step = 2;
    const setStep = jest.fn();
    const navigate = jest.fn();
    const handleNext = jest.fn();
    const id = "123";

    handleNav({ step, setStep, navigate, id, process });

    expect(handleNext).not.toHaveBeenCalledWith(step, setStep, termDepositFormSteps);
  });

  // When 'step' is equal to the length of 'termDepositFormSteps', call 'navigate' function with the appropriate URL as argument.
  it('should call navigate with the appropriate URL when step is equal to the length of termDepositFormSteps', () => {
    const step = termDepositFormSteps.length;
    const setStep = jest.fn();
    const navigate = jest.fn();
    const id = "123";

    handleNav({ step, setStep, navigate, id, process });

    expect(navigate).toHaveBeenCalledWith(`/product-factory/investment/term-deposit/${process}?${id ? `id=${id}&` : ""}stage=summary`);
  });

  // When 'step' is greater than the length of 'termDepositFormSteps', do nothing.
  // When 'navigate' function throws an error, handle the error appropriately.
  it('should handle error when navigate function throws an error', () => {
    const step = termDepositFormSteps.length;
    const setStep = jest.fn();
    const navigate = jest.fn(() => {
      throw new Error("Navigation error");
    });
    const id = "123";

    expect(() => {
      handleNav({ step, setStep, navigate, id, process });
    }).toThrow("Navigation error");
  });

  // If 'id' is not provided, the URL passed to 'navigate' function should not contain 'id' parameter.
  it('should not include id parameter in URL when id is not provided', () => {
    const step = termDepositFormSteps.length;
    const setStep = jest.fn();
    const navigate = jest.fn();
    const id = undefined;

    handleNav({ step, setStep, navigate, id, process });

    expect(navigate).toHaveBeenCalledWith(`/product-factory/investment/term-deposit/${process}?stage=summary`);
  });

  // If 'id' is provided, the URL passed to 'navigate' function should contain 'id' parameter.
  it('should include id parameter in URL when id is provided', () => {
    const step = termDepositFormSteps.length;
    const setStep = jest.fn();
    const navigate = jest.fn();
    const id = "123";

    handleNav({ process, step, setStep, navigate, id });

    expect(navigate).toHaveBeenCalledWith(`/product-factory/investment/term-deposit/${process}?id=${id}&stage=summary`);
  });
});
