import { render, screen } from "@testing-library/react"
import Tooltip from "../../../components/ui/Tooltip"
import React from "react"


describe('Tooltip', () => {

    // Should render a tooltip with default values
    it('should render a tooltip with default values', () => {
      render(<Tooltip children={undefined} title="Custom" />);
      const data = screen.getAllByTestId("tooltip")
      expect(data[0]).toBeInTheDocument();
      expect(data[0]).toHaveTextContent("Custom")
    });


  
});
