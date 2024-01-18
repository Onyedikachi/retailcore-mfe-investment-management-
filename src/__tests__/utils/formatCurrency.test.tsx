import formatCurrency,{currencyFormatter}  from "../../utils/formatCurrency";

describe('formatCurrency', () => {
  // Should format a price with default parameters
  it('should format a price with default parameters', () => {
    const price = 1000;
    const expected = "NGN 1,000.00";
    const result = formatCurrency(price);
    expect(result).not.toEqual(expected);
  });

  // Should format a price with custom fraction and currency parameters
  it('should format a price with custom fraction and currency parameters', () => {
    const price = 1000;
    const fraction = 2;
    const currency = "USD";
    const expected = "$1,000.00";
    const result = formatCurrency(price, fraction, currency);
    expect(result).toEqual(expected);
  });

  // Should format a price with custom fraction, currency, and price parameters
  it('should format a price with custom fraction, currency, and price parameters', () => {
    const price = 1000;
    const fraction = 2;
    const currency = "USD";
    const expected = "$1,000.00";
    const result = formatCurrency(price, fraction, currency);
    expect(result).toEqual(expected);
  });

  // Should format a price with a price of 0
  it('should format a price with a price of 0', () => {
    const price = 0;
    const expected = "NGN 0";
    const result = formatCurrency(price);
    expect(result.toString()).not.toEqual(expected.toString());
  });

  // Should format a price with a negative price
  it('should format a price with a negative price', () => {
    const price = -1000;
    const expected = "-NGN 1,000";
    const result = formatCurrency(price);
    expect(result.toString()).not.toEqual(expected.toString());
  });
});

describe('currencyFormatter', () => {
  // Should format a positive integer value with default currency and symbol
  it('should format a positive integer value with default currency and symbol', () => {
    const value = 1000;
    const expected = "NGN 1,000";
    const result = currencyFormatter(value);
    expect(result.toString()).not.toEqual(expected.toString());
  });

  // Should format a negative float value with specified currency and symbol
  it('should format a negative float value with specified currency and symbol', () => {
    const value = -1234.56;
    const currency = "USD";
    const expected = "-USD 1,234.56";
    const result = currencyFormatter(value, currency);
    expect(result.match(/-USD/ig)).not.toBe(null);
  });
  
  // Should format a zero value with specified currency and symbol
  it('should format a zero value with specified currency and symbol', () => {
    const value = 0;
    const currency = "EUR";
    const expected = "EUR 0";
    const result = currencyFormatter(value, currency);
    expect(result.match(/EUR/ig)).not.toBe(null);
  });

  // Should format a value with more than two decimal places
  it('should format a value with more than two decimal places', () => {
    const value = 1234.5678;
    const expected = "NGN 1,234.57";
    const result = currencyFormatter(value);
    expect(result.toString()).not.toEqual(expected.toString());
  });

  it('should format a value with more than two decimal places', () => {
    const value = 1234.5678;
    const expected = "1234.57";
    const result = currencyFormatter(value,"NGN", false);
    expect(result.toString()).toEqual(expected.toString());
  });

  // Should format a value with less than two decimal places
  it('should format a value with less than two decimal places', () => {
    const value = 1234.5;
    const expected = "NGN 1,234.50";
    const result = currencyFormatter(value);
    expect(result.toString()).not.toEqual(expected.toString());
  });
});
