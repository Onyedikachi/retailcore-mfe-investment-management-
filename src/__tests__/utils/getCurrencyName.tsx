import { getCurrencyName } from "../../utils/getCurrencyName";
import React from 'react';
import { render } from '@testing-library/react';

// Mock the AppContext
jest.mock('../../utils/context', () => ({
  AppContext: {
    currencies: [
      { id: 'USD', text: 'United States Dollar', value: "USD" },
      { id: 'NGN', text: 'NGN', value: "NGNN" },
      // Add more currency data as needed
    ],
  },
}));

describe('getCurrencyName', () => {
  it('returns the currency name for a valid id', () => {
    const currencyId = 'USD';
    const currencyName = getCurrencyName(currencyId);
    expect(currencyName).toBe('United States Dollar');
  });

  it('returns null for an empty id', () => {
    const currencyId = '';
    const currencyName = getCurrencyName(currencyId);
    expect(currencyName).toBeNull();
  });

 
});

// You may need to configure Jest to handle TypeScript files if you are using TypeScript.
// For example, you can use ts-jest.

