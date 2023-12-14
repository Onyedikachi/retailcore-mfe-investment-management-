import React, { useEffect, useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { FormDate } from "@app/components/forms";
import { FormToolTip } from "@app/components";
import { BorderlessSelect, DateSelect } from "@app/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RedDot } from "@app/components/forms";

import {
  ProductInformationFormSchema,
  currencyOptions,
  toolTips,
} from "@app/constants";
import debounce from "lodash.debounce";
import { useParams, useSearchParams } from "react-router-dom";
import { useValidateNameMutation } from "@app/api";
import moment from "moment";
const defaultLength = 50;
const defaultSloganLength = 160;

export function handleValidatingName(
  nameIsSuccess,
  setIsNameOkay,
  nameIsError,
  assignError,
  nameError,
  trigger,
  charLeft,
  clearErrors
) {
  if (nameIsError) {
    // trigger("productName");
    assignError("productName", {
      type: "custom",
      message: nameError?.message?.Message,
    });

    setIsNameOkay(false);
  }
  if (nameIsSuccess && charLeft < 47) {
    trigger("productName");
    clearErrors("productName");
    setIsNameOkay(true);
  }
}

export function InputDiv({ children }) {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
}
export function handleName(
  validateName,
  watchName,
  formData,
  setCharLeft,
  clearErrors,
  setError,
  setIsNameOkay,
  setDisabled,
  setCurrentName,
  compareValues,
  timer = 800,
  id = ""
) {
  const namelength = watchName?.length;
  const remainder = defaultLength - Number(namelength);

  setCharLeft(remainder);
  clearErrors("productName");
  setCurrentName(watchName);
  if (!watchName) return;
  if (watchName.length > 3) {
    debounce(() => {
      if (formData?.oldValue?.toLowerCase() === watchName.toLowerCase()) {
        setError("");
        setIsNameOkay(false);
        compareValues();
        return;
      }
      validateName({ productName: watchName, productId: id || null });
    }, 1000)();
  } else {
    setError("");
    setIsNameOkay(false);
    setDisabled(true);
  }
}

export function handleSlogan(
  watchSlogan,
  setSloganCharLeft,
  setIsSloganOkay,
  clearErrors,
  setError
) {
  const sloganLength = watchSlogan?.length;
  const remainder = defaultSloganLength - Number(sloganLength);

  setSloganCharLeft(remainder);
  clearErrors("slogan");

  if (!watchSlogan) return;
  if (watchSlogan.length > 0) {
    setIsSloganOkay(true);
  } else {
    setIsSloganOkay(false);
  }
}

//ProductInformation
export default function ProductInformation({
  formData,
  setFormData,
  setDisabled,
  proceed,
  initiateDraft,
}) {
  //useForm
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError: assignError,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ProductInformationFormSchema),
    defaultValues: formData,
    mode: "all",
  });

  //useState
  const values = getValues();
  const productFormRef = useRef();
  const { process } = useParams();
  const [error, setError] = useState<string>("");
  const [charLeft, setCharLeft] = useState<number>(50);
  const [sloganCharLeft, setSloganCharLeft] = useState<number>(160);
  const [currentName, setCurrentName] = useState("");
  const [isNameOkay, setIsNameOkay] = useState<boolean>(false);
  const [isSloganOkay, setIsSloganOkay] = useState<boolean>(false);
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [
    validateName,
    {
      isLoading: nameLoading,
      isSuccess: nameIsSuccess,
      isError: nameIsError,
      error: nameError,
    },
  ] = useValidateNameMutation();

  useEffect(() => {
    handleValidatingName(
      nameIsSuccess,
      setIsNameOkay,
      nameIsError,
      assignError,
      nameError,
      trigger,
      charLeft,
      clearErrors
    );
  }, [nameIsSuccess, nameIsError]);
  function compareValues() {
    const name = getValues("name");
    // const conditions = [

    // ];

    // if (conditions.some((condition) => condition)) {
    //   // setDisabled(false);
    // } else {
    //   // setDisabled(true);
    // }
  }

  function onProceed(d: any) {
    setFormData({
      ...d,
      startDate: d.startDate && moment(d.startDate).format("yyyy-MM-DD"),
      endDate: d.endDate && moment(d.endDate).format("yyyy-MM-DD"),
    });
    proceed();
  }
  useEffect(() => {
    if (initiateDraft) {
      setFormData({
        ...values,
        startDate:
          values.startDate && moment(values.startDate).format("yyyy-MM-DD"),
        endDate: values.endDate && moment(values.endDate).format("yyyy-MM-DD"),
      });
    }
  }, [initiateDraft]);
  useEffect(() => {
    setDisabled(!isValid);
  }, [values]);

  useEffect(() => {
    if (formData) {
      Object.entries(formData).forEach(([name, value]) =>
        setValue(name, value)
      );
      if (process === "continue" || process === "modify" || process === "withdraw_modify" || process === "clone") {
        trigger();
       if(formData.productName && id){
        validateName({
          productName: formData.productName,
          productId: id || productId || null,
        });
       }
        
      }
    }
  }, [setValue, formData, process, id]);

  //watchers
  const watchStartDate = new Date(watch("startDate"));
  const watchProductName = watch("productName");
  const watchProductDesc = watch("description");
  const watchCurrency = watch("currency");
  watchStartDate.setDate(watchStartDate.getDate() + 1);

  useEffect(() => {
    if (
      watchCurrency &&
      watchStartDate &&
      watchProductName &&
      watchProductDesc
    ) {
      trigger();
    }
  }, []);
  return (
    <form id="productform" onSubmit={handleSubmit(onProceed)}>
      <div className="">
        <div className="mb-6 flex flex-col gap-[1px]">
          <div className="flex itemx-center gap-2 w-[300px]">
            {" "}
            <label className=" pt-[10px]  flex text-base font-semibold text-[#636363]">
              Product Name{" "}
              <span className="flex">
                {" "}
                <RedDot />
              </span>
            </label>
            <FormToolTip tip={toolTips.productName} />
          </div>

          <InputDiv>
            <div className="relative flex items-center max-w-[642px]">
              <input
                data-testid="product-name"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] ${
                  errors?.productName || error ? "border-red-500" : ""
                } ${
                  isNameOkay && !errors?.productName ? "border-success-500" : ""
                }`}
                onChange={(e) => {
                  setValue("productName", e.target.value);
                  handleName(
                    validateName,
                    e.target.value,
                    formData,
                    setCharLeft,
                    clearErrors,
                    setError,
                    setIsNameOkay,
                    setDisabled,
                    setCurrentName,
                    compareValues,
                    500,
                    productId
                  );
                }}
                placeholder="Enter Name"
                maxLength={defaultLength}
                defaultValue={formData?.productName}
                aria-invalid={errors?.productName ? "true" : "false"}
              />
              <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
                <span>
                  {" "}
                  {charLeft}/{defaultLength}
                </span>{" "}
                {isNameOkay && !errors?.productName && (
                  <span>
                    <FaCheckCircle className="text-success-500 text-xl" />
                  </span>
                )}
                {(error || errors?.productName) && (
                  <span>
                    <RiErrorWarningFill className="text-danger-500 text-xl w-5 h-5" />
                  </span>
                )}
                {nameLoading && (
                  <AiOutlineLoading className="text-xl text-[#636363] animate-spin" />
                )}
              </div>
            </div>
            {errors?.productName && (
              <span className="text-sm text-danger-500">
                {errors?.productName?.message}
              </span>
            )}
            {isNameOkay && (
              <span className="text-sm text-success-500">
                Name is available
              </span>
            )}
            {error && <span className="text-sm text-danger-500">{error}</span>}
          </InputDiv>
        </div>

        <div className="mb-6 flex flex-col gap-[1px]">
          <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
            Slogan
          </label>

          <InputDiv>
            <div className="relative flex items-center">
              <input
                data-testid="investment-slogan"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] ${
                  errors?.slogan || error ? "border-red-500" : ""
                }`}
                {...register("slogan", {
                  maxLength: 160,
                })}
                onChange={(e) => {
                  handleSlogan(
                    e.target.value,
                    setSloganCharLeft,
                    setIsSloganOkay,
                    clearErrors,
                    setError
                  );
                }}
                placeholder="Enter a slogan"
                maxLength={defaultSloganLength}
                defaultValue={formData?.slogan}
                aria-invalid={errors?.slogan ? "true" : "false"}
              />
              <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
                <span>
                  {sloganCharLeft}/{defaultSloganLength}
                </span>{" "}
                {isSloganOkay && !errors?.slogan && (
                  <span>
                    <FaCheckCircle className="text-success-500 text-xl" />
                  </span>
                )}
                {(error || errors?.slogan) && (
                  <span>
                    <RiErrorWarningFill className="text-danger-500 text-xl w-5 h-5" />
                  </span>
                )}
              </div>
            </div>

            {errors?.slogan && (
              <span className="text-sm text-danger-500">
                {errors?.slogan?.message}
              </span>
            )}

            {error && <span className="text-sm text-danger-500">{error}</span>}
          </InputDiv>
        </div>

        <div className="mb-6 flex flex-col gap-[13px]">
          <div className="flex  gap-2 w-[300px]">
            {" "}
            <label className=" pt-[10px] flex text-base font-semibold text-[#636363]">
              Product Description{" "}
              <span className="flex">
                {" "}
                <RedDot />
              </span>
            </label>
          </div>
          <InputDiv>
            <div className="relative">
              <textarea
                data-testid="product-description"
                placeholder="Enter description"
                maxLength={250}
                {...register("description", {
                  required: true,
                  maxLength: 250,
                })}
                defaultValue={values?.description}
                className={`min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none ${
                  errors?.description || error
                    ? "border-red-500 ring-1 ring-red-500"
                    : ""
                }`}
              />

              {error && (
                <span className="text-sm text-danger-500">{error}</span>
              )}
              <span className="absolute bottom-4 right-2 text-xs text-[#8F8F8F] flex items-center gap-x-1">
                <span>{watch("description").length || 0}</span>/<span>250</span>
              </span>
            </div>
            {errors?.description && (
              <span className="text-sm text-danger-500">
                {errors?.description?.message}
              </span>
            )}
          </InputDiv>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap">
            <div className="flex  gap-x-2 w-[300px]">
              {" "}
              <label className=" pt-[10px]  text-base font-semibold text-[#636363]">
                Product Life Cycle
              </label>
              <FormToolTip tip={toolTips.lifeCycle} />
            </div>

            <div className="flex gap-x-4">
              <FormDate
                register={register}
                inputName={"startDate"}
                errors={errors}
                handleChange={(value) => {
                  setValue("startDate", value);
                }}
                defaultValue={formData?.startDate}
                minDate={new Date()}
                trigger={trigger}
                clearErrors={clearErrors}
              />
              -
              <FormDate
                register={register}
                inputName={"endDate"}
                errors={errors}
                minDate={watchStartDate}
                trigger={trigger}
                handleChange={(value) => {
                  setValue("endDate", value);
                }}
                defaultValue={formData?.endDate}
                clearErrors={clearErrors}
                placeholder="Unspecified"
              />
            </div>
          </div>

          <div className="flex items-end gap">
            {/* <InputDiv> */}
            <div className="w-[300px]">
              <BorderlessSelect
                inputError={errors?.currency}
                register={register}
                errors={errors}
                setValue={setValue}
                inputName={"currency"}
                labelName={"Product Currency"}
                defaultValue={formData?.currency}
                placeholder="Select currency"
                clearErrors={clearErrors}
                requiredField={true}
                tip={toolTips.currency}
                options={currencyOptions}
                trigger={trigger}
              />
            </div>

            {/* </InputDiv> */}
          </div>
        </div>
      </div>
    </form>
  );
}
