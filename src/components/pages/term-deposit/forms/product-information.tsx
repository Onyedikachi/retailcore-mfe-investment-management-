import React, { useEffect, useRef, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { FormDate, CustomInput } from "@app/components/forms";
import { BorderlessSelect, DateSelect } from "@app/components/forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductInformationFormSchema } from "@app/constants";
import debounce from "lodash.debounce";
import { useParams } from "react-router-dom";
import { useValidateNameMutation } from "@app/api";
import moment from "moment";
const defaultLength = 50;
const defaultSloganLength = 160;

export function handleValidatingName(
  nameIsSuccess,
  setIsNameOkay,
  nameIsError,
  setError,
  nameError,
  setDisabled,
  charLeft
) {
  if (nameIsSuccess && charLeft < 47) {
    setIsNameOkay(true);
    setError("");
    setDisabled(false);
  }
  if (nameIsError) {
    setIsNameOkay(false);
    setError(nameError?.message?.Msg);
    setDisabled(true);
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
    }, timer)();
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
}) {
  //
  //useForm
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(ProductInformationFormSchema),
    defaultValues: formData,
  });

  //useState
  const productFormRef = useRef();
  const [error, setError] = useState<string>("");
  const [charLeft, setCharLeft] = useState<number>(50);
  const [sloganCharLeft, setSloganCharLeft] = useState<number>(160);
  const [currentName, setCurrentName] = useState("");
  const [isNameOkay, setIsNameOkay] = useState<boolean>(false);
  const [isSloganOkay, setIsSloganOkay] = useState<boolean>(false);
  const { id, productId } = useParams();
  const [
    validateName,
    {
      isLoading: nameLoading,
      isSuccess: nameIsSuccess,
      isError: nameIsError,
      error: nameError,
    },
  ] = useValidateNameMutation();

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

  useEffect(() => {
    if (nameIsError) {
      setError("Product name is not available, Please choose another");
      setIsNameOkay(false);
      setDisabled(true);
    } else {
      handleValidatingName(
        nameIsSuccess,
        setIsNameOkay,
        nameIsError,
        setError,
        nameError,
        setDisabled,
        charLeft
      );
    }
  }, [nameIsError, nameIsSuccess]);

  function onProceed(d: any) {
    console.log("Date:" + moment(d.startDate).format("yyyy-MM-DD"));

    setFormData({
      ...d,
      startDate: moment(d.startDate).format("yyyy-MM-DD"),
      endDate: moment(d.endDate).format("yyyy-MM-DD"),
    });
    proceed();
  }

  return (
    <form id="productform" onSubmit={handleSubmit(onProceed)}>
      <div className="">
        <div className="mb-6 flex flex-col gap-[1px]">
          <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
            Product Name <span className="text-red-500">*</span>
          </label>

          <InputDiv>
            <div className="relative flex items-center max-w-[642px]">
              <input
                data-testid="product-name"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] ${
                  errors?.productName || error ? "border-red-500" : ""
                } ${
                  isNameOkay && !errors?.productName ? "border-success-500" : ""
                }`}
                {...register("productName", {
                  required: true,
                  maxLength: 50,
                })}
                onChange={(e) => {
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
                }${
                  isSloganOkay && !errors?.slogan ? "border-success-500" : ""
                }`}
                {...register("slogan", {
                  required: true,
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
          <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
            Product Description
          </label>
          <InputDiv>
            <textarea
              data-testid="product-description"
              placeholder="Enter description"
              {...register("description", {
                required: true,
              })}
              defaultValue={formData?.description}
              className={`min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none${
                errors?.description || error
                  ? "border-red-500 ring-1 ring-red-500"
                  : ""
              }${!errors?.description ? "border-success-500" : ""}`}
            />
            {errors?.description && (
              <span className="text-sm text-danger-500">
                {errors?.description?.message}
              </span>
            )}

            {error && <span className="text-sm text-danger-500">{error}</span>}
          </InputDiv>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap">
            <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
              Product Life Cycle
            </label>

            <div className="flex ">
              <FormDate
                register={register}
                inputName={"startDate"}
                handleChange={(value) => {
                  setValue("startDate", value);
                }}
                defaultValue={formData.startDate}
              />
              -
              <FormDate
                register={register}
                inputName={"endDate"}
                handleChange={(value) => {
                  setValue("endDate", value);
                }}
                defaultValue={formData.endDate}
              />
            </div>
          </div>

          <div className="flex items-end gap">
            {/* <InputDiv> */}
            <div className="w-[300px]">
              {/* {formData.currency} */}
              <BorderlessSelect
                // clearErrors={() => clearErrors("currency")}
                inputError={errors?.currency}
                register={register}
                inputName={"currency"}
                labelName={"Product Currency"}
                handleSelected={(value) => {
                  setValue("currency", value.value);
                }}
                options={[
                  {
                    id: 1,
                    text: "NGN",
                    value: "NGN",
                  },
                  {
                    id: 2,
                    text: "USD",
                    value: "USD",
                  },
                ]}
                // defaultValue={formData.currency}
                // defaultProperty={"value"}
              />
            </div>
            {/* {errors?.currency && (
                <span className="text-sm text-danger-500">
                  {errors?.currency?.message}
                </span>
              )}

              {error && (
                <span className="text-sm text-danger-500">{error}</span>
              )} */}
            {/* </InputDiv> */}
          </div>
        </div>
      </div>
    </form>
  );
}
