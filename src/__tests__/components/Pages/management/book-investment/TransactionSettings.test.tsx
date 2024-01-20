import TransactionSettings, { handleAccountForLiquidation } from "../../../../../components/pages/management/book-investment/TransactionSettings"
import { screen, render, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../../../../../__mocks__/api/Wrapper"

describe('TransactionSettings', () => {

    // The form is submitted with valid data and the 'proceed' function is called.
    it('Render', () => {
        // Arrange
        const formData = {
            transactionSettingModel: {
                accountForLiquidation: "1234567890",
                notifyCustomerOnMaturity: true,
                rollOverAtMaturity: false,
                rollOverOption: 0,
            },
            customerBookingInfoModel: {
                customerId: "123456789",
            },
        };

        const setFormData = jest.fn();
        const proceed = jest.fn();
        const setDisabled = jest.fn();
        const isSavingDraft = false;

        const productDetail = {
            liquidation: {
                early_AllowPartLiquidation: true,
                early_NoticePeriod: 30,
                early_NoticePeriodUnit: 1,
                part_AllowPartLiquidation: true,
                part_NoticePeriod: 15,
                part_NoticePeriodUnit: 2,
            },
        };

        renderWithProviders(
            <TransactionSettings
                formData={formData}
                setFormData={setFormData}
                proceed={proceed}
                setDisabled={setDisabled}
                isSavingDraft={isSavingDraft}
                productDetail={productDetail}
            />
        );

        // Act
        fireEvent.submit(screen.getByTestId('submit-button'));
        expect(screen).toMatchSnapshot()
        // Assert
    });

    // The 'accountForLiquidation' select input is rendered with the correct options.
    it('should render \'accountForLiquidation\' select input with correct options', () => {
        // Arrange
        const formData = {
            transactionSettingModel: {
                accountForLiquidation: "1234567890",
                notifyCustomerOnMaturity: true,
                rollOverAtMaturity: false,
                rollOverOption: 0,
            },
            customerBookingInfoModel: {
                customerId: "123456789",
            },
        };

        const setFormData = jest.fn();
        const proceed = jest.fn();
        const setDisabled = jest.fn();
        const isSavingDraft = false;

        const productDetail = {
            liquidation: {
                early_AllowPartLiquidation: true,
                early_NoticePeriod: 30,
                early_NoticePeriodUnit: 1,
                part_AllowPartLiquidation: true,
                part_NoticePeriod: 15,
                part_NoticePeriodUnit: 2,
            },
        };

        renderWithProviders(
            <TransactionSettings
                formData={formData}
                setFormData={setFormData}
                proceed={proceed}
                setDisabled={setDisabled}
                isSavingDraft={isSavingDraft}
                productDetail={productDetail}
            />
        );

        // Act

        // Assert
        expect(screen.getAllByTestId('input-div')[0]).toHaveTextContent('Account for liquidation');
        expect(screen.getAllByRole('combobox').length).toBeGreaterThan(0);
        expect(screen).toMatchSnapshot();
    });

    // The 'accountForLiquidation' select input is rendered without any options.
    it('should render \'accountForLiquidation\' select input without any options', () => {
        // Arrange
        const formData = {
            transactionSettingModel: {
                accountForLiquidation: null,
                notifyCustomerOnMaturity: true,
                rollOverAtMaturity: false,
                rollOverOption: 0,
            },
            customerBookingInfoModel: {
                customerId: "123456789",
            },
        };

        const setFormData = jest.fn();
        const proceed = jest.fn();
        const setDisabled = jest.fn();
        const isSavingDraft = false;

        const productDetail = {
            liquidation: {
                early_AllowPartLiquidation: true,
                early_NoticePeriod: 30,
                early_NoticePeriodUnit: 1,
                part_AllowPartLiquidation: true,
                part_NoticePeriod: 15,
                part_NoticePeriodUnit: 2,
            },
        };

        renderWithProviders(
            <TransactionSettings
                formData={formData}
                setFormData={setFormData}
                proceed={proceed}
                setDisabled={setDisabled}
                isSavingDraft={isSavingDraft}
                productDetail={productDetail}
            />
        );

        // Act

        // Assert
        expect(screen.getAllByRole('combobox')[0]).toBeInTheDocument();
    });
});


// Generated by CodiumAI

describe('handleAccountForLiquidation', () => {

    // When profileIsSuccess is true, accountData is generated from profileData.customer_products and setCustomerData is called with accountData
    it('should generate accountData and call setCustomerData when profileIsSuccess is true', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          customer_products: [
            {
              customerProductId: 1,
              accountNumber: "1234567890",
            },
            {
              customerProductId: 2,
              accountNumber: "0987654321",
            },
          ],
        },
      };
      const formData = {
        transactionSettingModel: {
          accountForLiquidation: null,
        },
      };
      const setFormData = jest.fn();
      const setValue = jest.fn();
      const setCustomerData = jest.fn();

      handleAccountForLiquidation({
        profileIsSuccess,
        profileData,
        formData,
        setFormData,
        setValue,
        setCustomerData,
      });

      expect(setCustomerData).toHaveBeenCalledWith([
        {
          id: 1,
          text: "1234567890",
          value: "1234567890",
        },
        {
          id: 2,
          text: "0987654321",
          value: "0987654321",
        },
      ]);
      expect(setFormData).toHaveBeenCalledWith({
        ...formData,
        transactionSettingModel: {
          ...formData.transactionSettingModel,
          accountForLiquidation: "1234567890",
        },
      });
      expect(setValue).toHaveBeenCalledWith("accountForLiquidation", "1234567890");
    });

    // When accountData exists and formData.transactionSettingModel.accountForLiquidation does not exist, formData is updated with the first accountData value and setValue is called with the first accountData value
    it('should update formData and call setValue when accountData exists and formData.transactionSettingModel.accountForLiquidation does not exist', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          customer_products: [
            {
              customerProductId: 1,
              accountNumber: "1234567890",
            },
            {
              customerProductId: 2,
              accountNumber: "0987654321",
            },
          ],
        },
      };
      const formData = {
        transactionSettingModel: {
          accountForLiquidation: null,
        },
      };
      const setFormData = jest.fn();
      const setValue = jest.fn();
      const setCustomerData = jest.fn();

      handleAccountForLiquidation({
        profileIsSuccess,
        profileData,
        formData,
        setFormData,
        setValue,
        setCustomerData,
      });

      expect(setCustomerData).toHaveBeenCalledWith([
        {
          id: 1,
          text: "1234567890",
          value: "1234567890",
        },
        {
          id: 2,
          text: "0987654321",
          value: "0987654321",
        },
      ]);
      expect(setFormData).toHaveBeenCalledWith({
        ...formData,
        transactionSettingModel: {
          ...formData.transactionSettingModel,
          accountForLiquidation: "1234567890",
        },
      });
      expect(setValue).toHaveBeenCalledWith("accountForLiquidation", "1234567890");
    });

    // When accountData does not exist or formData.transactionSettingModel.accountForLiquidation exists, no changes are made to formData or setValue
    it('should not update formData or call setValue when accountData does not exist or formData.transactionSettingModel.accountForLiquidation exists', () => {
      const profileIsSuccess = true;
      const profileData = {
        data: {
          customer_products: [],
        },
      };
      const formData = {
        transactionSettingModel: {
          accountForLiquidation: "1234567890",
        },
      };
      const setFormData = jest.fn();
      const setValue = jest.fn();
      const setCustomerData = jest.fn();

      handleAccountForLiquidation({
        profileIsSuccess,
        profileData,
        formData,
        setFormData,
        setValue,
        setCustomerData,
      });

      expect(setCustomerData).toHaveBeenCalled();
      expect(setFormData).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
    });

    // When profileIsSuccess is false, no changes are made to formData or setValue
    it('should not update formData or call setValue when profileIsSuccess is false', () => {
      const profileIsSuccess = false;
      const profileData = {
        data: {
          customer_products: [
            {
              customerProductId: 1,
              accountNumber: "1234567890",
            },
            {
              customerProductId: 2,
              accountNumber: "0987654321",
            },
          ],
        },
      };
      const formData = {
        transactionSettingModel: {
          accountForLiquidation: null,
        },
      };
      const setFormData = jest.fn();
      const setValue = jest.fn();
      const setCustomerData = jest.fn();

      handleAccountForLiquidation({
        profileIsSuccess,
        profileData,
        formData,
        setFormData,
        setValue,
        setCustomerData,
      });

      expect(setCustomerData).not.toHaveBeenCalled();
      expect(setFormData).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
    });
});