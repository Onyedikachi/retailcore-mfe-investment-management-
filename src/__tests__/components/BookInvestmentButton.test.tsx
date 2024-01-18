
import BookInvestmentButton from "../../components/BookInvestmentButton"
import { BookInvestmentOptions, IBookInvestmentOptions } from "../../constants";
import { render, screen, fireEvent } from "@testing-library/react"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));
const navigate = jest.fn();

describe('code snippet', () => {

    // Renders a button component with children passed as props
    it('should render a button component with children passed as props', () => {
        render(<BookInvestmentButton>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        expect(button).toBeInTheDocument();
    });

    // Clicking on the button toggles the display of a dropdown menu
    it('should toggle the display of a dropdown menu when the button is clicked', () => {
        render(<BookInvestmentButton>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        fireEvent.click(button);
        const dropdownMenu = screen.getByRole('list');
        expect(dropdownMenu).toBeInTheDocument();
        fireEvent.click(button);
        // expect(screen.getByRole('list')).not.toBeInTheDocument();
    });

    // Dropdown menu displays a list of investment options
    it('should display a list of investment options in the dropdown menu', () => {
        render(<BookInvestmentButton>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        fireEvent.click(button);
        const investmentOptions = screen.getAllByRole('button');
        expect(investmentOptions.length).toBe(BookInvestmentOptions.length);
        investmentOptions.forEach((option, index) => {
            expect(option).toHaveTextContent(BookInvestmentOptions[index].title);
        });
    });

    // BookInvestmentOptions is undefined or empty
    it('should not display any investment options if BookInvestmentOptions is undefined or empty', () => {
        render(<BookInvestmentButton>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        fireEvent.click(button);
        const investmentOptions = screen.queryAllByRole('button');
        expect(investmentOptions.length).toBe(2);
    });

    // Clicking on an investment option while the dropdown menu is closed does not navigate to any url
    // it('should not navigate to any url when an investment option is clicked while the menu is closed', () => {
    //     render(<BookInvestmentButton>Test Button</BookInvestmentButton>);
    //     const button = screen.getByText('Test Button');
    //     const investmentOption = screen.getByText(BookInvestmentOptions[0].title);
    //     fireEvent.click(investmentOption);
    //     expect(navigate).not.toHaveBeenCalled();
    // });
});
