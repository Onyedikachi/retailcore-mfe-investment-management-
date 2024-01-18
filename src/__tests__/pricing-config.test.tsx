import { fireEvent, render, screen } from "@testing-library/react";
import { renderWithProviders } from "../__mocks__/api/Wrapper"
import { act } from "react-dom/test-utils";
import PricingConfig, { validateSlab } from "../components/pages/term-deposit/forms/pricing-config"
import React from "react";


jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ process: "continue" }),
}));
const navigate = jest.fn();

describe("PricingConfig", () => {
    const fData = {
        interestRateRangeType: "",
        applicableTenorMax: "",
        applicableTenorMin: "",
        applicablePrincipalMin: "",
        applicablePrincipalMax: "",
        interestRateMin: "",
        interestRateMax: "",
        interestRateConfigModels: [],
    }

    it("renders without errors", () => {
        act(() => {
        })
        const form = renderWithProviders(<PricingConfig proceed={jest.fn()} formData={fData} setFormData={jest.fn()} setDisabled={jest.fn()} productData={undefined} initiateDraft={undefined}/>)
        expect(form).toMatchSnapshot();
    })
})

describe('validateSlab', () => {

    // Returns true if type is 0 and lastSlab.principalMax equals principalMax
    it('should return true when type is 0 and lastSlab.principalMax equals principalMax', () => {
      const values = {
        interestRateConfigModels: [
          { principalMax: 100, tenorMax: 10 },
          { principalMax: 200, tenorMax: 20 },
        ],
      };
      const type = "0";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(true);
    });

    // Returns true if type is 1 and lastSlab.tenorMax equals tenorMax
    it('should return true when type is 1 and lastSlab.tenorMax equals tenorMax', () => {
      const values = {
        interestRateConfigModels: [
          { principalMax: 100, tenorMax: 10 },
          { principalMax: 200, tenorMax: 20 },
        ],
      };
      const type = "1";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(true);
    });

    // Returns false if type is not 0 or 1
    it('should return false when type is not 0 or 1', () => {
      const values = {
        interestRateConfigModels: [
          { principalMax: 100, tenorMax: 10 },
          { principalMax: 200, tenorMax: 20 },
        ],
      };
      const type = "2";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(true);
    });

    // Returns false if values.interestRateConfigModels is empty
    it('should return false when values.interestRateConfigModels is empty', () => {
      const values = {
        interestRateConfigModels: [],
      };
      const type = "0";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(false);
    });

    // Returns false if type is not a number
    it('should return false when type is not a number', () => {
      const values = {
        interestRateConfigModels: [
          { principalMax: 100, tenorMax: 10 },
          { principalMax: 200, tenorMax: 20 },
        ],
      };
      const type = "type";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(false);
    });

    // Returns false if lastSlab is undefined
    it('should return false when lastSlab is undefined', () => {
      const values = {
        interestRateConfigModels: [
          { principalMax: 100, tenorMax: 10 },
        ],
      };
      const type = "0";
      const principalMax = 200;
      const tenorMax = 20;

      const result = validateSlab(values, type, principalMax, tenorMax);

      expect(result).toBe(false);
    });
});
