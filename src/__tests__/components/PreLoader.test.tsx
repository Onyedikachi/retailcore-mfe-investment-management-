import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this for additional matchers
import PreLoader from "../../components/PreLoader";

test("renders the PreLoader component", () => {
  const { getByTestId } = render(<PreLoader />);

  const preLoader = getByTestId("pre-loader");

  expect(preLoader).toBeInTheDocument();
});
