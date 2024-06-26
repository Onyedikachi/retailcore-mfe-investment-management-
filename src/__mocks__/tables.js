export const ProductData = [
  {
    id: 1,
    productName: "Product Royal",
    productCode: "TM-01",
    description: "Leading with excellent customer search for the item",
    state: "active",
    updated_At: new Date(),
    isNew: false,
    isNameEdited: true,
  },
  {
    id: 2,
    productName: "Product Sunshine",
    productCode: "TM-02",
    description: "Leading with excellent customer  search for the item",
    state: "inactive",
    updated_At: new Date(),
    isNew: false,
    isNameEdited: false,
  },
  {
    id: 3,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Leading with excellent customer  search for the item",
    state: "active",
    updated_At: new Date(),
    isNew: true,
    isNameEdited: false,
  },
];

export const MockProductList = [
  {
    id: "1",
    name: "Akatsuki",
    code: "DWSK_P4IN",
    description: "Stuff",
    status: "P",
    created_at: "2023-08-05T00:41:21.388643Z",
    updated_at: "2023-08-05T00:41:21.388643Z",
  },
  {
    id: "2",
    name: "Akatsuki",
    code: "A-DWSK_P4IN",
    description: "Stuff",
    status: "A",
    created_at: "2023-08-05T00:41:21.388643Z",
    updated_at: "2023-08-05T00:41:21.388643Z",
  },
  {
    id: "3",
    name: "Akatsuki",
    code: "R-DWSK_P4IN",
    description: "Stuff",
    status: "R",
    created_at: "2023-08-05T00:41:21.388643Z",
    updated_at: "2023-08-05T00:41:21.388643Z",
  },
  {
    id: "4",
    name: "Akatsuki",
    code: "I-DWSK_P4IN",
    description: "Stuff",
    status: "I",
    created_at: "2023-08-05T00:41:21.388643Z",
    updated_at: "2023-08-05T00:41:21.388643Z",
  },
  {
    id: "5",
    name: "Akatsuki",
    code: "D-DWSK_P4IN",
    description: "Stuff",
    status: "D",
    created_at: "2023-08-05T00:41:21.388643Z",
    updated_at: "2023-08-05T00:41:21.388643Z",
  },
];

export const RequestData = [
  {
    id: 1,
    request: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "approved",
    updated_At: new Date(),
  },
  {
    id: 6,
    request: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "in-review",
    updated_At: new Date(),
  },
  {
    id: 2,
    request: "Deactivation of Sunshine",
    type: "Bulk Creation",
    initiator: "John wick",
    status: "in-review",
    updated_At: new Date(),
  },
  {
    id: 3,
    request: "Creation of Product 1, Product 2, Product 3,Product 4, Product 5",
    type: "Deactivation",
    initiator: "John wick",
    status: "in-issue",
    updated_At: new Date(),
  },
  {
    id: 4,
    request: "Creation of Product Royal",
    type: "Activation",
    initiator: "John wick",
    status: "draft",
    updated_At: new Date(),
  },
  {
    id: 5,
    request: "Creation of Product Royal",
    type: "Modification",
    initiator: "John wick",
    status: "approved",
    updated_At: new Date(),
  },
];

export const BulkValidation = [
  {
    id: 1,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "Failed",
    updated_At: new Date(),
  },
  {
    id: 2,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "Failed",
    updated_At: new Date(),
  },
  {
    id: 3,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "Failed",
    updated_At: new Date(),
  },
  {
    id: 4,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "Failed",
    updated_At: new Date(),
  },
  {
    id: 5,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",
    type: "Creation",
    initiator: "John wick",
    status: "Failed",
    updated_At: new Date(),
  },
];

export const BulkValidationSummary = [
  {
    id: 1,
    productName: "Product Pride",
    productCode: "TM-03",
    description: "Creation of Product Royal",

    updated_At: new Date(),
  },
];

export const ProductStructureData = [
  {
    id: 1,
    name: "Okoro Ifeanyi",
    detail: ["cpc cso initiator", "product teller initiator", "it admin"],
  },
  {
    id: 2,
    name: "Okoro Ifeanyi",
    detail: ["cpc cso initiator", "product teller initiator", "it admin"],
  },
  {
    id: 3,
    name: "Okoro Ifeanyi",
    detail: ["cpc cso initiator", "product teller initiator", "it admin"],
  },
  {
    id: 4,
    name: "Okoro Ifeanyi",
    detail: ["cpc cso initiator", "product teller initiator", "it admin"],
  },
  {
    id: 5,
    name: "Okoro Ifeanyi",
    detail: ["cpc cso initiator", "product teller initiator", "it admin"],
  },
];

export const Ledgers = [
  {
    id: 1,
    name: "Leaf ledger 1",
    code: "ledger code",
    currency: "NGN",
    netBalance: "20,000.00 DR",
  },
  {
    id: 2,
    name: "Leaf ledger 2",
    code: "ledger code",
    currency: "EUR",
    netBalance: "40,000.00 DR",
  },
];

export const LedgerHeaders = [
  "Ledger",
  "Currency",
  "Net Balance",
  "Move Balance To",
];

export const UsersForDeactivation = [
  {
    id: 1,
    name: "Okoro Ifeanyi",
    active: false,
  },
  {
    id: 2,
    name: "Okoro Ifeanyi",
    active: true,
  },
  {
    id: 3,
    name: "Okoro Ifeanyi",
    active: false,
  },
];
