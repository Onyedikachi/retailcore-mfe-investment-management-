import React, { useContext, useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { FaBan, FaRegTimesCircle, FaPlayCircle, FaTimes } from "react-icons/fa";
import moment from "moment";
import ModalLayout from "./Layout";
import BottomBarLoader from "../BottomBarLoader";
import {
  CapitalizationOptions,
  CustomerCategory,
  InterestComputationMethod,
  Interval,
  ProductTypes,
  liquidities,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import {
  useGetInvestmentDetailQuery,
  useGetProductDetailQuery,
} from "@app/api";
import { AppContext } from "@app/utils";
import PricingConfigurationComponent from "./PricingConfigurationComponent";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { BiSolidEdit } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setTopUpOpen: (isOpen: boolean) => void;
  onCancel?: () => void;
  handleClick?: (e: any, detail: any) => void;
  detail: any;
}

export const SecurityPurchaseDetailLayout = ({
  detail,
  isOpen,
  setIsOpen,
  isLoading,
  investmentData,
  productInfo,
  permissions,
  setTopUpOpen,
  open,
  setOpen,
  handleClick,
}) => {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        data-testid="product-view"
        className="relative  w-[1218px]  rounded-lg bg-white"
      >
        {!isLoading && (
          <div>
            <div className="flex justify-between items-center pb-6 pt-8 px-16 border-b border-[#CCCCCC] w-full">
              <div className="flex gap-x-5 items-center">
                <h1
                  data-testid="product-name"
                  className="text-[#636363] font-bold text-2xl uppercase"
                >
                  {investmentData?.data?.issuer || "-"}
                </h1>
                <span
                  className={`${
                    detail?.state === "active"
                      ? "text-[#15692A] bg-[#D4F7DC]"
                      : "text-[#1E0A3C] bg-[#E5E5EA]"
                  } px-2 py-[1px] rounded font-medium capitalize`}
                >
                  {detail?.state === "active" ? "Active" : "Liquidated"}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 outline-none bg-transparent absolute right-6 top-6"
                data-testid="close-btn"
              >
                <FaTimes className="text-[#002266] opacity-60 hover:opacity-50 text-xl" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-5 text-left px-10 py-11">
              <div className="flex flex-col justify-between gap-y-3">
                <div className="p-6 flex flex-col gap-y-[35px] max-h-[463px] overflow-y-auto">
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Issuer/ ID
                    </span>
                    <span className="font-normal block uppercase">
                      {`${investmentData?.data?.issuer || "-"} / ${
                        detail?.code || "-"
                      }`}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Investment ID
                    </span>
                    <span
                      data-testid="id-value"
                      className="font-normal block uppercase"
                    >
                      {detail?.code || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Consideration
                    </span>
                    <span
                      data-testid="principal-value"
                      className="font-normal block"
                    >
                      {detail?.totalConsideration || "-"}
                    </span>
                  </div>

                  {detail?.investmentBookingStatus === 2 && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Value at Liquidation
                      </span>
                      <span className="font-normal block">
                        {currencyFormatter(
                          detail?.maturityValue,
                          productInfo?.data?.productInfo?.currencyCode
                        ) || "-"}{" "}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Face Value
                    </span>
                    <span className="font-normal block">
                      {detail?.currencyCode || ""}{" "}
                      {Number(
                        investmentData?.data?.faceValue ?? 0
                      ).toLocaleString() || "-"}
                    </span>
                  </div>

                  {investmentData?.data?.cleanPrice && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Clean Price
                      </span>
                      <span className="font-normal block">
                        {detail?.currencyCode || ""}{" "}
                        {Number(
                          investmentData?.data?.cleanPrice ?? 0
                        ).toLocaleString() || "-"}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Interest Capitalization Method
                    </span>
                    <span className="font-normal block">
                      {
                        CapitalizationOptions.find(
                          (i) => i.value === detail?.capitalizationMethod
                        )?.text
                      }
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Interest Computation days in a year
                    </span>
                    <span className="font-normal block">
                      {
                        InterestComputationMethod[
                          detail?.interestComputationMethod
                        ]
                      }
                    </span>
                  </div>
                </div>
                <div className="border border-[#E5E9EB] rounded-lg py-[35px] px-[30px] flex justify-between items-center">
                  {detail?.state === "active" && (
                    <div className="flex gap-x-6 items-center">
                      <button
                        data-testid="security-purchase-topup"
                        onClick={() => {
                          setIsOpen(false);
                          setTopUpOpen(true);
                        }}
                        className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3`}
                      >
                        <BiSolidEdit className="text-[#444]" /> Security Top Up
                      </button>
                    </div>
                  )}
                  <Link
                    to={`/investment-management/${CustomerCategory[2]?.toLowerCase()}/process-summary/preview/${
                      detail?.id
                    }?product_id=${detail?.id}&request_id=${
                      detail?.securityPurchaseRequestId
                    }`}
                  >
                    <button
                      className={`group flex items-center whitespace-nowrap py-[1px] text-base text-[#636363] gap-x-3 hover:underline outline-none`}
                    >
                      View Activity Log
                    </button>
                  </Link>
                </div>
              </div>

              <div className="border border-[#E5E9EB] rounded-lg py-[25px] px-[30px] h-[593px]">
                <div className="p-6 flex flex-col gap-y-[35px] max-h-[463px] overflow-y-auto">
                  {detail?.reasonForLiquidation && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Reason for Liquidation
                      </span>
                      <span className="font-normal block uppercase">
                        {detail?.reasonForLiquidation || "-"}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Investment Category
                    </span>
                    <span className="font-normal block uppercase">
                      {detail?.moneyMarketType || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Description
                    </span>
                    <span className="font-normal block uppercase">
                      {detail?.description || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">Currency</span>
                    <span className="font-normal block">
                      {detail?.currencyCode || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div
            className="h-[500px] flex items-center justify-center"
            data-testid="loading-spinner"
          >
            <div className="spinner-border h-11 w-11 border-t border-danger-500 rounded-full animate-spin"></div>
          </div>
        )}
        <ModalLayout isOpen={open} setIsOpen={setOpen}>
          <div className="px-[30px] pt-[64px] pb-[20px] bg-white w-[400px] rounded-lg relative">
            <ul className="max-h-[345px] overflow-y-auto flex flex-col gap-y-5">
              <PricingConfigurationComponent {...productInfo} />
            </ul>
            <button
              onClick={() => setOpen(false)}
              className="p-2 outline-none bg-transparent absolute right-6 top-6"
              data-testid="close-btn"
            >
              <FaTimes className="text-[#002266] opacity-60 hover:opacity-50 text-xl" />
            </button>
          </div>
        </ModalLayout>
      </div>
    </ModalLayout>
  );
};

export default function SecurityPurchaseDetail({
  isOpen,
  setIsOpen,
  handleClick,
  detail,
  setTopUpOpen,
}: Props) {
  const { tab } = useParams();
  const { permissions } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { data: investmentData, isInvestmentLoading } =
    useGetInvestmentDetailQuery({
      id: detail?.id,
      investmentType: tab,
    });
  const {
    data: productInfo,
    isProductLoading,
    isSuccess,
  } = useGetProductDetailQuery({
    id: detail?.investmentProductId,
    investmentType: tab,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isInvestmentLoading && !isProductLoading) {
      setIsLoading(false);
    }
  }, [isInvestmentLoading, isProductLoading]);

  return (
    <SecurityPurchaseDetailLayout
      {...{
        detail,
        isOpen,
        setIsOpen,
        isLoading,
        investmentData,
        productInfo,
        permissions,
        setTopUpOpen,
        open,
        setOpen,
        handleClick,
      }}
    />
  );
}
