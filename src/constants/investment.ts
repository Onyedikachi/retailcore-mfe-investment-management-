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
];
export const CheckerStatusRequests = [
  {
    id: 1,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "approved",
    color: "#2FB755",
  },
  {
    id: 3,
    type: "pending",
    color: "#3FA2F7",
  },
  {
    id: 4,
    type: "rejected",
    color: "#CF2A2A",
  },
  {
    id: 5,
    type: "draft",
    color: "#AAAAAA",
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

export const creationMap = [
  "create",
  "creation",
  "modification",
  "bulk creation",
  "bulk_create",
  "change",
  "deactivation",
];
export const colorState = {
  approved: "bg-[#D4F7DC] text-[#15692A]",
  active: "bg-[#D4F7DC] text-[#15692A]",
  inactive: "bg-[#E5E5EA] text-[#1E0A3C]",
  "in-review": "bg-[#F0F5FF] text-[#0050C8]",
  "in-issue": "bg-[#FFD4D2] text-[#9F1F17]",
  rejected: "bg-[#FFD4D2] text-[#9F1F17]",
  draft: "bg-[#E5E5EA] text-[#1E0A3C]",
};
export const productNameRegex = /^[A-Za-z0-9\s]+$/;
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
    label: "Accounting entries and events",
    index: 5,
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

export const interestComputationDaysOptions = [
  {
    id: "30E/360",
    text: "30E/360",
    value: "30E/360",
  },
  {
    id: "Actual/360",
    text: "Actual/360",
    value: "Actual/360",
  },
  {
    id: "Actual/365",
    text: "Actual/365",
    value: "Actual/365",
  },
];

export const CustomerCategory = {
  0: "Individual",
  1: "Corporate",
};

export const ProductType = {
  0: "Term Deposit",
  1: "Treasure Bill",
  2: "Commercial Paper",
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

export const InterestComputationMethod = {
  0: "E360",
  1: "Actual360",
  2: "Actual365",
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
