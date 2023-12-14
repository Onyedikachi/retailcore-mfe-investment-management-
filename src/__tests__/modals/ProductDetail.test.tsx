import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProductDetail from "../../components/modals/ProductDetail";
import { renderWithProviders } from "../../utils/test-util";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ProductDetail', () => {
  window.ResizeObserver = ResizeObserver;
  let props;
  beforeEach(() => {
    props = {
      isOpen: true,
      setIsOpen: jest.fn(),
      handleClick: jest.fn(),
      setReason: jest.fn(),
      detail: ""
    };
  });

  it('should fetch product data successfully', async () => {
    // Arrange
    const isOpen = true;
    const setIsOpen = jest.fn();
    const handleClick = jest.fn();
    const detail = { id: 1 };
    const productData = { data: { productInfo: { productName: "Test Product" } } };
    // Mock the query function if you are using something like react-query
    // useGetProductDetailQuery.mockReturnValueOnce({ data: productData, isLoading: false, isSuccess: true });

    // Act
    renderWithProviders(<ProductDetail isOpen={isOpen} setIsOpen={setIsOpen} handleClick={handleClick} detail={detail} />);

    // Simulate a click event on the product view
    fireEvent.click(screen.getByTestId("product-view"));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId("product-view")).toBeInTheDocument();
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });
});



// describe('ProductDetail', () => {
//   window.ResizeObserver = ResizeObserver;
//   let props;
//   beforeEach(() => {
//     props = {
//       isOpen: true,
//       setIsOpen: jest.fn(),
//       handleClick: jest.fn(),
//       setReason: jest.fn(),
//       detail:""
//     };
//   });
//   // The function is called with valid input values for isOpen, setIsOpen, handleClick, and detail, and the productData is successfully fetched from the API.
//   it('should render the product details when the data is successfully fetched', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { getByTestId, queryByText } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that the product details are rendered correctly
//     expect(getByTestId("product-view")).toBeInTheDocument();
//     expect(queryByText("Test Product")).toBeInTheDocument();
//     expect(queryByText("Test Slogan")).toBeInTheDocument();
//     expect(queryByText("Test Description")).toBeInTheDocument();
//     expect(queryByText("01 Jan 2022 - 31 Dec 2022")).toBeInTheDocument();
//     expect(queryByText("USD")).toBeInTheDocument();
//     expect(queryByText("Individual")).toBeInTheDocument();
//   });

//   // The productData is not null and contains the expected information for the product.
//   it('should display the correct product information', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { queryByText } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that the correct product information is displayed
//     expect(queryByText("Test Product")).toBeInTheDocument();
//     expect(queryByText("Test Slogan")).toBeInTheDocument();
//     expect(queryByText("Test Description")).toBeInTheDocument();
//     expect(queryByText("01 Jan 2022 - 31 Dec 2022")).toBeInTheDocument();
//     expect(queryByText("USD")).toBeInTheDocument();
//     expect(queryByText("Individual")).toBeInTheDocument();
//   });

//   // The isLoading flag is false, indicating that the data has been loaded successfully.
//   it('should set isLoading to false when the data is successfully loaded', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { queryByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that isLoading is set to false
//     expect(queryByTestId("product-view")).toBeInTheDocument();
//   });

//   // The function is called with isOpen=false, and the modal is not rendered.
//   it('should not render the modal when isOpen is false', () => {
//     // Render the ProductDetail component with isOpen=false
//     const { queryByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={false}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that the modal is not rendered
//     expect(queryByTestId("product-view")).not.toBeInTheDocument();
//   });

//   // The productData is null or empty, and the loading spinner is displayed.
//   it('should display the loading spinner when the product data is null or empty', () => {
//     // Mock the useGetProductDetailQuery hook with null data
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: null,
//         isLoading: true,
//         isSuccess: false
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { getByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that the loading spinner is displayed
//     expect(getByTestId("spinner")).toBeInTheDocument();
//   });

//   // The productData is null or empty, and the loading spinner is hidden after a certain time.
//   it('should hide the loading spinner after a certain time when the product data is null or empty', async () => {
//     // Mock the useGetProductDetailQuery hook with null data
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: null,
//         isLoading: true,
//         isSuccess: false
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { queryByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Wait for a certain time
//     await waitFor(() => {
//       // Assert that the loading spinner is hidden
//       expect(queryByTestId("spinner")).not.toBeInTheDocument();
//     });
//   });

//   // The setIsOpen function is called with false when the close button is clicked.
//   it('should call setIsOpen with false when the close button is clicked', () => {
//     // Mock the setIsOpen function
//     const setIsOpen = jest.fn();

//     // Render the ProductDetail component with the necessary props
//     const { getByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={setIsOpen}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Simulate a click on the close button
//     fireEvent.click(getByTestId("close-btn"));

//     // Assert that the setIsOpen function was called with false
//     expect(setIsOpen).toHaveBeenCalledWith(false);
//   });

//   // The view activity log button redirects to the correct URL with the product ID and category.
//   it('should redirect to the correct URL with the product ID and category when the view activity log button is clicked', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         id: 1
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Mock the useHistory hook
//     const mockHistoryPush = jest.fn();
//     jest.mock("react-router-dom", () => ({
//       ...jest.requireActual("react-router-dom"),
//       useHistory: () => ({
//         push: mockHistoryPush
//       })
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { getByText } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Click the view activity log button
//     fireEvent.click(getByText("View Activity Log"));

//     // Assert that the correct URL is pushed to history
//     expect(mockHistoryPush).toHaveBeenCalledWith("/product-factory/investment/term%20deposit/process-summary/preview/1?category=product");
//   });

//   // The isOpen state is set to true when the function is called with isOpen=true.
//   it('should set isOpen state to true when called with isOpen=true', () => {
//     // Mock the setIsOpen function
//     const setIsOpen = jest.fn();

//     // Render the ProductDetail component with the necessary props
//     renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={setIsOpen}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Assert that the setIsOpen function is called with true
//     expect(setIsOpen).toHaveBeenCalledWith(true);
//   });

//   // The open state is set to true when the "View more" button is clicked.
//   it('should set the open state to true when the "View more" button is clicked', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Render the ProductDetail component with the necessary props
//     const { getByText, getByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Click the "View more" button
//     fireEvent.click(getByText("View more"));

//     // Assert that the open state is set to true
//     expect(getByTestId("Layout")).toBeInTheDocument();
//   });

//   // The setOpen function is called with false when the close button in the "View more" modal is clicked.
//   it('should call setOpen with false when the close button in the "View more" modal is clicked', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Mock the setOpen function
//     const mockSetOpen = jest.fn();

//     // Render the ProductDetail component with the necessary props
//     const { getByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={mockSetOpen}
//         handleClick={jest.fn()}
//         detail={{ id: 1 }}
//       />
//     );

//     // Click the close button in the "View more" modal
//     fireEvent.click(getByTestId("close-btn"));

//     // Assert that the setOpen function is called with false
//     expect(mockSetOpen).toHaveBeenCalledWith(false);
//   });

//   // The handleClick function is called with the correct action ("modify", "activate", "deactivate") and the productData when the corresponding button is clicked.
//   it('should call handleClick with the correct action and productData when the corresponding button is clicked', () => {
//     // Mock the useGetProductDetailQuery hook
//     const mockProductData = {
//       data: {
//         productInfo: {
//           productName: "Test Product",
//           slogan: "Test Slogan",
//           description: "Test Description",
//           startDate: "2022-01-01",
//           endDate: "2022-12-31",
//           currency: "USD"
//         },
//         state: 2,
//         productType: 0,
//         productCode: "TEST001",
//         customerEligibility: {
//           customerCategory: 0
//         },
//         pricingConfiguration: {
//           applicableTenorMin: 1,
//           applicableTenorMinUnit: 1,
//           applicableTenorMax: 12,
//           applicableTenorMaxUnit: 3,
//           applicablePrincipalMin: 1000,
//           applicablePrincipalMax: 5000,
//           interestRateRangeType: 0,
//           interestRateConfigModels: [
//             {
//               min: 1,
//               max: 2,
//               principalMin: 1000,
//               principalMax: 2000
//             },
//             {
//               min: 2,
//               max: 3,
//               principalMin: 2000,
//               principalMax: 3000
//             }
//           ]
//         },
//         liquidation: {
//           part_AllowPartLiquidation: true,
//           part_RequireNoticeBeforeLiquidation: true,
//           part_NoticePeriod: 7,
//           part_NoticePeriodUnit: 1,
//           part_LiquidationPenalty: 2,
//           part_LiquidationPenaltyPercentage: 50,
//           part_MaxPartLiquidation: 80,
//           early_AllowEarlyLiquidation: true,
//           early_RequireNoticeBeforeLiquidation: true,
//           early_NoticePeriod: 14,
//           early_NoticePeriodUnit: 1,
//           early_LiquidationPenalty: 3,
//           early_LiquidationPenaltyPercentage: 75
//         }
//       },
//       isLoading: false,
//       isSuccess: true
//     };
//     jest.mock("@app/api", () => ({
//       useGetProductDetailQuery: jest.fn(() => ({
//         data: mockProductData,
//         isLoading: false,
//         isSuccess: true
//       }))
//     }));

//     // Mock the handleClick function
//     const mockHandleClick = jest.fn();

//     // Render the ProductDetail component with the necessary props
//     const { getByTestId } = renderWithProviders(
//       <ProductDetail
//         isOpen={true}
//         setIsOpen={jest.fn()}
//         handleClick={mockHandleClick}
//         detail={{ id: 1 }}
//       />
//     );

//     // Click the modify button
//     fireEvent.click(getByTestId("modify"));

//     // Assert that handleClick is called with the correct action and productData
//     expect(mockHandleClick).toHaveBeenCalledWith("modify", mockProductData.data);

//     // Click the activate button
//     fireEvent.click(getByTestId("activate-btn"));

//     // Assert that handleClick is called with the correct action and productData
//     expect(mockHandleClick).toHaveBeenCalledWith("activate", mockProductData.data);

//     // Click the deactivate button
//     fireEvent.click(getByTestId("deactivate-btn"));

//     // Assert that handleClick is called with the correct action and productData
//     expect(mockHandleClick).toHaveBeenCalledWith("deactivate", mockProductData.data);
//   });
// });
