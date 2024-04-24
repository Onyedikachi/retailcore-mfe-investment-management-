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
  setLiquidationOpen,
  setLiquidationType,
  setTopUpType,
  setTopUpOpen,
  navigate,
  tab,
}) => {
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

    if (
      specificCategory === SpecificCategory.individual &&
      items.requestType === "booking"
    ) {
      setSubText(Prompts.BOOKING_WITHDRAW_MODIFY_SUB);
    }
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
    setLiquidationType("part");
    setLiquidationOpen(true);

    return;
  }
  if (action.toLowerCase() === Actions.EARLY_LIQUIDATE) {
    setLiquidationType("early");
    setLiquidationOpen(true);
    return;
  }

  if (
    action.toLowerCase() === Actions.TOPUP ||
    action.toLowerCase() === Actions.SECURITY_PURCHASE_TOPUP
  ) {
    // setTopUpType("security_purchase_topup");
    setTopUpType("topup");
    setTopUpOpen(true);
    return;
  }

  if (action.toLowerCase() === Actions.SECURITY_PURCHASE_TOPUP) {
    setTopUpType("security_purchase_topup");
    setTopUpOpen(true);
  }

  if (action.toLowerCase() === Actions.PRINCIPAL_WITHDRAWAL) {
    setTopUpType("withdraw");
    setTopUpOpen(true);
    return;
  }

  if (action.toLowerCase() === Actions.DELETE_DRAFT) {
    setConfirmText(Prompts.PRODUCT_DELETE);
    setIsConfirmOpen(true);
    return;
  }
  if (action.toLowerCase() === Actions.CONTINUE_REQUEST) {
    if (specificCategory === SpecificCategory.individual) {
      navigate(`/investment-management/continue/${tab}?id=${items.id}`);
      return;
    } else {
      navigate(
        `/product-factory/investment/${encodeURIComponent(
          "term-deposit"
        )}/continue/?id=${items.id}&type=draft&filter=${selected.value}`
      );
      return;
    }
  }
  if (action.toLowerCase() === Actions.RESTRUCTURE) {
    navigate(
      `/investment-management/${Actions.RESTRUCTURE}/${tab}?id=${items.id}`
    );
    return;
  }
  if (action.toLowerCase() === Actions.GENERATE_CERTIFICATE) {
    navigate(
      `/investment-management/certificate/process-summary/generate/${items.id}`
    );
    return;
  }

  if (action.toLowerCase() === Actions.VIEW) {
    category === StatusCategoryType.AllProducts
      ? setDetailOpen(true)
      : category === StatusCategoryType.Investments
      ? setIndividualDetailOpen(true)
      : specificCategory === SpecificCategory.individual
      ? navigate(
          `/investment-management/${tab}/process-summary/preview/${items.id}?process_type=${items.requestType}` +
            (items.investmentBookingId
              ? `&booking_id=${items.investmentBookingId}&request_id=${items.id}`
              : "")
        )
      : navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term-deposit"
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
      : specificCategory === SpecificCategory.individual
      ? navigate(
          `/investment-management/${tab}/process-summary/verdict/${items.id}?process_type=${items.requestType}` +
            (items.investmentBookingId
              ? `&booking_id=${items.investmentBookingId}`
              : "")
        )
      : navigate(
          `/product-factory/investment/${encodeURIComponent(
            "term-deposit"
          )}/process-summary/verdict/${items.id}?category=request&filter=${
            selected.value
          }`
        );
    return;
  }
};
