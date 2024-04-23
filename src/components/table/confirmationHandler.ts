import { Actions, Messages, Prompts } from "@app/constants/enums";
import { errorToast } from "../Toast";
import { SpecificCategory } from "@app/constants";

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
  modifyRequest,
  modifyProductRequest,
  setLiquidationOpen,
  setLiquidationType,
  setTopUpType,
  setTopUpOpen,
}) => {
  if (action.toLowerCase().includes("delete")) {
    if (specificCategory === SpecificCategory.individual) {
      deleteInvestmentRequest(detail.id);
      return;
    } else {
      deleteRequest(detail.id);
    }
  }
  if (action.toLowerCase() === Actions.DEACTIVATE) {
    setIsDeactivationOpen(true);
  }
  if (action.toLowerCase() === Actions.ACTIVATE) {
    activateProduct({
      id: detail?.id,
      recentlyUpdatedMeta: previousData.current
        ? JSON.stringify(previousData.current)
        : null,
    });
  }
  if (action.toLowerCase() === Actions.MODIFY) {
    if (!permissions?.includes("CREATE_INVESTMENT_PRODUCT")) {
      errorToast("You do not have permission to make changes!");
    } else {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term-deposit"
        )}/modify/?id=${detail.id}&filter=${selected.value}`
      );
    }
  }

  if (action.toLowerCase() === Actions.WITHDARW_MODIFY) {
    if (
      (!permissions?.includes("CREATE_INVESTMENT_PRODUCT") &&
        specificCategory !== SpecificCategory.individual) ||
      (!permissions?.includes("BOOK_INVESTMENT") &&
        specificCategory === SpecificCategory.individual)
    ) {
      errorToast("You do not have permission to make changes!");
    } else {
      const data = JSON.parse(detail?.metaInfo);
      if (specificCategory === SpecificCategory.individual) {
        if (
          detail?.requestType === "part liquidation" ||
          detail?.requestType === "early liquidation"
        ) {
          setLiquidationType(detail?.requestType.split(" ")[0]);
          setLiquidationOpen(true);
        } else {
          modifyRequest({
            ...data,
            isDraft: true,
            id: detail.id,
            recentlyUpdatedMeta: null,
          });
        }
      } else {
        // navigate(
        //   `/product-factory/investment/${encodeURIComponent(
        //     "term-deposit"
        //   )}/withdraw_modify/?id=${detail.id}&filter=${selected.value}`
        // );
        modifyProductRequest({
          ...data,
          isDraft: true,
          id: detail.id,
          recentlyUpdatedMeta: null,
        });
      }
    }
  }

  if (action.toLowerCase() === Actions.TOPUP) {
    setTopUpType("topup");
    setTopUpOpen(true);
  }

  if (action.toLowerCase() === Actions.PRINCIPAL_WITHDRAWAL) {
    setTopUpType("withdraw");
    setTopUpOpen(true);
  }
};
