import FacilityDetails, { handleInterestRateValues, handleProductDetails, handleSearch } from "../../../../../components/pages/management/book-investment/FacilityDetails.tsx"
import { render, fireEvent, screen } from "@testing-library/react"
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper.tsx"

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn().mockReturnValue({ process: "continue" }),
  useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

describe('handleProductDetails', () => {

  // Sets the minimum tenor value to the applicableTenorMin value of the productDetail's pricingConfiguration
  it('should set the minimum tenor value when productDetail is not null and pricingConfiguration is not null', () => {
    const productDetail = {
      pricingConfiguration: {
        applicableTenorMin: 10,
        applicableTenorMax: 20,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 5000,
        interestRateConfigModels: [[]],
        interestRateRangeType: 2,
        interestRateMin: 1,
        interestRateMax: 5
      }
    };
    const values = {};
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).toHaveBeenCalledWith("tenorMin", 10);
  });

  it('Should set values if interestRangeConfigModel is 0', () => {
    const rangeArr = { principalMin: 10, principalMax: 20, min: 9, max: 12 }
    const productDetail = {
      pricingConfiguration: {
        applicableTenorMin: 10,
        applicableTenorMax: 20,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 5000,
        interestRateConfigModels: [rangeArr],
        interestRateRangeType: 0,
        interestRateMin: 1,
        interestRateMax: 5
      }
    };
    const values = { principal: 14 };
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).toHaveBeenCalledWith("intMin", 9);
    expect(setValue).toHaveBeenCalledWith("intMax", 12);
  });

  it('Should set values if interestRangeConfigModel is 1', () => {
    const rangeArr = { tenorMin: 10, tenorMax: 20, min: 9, max: 12 }
    const productDetail = {
      pricingConfiguration: {
        applicableTenorMin: 10,
        applicableTenorMax: 20,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 5000,
        interestRateConfigModels: [rangeArr],
        interestRateRangeType: 1,
        interestRateMin: 1,
        interestRateMax: 5
      }
    };
    const values = { tenor: 14 };
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).toHaveBeenCalledWith("intMin", 9);
    expect(setValue).toHaveBeenCalledWith("intMax", 12);
  });
  // it('Should set values if interestRangeConfigModel is 2', () => {
  //   const rangeArr = {tenorMin: 10, tenorMax: 20, min: 9, max: 12}
  //   const productDetail = {
  //     pricingConfiguration: {
  //       applicableTenorMin: 10,
  //       applicableTenorMax: 20,
  //       applicablePrincipalMin: 1000,
  //       applicablePrincipalMax: 5000,
  //       interestRateConfigModels: [rangeArr],
  //       interestRateRangeType: 1,
  //       interestRateMin: 1,
  //       interestRateMax: 5
  //     }
  //   };
  //   const values = {tenor: 14};
  //   const setValue = jest.fn();
  //   const setProductDetail = jest.fn();

  //   handleProductDetails({ productDetail, values, setValue, setProductDetail });

  //   expect(setValue).toHaveBeenCalledWith("intMin", 1);
  //   expect(setValue).toHaveBeenCalledWith("intMax", 5);
  // });

  // Sets the maximum tenor value to the applicableTenorMax value of the productDetail's pricingConfiguration
  it('should set the maximum tenor value when productDetail is not null and pricingConfiguration is not null', () => {
    const productDetail = {
      pricingConfiguration: {
        applicableTenorMin: 10,
        applicableTenorMax: 20,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 5000,
        interestRateConfigModels: [[{}]],
        interestRateRangeType: 2,
        interestRateMin: 1,
        interestRateMax: 5
      }
    };
    const values = { principal: 14 };
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).toHaveBeenCalledWith("tenorMax", 20);
  });

  // Sets the minimum principal value to the applicablePrincipalMin value of the productDetail's pricingConfiguration
  it('should set the minimum principal value when productDetail is not null and pricingConfiguration is not null', () => {
    const productDetail = {
      pricingConfiguration: {
        applicableTenorMin: 10,
        applicableTenorMax: 20,
        applicablePrincipalMin: 1000,
        applicablePrincipalMax: 5000,
        interestRateConfigModels: [[]],
        interestRateRangeType: 2,
        interestRateMin: 1,
        interestRateMax: 5
      }
    };
    const values = {};
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).toHaveBeenCalledWith("prinMin", 1000);
  });

  // If productDetail is null, does not set any values
  it('should not set any values when productDetail is null', () => {
    const productDetail = null;
    const values = {};
    const setValue = jest.fn();
    const setProductDetail = jest.fn();

    handleProductDetails({ productDetail, values, setValue, setProductDetail });

    expect(setValue).not.toHaveBeenCalled();
  });
});


// Generated by CodiumAI

describe('handleSearch', () => {

  // Sets the value of "investmentProductId" and "investmentProductName" using the provided "data" parameter
  it('should set investmentProductId and investmentProductName when data is provided', () => {
    const value = "test value";
    const data = {
      value: "test investmentProductId",
      name: "test investmentProductName"
    };
    const setValue = jest.fn();
    const setProductName = jest.fn();
    const trigger = jest.fn();
    const formData = {};
    const setFormData = jest.fn();

    handleSearch(value, data, setValue, setProductName, trigger, formData, setFormData);

    expect(setValue).toHaveBeenCalledWith("investmentProductId", data?.value);
    expect(setValue).toHaveBeenCalledWith("investmentProductName", data?.name);
    expect(trigger).toHaveBeenCalledWith("investmentProductId");
    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      facilityDetailsModel: {
        ...formData.facilityDetailsModel,
        investmentProductId: data.value,
      },
    });
  });

  // Triggers the "investmentProductId" validation using the "trigger" parameter
  it('should trigger investmentProductId validation', () => {
    const value = "test value";
    const data = {};
    const setValue = jest.fn();
    const setProductName = jest.fn();
    const trigger = jest.fn();
    const formData = {};
    const setFormData = jest.fn();

    handleSearch(value, data, setValue, setProductName, trigger, formData, setFormData);

    expect(trigger).toHaveBeenCalledWith("investmentProductId");
  });

  // Updates the "formData" parameter with the new "investmentProductId" value
  it('should update formData with new investmentProductId value', () => {
    const value = "test value";
    const data = {
      value: "test investmentProductId",
      name: "test investmentProductName"
    };
    const setValue = jest.fn();
    const setProductName = jest.fn();
    const trigger = jest.fn();
    const formData = {};
    const setFormData = jest.fn();

    handleSearch(value, data, setValue, setProductName, trigger, formData, setFormData);

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      facilityDetailsModel: {
        ...formData.facilityDetailsModel,
        investmentProductId: data.value,
      },
    });
  });

  // Handles the case where "data" parameter is undefined or null
  it('should handle undefined or null data parameter', () => {
    const value = "test value";
    const data = undefined;
    const setValue = jest.fn();
    const setProductName = jest.fn();
    const trigger = jest.fn();
    const formData = {};
    const setFormData = jest.fn();

    handleSearch(value, data, setValue, setProductName, trigger, formData, setFormData);

    expect(setValue).not.toHaveBeenCalled();
    expect(trigger).not.toHaveBeenCalled();
    expect(setFormData).not.toHaveBeenCalled();
  });

  // Handles the case where "value" parameter is undefined or null
  it('should handle undefined or null value parameter', () => {
    const value = undefined;
    const data = {
      value: "test investmentProductId",
      name: "test investmentProductName"
    };
    const setValue = jest.fn();
    const setProductName = jest.fn();
    const trigger = jest.fn();
    const formData = {};
    const setFormData = jest.fn();

    handleSearch(value, data, setValue, setProductName, trigger, formData, setFormData);

    expect(setValue).toHaveBeenCalled();
    expect(trigger).toHaveBeenCalled();
    expect(setFormData).toHaveBeenCalled();
  })
});


// Generated by CodiumAI

describe('handleInterestRateValues', () => {

  // If productDetail has interestRateRangeType of 0, set intMin and intMax based on principal value
  it('should set intMin and intMax based on principal value when productDetail has interestRateRangeType of 0', () => {
    // Arrange
    const productDetail = {
      pricingConfiguration: {
        interestRateRangeType: 0,
        interestRateConfigModels: [
          { principalMin: 1000, principalMax: 2000, min: 1, max: 2 },
          { principalMin: 2001, principalMax: 3000, min: 3, max: 4 },
        ],
      },
    };
    const values = { principal: 1500 };
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).toHaveBeenCalledWith("intMin", 1);
    expect(setValue).toHaveBeenCalledWith("intMax", 2);
  });

  // If productDetail has interestRateRangeType of 1, set intMin and intMax based on tenor value
  it('should set intMin and intMax based on tenor value when productDetail has interestRateRangeType of 1', () => {
    // Arrange
    const productDetail = {
      pricingConfiguration: {
        interestRateRangeType: 1,
        interestRateConfigModels: [
          { tenorMin: 1, tenorMinUnit: 1, tenorMax: 1, tenorMaxUnit: 2, min: 1, max: 2 },
          // { tenorMin: 11, tenorMax: 2, min: 3, max: 4 },
        ],
      },
    };
    const values = { tenor: 2, tenoUnit: 2 };
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).toHaveBeenCalledWith("intMin", 1);
    expect(setValue).toHaveBeenCalledWith("intMax", 2);
  });

  // If productDetail has interestRateRangeType of 2, set intMin and intMax based on interestRateMin and interestRateMax values
  it('should set intMin and intMax based on interestRateMin and interestRateMax values when productDetail has interestRateRangeType of 2', () => {
    // Arrange
    const productDetail = {
      pricingConfiguration: {
        interestRateRangeType: 2,
        interestRateMin: 1,
        interestRateMax: 2,
      },
    };
    const values = {};
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).toHaveBeenCalledWith("intMin", 1);
    expect(setValue).toHaveBeenCalledWith("intMax", 2);
  });

  // If productDetail is undefined, do nothing
  it('should do nothing when productDetail is undefined', () => {
    // Arrange
    const productDetail = undefined;
    const values = {};
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).not.toHaveBeenCalled();
  });

  // If productDetail has no pricingConfiguration, do nothing
  it('should do nothing when productDetail has no pricingConfiguration', () => {
    // Arrange
    const productDetail = {};
    const values = {};
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).not.toHaveBeenCalled();
  });

  // If productDetail has pricingConfiguration but no interestRateConfigModels, do nothing
  it('should do nothing when productDetail has pricingConfiguration but no interestRateConfigModels', () => {
    // Arrange
    const productDetail = {
      pricingConfiguration: {},
    };
    const values = {};
    const setValue = jest.fn();
    const trigger = jest.fn();

    // Act
    handleInterestRateValues({ productDetail, values, setValue, trigger });

    // Assert
    expect(setValue).not.toHaveBeenCalled();
  });
});

// Generated by CodiumAI

// describe('FacilityDetails', () => {

//   // Renders form with input fields and labels
//   it('should render', () => {
//     // Arrange
//     const facilityDetailsData = {
//       formData: {
//         facilityDetailsModel: {
//           investmentProductId: "",
//           investmentProductName: "",
//           investmentPurpose: "",
//           tenor: 0,
//           principal: 0,
//           interestRate: 0,
//           capitalizationMethod: 0,
//           tenorMin: 0,
//           tenorMax: 0,
//           prinMin: 0,
//           prinMax: 0,
//           intMin: 0,
//           intMax: 0,
//         },
//       },
//       setFormData: jest.fn(),
//       proceed: jest.fn(),
//       setDisabled: jest.fn(),
//       isSavingDraft: false,
//       productDetail: {
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMax: 10,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 10000,
//           interestRateRangeType: 1,
//           interestRateConfigModels: [
//             { tenorMin: 1, tenorMinUnit: 1, tenorMax: 1, tenorMaxUnit: 2, min: 1, max: 2 },
//           ],
//         },
//         customerEligibility: {
//           ageGroupMin: 0,
//           ageGroupMax: null,
//           requireDocument: [],
//           customerType: [],
//           customerCategory: null,
//         },
//         productInfo: {
//           currency: "USD",
//         },
//       },
//       setProductDetail: jest.fn(),
//       detailLoading: false,
//     };

//     // Act
//     renderWithProviders(<FacilityDetails {...facilityDetailsData} />);

//     // Assert
//     expect(screen.getByTestId("facility-details")).toBeInTheDocument();
//     expect(screen).toMatchSnapshot();
//   });
// });
