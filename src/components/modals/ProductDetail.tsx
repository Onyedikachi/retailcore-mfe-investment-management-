import React, { useContext, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaBan, FaEdit, FaPlayCircle, FaTimes } from "react-icons/fa";
import moment from "moment";
import ModalLayout from "./Layout";
import BottomBarLoader from "../BottomBarLoader";
import { CustomerCategory, Interval, ProductTypes } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { useGetProductDetailQuery } from "@app/api";
import { AppContext } from "@app/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCancel?: () => void;
  handleClick?: (e: any, detail: any) => void;
  detail: any;
}

export default function ProductDetail({
  isOpen,
  setIsOpen,
  handleClick,
  detail,
}: Props) {
  const data = [
    "3% for principal between 0 and 200,000",
    "4% for principal between 200,000 and 400,000",
    "3% for principal between 400,000 and 600,000",
    "3% for principal between 0 and 200,000",
    "4% for principal between 200,000 and 400,000",
    "3% for principal between 400,000 and 600,000",
    "3% for principal between 0 and 200,000",
    "4% for principal between 200,000 and 400,000",
    "3% for principal between 400,000 and 600,000",
  ];
  const { data: productData, isLoading } = useGetProductDetailQuery({
    id: detail.id,
  });
  console.log("🚀 ~ file: ProductDetail.tsx:41 ~ productData:", productData)
  const [open, setOpen] = useState(false);
  const { permissions } = useContext(AppContext);

  // React.useEffect(()=>{

  // }, [isSuccess])
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
                <h1 className="text-[#636363] font-bold text-2xl uppercase">
                  {productData?.data?.productInfo?.productName || "-"}
                </h1>
                <span
                  className={`${
                    productData?.data?.state === 2
                      ? "text-[#15692A] bg-[#D4F7DC]"
                      : "text-[#1E0A3C] bg-[#E5E5EA]"
                  } px-2 py-[1px] rounded font-medium capitalize`}
                >
                  {productData?.data?.state === 2 ? "Active" : "Inactive"}
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
                  {/* {detail?.status === "R" && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Reason for Deactivation
                      </span>
                      <span className="font-normal block">
                        {detail?.reason}
                      </span>
                    </div>
                  )} */}
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Type
                    </span>
                    <span className="font-normal block uppercase">
                      {ProductTypes.find(
                        (i) => i.id == productData?.data?.productType
                      )?.name || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Code
                    </span>
                    <span className="font-normal block uppercase">
                      {productData?.data?.productCode || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Slogan
                    </span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.slogan || "-"}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Description
                    </span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.description || "-"}{" "}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Product Life Cycle
                    </span>
                    <span className="font-normal block">
                      {moment(productData?.data?.productInfo?.startDate).format(
                        "DD MMM YYYY"
                      )}{" "}
                      -{" "}
                      {productData?.data?.productInfo?.endDate
                        ? moment(
                            productData?.data?.productInfo?.endDate
                          ).format("DD MMM YYYY")
                        : "Unspecified"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">Currency</span>
                    <span className="font-normal block">
                      {productData?.data?.productInfo?.currency}{" "}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Customer Category
                    </span>
                    <span className="font-normal block">
                      {
                        CustomerCategory[
                          productData?.data?.customerEligibility
                            ?.customerCategory
                        ]
                      }{" "}
                    </span>
                  </div>
                </div>
                <div className="border border-[#E5E9EB] rounded-lg py-[35px] px-[30px] flex justify-between items-center">
                  <div className="flex gap-x-6 items-center">
                    {permissions?.includes("CREATE_INVESTMENT_PRODUCT") && (
                      <button
                        data-testid="modify"
                        onClick={() => handleClick("modify", productData?.data)}
                        className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3`}
                      >
                        <FaEdit className="text-[#D4A62F]" /> Modify
                      </button>
                    )}
                    {permissions?.includes(
                      "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
                    ) && (
                      <>
                        {productData?.data?.state === 1 ? (
                          <button
                            type="button"
                            data-testid="activate-btn"
                            onClick={() => handleClick("activate", productData?.data)}
                            className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3 outline-none`}
                          >
                            <FaPlayCircle className="text-[#2FB755]" /> Activate
                          </button>
                        ) : (
                          <button
                            data-testid="deactivate-btn"
                            onClick={() => handleClick("deactivate", productData?.data)}
                            className={`group flex  items-center whitespace-nowrap  py-[1px] text-base text-[#636363] gap-x-3 outline-none`}
                          >
                            <FaBan className="text-sterling-red-800" />{" "}
                            Deactivate
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  <Link
                    to={`/product-factory/investment/${encodeURIComponent(
                      "term deposit"
                    )}/process-summary/preview/${productData?.data.id}?category=product`}
                  >
                    <button
                      className={`group flex items-center whitespace-nowrap py-[1px] text-base text-[#636363] gap-x-3 underline outline-none`}
                    >
                      View Activity Log
                    </button>
                  </Link>
                </div>
              </div>
              <div className="border border-[#E5E9EB] rounded-lg py-[25px] px-[30px] h-[593px]">
                <div className="pr-[30px] h-full gap-y-[35px] overflow-y-auto flex flex-col">
                  <div className="">
                    <span className="font-bold block mb-[15px]">
                      Applicable Tenor
                    </span>
                    <span className="font-normal block">
                      {`${
                        productData?.data?.pricingConfiguration
                          ?.applicableTenorMin
                      } ${
                        Interval[
                          productData?.data?.pricingConfiguration
                            ?.applicableTenorMinUnit
                        ]
                      }`}{" "}
                      -{" "}
                      {`${
                        productData?.data?.pricingConfiguration
                          ?.applicableTenorMax
                      } ${
                        Interval[
                          productData?.data?.pricingConfiguration
                            ?.applicableTenorMaxUnit
                        ]
                      }`}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Applicable Principal
                    </span>
                    <span className="font-normal block">
                      {currencyFormatter(
                        productData?.data?.pricingConfiguration
                          ?.applicablePrincipalMin,
                        productData?.data?.productInfo.currency
                      )}{" "}
                      {productData?.data?.pricingConfiguration
                        ?.applicablePrincipalMax
                        ? `- ${currencyFormatter(
                            productData?.data?.pricingConfiguration
                              ?.applicablePrincipalMax,
                            productData?.data?.productInfo?.currency
                          )}`
                        : "and above"}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold block mb-[15px]">
                      Interest Rate
                    </span>
                    <span className="font-normal block">{productData?.data?.slogan}</span>
                    <button
                      className="text-[#636363]  underline"
                      onClick={() => setOpen(true)}
                    >
                      View more
                    </button>
                  </div>
                  {productData?.data?.liquidation
                    ?.part_AllowPartLiquidation && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Part Liquidation
                      </span>
                      <span className="font-normal block">
                        Maximum of{" "}
                        {
                          productData?.data?.liquidation
                            ?.part_MaxPartLiquidation
                        }
                        %{" "}
                        {productData?.data?.liquidation
                          ?.part_LiquidationPenalty === "pay" && (
                          <span> with penalty</span>
                        )}
                      </span>
                    </div>
                  )}
                  {productData?.data?.liquidation
                    ?.early_AllowEarlyLiquidation && (
                    <div>
                      <span className="font-bold block mb-[15px]">
                        Early Liquidation
                      </span>
                      <span className="font-normal block">
                        Allowed{" "}
                        {productData?.data?.liquidation
                          ?.early_LiquidationPenalty === "pay" &&
                          "with penalty"}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="font-bold block mb-[15px]">
                      Principal Deposit Charge & Tax
                    </span>
                    <div className="flex items-center flex-wrap gap-x-1">
                      <span className="font-normal block">Charges :</span>
                      <span className="font-normal block">
                        Maintenance , Auction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="h-[500px] flex items-center justify-center">
            <div className="spinner-border h-11 w-11 border-t border-danger-500 rounded-full animate-spin"></div>
          </div>
        )}
        <ModalLayout isOpen={open} setIsOpen={setOpen}>
          <div className="px-[30px] pt-[64px] pb-[20px] bg-white w-[400px] rounded-lg relative">
            <ul className="max-h-[345px] overflow-y-auto flex flex-col gap-y-5">
              {data.map((item, idx) => (
                <li key={`${item}-${idx}`}>{item}</li>
              ))}
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
}
