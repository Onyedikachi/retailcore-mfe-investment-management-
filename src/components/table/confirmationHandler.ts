import { Actions, Messages, Prompts } from "@app/constants/enums";
import { errorToast } from "../Toast";
import {SpecificCategory} from '@app/constants'

export const confirmationHandler = ({
  specificCategory,
  action,
  detail,
  permissions,
  selected,
  previousData,
  deleteRequest,
  deleteInvestmentRequest,
  setIsDeactivationOpen,
  activateProduct,
  navigate,
}) => {
  if (action.toLowerCase().includes("delete")) {
    if(specificCategory === SpecificCategory.individual){
      deleteInvestmentRequest(detail.id);
      return
    }else {
      deleteRequest(detail.id);
    }
    
  }
  if (action.toLowerCase() === Actions.DEACTIVATE) {
    setIsDeactivationOpen(true);
  }
  if (action.toLowerCase() === Actions.ACTIVATE) {
    activateProduct({
      id: detail?.id,
      recentlyUpdatedMeta: JSON.stringify(previousData.current),
    });
  }
  if (action.toLowerCase() === Actions.MODIFY) {
    if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
      errorToast("You do not have permission to make changes!");
    } else {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term deposit"
        )}/modify/?id=${detail.id}&filter=${selected.value}`
      );
    }
  }

  if (action.toLowerCase() === Actions.WITHDARW_MODIFY) {
    if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
      errorToast("You do not have permission to make changes!");
    } else {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term deposit"
        )}/withdraw_modify/?id=${detail.id}&filter=${selected.value}`
      );
    }
  }
};
