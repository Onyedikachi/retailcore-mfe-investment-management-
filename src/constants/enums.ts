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
  CONTINUE_REQUEST = "continue request"
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

