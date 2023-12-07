export const isChecker: boolean = true;

export const ProductTableHeaders: { hasFilter: boolean; text: string }[] = [
  { hasFilter: false, text: "product name" },
  { hasFilter: false, text: "product code" },
  { hasFilter: false, text: "location" },
  { hasFilter: false, text: "description" },
  { hasFilter: true, text: "state" },
  { hasFilter: true, text: "updated on" },
  { hasFilter: false, text: "" },
];
export const BulkProductHeaders: { hasFilter: boolean; text: string }[] = [
  { hasFilter: false, text: "s/n" },
  { hasFilter: false, text: "product name" },
  { hasFilter: false, text: "generated product code" },
  // { hasFilter: false, text: "location" },
  { hasFilter: true, text: "status" },
  { hasFilter: false, text: "status description" },
  { hasFilter: false, text: "" },
];

export const BulkValidationTableHeaders: {
  hasFilter: boolean;
  text: string;
}[] = [
  { hasFilter: false, text: "S/N" },
  { hasFilter: false, text: "product name" },
  { hasFilter: false, text: "product code" },
  { hasFilter: false, text: "location" },
  { hasFilter: true, text: "status" },
  { hasFilter: false, text: "status description" },

  { hasFilter: false, text: "" },
];

export const RequestTableHeaders: { hasFilter: boolean; text: string }[] = [
  { hasFilter: false, text: "request" },
  { hasFilter: true, text: "type" },
  { hasFilter: true, text: "initiator" },
  { hasFilter: true, text: "reviewer" },
  { hasFilter: true, text: "status" },
  { hasFilter: true, text: "updated on" },
  { hasFilter: false, text: "" },
];

export const DropDownOptions: any = {
  creation: [
    {
      approved: [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
      ],
    },
    {
      "in-issue": [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },

        {
          id: "",
          text: "Delete Request",
          icon: "FaTrash",
        },
      ],
    },
    {
      "in-review": [
        {
          id: "View",
          text: "View",
          icon: "FaEye",
        },
        {
          id: "",
          text: "Withdraw & Modify",
          icon: "FaEdit",
        },
        {
          id: "",
          text: "Withdraw & Delete Request",
          icon: "FaTrash",
        },
      ],
    },
    {
      draft: [
        {
          id: "",
          text: "Continue Request",
          icon: "FaEdit",
        },
        {
          id: "",
          text: "Delete Draft",
          icon: "FaTrash",
        },
      ],
    },
  ],
  activation: [
    {
      approved: [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
      ],
    },
    {
      "in-issue": [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
        {
          id: "",
          text: "Modify",
          icon: "FaEdit",
        },
        {
          id: "",
          text: "Delete Request",
          icon: "FaTrash",
        },
      ],
    },
    {
      "in-review": [
        {
          id: "View",
          text: "View",
          icon: "FaEye",
        },

        {
          id: "",
          text: "Withdraw & Delete Request",
          icon: "FaTrash",
        },
      ],
    },
    {
      draft: [
        {
          id: "",
          text: "Continue Request",
          icon: "FaEdit",
        },
        {
          id: "",
          text: "Delete Request",
          icon: "FaTrash",
        },
      ],
    },
  ],
  active: [
    {
      id: "",
      text: "View",
      icon: "FaEye",
    },
    {
      id: "",
      text: "Modify",
      icon: "FaEdit",
    },
    {
      id: "",
      text: "Clone",
      icon: "FaClone",
    },
    {
      id: "",
      text: "Deactivate",
      icon: "FaBan",
    },
  ],
  inactive: [
    {
      id: "",
      text: "View",
      icon: "FaEye",
    },
    {
      id: "",
      text: "Modify",
      icon: "FaEdit",
    },
    {
      id: "",
      text: "Activate",
      icon: "FaPlayCircle",
    },
  ],
};

export const ActiveFilterOptions: any[] = [
  {
    id: 1,
    name: "active",
    value: 2,
  },
  {
    id: 2,
    name: "inactive",
    value: 1,
  },
];
export const ProductTypes: any[] = [
  {
    id: 0,
    name: "Term Deposit",
  },
  {
    id: 1,
    name: "Treasure Bill",
  },
  {
    id: 2,
    name: "Commercial Paper",
  },
];
export const StatusFilterOptions: any[] = [
  {
    id: 1,
    name: "approved",
    value: 2,
  },
  {
    id: 2,
    name: "in-review",
    value: 1,
  },
  {
    id: 3,
    name: "in-issue",
    value: 3,
  },
  {
    id: 4,
    name: "draft",
    value: 0,
  },
];

export const CheckerStatusFilterOptions: any[] = [
  {
    id: 2,
    name: "approved",
    value: 2,
  },
  {
    id: 1,
    name: "pending",
    value: 1,
  },
  {
    id: 3,
    name: "rejected",
    value: 3,
  },
  {
    id: 0,
    name: "draft",
    value: 0,
  },
];

export const TypeFilterOptions: any[] = [
  {
    id: 0,
    name: "creation",
    value: 0,
  },
  {
    id: 1,
    name: "modification",
    value: 1,
  },
  {
    id: 2,
    name: "deactivation",
    value: 2,
  },
  {
    id: 3,
    name: "reactivation",
    value: 3,
  },
];

export const productFilterOptions: any[] = [
  {
    id: 1,
    name: "Term Deposit",
    value: 0,
  },
  {
    id: 2,
    name: "Commercial Paper",
    value: 2,
  },
  {
    id: 3,
    name: "Treasury Bills",
    value: 1,
  },
];

export const DateFilterOptions: any[] = [
  {
    id: 1,
    name: "All time",
    value: null,
  },
  {
    id: 2,
    name: "Last 7 days",
    value: 7,
  },
  {
    id: 3,
    name: "last 14 days",
    value: 14,
  },
  {
    id: 4,
    name: "last 30 days",
    value: 30,
  },
  {
    id: 5,
    name: "last 3 months",
    value: 90,
  },
  {
    id: 6,
    name: "last 12 months",
    value: 365,
  },
  {
    id: 7,
    name: "Custom",
    value: 0,
  },
];

export const LastRequestReviewStatus = [
  {
    status: "A",
    type: "single",
    request_type: "CREATE",
    text: "Product creation approved",
  },
  {
    status: "R",
    type: "single",
    request_type: "CREATE",
    text: "Product creation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "CREATE",
    text: "Product creation awaiting approval",
  },
  {
    status: "A",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Product creation approved",
  },
  {
    status: "R",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Product creation rejected",
  },
  {
    status: "P",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Product awaiting approval",
  },
  {
    status: "A",
    type: "both",
    request_type: "BULK_CREATE",
    text: "Product creation approved",
  },
  {
    status: "P",
    type: "both",
    request_type: "BULK_CREATE",
    text: "Product creation awaiting approval",
  },
  {
    status: "R",
    type: "both",
    request_type: "CHANGE",
    text: "Product modification rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "CHANGE",
    text: "Product modification awaiting approval",
  },
  {
    status: "R",
    type: "both",
    request_type: "CHANGE",
    text: "Product modification rejected",
  },
  {
    status: "A",
    type: "both",
    request_type: "CHANGE",
    text: "Product modification approved",
  },
  {
    status: "R",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Product deactivation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Product deactivation pending",
  },
  {
    status: "A",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Product deactivation approved",
  },
  {
    status: "R",
    type: "both",
    request_type: "REACTIVATE",
    text: "Product reactivation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "REACTIVATE",
    text: "Product reactivation pending approval",
  },
  {
    status: "A",
    type: "both",
    request_type: "REACTIVATE",
    text: "Product reactivation approved",
  },
];

export const productHeader = [
  {
    label: "product name/code",
    key: "productName",
    options: [
      {
        id: 1,
        name: "",
        value: "",
      },
    ],
    hasSelect: false,
    hasDateSelect: false,
  },
  {
    label: "product type",
    key: "productType",
    options: productFilterOptions,
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "state",
    key: "state",
    options: ActiveFilterOptions,
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "updated on",
    key: "updatedOn",
    options: [],
    hasSelect: false,
    hasDateSelect: true,
  },
  {
    label: "",
    options: [],
    hasSelect: false,
    hasDateSelect: false,
    key: "actions",
  },
];
export const requestHeader = [
  {
    label: "request",
    key: "request",
    options: [
      {
        id: 1,
        name: "",
        value: "",
      },
    ],
    hasSelect: false,
    hasDateSelect: false,
  },
  {
    label: "type",
    key: "requestType",
    options: TypeFilterOptions,
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "initiator",
    key: "created_By",
    options: [],
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "reviewer",
    key: "approved_By",
    options: [],
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "status",
    key: "requestStatus",
    options: StatusFilterOptions,
    hasSelect: true,
    hasDateSelect: false,
  },
  {
    label: "updated on",
    key: "updatedOn",
    options: [
      {
        id: 1,
        name: "",
        value: "",
      },
    ],
    hasSelect: false,
    hasDateSelect: true,
  },
  {
    label: "",
    options: [],
    hasSelect: false,
    hasDateSelect: false,
    key: "actions",
  },
];
export const ButtonOptions  = [
  {
    title: "Deposit",
    key: "deposit",
    isUrl: false,
    permission:"CREATE_INVESTMENT_PRODUCT",
    links: [
      {
        title: "Current",
        key: "current",
        isUrl: true,
        url: "/product/factory/current/create-new-product/1",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },

      {
        title: "Savings",
        key: "savings",
        isUrl: true,
        url: "/product/factory/savings/create-new-product/1",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
    ],
  },
  {
    title: "Credit",
    key: "credit",
    isUrl: false,
    permission:"CREATE_INVESTMENT_PRODUCT",
    links: [
      {
        title: "Loans",
        key: "loans",
        isUrl: false,
        url: "#",
        permission:"CREATE_INVESTMENT_PRODUCT",
        links: [
          {
            title: "Individual Loans",
            key: "individual-loans",
            isUrl: true,
            url: "#",
            permission:"CREATE_INVESTMENT_PRODUCT"
          },
          {
            title: "Commercial loans",
            key: "commercial-loans",
            isUrl: false,
            url: "#",
            permission:"CREATE_INVESTMENT_PRODUCT",
            links: [
              {
                title: "SME Loans",
                key: "sme-loans",
                isUrl: true,
                url: "#",
                permission:"CREATE_INVESTMENT_PRODUCT"
              },
              {
                title: "Corporate loans",
                key: "corporate-loans",
                isUrl: true,
                url: "#",
                permission:"CREATE_INVESTMENT_PRODUCT"
              },
            ],
          },
        ],
      },
      {
        title: "Overdraft",
        key: "overdraft",
        isUrl: true,
        url: "#",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
    ],
  },
  {
    title: "Over the counter payment",
    key: "counter-payment",
    isUrl: false,
    permission:"CREATE_INVESTMENT_PRODUCT",
    links: [
      {
        title: "Cash withdrawal",
        key: "cash-withdrawal",
        isUrl: true,
        url: "/product/factory/payment/over-the-counter/cash-withdrawal/1",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
      {
        title: "Within bank transfer",
        key: "within-bank-transfer",
        isUrl: true,
        url: "/product/factory/payment/over-the-counter/within-bank-transfer/1",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
      {
        title: "Other bank transfer",
        key: "other-bank-transfer",
        isUrl: true,
        url: "/product/factory/payment/over-the-counter/other-bank-transfer/1",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
    ],
  },
  {
    title: "Investment",
    key: "investment",
    isUrl: false,
    permission:"CREATE_INVESTMENT_PRODUCT",
    links: [
      {
        title: "Term deposits",
        key: "term-deposits",
        isUrl: true,
        url: "term-deposit/create",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
      {
        title: "Treasury Bill",
        key: "treasury-bill",
        isUrl: true,
        url: "#",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
      {
        title: "Commercial paper",
        key: "commercial-paper",
        isUrl: true,
        url: "#",
        permission:"CREATE_INVESTMENT_PRODUCT"
      },
    ],
  },
];