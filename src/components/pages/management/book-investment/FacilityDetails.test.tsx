import {hanldleDetailsIsSuccess} from "../../../../components/pages/management/book-investment/FacilityDetails.tsx"

describe('hanldleDetailsIsSuccess', () => {

    // Sets product detail and form values based on successful detail retrieval
    it('should set product detail and form values when detailIsSuccess is true', () => {
      // Arrange
      const detailIsSuccess = true;
      const detail = {
        data: {
          pricingConfiguration: {
            applicableTenorMin: 10,
            applicableTenorMax: 20,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 5000,
            interestRateConfigModels: [
              {
                principalMin: 1000,
                principalMax: 5000,
                tenorMin: 10,
                tenorMax: 20,
                min: 1,
                max: 5
              }
            ],
            interestRateRangeType: 0,
            interestRateMin: 1,
            interestRateMax: 5
          }
        }
      };
      const values = {
        principal: 2000,
        tenor: 15
      };
      const setValue = jest.fn();
      const setProductDetail = jest.fn();

      // Act
      hanldleDetailsIsSuccess({ detailIsSuccess, detail, values, setValue, setProductDetail });

      // Assert
      expect(setProductDetail).toHaveBeenCalledWith(detail.data);
      expect(setValue).toHaveBeenCalledWith("tenorMin", detail.data.pricingConfiguration.applicableTenorMin);
      expect(setValue).toHaveBeenCalledWith("tenorMax", detail.data.pricingConfiguration.applicableTenorMax);
      expect(setValue).toHaveBeenCalledWith("prinMin", detail.data.pricingConfiguration.applicablePrincipalMin);
      expect(setValue).toHaveBeenCalledWith("prinMax", detail.data.pricingConfiguration.applicablePrincipalMax);
    });

    // Sets applicable tenor min and max values based on product detail
    it('should set applicable tenor min and max values when detailIsSuccess is true', () => {
      // Arrange
      const detailIsSuccess = true;
      const detail = {
        data: {
          pricingConfiguration: {
            applicableTenorMin: 10,
            applicableTenorMax: 20,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 5000,
            interestRateConfigModels: [
              {
                principalMin: 1000,
                principalMax: 5000,
                tenorMin: 10,
                tenorMax: 20,
                min: 1,
                max: 5
              }
            ],
            interestRateRangeType: 0,
            interestRateMin: 1,
            interestRateMax: 5
          }
        }
      };
      const values = {
        principal: 2000,
        tenor: 15
      };
      const setValue = jest.fn();
      const setProductDetail = jest.fn();

      // Act
      hanldleDetailsIsSuccess({ detailIsSuccess, detail, values, setValue, setProductDetail });

      // Assert
      expect(setValue).toHaveBeenCalledWith("tenorMin", detail.data.pricingConfiguration.applicableTenorMin);
      expect(setValue).toHaveBeenCalledWith("tenorMax", detail.data.pricingConfiguration.applicableTenorMax);
    });

    // Sets applicable principal min and max values based on product detail
    it('should set applicable principal min and max values when detailIsSuccess is true', () => {
      // Arrange
      const detailIsSuccess = true;
      const detail = {
        data: {
          pricingConfiguration: {
            applicableTenorMin: 10,
            applicableTenorMax: 20,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 5000,
            interestRateConfigModels: [
              {
                principalMin: 1000,
                principalMax: 5000,
                tenorMin: 10,
                tenorMax: 20,
                min: 1,
                max: 5
              }
            ],
            interestRateRangeType: 0,
            interestRateMin: 1,
            interestRateMax: 5
          }
        }
      };
      const values = {
        principal: 2000,
        tenor: 15
      };
      const setValue = jest.fn();
      const setProductDetail = jest.fn();

      // Act
      hanldleDetailsIsSuccess({ detailIsSuccess, detail, values, setValue, setProductDetail });

      // Assert
      expect(setValue).toHaveBeenCalledWith("prinMin", detail.data.pricingConfiguration.applicablePrincipalMin);
      expect(setValue).toHaveBeenCalledWith("prinMax", detail.data.pricingConfiguration.applicablePrincipalMax);
    });

    // Does nothing if detailIsSuccess is false
    it('should do nothing when detailIsSuccess is false', () => {
      // Arrange
      const detailIsSuccess = false;
      const detail = {
        data: {
          pricingConfiguration: {
            applicableTenorMin: 10,
            applicableTenorMax: 20,
            applicablePrincipalMin: 1000,
            applicablePrincipalMax: 5000,
            interestRateConfigModels: [
              {
                principalMin: 1000,
                principalMax: 5000,
                tenorMin: 10,
                tenorMax: 20,
                min: 1,
                max: 5
              }
            ],
            interestRateRangeType: 0,
            interestRateMin: 1,
            interestRateMax: 5
          }
        }
      };
      const values = {
        principal: 2000,
        tenor: 15
      };
      const setValue = jest.fn();
      const setProductDetail = jest.fn();

      // Act
      hanldleDetailsIsSuccess({ detailIsSuccess, detail, values, setValue, setProductDetail });

      // Assert
      expect(setProductDetail).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
    });
});
