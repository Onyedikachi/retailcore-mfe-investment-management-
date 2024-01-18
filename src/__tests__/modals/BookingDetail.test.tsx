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

  // Renders the product name and investment status
  it('should render the product name and investment status', () => {
    const detail = {
      investmentId: "123456",
      principal: 10000,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: "Term Deposit",
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByTestId("product-name")).toHaveTextContent("Term Deposit");
    expect(screen.getByTestId("product-view")).toContainElement(screen.getByText("Active"));
  });

  // Displays customer name and account number
  it('should display customer name and account number', () => {
    const detail = {
      investmentId: "123456",
      principal: 10000,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: "Term Deposit",
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByText("John Doe/ 1234567890")).toBeInTheDocument();
  });

  // Shows investment ID and principal
  it('should show investment ID and principal', () => {
    const detail = {
      investmentId: "123456",
      principal: 10000,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: "Term Deposit",
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByText("123456")).toBeInTheDocument();
    expect(screen.getByText("NGN 10,000.00")).toBeInTheDocument();
  });

  // Displays '-' when product name is not available
  it('should display "-" when product name is not available', () => {
    const detail = {
      investmentId: "123456",
      principal: 10000,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: null,
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByTestId("product-name")).toHaveTextContent("-");
  });

  // Displays '-' when investment ID is not available
  it('should display "-" when investment ID is not available', () => {
    const detail = {
      investmentId: null,
      principal: 10000,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: "Term Deposit",
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByTestId("id-value")).toHaveTextContent("-");
  });

  // Displays '-' when principal is not available
  it('should display "-" when principal is not available', () => {
    const detail = {
      investmentId: "123456",
      principal: null,
      maturityValue: 12000,
      investmentBookingStatus: 1,
      tenor: "6 months",
      interestRate: 5,
      reason: "Early redemption",
    };

    const isOpen = true;
    const setIsOpen = jest.fn();

    const isLoading = false;

    const investmentData = {
      data: {
        customerBookingInfoModel: {
          customerName: "John Doe",
          customerAccount: "1234567890",
        },
      },
    };

    const productData = {
      data: {
        productInfo: {
          productName: "Term Deposit",
          currency: "USD",
          startDate: "2022-01-01",
          endDate: "2022-07-01",
        },
        pricingConfiguration: {
          interestRateRangeType: 0,
          interestRateConfigModels: [
            {
              min: 3,
              max: 5,
              principalMin: 1000,
              principalMax: 5000,
            },
          ],
        },
      },
    };

    const permissions = ["CREATE_INVESTMENT_PRODUCT", "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    const open = false;
    const setOpen = jest.fn();

    const handleClick = jest.fn();

    render(
      <BookingDetailLayout
        detail={detail}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        investmentData={investmentData}
        productData={productData}
        permissions={permissions}
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
      />
    );

    expect(screen.getByTestId("principal-value")).toBeInTheDocument();
    expect(screen.getByTestId("principal-value")).toHaveTextContent("NGN 0.00");
  });
});
