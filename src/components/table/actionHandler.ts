import { Actions, Messages, Prompts } from "@app/constants/enums";
import { StatusCategoryType } from "@app/types";
import { SpecificCategory } from "@app/constants";
export const actionHandler = ({
  specificCategory,
  action,
  items,
  selected,
  category,
  setAction,
  setDetail,
  setSubText,
  dropDownClick,
  previousData,
  setConfirmText,
  setIsConfirmOpen,
  setDetailOpen,
  setIndividualDetailOpen,
  setPartLiquidationOpen,
  setEarlyLiquidationOpen,
  navigate,
}) => {
  // console.log("Show action", JSON.stringify({action, items, selected, category}));
  setAction(action);
  setDetail(items);
  dropDownClick(action, items);
  setSubText("");
  previousData.current = {
    ...previousData.current,
    productName: items?.productName,
    prodType: items?.productType,
    state: items?.state,
    description: items?.description,
    slogan: items?.slogan,
    currency: items?.currency,
    requestStatus: null,
    requestType: null,
    request: "",
    initiatorId: "",
    approved_By_Id: "",
    date: new Date(),
  };

  if (action.toLowerCase() === Actions.DEACTIVATE) {
    setConfirmText(Prompts.PRODUCT_DEACTIVATE);
    setSubText(Prompts.PRODUCT_DEACTIVATE_SUBTEXT);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.ACTIVATE) {
    setConfirmText(Prompts.PRODUCT_ACTIVATE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.WITHDRAW_DELETE) {
    setConfirmText(Prompts.PRODUCT_WITHDRAW_DELETE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.DELETE_REQUESTS) {
    setConfirmText(Prompts.PRODUCT_DELETE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.WITHDARW_MODIFY) {
    setConfirmText(Prompts.PRODUCT_WITHDRAW_MODIFY);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.MODIFY) {
    setConfirmText(Prompts.PRODUCT_MODIFY);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.DELETE_DRAFT) {
    setConfirmText(Prompts.PRODUCT_DELETE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.PART_LIQUIDATE) {
    setPartLiquidationOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.EARLY_LIQUIDATE) {
    setEarlyLiquidationOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.DELETE_DRAFT) {
    setConfirmText(Prompts.PRODUCT_DELETE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.CONTINUE_REQUEST) {
    if (specificCategory === SpecificCategory.individual) {
      navigate(
        `/product-factory/investment/management/continue/individual?id=${items.id}`
      );
      return;
    } else {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term deposit"
        )}/continue/?id=${items.id}&type=draft&filter=${selected.value}`
      );
      return;
    }
  }
  if (action.toLowerCase() === Actions.RESTRUCTURE) {
    navigate(
      `/product-factory/investment/management/${Actions.RESTRUCTURE}/individual?id=${items.id}`
    );
    return;
  }

  if (action.toLowerCase() === Actions.VIEW) {
    category === StatusCategoryType.AllProducts
      ? setDetailOpen(true)
      : category === StatusCategoryType.Investments
      ? setIndividualDetailOpen(true)
      : navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term deposit"
          )}/process-summary/preview/${items.id}?category=request&filter=${
            selected.value
          }`
        );
    return;
  }
  if (action.toLowerCase() === "review") {
    category === StatusCategoryType.AllProducts
      ? setDetailOpen(true)
      : category === StatusCategoryType.Investments
      ? setIndividualDetailOpen(true)
      : navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term deposit"
          )}/process-summary/verdict/${items.id}?category=request&filter=${
            selected.value
          }`
        );
    return;
  }
};
