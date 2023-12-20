import { Actions, Messages, Prompts } from "@app/constants/enums";
import { StatusCategoryType } from "@app/types";

export const actionHandler = ({action, items, selected, category, setAction, setDetail, setSubText, 
    dropDownClick, previousData, setConfirmText, setIsConfirmOpen, setDetailOpen, navigate}) => {
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
    if (action.toLowerCase() === Actions.CONTINUE_REQUEST) {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term deposit"
        )}/continue/?id=${items.id}&type=draft&filter=${selected.value}`
      );
      return;
    }

    if (action.toLowerCase() === Actions.VIEW) {
      category === StatusCategoryType.AllProducts
        ? setDetailOpen(true)
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