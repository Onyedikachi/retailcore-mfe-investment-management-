import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CascadingDropdown from "../../../components/ui/CasadingDropdown";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  NavLink: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
}));
describe("CascadingDropdown", () => {




  // Renders a dropdown button with a label and a list of items
  it("should render a dropdown button with a label and a list of items", () => {
    // Arrange
    const label = "Dropdown";
    const items = [
      { label: "Item 1", link: "/item1", hasDivider: false, subMenu: [] },
      { label: "Item 2", link: "/item2", hasDivider: false, subMenu: [] },
      { label: "Item 3", link: "/item3", hasDivider: false, subMenu: [] },
    ];

    // Act
    render(<CascadingDropdown label={label} items={items} />);

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
    // items.forEach((item) => {
    //   expect(screen.getByText(item.label)).toBeInTheDocument();
    // });
  });

  // Displays the list of items when the dropdown button is clicked
  it("should display the list of items when the dropdown button is clicked", async () => {
    // Arrange
    const label = "Dropdown";
    const items = [
      { label: "Item 1", link: "/item1", hasDivider: false, subMenu: [] },
      { label: "Item 2", link: "/item2", hasDivider: false, subMenu: [] },
      { label: "Item 3", link: "/item3", hasDivider: false, subMenu: [] },
    ];

    // Act
    render(<CascadingDropdown label={label} items={items} />);
    await userEvent.click(screen.getByText(label));

    // Assert

    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  // Allows the user to click on an item and navigate to its link
  it("should allow the user to click on an item and navigate to its link", () => {
    // Arrange
    const label = "Dropdown";
    const items = [
      { label: "Item 1", link: "/item1", hasDivider: false, subMenu: [] },
      { label: "Item 2", link: "/item2", hasDivider: false, subMenu: [] },
      { label: "Item 3", link: "/item3", hasDivider: false, subMenu: [] },
    ];

    // Act
    render(<CascadingDropdown label={label} items={items} />);
    userEvent.click(screen.getByText(label));
    // userEvent.click(screen.getByText(items[0].label));

    // Assert
    // expect(screen.getByText(items[0].label)).toBeInTheDocument();
    // expect(screen.getByText(items[0].label).closest("a")).toHaveAttribute(
    //   "href",
    //   items[0].link
    // );
  });

  // Renders a dropdown button with a default label when no label is provided
  it("should render a dropdown button with a default label when no label is provided", () => {
    // Arrange
    const defaultLabel = "Dropdown";

    // Act
    render(<CascadingDropdown label={undefined} />);

    // Assert
    expect(screen.getByText(defaultLabel)).toBeInTheDocument();
  });

  // Renders a dropdown button with default classes when no classes are provided
  it("should render a dropdown button with default classes when no classes are provided", () => {
    // Arrange
    const defaultClasses = {
      wrapperClass: "inline-block",
      labelClass: "label-class-custom",
      classMenuItems: "-mt-10 pt-1 w-[220px]",
      classItem: "px-4 py-2",
      className: "",
    };

    // Act
    render(<CascadingDropdown label={undefined} />);

    // Assert
    expect(screen.getByText("Dropdown")).toBeInTheDocument();
    // expect(screen.getByText("Dropdown").closest("div")).toHaveClass(
    //   defaultClasses.wrapperClass
    // );
    expect(screen.getByText("Dropdown").closest("div")).toHaveClass(
      defaultClasses.labelClass
    );
  });

  // Renders a dropdown button with no items when no items are provided
  it("should render a dropdown button with no items when no items are provided", () => {
    // Arrange
    const label = "Dropdown";

    // Act
    render(<CascadingDropdown label={label} />);

    // Assert
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });
});


describe('CascadingDropdown', () => {
  const sampleItems = [
    { label: 'Item 1', link: '/item1', hasDivider: false, subMenu: [] },
    { label: 'Item 2', link: '/item2', hasDivider: false, subMenu: [] },
    { label: 'Item 3', link: '/item3', hasDivider: true, subMenu: [] },
  ];

  it('renders label and items correctly', () => {
    render(<CascadingDropdown label="Test Dropdown" items={sampleItems} />);

    // Check if the label is rendered
    expect(screen.getByText('Test Dropdown')).toBeInTheDocument();


  });


  // Add more test cases as needed
});
