export enum StatusCategoryType {
  AllProducts = "all products",
  Requests = "requests",
  // Add other category types here
}

export enum StatusItemType {
  Type = "type",
  Request = "request",
}
export enum RequestStatus {
  APPROVED = "Approved",
  INREVIEW = "In-Review",
  INISSUE = "In-Issue",
  DRAFT = "Draft",
}

export enum ProductStatus {
  ACTIVE = "Active",
  INACTIVE = "InActive",
}

export enum Messages {
  ADMIN_PRODUCT_SETUP_SENT = "Product Setup Sent for Approval",
  PRODUCT_CREATE_SUCCESS = "Product created successfully",
  PRODUCT_CREATE_FAILED = "Product creation failed",
  PRODUCT_CREATE_APPROVED = "Product creation approved",
  PRODUCT_CREATE_REJECTED = "Product creation rejected",
  ADMIN_PRODUCT_CREATE_SUCCESS = "Product creation request submitted for approval",
  ADMIN_PRODUCT_CREATE_FAILED = "Product creation request failed",
  PRODUCT_MODIFY_SUCCESS = "Product modified successfully",
  PRODUCT_MODIFY_FAILED = "Product modification failed",
  PRODUCT_MODIFY_APPROVED = "Product modification approved",
  PRODUCT_MODIFY_REJECTED = "Product modification rejected",
  ADMIN_PRODUCT_MODIFY_SUCCESS = "Product modification request submitted for approval",
  ADMIN_PRODUCT_MODIFY_FAILED = "Product modification request failed",
  PRODUCT_ACTIVATE_SUCCESS = "Product activated successfully",
  PRODUCT_ACTIVATE_FAILED = "Product activation failed",
  PRODUCT_ACTIVATE_APPROVED = "Product activation approved",
  PRODUCT_ACTIVATE_REJECTED = "Product activation rejected",
  ADMIN_PRODUCT_ACTIVATE_SUCCESS = "Product activation request submitted for approval",
  ADMIN_PRODUCT_ACTIVATE_FAILED = "Product activation request failed",
  PRODUCT_DEACTIVATE_SUCCESS = "Product deactivated successfully",
  PRODUCT_DEACTIVATE_FAILED = "Product deactivation failed",
  PRODUCT_DEACTIVATE_APPROVED = "Product deactivation approved",
  PRODUCT_DEACTIVATE_REJECTED = "Product deactivation rejected",
  ADMIN_PRODUCT_DEACTIVATE_SUCCESS = "Product deactivation request submitted for approval",
  ADMIN_PRODUCT_DEACTIVATE_FAILED = "Product deactivation request failed",
  PRODUCT_WITHDRAW_DELETE_SUCCESS = "Request withdrawn and deleted successfully",
  PRODUCT_WITHDRAW_DELETE_FAILED = "Unable to withdraw & delete",
  PRODUCT_DELETE_SUCCESS = "Request deleted successfully",
  PRODUCT_DELETE_FAILED = "Unable to delete",
  PRODUCT_APPROVE_FAILED = "Unable to approve product ",
  PRODUCT_REJECT_FAILED = "Unable to reject product ",
  PRODUCT_DRAFT_SUCCESS = "Product Setup saved to draft",
  PRODUCT_DRAFT_FAILED = "Unable to save as draft",
}

export enum Prompts {
  PRODUCT_DRAFT = "Do you want to save as draft?",
  PRODUCT_DRAFT_SUBTEXT = "Requests in draft will be deleted after 2 hours of inactivity",
  PRODUCT_ACTIVATE = "Do you want to activate this product?",
  PRODUCT_DEACTIVATE = "Do you want to deactivate this product?",
  PRODUCT_MODIFY = "Do you want to modify this product?",
  REMOVE_RECORD = "Do you want to remove this record?",
  CANCEL_PROCESS = "Do you want to cancel process?",
  CANCEL_CREATION = "Do you want to cancel product creation?",
  CANCEL_MODIFICATION = "Do you want to cancel prodcut modification?",
  CANCEL_PRODUCT_SETUP = "Do you want to cancel product setup?",
  PRODUCT_CREATION_REJECT = "Do you want to reject product creation?",
  PRODUCT_CREATION_APPROVE = "Do you want to approve product creation?",

  PRODUCT_MODIFY_REJECT = "Do you want to reject product modification?",
  PRODUCT_MODIFY_APPROVE = "Do you want to approve product modification?",
  PRODUCT_MODIFY_CANCEL = "Do you want to cancel product modification?",
  PRODUCT_WITHDRAW_DELETE = "Do you want to withdraw and delete this request?",
  PRODUCT_WITHDRAW_MODIFY = "Do you want to withdraw and modify this request?",
  PRODUCT_WITHDRAW = "Do you want to withdraw request?",
  PRODUCT_DELETE = "Do you want to delete this request?",
  PRODUCT_DEACTIVATION_APPROVE = "Do you want to approve product deactivation",
  PRODUCT_DEACTIVATION_REJECT = "Do you want to reject product deactivation",
  PRODUCT_ACTIVATION_APPROVE = "Do you want to approve product activation",
  PRODUCT_ACTIVATION_REJECT = "Do you want to reject product activation",
  PRODUCT_DEACTIVATE_SUBTEXT = "This product will no longer be available for assignment to customers after deactivation",
}

export enum ProductType {
  TermDeposit = 0,
  TreasureBilly = 1,
  CommercialPaper = 2,
}

export enum ProductState {
  Pending = 0,
  Inactive = 1,
  Active = 2,
}

export enum CustomerCategory {
  Individual = 0,
  Corporate = 1,
}

export enum InterestRateRangeType {
  VaryByPrincipal = 0,
  VaryByTenor = 1,
  DonotVary = 2,
}

export enum InterestComputationMethod {
  E360 = 0,
  Actual360 = 1,
  Actual365 = 2,
}

export enum RequestType {
  Create = 0,
  Modify = 1,
  Deactivation = 2,
  Reactivation = 3,
}

export enum InvestmentBookingStatus {
  Pending = 0,
  Active = 1,
  Liquidated = 2,
}

export enum CapitalizationMethod {
  UponBooking = 0,
  AtIntervals = 1,
  AtMaturity = 2,
}

export enum RollOverOption {
  UsingPrincipal = 0,
  UsingPrincipalplusInterest = 1,
}

export enum InvestmentBookingRequestType {
  Booking = 0,
  EarlyLiquidation = 1,
  PartLiquidation = 2,
}

export enum RequestStatus {
  Draft = 0,
  InReview = 1,
  Approved = 2,
  InIssue = 3,
}

export enum Interval {
  Hours = 0,
  Days = 1,
  Weeks = 2,
  Months = 3,
  Years = 4,
}
