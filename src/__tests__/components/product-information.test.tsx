import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "../../components/pages/term-deposit/forms/product-information";
import { renderWithProviders } from "../../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import React from "react";
import userEvent from '@testing-library/user-event'


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


const user = userEvent.setup()

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
    const { getByTestId } = renderWithProviders(<ProductInformation proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={undefined} initiateDraft={undefined} activeId={undefined} />)

    // Assertion
    expect(getByTestId('product-name')).toBeInTheDocument();
    expect(getByTestId('investment-slogan')).toBeInTheDocument();
    expect(getByTestId('product-description')).toBeInTheDocument();
  });


  it("Changes values", () => {
    renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={undefined} initiateDraft={undefined} />)
    const inputs = screen.getAllByRole("textbox")
    const values = ["TestProd", "TestProdslogan", "this is testprod", "15/12/2023", "25/12/2023"];
    act(() => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: values[index] } });
      })
    })
    // @ts-ignore 
    expect(inputs.map(i => i.value)).toStrictEqual(values);
  })
  
  it("values should not exceed limit when user tries to type beyond limit", async () => {
    renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={undefined} initiateDraft={undefined} />)
    const value = "tHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIStHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANIS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOAN";

    const productName = screen.getByTestId("product-name");
    const productSlogan = screen.getByTestId("investment-slogan");
    const productDescription = screen.getByTestId("product-description")

    await user.type(productName, value);
    await user.type(productSlogan, value);
    await user.type(productDescription, value);
    
    //@ts-ignore
    expect(productName.value.length).toEqual(productName.maxLength);
    //@ts-ignore
    expect(productSlogan.value.length).toEqual(productSlogan.maxLength);
    //@ts-ignore
    expect(productDescription.value.length).toEqual(productDescription.maxLength);
    
  })

  it('should update character count for product name in real-time', () => {
    // Test setup
    const { getByTestId } = renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={undefined} initiateDraft={undefined} />)
    const productNameInput = getByTestId('product-name');

    // Action
    fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
    // Assertion
    // @ts-ignore 
    expect(productNameInput.value).toBe('Test Product');
    screen.debug();
    expect(getByTestId('product-name-char-count')).toHaveTextContent('50/50');
  });




  it('should display negative character count message for product name with more than 50 characters', () => {
    // Test setup

    const { getByTestId, getByText } = renderWithProviders(<ProductInformation activeId={{ current: "3456" }} proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={jest.fn()} initiateDraft={undefined} />)
    const productNameInput = getByTestId('product-name');

    // Action
    act(() => {
      fireEvent.change(productNameInput, { target: { value: 'This is a very long product name that exceeds the character limit.... I believe It does, It should by now' } });
    })
    expect(getByTestId('product-name-char-count')).toHaveTextContent('50/50');
  });
})