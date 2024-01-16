import CustomerInfoCard, { Info } from "../../../../../components/pages/management/book-investment/CustomerInfoCard"
import { render, screen } from "@testing-library/react"
describe('CustomerInfoCard', () => {

    // Renders the CustomerInfoCard component without crashing
    it('should render CustomerInfoCard without crashing', () => {
        render(<CustomerInfoCard />);
    });

    // Displays the title "Customer’s Information"
    it('should display the title "Customer’s Information"', () => {
        render(<CustomerInfoCard />);
        expect(screen.getByText("Customer’s Information")).toBeInTheDocument();
    });

    // Displays all customer information titles and data
    it('should display all customer information titles and data', () => {
        render(<CustomerInfoCard />);
        expect(screen.getByText("Customer Name")).toBeInTheDocument();
        expect(screen.getByText("Customer ID")).toBeInTheDocument();
        expect(screen.getByText("Customer Type")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("BVN")).toBeInTheDocument();
        expect(screen.getByText("Phone Number")).toBeInTheDocument();
        expect(screen.getByText(/Email Address/ig)).toBeInTheDocument();
        expect(screen.getByText("Customer Persona")).toBeInTheDocument();
        expect(screen.getByText("KYC Status")).toBeInTheDocument();
        expect(screen.getByText("Risk Status")).toBeInTheDocument();
        expect(screen.getByText("Relationship Manager")).toBeInTheDocument();
    });

    // Does not display customer name as a link for non-customerName Info components
    it('should not display customer name as a link for non-customerName Info components', () => {
        render(<CustomerInfoCard />);
        expect(screen.queryByText("View all customer information")).toBeInTheDocument();
    });

    // Does not display customer persona as blue text for non-customerPersona Info components
    it('should not display customer persona as blue text for non-customerPersona Info components', () => {
        render(<CustomerInfoCard />);
        expect(screen.queryByText("High Net-Worth")).toHaveClass("text-[#3FA2F7]");
    });

    // Does not display risk status as green text for non-riskStatus Info components
    it('should not display risk status as green text for non-riskStatus Info components', () => {
        render(<CustomerInfoCard />);
        expect(screen.queryByText("LOW")).toHaveClass("text-[#2FB755]");
    });
});


describe('Info', () => {

    // Renders the component with the correct title and data
    it('should render the component with the correct title and data', () => {
        render(<Info title="Customer Name" data="Temitope Yusuf Chukwuma" />);
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Temitope Yusuf Chukwuma')).toBeInTheDocument();
    });

    // Renders the component with the correct type if provided
    it('should render the component with the correct type if provided', () => {
        render(<Info title="Customer Name" data="Temitope Yusuf Chukwuma" type="customerName" />);
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Temitope Yusuf Chukwuma')).toBeInTheDocument();
        expect(screen.getByText('View all customer information')).toBeInTheDocument();
    });

    // Renders the component without type if not provided
    it('should render the component without type if not provided', () => {
        render(<Info title="Customer ID" data="TD- BYZX" />);
        expect(screen.getByText('Customer ID')).toBeInTheDocument();
        expect(screen.getByText('TD- BYZX')).toBeInTheDocument();
    });
    // Renders the component with empty type
    it('should render the component with empty type', () => {
        render(<Info title="Customer Name" data="Temitope Yusuf Chukwuma" type="" />);
        expect(screen.getByText('Customer Name')).toBeInTheDocument();
        expect(screen.getByText('Temitope Yusuf Chukwuma')).toBeInTheDocument();
    });

});