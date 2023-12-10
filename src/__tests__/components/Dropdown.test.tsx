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
} from "react-icons/fa";
import { MemoryRouter } from "react-router-dom";
import { DropDown } from "../../components";
import { handleIcons } from "../../components/DropDown";

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
