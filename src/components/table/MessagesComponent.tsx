import { Fragment } from "react";
import { Confirm, Failed, Success } from "../modals";
import RequestDeactivation from "../modals/RequestDeactivation";
import ProductDetail from "../modals/ProductDetail";
import BookingDetail from "../modals/BookingDetail";
import Loader from "../Loader";
import Liquidation from "../modals/Liquidation";
import TopUp from "../modals/TopUp";
import SecurityPurchaseDetail from "../modals/securityPurchaseDetail";

export default function MessagesComponent({
  productDetails,
  specificCategory,
  isConfirmOpen,
  isSuccessOpen,
  isFailed,
  isDeactivationOpen,
  isDetailOpen,
  deleteLoading,
  activateIsLoading,
  isSuccess,
  canRetry,

  detail,
  confirmText,
  subText,
  successText,
  failedText,
  failedSubText,

  handleConfirm,
  setIsConfirmOpen,
  setIsSuccessOpen,
  setFailed,
  setIsDeactivationOpen,
  setDetailOpen,
  handleAction,

  isIndividualDetailOpen,
  setIndividualDetailOpen,

  

  isLiquidation,
  setLiquidationOpen,
  liquidationType,
  isSecurityPurchase,

  isTopUp,
  setTopUpOpen,
  topUpType,
  handleTopUp = (data, type, metaInfo) => {},

  handleLiquidation = (data, type, metaInfo) => {},
  liquidationLoading,
  handleRefresh = () => {},
}) {
  return (
    <Fragment>
      {isConfirmOpen && (
        <Confirm
          text={confirmText}
          subtext={subText}
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          onConfirm={() => {
            setIsConfirmOpen(false);
            handleConfirm();
          }}
          onCancel={() => {
            setIsConfirmOpen(false);
          }}
        />
      )}
      {(isSuccessOpen || isSuccess) && (
        <Success
          handleRefresh={() => {
            setLiquidationOpen && setLiquidationOpen(false);
            setIsDeactivationOpen && setIsDeactivationOpen(false);
            handleRefresh();
          }}
          specificCategory={specificCategory}
          text={successText}
          subtext={subText}
          isOpen={isSuccessOpen}
          setIsOpen={setIsSuccessOpen}
        />
      )}
      {isFailed && (
        <Failed
          handleRefresh={handleRefresh}
          specificCategory={specificCategory}
          text={failedText}
          subtext={failedSubText}
          isOpen={isFailed}
          setIsOpen={setFailed}
          canRetry={canRetry}
        />
      )}
      {isDeactivationOpen && (
        <RequestDeactivation
          isOpen={isDeactivationOpen}
          setIsOpen={setIsDeactivationOpen}
          onConfirm={() => {}}
          detail={detail}
          handleRefresh={handleRefresh}
          // setReason={() => {}}
        />
      )}

      {isLiquidation && (
        <Liquidation
          isOpen={isLiquidation}
          setIsOpen={setLiquidationOpen}
          onConfirm={(data, type, metaInfo) =>
            handleLiquidation(data, type, metaInfo)
          }
          detail={detail}
          type={liquidationType}
          title={
            liquidationType === "part"
              ? "part liquidation request"
              : "early liquidation request"
          }
          productDetails={productDetails}

          // setReason={() => {}}
        />
      )}

      {isTopUp && (
        <TopUp
          isOpen={isTopUp}
          setIsOpen={setTopUpOpen}
          onConfirm={(data, type, metaInfo) =>
            handleTopUp(data, type, metaInfo)
          }
          detail={detail}
          type={topUpType}
          title={topUpType}
          productDetails={productDetails}

          // setReason={() => {}}
        />
      )}

      {isDetailOpen && (
        <ProductDetail
          isOpen={isDetailOpen}
          setIsOpen={setDetailOpen}
          handleClick={handleAction}
          detail={detail}
          // setReason={() => {}}
        />
      )}
      {isIndividualDetailOpen && !isSecurityPurchase && (
        <BookingDetail
          isOpen={isIndividualDetailOpen}
          setIsOpen={setIndividualDetailOpen}
          handleClick={handleAction}
          detail={detail}
          setTopUpOpen={setTopUpOpen}
          // setReason={() => {}}
        />
      )}
      {isIndividualDetailOpen && isSecurityPurchase && (
        <SecurityPurchaseDetail
          isOpen={isIndividualDetailOpen}
          setIsOpen={setIndividualDetailOpen}
          handleClick={handleAction}
          detail={detail}
          setTopUpOpen={setTopUpOpen}
          // setReason={() => {}}
        />
      )}
      {(deleteLoading || activateIsLoading || liquidationLoading) && (
        <Loader
          isOpen={deleteLoading || activateIsLoading || liquidationLoading}
          text={"Submitting"}
        />
      )}
    </Fragment>
  );
}
