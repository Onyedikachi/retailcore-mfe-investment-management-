import formatCurrency  from "../../utils/formatCurrency";


describe('formatCurrency', () => {

    // Tests that the function returns a formatted currency string with default parameters
    it('should return a formatted currency string with default parameters', () => {
      const price = 1000;
      const expected = "₦1,000";
      const result = formatCurrency(price);
      expect(result).toBe(expected);
    });

    // Tests that the function returns a formatted currency string with custom fraction and currency parameters
    it('should return a formatted currency string with custom fraction and currency parameters', () => {
      const price = 1000;
      const fraction = 2;
      const currency = "USD";
      const expected = "$1,000.00";
      const result = formatCurrency(price, fraction, currency);
      expect(result).toBe(expected);
    });

    // Tests that the function returns a formatted currency string with custom fraction, currency, and price parameters
    it('should return a formatted currency string with custom fraction, currency, and price parameters', () => {
      const price = 1000;
      const fraction = 2;
      const currency = "USD";
      const expected = "$1,000.00";
      const result = formatCurrency(price, fraction, currency);
      expect(result).toBe(expected);
    });

    // Tests that the function returns a formatted currency string with a price of 0
    it('should return a formatted currency string with a price of 0', () => {
      const price = 0;
      const expected = "₦0";
      const result = formatCurrency(price);
      expect(result).toBe(expected);
    });

    // Tests that the function returns a formatted currency string with a negative price
    it('should return a formatted currency string with a negative price', () => {
      const price = -1000;
      const expected = "-₦1,000";
      const result = formatCurrency(price);
      expect(result).toBe(expected);
    });

});
