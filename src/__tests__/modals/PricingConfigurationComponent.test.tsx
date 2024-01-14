import React from "react";
import PricingConfigurationComponent from "../../components/modals/PricingConfigurationComponent";
import PricingConfiguration from "../../components/modals/PricingConfigurationComponent"
import { render, screen } from "@testing-library/react"


describe('PricingConfigurationComponent', () => {

    // Renders the component with interest rate range type 0
    it('should render the component with interest rate range type 0', () => {
        const productData = {
            data: {
                pricingConfiguration: {
                    interestRateRangeType: 0,
                    interestRateConfigModels: [
                        {
                            min: 0,
                            max: 1,
                            principalMin: 100,
                            principalMax: 200,
                        },
                        {
                            min: 2,
                            max: 3,
                            principalMin: 300,
                            principalMax: 400,
                        },
                    ],
                },
                productInfo: {
                    currency: "NGN",
                },
            },
        };

        render(<PricingConfigurationComponent productData={productData} />);
        const elements = screen.getAllByTestId("principal");
        const textContents = elements.map(i => i.textContent);
        expect(textContents[0]?.match(/0 - 1%/ig)).not.toBe(null)
        expect(textContents[1]?.match(/2 - 3%/ig)).not.toBe(null)
    });

    // Renders the component with interest rate range type 1
    it('should render the component with interest rate range type 1', () => {
        const productData = {
            data: {
                pricingConfiguration: {
                    interestRateRangeType: 1,
                    interestRateConfigModels: [
                        {
                            min: 0,
                            max: 1,
                            tenorMin: 1,
                            tenorMinUnit: 0,
                            tenorMax: 2,
                            tenorMaxUnit: 1,
                        },
                        {
                            min: 2,
                            max: 3,
                            tenorMin: 3,
                            tenorMinUnit: 1,
                            tenorMax: 4,
                            tenorMaxUnit: 2,
                        },
                    ],
                },
                productInfo: {
                    currency: "USD",
                },
            },
        };

        render(<PricingConfigurationComponent productData={productData} />);

        expect(screen.getByText("0 - 1% for tenor between 1 hours - 2 days")).toBeInTheDocument();
        expect(screen.getByText("2 - 3% for tenor between 3 days - 4 weeks")).toBeInTheDocument();
    });

    // Renders the component with interest rate range type 2
    it('should render the component with interest rate range type 2', () => {
        const productData = {
            data: {
                pricingConfiguration: {
                    interestRateRangeType: 2,
                    interestRateMin: 0,
                    interestRateMax: 1,
                },
                productInfo: {
                    currency: "USD",
                },
            },
        };

        render(<PricingConfigurationComponent productData={productData} />);

        expect(screen.getByText("0 - 1%")).toBeInTheDocument();
    });

    // Renders the component with undefined product data
    it('should render the component with undefined product data', () => {
        const productData = undefined;

        render(<PricingConfigurationComponent productData={productData} />);

        expect(screen.queryByText("0 - 1% for principal between $100 - $200")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for principal between $300 - $400")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1% for tenor between 1 hours - 2 days")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for tenor between 3 days - 4 weeks")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1%")).not.toBeInTheDocument();
    });

    // Renders the component with undefined pricing configuration
    it('should render the component with undefined pricing configuration', () => {
        const productData = {
            data: {
                productInfo: {
                    currency: "USD",
                },
                pricingConfiguration: {
                    "applicableTenorMin": 0,
                    "applicableTenorMinUnit": 1,
                    "applicableTenorMax": 1000,
                    "applicableTenorMaxUnit": 1,
                    "applicablePrincipalMin": 0,
                    "applicablePrincipalMax": 20000000,
                    "interestRateRangeType": 2,
                    "interestRateConfigModels": [
                        {
                            "min": 0,
                            "max": 0,
                            "principalMin": 0,
                            "principalMax": 0,
                            "tenorMin": 0,
                            "tenorMinUnit": 1,
                            "tenorMax": 0,
                            "tenorMaxUnit": 1
                        }
                    ],
                    "interestRateMin": 0,
                    "interestRateMax": 20,
                    "interestComputationMethod": 2
                },
            },
        };

        render(<PricingConfigurationComponent productData={productData} />);

        expect(screen.queryByText("0 - 1% for principal between $100 - $200")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for principal between $300 - $400")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1% for tenor between 1 hours - 2 days")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for tenor between 3 days - 4 weeks")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1%")).not.toBeInTheDocument();
    });

    // Renders the component with undefined interest rate range type
    it('should render the component with undefined interest rate range type', () => {
        const productData = {
            data: {
                pricingConfiguration: {
                    interestRateRangeType: undefined,
                    interestRateConfigModels: [
                        {
                            min: 0,
                            max: 1,
                            principalMin: 100,
                            principalMax: 200,
                        },
                        {
                            min: 2,
                            max: 3,
                            principalMin: 300,
                            principalMax: 400,
                        },
                    ],
                },
                productInfo: {
                    currency: "USD",
                },
            },
        };

        render(<PricingConfigurationComponent productData={productData} />);

        expect(screen.queryByText("0 - 1% for principal between $100 - $200")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for principal between $300 - $400")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1% for tenor between 1 hours - 2 days")).not.toBeInTheDocument();
        expect(screen.queryByText("2 - 3% for tenor between 3 days - 4 weeks")).not.toBeInTheDocument();
        expect(screen.queryByText("0 - 1%")).not.toBeInTheDocument();
    });
});
