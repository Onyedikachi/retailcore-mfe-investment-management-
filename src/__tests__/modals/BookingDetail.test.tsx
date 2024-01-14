import {render, screen, act, fireEvent } from "@testing-library/react"
import BookingDetail, { BookingDetailLayout } from "../../components/modals/BookingDetail"
import {renderWithProviders} from "../../__mocks__/api/Wrapper"

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }
  

describe('code snippet', () => {

    // Renders the component with correct data when productData is loaded
    it('should render', () => {
      // Mock the useGetProductDetailQuery hook
      jest.mock('@app/api', () => ({
        useGetProductDetailQuery: jest.fn(() => ({
          data: {
            productInfo: {
              productName: 'Test Product',
              slogan: 'Test Slogan',
              description: 'Test Description',
              currency: 'USD',
              startDate: '2022-01-01',
              endDate: '2022-12-31',
            },
            state: 2,
            productType: 0,
            productCode: '123456',
            customerEligibility: {
              customerCategory: 0,
            },
          },
          isLoading: false,
        })),
      }));

      // Render the component
      const { getByTestId } = renderWithProviders(
        <BookingDetail isOpen={true} setIsOpen={jest.fn()} handleClick={jest.fn()} detail={{ id: 1 }} />
      );
      expect(screen).toMatchSnapshot();
    });
});






describe('BookingDetailLayout', () => {
    beforeEach(() => {
        window.ResizeObserver = ResizeObserver
    })
    // Renders the product details correctly when isLoading is false
    it('should render the product details correctly when isLoading is false', () => {
      const exampleProductData = {
        data: {
          productInfo: {
            productName: "Term Deposit",
            currency: "USD",
            slogan: "High returns guaranteed",
            description: "Invest your money with confidence",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
          },
          state: 2,
          productType: 0,
          productCode: "TD001",
          customerEligibility: {
            customerCategory: 0,
          },
        },
      };

      const examplePermissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

      const exampleHandleClick = (action, data) => {
        console.log(`Action: ${action}`);
        console.log("Product Data:", data);
      };

      const exampleIsOpen = true;
      const exampleSetIsOpen = () => {};

      act(() => {
          renderWithProviders(
            <BookingDetailLayout
              isOpen={exampleIsOpen}
              setIsOpen={exampleSetIsOpen}
              isLoading={false}
              productData={exampleProductData}
              permissions={examplePermissions}
              open={false}
              setOpen={() => {}}
              handleClick={exampleHandleClick}
            />
          );
      })


      // Assertions
      expect(screen.getByTestId("product-name")).toHaveTextContent("Term Deposit");
      expect(screen.getByTestId("product-view")).toBeInTheDocument();
      expect(screen.getByTestId("product-view")).toHaveClass("bg-white");
    });

    // Renders the loading spinner when isLoading is true
    it('should render the loading spinner when isLoading is true', () => {
      const exampleProductData = {
        data: {
          productInfo: {
            productName: "Term Deposit",
            currency: "USD",
            slogan: "High returns guaranteed",
            description: "Invest your money with confidence",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
          },
          state: 2,
          productType: 0,
          productCode: "TD001",
          customerEligibility: {
            customerCategory: 0,
          },
        },
      };

      const examplePermissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

      const exampleHandleClick = (action, data) => {
        console.log(`Action: ${action}`);
        console.log("Product Data:", data);
      };

      const exampleIsOpen = true;
      const exampleSetIsOpen = () => {};

      render(
        <BookingDetailLayout
          isOpen={exampleIsOpen}
          setIsOpen={exampleSetIsOpen}
          isLoading={true}
          productData={exampleProductData}
          permissions={examplePermissions}
          open={false}
          setOpen={() => {}}
          handleClick={exampleHandleClick}
        />
      );

      // Assertions
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByTestId("loading-spinner").children[0]).toHaveClass("spinner-border");
    });

    // Renders the product state as 'Active' when productData state is 2
    it('should render the product state as "Active" when productData state is 2', () => {
      const exampleProductData = {
        data: {
          productInfo: {
            productName: "Term Deposit",
            currency: "USD",
            slogan: "High returns guaranteed",
            description: "Invest your money with confidence",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
          },
          state: 2,
          productType: 0,
          productCode: "TD001",
          customerEligibility: {
            customerCategory: 0,
          },
        },
      };

      const examplePermissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

      const exampleHandleClick = (action, data) => {
        console.log(`Action: ${action}`);
        console.log("Product Data:", data);
      };

      const exampleIsOpen = true;
      const exampleSetIsOpen = () => {};

      render(
        <BookingDetailLayout
          isOpen={exampleIsOpen}
          setIsOpen={exampleSetIsOpen}
          isLoading={false}
          productData={exampleProductData}
          permissions={examplePermissions}
          open={false}
          setOpen={() => {}}
          handleClick={exampleHandleClick}
        />
      );

      // Assertions
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Active")).toHaveClass("text-[#15692A]");
    });
});
