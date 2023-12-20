import { Actions, Messages, Prompts } from "@app/constants/enums";
import { errorToast } from "../Toast";

export const confirmationHandler = ({
  action,
  detail,
  permissions,
  selected,
  previousData,
  deleteRequest,
  setIsDeactivationOpen,
  activateProduct,
  navigate,
}) => {
  if (action.toLowerCase().includes("delete")) {
    deleteRequest(detail.id);
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