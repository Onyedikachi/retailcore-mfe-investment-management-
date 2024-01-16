import TransactionSettings from "../../../../../components/pages/management/book-investment/TransactionSettings"
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

    // // The 'accountForLiquidation' select input is rendered with an error message when it is required and no option is selected.
    // it('should render \'accountForLiquidation\' select input with error message when required and no option selected', () => {
    //   // Arrange
    //   const formData = {
    //     transactionSettingModel: {
    //       accountForLiquidation: null,
    //       notifyCustomerOnMaturity: true,
    //       rollOverAtMaturity: false,
    //       rollOverOption: 0,
    //     },
    //     customerBookingInfoModel: {
    //       customerId: "123456789",
    //     },
    //   };

    //   const setFormData = jest.fn();
    //   const proceed = jest.fn();
    //   const setDisabled = jest.fn();
    //   const isSavingDraft = false;

    //   const productDetail = {
    //     liquidation: {
    //       early_AllowPartLiquidation: true,
    //       early_NoticePeriod: 30,
    //       early_NoticePeriodUnit: 1,
    //       part_AllowPartLiquidation: true,
    //       part_NoticePeriod: 15,
    //       part_NoticePeriodUnit: 2,
    //     },
    //   };

    //   render(
    //     <TransactionSettings
    //       formData={formData}
    //       setFormData={setFormData}
    //       proceed={proceed}
    //       setDisabled={setDisabled}
    //       isSavingDraft={isSavingDraft}
    //       productDetail={productDetail}
    //     />
    //   );

    //   // Act
    //   fireEvent.submit(screen.getByTestId('submit-button'));

    //   // Assert
    //   expect(screen.getByText('Select an account')).toBeInTheDocument();
    // });

    // // The 'rollOverOption' select input is rendered with an error message when it is required and no option is selected.
    // it('should render \'rollOverOption\' select input with error message when required and no option selected', () => {
    //   // Arrange
    //   const formData = {
    //     transactionSettingModel: {
    //       accountForLiquidation: "1234567890",
    //       notifyCustomerOnMaturity: true,
    //       rollOverAtMaturity: true,
    //       rollOverOption: null,
    //     },
    //     customerBookingInfoModel: {
    //       customerId: "123456789",
    //     },
    //   };

    //   const setFormData = jest.fn();
    //   const proceed = jest.fn();
    //   const setDisabled = jest.fn();
    //   const isSavingDraft = false;

    //   const productDetail = {
    //     liquidation: {
    //       early_AllowPartLiquidation: true,
    //       early_NoticePeriod: 30,
    //       early_NoticePeriodUnit: 1,
    //       part_AllowPartLiquidation: true,
    //       part_NoticePeriod: 15,
    //       part_NoticePeriodUnit: 2,
    //     },
    //   };

    //   render(
    //     <TransactionSettings
    //       formData={formData}
    //       setFormData={setFormData}
    //       proceed={proceed}
    //       setDisabled={setDisabled}
    //       isSavingDraft={isSavingDraft}
    //       productDetail={productDetail}
    //     />
    //   );

    //   // Act
    //   fireEvent.submit(screen.getByTestId('submit-button'));

    //   // Assert
    //   expect(screen.getByText('Required')).toBeInTheDocument();
    // });
});
