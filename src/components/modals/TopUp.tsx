import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import ModalLayout from "./Layout";
import {
  useGetInvestmentDetailQuery,
  useGetUserQuery,
  useGetUsersPermissionsQuery,
  useTopUpCalculationMutation,
} from "../../api";
import { AppContext, removeNullEmptyKeys } from "@app/utils";
import { Switch } from "@headlessui/react";
import { ProductSearch, Button, FormToolTip } from "@app/components";
import { FormUpload, MinMaxInput, RedDot } from "../forms";
import { Interval, TopUpSchema } from "@app/constants";
import { liquiditiesPenaltyStrings } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { useLiquidationCalculationMutation } from "@app/api";
import { AiOutlineConsoleSql } from "react-icons/ai";

interface TopUpProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: (data: any, type: string, metaInfo: any) => void;
  detail: any;
  title: string;
  type: string;
  productDetails?: any;
  // handleTopUp?: (e: any) => {};
}

export const onProceed = (data, onConfirm, type, metaInfo) => {
  onConfirm(data, type, metaInfo);
};

export const handleTopUpCalculationPayload = ({
  detail,
  productDetails,
  type,
  values,
  liquidationUnitEnum,
  liquidationCalculation,
  selection,
}) => {
  if (detail?.principal && productDetails) {
    const payload = {
      principal: detail?.principal,
      amounttoTopUp: values.amounttoTopUp,
      topUpUnit: liquidationUnitEnum[selection],
    };
    liquidationCalculation(payload);
  }
};

export default function TopUp({
  isOpen,
  setIsOpen,
  onConfirm,
  detail,
  title,
  type,
  productDetails,
}: TopUpProps): React.JSX.Element {
  const { tab } = useParams();
  const [metaInfo, setMetaInfo] = useState(null);
  const [principaValue, setPrincipalValue] = useState(null);

  // console.log("okay details kon", detail, tab);

  const initialValues = {
    type: "",
    investementBookingId: detail?.id,
    reason: "",
    documentUrl: "",
    topUpUnit: 2,
    notify: false,
    amounttoTopUp: null,
    maxAmount: principaValue,
  };
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValues, // Provide initial values
    resolver: yupResolver(TopUpSchema), // Use the Yup resolver
  });
  const { currencies } = useContext(AppContext);
  const [defaultValue, setDefaultValue] = useState("");
  const [selection, setSelection] = useState(0);

  const values = getValues();
  const [isChecked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [percentValue, setPercentValue] = useState(100);
  const [amountValue, setAmountValue] = useState(300000000);
  const [liquidationValue, setTopUpValue] = useState(0);
  const liquidationUnitEnum = {
    currency: 0,
    percent: 1,
  };

  const {
    data: bookingDetails,
    isLoading: bookingDetailsIsLoading,
    isSuccess: bookingDetailsIsSuccess,
  } = useGetInvestmentDetailQuery(
    {
      id: detail?.metaInfo ? detail?.investmentBookingId : detail?.id,
      investmentType: tab,
    },
    { skip: !detail?.investmentBookingId && !detail?.id }
  );

  const [
    topUpCalculation,
    {
      data: topUpCalculationData,
      isSuccess: isTopUpCalculationSuccess,
      isError: isTopUpCalculationError,
      error: topUpCalculationError,
      isLoading: isTopUpCalculationLoading,
    },
  ] = useTopUpCalculationMutation();

  useEffect(() => {
    if (detail?.metaInfo) {
      setMetaInfo(JSON.parse(detail?.metaInfo)?.investmentProductId);
      const data = JSON.parse(detail?.metaInfo);

      setMetaInfo(data);
      setChecked(data?.notify);
      setSelection(data.topUpUnit);
      Object.keys(data).forEach((item) => {
        // @ts-ignore
        setValue(item, data[item]);
      });
    }
  }, [detail, bookingDetailsIsSuccess]);

  useEffect(() => console.log(values), [values])

  useEffect(() => setValue("type", type));

  useEffect(() => {
    if (bookingDetails?.data && productDetails) {
      const payload = {
        principal: bookingDetails?.data?.facilityDetailsModel?.principal,
        [type === "topup" ? "amounttoTopUp" : "amounttoWithdraw"]: parseInt(
          values?.amounttoTopUp
        ),
        [type === "topup" ? "topUpUnit" : "withdrawalUnit"]: selection,
        investmentBookingId: !detail?.metaInfo
          ? detail?.id
          : detail?.investmentBookingId,
      };
      topUpCalculation(payload);
    }
  }, [
    bookingDetailsIsSuccess,
    detail,
    productDetails,
    values.amounttoTopUp,
    selection,
    metaInfo,
  ]);

  useEffect(() => {
    if (isTopUpCalculationSuccess) {
      setTopUpValue(topUpCalculationData?.data);
    }
  }, [
    bookingDetailsIsSuccess,
    topUpCalculationData,
    isTopUpCalculationSuccess,
  ]);

  useEffect(() => {
    setPrincipalValue(parseInt(bookingDetails?.data?.facilityDetailsModel?.principal));
  }, [bookingDetails?.data?.facilityDetailsModel?.principal])

  useEffect(() => {
    console.log("lq = ", (liquidationValue <= principaValue), values)
  }, [liquidationValue, principaValue])

  useEffect(() => {
    setValue("notify", isChecked);
  }, [isChecked]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    setValue("maxAmount", selection === 1 ? percentValue : principaValue);
  }, [selection, percentValue, amountValue, principaValue]);

  useEffect(() => {
    trigger("amounttoTopUp");
  }, [selection]);

  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} data-testid="Layout">
      {(productDetails || bookingDetails) && (
        <form
          onSubmit={handleSubmit((d: any) =>
            onProceed(
              {
                ...d,
                [type === "topup" ? "amounttoTopUp" : "amounttoWithdraw"]:
                  parseInt(values?.amounttoTopUp),
                [type === "topup" ? "topUpUnit" : "withdrawalUnit"]: selection,
                id: detail?.id,
              },
              onConfirm,
              type,
              metaInfo
            )
          )}
        >
          <div className="w-[700px] p-8 rounded-lg bg-white text-left shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="flex justify-between items-center pb-4 mb-[42px] border-b border-[#CCCCCC]">
              <h3 className="text-[#747373] font-bold text-xl uppercase">
                {tab === "security-purchase"
                  ? "security PURCHASE Top up Request"
                  : type === "topup"
                    ? "INVESTMENT TOP UP REQUEST"
                    : "principal withdrawal request"}
              </h3>
              <button
                data-testid="cancel-btn"
                onClick={() => setIsOpen(false)}
                className="p-2 outline-none bg-transparent"
              >
                <FaTimes className="text-[#002266] opacity-60 hover:opacity-50" />
              </button>
            </div>

            <div className="overflow-y-auto h-[500px] pr-6">
              <div>
                {type === "withdraw" && (
                  <div className="mb-10 flex items-center gap-x-[50px]">
                    <label
                      htmlFor="Principal"
                      className="flex items-center text-[#333333] mb-2 gap-x-1"
                    >
                      Principal value{" "}
                      <span className="flex">
                        {" "}
                        <RedDot />
                      </span>
                    </label>

                    <div className="relative flex flex-1 items-start max-w-[642px] mb-[2px] py-2 px-3 bg-[#EEEEEE]">
                      {currencyFormatter(
                        parseInt(
                          bookingDetails?.data?.facilityDetailsModel?.principal
                        ),
                        bookingDetails?.data?.currencyCode
                      )}
                    </div>
                  </div>
                )}
                <div className="mb-10">
                  <label
                    htmlFor="reason"
                    className="flex items-center text-[#333333] mb-2 gap-x-1"
                  >
                    Amount to{" "}
                    {tab === "security-purchase" || "individual"
                      ? "top up"
                      : type}{" "}
                    <span className="flex">
                      {" "}
                      <RedDot />
                    </span>
                  </label>

                  <div className="relative flex items-start max-w-[642px] mb-[2px] py-2">
                    <MinMaxInput
                      inputName="amounttoTopUp"
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      trigger={trigger}
                      clearErrors={clearErrors}
                      isCurrency={selection === 0}
                      isPercent={selection === 1}
                      defaultValue={values?.amounttoTopUp}
                      type="number"
                      placeholder="Enter value"
                    />

                    <div className="overflow-hidden absolute right-0 text-[10px] text-[#8F8F8F] flex items-center   rounded-full shadow-[0px_0px_1px_0px_rgba(26,32,36,0.32),0px_1px_2px_0px_rgba(91,104,113,0.32)] border-[#E5E9EB]">
                      <span
                        role="button"
                        onKeyDown={() => { }}
                        tabIndex={0}
                        onClick={() => {
                          setSelection(0);
                        }}
                        className={`w-[55px] border-r border-[#E5E9EB] py-1 px-2 ${selection === 0 ? "bg-[#FFE9E9] " : ""
                          }`}
                      >
                        {" "}
                        {productDetails?.productInfo?.currencyCode ||
                          bookingDetails?.data?.currencyCode}
                      </span>

                      <span
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => { }}
                        onClick={() => {
                          setSelection(1);
                        }}
                        className={`w-[55px] py-1 px-2 ${selection === 1 ? "bg-[#FFE9E9] " : ""
                          }`}
                      >
                        {" "}
                        Percent
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <label
                    htmlFor="reason"
                    className="flex items-center text-[#333333] mb-2 gap-x-1"
                  >
                    Provide justification for{" "}
                    {tab === "security-purchase"
                      ? "security purchase top up"
                      : type === "topup"
                        ? "investment topup"
                        : "principal withdrawal"}
                    <span className="flex">
                      {" "}
                      <RedDot />
                    </span>
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    className="outline-none border border-[#AAAAAA] rounded-lg px-3 py-[11px] w-full resize-none"
                    placeholder="Reason"
                    data-testid="reason-input"
                    defaultValue={metaInfo?.reason}
                    {...register("reason")}
                  ></textarea>
                  <ErrorMessage
                    errors={errors}
                    name="reason"
                    render={({ message }) => (
                      <p className="text-red-600 text-xs">{message}</p>
                    )}
                  />
                </div>
                <div className="mb-10">
                  <div className="flex items-center gap-2 w-[300px]">
                    <label
                      htmlFor="upload"
                      className="flex items-center text-[#333333] mb-2 gap-x-1"
                    >
                      Upload Supporting Documents{" "}
                    </label>
                  </div>
                  <FormUpload
                    data-testid="input"
                    accept={["jpg", "jpeg", "png", "pdf", "docx"]}
                    onUploadComplete={(value) => {
                      setValue("documentUrl", value);
                      trigger();
                    }}
                    setDefaultValue={setDefaultValue}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="documentUrl"
                    render={({ message }) => (
                      <p className="text-red-600 text-xs">{message}</p>
                    )}
                  />
                </div>

                {tab !== "security-purchase" && (
                  <div className="mb-10 flex items-center gap-x-2">
                    <div className="flex items-center gap-2 w-[350px]">
                      <label
                        htmlFor="upload"
                        className="text-[#333333] mb-2 flex items-center"
                      >
                        Notify customer of{" "}
                        {tab === "individual"
                          ? "investment topup"
                          : "principal withdrawal"}
                        <span className="flex">
                          {" "}
                          <RedDot />
                        </span>
                      </label>
                      <FormToolTip tip="Hello" />
                    </div>
                    <Switch
                      checked={isChecked}
                      onChange={(data) => setChecked(data)}
                      className={classNames(
                        isChecked ? "bg-[#CF2A2A]" : "bg-transparent",
                        "border-[#CF2A2A] relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border  transition-colors duration-200 ease-in-out focus:outline-none ring-0  "
                      )}
                    >
                      <span
                        data-testid="switch"
                        aria-hidden="true"
                        className={classNames(
                          isChecked
                            ? "translate-x-[14px] bg-white"
                            : "translate-x-0  bg-white ",
                          "pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full border border-[#CF2A2A] shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                    <ErrorMessage
                      errors={errors}
                      name="notify"
                      render={({ message }) => (
                        <p className="text-red-600 text-xs">{message}</p>
                      )}
                    />
                  </div>
                )}

                {type === "withdraw" && (
                  <div className="mb-10 rounded-[10px] border border-[#EBEBEB] bg-[#AAAAAA12] py-6 px-5">
                    <div className="flex items-center gap-x-1 mb-2">
                      <span className="inline-flex mr-1">
                        <FaInfoCircle className="text-[#D4A62F]" />
                      </span>
                      <span className="text-sm text-[#747373] font-semibold capitalize">
                        Principal withdrawal
                      </span>
                    </div>

                    <ul className="flex flex-col gap-y-2">
                      <li className="text-sm text-[#747373]">
                        {" "}
                        Call deposit contract will continue until end of tenor
                      </li>
                      <li className="text-sm text-[#747373]">
                        {" "}
                        Interest accrual will be calcualted based on principal
                        balance
                      </li>
                      <li className="text-sm text-[#747373]">
                        {" "}
                        Topup is alloowed till; the end of the call deposit
                        contract/tenor
                      </li>
                    </ul>
                  </div>
                )}
                <div className="flex items-center mb-10 rounded-[10px] border border-[#EBEBEB] bg-[#AAAAAA12] py-6 px-5 gap-x-1">
                  <span className="text-sm text-[#747373] capitalize">
                    {tab === "security-purchase"
                      ? "security purchase top up"
                      : type === "topup"
                        ? "investment topup"
                        : "principal withdrawal"}{" "}
                    value:{" "}
                  </span>
                  <span className="text-sm text-[#747373] font-semibold">
                    {currencyFormatter(
                      liquidationValue,
                      productDetails?.productInfo?.currencyCode ||
                      bookingDetails?.data?.currencyCode
                    )}
                  </span>
                </div>

                <div className="flex justify-center items-center">
                  <Button
                    type="submit"
                    disabled={!isValid}
                    data-testid="submit-btn"
                    className="rounded-lg text-base font-medium py-[5px] bg-sterling-red-800 border border-[#D8DAE5] text-white px-10"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </ModalLayout>
  );
}
