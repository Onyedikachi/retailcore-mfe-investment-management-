import React, { useContext, useEffect, useState } from "react";
import { ImInfo } from "react-icons/im";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { IoMdAddCircle } from "react-icons/io";
import { MinMaxInput } from "@app/components/forms";
import { BorderlessSelect } from "@app/components/forms";
import {
  IntervalOptions,
  interestComputationDaysOptions,
  VaryOptions,
} from "@app/constants";
import { useGetInvestmentDetailQuery } from "@app/api";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SecurityPricingSchema } from "@app/constants";
import { FormToolTip } from "@app/components";
import { toolTips } from "@app/constants";
import { RedDot } from "@app/components/forms";
import { useParams } from "react-router-dom";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { AppContext } from "@app/utils";
import BottomBarLoader from "@app/components/BottomBarLoader";

const labels = [
  "Applicable Tenor",
  "Applicable Principal",
  "Applicable Interest Rate Range (Per Annum)",
];

export function validateSlab(values, type, principalMax, tenorMax) {
  const lastSlab =
    values.interestRateConfigModels[values.interestRateConfigModels.length - 1];

  if (parseInt(type, 10) === 0) {
    return lastSlab?.principalMax === principalMax;
  }
  if (parseInt(type, 10) === 1) {
    return lastSlab?.tenorMax === tenorMax;
  }
  if (parseInt(type, 10) === 2) {
    return true;
  }
  return false;
}
export function InputDivs({ children, label, requiredField = true }) {
  return (
    <div className="flex flex-col gap-[10px] ">
      <div className="flex  gap-2 min-w-[360px]">
        {" "}
        <label className=" flex text-base font-medium text-[#636363]">
          {label}
          <span className="flex"> {requiredField && <RedDot />}</span>
        </label>
        {label == labels[0] && <FormToolTip tip={toolTips.applicableTenor} />}
        {label == labels[1] && (
          <FormToolTip tip={toolTips.applicablePrincipal} />
        )}
        {label == labels[2] && (
          <FormToolTip tip={toolTips.applicableInterestRange} />
        )}
      </div>

      <div className=" bg-[#ffffff]   border border-[#EEEEEE] rounded-[10px] px-6 py-5 flex flex-col gap-5 ">
        {children}
      </div>
    </div>
  );
}
export default function MoneyPricingConfig({
  proceed,
  formData,
  setFormData,
  setDisabled,
  productData,
  initiateDraft,
}) {

  const { currencies } = useContext(AppContext);
  const { process } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    control,
    setError,
    getValues,
    trigger,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SecurityPricingSchema),
    defaultValues: formData,
  });

  function onProceed() {
    // setFormData({ ...d });
    proceed();
  }

  const values = getValues();

  useEffect(() => {
    setDisabled(true);
  }, []);

  const { data, isLoading } = useGetInvestmentDetailQuery(
    {
      id:productData?.productInfo?.securitPurchaseId,
      investmentType: "security-purchase",
    },
    { skip: !productData?.productInfo?.securitPurchaseId }
  );
  useEffect(() => {

    // setValue("faceValue",data?.data?.faceValue)
    // setValue("totalConsideration",data?.data?.totalConsideration)
    // setValue("perAmount", data?.data?.perAmount)
    // setValue("discountRate", data?.data?.discountRate)
    // setValue("interestComputationMethod", data?.data?.interestComputationMethod)
    setDisabled(false);
  }, [data]);

  return (
    <form id="customereligibilitycriteria" onSubmit={onProceed}>
      {!isLoading ? (
        <div className="flex flex-col gap-10 max-w-[860px]">
          <div className="grid grid-cols-2 gap-x-[48px] gap-y-[36px] ">
            <div className="">
              <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
                <span>
                  {" "}
                  Applicable Face Value <RedDot />
                </span>
                <FormToolTip tip={toolTips.faceValue} />
              </div>

              <MinMaxInput
                className="w-[360px]"
                label={""}
                currency={data?.data?.currencyCode}
                register={register}
                inputName={"faceValue"}
                defaultValue={data?.data?.faceValue}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                isCurrency
                type="number"
                disabled
              />
            </div>{" "}
            <div className="">
              <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
                <span>
                  {" "}
                  Consideration <RedDot />
                </span>
                <FormToolTip tip={toolTips.totalConsideration} />
              </div>
              <MinMaxInput
                className="w-[360px]"
                label={""}
                currency={data?.data?.currencyCode}
                register={register}
                inputName={"totalConsideration"}
                defaultValue={data?.data?.totalConsideration}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                isCurrency
                disabled
              />
            </div>
            <div className="">
              <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
                <span>
                  {" "}
                  Discount rate <RedDot />
                </span>
                <FormToolTip tip={toolTips.discountRate} />
              </div>
              <MinMaxInput
                className="w-[360px]"
                label={""}
                register={register}
                inputName={`discountRate`}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                defaultValue={data?.data?.discountRate}
                clearErrors={clearErrors}
                max={100}
                isPercent
                isCurrency
                disablegroupseparators
                disabled

                // defaultValue={range.min}
              />
            </div>{" "}
            <div className="">
              <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
                <span>
                  {" "}
                  Per amount <RedDot />
                </span>
                <FormToolTip tip={toolTips.perAmount} />
              </div>
              <MinMaxInput
                className="w-[360px]"
                label={""}
                currency={data?.data?.currencyCode}
                register={register}
                inputName={"perAmount"}
                defaultValue={data?.data?.perAmount}
                errors={errors}
                setValue={setValue}
                trigger={trigger}
                clearErrors={clearErrors}
                isCurrency
                disabled
              />
            </div>
          </div>

          <div className="">
            <div className="capitalize min-w-[360px] flex items-center gap-[5px] text-[##636363] text-base font-medium mb-2">
              <span>
                {" "}
                Interest Computation Days in Year Method <RedDot />
              </span>
              {/* <FormToolTip tip={toolTips.interestComputation} /> */}
              <Tooltip
                theme="light"
                distance={20}
                size="small"
                arrow
                className="bg-white max-w-[320px]"
                html={
                  <div className="text-left text-xs  max-w-[320px]">
                    <p>
                      <span className="font-semibold">30E/360:</span> Counts the
                      days from the calendar, but also introduces some changes
                      on the months with 31 and 28 days.
                    </p>
                    <p>
                      <span className="font-semibold"> Actual/360:</span>{" "}
                      Computes the interest daily by counting the number of days
                      in the calendar, but using a fixed 360-day year length.
                    </p>
                    <p>
                      <span className="font-semibold"> Actual/365:</span>{" "}
                      Calculates the interest daily by counting the number of
                      days in the calendar and using a fixed 365-day year length
                    </p>
                  </div>
                }
              >
                <div className="w-[18px] h-[18px] text-[#636363]">
                  <ImInfo />
                </div>
              </Tooltip>
            </div>

            <div className="w-[360px]">
              <BorderlessSelect
                inputError={errors?.interestComputationMethod}
                inputName={"interestComputationMethod"}
                options={interestComputationDaysOptions}
                defaultValue={data?.data?.interestComputationMethod}
                errors={errors}
                trigger={trigger}
                clearErrors={clearErrors}
                setValue={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-20">
          <BottomBarLoader />
        </div>
      )}
    </form>
  );
}
