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
  ADMIN_BRANCH_SETUP_SENT = "Product Setup Sent for Approval",
  BRANCH_CREATE_SUCCESS = "Product created successfully",
  BRANCH_CREATE_FAILED = "Product creation failed",
  BRANCH_CREATE_APPROVED = "Product creation approved",
  BRANCH_CREATE_REJECTED = "Product creation rejected",
  BRANCH_BULK_CREATE_APPROVED = "Product bulk creation approved",
  BRANCH_BULK_CREATE_REJECTED = "Product bulk creation rejected",
  ADMIN_BRANCH_CREATE_SUCCESS = "Product creation request submitted for approval",
  ADMIN_BRANCH_CREATE_FAILED = "Product creation request failed",
  BRANCH_MODIFY_SUCCESS = "Product modified successfully",
  BRANCH_MODIFY_FAILED = "Product modification failed",
  BRANCH_MODIFY_APPROVED = "Product modification approved",
  BRANCH_MODIFY_REJECTED = "Product modification rejected",
  ADMIN_BRANCH_MODIFY_SUCCESS = "Product modification request submitted for approval",
  ADMIN_BRANCH_MODIFY_FAILED = "Product modification request failed",
  BRANCH_ACTIVATE_SUCCESS = "Product activated successfully",
  BRANCH_ACTIVATE_FAILED = "Product activation failed",
  BRANCH_ACTIVATE_APPROVED = "Product activation approved",
  BRANCH_ACTIVATE_REJECTED = "Product activation rejected",
  ADMIN_BRANCH_ACTIVATE_SUCCESS = "Product activation request submitted for approval",
  ADMIN_BRANCH_ACTIVATE_FAILED = "Product activation request failed",
  BRANCH_DEACTIVATE_SUCCESS = "Product deactivated successfully",
  BRANCH_DEACTIVATE_FAILED = "Product deactivation failed",
  BRANCH_DEACTIVATE_APPROVED = "Product deactivation approved",
  BRANCH_DEACTIVATE_REJECTED = "Product deactivation rejected",
  ADMIN_BRANCH_DEACTIVATE_SUCCESS = "Product deactivation request submitted for approval",
  ADMIN_BRANCH_DEACTIVATE_FAILED = "Product deactivation request failed",
  BRANCH_WITHDRAW_DELETE_SUCCESS = "Request withdrawn and deleted successfully",
  BRANCH_WITHDRAW_DELETE_FAILED = "Unable to withdraw & delete",
  BRANCH_DELETE_SUCCESS = "Request deleted successfully",
  BRANCH_DELETE_FAILED = "Unable to delete",
  BRANCH_APPROVE_FAILED = "Unable to approve branch ",
  BRANCH_REJECT_FAILED = "Unable to reject branch ",
  BRANCH_DRAFT_SUCCESS = "Product Setup saved to draft",
  BRANCH_DRAFT_FAILED = "Unable to save as draft",
}

export enum Prompts {
  BRANCH_DRAFT = "Do you want to save as draft?",
  BRANCH_DRAFT_SUBTEXT = "Requests in draft will be deleted after 2 hours of inactivity",
  BRANCH_ACTIVATE = "Do you want to activate this branch?",
  BRANCH_DEACTIVATE = "Do you want to deactivate this branch?",
  BRANCH_MODIFY = "Do you want to modify this branch?",
  REMOVE_RECORD = "Do you want to remove this record?",
  CANCEL_PROCESS = "Do you want to cancel process?",
  CANCEL_BRANCH_SETUP = "Do you want to cancel branch setup?",
  BRANCH_CREATION_REJECT = "Do you want to reject branch creation?",
  BRANCH_CREATION_APPROVE = "Do you want to approve branch creation?",
  BRANCH_BULK_CREATION_REJECT = "Do you want to reject bulk branch creation?",
  BRANCH_BULK_CREATION_APPROVE = "Do you want to approve bulk branch creation?",
  BRANCH_MODIFY_REJECT = "Do you want to reject branch modification?",
  BRANCH_MODIFY_APPROVE = "Do you want to approve branch modification?",
  BRANCH_MODIFY_CANCEL = "Do you want to cancel branch modification?",
  BRANCH_WITHDRAW_DELETE = "Do you want to withdraw and delete this request?",
  BRANCH_WITHDRAW_MODIFY = "Do you want to withdraw and modify this request?",
  BRANCH_DELETE = "Do you want to delete this request?",
  BRANCH_DEACTIVATION_APPROVE = "Do you want to approve branch deactivation",
  BRANCH_DEACTIVATION_REJECT = "Do you want to reject branch deactivation",
  BRANCH_ACTIVATION_APPROVE = "Do you want to approve branch activation",
  BRANCH_ACTIVATION_REJECT = "Do you want to reject branch activation",
}
