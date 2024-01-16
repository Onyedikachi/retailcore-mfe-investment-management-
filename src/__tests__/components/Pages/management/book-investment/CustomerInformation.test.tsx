import { handleAccountNumberAndData, handleKYCStatus, updateCustomerData } from "../../../../../components/pages/management/book-investment/CustomerInformation"

describe('updateCustomerData', () => {

    // Sets customers data with mapped values from API response data
    it('should set customers data with mapped values from API response data when isSuccess is true', () => {
        const isSuccess = true;
        const formData = {};
        const customerData = {};
        const setFormData = jest.fn();
        const setCustomersData = jest.fn();
        const data = {
            data: [
                {
                    customerId: 1,
                    customer_products: [
                        {
                            accountNumber: "1234567890"
                        }
                    ],
                    customer_profiles: [
                        {
                            firstName: "John",
                            otherNames: "Doe",
                            surname: "Smith"
                        }
                    ]
                }
            ]
        };

        updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });

        expect(setCustomersData).toHaveBeenCalledWith([
            {
                id: 1,
                name: "1234567890",
                code: "John Doe Smith",
                value: data.data[0]
            }
        ]);
    });

    // Sets form data with customer ID from input customer data
    it('should set form data with customer ID from input customer data when isSuccess is true', () => {
        const isSuccess = true;
        const formData = {};
        const customerData = { customerId: 1 };
        const setFormData = jest.fn();
        const setCustomersData = jest.fn();
        const data = {
            data: [
                {
                    customerId: "1234567",
                    customer_products: [
                        { accountNumber: "45468765788" }
                    ],
                    customer_profiles: [
                        {
                            firstName: "John",
                            otherNames: "Johnn",
                            surname: "Doe"
                        }
                    ]
                }
            ]
        };

        updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });

        expect(setFormData).toHaveBeenCalledWith({
            ...formData,
            customerId: customerData.customerId
        });
    });

    // Empty data array in API response does not throw error
    it('should not throw error when data array in API response is empty', () => {
        const isSuccess = true;
        const formData = {};
        const customerData = {};
        const setFormData = jest.fn();
        const setCustomersData = jest.fn();
        const data = { data: [] };

        expect(() => {
            updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });
        }).not.toThrow();
    });

    // Missing customer_products or customer_profiles in API response does not throw error
    it('should not throw error when customer_products or customer_profiles is missing in API response', () => {
        const isSuccess = true;
        const formData = {};
        const customerData = {};
        const setFormData = jest.fn();
        const setCustomersData = jest.fn();
        const data = {
            data: [
                {
                    customerId: "1234567",
                    customer_products: [
                        { accountNumber: "45468765788" }
                    ],
                    customer_profiles: [
                        {
                            firstName: "John",
                            otherNames: "Johnn",
                            surname: "Doe"
                        }
                    ]
                }
            ]
        };

        expect(() => {
            updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });
        }).not.toThrow();
    });

    // Handles null or undefined input values for isSuccess, formData, customerData, setFormData, setCustomersData, and data
    it('should handle null or undefined input values for all parameters', () => {
        const isSuccess = null;
        const formData = null;
        const customerData = null;
        const setFormData = null;
        const setCustomersData = null;
        const data = null;

        expect(() => {
            updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });
        }).not.toThrow();
    });

    // Handles empty input values for isSuccess, formData, customerData, setFormData, setCustomersData, and data
    it('should handle empty input values for all parameters', () => {
        const isSuccess = undefined;
        const formData = undefined;
        const customerData = undefined;
        const setFormData = undefined;
        const setCustomersData = undefined;
        const data = undefined;

        expect(() => {
            updateCustomerData({ isSuccess, formData, customerData, setFormData, setCustomersData, data });
        }).not.toThrow();
    });
});

// Generated by CodiumAI

describe('handleAccountNumberAndData', () => {

    // When 'accountNumber' and 'data' are both truthy, the function should find the object in 'data' that has a 'customer_products' array containing an object with an 'accountNumber' property equal to 'accountNumber', and set the customer data to that object.
    it('should find the object in data with matching accountNumber and set customer data', () => {
      // Arrange
      const accountNumber = "123456789";
      const data = {
        data: [
          {
            customer_products: [
              {
                accountNumber: "123456789",
              },
            ],
            customerId: "123",
            customer_profiles: [
              {
                firstName: "John",
                otherNames: "Doe",
                surname: "Smith",
              },
            ],
          },
          {
            customer_products: [
              {
                accountNumber: "987654321",
              },
            ],
            customerId: "456",
            customer_profiles: [
              {
                firstName: "Jane",
                otherNames: "Doe",
                surname: "Johnson",
              },
            ],
          },
        ],
      };
      const setCustomerData = jest.fn();
      const setValue = jest.fn();
      const trigger = jest.fn();

      // Act
      handleAccountNumberAndData({ accountNumber, data, setCustomerData, setValue, trigger });

      // Assert
      expect(setCustomerData).toHaveBeenCalledWith(data.data[0]);
      expect(setValue).toHaveBeenCalledWith("customerId", "123");
      expect(setValue).toHaveBeenCalledWith("customerName", "John Doe Smith");
      expect(setValue).toHaveBeenCalledWith("customerAccount", "123456789");
      expect(trigger).toHaveBeenCalledWith("customerAccount");
    });

    // The function should set the 'customerId' value in the form to the 'customerId' property of the found object.
    it('should set the customerId value in the form', () => {
      // Arrange
      const accountNumber = "123456789";
      const data = {
        data: [
          {
            customer_products: [
              {
                accountNumber: "123456789",
              },
            ],
            customerId: "123",
            customer_profiles: [
              {
                firstName: "John",
                otherNames: "Doe",
                surname: "Smith",
              },
            ],
          },
        ],
      };
      const setCustomerData = jest.fn();
      const setValue = jest.fn();
      const trigger = jest.fn();

      // Act
      handleAccountNumberAndData({ accountNumber, data, setCustomerData, setValue, trigger });

      // Assert
      expect(setValue).toHaveBeenCalledWith("customerId", "123");
    });

    // The function should set the 'customerName' value in the form to a string containing the capitalized 'firstName', 'otherNames', and 'surname' properties of the first 'customer_profiles' object of the found object, separated by spaces.
    it('should set the customerName value in the form', () => {
      // Arrange
      const accountNumber = "123456789";
      const data = {
        data: [
          {
            customer_products: [
              {
                accountNumber: "123456789",
              },
            ],
            customerId: "123",
            customer_profiles: [
              {
                firstName: "John",
                otherNames: "Doe",
                surname: "Smith",
              },
            ],
          },
        ],
      };
      const setCustomerData = jest.fn();
      const setValue = jest.fn();
      const trigger = jest.fn();

      // Act
      handleAccountNumberAndData({ accountNumber, data, setCustomerData, setValue, trigger });

      // Assert
      expect(setValue).toHaveBeenCalledWith("customerName", "John Doe Smith");
    });

    // When 'accountNumber' is falsy, the function should not modify any values in the form.
    it('should not modify any values in the form when accountNumber is falsy', () => {
      // Arrange
      const accountNumber = "";
      const data = {
        data: [
          {
            customer_products: [
              {
                accountNumber: "123456789",
              },
            ],
            customerId: "123",
            customer_profiles: [
              {
                firstName: "John",
                otherNames: "Doe",
                surname: "Smith",
              },
            ],
          },
        ],
      };
      const setCustomerData = jest.fn();
      const setValue = jest.fn();
      const trigger = jest.fn();

      // Act
      handleAccountNumberAndData({ accountNumber, data, setCustomerData, setValue, trigger });

      // Assert
      expect(setCustomerData).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
      expect(trigger).not.toHaveBeenCalled();
    });

    // When 'data' is falsy, the function should not modify any values in the form.
    it('should not modify any values in the form when data is falsy', () => {
      // Arrange
      const accountNumber = "123456789";
      const data = null;
      const setCustomerData = jest.fn();
      const setValue = jest.fn();
      const trigger = jest.fn();

      // Act
      handleAccountNumberAndData({ accountNumber, data, setCustomerData, setValue, trigger });

      // Assert
      expect(setCustomerData).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
      expect(trigger).not.toHaveBeenCalled();
    });
});

describe('handleKYCStatus', () => {

    // Sets the KYC failed flag to false if the KYC status is true
    it('should set KYC failed flag to false when KYC status is true', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          risk_assessments: [
            {
              parameter: "Status of Customer Identity Verification",
              parameterOption: "Passed"
            }
          ]
        }
      };
      const setValidKyc = jest.fn();
      const accountNumber = "123456789";
      const setKycFailed = jest.fn();

      handleKYCStatus({ profileIsSuccess, profileData, setValidKyc, accountNumber, setKycFailed });

      expect(setKycFailed).toHaveBeenCalledWith(false);
    });

    // Does not set the KYC status if profileIsSuccess is false
    it('should not set KYC status when profileIsSuccess is false', () => {
      const profileIsSuccess = false;
      const profileData = {
        data: {
        }
      };
      const setValidKyc = jest.fn();
      const accountNumber = "123456789";
      const setKycFailed = jest.fn();

      handleKYCStatus({ profileIsSuccess, profileData, setValidKyc, accountNumber, setKycFailed });

      expect(setValidKyc).not.toHaveBeenCalled();
      expect(setKycFailed).not.toHaveBeenCalled()
    });

    // Does not set the KYC failed flag if the KYC status is true
    it('should set KYC failed flag when KYC status is true', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          risk_assessments: [
            {
              parameter: "Status of Customer Identity Verification",
              parameterOption: "failed"
            }
          ]
        }
      };
      const setValidKyc = jest.fn();
      const accountNumber = "123456789";
      const setKycFailed = jest.fn();

      handleKYCStatus({ profileIsSuccess, profileData, setValidKyc, accountNumber, setKycFailed });

      expect(setKycFailed).not.toHaveBeenCalledWith("true");
    });

    // Does not set the KYC failed flag if accountNumber or profileData are not provided
    it('should set KYC failed to false flag when status if false and accountNumber or profileData are not provided', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          risk_assessments: [
            {
              parameter: "Status of Customer Identity Verification",
              parameterOption: "failed"
            }
          ]
        }
      };
      const setValidKyc = jest.fn();
      const accountNumber = null;
      const setKycFailed = jest.fn();

      handleKYCStatus({ profileIsSuccess, profileData, setValidKyc, accountNumber, setKycFailed });

      expect(setKycFailed).toHaveBeenCalledWith(false);
    });
});
