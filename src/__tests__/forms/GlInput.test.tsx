import { renderWithProviders } from "../../__mocks__/api/Wrapper"
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import EntriesAndEventsSearchResults from "../../components/forms/GlInput";
import { click } from "@testing-library/user-event/dist/types/convenience";
import userEvent from "@testing-library/user-event";
import React from "react";
jest.mock("../../api", () => {
    const glClasses = [
        {
            "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
            "name": "Asset",
            "debit_impact_on_balance": "INCREASE",
            "credit_impact_on_balance": "DECREASE",
            "code": "ASST",
            "children_count": 83,
            "is_configured": true,
            "gl_indentifier": "Asset",
            "gl_identifier": "Asset"
        },
        {
            "id": "af2e3ba1-6198-4c71-950a-2c71c6ee03e1",
            "name": "Equity",
            "debit_impact_on_balance": "DECREASE",
            "credit_impact_on_balance": "INCREASE",
            "code": "EQT",
            "children_count": 9,
            "is_configured": true,
            "gl_indentifier": "Equity",
            "gl_identifier": "Equity"
        },
        {
            "id": "337416a1-e6ed-4607-b52e-50ae8f908ee7",
            "name": "Expense",
            "debit_impact_on_balance": "INCREASE",
            "credit_impact_on_balance": "DECREASE",
            "code": "EXP",
            "children_count": 9,
            "is_configured": true,
            "gl_indentifier": "Expense",
            "gl_identifier": "Expense"
        },
        {
            "id": "887ce56d-24fd-48dd-8af2-f3af163b4629",
            "name": "Liability",
            "debit_impact_on_balance": "DECREASE",
            "credit_impact_on_balance": "INCREASE",
            "code": "LIA",
            "children_count": 30,
            "is_configured": true,
            "gl_indentifier": "Liability",
            "gl_identifier": "Liability"
        },
        {
            "id": "88bf7020-6eb3-4583-b91b-f2806f7c23e9",
            "name": "Revenue",
            "debit_impact_on_balance": "DECREASE",
            "credit_impact_on_balance": "INCREASE",
            "code": "REV",
            "children_count": 4,
            "is_configured": true,
            "gl_indentifier": "Revenue",
            "gl_identifier": "Revenue"
        }
    ]
    const glLedgerQueries = [
        {
            "id": "c36b8118-1d1b-4c9c-b9a1-a3e7d25fb513",
            "name": "Recurrent asset primum",
            "gl_class": {
                "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                "name": "Asset",
                "debit_impact_on_balance": "INCREASE",
                "credit_impact_on_balance": "DECREASE",
                "code": "ASST",
                "children_count": 83,
                "is_configured": true,
                "gl_indentifier": "Asset",
                "gl_identifier": "Asset"
            },
            "ledger_code": "ASST0RAP",
            "description": "Recurrent Asset Primum",
            "state": "OPEN",
            "leaf_count": 24,
            "leaf_ledgers": [
                {
                    "id": "2fb2f018-a3af-442d-9a0e-d4f6e94bc2c2",
                    "name": "Asset txt 212",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1252",
                    "description": "Asset TXT 212",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "9187cb3e-950c-4fc1-a1e2-fb4ca635e87e",
                    "name": "Asset txt 210",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1240",
                    "description": "Asset TXT 210",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "011e24d9-8317-434a-bc09-92a07938f952",
                    "name": "Asset txt 11",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1228",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "588b695d-d34c-4b24-b26a-11aa97a37971",
                    "name": "Asset txt 21",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1216",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "c1a50eeb-9b17-4fe4-aa12-fabc27c6a88a",
                    "name": "Asset txt 31",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1204",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "84e19fe1-8d2d-4f54-8dac-6f5b1a13839c",
                    "name": "Asset txt 41",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1192",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "785b0984-aad5-4279-91af-60d16927b4ce",
                    "name": "Asset txt 51",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1180",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "dbd141bb-2889-4217-bc91-59736dc84320",
                    "name": "Asset txt 21",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1168",
                    "description": "Asset Txt 21",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "8dec71b5-c271-4fac-918d-613da26a340d",
                    "name": "Asset txt 9",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1156",
                    "description": "Asset Txt 9",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "d5366b3a-774b-404e-9e81-2bbd58c881eb",
                    "name": "Asset txt 8",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1144",
                    "description": "Asset Txt 8",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "9f9817a7-033c-4e97-a0f1-4431e0ff313e",
                    "name": "Asset txt 6",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1132",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "7e12bd20-ed4a-47e5-9562-42426074d344",
                    "name": "Asset txt 7",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1120",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "d93fce82-9488-4903-9980-faedd37d7837",
                    "name": "Asset txt 1",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1108",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "67791caf-acd6-4378-954e-d26c6a1bfb2e",
                    "name": "Asset txt 2",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1096",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "afb9fd63-8a6f-4070-96b1-7ff716332b09",
                    "name": "Asset txt 3",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1084",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "b4ef949c-e69e-4e44-9487-b63b18a13623",
                    "name": "Asset txt 4",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1072",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "0c28bcbd-855a-4b6a-bfaa-4b56f0b7b2cf",
                    "name": "Asset txt 5",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1060",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "9e3951ac-ee38-4915-afa2-ac83aa63ad34",
                    "name": "Asset primum ty",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST000e0010",
                    "description": "Asset Primum TY",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "59e6545a-15e3-4ba7-af36-aee45935599f",
                    "name": "Draft parent 101",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST000e0005",
                    "description": "Draft parent 101",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "96ee9c09-b28d-47a4-8be7-cfab0dcc7eaf",
                    "name": "Asset primum x",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1048",
                    "description": "Asset Primum X",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "67ba4bc8-6224-47a9-9ed0-9fb5ac44f59c",
                    "name": "Asset ledger primuim 45",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1036",
                    "description": "Asset Ledger Primuim 45",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "b3b653b2-9691-492f-af61-62a2a46bf390",
                    "name": "Recurrent asset primium 234",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1024",
                    "description": "Recurrent asset Primium 234",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "9f9d19c5-d501-4341-aca1-756f28fda770",
                    "name": "Draft i",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1012",
                    "description": "s",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "376357b0-8b55-4e26-94fe-c2ccbf7459fa",
                    "name": "Some random ledge 44",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0RAP1000",
                    "description": "s",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                }
            ]
        },
        {
            "id": "83289ec5-ad7c-4b6a-a854-5cc12f08b873",
            "name": "New asset parent 99",
            "gl_class": {
                "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                "name": "Asset",
                "debit_impact_on_balance": "INCREASE",
                "credit_impact_on_balance": "DECREASE",
                "code": "ASST",
                "children_count": 83,
                "is_configured": true,
                "gl_indentifier": "Asset",
                "gl_identifier": "Asset"
            },
            "ledger_code": "ASST0NAP",
            "description": "New Asset Parent",
            "state": "OPEN",
            "leaf_count": 10,
            "leaf_ledgers": [
                {
                    "id": "d96cb0e2-cd61-4122-aeb0-19237e0c6f94",
                    "name": "Asset txt 38",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP40",
                    "description": "Asset TXT 38",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "66cb1309-350a-4893-987e-36781fc598a4",
                    "name": "Time keeps skipping",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP39",
                    "description": "Time keeps skipping",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "8d825f0f-d615-4ab2-b188-ebac861e2c63",
                    "name": "Asset txt 24",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP38",
                    "description": "Asset TXT 24",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "bd28ef62-1d06-4af0-aed5-fbb9fc09d3be",
                    "name": "Paramilitary",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP37",
                    "description": "This is where cash needed to run paramilitary day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "180e1a64-5516-45bf-8330-01b0f185cef4",
                    "name": "Test run",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP0036",
                    "description": "test run",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "8f7094a6-4238-42f0-a36a-9c29ec3057f7",
                    "name": "Testing leaf ledgers",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP0036",
                    "description": "Testing Leaf Ledgers",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "d55eb26e-a357-4ef8-834d-9fc8fbc4a7cc",
                    "name": "Asset duet",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP35",
                    "description": "Asset Duet",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "bbf8ab33-4067-4107-8deb-1e61d87a2523",
                    "name": "Cash account 2344",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP33",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "88cbe0d9-9813-482c-ab43-4ad0a8ead3a3",
                    "name": "Receiving assts",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP0032",
                    "description": "Receiving Assts",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                },
                {
                    "id": "6fbb88d5-2dee-4b05-bd9a-eebac6fdadc1",
                    "name": "Cash account12222",
                    "gl_class": {
                        "id": "3235dcde-d9da-469f-8c39-24d82d8267c8",
                        "name": "Asset",
                        "debit_impact_on_balance": "INCREASE",
                        "credit_impact_on_balance": "DECREASE",
                        "code": "ASST",
                        "children_count": 83,
                        "is_configured": true,
                        "gl_indentifier": "Asset",
                        "gl_identifier": "Asset"
                    },
                    "ledger_code": "ASST0NAP31",
                    "description": "This is where cash needed to run company day-to-day operations are recorded",
                    "state": "OPEN",
                    "post_no_debit": false,
                    "post_no_credit": false
                }
            ]
        }
    ]
    return {
        // useDeactivateProductMutation: jest.fn().mockReturnValue({ handleReject: reject, isSuccess: true, isError: false, error: null, isLoading: false })
        useGetGlClassQuery: jest.fn().mockReturnValue({ data: glClasses, isLoading: false, isSuccess: true, isError: false }),
        useGetLedgersQuery: jest.fn().mockReturnValue({ data: glLedgerQueries, isLoading: false, isSuccess: true, isError: false, refetch: jest.fn(), isFetching: false }),
    }
})

describe('EntriesAndEventsSearchResults', () => {

    // Renders a search input field with a search icon
    it("render, call requests and change value without error", async () => {
        const placeholder = "Search";
        const handleClick = jest.fn();
        const inputName = "searchInput";
        const register = jest.fn();
        const trigger = jest.fn();
        const errors = {};
        const error = "";
        const defaultValue = "";
        const clearFields = false;


        renderWithProviders(
            <div>
                <button>Close</button>   
                <EntriesAndEventsSearchResults
                    placeholder={placeholder}
                    handleClick={handleClick}
                    inputName={inputName}
                    register={register}
                    trigger={trigger}
                    errors={errors}
                    error={error}
                    defaultValue={defaultValue}
                    clearFields={clearFields}
                />
            </div>
        );
        const input = screen.getByTestId("gli-input");
        await userEvent.click(input);
        const assetClass = screen.getByText("Asset");
        await userEvent.click(assetClass);
        await userEvent.click(screen.getByText("Recurrent asset primum"))
        await userEvent.click(screen.getByText(/Asset txt 212/ig))
        expect(input.value).toBe("Asset txt 212");
    });


    it("should close on clickaway", async () => {
        const placeholder = "Search";
        const handleClick = jest.fn();
        const inputName = "searchInput";
        const register = jest.fn();
        const trigger = jest.fn();
        const errors = {};
        const error = "";
        const defaultValue = "";
        const clearFields = false;


        renderWithProviders(
            <div>
                <button>Close</button>   
                <EntriesAndEventsSearchResults
                    placeholder={placeholder}
                    handleClick={handleClick}
                    inputName={inputName}
                    register={register}
                    trigger={trigger}
                    errors={errors}
                    error={error}
                    defaultValue={defaultValue}
                    clearFields={clearFields}
                />
            </div>
        );
        const input = screen.getByTestId("gli-input");
        await userEvent.click(input);
        expect(screen.queryByText("Asset")).toBeInTheDocument();
        await userEvent.click(screen.getByText("Close"));
        expect(screen.queryByText("Asset")).not.toBeInTheDocument();
    });
});
