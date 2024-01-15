import { act, fireEvent, queryByTestId, render, screen } from "@testing-library/react";
import ProductPricingAndLiquidity from "../components/ProductPricingAndLiquidity"
import React from "react";

const details = {
    id: "4473a62d-5e40-4aa0-8bf4-3c179004c35b",
    productCode: "f041",
    state: 2,
    recentUpdated: false,
    recentlyUpdatedMeta: null,
    productInfo: {
        productName: "Free Loan",
        slogan: "LOADNF",
        description: "tHIS IS A FREE LOAN",
        startDate: "2023-12-15T00:00:00Z",
        endDate: null,
        currency: "NGN",
    },
    customerEligibility: {
        customerCategory: 0,
        customerType: [],
        ageGroupMin: 0,
        ageGroupMax: 40,
        requireDocument: [
            {
                id: "aee02b4b-94eb-574f-1407-73aac2169577",
                name: "Signature",
            },
            {
                id: "1479ef2b-94fd-8445-ed54-f46d91f951f2",
                name: "Valid Identification document",
            },
            {
                id: "8abd6a81-5a40-d049-dbaa-fc43e7afbbfc",
                name: "Proof of residential address",
            },
        ],
    },
    pricingConfiguration: {
        applicableTenorMin: 0,
        applicableTenorMinUnit: 1,
        applicableTenorMax: 1000,
        applicableTenorMaxUnit: 1,
        applicablePrincipalMin: 0,
        applicablePrincipalMax: 20000000,
        interestRateRangeType: 2,
        interestRateConfigModels: [
            {
                min: 0,
                max: 10,
                tenorMin: 1,
                tenorMinUnit: 0,
                tenorMax: 5,
                tenorMaxUnit: 1
            },
            {
                min: 5,
                max: 15,
                tenorMin: 6,
                tenorMinUnit: 1,
                tenorMax: 10,
                tenorMaxUnit: 2
            }
        ],
        interestRateMin: 0,
        interestRateMax: 20,
        interestComputationMethod: 2,
    },
    liquidation: {
        part_AllowPartLiquidation: true,
        part_MaxPartLiquidation: 12,
        part_RequireNoticeBeforeLiquidation: true,
        part_NoticePeriod: 0,
        part_NoticePeriodUnit: 1,
        part_LiquidationPenalty: 0,
        part_LiquidationPenaltyPercentage: 0,
        part_SpecificCharges: [],
        early_AllowEarlyLiquidation: false,
        early_RequireNoticeBeforeLiquidation: true,
        early_NoticePeriod: 0,
        early_NoticePeriodUnit: 1,
        early_LiquidationPenalty: 0,
        early_LiquidationPenaltyPercentage: 0,
        early_SpecificCharges: [],
    },
    productGlMappings: [
        {
            accountName: "Test asset primum ledger 100",
            accountId: "e5f1cfff-b165-40db-9c4f-d05b41cd334a",
            glAccountType: 0,
        },
        {
            accountName: "Test asset primum ledger 21",
            accountId: "2e018e63-a752-4667-9b64-1c3c93c76f50",
            glAccountType: 1,
        },
        {
            accountName: "Test asset primum ledger 11",
            accountId: "35a69d04-c6bf-43fc-bc78-10342c65e20a",
            glAccountType: 2,
        },
    ],
    isDraft: false,
    productType: 0,
};


describe('ProductPricingAndLiquidity', () => {

    // Renders the component with the correct data
    it('should render the component with the correct data', () => {
        // Arrange
        const productData = {
            data: {
                pricingConfiguration: {
                    applicableTenorMin: 10,
                    applicableTenorMinUnit: 'days',
                    applicableTenorMax: 30,
                    applicableTenorMaxUnit: 'days',
                    applicablePrincipalMin: 1000,
                    applicablePrincipalMax: 5000,
                    interestRateRangeType: 0,
                    interestRateConfigModels: [
                        {
                            min: 1,
                            max: 2,
                            principalMin: 1000,
                            principalMax: 5000
                        }
                    ]
                },
                productInfo: {
                    currency: 'USD'
                }
            },
            liquidation: {
                part_AllowPartLiquidation: true,
                early_AllowEarlyLiquidation: true
            }
        };
        const setOpen = jest.fn();

        // Act
        render(<ProductPricingAndLiquidity productData={productData} setOpen={setOpen} />);

        // Assert
        expect(screen.getByText('Applicable Tenor')).toBeInTheDocument();
        expect(screen.getByText('Applicable Principal')).toBeInTheDocument();
        expect(screen.getByText('Interest Rate')).toBeInTheDocument();
        expect(screen.getByText('Principal Deposit Charge & Tax')).toBeInTheDocument();
        expect(screen.getByTestId('more')).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByTestId('more'))
        })
        expect(setOpen).toHaveBeenCalled();
    });

    // Displays the applicable tenor
    it('should display the applicable tenor', () => {
        // Arrange
        const setOpen = jest.fn();

        // Act
        render(<ProductPricingAndLiquidity productData={{ data: details }} setOpen={setOpen} />);

        // Assert
        expect(screen.getByText('Applicable Tenor')).toBeInTheDocument();
        expect(screen.getByText('0 days - 1000 days')).toBeInTheDocument();
    });

    // Displays the applicable principal
    it('should display the applicable principal', () => {
        // Arrange
        const productData = {
            data: {
                pricingConfiguration: {
                    applicablePrincipalMin: 1000,
                    applicablePrincipalMax: 5000
                },
                productInfo: {
                    currency: 'USD'
                }
            }
        };
        const setOpen = jest.fn();

        // Act
        act(() => {
            render(<ProductPricingAndLiquidity productData={{ data: details }} setOpen={setOpen} />);
        })

        // Assert
        expect(screen.getByText('Applicable Principal')).toBeInTheDocument();
        expect(screen).toMatchSnapshot()
    });

    // Handles missing or null data gracefully
    it('should handle missing or null data gracefully', () => {
        // Arrange
        const productData = null;
        const setOpen = jest.fn();

        // Act
        act(() => {
            render(<ProductPricingAndLiquidity productData={null} setOpen={setOpen} />);
        })

        // Assert
        expect(screen.queryByText('Applicable Tenor')).toBeInTheDocument();
        expect(screen.queryByText('Applicable Principal')).toBeInTheDocument();
        expect(screen.queryByText('Interest Rate')).toBeInTheDocument();
        expect(screen.queryByText('Principal Deposit Charge & Tax')).toBeInTheDocument();
        // expect(screen.getByText('0 days - 1000 days')).not.toBeInTheDocument();
    });


    // Renders a div element with class 'flex flex-col' if productData?.data?.pricingConfiguration.interestRateRangeType equals 1
    it('should render a div element with class \'flex flex-col\' when productData?.data?.pricingConfiguration.interestRateRangeType equals 1', () => {
        details.pricingConfiguration.interestRateRangeType = 1
        // Arrange
        const productData = {
            data: {
                pricingConfiguration: {
                    interestRateRangeType: 1,
                    interestRateConfigModels: [
                        {
                            min: 0,
                            max: 10,
                            tenorMin: 1,
                            tenorMinUnit: 0,
                            tenorMax: 5,
                            tenorMaxUnit: 1
                        },
                        {
                            min: 5,
                            max: 15,
                            tenorMin: 6,
                            tenorMinUnit: 1,
                            tenorMax: 10,
                            tenorMaxUnit: 2
                        }
                    ]
                }
            }
        };

        // Act
        render(<ProductPricingAndLiquidity productData={{ data: details }} setOpen={undefined} />);

        // Assert
        expect(screen.getAllByTestId('interest-rate-config-model').length).toBe(2);
        expect(screen.getByText('0 - 10% for tenor between 1 hours - 5 days')).toBeInTheDocument();
        expect(screen.getByText('5 - 15% for tenor between 6 days - 10 weeks')).toBeInTheDocument();
    });

    // Renders the component without errors when productData is defined and has a truthy value for liquidation.early_AllowEarlyLiquidation
    it('should render the component without errors when productData is defined and liquidation.early_AllowEarlyLiquidation is truthy', () => {
        // Arrange
        details.liquidation = {
            early_AllowEarlyLiquidation: true,
            early_RequireNoticeBeforeLiquidation: true,
            early_NoticePeriod: 7,
            early_NoticePeriodUnit: 1,
            early_LiquidationPenalty: 1,
            early_LiquidationPenaltyPercentage: 50
        }
        // const productData = {
        //     data: {
        //         liquidation: {
        //             early_AllowEarlyLiquidation: true,
        //             early_RequireNoticeBeforeLiquidation: true,
        //             early_NoticePeriod: 7,
        //             early_NoticePeriodUnit: 1,
        //             early_LiquidationPenalty: 1,
        //             early_LiquidationPenaltyPercentage: 50
        //         }
        //     }
        // };

        // Act
        render(<ProductPricingAndLiquidity productData={{ data: details }} setOpen={undefined} />);

        expect(screen.getByText(/Require notice of/i)).toBeInTheDocument();
        expect(screen.getByText(/7days/i)).toBeInTheDocument();
    });
});
