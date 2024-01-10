import AccountSearch from "../../components/AccountSearch"
import { render, screen } from "@testing-library/react"

describe("AccountSearch", () => {
    // Renders a Combobox component with a search input and options list
    it('should render a Combobox component with a search input and options list', () => {
        // Arrange
        const placeholder = "Search";
        const options = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }];
        const handleOptions = jest.fn();
        const ledger = {};
        const value = null;
        
        // Act
        render(<AccountSearch placeholder={placeholder} options={options} handleOptions={handleOptions} ledger={ledger} value={value} />);
        
        // Assert
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toHaveAttribute("placeholder", "Search");
    });

    // Displays the selected item name in the input field
    it('should display the selected item name in the input field', () => {
        // Arrange
        const placeholder = "Search";
        const options = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }];
        const handleOptions = jest.fn();
        const ledger = {};
        const value = 1;

        // Act
        render(<AccountSearch placeholder={placeholder} options={options} handleOptions={handleOptions} ledger={ledger} value={value} />);

        // Assert
        expect(screen.getByTestId("input")).toHaveValue("Option 1");
    });

    // No options provided
    it('should render a Combobox component without options', () => {
        // Arrange
        const placeholder = "Search";
        const options = [];
        const handleOptions = jest.fn();
        const ledger = {};
        const value = null;

        // Act
        render(<AccountSearch placeholder={placeholder} options={options} handleOptions={handleOptions} ledger={ledger} value={value} />);

        // Assert
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.queryByRole("option")).not.toBeInTheDocument();
    });

    // No placeholder provided
    it('should render a Combobox component without a placeholder', () => {
        // Arrange
        const placeholder = "";
        const options = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }];
        const handleOptions = jest.fn();
        const ledger = {};
        const value = null;

        // Act
        render(<AccountSearch placeholder={placeholder} options={options} handleOptions={handleOptions} ledger={ledger} value={value} />);

        // Assert
        expect(screen.getByTestId("input")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByTestId("input")).toHaveAttribute("placeholder", "");
    });
})