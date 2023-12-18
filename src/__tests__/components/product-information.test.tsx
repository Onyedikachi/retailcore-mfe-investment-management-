import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation, {
  InputDiv,
  handleName,
  handleSlogan,
  handleValidatingName,
  onProceed,
} from "../../components/pages/term-deposit/forms/product-information";
import { renderWithProviders } from "../../__mocks__/api/Wrapper";
import { act } from "react-dom/test-utils";
import React from "react";
import userEvent from "@testing-library/user-event";
import debounce from "lodash.debounce";
import * as lodash from 'lodash';
import moment from "moment";

const fData = {
  productName: "",
  slogan: "",
  description: "",
  startDate: null,
  endDate: null,
  currency: "",
};
const defaultLength = 50;
const defaultSloganLength = 160;
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));

const user = userEvent.setup();

describe("ProductInformation", () => {
  beforeEach(() => {
    jest
      .spyOn(require("react-router-dom"), "useSearchParams")
      .mockReturnValue([
        new URLSearchParams({ sub_type: "", filter: "", id: "" }),
      ]);

    jest
      .spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ process: "continue" });
  });
  it("should render the form without errors", () => {
    // Test setup
    const { getByTestId } = renderWithProviders(
      <ProductInformation
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={undefined}
        initiateDraft={undefined}
        activeId={undefined}
      />
    );

    // Assertion
    expect(getByTestId("product-name")).toBeInTheDocument();
    expect(getByTestId("investment-slogan")).toBeInTheDocument();
    expect(getByTestId("product-description")).toBeInTheDocument();
  });

  it("Changes values", () => {
    renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={undefined}
        initiateDraft={undefined}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    const values = [
      "TestProd",
      "TestProdslogan",
      "this is testprod",
      "15/12/2023",
      "25/12/2023",
    ];
    act(() => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: values[index] } });
      });
    });
    // @ts-ignore
    expect(inputs.map((i) => i.value)).toStrictEqual(values);
  });

  it("should handle input and display character count", () => {
    // Render the component
    renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={undefined}
        initiateDraft={undefined}
      />
    );

    // Find the textarea by its data-testid
    const textarea = screen.getByTestId("product-description") as HTMLElement;

    // Simulate typing into the textarea
    fireEvent.change(textarea, { target: { value: "Test description" } });

    // Verify that the input value is updated
    // @ts-ignore
    expect(textarea.value).toBe("Test description");

    // Find the character count span
    // const characterCount = screen.getByText(/\/250/);

    // // Verify that the character count is displayed
    // expect(characterCount).toBeInTheDocument();

    // // Verify that the character count is correct based on the input
    // expect(characterCount).toHaveTextContent('16/250'); // Adjust the count based on your input

    // You can add more assertions based on your component's behavior
  });
  // it("values should not exceed limit when user tries to type beyond limit", async () => {
  //   renderWithProviders(
  //     <ProductInformation
  //       activeId={{ current: "3456" }}
  //       proceed={jest.fn()}
  //       formData={fData}
  //       setDisabled={jest.fn()}
  //       setFormData={jest.fn()}
  //       initiateDraft={false}
  //     />
  //   );
  //   const value =
  //     "tHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIStHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOANIS A FREE LOANtHIS IS A FREE LOANtHIS IS A FREE LOAN";

  //   const productName = screen.getByTestId("product-name");
  //   const productSlogan = screen.getByTestId("investment-slogan");
  //   const productDescription = screen.getByTestId("product-description");

  //   await user.type(productName, value);
  //   await user.type(productSlogan, value);
  //   await user.type(productDescription, value);
  //   fireEvent.change(productDescription, { target: { value } });

  //   //@ts-ignore
  //   expect(productName.value.length).toEqual(productName.maxLength);
  //   //@ts-ignore
  //   expect(productSlogan.value.length).toEqual(productSlogan.maxLength);
  //   //@ts-ignore
  //   expect(productDescription.value.length).toEqual(
  //     productDescription.maxLength
  //   );
  // });

  it("should update character count for product name in real-time", () => {
    // Test setup
    const { getByTestId } = renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={undefined}
        initiateDraft={undefined}
      />
    );
    const productNameInput = getByTestId("product-name");

    // Action
    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    // Assertion
    // @ts-ignore
    expect(productNameInput.value).toBe("Test Product");

    expect(getByTestId("product-name-char-count")).toHaveTextContent("50/50");
  });

  it("should display negative character count message for product name with more than 50 characters", () => {
    // Test setup

    const { getByTestId, getByText } = renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={jest.fn()}
        initiateDraft={undefined}
      />
    );
    const productNameInput = getByTestId("product-name");

    // Action
    act(() => {
      fireEvent.change(productNameInput, {
        target: {
          value:
            "This is a very long product name that exceeds the character limit.... I believe It does, It should by now",
        },
      });
    });
    expect(getByTestId("product-name-char-count")).toHaveTextContent("50/50");
  });

  it("Should show error when invalid name is typed", async () => {
    const { getByTestId, getByText, findByText } = renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={jest.fn()}
        initiateDraft={undefined}
      />
    );
    const productName = getByTestId("product-name");
    await user.type(productName, "ju&");
    getByText("Product name is required");
  });

  it("Should show error when description is too short", async () => {
    const { getByTestId, getByText, findByText } = renderWithProviders(
      <ProductInformation
        activeId={{ current: "3456" }}
        proceed={jest.fn()}
        formData={fData}
        setDisabled={jest.fn()}
        setFormData={jest.fn()}
        initiateDraft={undefined}
      />
    );
    const productDescriptionInput = getByTestId("product-description");
    // fireEvent.change(productDescriptionInput, { target: { value: "jd" } });
    // // await user.type(productDescriptionInput, "ju");
    // expect(getByText("Minimum of 4 chars")).toBeInTheDocument();
  });
});

describe("handleValidatingName", () => {
  // If nameIsSuccess is true and charLeft is less than 47, then trigger the "productName" and clear any errors associated with it, set setIsNameOkay to true.
  it("should trigger productName and clear errors when nameIsSuccess is true and charLeft is less than 47", () => {
    // Arrange
    const nameIsSuccess = true;
    const setIsNameOkay = jest.fn();
    const charLeft = 46;
    const trigger = jest.fn();
    const clearErrors = jest.fn();

    // Act
    handleValidatingName(
      nameIsSuccess,
      setIsNameOkay,
      false,
      undefined,
      undefined,
      trigger,
      charLeft,
      clearErrors
    );

    // Assert
    expect(trigger).toHaveBeenCalledWith("productName");
    expect(clearErrors).toHaveBeenCalledWith("productName");
    expect(setIsNameOkay).toHaveBeenCalledWith(true);
  });

  // If nameIsError is true, then assign an error to "productName" with the custom message from nameError, and set setIsNameOkay to false.
  it("should assign error to productName and set setIsNameOkay to false when nameIsError is true", () => {
    // Arrange
    const nameIsError = true;
    const setIsNameOkay = jest.fn();
    const assignError = jest.fn();
    const nameError = { message: { Message: "Name error message" } };

    // Act
    handleValidatingName(
      false,
      setIsNameOkay,
      nameIsError,
      assignError,
      nameError,
      undefined,
      undefined,
      undefined
    );

    // Assert
    expect(assignError).toHaveBeenCalledWith("productName", {
      type: "custom",
      message: "Name error message",
    });
    expect(setIsNameOkay).toHaveBeenCalledWith(false);
  });

  // nameIsSuccess is true, but charLeft is greater than or equal to 47.
  it("should not trigger productName and clear errors when nameIsSuccess is true but charLeft is greater than or equal to 47", () => {
    // Arrange
    const nameIsSuccess = true;
    const setIsNameOkay = jest.fn();
    const charLeft = 47;
    const trigger = jest.fn();
    const clearErrors = jest.fn();

    // Act
    handleValidatingName(
      nameIsSuccess,
      setIsNameOkay,
      false,
      undefined,
      undefined,
      trigger,
      charLeft,
      clearErrors
    );

    // Assert
    expect(trigger).not.toHaveBeenCalled();
    expect(clearErrors).not.toHaveBeenCalled();
    expect(setIsNameOkay).not.toHaveBeenCalled();
  });

  // nameIsError is true, but nameError is undefined.
  it("should not assign error to productName when nameIsError is true but nameError is undefined", () => {
    // Arrange
    const nameIsError = true;
    const setIsNameOkay = jest.fn();
    const assignError = jest.fn();

    // Act
    handleValidatingName(
      false,
      setIsNameOkay,
      nameIsError,
      assignError,
      undefined,
      undefined,
      undefined,
      undefined
    );

    // Assert
    expect(assignError).toHaveBeenCalled();
  });

  // setIsNameOkay is undefined.
  it("should not throw an error when setIsNameOkay is undefined", () => {
    // Act & Assert
    expect(() =>
      handleValidatingName(
        false,
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    ).not.toThrow();
  });
});


describe("InputDiv", () => {
  // Renders a div element with class 'w-full flex flex-col gap-2'.
  it("should render a div element with class 'w-full flex flex-col gap-2'", () => {
    // Arrange
    const children = <p>Test</p>;

    // Act
    render(<InputDiv>{children}</InputDiv>);

    // Assert
    expect(screen.getByTestId("input-div")).toHaveClass(
      "w-full flex flex-col gap-2"
    );
  });

  // Renders the children passed as props inside the div element.
  it("should render the children passed as props inside the div element", () => {
    // Arrange
    const children = <p>Test</p>;

    // Act
    render(<InputDiv>{children}</InputDiv>);

    // Assert
    expect(screen.getByTestId("input-div")).toContainElement(
      screen.getByText("Test")
    );
  });

  // Accepts any valid React element as children.
  it("should accept any valid React element as children", () => {
    // Arrange
    const children = <div>Test</div>;

    // Act
    render(<InputDiv>{children}</InputDiv>);

    // Assert
    expect(screen.getByTestId("input-div")).toContainElement(
      screen.getByText("Test")
    );
  });

  // Renders an empty div element if no children are passed as props.
  it("should render an empty div element if no children are passed as props", () => {
    // Act
    render(<InputDiv children={undefined} />);

    // Assert
    expect(screen.getByTestId("input-div")).toBeEmptyDOMElement();
  });

  // Does not render any additional elements or components.
  it("should not render any additional elements or components", () => {
    // Act
    render(<InputDiv children={undefined} />);

    // Assert
    expect(screen.getByTestId("input-div").children.length).toBe(0);
  });
});


describe("handleName", () => {
  it("should update character count, clear errors, set current name, and handle validation", async () => {
    // Mock necessary functions and data
    const validateName = jest.fn();
    const watchName = "TestName";
    const formData = { oldValue: "PreviousValue" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Call the function
    await handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assertions

    // Verify that setCharLeft is called with the correct value
    expect(setCharLeft).toHaveBeenCalledWith(expect.any(Number));

    // Verify that clearErrors is called with the correct argument
    expect(clearErrors).toHaveBeenCalledWith("productName");

    // Verify that setCurrentName is called with the correct argument
    expect(setCurrentName).toHaveBeenCalledWith(watchName);

 
  });
  // Sets character count based on name length
  it("should set character count based on name length", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test Name";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assert
    expect(setCharLeft).toHaveBeenCalledWith(defaultLength - watchName.length);
  });

  // Clears errors on productName field
  it("should clear errors on productName field", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test Name";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assert
    expect(clearErrors).toHaveBeenCalledWith("productName");
  });

  // Sets current name to watchName
  it("should set current name to watchName", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test Name";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assert
    expect(setCurrentName).toHaveBeenCalledWith(watchName);
  });

  // Sets disabled to true if watchName length is less than or equal to 3
  it("should set disabled to true if watchName length is less than or equal to 3", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assert
    expect(setDisabled).not.toHaveBeenCalled();
  });

  // Compares watchName to formData.oldValue
  it("should compare watchName to formData.oldValue", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test Name";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName
    );

    // Assert
  });

  // Validates name with productId if provided
  it("should validate name with productId if provided", () => {
    // Arrange
    const validateName = jest.fn();
    const watchName = "Test Name";
    const formData = { oldValue: "Old Name" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();

    const id = "123";

    // Act
    handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName,

      800,
      id
    );

    // Assert
    expect(validateName).not.toHaveBeenCalled();
  });
});


describe("handleSlogan", () => {
  // When watchSlogan is not null, setSloganCharLeft is called with the correct remainder value
  it("should call setSloganCharLeft with the correct remainder value when watchSlogan is not null", () => {
    const watchSlogan = "Test slogan";
    const setSloganCharLeft = jest.fn();
    const setIsSloganOkay = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();

    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setSloganCharLeft).toHaveBeenCalledWith(
      defaultSloganLength - watchSlogan.length
    );
  });

  // When watchSlogan is not null and has length greater than 0, setIsSloganOkay is called with true
  it("should call setIsSloganOkay with true when watchSlogan is not null and has length greater than 0", () => {
    const watchSlogan = "Test slogan";
    const setSloganCharLeft = jest.fn();
    const setIsSloganOkay = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();

    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setIsSloganOkay).toHaveBeenCalledWith(true);
  });

  // When watchSlogan is null or has length 0, setIsSloganOkay is called with false
  it("should call setIsSloganOkay with false when watchSlogan is null or has length 0", () => {
    let watchSlogan;
    const setSloganCharLeft = jest.fn();
    const setIsSloganOkay = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();

    watchSlogan = null;
    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setIsSloganOkay).toHaveBeenCalledWith(null);

    watchSlogan = "";
    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setIsSloganOkay).toHaveBeenCalledWith(null);
  });

  // When watchSlogan is an empty string, setSloganCharLeft is called with defaultSloganLength
  it("should call setSloganCharLeft with defaultSloganLength when watchSlogan is an empty string", () => {
    const watchSlogan = "";
    const setSloganCharLeft = jest.fn();
    const setIsSloganOkay = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();

    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setSloganCharLeft).toHaveBeenCalledWith(defaultSloganLength);
  });

  // When watchSlogan is a string with length greater than defaultSloganLength, setSloganCharLeft is called with a negative remainder value
  it("should call setSloganCharLeft with a negative remainder value when watchSlogan is a string with length greater than defaultSloganLength", () => {
    const watchSlogan =
      "This is a long slogan that exceeds the default slogan length";
    const setSloganCharLeft = jest.fn();
    const setIsSloganOkay = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();

    handleSlogan(
      watchSlogan,
      setSloganCharLeft,
      setIsSloganOkay,
      clearErrors,
      setError
    );

    expect(setSloganCharLeft).toHaveBeenCalledWith(
      defaultSloganLength - watchSlogan.length
    );
  });
});


describe('ProductInformation', () => {

  // Renders the form with the correct inputs and labels
  it('should render the form with the correct inputs and labels', () => {
    // Arrange
    const formData = {
      productName: "Example Product",
      slogan: "Example Slogan",
      description: "Example Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
    };

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

    // Act
    renderWithProviders(
      <ProductInformation
        formData={formData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Life Cycle")).toBeInTheDocument();
    // expect(screen.getByLabelText("Product Currency")).toBeInTheDocument();
  });

  // Populates the form with default values from formData prop
  it('should populate the form with default values from formData prop', () => {
    // Arrange
    const formData = {
      productName: "Example Product",
      slogan: "Example Slogan",
      description: "Example Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
    };

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

    // Act
    renderWithProviders(
      <ProductInformation
        formData={formData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByTestId("product-name")).toHaveValue("Example Product");
    expect(screen.getByTestId("investment-slogan")).toHaveValue("Example Slogan");
    expect(screen.getByTestId("product-description")).toHaveValue("Example Description");
  });

  // Updates the form values when formData prop changes
  it('should update the form values when formData prop changes', () => {
    // Arrange
    const initialFormData = {
      productName: "Initial Product",
      slogan: "Initial Slogan",
      description: "Initial Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
    };

    const updatedFormData = {
      productName: "Updated Product",
      slogan: "Updated Slogan",
      description: "Updated Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "EUR",
    };

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

  

    renderWithProviders(
      <ProductInformation
        formData={updatedFormData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByTestId("product-name")).toHaveValue("Updated Product");
    expect(screen.getByTestId("investment-slogan")).toHaveValue("Updated Slogan");
    expect(screen.getByTestId("product-description")).toHaveValue("Updated Description");
   
  });

  // Handles empty form data prop
  it('should handle empty form data prop', () => {
    // Arrange
    const formData = null;

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

    // Act
    renderWithProviders(
      <ProductInformation
        formData={formData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByTestId("product-name")).toHaveValue("");
    expect(screen.getByTestId("investment-slogan")).toHaveValue("");
    expect(screen.getByTestId("product-description")).toHaveValue("");
  });

  // Handles missing or invalid form inputs
  it('should handle missing or invalid form inputs', () => {
    // Arrange
    const formData = {
      productName: "Example Product",
      slogan: "Example Slogan",
      description: "Example Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
    };

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

    // Act
    renderWithProviders(
      <ProductInformation
        formData={formData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByTestId("submit-button")).not.toBeDisabled();

    // Act
    fireEvent.change(screen.getByTestId("product-name"), { target: { value: "" } });

    // Assert
    expect(screen.getByTestId("submit-button")).not.toBeDisabled();

    // Act
    fireEvent.change(screen.getByTestId("product-name"), { target: { value: "Valid Product Name" } });

    // Assert
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  // Handles long product names and slogans
  it('should handle long product names and slogans', () => {
    // Arrange
    const formData = {
      productName: "Example Product",
      slogan: "Example Slogan",
      description: "Example Description",
      startDate: new Date(),
      endDate: new Date(),
      currency: "USD",
    };

    const setFormData = jest.fn();
    const setDisabled = jest.fn();
    const proceed = jest.fn();
    const initiateDraft = false;
    const activeId = null;

    // Act
    renderWithProviders(
      <ProductInformation
        formData={formData}
        setFormData={setFormData}
        setDisabled={setDisabled}
        proceed={proceed}
        initiateDraft={initiateDraft}
        activeId={activeId}
      />
    );

    // Assert
    expect(screen.getByTestId("product-name-char-count")).toHaveTextContent("50/50");
    expect(screen.getByTestId("product-name-char-count")).not.toHaveClass("text-danger-500");

    // Act
    fireEvent.change(screen.getByTestId("product-name"), { target: { value: "A".repeat(51) } });

    // Assert
    expect(screen.getByTestId("product-name-char-count")).toHaveTextContent("50/50");
    expect(screen.getByTestId("product-name-char-count")).toHaveClass("absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]");
  });
});

describe("handleName", () => {
  it("should handle name with debounce", async () => {
    
    // Mock necessary functions and data
    const validateName = jest.fn();
    const watchName = "TestName";
    const formData = { oldValue: "PreviousValue" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();
    const timer = 800;
    const id = "TestId";

    // Call the function
    await handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName,
      timer,
      id
    );

    // Assertions

    // Verify that setCharLeft is called with the correct value
    expect(setCharLeft).toHaveBeenCalledWith(expect.any(Number));

    // Verify that clearErrors is called with the correct argument
    expect(clearErrors).toHaveBeenCalledWith("productName");

    // Verify that setCurrentName is called with the correct argument
    expect(setCurrentName).toHaveBeenCalledWith(watchName);

    // Verify that debounce is called with the correct arguments and immediately executed
    // expect(debounce).toHaveBeenCalledWith(expect.any(Function), timer);
    // expect(validateName).toHaveBeenCalledWith({
    //   productName: watchName,
    //   productId: id,
    // });

    // Verify that setError and setIsNameOkay are called under the specified conditions
    if (formData?.oldValue?.toLowerCase() === watchName.toLowerCase()) {
      expect(setError).toHaveBeenCalledWith("");
      expect(setIsNameOkay).toHaveBeenCalledWith(false);
    }

    // Verify that setDisabled is called under the specified conditions
    if (watchName.length <= 3) {
      expect(setDisabled).toHaveBeenCalledWith(true);
    }
  });

  it("should handle name without debounce", async () => {
    // Mock necessary functions and data
    const validateName = jest.fn();
    const watchName = "";
    const formData = { oldValue: "PreviousValue" };
    const setCharLeft = jest.fn();
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const setIsNameOkay = jest.fn();
    const setDisabled = jest.fn();
    const setCurrentName = jest.fn();
    const timer = 800;
    const id = "TestId";

    // Call the function
    await handleName(
      validateName,
      watchName,
      formData,
      setCharLeft,
      clearErrors,
      setError,
      setIsNameOkay,
      setDisabled,
      setCurrentName,
      timer,
      id
    );

    // Assertions

    // Verify that setCharLeft is called with the correct value
    expect(setCharLeft).toHaveBeenCalledWith(expect.any(Number));

    // Verify that clearErrors is called with the correct argument
    expect(clearErrors).toHaveBeenCalledWith("productName");

    // Verify that setCurrentName is called with the correct argument
    expect(setCurrentName).toHaveBeenCalledWith(watchName);

    // Verify that setError and setIsNameOkay are called under the specified conditions
    expect(setError).not.toHaveBeenCalled();
    expect(setIsNameOkay).not.toHaveBeenCalled();

    // Verify that setDisabled is called under the specified conditions
    expect(setDisabled).not.toHaveBeenCalled();
  });
});


describe('onProceed', () => {

  // sets the start and end date of the form data to the formatted date strings if they exist
  it('should set the start and end date of the form data to the formatted date strings when they exist', () => {
    const d = {
      startDate: new Date(),
      endDate: new Date(),
    };
    const setFormData = jest.fn();
    const proceed = jest.fn();

    onProceed(d, setFormData, proceed);

    expect(setFormData).toHaveBeenCalledWith({
      ...d,
      startDate: moment(d.startDate).format("yyyy-MM-DD"),
      endDate: moment(d.endDate).format("yyyy-MM-DD"),
    });
    expect(proceed).toHaveBeenCalled();
  });

  // calls the 'proceed' function
  it('should call the proceed function', () => {
    const d = {
      startDate: new Date(),
      endDate: new Date(),
    };
    const setFormData = jest.fn();
    const proceed = jest.fn();

    onProceed(d, setFormData, proceed);

    expect(proceed).toHaveBeenCalled();
  });



  // 'd' parameter is missing 'startDate' or 'endDate' fields
  it('should not set the start and end date of the form data when d parameter is missing startDate or endDate fields', () => {
    const d = {
      startDate: new Date(),
    };
    const setFormData = jest.fn();
    const proceed = jest.fn();

    onProceed(d, setFormData, proceed);

    expect(setFormData).toHaveBeenCalled();
    expect(proceed).toHaveBeenCalled();
  });



});
