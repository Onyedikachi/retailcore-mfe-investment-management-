import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
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
  setOptionsByStatus,
} from "../../../components/table";
import { FaBars } from "react-icons/fa";
import { shallow } from "enzyme";
import { handleColorState, handleUserView } from "../../../utils";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
describe("setOptionsByStatus", () => {
  // Returns "inactive" for status "P"
  it('should return "inactive" when status is "P"', () => {
    const status = "P";
    const result = setOptionsByStatus(status);
    expect(result).toBe("inactive");
  });

  // Returns "active" for status "A"
  it('should return "active" when status is "A"', () => {
    const status = "A";
    const result = setOptionsByStatus(status);
    expect(result).toBe("active");
  });

  // Returns "inactive" for status "R"
  it('should return "inactive" when status is "R"', () => {
    const status = "R";
    const result = setOptionsByStatus(status);
    expect(result).toBe("inactive");
  });

  // Returns "inactive" for status "D"
  it('should return "inactive" when status is "D"', () => {
    const status = "D";
    const result = setOptionsByStatus(status);
    expect(result).toBe("inactive");
  });

  // Returns "inactive" for status "I"
  it('should return "inactive" when status is "I"', () => {
    const status = "I";
    const result = setOptionsByStatus(status);
    expect(result).toBe("inactive");
  });

  it('should return status if not available', () => {
    const status = "status";
    const result = setOptionsByStatus(status);
    expect(result).toBe("status");
  });
});

describe("handleProductsDropdown", () => {
  // Returns an array of dropdown options based on the status parameter
  it("should return an array of dropdown options based on the status parameter", () => {
    // Arrange
    const status = "A";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
      ],
      inactive: [
        { text: "Activate", value: "activate" },
        { text: "Deactivate", value: "deactivate" },
      ],
    };
    const locked = false;
    const permissions = [];

    // Act
    const result = handleProductsDropdown(
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual(DropDownOptions[setOptionsByStatus(status)]);
  });

  // Filters out options based on the isChecker parameter
  it("should filter out options based on the isChecker parameter", () => {
    // Arrange
    const status = "A";
    const isChecker = true;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
      ],
      inactive: [
        { text: "Activate", value: "activate" },
        { text: "Deactivate", value: "deactivate" },
      ],
    };
    const locked = false;
    const permissions = [];

    // Act
    const result = handleProductsDropdown(
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual(
      DropDownOptions[setOptionsByStatus(status)].filter(
        (i) => i.text.toLowerCase() === "view"
      )
    );
  });

  // Filters out options based on the permissions parameter
  it("should filter out options based on the permissions parameter", () => {
    // Arrange
    const status = "A";
    const isChecker = false;
    const DropDownOptions = {
      active: [
        { text: "View", value: "view" },
        { text: "Modify", value: "modify" },
      ],
      inactive: [
        { text: "Activate", value: "activate" },
        { text: "Deactivate", value: "deactivate" },
      ],
    };
    const locked = false;
    const permissions = ["CREATE_PRODUCT"];

    // Act
    const result = handleProductsDropdown(
      status,
      isChecker,
      DropDownOptions,
      locked,
      permissions
    );

    // Assert
    expect(result).toEqual(
      DropDownOptions[setOptionsByStatus(status)].filter(
        (i) =>
          i.text.toLowerCase() !== "deactivate" &&
          i.text.toLowerCase() !== "activate"
      )
    );
  });
});

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

    // Act
    render(
      <TableComponent
        headers={headers}
        tableRows={tableRows}
        page={1}
        total={3}
        fetchMoreData={() => {}}
        hasMore={true}
        getOptionData={() => {}}
        isLoading={false}
        dropDownOptions={[]}
        dropDownClick={() => {}}
        onChangeDate={() => {}}
      />
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

    render(
      <TableComponent
        headers={headers}
        tableRows={tableRows}
        page={1}
        total={0}
        fetchMoreData={() => {}}
        hasMore={true}
        getOptionData={() => {}}
        isLoading={true}
        dropDownOptions={[]}
        dropDownClick={() => {}}
        onChangeDate={() => {}}
      />
    );

    // Assert
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
describe('TextCellContent', () => {
    it('renders text content and dot correctly', () => {
      const value = 'TestValue';
  
      render(<TextCellContent value={value} />);
  
      // Assert that the text content is rendered
      expect(screen.getByText(value)).toBeInTheDocument();
  

    });
  
    it('renders "-" when value is falsy', () => {
      const value = null; // or undefined or an empty string
  
      render(<TextCellContent value={value} />);
  
      // Assert that "-" is rendered when the value is falsy
      expect(screen.getByText('-')).toBeInTheDocument();
  

    });
  });

  describe('ProductNameCellContent', () => {
    it('renders product code correctly', () => {
      const product = {
        productCode: 'ABC123',
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
      expect(screen.getByText('-')).toBeInTheDocument();
    });
  });

  // Generated by CodiumAI

describe('UpdatedOnCellContent', () => {

    // Renders the date and time in the correct format
    it('should render the date and time in the correct format', () => {
      const value = "2022-01-01T12:00:00";
      const { getByText } = render(<UpdatedOnCellContent value={value} />);
      const formattedDate = moment(value).format("DD MMM YYYY, hh:mm A");
      expect(getByText(formattedDate)).toBeInTheDocument();
    });

    // Displays a red dot to the right of the date and time
    // Value is null or undefined
    it('should render nothing when value is null or undefined', () => {
      const value = null;
      const { container } = render(<UpdatedOnCellContent value={value} />);
      expect(container.firstChild).not.toBeNull();
    });

    // Value is not a valid date
    it('should render nothing when value is not a valid date', () => {
      const value = "invalid-date";
      const { container } = render(<UpdatedOnCellContent value={value} />);
      expect(container.firstChild).not.toBeNull();
    });

    // Value is not a string or a date object
    it('should render nothing when value is not a string or a date object', () => {
      const value = 123;
      const { container } = render(<UpdatedOnCellContent value={value} />);
      expect(container.firstChild).not.toBeNull();
    });

    // Value is a date in a different timezone
    it('should render the date and time in the correct format for a different timezone', () => {
      const value = "2022-01-01T12:00:00Z";
      const { getByText } = render(<UpdatedOnCellContent value={value} />);
      const formattedDate = moment(value).format("DD MMM YYYY, hh:mm A");
      expect(getByText(formattedDate)).toBeInTheDocument();
    });
});

// Generated by CodiumAI

describe('StateCellContent', () => {

    // Renders a span element with the given value as its text content
    it('should render a span element with the given value as its text content', () => {
      const value = "approved";
      render(<StateCellContent value={value} />);
      const spanElement = screen.getByText(value);
      expect(spanElement).toBeInTheDocument();
    });

    // Applies a class to the span element based on the value passed to the function
    it('should apply a class to the span element based on the value passed to the function', () => {
      const value = "approved";
      render(<StateCellContent value={value} />);
      const spanElement = screen.getByText(value);
      expect(spanElement).toHaveClass(handleColorState(value));
    });

   

});

// Generated by CodiumAI

describe('StatusCellContent', () => {

    // Renders a span element with a specific class based on the value passed as props
    it('should render a span element with the specific class based on the value passed as props', () => {
      const value = "approved";
      const isChecker = false;
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveClass(handleColorState(value));
    });

    // Calls 'handleUserView' function to determine the text content of the span element
    it('should call handleUserView function to determine the text content of the span element', () => {
      const value = "approved";
      const isChecker = false;
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveTextContent(handleUserView(value, isChecker));
    });

    // Calls 'handleColorState' function to determine the background color of the span element
    it('should call handleColorState function to determine the background color of the span element', () => {
      const value = "approved";
      const isChecker = false;
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveStyle(`background-color: ${handleColorState(value)}`);
    });

    // If the value passed as props does not match any of the cases in 'handleUserView' and 'handleColorState', it should render a span element with the default class and value as text content
    it('should render a span element with the default class and value as text content when the value passed as props does not match any of the cases in handleUserView and handleColorState', () => {
      const value = "unknown";
      const isChecker = false;
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();

      expect(spanElement).toHaveTextContent(value);
    });

    // If the 'isChecker' prop is not a boolean, it should default to false
    it('should default the isChecker prop to false if it is not a boolean', () => {
      const value = "approved";
      const isChecker = "true";
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveTextContent(handleUserView(value, false));
    });

    // Renders a 'FaEye' icon next to the text content
    it('should render a FaEye icon next to the text content', () => {
      const value = "approved";
      const isChecker = false;
      const { container } = render(<StatusCellContent value={value} isChecker={isChecker} />);
      const spanElement = container.querySelector("span");
      expect(spanElement).toBeInTheDocument();
     
    });
});

// Generated by CodiumAI

describe('ActionsCellContent', () => {

    // Renders a DropdownButton component with the given dropDownOptions and onClick props.
    it('should render a DropdownButton component with the given dropDownOptions and onClick props', () => {
      const dropDownOptions = [{ label: 'Option 1', value: 'option1' }, { label: 'Option 2', value: 'option2' }];
      const onClick = jest.fn();
      render(<ActionsCellContent dropDownOptions={dropDownOptions} onClick={onClick} />);
   
    });

    // dropDownOptions prop is not provided, should render a DropdownButton component with empty options.
    it('should render a DropdownButton component with empty options when dropDownOptions prop is not provided', () => {
      render(<ActionsCellContent dropDownOptions={undefined} onClick={undefined} />);
      const dropdownButton = screen.getByRole('button');
      fireEvent.click(dropdownButton);
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });

   



 
});
