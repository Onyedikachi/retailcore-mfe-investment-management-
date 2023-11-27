import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import BottomBarLoader from "../../components/BottomBarLoader";

test("renders the BottomBarLoader component", () => {
  const { getByTestId } = render(<BottomBarLoader />);

  const loaderElement = getByTestId("bottom-bar-loader");

  // Check if loader element is present
  expect(loaderElement).toBeInTheDocument();
  // Check if loader has the correct CSS classes
  expect(loaderElement).toHaveClass(
    "w-full bg-white p-2 py-20 flex justify-center items-center"
  );
});
