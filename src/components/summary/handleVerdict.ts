import { Prompts } from "@app/constants/enums";

export default ({value, sub_type, process, setConfirmText, setAction, setIsConfirmOpen}) => {
    setAction(value);
    if (value === "approve" && !sub_type) {
      setConfirmText(Prompts.PRODUCT_CREATION_APPROVE);
    }
    if (value === "reject" && !sub_type) {
      setConfirmText(Prompts.PRODUCT_CREATION_REJECT);
    }

    if (value === "approve" && sub_type === "activation") {
      setConfirmText(Prompts.PRODUCT_ACTIVATION_APPROVE);
    }
    if (value === "reject" && sub_type === "activation") {
      setConfirmText(Prompts.PRODUCT_ACTIVATION_REJECT);
    }
    if (value === "approve" && sub_type === "deactivation") {
      setConfirmText(Prompts.PRODUCT_DEACTIVATION_APPROVE);
    }
    if (value === "reject" && sub_type === "deactivation") {
      setConfirmText(Prompts.PRODUCT_DEACTIVATION_REJECT);
    }
    if (value === "approve" && sub_type === "modification") {
      setConfirmText(Prompts.PRODUCT_MODIFY_APPROVE);
    }
    if (value === "reject" && sub_type === "modification") {
      setConfirmText(Prompts.PRODUCT_MODIFY_REJECT);
    }

    if (value === "cancel" && (process === "create" ||  process === "clone" ||  process === "continue") ) {
    
      setConfirmText(Prompts.CANCEL_CREATION);
    }
    if (value === "cancel" && (process === "modify" || process === "withdraw_modify")) {
      setConfirmText(Prompts.CANCEL_MODIFICATION);
    }
    if (value === "cancel" && process === "verdict") {
      setConfirmText(Prompts.CANCEL_PROCESS);
    }

    setIsConfirmOpen(true);
  };