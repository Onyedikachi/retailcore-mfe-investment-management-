import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputDivs } from "@app/components/pages/term-deposit/forms/accounting-entries-and-events";
import { BorderlessSelect, Checkbox, MinMaxInput } from "@app/components/forms";
import { Switch } from "@headlessui/react";
import {
  Interval,
  RollOverOptions,
  TransactionSettingModelSchema,
} from "@app/constants";
import { useGetCustomerProfileQuery } from "@app/api";
import { capitalizeFirstLetter } from "@app/utils";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const onProceed = (data, proceed, formData, setFormData) => {
  // console.log("🚀 ~ onProceed ~ data:", data);
  // // setFormData({
  // //   ...formData,
  // //   transactionSettingModel: data,
  // // });
  proceed();
};

type TransactionSettingsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
  setDisabled?: any;
  isSavingDraft?: boolean;
  productDetail?: any;
};
export default function TransactionSettings({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  productDetail,
}: TransactionSettingsProps) {
  console.log("🚀 ~ formData:", formData);
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
    resolver: yupResolver(TransactionSettingModelSchema),
    defaultValues: formData.transactionSettingModel,
    mode: "all",
  });
  const values = getValues();
  console.log("🚀 ~ values:", values);

  const [customerData, setCustomerData] = useState<any>([]);
  const {
    data: profileData,
    isSuccess: profileIsSuccess,
    isError: profileIsError,
    error: profileError,
    isLoading: profileLoading,
  } = useGetCustomerProfileQuery(
    formData?.customerBookingInfoModel?.customerId,
    {
      skip: !formData?.customerBookingInfoModel?.customerId,
    }
  );

  useEffect(() => {
    if (profileIsSuccess) {
      const accountData = profileData.data.customer_products?.map((i: any) => {
        return {
          id: i?.customerProductId,
          text: i?.accountNumber,
          value: i?.accountNumber,
        };
      });
      if (
        accountData?.length &&
        !formData?.transactionSettingModel?.accountForLiquidation
      ) {
        setFormData({
          ...formData,
          transactionSettingModel: {
            ...formData?.transactionSettingModel,
            accountForLiquidation: accountData[0].value,
          },
        });
        setValue("accountForLiquidation", accountData[0].value);
      }

      setCustomerData(accountData);
    }
  }, [profileIsError, profileIsSuccess, profileLoading, profileData]);

  // useEffect(() => {
  //   setFormData({ ...formData, transactionSettingModel: values });
  // }, [isSavingDraft]);

  useEffect(() => {
    setDisabled(!isValid);
  }, [isValid]);
  return (
    <form
      id="transactionSettings"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) =>
        onProceed(d, proceed, formData, setFormData)
      )}
    >
      {" "}
      <div className="flex flex-col gap-4 px-[30px] py-5">
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs label={"Account for liquidation"}>
            <div className="flex gap-[15px]">
              <div className="w-[360px]">
                <BorderlessSelect
                  inputError={errors?.accountForLiquidation}
                  register={register}
                  inputName={"accountForLiquidation"}
                  defaultValue={
                    formData?.transactionSettingModel?.accountForLiquidation
                  }
                  options={customerData}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select account"
                />
              </div>
            </div>
          </InputDivs>
          <InputDivs
            label={"Notify customer when maturity is due"}
            isCompulsory={false}
          >
            <div className="flex gap-[15px]">
              <div className="w-[360px]">
                <div>
                  <Switch
                    checked={
                      formData?.transactionSettingModel
                        ?.notifyCustomerOnMaturity
                    }
                    onChange={(value) => {
                      setValue("notifyCustomerOnMaturity", value);
                      setFormData({
                        ...formData,
                        transactionSettingModel: {
                          ...formData?.transactionSettingModel,
                          notifyCustomerOnMaturity: value,
                        },
                      });
                    }}
                    className={classNames(
                      formData?.transactionSettingModel
                        ?.notifyCustomerOnMaturity
                        ? "bg-[#CF2A2A]"
                        : "bg-transparent",
                      "border-[#CF2A2A] relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border  transition-colors duration-200 ease-in-out focus:outline-none ring-0  "
                    )}
                  >
                    <span className="sr-only">Notify</span>
                    <span
                      data-testid="switch"
                      aria-hidden="true"
                      className={classNames(
                        formData?.transactionSettingModel
                          ?.notifyCustomerOnMaturity
                          ? "translate-x-[14px] bg-white"
                          : "translate-x-0  bg-white ",
                        "pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full border border-[#CF2A2A] shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </InputDivs>

          {formData?.facilityDetailsModel?.capitalizationMethod == 2 && (
            <InputDivs
              label={"Rollover after maturity"}
              isCompulsory={false}
              subLabel={
                "This is applicable if the investment is not liquidated before maturity"
              }
            >
              <div className="flex gap-[15px]">
                <div className="w-[360px] flex items-center gap-x-3">
                  <div>
                    <Checkbox
                      label={""}
                      onChange={(value) => {
                        setValue("rollOverAtMaturity", value);
                        setFormData({
                          ...formData,
                          transactionSettingModel: {
                            ...formData?.transactionSettingModel,
                            rollOverAtMaturity: value,
                          },
                        });
                      }}
                      checked={
                        formData?.transactionSettingModel?.rollOverAtMaturity
                      }
                    />
                  </div>
                  <div
                    className={
                      !formData?.transactionSettingModel?.rollOverAtMaturity
                        ? "opacity-60"
                        : ""
                    }
                  >
                    <BorderlessSelect
                      inputName={"rollOverOption"}
                      disabled={
                        !formData?.transactionSettingModel?.rollOverAtMaturity
                      }
                      inputError={errors?.rollOverOption}
                      register={register}
                      defaultValue={
                        formData?.transactionSettingModel?.rollOverOption
                      }
                      options={RollOverOptions}
                      errors={errors}
                      setValue={setValue}
                      trigger={trigger}
                      clearErrors={clearErrors}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>
            </InputDivs>
          )}
          {productDetail?.liquidation?.early_AllowPartLiquidation ||
            (productDetail?.liquidation?.part_AllowPartLiquidation && (
              <div className="mt-10 flex flex-col w-full gap-y-2 py-6 px-5 rounded-lg border border-[#EBEBEB] bg-[#AAAAAA12]">
                {productDetail?.liquidation?.early_AllowEarlyLiquidation && (
                  <p className="flex gap-4 items-center">
                    <span>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_48842_45413)">
                          <path
                            d="M7.65 12.75H9.35V7.65H7.65V12.75ZM8.5 5.95C8.74083 5.95 8.94285 5.8684 9.10605 5.7052C9.26868 5.54257 9.35 5.34083 9.35 5.1C9.35 4.85917 9.26868 4.65715 9.10605 4.49395C8.94285 4.33132 8.74083 4.25 8.5 4.25C8.25917 4.25 8.05743 4.33132 7.8948 4.49395C7.7316 4.65715 7.65 4.85917 7.65 5.1C7.65 5.34083 7.7316 5.54257 7.8948 5.7052C8.05743 5.8684 8.25917 5.95 8.5 5.95ZM8.5 17C7.32417 17 6.21917 16.7767 5.185 16.3302C4.15083 15.8842 3.25125 15.2788 2.48625 14.5138C1.72125 13.7488 1.11577 12.8492 0.6698 11.815C0.223267 10.7808 0 9.67583 0 8.5C0 7.32417 0.223267 6.21917 0.6698 5.185C1.11577 4.15083 1.72125 3.25125 2.48625 2.48625C3.25125 1.72125 4.15083 1.11548 5.185 0.66895C6.21917 0.222983 7.32417 0 8.5 0C9.67583 0 10.7808 0.222983 11.815 0.66895C12.8492 1.11548 13.7488 1.72125 14.5138 2.48625C15.2788 3.25125 15.8842 4.15083 16.3302 5.185C16.7767 6.21917 17 7.32417 17 8.5C17 9.67583 16.7767 10.7808 16.3302 11.815C15.8842 12.8492 15.2788 13.7488 14.5138 14.5138C13.7488 15.2788 12.8492 15.8842 11.815 16.3302C10.7808 16.7767 9.67583 17 8.5 17Z"
                            fill="#D5A62F"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_48842_45413">
                            <rect width="17" height="17" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="font-normal text-[#747373]">
                      The customer is to provide a notice of{" "}
                      <span className="font-bold">
                        {" "}
                        {productDetail?.liquidation?.early_NoticePeriod}{" "}
                        {
                          Interval[
                            productDetail?.liquidation?.early_NoticePeriodUnit
                          ]
                        }
                      </span>{" "}
                      before early liquidation can be processed.{" "}
                    </span>
                  </p>
                )}
                {productDetail?.liquidation?.part_AllowPartLiquidation && (
                  <p className="flex gap-4 items-center">
                    <span>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_48842_45413)">
                          <path
                            d="M7.65 12.75H9.35V7.65H7.65V12.75ZM8.5 5.95C8.74083 5.95 8.94285 5.8684 9.10605 5.7052C9.26868 5.54257 9.35 5.34083 9.35 5.1C9.35 4.85917 9.26868 4.65715 9.10605 4.49395C8.94285 4.33132 8.74083 4.25 8.5 4.25C8.25917 4.25 8.05743 4.33132 7.8948 4.49395C7.7316 4.65715 7.65 4.85917 7.65 5.1C7.65 5.34083 7.7316 5.54257 7.8948 5.7052C8.05743 5.8684 8.25917 5.95 8.5 5.95ZM8.5 17C7.32417 17 6.21917 16.7767 5.185 16.3302C4.15083 15.8842 3.25125 15.2788 2.48625 14.5138C1.72125 13.7488 1.11577 12.8492 0.6698 11.815C0.223267 10.7808 0 9.67583 0 8.5C0 7.32417 0.223267 6.21917 0.6698 5.185C1.11577 4.15083 1.72125 3.25125 2.48625 2.48625C3.25125 1.72125 4.15083 1.11548 5.185 0.66895C6.21917 0.222983 7.32417 0 8.5 0C9.67583 0 10.7808 0.222983 11.815 0.66895C12.8492 1.11548 13.7488 1.72125 14.5138 2.48625C15.2788 3.25125 15.8842 4.15083 16.3302 5.185C16.7767 6.21917 17 7.32417 17 8.5C17 9.67583 16.7767 10.7808 16.3302 11.815C15.8842 12.8492 15.2788 13.7488 14.5138 14.5138C13.7488 15.2788 12.8492 15.8842 11.815 16.3302C10.7808 16.7767 9.67583 17 8.5 17Z"
                            fill="#D5A62F"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_48842_45413">
                            <rect width="17" height="17" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="font-normal text-[#747373]">
                      The customer is to provide a notice of{" "}
                      <span className="font-bold">
                        {" "}
                        {productDetail?.liquidation?.part_NoticePeriod}{" "}
                        {
                          Interval[
                            productDetail?.liquidation?.part_NoticePeriodUnit
                          ]
                        }
                      </span>{" "}
                      before part liquidation can be processed.{" "}
                    </span>
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </form>
  );
}
