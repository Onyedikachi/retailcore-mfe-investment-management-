export enum StatusCategoryType {
  AllProducts = "all products",
  Requests = "requests",
  Investments = "investments",
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
  BOOKING_DRAFT_SUCCESS = "Booking Setup saved to draft",
  UNABLE_TO_BOOK = "Unable to proceed with booking",
  UNABLE_TO_BOOK_SUB = "Customer's KYC is not complete",
  INSUFFICIENT_BALANCE = "Customer has insufficient balance",
  CURRENCY_ERROR = "Invalid currency",
  BOOKING_CREATE_SUCCESS = "Investment Booking Created",
  ADMIN_BOOKING_SETUP_SENT = "Investment Booking Setup Sent for Approval",
  BOOKING_CREATE_FAILED = "Investment Booking creation failed",
  BOOKING_CREATE_APPROVED = "Investment Booking creation approved",
  BOOKING_CREATE_REJECTED = "Investment Booking creation rejected",
  ADMIN_BOOKING_CREATE_SUCCESS = "Investment Booking creation request submitted for approval",
  ADMIN_BOOKING_CREATE_FAILED = "Investment Booking creation request failed",
  BOOKING_MODIFY_SUCCESS = "Investment Booking modified successfully",
  BOOKING_MODIFY_FAILED = "Request modification failed",
  BOOKING_MODIFY_APPROVED = "Investment Booking modification approved",
  BOOKING_MODIFY_REJECTED = "Investment Booking modification rejected",
  ADMIN_BOOKING_MODIFY_SUCCESS = "Investment Booking modification request submitted for approval",
  ADMIN_BOOKING_MODIFY_FAILED = "Investment Booking modification request failed",
  BOOKING_ACTIVATE_SUCCESS = "Investment Booking activated successfully",
  BOOKING_ACTIVATE_FAILED = "Investment Booking activation failed",
  BOOKING_ACTIVATE_APPROVED = "Investment Booking activation approved",
  BOOKING_ACTIVATE_REJECTED = "Investment Booking activation rejected",
  ADMIN_BOOKING_ACTIVATE_SUCCESS = "Investment Booking activation request submitted for approval",
  ADMIN_BOOKING_ACTIVATE_FAILED = "Investment Booking activation request failed",
  BOOKING_DEACTIVATE_SUCCESS = "Investment Booking deactivated successfully",
  BOOKING_DEACTIVATE_FAILED = "Investment Booking deactivation failed",
  BOOKING_DEACTIVATE_APPROVED = "Investment Booking deactivation approved",
  BOOKING_DEACTIVATE_REJECTED = "Investment Booking deactivation rejected",
  ADMIN_BOOKING_DEACTIVATE_SUCCESS = "Investment Booking deactivation request submitted for approval",
  ADMIN_BOOKING_DEACTIVATE_FAILED = "Investment Booking deactivation request failed",
  BOOKING_WITHDRAW_DELETE_SUCCESS = "Request withdrawn and deleted successfully",
  BOOKING_WITHDRAW_DELETE_FAILED = "Unable to withdraw & delete",
  BOOKING_WITHDRAW_SUCCESS = "Request withdrawn successfully",
  BOOKING_WITHDRAW_SUCCESS_SUB = "Please find request in your draft table for modification",
  BOOKING_WITHDRAW_FAILED = "Unable to withdraw request",
  BOOKING_DELETE_SUCCESS = "Request deleted successfully",
  BOOKING_DELETE_FAILED = "Unable to delete",
  BOOKING_APPROVE_FAILED = "Unable to approve investment Booking ",
  BOOKING_REJECT_FAILED = "Unable to reject investment Booking ",
  PART_LIQUIDATION_REQUEST = "Investment Partial Liquidation Request Submitted for Approval",
  EARLY_LIQUIDATION_REQUEST = "Investment Early Liquidation Request Submitted for Approval",
  PART_LIQUIDATION_SUCCESS = "Investment Partial Liquidation successful",
  EARLY_LIQUIDATION_SUCCESS = "Investment Early Liquidation successful",
  REQUEST_FAILED = "Request Failed",
  LIQUIDATION_MODIFICATION_REQUEST_FAILED = "Liquidation modification requests failed",
  LIQUIDATION_MODIFICATION_REQUEST_SUCCESS = "Liquidation modifcation requests submitted for approval",
  LIQUIDATION_MODIFICATION__SUCCESS = "Liquidation modifcation successful",
  TOPUP_REQUEST_SUCCESS = "Investment topup requests submitted for approval",
  TOPUP__SUCCESS = "Investment topup successful",
  TOPUP_REQUEST_FAILED = "Topup requests failed",
  WITHDRAWAL_REQUEST_SUCCESS = "Withdrawal requests submitted for approval",
  WITHDRAWAL__SUCCESS = "Withdrawal successful",
  WITHDRAWAL_REQUEST_FAILED = "Withdrawal requests failed",

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
  CANCEL_MODIFICATION = "Do you want to cancel product modification?",
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
  BOOKING_DRAFT = "Do you want to save as draft?",
  BOOKING_DRAFT_SUBTEXT = "Requests in draft will be deleted after 2 hours of inactivity",
  BOOKING_ACTIVATE = "Do you want to activate this investment?",
  BOOKING_DEACTIVATE = "Do you want to deactivate this investment?",
  BOOKING_MODIFY = "Do you want to modify this investment?",
  CANCEL_INVESTMENT_CREATION = "Do you want to cancel investment creation?",
  CANCEL_INVESTMENT_MODIFICATION = "Do you want to cancel investment modification?",
  CANCEL_BOOKING_SETUP = "Do you want to cancel investment setup?",
  BOOKING_CREATION_REJECT = "Do you want to reject investment creation?",
  BOOKING_CREATION_APPROVE = "Do you want to approve investment creation?",

  BOOKING_MODIFY_REJECT = "Do you want to reject investment modification?",
  BOOKING_MODIFY_APPROVE = "Do you want to approve investment modification?",
  BOOKING_MODIFY_CANCEL = "Do you want to cancel investment modification?",
  BOOKING_WITHDRAW_DELETE = "Do you want to withdraw and delete this request?",
  BOOKING_WITHDRAW_MODIFY = "Do you want to withdraw and modify this request?",
  BOOKING_WITHDRAW_MODIFY_SUB = "The request will be withdrawn from the reviewer's requests queue and saved as draft for you to modify",
  BOOKING_WITHDRAW = "Do you want to withdraw request?",
  BOOKING_DELETE = "Do you want to delete this request?",
  BOOKING_DEACTIVATION_APPROVE = "Do you want to approve investment deactivation",
  BOOKING_DEACTIVATION_REJECT = "Do you want to reject investment deactivation",
  BOOKING_ACTIVATION_APPROVE = "Do you want to approve investment activation",
  BOOKING_ACTIVATION_REJECT = "Do you want to reject investment activation",
  BOOKING_DEACTIVATE_SUBTEXT = "This investment will no longer be available for assignment to customers after deactivation",
}

export enum Actions {
  VIEW = "view",
  DELETE_DRAFT = "delete draft",
  WITHDRAW_DELETE = "withdraw & delete request",
  ACTIVATE = "activate",
  DEACTIVATE = "deactivate",
  DELETE_REQUESTS = "delete request",
  WITHDARW_MODIFY = "withdraw & modify",
  MODIFY = "modify",
  CONTINUE_REQUEST = "continue request",
  EARLY_LIQUIDATE = "early liquidate",
  PART_LIQUIDATE = "part liquidate",
  RESTRUCTURE = "restructure",
  GENERATE_CERTIFICATE= "generate certificate",
  TOPUP = "investment topup",
  SECURITY_PURCHASE_TOPUP = "security purchase topup",
  PRINCIPAL_WITHDRAWAL = "principal withdrawal"
}

export enum CustomerCategoryType {
  Individual = 0,
  Corporate = 1,
  // Add other category types here
}

export enum LiquidationPenalty {
  None = 0,
  ForfietAll = 1,
  ForfietPortion = 2,
  RecalculateInterest = 3,
  TakeCharge = 4,
  ComparePenalties = 5,
}
