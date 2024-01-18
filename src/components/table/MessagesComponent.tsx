import { Fragment } from "react";
import { Confirm, Failed, Success } from "../modals";
import RequestDeactivation from "../modals/RequestDeactivation";
import ProductDetail from "../modals/ProductDetail";
import BookingDetail from "../modals/BookingDetail";
import Loader from "../Loader";
import Liquidation from "../modals/Liquidation";

export default function MessagesComponent({
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
  handleLiquidation = (data, type) => {},
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
          handleRefresh={handleRefresh}
          specificCategory={specificCategory}
          text={successText}
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
          // setReason={() => {}}
        />
      )}

      {isLiquidation && (
        <Liquidation
          isOpen={isLiquidation}
          setIsOpen={setLiquidationOpen}
          onConfirm={(data, type) => handleLiquidation(data, type)}
          detail={detail}
          type={liquidationType}
          title={
            liquidationType === "part"
              ? "part liquidation request"
              : "early liquidation request"
          }
          
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
      {isIndividualDetailOpen && (
        <BookingDetail
          isOpen={isIndividualDetailOpen}
          setIsOpen={setIndividualDetailOpen}
          handleClick={handleAction}
          detail={detail}
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
