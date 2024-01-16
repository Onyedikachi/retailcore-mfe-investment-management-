import { renderWithProviders } from "../../../__mocks__/api/Wrapper";
import ProductInfoInvestmentCalc from "../../../components/management/ProductInfoInvestmentCalc"
import { render, screen } from "@testing-library/react"
import { AppContext } from "../../../utils/context"

const formData = {
    id: "",
    customerId: "",
    customerBookingInfoModel: {
        customerId: "63762c09-3f83-4200-be5c-dcba0ac8fe15",
        customerName: "Ibrahim Adefemi Cole",
        customerAccount: "2000000019",
        investmentformUrl:
            "http://retailcore-investment-management-api.dev.bepeerless.co/uploads/79dc1d11-d3e9-41cd-90ec-4827226d2764.jpg",
    },
    facilityDetailsModel: {
        capitalizationMethod: 0,
        interestRate: 2,
        principal: 3000,
        tenor: 3,
        investmentPurpose: "Purpose",
        investmentProductId: "87e95dfb-f13d-465e-93a9-a214617699f9",
        investmentProductName: "Leke Test Draft withdrawn",
        tenorMin: null,
        tenorMax: null,
        prinMin: null,
        prinMax: null,
        intMin: null,
        intMax: null,
    },
    transactionSettingModel: {
        accountForLiquidation: "",
        notifyCustomerOnMaturity: false,
        rollOverAtMaturity: false,
        rollOverOption: 0,
    },
    isDraft: false,
    recentUpdated: false,
    recentlyUpdatedMeta: "",
}

const productDetail = {
    productInfo: {
        productName: "TestName",
        description: "Testing...",
        currency: "NGN",
    }
}


describe('ProductInfoInvestmentCalc', () => {

    // The component renders without any errors
    it('should render without errors', () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={{}} formData={formData} />);
        // assertion
        expect(screen.queryByTestId('product-info')).toBeInTheDocument();
        expect(screen).toMatchSnapshot();
    });

    // The product information section displays the correct product name and description
    it('should display correct product name and description', () => {
        renderWithProviders(<ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />);
        // assertion
        expect(screen.getByText("TestName")).toBeInTheDocument();
        expect(screen.getByText("Testing...")).toBeInTheDocument();
    });

    it('should display correct currency in product information section', () => {
        renderWithProviders(
            <AppContext.Provider value={{ currencies: ["NGN"] }}>
                <ProductInfoInvestmentCalc productDetail={productDetail} formData={formData} />)
            </AppContext.Provider>
        );
        expect(screen.getByText("NGN")).toBeInTheDocument();
    });

});
