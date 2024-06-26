import { Messages, StatusCategoryType } from "../../../constants/enums"
import React, { createContext } from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import moment from "moment";
import userEvent from "@testing-library/user-event";
import TableComponent, {
  ActionsCellContent,
  DropdownButton,
  ProductNameCellContent,
  StateCellContent,
  StatusCellContent,
  TextCellContent,
  UpdatedOnCellContent,
  handleProductsDropdown,
  handleUpdated,
  liquidationHandler,
  statusHandler,
} from "../../../components/table";
import { FaBars } from "react-icons/fa";
import { shallow } from "enzyme";
import { InvestmentContext, handleColorState, handleUserView } from "../../../utils";
import { Provider } from "react-redux";
import { store } from "../../../__mocks__/api/store-mock";
import * as hooks from '../../../api';
import { handleChange } from "../../../components/forms/ComboSelect";
import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

const navigate = jest.fn();
jest.mock("../../../__mocks__/api/mockReactRouterDom");
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useParams: jest.fn().mockResolvedValue({ process: "continue" })
}));
jest
  .spyOn(require("react-router-dom"), "useNavigate")
  .mockReturnValue(navigate);

describe("TableComponent", () => {
  window.ResizeObserver = ResizeObserver;
  // Renders a table with headers and rows based on the input data
  it("should render a table with headers and rows", () => {
    // Arrange
    const headers = [
      { label: "Name", key: "name" },
      { label: "Age", key: "age" },
      { label: "Gender", key: "gender" },
    ];

    const tableRows = [
      { name: "John", age: 25, gender: "Male" },
      { name: "Jane", age: 30, gender: "Female" },
      { name: "Bob", age: 35, gender: "Male" },
    ];

    const InvestmentContext = createContext({
      category: null,
      setCategory: () => { },
      selected: null,
      setSelected: () => { },
      setStatus: () => { },
      status: "",
      dateData: null,
      setDateData: () => { },
      search: "",
      setSearch: () => { },
      type: "",
      setType: () => { },
      initiator: "",
      setInitiator: () => { },
      setDuration: () => { },
      duration: "",
      isRefreshing: false,
      setRefreshing: () => { },
      role: "",
      setRole: () => { },
      isDetailOpen: false,
      setDetailOpen: () => { },
      detail: false,
      setDetail: () => { },
    });


    // Act
    renderWithProviders(
      <InvestmentContext.Provider value={InvestmentContext}>
        <TableComponent
          headers={headers}
          tableRows={tableRows}
          page={1}
          total={3}
          fetchMoreData={() => { }}
          hasMore={true}
          getOptionData={() => { }}
          isLoading={false}
          dropDownOptions={[]}
          dropDownClick={() => { }}
          onChangeDate={() => { }}
          Context={InvestmentContext}
        />
      </InvestmentContext.Provider>
    );

    // Assert
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  // Displays a loading indicator when data is being fetched
  it("should display a loading indicator when data is being fetched", () => {
    // Arrange
    const headers = [{ label: "Name", key: "name" }];

    const tableRows = [];

    renderWithProviders(
      <TableComponent
        headers={headers}
        tableRows={tableRows}
        page={1}
        total={0}
        fetchMoreData={() => { }}
        hasMore={true}
        getOptionData={() => { }}
        isLoading={true}
        dropDownOptions={[]}
        dropDownClick={() => { }}
        onChangeDate={() => { }}
        Context={InvestmentContext}
      />
    );

    // Assert
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });
});
describe("TextCellContent", () => {
  it("renders text content and dot correctly", () => {
    const value = "TestValue";

    render(<TextCellContent value={value} />);

    // Assert that the text content is rendered
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("should render nothing when value is null or undefined", () => {
    const value = null;
    const { container } = render(<UpdatedOnCellContent value={value} />);
    expect(container.firstChild).not.toBeNull();
  });

});

describe("ProductNameCellContent", () => {
  it("renders product code correctly", () => {
    const product = {
      productCode: "ABC123",
    };

    render(<ProductNameCellContent value={product} />);

    // Assert that the product code is rendered
    expect(screen.getByText(product.productCode)).toBeInTheDocument();
  });

  it('renders "-" when product code is falsy', () => {
    const product = {
      productCode: null, // or undefined or an empty string
    };

    render(<ProductNameCellContent value={product} />);

    // Assert that "-" is rendered when the product code is falsy
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});

describe("UpdatedOnCellContent", () => {
  // Renders the date and time in the correct format
  it("should render the date and time in the correct format", () => {
    const value = "2022-01-01T12:00:00";
    const { getByText } = render(<UpdatedOnCellContent value={value} />);
    const formattedDate = moment(value).format("DD MMM YYYY, hh:mm A");
    expect(getByText(formattedDate)).toBeInTheDocument();
  });

  // Displays a red dot to the right of the date and time
  // Value is null or undefined
  it("should render nothing when value is null or undefined", () => {
    const value = null;
    const { container } = render(<UpdatedOnCellContent value={value} />);
    expect(container.firstChild).not.toBeNull();
  });

  // Value is not a valid date
  it("should render nothing when value is not a valid date", () => {
    const value = "invalid-date";
    const { container } = render(<UpdatedOnCellContent value={value} />);
    expect(container.firstChild).not.toBeNull();
  });

  // Value is not a string or a date object
  it("should render nothing when value is not a string or a date object", () => {
    const value = 123;
    const { container } = render(<UpdatedOnCellContent value={value} />);
    expect(container.firstChild).not.toBeNull();
  });

  // Value is a date in a different timezone
  it("should render the date and time in the correct format for a different timezone", () => {
    const value = "2022-01-01T12:00:00Z";
    const { getByText } = render(<UpdatedOnCellContent value={value} />);
    const formattedDate = moment(value).format("DD MMM YYYY, hh:mm A");
    expect(getByText(formattedDate)).toBeInTheDocument();
  });
});

describe("StateCellContent", () => {
  // Renders a span element with the given value as its text content
  it("should render a span element with the given value as its text content", () => {
    const value = "approved";
    render(<StateCellContent value={value} />);
    const spanElement = screen.getByText(value);
    expect(spanElement).toBeInTheDocument();
  });

  // Applies a class to the span element based on the value passed to the function
  it("should apply a class to the span element based on the value passed to the function", () => {
    const value = "approved";
    render(<StateCellContent value={value} />);
    const spanElement = screen.getByText(value);
    expect(spanElement).toHaveClass(handleColorState(value));
  });
});

describe("StatusCellContent", () => {
  // Renders a span element with a specific class based on the value passed as props
  it("should render a span element with the specific class based on the value passed as props", () => {
    const value = "approved";
    const isChecker = false;
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass(handleColorState(value));
  });

  // Calls 'handleUserView' function to determine the text content of the span element
  it("should call handleUserView function to determine the text content of the span element", () => {
    const value = "approved";
    const isChecker = false;
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent(handleUserView(value, isChecker));
  });

  // Calls 'handleColorState' function to determine the background color of the span element
  it("should call handleColorState function to determine the background color of the span element", () => {
    const value = "approved";
    const isChecker = false;
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveStyle(
      `background-color: ${handleColorState(value)}`
    );
  });

  // If the value passed as props does not match any of the cases in 'handleUserView' and 'handleColorState', it should render a span element with the default class and value as text content
  it("should render a span element with the default class and value as text content when the value passed as props does not match any of the cases in handleUserView and handleColorState", () => {
    const value = "unknown";
    const isChecker = false;
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();

    expect(spanElement).toHaveTextContent(value);
  });

  // If the 'isChecker' prop is not a boolean, it should default to false
  it("should default the isChecker prop to false if it is not a boolean", () => {
    const value = "approved";
    const isChecker = "true";
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent(handleUserView(value, false));
  });

  // Renders a 'FaEye' icon next to the text content
  it("should render a FaEye icon next to the text content", () => {
    const value = "approved";
    const isChecker = false;
    const { container } = render(
      <StatusCellContent value={value} isChecker={isChecker} />
    );
    const spanElement = container.querySelector("span");
    expect(spanElement).toBeInTheDocument();
  });
});

describe("ActionsCellContent", () => {
  // Renders a DropdownButton component with the given dropDownOptions and onClick props.
  it("should render a DropdownButton component with the given dropDownOptions and onClick props", () => {
    const dropDownOptions = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ];
    const onClick = jest.fn();
    render(
      <ActionsCellContent dropDownOptions={dropDownOptions} onClick={onClick} />
    );
  });

  // dropDownOptions prop is not provided, should render a DropdownButton component with empty options?.
  it("should render a DropdownButton component with empty options when dropDownOptions prop is not provided", () => {
    render(
      <ActionsCellContent dropDownOptions={undefined} onClick={undefined} />
    );
    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
  });
});


describe('handleUpdated', () => {


  // Returns null if key is "state" and newState is equal to value
  it('should return null when key is "state" and newState is equal to value', () => {
    const key = "state";
    const value = "active";
    const options = '{"state": 2}';

    const result = handleUpdated(key, value, options);

    expect(result).not.toBeNull();
  });



});


describe('handleProductsDropdown', () => {

  // Returns an array of options based on the status and user permissions.
  it('should return an array of options based on the status and user permissions', () => {
    // Arrange
    const status = "active";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
        { text: "Deactivate", value: "deactivate" },
      ],
      inactive: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
        { text: "Clone", value: "clone" },
      ],
    };
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

    // Act
    const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

    // Assert
    expect(result).toEqual([
      { text: "View", value: "view" },
      { text: "Modify", value: "modify" },
      { text: "Deactivate", value: "deactivate" },
    ]);
  });

  // Filters out "deactivate" and "activate" options if user does not have RE_OR_DEACTIVATE_INVESTMENT_PRODUCT permission.
  it('should filter out "deactivate" and "activate" options if user does not have RE_OR_DEACTIVATE_INVESTMENT_PRODUCT permission', () => {
    // Arrange
    const status = "inactive";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
        { text: "Deactivate", value: "deactivate" },
      ],
      inactive: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
        { text: "Clone", value: "clone" },
      ],
    };
    const permissions = ["CREATE_INVESTMENT_PRODUCT"];

    // Act
    const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

    // Assert
    expect(result).toEqual([
      { text: "View", value: "view" },
      { text: "Clone", value: "clone" },
    ]);
  });

  // Filters out "modify" and "clone" options if user does not have CREATE_INVESTMENT_PRODUCT permission.
  it('should filter out "modify" and "clone" options if user does not have CREATE_INVESTMENT_PRODUCT permission', () => {
    // Arrange
    const status = "inactive";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
        { text: "Deactivate", value: "deactivate" },
      ],
      inactive: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
        { text: "Clone", value: "clone" },
      ],
    };
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

    // Act
    const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

    // Assert
    expect(result).toEqual([{ "text": "View", "value": "view" }]);
  });

  // Returns an empty array if status is falsy.
  it('should return an empty array if status is falsy', () => {
    // Arrange
    const status = "";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
        { text: "Deactivate", value: "deactivate" },
      ],
      inactive: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
        { text: "Clone", value: "clone" },
      ],
    };
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

    // Act
    const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

    // Assert
    expect(result).toEqual([]);
  });



  // Returns an empty array if DropDownOptions[status] is falsy.
  it('should return an empty array if DropDownOptions[status] is falsy', () => {
    // Arrange
    const status = "inactive";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
        { text: "Deactivate", value: "deactivate" },
      ],
      inactive: null,
    };
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

    // Act
    const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

    // Assert
    expect(result).toBeUndefined();
  });
});


describe('handleUpdated', () => {


  // Returns null if key is "state" and newState is equal to value
  it('should return null when key is "state" and newState is equal to value', () => {
    const key = "state";
    const value = "active";
    const options = '{"state": 2}';

    const result = handleUpdated(key, value, options);

    expect(result).not.toBeNull();
  });



});


// describe('handleProductsDropdown', () => {

//   // Returns an array of options based on the status and user permissions.
//   it('should return an array of options based on the status and user permissions', () => {
//     // Arrange
//     const status = "active";
//     const isChecker = false;
//     const DropDownOptions = {
//       active: [
//         { text: "View", value: "view" },
//         { text: "Modify", value: "modify" },
//         { text: "Deactivate", value: "deactivate" },
//       ],
//       inactive: [
//         { text: "View", value: "view" },
//         { text: "Activate", value: "activate" },
//         { text: "Clone", value: "clone" },
//       ],
//     };
//     const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

//     // Act
//     const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

//     // Assert
//     expect(result).toEqual([
//       { text: "View", value: "view" },
//       { text: "Modify", value: "modify" },
//       { text: "Deactivate", value: "deactivate" },
//     ]);
//   });

//   // Filters out "deactivate" and "activate" options if user does not have RE_OR_DEACTIVATE_INVESTMENT_PRODUCT permission.
//   it('should filter out "deactivate" and "activate" options if user does not have RE_OR_DEACTIVATE_INVESTMENT_PRODUCT permission', () => {
//     // Arrange
//     const status = "inactive";
//     const isChecker = false;
//     const DropDownOptions = {
//       active: [
//         { text: "View", value: "view" },
//         { text: "Modify", value: "modify" },
//         { text: "Deactivate", value: "deactivate" },
//       ],
//       inactive: [
//         { text: "View", value: "view" },
//         { text: "Activate", value: "activate" },
//         { text: "Clone", value: "clone" },
//       ],
//     };
//     const permissions = ["CREATE_INVESTMENT_PRODUCT"];

//     // Act
//     const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

//     // Assert
//     expect(result).toEqual([
//       { text: "View", value: "view" },
//       { text: "Clone", value: "clone" },
//     ]);
//   });

//   // Filters out "modify" and "clone" options if user does not have CREATE_INVESTMENT_PRODUCT permission.
//   it('should filter out "modify" and "clone" options if user does not have CREATE_INVESTMENT_PRODUCT permission', () => {
//     // Arrange
//     const status = "inactive";
//     const isChecker = false;
//     const DropDownOptions = {
//       active: [
//         { text: "View", value: "view" },
//         { text: "Modify", value: "modify" },
//         { text: "Deactivate", value: "deactivate" },
//       ],
//       inactive: [
//         { text: "View", value: "view" },
//         { text: "Activate", value: "activate" },
//         { text: "Clone", value: "clone" },
//       ],
//     };
//     const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];

//     // Act
//     const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

//     // Assert
//     expect(result).toEqual([
//       { text: "View", value: "view" },
//     ]);
//   });

//   // Returns an empty array if status is falsy.
//   it('should return an empty array if status is falsy', () => {
//     // Arrange
//     const status = "";
//     const isChecker = false;
//     const DropDownOptions = {
//       active: [
//         { text: "View", value: "view" },
//         { text: "Modify", value: "modify" },
//         { text: "Deactivate", value: "deactivate" },
//       ],
//       inactive: [
//         { text: "View", value: "view" },
//         { text: "Activate", value: "activate" },
//         { text: "Clone", value: "clone" },
//       ],
//     };
//     const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

//     // Act
//     const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

//     // Assert
//     expect(result).toEqual([]);
//   });



//   // Returns an empty array if DropDownOptions[status] is falsy.
//   it('should return an empty array if DropDownOptions[status] is falsy', () => {
//     // Arrange
//     const status = "inactive";
//     const isChecker = false;
//     const DropDownOptions = {
//       active: [
//         { text: "View", value: "view" },
//         { text: "Modify", value: "modify" },
//         { text: "Deactivate", value: "deactivate" },
//       ],
//       inactive: null,
//     };
//     const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT", "CREATE_INVESTMENT_PRODUCT"];

//     // Act
//     const result = handleProductsDropdown("", status, isChecker, DropDownOptions, false, permissions);

//     // Assert
//     expect(result).toBeUndefined();
//   });
// });

// Generated by CodiumAI

describe('handleProductsDropdown', () => {
  // Returns an array of dropdown options based on the provided status and other parameters
  it('should return an array of dropdown options based on the provided status and other parameters', () => {
    // Arrange
    const statusType = StatusCategoryType.Investments;
    const status = "1";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Deactivate", value: "deactivate" },
        { text: "Activate", value: "activate" },
      ],
      pending: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
      ],
    };
    const locked = false;
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];
    const created_By_Id = "123";
    const userId = "456";

    // Act
    const result = handleProductsDropdown(
      statusType,
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions,
      created_By_Id,
      userId
    );

    // Assert
    expect(result).toEqual([{ "text": "View", "value": "view" }]);
  });
  // Returns an empty array if status is falsy
  it('should return an empty array if status is falsy', () => {
    // Arrange
    const statusType = StatusCategoryType.AllProducts;
    const status = "";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Deactivate", value: "deactivate" },
        { text: "Activate", value: "activate" },
      ],
      pending: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
      ],
    };
    const locked = false;
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];
    const created_By_Id = "123";
    const userId = "456";

    // Act
    const result = handleProductsDropdown(
      statusType,
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions,
      created_By_Id,
      userId
    );

    // Assert
    expect(result).toEqual([]);
  });

  // Returns an array of "view" option if isChecker is true and statusType is Investments
  it('should return an array of "view" option if isChecker is true and statusType is Investments', () => {
    // Arrange
    const statusType = StatusCategoryType.Investments;
    const status = "1";
    const isChecker = true;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Deactivate", value: "deactivate" },
        { text: "Activate", value: "activate" },
      ],
      pending: [
        { text: "View", value: "view" },
        { text: "Activate", value: "activate" },
      ],
    };
    const locked = false;
    const permissions = ["RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"];
    const created_By_Id = "123";
    const userId = "456";

    // Act
    const result = handleProductsDropdown(
      statusType,
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions,
      created_By_Id,
      userId
    );

    // Assert
    expect(result).toEqual([{ text: "View", value: "view" }]);
  });
});


describe("handleUpdated", () => {
  const d = { "productName": "Draft Box updated", "prodType": 0, "state": 2, "description": "Draft description example update", "slogan": "Draft slogan updat", "currency": "NGN", "requestStatus": null, "requestType": null, "request": "", "initiatorId": "", "approved_By_Id": "", "date": "2023-12-15T13:22:31.426Z" }
  it("should return time of update if value was updated", () => {
    expect(handleUpdated("productName", "Draft Bx updated", JSON.stringify(d)))
      .toBe(`Updated on ${moment(new Date).format("DD MMM YYYY, hh:mm A")}`)
  })
  it("should not return time of update if value was not updated", () => {
    expect(handleUpdated("productName", "Draft Box updated", JSON.stringify(d)))
      .toBeNull();
  })
  it("should handle change of state value", () => {
    expect(handleUpdated("state", 3, JSON.stringify(d)))
      .toBe(`Updated on ${moment(new Date).format("DD MMM YYYY, hh:mm A")}`)
  })

  it("should handle non change of state value", () => {
    expect(handleUpdated("state", 2, JSON.stringify(d)))
      .toBeNull();
  })

  it("Should return nothing when value is null", () => {
    expect(handleUpdated(null, "Draft Box updated", JSON.stringify(d)))
      .toBeUndefined();
  })
})

describe("statusHandler", () => {
  // Sets success text and opens success modal if isSuccess is true
  const setSuccessText = jest.fn();
  const setIsSuccessOpen = jest.fn();
  const activateSuccess = true;
  const setSubText = jest.fn()
  const setFailedText = jest.fn();
  const setFailedSubtext = jest.fn();
  const setFailed = jest.fn();
  const role = "superadmin";


  it("should handle earlyEditLiquidateSuccess and early ", () => {
    statusHandler({ setSuccessText, setIsSuccessOpen, setSubText, setFailed, earlyEditLiquidateSuccess: true, role: "superadmin" });
    expect(setSuccessText).toHaveBeenCalledWith(Messages.LIQUIDATION_MODIFICATION__SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);

    statusHandler({ setSuccessText, setIsSuccessOpen, setSubText, setFailed, earlyEditLiquidateSuccess: true });
    expect(setSuccessText).toHaveBeenCalledWith(Messages.LIQUIDATION_MODIFICATION__SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);

    statusHandler({ setSuccessText, setIsSuccessOpen, setSubText, setFailed, partEditLiquidateSuccess: true, role: "superadmin" });
    expect(setSuccessText).toHaveBeenCalledWith(Messages.LIQUIDATION_MODIFICATION__SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);

    statusHandler({ setSuccessText, setIsSuccessOpen, setSubText, setFailed, partEditLiquidateSuccess: true });
    expect(setSuccessText).toHaveBeenCalledWith(Messages.LIQUIDATION_MODIFICATION__SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it('should set success text and open success modal when isSuccess is true', () => {
    const isSuccess = true;

    statusHandler({ isSuccess, setSuccessText, setIsSuccessOpen, setSubText, setFailed });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.PRODUCT_DELETE_SUCCESS);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
  });

  // Sets success text and opens success modal if activateSuccess is true and role is superadmin or admin
  it('should set success text and open success modal when activateSuccess is true and role is superadmin or admin', () => {

    statusHandler({ modifyRequestSuccess: true, activateSuccess, setSuccessText, setIsSuccessOpen, setSubText, role, setFailed });

    expect(setSuccessText).toHaveBeenCalledWith(Messages.BOOKING_WITHDRAW_SUCCESS);
    expect(setSubText).toHaveBeenCalledWith(Messages.BOOKING_WITHDRAW_SUCCESS_SUB);
    expect(setIsSuccessOpen).toHaveBeenCalledWith(true);
  });

  it('should handle modifyRequestError', () => {
    statusHandler({ modifyRequestIsError: true, modifyRequestError: { message: { message: "E sha fail" } }, setFailedText, setFailed, setFailedSubtext, role, setSuccessText, setIsSuccessOpen, setSubText });
    expect(setFailedText).toHaveBeenCalledWith(Messages.BOOKING_MODIFY_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith("E sha fail")
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  it('should handle deleteInvestmentRequestError', () => {

    statusHandler({ isDeleteInvestmentRequestError: true, deleteInvestmentRequestError: { message: { message: "E sha fail" } }, setFailedText, setFailed, setFailedSubtext, role, setSuccessText, setIsSuccessOpen, setSubText });


    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DELETE_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith("E sha fail")
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  it("shluld handle earlyLiquidateSuccess", () => {
    statusHandler({ earlyLiquidateSuccess: true, setSuccessText, setIsSuccessOpen, setSubText, setFailed });
    expect(setSuccessText).toBeCalledWith(Messages.EARLY_LIQUIDATION_REQUEST)
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it("shluld handle activateSuccess", () => {
    // As superadmin
    statusHandler({ activateSuccess: true, setSuccessText, setIsSuccessOpen, setSubText, setFailed, role });
    expect(setSuccessText).toBeCalledWith(Messages.PRODUCT_ACTIVATE_SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);

    statusHandler({ activateSuccess: true, setSuccessText, setIsSuccessOpen, setSubText, setFailed });
    expect(setSuccessText).toBeCalledWith(Messages.ADMIN_PRODUCT_ACTIVATE_SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it("should handle partLiquidateSuccess", () => {
    statusHandler({ partLiquidateSuccess: true, setSuccessText, setIsSuccessOpen, setSubText, setFailed });
    expect(setSuccessText).toBeCalledWith(Messages.PART_LIQUIDATION_REQUEST)
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })

  it('should handle earlyLiquidateIsError', () => {

    statusHandler({ earlyLiquidateIsError: true, earlyLiquidateError: { message: { message: "E sha fail" } }, setFailedText, setFailed, setFailedSubtext, role, setSuccessText, setIsSuccessOpen, setSubText });


    expect(setFailedText).toHaveBeenCalledWith(Messages.REQUEST_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith("E sha fail")
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  it('should handle partLiquidateIsError', () => {

    statusHandler({ partLiquidateIsError: true, partLiquidateError: { message: { message: "E sha fail" } }, setFailedText, setFailed, setFailedSubtext, role, setSuccessText, setIsSuccessOpen, setSubText });


    expect(setFailedText).toHaveBeenCalledWith(Messages.REQUEST_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith("E sha fail")
    expect(setFailed).toHaveBeenCalledWith(true);
  });


  it("should handle deleteInvestmentRequestSuccess", () => {
    statusHandler({ isDeleteInvestmentRequestSuccess: true, setSuccessText, setIsSuccessOpen, setSubText, setFailed });
    expect(setSuccessText).toBeCalledWith(Messages.PRODUCT_DELETE_SUCCESS)
    expect(setIsSuccessOpen).toBeCalledWith(true);
  })
  // Sets failed text, subtext and opens failed modal if isError is true
  it('should set failed text, subtext and open failed modal when isError is true', () => {

    const isError = true;
    const error = { message: { message: "Error message" } };

    statusHandler({ isError, setFailedText, setFailedSubtext, setFailed, error, setSuccessText, setIsSuccessOpen, setSubText });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DELETE_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith("Error message");
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  // isError is true but error object is null
  it('should set failed text and open failed modal when isError is true and error object is null', () => {
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const isError = true;
    const error = null;

    statusHandler({ isError, setFailedText, setFailedSubtext, setFailed, error, setSubText, setSuccessText, setIsSuccessOpen });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_DELETE_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith(undefined);
    expect(setFailed).toHaveBeenCalledWith(true);
  });

  // activateIsError is true but activateError object is null
  it('should set failed text and open failed modal when activateIsError is true and activateError object is null', () => {
    const setFailedText = jest.fn();
    const setFailedSubtext = jest.fn();
    const setFailed = jest.fn();
    const activateIsError = true;
    const activateError = null;
    const setSuccessText = jest.fn()

    statusHandler({ activateIsError, setFailedText, setFailedSubtext, setFailed, activateError, setSuccessText, setIsSuccessOpen, setSubText, });

    expect(setFailedText).toHaveBeenCalledWith(Messages.PRODUCT_ACTIVATE_FAILED);
    expect(setFailedSubtext).toHaveBeenCalledWith(undefined);
    expect(setFailed).toHaveBeenCalledWith(true);
  });
})

describe('liquidationHandler', () => {
  // metaInfo parameter is null or undefined
  it('should call the appropriate liquidation function based on the type parameter when metaInfo is null or undefined', () => {
    const resetModals = jest.fn();
    const data = {};
    const type = "part";
    const metaInfo = null;
    const partLiquidateInvestment = jest.fn();
    const earlyLiquidateInvestment = jest.fn();
    const partEditLiquidateInvestment = jest.fn();
    const earlyEditLiquidateInvestment = jest.fn();

    liquidationHandler({
      data,
      type : "part",
      metaInfo: null,
      resetModals,
      partLiquidateInvestment,
      earlyLiquidateInvestment,
      partEditLiquidateInvestment,
      earlyEditLiquidateInvestment,
    });
    expect(resetModals).toBeCalled();

    expect(partLiquidateInvestment).toHaveBeenCalled();
    liquidationHandler({
      data,
      type : "part",
      metaInfo: {data: ""},
      resetModals,
      partLiquidateInvestment,
      earlyLiquidateInvestment,
      partEditLiquidateInvestment,
      earlyEditLiquidateInvestment,
    });
    expect(resetModals).toBeCalled();
    expect(partEditLiquidateInvestment).toHaveBeenCalled();

    liquidationHandler({
      data,
      type : "early",
      metaInfo: null,
      resetModals,
      partLiquidateInvestment,
      earlyLiquidateInvestment,
      partEditLiquidateInvestment,
      earlyEditLiquidateInvestment,
    });
    expect(resetModals).toBeCalled();

    expect(earlyLiquidateInvestment).toHaveBeenCalled();
    liquidationHandler({
      data,
      type : "early",
      metaInfo: {data: ""},
      resetModals,
      partLiquidateInvestment,
      earlyLiquidateInvestment,
      partEditLiquidateInvestment,
      earlyEditLiquidateInvestment,
    });
    expect(resetModals).toBeCalled();
    expect(earlyEditLiquidateInvestment).toHaveBeenCalled();

    // expect(partLiquidateInvestment).toHaveBeenCalledWith(data);
    // expect(earlyLiquidateInvestment).not.toHaveBeenCalled();
    // expect(partEditLiquidateInvestment).not.toHaveBeenCalled();
    // expect(earlyEditLiquidateInvestment).not.toHaveBeenCalled();
  });
});
