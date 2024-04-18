import { fireEvent, render, screen, act } from "@testing-library/react";
import AddedChargeList from "../../../../../../components/pages/term-deposit/forms/gl_mapping_events/AddedChargeList"
import React from "react";

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Link: ({ to, children }) => <a href={to}>{children}</a>,
    useNavigate: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", category: "investments", tab: "" })]),
    useParams: jest.fn().mockReturnValue({ tab: "" }),
    useLocation: jest.fn().mockReturnValue({ pathname: "" })
}));

describe('default', () => {

    // CHARGE and an empty column
    it('should render', () => {
        // Arrange
        const selectedCharges = ["4938ed6c-b873-4ce8-bd0f-518b5a2a5d6b", "6b7e71f5-cc3e-4c00-a108-b917b813b05a"];
        const setValues = jest.fn();
        const values = {
            event: {
                applicableCharges: {}
            }
        };
        const event = 'event';
        const charges = {
            data: {
                records: [
                    {
                        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_by": "Admin KPMG",
                        "last_modified_by_id": null,
                        "last_modified_by": null,
                        "deleted_at": null,
                        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
                        "branch": null,
                        "charge_id": "4938ed6c-b873-4ce8-bd0f-518b5a2a5d6b",
                        "name": "Sukuk",
                        "code": "SUK000",
                        "justification": null,
                        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                        "currency": "NGN",
                        "recently_updated_column": null,
                        "description": "For charge",
                        "state": "active",
                        "hasPendingRequest": false,
                        "approver": "Admin KPMG",
                        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_at": "2024-04-03T12:37:22.096Z",
                        "updated_at": "2024-04-03T12:38:23.379Z",
                        "request_id": "7d3a2b32-bf30-4fe0-babe-6eb782285723",
                        "charge_value": [
                            {
                                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                                "created_by": "Admin KPMG",
                                "last_modified_by_id": null,
                                "last_modified_by": null,
                                "deleted_at": null,
                                "tenant_id": null,
                                "branch": null,
                                "charge_value_id": "ee78d75f-d384-4eee-ba96-b97e9dd9ea2a",
                                "charge_type": "Fixed Charge",
                                "charge_amount": "1100",
                                "charge_interval": true,
                                "charge_interval_value": "50000",
                                "charge_amount_type": "Currency",
                                "compare_charge_parameter": null,
                                "minimum_transaction_value": null,
                                "maximum_transaction_value": null,
                                "compare_charge_percentage_value": null,
                                "compare_charge_currency_value": null,
                                "created_at": "2024-04-03T12:37:38.396Z",
                                "updated_at": "2024-04-03T12:37:38.396Z",
                                "charge_id": "4938ed6c-b873-4ce8-bd0f-518b5a2a5d6b"
                            }
                        ]
                    },
                    {
                        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_by": "Admin KPMG",
                        "last_modified_by_id": null,
                        "last_modified_by": null,
                        "deleted_at": null,
                        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
                        "branch": null,
                        "charge_id": "6b7e71f5-cc3e-4c00-a108-b917b813b05a",
                        "name": "Bank charge",
                        "code": "BAN000",
                        "justification": null,
                        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                        "currency": "NGN",
                        "recently_updated_column": null,
                        "description": "For charges",
                        "state": "active",
                        "hasPendingRequest": false,
                        "approver": "Admin KPMG",
                        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_at": "2024-04-03T10:44:02.471Z",
                        "updated_at": "2024-04-03T10:45:09.088Z",
                        "request_id": "fb1a7820-374c-4ac4-9c84-361395a46776",
                        "charge_value": [
                            {
                                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                                "created_by": "Admin KPMG",
                                "last_modified_by_id": null,
                                "last_modified_by": null,
                                "deleted_at": null,
                                "tenant_id": null,
                                "branch": null,
                                "charge_value_id": "677de62f-2010-4889-a2a7-ce99d9b0a26e",
                                "charge_type": "Variable Charge",
                                "charge_amount": "1800",
                                "charge_interval": false,
                                "charge_interval_value": "0",
                                "charge_amount_type": "Currency",
                                "compare_charge_parameter": null,
                                "minimum_transaction_value": "1",
                                "maximum_transaction_value": "30000",
                                "compare_charge_percentage_value": null,
                                "compare_charge_currency_value": null,
                                "created_at": "2024-04-03T10:44:26.346Z",
                                "updated_at": "2024-04-03T10:44:26.346Z",
                                "charge_id": "6b7e71f5-cc3e-4c00-a108-b917b813b05a"
                            }
                        ]
                    },
                    {
                        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_by": "Admin KPMG",
                        "last_modified_by_id": null,
                        "last_modified_by": null,
                        "deleted_at": null,
                        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
                        "branch": null,
                        "charge_id": "32299bd6-b03a-4698-9ee9-1208080550ac",
                        "name": "FIRS Charge",
                        "code": "FIR000",
                        "justification": null,
                        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                        "currency": "NGN",
                        "recently_updated_column": null,
                        "description": "For charge",
                        "state": "active",
                        "hasPendingRequest": false,
                        "approver": "Admin KPMG",
                        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_at": "2024-04-03T10:42:06.777Z",
                        "updated_at": "2024-04-03T10:43:06.918Z",
                        "request_id": "20311d0a-6b75-43c3-93c9-7304b3beed4a",
                        "charge_value": [
                            {
                                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                                "created_by": "Admin KPMG",
                                "last_modified_by_id": null,
                                "last_modified_by": null,
                                "deleted_at": null,
                                "tenant_id": null,
                                "branch": null,
                                "charge_value_id": "962c0fd6-8d2c-4c38-ae67-f5ac9c3f9da3",
                                "charge_type": "Fixed Charge",
                                "charge_amount": "1200",
                                "charge_interval": true,
                                "charge_interval_value": "60000",
                                "charge_amount_type": "Currency",
                                "compare_charge_parameter": null,
                                "minimum_transaction_value": null,
                                "maximum_transaction_value": null,
                                "compare_charge_percentage_value": null,
                                "compare_charge_currency_value": null,
                                "created_at": "2024-04-03T10:42:18.329Z",
                                "updated_at": "2024-04-03T10:42:18.329Z",
                                "charge_id": "32299bd6-b03a-4698-9ee9-1208080550ac"
                            }
                        ]
                    },
                    {
                        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_by": "Admin KPMG",
                        "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "last_modified_by": "Admin KPMG",
                        "deleted_at": null,
                        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
                        "branch": null,
                        "charge_id": "d193e376-607f-491f-a95b-df27c662038c",
                        "name": "Investment Charges",
                        "code": "INV000",
                        "justification": null,
                        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                        "currency": "NGN",
                        "recently_updated_column": "state",
                        "description": "For charge",
                        "state": "active",
                        "hasPendingRequest": false,
                        "approver": "Admin KPMG",
                        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_at": "2024-04-03T08:48:51.267Z",
                        "updated_at": "2024-04-03T08:54:13.903Z",
                        "request_id": "26f1610c-e9e9-41f6-84ee-204805aed432",
                        "charge_value": [
                            {
                                "created_by_id": null,
                                "created_by": null,
                                "last_modified_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                                "last_modified_by": "Admin KPMG",
                                "deleted_at": null,
                                "tenant_id": null,
                                "branch": null,
                                "charge_value_id": "7d4f4087-8191-4bc4-b281-dabd7cbefdab",
                                "charge_type": "Variable Charge",
                                "charge_amount": "2500",
                                "charge_interval": false,
                                "charge_interval_value": "0",
                                "charge_amount_type": "Currency",
                                "compare_charge_parameter": null,
                                "minimum_transaction_value": "1",
                                "maximum_transaction_value": "10000",
                                "compare_charge_percentage_value": null,
                                "compare_charge_currency_value": null,
                                "created_at": "2024-04-03T08:54:13.889Z",
                                "updated_at": "2024-04-03T08:54:13.889Z",
                                "charge_id": "d193e376-607f-491f-a95b-df27c662038c"
                            }
                        ]
                    },
                    {
                        "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_by": "Admin KPMG",
                        "last_modified_by_id": null,
                        "last_modified_by": null,
                        "deleted_at": null,
                        "tenant_id": "79fa72ce-2ff1-48fb-8558-f9b0c9b02fae",
                        "branch": null,
                        "charge_id": "459ae181-ec3c-488c-85af-cbdb7444eb3a",
                        "name": "ATM Charge",
                        "code": "ATM000",
                        "justification": null,
                        "currency_id": "20f0c9f8-c684-4b72-81ef-7d1a44c10238",
                        "currency": "NGN",
                        "recently_updated_column": null,
                        "description": "For charge",
                        "state": "active",
                        "hasPendingRequest": false,
                        "approver": "Admin KPMG",
                        "approver_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                        "created_at": "2024-04-03T08:31:15.193Z",
                        "updated_at": "2024-04-03T08:47:52.279Z",
                        "request_id": "9ff62487-ebb0-47ca-9f3a-6d2eb27668c8",
                        "charge_value": [
                            {
                                "created_by_id": "d186ac22-5ba3-4b2a-8466-d1b59d408348",
                                "created_by": "Admin KPMG",
                                "last_modified_by_id": null,
                                "last_modified_by": null,
                                "deleted_at": null,
                                "tenant_id": null,
                                "branch": null,
                                "charge_value_id": "b7abd537-5212-4678-a93f-7ee946cf416c",
                                "charge_type": "Fixed Charge",
                                "charge_amount": "1200",
                                "charge_interval": true,
                                "charge_interval_value": "5000",
                                "charge_amount_type": "Currency",
                                "compare_charge_parameter": null,
                                "minimum_transaction_value": null,
                                "maximum_transaction_value": null,
                                "compare_charge_percentage_value": null,
                                "compare_charge_currency_value": null,
                                "created_at": "2024-04-03T08:32:13.279Z",
                                "updated_at": "2024-04-03T08:32:13.279Z",
                                "charge_id": "459ae181-ec3c-488c-85af-cbdb7444eb3a"
                            }
                        ]
                    },]
            }
        };
        const setValue = jest.fn();

        // Act
        render(<AddedChargeList selectedCharges={selectedCharges} setValues={setValues} values={values} event={event} charges={charges} setValue={setValue} />);

        // Assert
        expect(screen.getAllByTestId('remove')).toHaveLength(2);
        act(() => {
            fireEvent.click(screen.getAllByTestId('remove')[0])
        })
        expect(setValue).toBeCalled();
        expect(setValues).toBeCalled();
    });

    // selectedCharges is an empty array
    it('should render selectedCharges is an empty array when selectedCharges is empty', () => {
        // Arrange
        const selectedCharges = [];
        const setValues = jest.fn();
        const values = {};
        const event = 'event';
        const charges = { data: { records: [{ charge_id: 1, name: 'Charge 1' }, { charge_id: 2, name: 'Charge 2' }] } };
        const setValue = jest.fn();

        // Act
        render(<AddedChargeList selectedCharges={selectedCharges} setValues={setValues} values={values} event={event} charges={charges} setValue={setValue} />);

        // Assert
        expect(screen.getByText('CHARGE')).toBeInTheDocument();
        expect(screen.queryByText('Charge 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Charge 2')).not.toBeInTheDocument();
    });
});
