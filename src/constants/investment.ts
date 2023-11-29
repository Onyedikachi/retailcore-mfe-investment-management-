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
    id: 1,
    type: "all",
    color: "#252C32",
  },
  {
    id: 2,
    type: "active",
    color: "#2FB755",
  },
  {
    id: 2,
    type: "inactive",
    color: "#AAAAAA",
  },
];

export const StatusRequests = [
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
    id: 2,
    type: "in-review",
    color: "#3FA2F7",
  },
  {
    id: 2,
    type: "in-issue",
    color: "#CF2A2A",
  },
  {
    id: 2,
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
export const branchNameRegex = /^[A-Za-z0-9\s]+$/;
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
    label: "Pricing CConfiguration",
    index: 3,
  },
  {
    id: 4,
    label: "Early & part  liquidity setup",
    index: 4,
  },
  {
    id: 5,
    label: "Acccounting entries and events",
    index: 5,
  },
];
