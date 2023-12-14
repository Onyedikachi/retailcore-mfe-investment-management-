import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Icons from "../../../components/ui/Icon";

type IconType = {
  icon?: any;
  className?: string;
  width?: string | number;
  rotate?: any;
  hFlip?: any;
  vFlip?: any;
};

describe('Icons', () => {

  // Renders an Icon component with the given props
  it('should render an Icon component with the given props', () => {
    // Arrange
    const props: IconType = {
      icon: "uil-plus",
      className: "exampleClass",
      width: "100px",
      rotate: 90,
      hFlip: true,
      vFlip: false,
    };

    // Act
    render(<Icons {...props} />);

    // Assert
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  

});
