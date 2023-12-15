import { render, screen } from "@testing-library/react";
import LiquiditySetup from "../components/pages/term-deposit/forms/liquidity-setup"
import {renderWithProviders} from "../__mocks__/api/Wrapper"

const fData = {
    part_AllowPartLiquidation: false,
    part_MaxPartLiquidation: "",
    part_RequireNoticeBeforeLiquidation: false,
    part_NoticePeriod: "",
    part_NoticePeriodUnit: "",
    part_LiquidationPenalty: "",
    part_LiquidationPenaltyPercentage: "",
    early_AllowEarlyLiquidation: "",
    early_RequireNoticeBeforeLiquidation: false,
    early_NoticePeriod: "",
    early_NoticePeriodUnit: "",
    early_LiquidationPenalty: "",
    early_LiquidationPenaltyPercentage: ""
}

describe("LiquiditySetup", () => {
    it ("Renders without error", () => {
        const form = renderWithProviders(<LiquiditySetup proceed={jest.fn()} formData={fData} setDisabled={jest.fn()}/>)
        expect(form).toMatchSnapshot()
    })
})