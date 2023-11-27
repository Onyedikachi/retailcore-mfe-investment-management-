export const isChecker: boolean = true;

export const BranchTableHeaders: { hasFilter: boolean; text: string }[] = [
  { hasFilter: false, text: "branch name" },
  { hasFilter: false, text: "branch code" },
  { hasFilter: false, text: "location" },
  { hasFilter: false, text: "description" },
  { hasFilter: true, text: "state" },
  { hasFilter: true, text: "updated on" },
  { hasFilter: false, text: "" },
];
export const BulkBranchHeaders: { hasFilter: boolean; text: string }[] = [
  { hasFilter: false, text: "s/n" },
  { hasFilter: false, text: "branch name" },
  { hasFilter: false, text: "generated branch code" },
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
  { hasFilter: false, text: "branch name" },
  { hasFilter: false, text: "branch code" },
  { hasFilter: false, text: "location" },
  { hasFilter: true, text: "status" },
  { hasFilter: false, text: "status description" },

  { hasFilter: false, text: "" },
];

export const BulkValidationSummaryTableHeaders: {
  hasFilter: boolean;
  text: string;
}[] = [
  { hasFilter: false, text: "S/N" },
  { hasFilter: false, text: "branch name" },
  { hasFilter: false, text: "branch code" },
  { hasFilter: false, text: "location" },
  { hasFilter: false, text: "branch description" },
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
      A: [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
      ],
    },
    {
      R: [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
        // {
        //   id: "",
        //   text: "Modify",
        //   icon: "FaEdit",
        // },
        {
          id: "",
          text: "Delete Request",
          icon: "FaTrash",
        },
      ],
    },
    {
      P: [
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
      D: [
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
  activation: [
    {
      A: [
        {
          id: "",
          text: "View",
          icon: "FaEye",
        },
      ],
    },
    {
      R: [
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
      P: [
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
      D: [
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
    value: "A",
  },
  {
    id: 2,
    name: "inactive",
    value: "I",
  },
];

export const StatusFilterOptions: any[] = [
  {
    id: 1,
    name: "approved",
    value: "A",
  },
  {
    id: 2,
    name: "in-review",
    value: "P",
  },
  {
    id: 3,
    name: "in-issue",
    value: "R",
  },
  {
    id: 4,
    name: "draft",
    value: "D",
  },
];

export const CheckerStatusFilterOptions: any[] = [
  {
    id: 1,
    name: "approved",
    value: "A",
  },
  {
    id: 2,
    name: "pending",
    value: "P",
  },
  {
    id: 3,
    name: "rejected",
    value: "R",
  },
  {
    id: 4,
    name: "draft",
    value: "D",
  },
];

export const TypeFilterOptions: any[] = [
  {
    id: 1,
    name: "creation",
    value: "CREATE",
  },
  {
    id: 2,
    name: "change",
    value: "CHANGE",
  },
  {
    id: 3,
    name: "deactivation",
    value: "DEACTIVATE",
  },
  {
    id: 4,
    name: "reactivation",
    value: "REACTIVATE",
  },
  {
    id: 5,
    name: "bulk creation",
    value: "BULK_CREATE",
  },
];

export const DateFilterOptions: any[] = [
  {
    id: 1,
    name: "All time",
    value: "",
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
    text: "Branch creation approved",
  },
  {
    status: "R",
    type: "single",
    request_type: "CREATE",
    text: "Branch creation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "CREATE",
    text: "Branch creation awaiting approval",
  },
  {
    status: "A",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Branch creation approved",
  },
  {
    status: "R",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Branch creation rejected",
  },
  {
    status: "P",
    type: "bulk",
    request_type: "BULK_CREATE",
    text: "Bulk Branch awaiting approval",
  },
  {
    status: "A",
    type: "both",
    request_type: "BULK_CREATE",
    text: "Branch creation approved",
  },
  {
    status: "P",
    type: "both",
    request_type: "BULK_CREATE",
    text: "Branch creation awaiting approval",
  },
  {
    status: "R",
    type: "both",
    request_type: "CHANGE",
    text: "Branch modification rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "CHANGE",
    text: "Branch modification awaiting approval",
  },
  {
    status: "R",
    type: "both",
    request_type: "CHANGE",
    text: "Branch modification rejected",
  },
  {
    status: "A",
    type: "both",
    request_type: "CHANGE",
    text: "Branch modification approved",
  },
  {
    status: "R",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Branch deactivation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Branch deactivation pending",
  },
  {
    status: "A",
    type: "both",
    request_type: "DEACTIVATE",
    text: "Branch deactivation approved",
  },
  {
    status: "R",
    type: "both",
    request_type: "REACTIVATE",
    text: "Branch reactivation rejected",
  },
  {
    status: "P",
    type: "both",
    request_type: "REACTIVATE",
    text: "Branch reactivation pending approval",
  },
  {
    status: "A",
    type: "both",
    request_type: "REACTIVATE",
    text: "Branch reactivation approved",
  },
];
