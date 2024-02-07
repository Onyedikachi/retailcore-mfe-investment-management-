
import { useNavigate } from "react-router-dom";
import BookInvestmentButton from "../../components/BookInvestmentButton"
import { BookInvestmentOptions, IBookInvestmentOptions } from "../../constants";
import { render, screen, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import * as router from "react-router-dom"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn(),
}));

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

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
    it('should display a list of investment options in the dropdown menu', async () => {
        render(<BookInvestmentButton disabled={false}>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        await userEvent.click(button)
        const investmentOptions = screen.getAllByRole('button');
        expect(investmentOptions.length).toBe(BookInvestmentOptions.length);
        investmentOptions.forEach((option, index) => {
            expect(option).toHaveTextContent(BookInvestmentOptions[index].title);
        });
    });

    it('Should call goToUrl when user is permitted', async () => {
        render(<BookInvestmentButton disabled={false}>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        await userEvent.click(button)
        const investmentOptions = screen.queryAllByRole('button');
        expect(investmentOptions.length).toBe(2);
        await userEvent.click(screen.getByText("Individual"));
        expect(navigate).toBeCalled();
        expect(screen.queryAllByRole('button').length).toBe(0);
    });
    it('Should not call goToUrl when user is not permitted', async () => {
        render(<BookInvestmentButton disabled={true}>Test Button</BookInvestmentButton>);
        const button = screen.getByText('Test Button');
        await userEvent.click(button)
        const investmentOptions = screen.queryAllByRole('button');
        expect(investmentOptions.length).toBe(2);
        await userEvent.click(screen.getByText("Individual"));
        expect(screen.queryAllByRole('button').length).toBe(2);
    });
});
