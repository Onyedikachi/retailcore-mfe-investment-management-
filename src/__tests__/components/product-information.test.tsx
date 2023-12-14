import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "../../components/pages/term-deposit/forms/product-information";
import { renderWithProviders } from "../../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";

const fData = {
  productName: "",
  slogan: "",
  description: "",
  startDate: null,
  endDate: null,
  currency: "",
}
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));

describe("ProductInformation", () => {
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

    jest.spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ process: "continue" })
  });
  it('should render the form without errors', () => {
    // Test setup
    const { getByTestId } = renderWithProviders(<ProductInformation proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} />)

    // Assertion
    expect(getByTestId('product-name')).toBeInTheDocument();
    expect(getByTestId('investment-slogan')).toBeInTheDocument();
    expect(getByTestId('product-description')).toBeInTheDocument();
  });


  it("Changes values", () => {
    renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} />)
    const input = screen.getByTestId("product-name")
    act(() => {
      fireEvent.change(input, { target: { value: 'new name' } });
    })
    expect(input.value).toBe("new name");
  })
  
  it('should update character count for product name in real-time', () => {
    // Test setup
    const {getByTestId} = renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} />)
    const productNameInput = getByTestId('product-name');
    
    // Action
    fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
    screen.debug();
    // Assertion
    expect(productNameInput.value).toBe('Test Product');
    screen.debug();
    expect(getByTestId('product-name-char-count')).toHaveTextContent('38/50');
  });
  
  it('should display negative character count message for product name with more than 50 characters', () => {
    // Test setup
    
    const {getByTestId, getByText} = renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} />)
    const productNameInput = getByTestId('product-name');
    
    // Action
    act(() => {
      fireEvent.change(productNameInput, { target: { value: 'This is a very long product name that exceeds the character limit.... I believe It does, It should by now' } });
    })
    expect(getByTestId('product-name-char-count')).toHaveTextContent('-55/50');
  });
})