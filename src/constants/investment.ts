export const RequiredInvestmentProductPermissions = [
  "CREATE_INVESTMENT_PRODUCT",
  "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
  "VIEW_ALL_INVESTMENT_PRODUCT_RECORDS",
  "VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS",
  "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT",
];
export const RequiredInvestmentPermissions = [
  "VIEW_ALL_INVESTMENT_RECORDS",
  "VIEW_ALL_INVESTMENT_REQUESTS",
  "BOOK_INVESTMENT",
  "LIQUIDATE_INVESTMENT",
  "AUTHORIZE_INVESTMENT_MANAGEMENT_REQUESTS",
];
export const RequiredCreditPermissions = ["CREATE_CREDIT_PRODUCT"];
export const RequiredDepositPermissions = ["CREATE_DEPOSIT_PRODUCT"];
export const RequiredPaymentPermissions = ["CREATE_PAYMENT_PRODUCT"];
export const MODULENAME = "ProductFactory";

export const StatusCategories = [
  {
    id: 1,
    type: "all products",
  },
  {
    id: 2,
    type: "requests",
  },
];
export const FactoryCategories = [
  {
    id: 1,
    type: "all products",
  },
  {
    id: 2,
    type: "requests",
  },
];
export const ManagementCategories = [
  {
    id: 1,
    type: "investments",
  },
  {
    id: 2,
    type: "requests",
  },
];

export const StatusTypes = [
  {
    id: 0,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "active",
    color: "#2FB755",
  },
  {
    id: 1,
    type: "inactive",
    color: "#AAAAAA",
  },
];

export const SecurityStatusTypes = [
  {
    id: 0,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "active",
    color: "#2FB755",
  },
  {
    id: 1,
    type: "liquidated",
    color: "#AAAAAA",
  },
];
export const IndividualStatusTypes = [
  {
    id: 0,
    type: "all",
    color: "#252C32",
  },
  {
    id: 1,
    type: "active",
    color: "#2FB755",
  },
  {
    id: 2,
    type: "liquidated",
    color: "#AAAAAA",
  },
];

export const StatusRequests = [
  {
    id: null,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "approved",
    color: "#2FB755",
  },
  {
    id: 1,
    type: "in-review",
    color: "#3FA2F7",
  },
  {
    id: 3,
    type: "in-issue",
    color: "#CF2A2A",
  },
  {
    id: 0,
    type: "draft",
    color: "#AAAAAA",
  },
  {
    id: 1,
    type: "pending",
    color: "#3FA2F7",
  },
  {
    id: 3,
    type: "rejected",
    color: "#CF2A2A",
  },
];
export const CheckerStatusRequests = [
  {
    id: null,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "approved",
    color: "#2FB755",
  },
  {
    id: 1,
    type: "pending",
    color: "#3FA2F7",
  },
  {
    id: 3,
    type: "rejected",
    color: "#CF2A2A",
  },
  {
    id: 0,
    type: "draft",
    color: "#AAAAAA",
  },
];

export const InvestmentRequestOptions = [
  {
    id: 1,
    text: "Initiated by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Initiated by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Initiated system-wide",
    value: "created_by_anyone",
    disabled: false,
  },

  {
    id: 4,
    text: "Sent to me",
    value: "sent_to_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Sent to my branch",
    value: "sent_to_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Sent system-wide",
    value: "sent_system_wide",
    disabled: false,
  },
];

export const InvestmentProductOptions = [
  {
    id: 1,
    text: "Created by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Created by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Created system-wide",
    value: "created_system_wide",
    disabled: false,
  },

  {
    id: 4,
    text: "Approved by me",
    value: "approved_by_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Approved by my branch",
    value: "approved_by_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Approved system-wide",
    value: "approved_system_wide",
    disabled: false,
  },
];

export const ProductOptions = [
  {
    id: 1,
    text: "Created by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Created by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Created system-wide",
    value: "created_by_anyone",
    disabled: false,
  },

  {
    id: 4,
    text: "Approved by me",
    value: "approved_by_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Approved by my branch",
    value: "approved_by_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Approved system-wide",
    value: "approved_system_wide",
    disabled: false,
  },
];
export const CreateProductOptions = [
  {
    id: 1,
    text: "Created by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Created by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Created system-wide",
    value: "created_by_anyone",
    disabled: false,
  },
];
export const ApproveProductOptions = [
  {
    id: 4,
    text: "Approved by me",
    value: "approved_by_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Approved by my branch",
    value: "approved_by_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Approved system-wide",
    value: "approved_system_wide",
    disabled: false,
  },
];

export const RequestOptions = [
  {
    id: 1,
    text: "Initiated by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Initiated by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Initiated system-wide",
    value: "created_by_anyone",
    disabled: false,
  },

  {
    id: 4,
    text: "Sent to me",
    value: "sent_to_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Sent to my branch",
    value: "sent_to_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Sent system-wide",
    value: "sent_to_anyone",
    disabled: false,
  },
];
export const CreateRequestOptions = [
  {
    id: 1,
    text: "Initiated by me",
    value: "created_by_me",
    disabled: false,
  },
  {
    id: 2,
    text: "Initiated by my branch",
    value: "created_by_my_branch",
    disabled: false,
  },
  {
    id: 3,
    text: "Initiated system-wide",
    value: "created_by_anyone",
    disabled: false,
  },
];
export const ApproveRequestOptions = [
  {
    id: 4,
    text: "Sent to me",
    value: "sent_to_me",
    disabled: false,
  },
  {
    id: 5,
    text: "Sent to my branch",
    value: "sent_to_my_branch",
    disabled: false,
  },
  {
    id: 6,
    text: "Sent system-wide",
    value: "sent_to_anyone",
    disabled: false,
  },
];

export const creationMap = [
  "create",
  "creation",
  "modification",
  "bulk creation",
  "bulk_create",
  "change",
  "deactivation",
  "booking",
  "part liquidation",
  "early liquidation",
];
export const colorState = {
  approved: "bg-[#D4F7DC] text-[#15692A]",
  active: "bg-[#D4F7DC] text-[#15692A]",
  inactive: "bg-[#E5E5EA] text-[#1E0A3C]",
  "in-review": "bg-[#F0F5FF] text-[#0050C8]",
  "in-issue": "bg-[#FFD4D2] text-[#9F1F17]",
  rejected: "bg-[#FFD4D2] text-[#9F1F17]",
  draft: "bg-[#E5E5EA] text-[#1E0A3C]",
  liquidated: "bg-[#E5E5EA] text-[#1E0A3C]",
};
export const productNameRegex = /^[A-Za-z0-9\s]+$/;
export const securityPurchageFormSteps = [
  {
    id: 1,
    label: "Facility Details",
    index: 1,
  },
  {
    id: 2,
    label: "Accounting Entries",
    index: 2,
  },
];
export const BookInvestmentFormSteps = [
  {
    id: 1,
    label: "Customer Information",
    index: 1,
  },
  {
    id: 2,
    label: "Facility Details",
    index: 2,
  },
  {
    id: 3,
    label: "Transaction Settings",
    index: 3,
  },
];
export const treasuryBillFormSteps = [
  {
    id: 1,
    label: "Product Information",
    index: 1,
  },
  {
    id: 2,
    label: "Customer Eligibility Criteria",
    index: 2,
  },
  {
    id: 3,
    label: "Pricing Configuration",
    index: 3,
  },
  {
    id: 4,
    label: "Early & part liquidity setup",
    index: 4,
  },
  {
    id: 5,
    label: "Product to GL mapping & events",
    index: 5,
  },
];
export const termDepositFormSteps = [
  {
    id: 1,
    label: "Product Information",
    index: 1,
  },
  {
    id: 2,
    label: "Customer Eligibility Criteria",
    index: 2,
  },
  {
    id: 3,
    label: "Pricing Configuration",
    index: 3,
  },
  {
    id: 4,
    label: "Early & part liquidity setup",
    index: 4,
  },
  {
    id: 5,
    label: "Product to GL mapping & events",
    index: 5,
  },
];
export const moneyMarketFormSteps = [
  {
    id: 1,
    label: "Product Information",
    index: 1,
  },
  {
    id: 2,
    label: "Pricing Configuration",
    index: 2,
  },

  {
    id: 3,
    label: "Product to GL mapping & events",
    index: 3,
  },
  {
    id: 4,
    label: "Charges and Taxes setup",
    index: 4,
  },
];

export const partLiquidationPenaltyOptions = [
  {
    id: "0",
    text: "None",
    value: "None",
  },
  {
    id: "1",
    text: "Forfeit all accrued interest",
    value: "Forfeit all accrued interest",
  },
  {
    id: "2",
    text: "Forfeit a portiom of accrued interest",
    value: "Forfeit a portiom of  accrued interest",
  },
  {
    id: "3",
    text: "Recalculate accrued interest",
    value: "Recalculate accrued interest",
  },
  {
    id: "4",
    text: "Take a charge",
    value: "Take a charge",
  },
];

export const daysOptions = [
  {
    id: "1",
    text: "1 Day",
    value: "1",
  },
  {
    id: "2",
    text: "2 Days",
    value: "2",
  },
  {
    id: "3",
    text: "3 Days",
    value: "3",
  },
  {
    id: "4",
    text: "4 Days",
    value: "4",
  },
];

export const CustomerCategory = {
  0: "Individual",
  1: "Corporate",
  2: "security purchase",
};
export const CustomerCategoryType = {
  individual: 0,
  corporate: 1,
  "security purchase": 2,
  // Add other category types here
};
export const MoneyMarketGlType = {
  0: "Issue To Customer",
  1: "Upfront Interest Payment",
  2: "Redemption At Maturity",
};
export const ProductType = {
  0: "Term Deposit",
  1: "Treasury Bill",
  2: "Commercial Paper",
  3: "Bonds",
};
export const ProductOptionTypes = {
  "term-deposit": 0,
  "treasury-bill": 1,
  "commercial-paper": 2,
  bonds: 3,
};
export const AProductOptionTypes = {
  0: "term-deposit",
  1: "treasury-bill",
  2: "commercial-paper",
  3: "bonds",
};
export const MoneyMarketCategory = {
  0: "Term Deposit",
  1: "Treasury Bill",
  2: "Commercial Paper",
  3: "Bonds",
};

export const StartdateType = {
  0: "On Approval",
  1: "Scheduled date",
};

export const ProductState = {
  0: "Pending",
  1: "Inactive",
  2: "Active",
};

export const InterestRateRangeType = {
  0: "Vary By Principal",
  1: "Vary By Tenor",
  2: "Do not Vary",
};
export const VaryOptions = [
  {
    id: "Vary by principal",
    title: "Vary by principal",
    value: 0,
  },
  { id: "Vary by tenor", title: "Vary by tenor", value: 1 },
  {
    id: "Do not vary by principal or tenor",
    title: "Do not vary by principal or tenor",
    value: 2,
  },
];

export const InterestComputationMethod = {
  0: "Actual/Actual",
  1: "Actual/360",
  2: "Actual/365",
};

export const RequestType = {
  0: "Create",
  1: "Modify",
  2: "Deactivation",
  3: "Reactivation",
};

export const InvestmentBookingStatus = {
  0: "Pending",
  1: "Active",
  2: "Liquidated",
};

export const CapitalizationMethod = {
  0: "Upon Booking",
  1: "At Intervals",
  2: "At Maturity",
};

export const RollOverOption = {
  0: "Using Principal",
  1: "Using Principal + Interest",
};

export const InvestmentBookingRequestType = {
  0: "Booking",
  1: "Early Liquidation",
  2: "Part Liquidation",
  4: "Generate certificate",
  3: "Restructure",
};

export const RequestStatus = {
  0: "Draft",
  1: "In-Review",
  2: "Approved",
  3: "In-Issue",
};

export const Interval = {
  0: "hours",
  1: "days",
  2: "weeks",
  3: "months",
  4: "years",
};

export const IntervalOptions = [
  {
    id: "1",
    text: "Days",
    value: 1,
    subvalue: "day",
  },
  {
    id: "2",
    text: "Weeks",
    value: 2,
    subvalue: "week",
  },
  {
    id: "3",
    text: "Months",
    value: 3,
    subvalue: "month",
  },
  {
    id: "4",
    text: "Years",
    value: 4,
    subvalue: "year",
  },
];
export const interestComputationDaysOptions = [
  {
    id: "Actual/Actual",
    text: "Actual/Actual",
    value: 0,
  },
  {
    id: "Actual/360",
    text: "Actual/360",
    value: 1,
  },
  {
    id: "Actual/365",
    text: "Actual/365",
    value: 2,
  },
];

export const liquidities = {
  0: "None",
  1: "ForfietAll",
  2: "ForfietPortion",
  3: "RecalculateInterest",
  4: "TakeCharge",
};

export const liquiditiesPenaltyStrings = {
  0: "None",
  1: "Forfeit all accrued interest",
  2: "Forfeiture of % of accrued interests",
  3: "Recalculate accrued interest of %",
  4: "Charge",
};

export const LiquidityOptions = [
  {
    id: "none",
    text: "None",
    value: 0,
  },
  {
    id: "ForfietAll",
    text: "Forfeit all accrued interest",
    value: 1,
  },
  {
    id: "ForfietPortion",
    text: "Forfeit a portion of accrued interest",
    value: 2,
  },
  {
    id: "RecalculateInterest",
    text: "Recalculate accrued interest ",
    value: 3,
  },
  {
    id: "TakeCharge",
    text: "Take a charge",
    value: 4,
  },
  // {
  //   id: "ComparePenalties",
  //   text: "Compare Penalties",
  //   value: 5,
  // },
];
export const ApplyOptions = [
  {
    id: 1,
    text: "The smallest of:",
    value: "The smallest of:",
  },
  {
    id: 2,
    text: "The largest of:",
    value: "The largest of:",
  },
  {
    id: 3,
    text: "The average of:",
    value: "The average of:",
  },
  {
    id: 4,
    text: "The sum of:",
    value: "The sum of:",
  },
];

export const rangeLabels = {
  0: {
    leftClass: "",
    rightClass: "",
  },
  1: {
    leftClass: "",
    rightClass: "opacity-40",
  },
  2: {
    leftClass: "opacity-40",
    rightClass: "opacity-40",
  },
  3: {
    leftClass: "opacity-40",
    rightClass: "opacity-40",
  },
};

export const tabLinks = [
  {
    name: "Assets",
    menu: [
      {
        name: "Current Assets [ASTCAS]",
        subMenu: [
          { name: "Current Account balances [ASTCAS23421]" },
          { name: "Savings Account balances [ASTCAS23422]" },
          { name: "Cash Receipt balances [ASTCAS23423]" },
          { name: "Current Account balances [ASTCAS23424]" },
          { name: "Current Account balances [ASTCAS23424]" },
        ],
        isOpen: false,
      },
      {
        name: "Non Current Asets",
        subMenu: [{ name: "subMenu name2" }],
        isOpen: false,
      },
    ],
  },
  {
    name: "Liabilities",
    menu: [
      {
        name: "Current Liabilities [ASTCAS]",
        subMenu: [
          { name: "Current Account balances [ASTCAS23421]" },
          { name: "Savings Account balances [ASTCAS23422]" },
          { name: "Cash Receipt balances [ASTCAS23423]" },
          { name: "Current Account balances [ASTCAS23424]" },
          { name: "Current Account balances [ASTCAS23424]" },
        ],
        isOpen: false,
      },
      {
        name: "Non Current Liabilities",
        subMenu: [{ name: "subMenu name2" }],
        isOpen: false,
      },
    ],
  },
  {
    name: "Equities",
    menu: [
      {
        name: "Current Equities [ASTCAS]",
        subMenu: [
          { name: "Current Account balances [ASTCAS23421]" },
          { name: "Savings Account balances [ASTCAS23422]" },
          { name: "Cash Receipt balances [ASTCAS23423]" },
          { name: "Current Account balances [ASTCAS23424]" },
          { name: "Current Account balances [ASTCAS23424]" },
        ],
        isOpen: false,
      },
      {
        name: "Non Current Equities",
        subMenu: [{ name: "subMenu name2" }],
        isOpen: false,
      },
    ],
  },
  {
    name: "Revenues",
    menu: [
      {
        name: "Current Revenues [ASTCAS]",
        subMenu: [
          { name: "Current Account balances [ASTCAS23421]" },
          { name: "Savings Account balances [ASTCAS23422]" },
          { name: "Cash Receipt balances [ASTCAS23423]" },
          { name: "Current Account balances [ASTCAS23424]" },
          { name: "Current Account balances [ASTCAS23424]" },
        ],
        isOpen: false,
      },
      {
        name: "Non Current Revenues",
        subMenu: [{ name: "subMenu name2" }],
        isOpen: false,
      },
    ],
  },
  {
    name: "Expenses",
    menu: [
      {
        name: "Current Expenses [ASTCAS]",
        subMenu: [
          { name: "Current Account balances [ASTCAS23421]" },
          { name: "Savings Account balances [ASTCAS23422]" },
          { name: "Cash Receipt balances [ASTCAS23423]" },
          { name: "Current Account balances [ASTCAS23424]" },
          { name: "Current Account balances [ASTCAS23424]" },
        ],
        isOpen: false,
      },
      {
        name: "Non Current Expenses",
        subMenu: [{ name: "subMenu name2" }],
        isOpen: false,
      },
    ],
  },
];

export const summaryLinks = [
  {
    id: 1,
    title: "Product Factory",
    url: "/product-factory/dashboard/investment",
  },
  {
    id: 2,
    title: "Investment",
    url: "/product-factory/investment",
  },
  {
    id: 3,
    title: "#",
    url: "#",
  },
  {
    id: 4,
    title: "Process summary",
    url: "#",
  },
];

export const biodataField = [
  {
    label: "Title",
    key: "title",
    type: "",
  },
  {
    label: "Surname",
    key: "surname",
    type: "",
  },
  {
    label: "First name",
    key: "firstName",
    type: "",
  },
  {
    label: "Other names",
    key: "otherNames",
    type: "",
  },
  {
    label: "Mother's maiden name",
    key: "maidenName",
    type: "",
  },
  {
    label: "Gender",
    key: "gender",
    type: "",
  },
  {
    label: "Marital status",
    key: "maritalStatus",
    type: "",
  },
  {
    label: "Date of birth",
    key: "dateOfBirth",
    type: "date",
  },
  {
    label: "Country",
    key: "country",
    type: "",
  },
  {
    label: "State of origin",
    key: "stateOfOrigin",
    type: "",
  },
  {
    label: "Lga",
    key: "lga",
    type: "",
  },
  {
    label: "Dual citizenship",
    key: "citizenship",
    type: "",
  },
  {
    label: "If yes, specify",
    key: "specify",
    type: "",
  },
];

export const identity = [
  {
    label: "BVN",
    key: "bvn",
    type: "",
  },
  {
    label: "Choose an Id",
    key: "choose id",
    type: "",
  },
  {
    label: "ID Number",
    key: "idNumber",
    type: "",
  },
  {
    label: "Issue date",
    key: "issueDate",
    type: "date",
  },
  {
    label: "Expiry date",
    key: "expiryDate",
    type: "date",
  },
];

export const contact = [
  {
    label: "Residential address",
    key: "residentialAddress",
    type: "",
  },
  {
    label: "Detailed description of address",
    key: "detailedDescriptionOfAddress",
    type: "",
  },
  {
    label: "country",
    key: "country",
    type: "",
  },
  {
    label: "state",
    key: "ci_stateOfOrigin",
    type: "",
  },
  {
    label: "city/town",
    key: "city",
    type: "",
  },
  {
    label: "LGA",
    key: "ci_lga",
    type: "",
  },
  {
    label: "Mobile number",
    key: "mobileNumber",
    type: "",
  },
  {
    label: "Alternate phone number",
    key: "alternateMobileNumber",
    type: "",
  },
  {
    label: "Email address",
    key: "emailAddress",
    type: "",
  },
  {
    label: "Mailing address is same as residential address",
    key: "mailingAddressSameAsResidentialAddress",
    type: "",
  },
];

export const kinDetail = [
  {
    label: "Title",
    key: "title",
    type: "",
  },
  {
    label: "surname",
    key: "surname",
    type: "",
  },
  {
    label: "first name",
    key: "firstName",
    type: "",
  },
  {
    label: "other name",
    key: "otherNames",
    type: "",
  },
  {
    label: "relationship",
    key: "relationship",
    type: "",
  },
  {
    label: "gender",
    key: "gender",
    type: "",
  },
  {
    label: "date of birth",
    key: "dateOfBirth",
    type: "date",
  },
  {
    label: "residential address",
    key: "residentialAddress",
    type: "",
  },
  {
    label: "detailed description of address",
    key: "detailedDescriptionOfResidentialAddress",
    type: "",
  },
  {
    label: "country",
    key: "country",
    type: "",
  },
  {
    label: "state",
    key: "state",
    type: "",
  },
  {
    label: "city/town",
    key: "city",
    type: "",
  },
  {
    label: "LGA",
    key: "titlgale",
    type: "",
  },
  {
    label: "mobile number",
    key: "mobileNumber",
    type: "",
  },
  {
    label: "alternate phone number",
    key: "alternateMobileNumber",
    type: "",
  },
];

export const documentation = [
  {
    label: "customer's photo",
    key: "customerPhoto",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "customer's signature",
    key: "customerSignature",
    type: "array",
    subkey: "",
  },
  {
    label: "proof of identity",
    key: "validId",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "proof of address",
    key: "proofOfResidenceAddress",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "residential permit",
    key: "residentialPermit",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "marriage certificate",
    key: "marriageCertificate",
    type: "array",
    subkey: "signedUrl",
  },

  {
    label: "letter from employer/school/NYSC",
    key: "letterFromEmployerSchoolNusc",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "independent satisfactory references",
    key: "independentSatisfactoryRefrence",
    type: "array",
    subkey: "signedUrl",
  },
  {
    label: "other documents provided",
    key: "otherUncategorisedDocuments",
    type: "array",
    subkey: "signedUrl",
  },
];

export const detailData = [
  {
    title: "Biodata",
    data: biodataField,
  },
  {
    title: "Identity Verification",
    data: identity,
  },
  {
    title: "Contact Information",
    data: contact,
  },
  {
    title: "Details of Next of Kin",
    data: kinDetail,
  },

  {
    title: "Documentation",
    data: documentation,
  },
];

export const companyDetails = [
  {
    label: "Category of Business",
    key: "categoryOfBusiness",
    type: "",
  },
  {
    label: "CompanyName/Business",
    key: "companyNameBusiness",
    type: "",
  },
  {
    label: "Certificate Of Incorporation",
    key: "certificateOfIncorporation",
    type: "",
  },
  {
    // ?
    label: "Jurisdiction of Incorporation/Registration",
    key: "jurisdictionOfIncorporation",
    type: "date",
  },
  {
    label: "Nature Of Business",
    key: "natureOfBusiness",
    type: "",
  },
  {
    // ?
    label: "Sector/Industry",
    key: "sector",
    type: "",
  },
  {
    label: "Tax Identification Number",
    key: "taxIdentificationNumber",
    type: "",
  },
]

export const companyAddress = [
  {
    label: "Operating Business Address 1",
    key: "operatingBusinessAddress1",
    type: "",
  },
  {
    label: "Detailed description of address",
    key: "detailedDescriptionOfAddress",
    type: "",
  },
  {
    label: "Operating Business Address 2",
    key: "operatingBusinessAddress2",
    type: "",
  },
  {
    label: "Detailed description of address 2",
    key: "detailedDescriptionOfAddress2",
    type: "",
  },
  {
    label: "Corporate Business Address",
    key: "corporateBusinessAddress",
    type: "",
  },
  {
    label: "Address/Registered Office (If different from Above",
    key: "detailedAddressOfResidentialAddress",
    type: "",
  },
  {
    label: "Mobile Number",
    key: "mobileNumber",
    type: "",
  },
  {
    label: "Alternate Phone Number",
    key: "alternateMobileNumber",
    type: "",
  },
]

export const accountSignatory = []

export const corporateDetailData = [
  {
    title: "Company Details",
    data: companyDetails
  },
  {
    title: "Company Address",
    data: companyAddress
  },
  {
    title: "Account Signatory",
    data: accountSignatory
  },
]

export const CapitalizationOptions = [
  {
    id: 3,
    text: "At Maturity",
    value: 2,
  },

  {
    id: 2,
    text: "At Interval",
    value: 1,
  },
  {
    id: 1,
    text: "Upon booking",
    value: 0,
  },
];

export const GlAccountTypes = [
  "Term deposit account",
  "Interest accural account",
  "Interest expense account",
];
export const RollOverOptions = [
  {
    id: 1,
    text: "Using principal",
    value: 0,
  },
  {
    id: 1,
    text: "Using principal + Interest",
    value: 1,
  },
];

export const AccountStatus = {
  1: "Active",
  2: "Inactive",
};

export const AccountCategories = {
  0: "Casa",
  1: "Internal",
  2: "Loan",
  3: "Investment",
  4: "Till",
};

export const StartDateOptions = [
  {
    text: "On Approval",
    value: 0,
  },
  {
    text: "On Scheduled date",
    value: 1,
  },
];

export const intervalOptions = [
  {
    id: 1,
    text: "Semi-Anually",
    value: 1,
  },

  {
    id: 2,
    text: "Anually",
    value: 2,
  },
  {
    id: 3,
    text: "Quarterly",
    value: 3,
  },
  {
    id: 4,
    text: "Monthly",
    value: 4,
  },
];

export const productCategoryOptions = [
  {
    id: 1,
    text: "Bonds",
    value: 3,
  },

  {
    id: 2,
    text: "Commercial Paper",
    value: 2,
  },
  {
    id: 3,
    text: "Treasury Bills",
    value: 1,
  },
];
