import React, { useState } from "react";
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
import {
  useValidateNameMutation,

  // useValidateAddressMutation,
} from "@app/api";

// import {IProductInformation} from '@app/api/types'
// export function handleName(watchName, formData, setFormData) {
//   setFormData({ ...formData, name: watchName });
//   console.log(formData);
// }type

const defaultLength = 50;

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
  clearErrors("name");
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
      validateName({ name: watchName, productId: id || "" });
    }, timer)();
  } else {
    setError("");
    setIsNameOkay(false);
    setDisabled(true);
  }
}

export default function ProductInformation({
  formData,
  setFormData,
  setDisabled,
}) {
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
  const [error, setError] = useState<string>("");
  const [charLeft, setCharLeft] = useState<number>(50);
  const [currentName, setCurrentName] = useState("");
  const [isNameOkay, setIsNameOkay] = useState<boolean>(false);
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
    const conditions = [
      // watchLga !== oldData?.lga,
      // watchCity !== oldData?.city,
      // watchStreetname !== oldData?.streetname,
      // watchCountry !== oldData?.country,
      // watchPostalcode !== oldData?.postalcode,
      // watchNumber !== oldData?.number,
      // watchDescription !== oldData?.description,
      // watchState !== oldData?.state,
      // name !== oldData?.name,
    ];

    if (conditions.some((condition) => condition)) {
      // setDisabled(false);
    } else {
      // setDisabled(true);
    }
  }

  function onProceed(d: any) {
    console.log("ProductInfo: " + JSON.stringify(d));
  }

  return (
    <form onSubmit={handleSubmit(onProceed)}>
      <div className="">
        <div className="mb-6 flex flex-col gap-[1px]">
          <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
            Product Name <span className="text-red-500">*</span>
          </label>

          {/* <div className="max-w-[642px]  w-full flex flex-col gap-2">
          <CustomInput
            placeholder={"Enter name"}
            formData={formData}
            setFormData={setFormData}
            maxLength={50}
          />
        </div> */}

          <div className="w-full flex flex-col gap-2">
            <div className="relative flex items-center max-w-[64">
              <input
                data-testid="product-name"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] ${
                  errors?.name || error ? "border-red-500" : ""
                } ${isNameOkay && !errors?.name ? "border-success-500" : ""}`}
                {...register("name", {
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
                defaultValue={formData?.name}
                aria-invalid={errors?.name ? "true" : "false"}
              />
              <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
                <span>
                  {" "}
                  {charLeft}/{defaultLength}
                </span>{" "}
                {isNameOkay && !errors?.name && (
                  <span>
                    <FaCheckCircle className="text-success-500 text-xl" />
                  </span>
                )}
                {(error || errors?.name) && (
                  <span>
                    <RiErrorWarningFill className="text-danger-500 text-xl w-5 h-5" />
                  </span>
                )}
                {nameLoading && (
                  <AiOutlineLoading className="text-xl text-[#636363] animate-spin" />
                )}
              </div>
            </div>
            {errors?.name && (
              <span className="text-sm text-danger-500">
                {errors?.name?.message}
              </span>
            )}
            {isNameOkay && (
              <span className="text-sm text-success-500">
                Name is available
              </span>
            )}
            {error && <span className="text-sm text-danger-500">{error}</span>}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-[1px]">
          <label className="w-[300px] pt-[10px]  text-base font-semibold text-[#636363]">
            Slogan
          </label>

          <div className="w-full flex flex-col gap-2">
            <div className="relative flex items-center">
              <input
                data-testid="investment-slogan"
                className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB] `}
                onChange={(e) =>
                  setFormData({ ...formData, slogan: e.target.value })
                }
                placeholder="Enter a slogan"
                // maxLength={defaultLength}
                defaultValue={formData?.slogan}
                // aria-invalid={errors?.name ? "true" : "false"}
              />
              <div className="absolute right-0 text-xs text-[#8F8F8F] flex items-center gap-x-[11px]">
                <span>
                  {0}/{160}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-[13px]">
          <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
            Product Description
          </label>
          <div className="w-full flex flex-col gap-2">
            <textarea
              data-testid="product-description"
              placeholder="Enter description"
              onChange={(e) =>
                setFormData({ ...formData, desccription: e.target.value })
              }
              defaultValue={formData?.description}
              className="min-h-[150px] w-full rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none"
            />
          </div>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap">
            <label className="w-[300px] pt-[10px] text-base font-semibold text-[#636363]">
              Product Life Cycle
            </label>

            <div className="flex ">
              <FormDate />
              -
              <FormDate />
            </div>
          </div>

          <div className="flex items-end gap">
            <div className="w-[300px]">
              <BorderlessSelect
                labelName={"Product Currency"}
                handleSelected={() => {}}
                options={[
                  {
                    id: 1,
                    text: "NGN",
                    value: "NGN",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
