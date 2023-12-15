// Breadcrumbs.test.jsx

import React from "react";
import { screen, fireEvent, render } from "@testing-library/react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlayCircle,
  FaBan,
  FaBars,
  FaClone,
} from "react-icons/fa";
import { MemoryRouter } from "react-router-dom";
import { DropDown } from "../../components";
import TestDrop, { handleIcons } from "../../components/DropDown";

const options = [
  {
    id: "",
    text: "View",
    icon: "FaEye",
  },
  {
    id: "",
    text: "Modify",
    icon: "FaEdit",
  },
  {
    id: "",
    text: "Delete Request",
    icon: "FaTrash",
  },
];
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));

// Mock handleClick function
const handleClick = jest.fn();
let mockActive = true;
describe("Dropdown", () => {
  it("renders without crashing", () => {
    render(
      <DropDown
        options={options}
        children={<FaBars className=" text-sterling-red-800" />}
        handleClick={function (e: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <DropDown
        options={options}
        children={<FaBars className=" text-sterling-red-800" />}
        handleClick={function (e: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("selects the right icon", () => {
    render(
      <DropDown
        options={options}
        children={undefined}
        handleClick={function (e: any): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const eyeResult = handleIcons("FaEye");
    expect(eyeResult).toStrictEqual(<FaEye className="text-[#3FA2F7]" />);

    const editResult = handleIcons("FaEdit");
    expect(editResult).toStrictEqual(<FaEdit className="text-[#D4A62F]" />);

    const trashResult = handleIcons("FaTrash");
    expect(trashResult).toStrictEqual(<FaTrash className="text-[#DC5A5D]" />);

    const banResult = handleIcons("FaBan");
    expect(banResult).toStrictEqual(<FaBan className="text-[#DC5A5D]" />);

    const playResult = handleIcons("FaPlayCircle");
    expect(playResult).toStrictEqual(
      <FaPlayCircle className="text-[#2FB755]" />
    );
  });

  it("renders right icon when button is clicked", () => {
    const { getAllByTestId, getByTestId } = render(
      <DropDown
        options={options}
        children={<FaBars className=" text-sterling-red-800" />}
        handleClick={handleClick}
      />
    );

    const button = getByTestId("trigger");
    fireEvent.click(button);
    const menus = getAllByTestId("menu-button");
    expect(menus[0]).toHaveTextContent(/^View$/);
    expect(menus[1]).toHaveTextContent(/^Modify$/);
    expect(menus[2]).toHaveTextContent(/^Delete Request$/);

    fireEvent.click(menus[0]);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies active class to the selected option", () => {
    const { getByTestId } = render(
      <DropDown
        options={options}
        children={<FaBars className=" text-sterling-red-800" />}
        handleClick={handleClick}
      />
    );
    const button = getByTestId("trigger");
    fireEvent.click(button);
    // Initially, no option should have the active class
    options?.forEach((option) => {
      const optionButton = screen.getByText(option.text);
      expect(optionButton).not.toHaveClass("bg-[#F9E5E5]");
    });

    // Simulate a click on the second option
    fireEvent.click(screen.getByText("View"));
  });
});

describe('handleIcons', () => {


  // Returns the correct React component for each input value.
  it('should return the correct React component for each input value', () => {
    const values = ["FaEye", "FaEdit", "FaTrash", "FaBan", "FaPlayCircle", "FaClone"];
    const expectedComponents = [
      <FaEye className="text-[#3FA2F7]" />,
      <FaEdit className="text-[#D4A62F]" />,
      <FaTrash className="text-[#DC5A5D]" />,
      <FaBan className="text-[#DC5A5D]" />,
      <FaPlayCircle className="text-[#2FB755]" />,
      <FaClone className="text-[#085CA5]" />,
    ];

    values.forEach((value, index) => {
      const result = handleIcons(value);
      expect(result).toEqual(expectedComponents[index]);
    });
  });

  // Handles all valid input values.
  it('should handle all valid input values', () => {
    const values = ["FaEye", "FaEdit", "FaTrash", "FaBan", "FaPlayCircle", "FaClone"];

    values.forEach((value) => {
      const result = handleIcons(value);
      expect(result).toBeDefined();
    });
  });





});

describe('TestDrop', () => {

  // Renders a button with children passed as props
  it('should render a button with children passed as props', () => {
    render(<TestDrop options={[]} handleClick={() => {}}>
      <span>Button Text</span>
    </TestDrop>);
    const button = screen.getByTestId('trigger');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Button Text');
  });

  // Renders a dropdown menu on button click
  it('should render a dropdown menu on button click', () => {
    render(<TestDrop options={[]} handleClick={() => {}}>
      <span>Button Text</span>
    </TestDrop>);
    const button = screen.getByTestId('trigger');
    fireEvent.click(button);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  // Renders menu items based on options passed as props
  it('should render menu items based on options passed as props', () => {
    const options = [
      { id: 1, text: 'Option 1', icon: 'FaEye' },
      { id: 2, text: 'Option 2', icon: 'FaEdit' },
      { id: 3, text: 'Option 3', icon: 'FaTrash' },
    ];
    render(<TestDrop options={options} handleClick={() => {}}>
      <span>Button Text</span>
    </TestDrop>);
    const button = screen.getByTestId('trigger');
    fireEvent.click(button);
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
  });

  // Does not render dropdown menu when trigger button is not clicked
  it('should not render dropdown menu when trigger button is not clicked', () => {
    render(<TestDrop options={[]} handleClick={() => {}}>
      <span>Button Text</span>
    </TestDrop>);
    const menu = screen.queryByRole('menu');
    expect(menu).not.toBeInTheDocument();
  });

  // Does not render menu items when options prop is not passed
  it('should not render menu items when options prop is not passed', () => {
    render(<TestDrop options={[]} handleClick={() => {}}>
      <span>Button Text</span>
    </TestDrop>);
    const button = screen.getByTestId('trigger');
    fireEvent.click(button);
    const menuItems = screen.queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(0);
  });


});
