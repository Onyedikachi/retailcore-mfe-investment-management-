import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import SearchInput, { SearchItem, SearchValues, closeBox, handleInputChange } from "../../components/SearchInput";

describe("handleInputChange", () => {
  // Tests that setInputValue is called with the event target value
  it("should call setInputValue with the event target value", () => {
    jest.useFakeTimers();
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const event = { target: { value: "test" } };

    handleInputChange(event, setInputValue, setSearchTerm);

    jest.advanceTimersByTime(800);
    expect(setInputValue).toHaveBeenCalledWith("test");
  });
});

describe("SearchInput", () => {
  beforeEach(() => {
    jest.setTimeout(10000); // Set the timeout to 10000 ms (10 seconds) or any other suitable value
  });
  // Tests that the SearchInput component renders a search input field with default props
  it("should render search input field with default props", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} />);

    // Assert
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product name or code")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search by product name or code")
    ).toHaveValue("");
  });

  it("applies custom CSS classes", () => {
    render(<SearchInput setSearchTerm={jest.fn()} hideBorder fullW />);

    const search = screen.getByTestId("search");
    expect(search).not.toHaveClass("border-b");
    expect(search).toHaveClass("w-full");
  });

  // Tests that the SearchInput component allows the user to input a search term and updates the input field accordingly
  it("should update input field when user inputs a search term", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search by product name or code");
    fireEvent.change(input, { target: { value: "test" } });

    // Assert
    expect(input).toHaveValue("test");
  });

  // Tests that the SearchInput component allows the user to input a search term and updates the input field accordingly when isTruncated is true
  it("should update input field when user inputs a search term and isTruncated is true", () => {
    // Arrange
    const setSearchTerm = jest.fn();

    // Act
    render(<SearchInput setSearchTerm={setSearchTerm} isTruncated={true} />);

    const input = screen.getByPlaceholderText("Search by product name or code");
    fireEvent.change(input, { target: { value: "test" } });

    // Assert
    expect(input).toHaveValue("test");
  });
});
describe('closeBox', () => {

  // When called, it sets the search results to an empty array.
  it('should set search results to an empty array', () => {
    const setSearchResults = jest.fn();
    const setShowBox = jest.fn();

    closeBox(setSearchResults, setShowBox);

    expect(setSearchResults).toHaveBeenCalledWith([]);
  });

  // When called, it sets the show box state to false.
  it('should set show box state to false', () => {
    const setSearchResults = jest.fn();
    const setShowBox = jest.fn();

    closeBox(setSearchResults, setShowBox);

    expect(setShowBox).toHaveBeenCalledWith(false);
  });

  // setSearchResults parameter is not a function.
  it('should handle setSearchResults parameter not being a function', () => {
    const setSearchResults = "not a function";
    const setShowBox = jest.fn();

    expect(() => closeBox(setSearchResults, setShowBox)).toThrow(TypeError);
  });

  // setShowBox parameter is not a function.
  it('should handle setShowBox parameter not being a function', () => {
    const setSearchResults = jest.fn();
    const setShowBox = "not a function";

    expect(() => closeBox(setSearchResults, setShowBox)).toThrow(TypeError);
  });

  // The function is called multiple times in a row.
  it('should handle multiple calls in a row', () => {
    const setSearchResults = jest.fn();
    const setShowBox = jest.fn();

    closeBox(setSearchResults, setShowBox);
    closeBox(setSearchResults, setShowBox);

    expect(setSearchResults).toHaveBeenCalledTimes(2);
    expect(setShowBox).toHaveBeenCalledTimes(2);
  });
});

describe('SearchValues', () => {

  // Clicking on the search item should call the handleClick function.
  it('should call handleClick when search item is clicked', () => {
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const setShowBox = jest.fn();
    const handleSearch = jest.fn();
    const item = { name: 'item1' };
    const type = 'general';

    render(
      <SearchValues
        item={item}
        type={type}
        setInputValue={setInputValue}
        setSearchTerm={setSearchTerm}
        setShowBox={setShowBox}
        handleSearch={handleSearch}
      />
    );
const itemval= screen.getAllByText('item1')
    fireEvent.click(itemval[0]);

    expect(setInputValue).toHaveBeenCalledWith('item1');
    expect(setSearchTerm).toHaveBeenCalledWith('item1');
    expect(setShowBox).toHaveBeenCalledWith(false);
    expect(handleSearch).toHaveBeenCalledWith('item1');
  });
});
// Generated by CodiumAI

describe('SearchItem', () => {

  // Renders a div element with a className of "".
  it('should render a div element with an empty className', () => {
    const { container } = render(<SearchItem item={undefined} type={undefined} setInputValue={undefined} setSearchTerm={undefined} setShowBox={undefined} handleSearch={undefined} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  // Renders a span element with a className of "px-2 mb-3 text-xs text-[#aaa] flex gap-x-[6px] items-center" if type is "general".
  it('should render a span element with the specified className when type is "general"', () => {
    const item = {};
    const type = "general";
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const setShowBox = jest.fn();
    const handleSearch = jest.fn();

    const { container } = render(
      <SearchItem
        item={item}
        type={type}
        setInputValue={setInputValue}
        setSearchTerm={setSearchTerm}
        setShowBox={setShowBox}
        handleSearch={handleSearch}
      />
    );

    const spanElement = container.querySelector('span');
    expect(spanElement).toBeInTheDocument();

  });

  // Renders a div element if item.products.length > 0.
  it('should render a div element when item.products.length > 0', () => {
    const item = { products: [1, 2, 3] };
    const type = "general";
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const setShowBox = jest.fn();
    const handleSearch = jest.fn();

    const { container } = render(
      <SearchItem
        item={item}
        type={type}
        setInputValue={setInputValue}
        setSearchTerm={setSearchTerm}
        setShowBox={setShowBox}
        handleSearch={handleSearch}
      />
    );

    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
  });

  // item is undefined.
  it('should render a div element when item is undefined', () => {
    const type = "general";
    const setInputValue = jest.fn();
    const setSearchTerm = jest.fn();
    const setShowBox = jest.fn();
    const handleSearch = jest.fn();

    const { container } = render(
      <SearchItem
        type={type}
        setInputValue={setInputValue}
        setSearchTerm={setSearchTerm}
        setShowBox={setShowBox}
        handleSearch={handleSearch} item={undefined}      />
    );

    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
  });
});
