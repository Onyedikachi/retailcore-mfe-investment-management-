import { Fragment } from "react";
import { Confirm, Failed, Success } from "../modals";
import RequestDeactivation from "../modals/RequestDeactivation";
import ProductDetail from "../modals/ProductDetail";
import BookingDetail from "../modals/BookingDetail";
import EarlyLiquidation from "../modals/EarlyLiquidation";
import PartLiquidation from "../modals/PartLiquidation";
import Loader from "../Loader";

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

  isEarlyLiquidation,
  isPartLiquidation,
  setPartLiquidationOpen,
  setEarlyLiquidationOpen
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
        specificCategory={specificCategory}
          text={successText}
          isOpen={isSuccessOpen}
          setIsOpen={setIsSuccessOpen}
        />
      )}
      {isFailed && (
        <Failed
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
       {isEarlyLiquidation && (
        <EarlyLiquidation
          isOpen={isEarlyLiquidation}
          setIsOpen={setEarlyLiquidationOpen}
          onConfirm={() => {}}
          detail={detail}
          // setReason={() => {}}
        />
      )}
       {isPartLiquidation && (
        <PartLiquidation
          isOpen={isPartLiquidation}
          setIsOpen={setPartLiquidationOpen}
          onConfirm={() => {}}
          detail={detail}
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
      {(deleteLoading || activateIsLoading) && (
        <Loader
          isOpen={deleteLoading || activateIsLoading}
          text={"Submitting"}
        />
      )}
    </Fragment>
  );
}
