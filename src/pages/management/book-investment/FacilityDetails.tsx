import { DropDown } from "@app/components";
import { BorderlessSelect, FormDate, RedDot } from "@app/components/forms";
import { InputDivs } from "@app/components/forms/SideLabelSearchSelect";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import {
  FacilityDetailsModelSchema,
  FacilityDetailsModelSchema2,
  categoryOptions,
} from "@app/constants";
import { AppContext } from "@app/utils";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const onProceed = (
  data,
  proceed,
  formData,
  setFormData,
  preModifyRequest
) => {
  preModifyRequest({
    ...formData,
    facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
    isDraft: true,
  });
  setFormData({
    ...formData,
    facilityDetailsModel: { ...formData.facilityDetailsModel, ...data },
  });
  proceed();
};

export default ({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  productDetail,
  setProductDetail,
  detailLoading,
  preModifyRequest,
}) => {
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
    resolver: yupResolver(FacilityDetailsModelSchema2),
    defaultValues: formData.facilityDetailsModel,
    mode: "all",
  });

  const { currencies, defaultCurrency } = useContext(AppContext);

  useEffect(() => {
    setValue("currency", defaultCurrency?.abbreviation);
  }, [defaultCurrency]);
  const [error, updateError] = useState(null);

  const values = getValues();

  // useEffect(() => console.log(values, isValid, errors), [])

  const productCategoryOptions = [
    {
      id: 1,
      text: "Bonds",
      value: "bonds",
    },

    {
      id: 2,
      text: "Commercial Paper",
      value: "commercial-paper",
    },
    {
      id: 3,
      text: "Treasury Bills",
      value: "treasury-bills",
    },
  ];

  const interestCapitalizationMethodOptions = [
    {
      id: 1,
      text: "Upon Booking",
      value: 1,
    },

    {
      id: 2,
      text: "At Intervals",
      value: 2,
    },
    {
      id: 3,
      text: "At Maturity",
      value: 3,
    },
  ];

  const interestComputationMethodOptions = [
    {
      id: 1,
      text: "Actual/Actual",
      value: 1,
    },

    {
      id: 2,
      text: "Actual/360",
      value: 2,
    },
    {
      id: 3,
      text: "Actual/365",
      value: 3,
    },
  ];

  const intervalOptions = [
    {
      id: 1,
      text: "Semi-Anually",
      value: 1,
    },

    {
      id: 2,
      text: "Anually",
      value: 2,
    },
    {
      id: 3,
      text: "Quarterly",
      value: 3,
    },
    {
      id: 4,
      text: "Monthly",
      value: 4,
    },
  ];

  useEffect(() => {
    setDisabled(!isValid);
    if (isValid) {
      setFormData({
        ...formData,
        facilityDetailsModel: values,
      });
    }
  }, [isValid, () => values]);

  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) => {
        onProceed(d, proceed, formData, setFormData, preModifyRequest);
      })}
    >
      <div
        data-testid="facility-details"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs label={"Investment product"}>
            <div className="flex gap-[15px]">
              <BorderlessSelect
                inputError={errors?.category}
                register={register}
                errors={errors}
                setValue={setValue}
                inputName={"category"}
                labelName={""}
                defaultValue={values?.category}
                placeholder="Select Category"
                clearErrors={clearErrors}
                options={productCategoryOptions}
                trigger={trigger}
              />
            </div>
          </InputDivs>
          {values?.category && (
            <Fragment>
              <InputDivs label={"issuer"}>
                <div className="relative flex items-center max-w-full">
                  <input
                    id="issuer"
                    data-testid="issuer"
                    onChange={(e) => setValue("issuer", e.target.value)}
                    {...register("issuer")}
                    className={`placeholder-[#BCBBBB] ring-0 outline-none min-w-[300px] w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] placeholder:text-[#BCBBBB]`}
                    placeholder="Enter Name"
                    defaultValue={values.issuer}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Description"}>
                <InputDiv>
                  <div className="relative w-full min-w-[300px]">
                    <textarea
                      id="description"
                      data-testid="product-description"
                      placeholder="Enter description"
                      maxLength={250}
                      {...register("description", {
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
                      <span>{watch("description")?.length || 0}</span>/
                      <span>250</span>
                    </span>
                  </div>
                  {errors?.description && (
                    <span className="text-sm text-danger-500">
                      {errors?.description?.message}
                    </span>
                  )}
                </InputDiv>
              </InputDivs>
              <InputDivs label={"Deal Date"}>
                <InputDiv>
                  <FormDate
                    id="dealDate"
                    className="w-full min-w-[300px]"
                    register={register}
                    inputName={"dealDate"}
                    errors={errors}
                    handleChange={(value) => {
                      setValue("dealDate", value);
                    }}
                    defaultValue={values?.dealDate}
                    minDate={new Date()}
                    trigger={trigger}
                    clearErrors={clearErrors}
                  />
                </InputDiv>
              </InputDivs>
              <InputDivs label={"Maturity Date"}>
                <InputDiv>
                  <FormDate
                    id="maturityDate"
                    className="w-full min-w-[300px]"
                    register={register}
                    inputName={"maturityDate"}
                    errors={errors}
                    handleChange={(value) => {
                      setValue("maturityDate", value);
                    }}
                    defaultValue={values?.maturityDate}
                    minDate={values?.dealDate}
                    trigger={trigger}
                    clearErrors={clearErrors}
                  />
                </InputDiv>
              </InputDivs>

              <InputDivs label={"Currency"}>
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.currency}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"currency"}
                    defaultValue={values?.currency}
                    placeholder="Select currency"
                    clearErrors={clearErrors}
                    options={currencies.map((i) => ({ ...i, value: i.text }))}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Discount Rate"}>
                <InputDiv customClass="w-full min-w-[300px] ">
                  <div className="relative flex items-center max-w-[642px] border-b border-[#8F8F8F]">
                    <input
                      id="discountRate"
                      data-testid="discountRate"
                      type="number"
                      {...register("discountRate")}
                      className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] placeholder:text-[#BCBBBB]`}
                      placeholder="Enter Rate"
                      defaultValue={values.discountRate}
                    />
                    <div className="rounded-[100px] text-[14px] mr-2 bg-[#FFE9E9]">
                      Percent
                    </div>
                  </div>
                </InputDiv>
              </InputDivs>
              <InputDivs label="Per Amount">
                <InputDiv customClass="w-full min-w-[300px]">
                  <div className="relative flex items-center max-w-[642px]">
                    {values?.currency && (
                      <span className="mr-2">{values?.currency}</span>
                    )}
                    <input
                      id="perAmount"
                      data-testid="perAmount"
                      type="number"
                      {...register("perAmount")}
                      className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB]`}
                      placeholder="Enter Rate"
                      defaultValue={values.perAmount}
                    />
                  </div>
                </InputDiv>
              </InputDivs>
              <InputDivs label="Face Value">
                <InputDiv customClass="w-full min-w-[300px]">
                  <div className="relative flex items-center max-w-[642px]">
                    {values?.currency && (
                      <span className="mr-2">{values?.currency}</span>
                    )}
                    <input
                      id="faceValue"
                      data-testid="faceValue"
                      type="number"
                      {...register("faceValue")}
                      className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB]`}
                      placeholder="Enter Rate"
                      defaultValue={values.faceValue}
                    />
                  </div>
                </InputDiv>
              </InputDivs>
              <InputDivs label="Consideration">
                <InputDiv customClass="w-full min-w-[300px]">
                  <div className="relative flex items-center max-w-[642px]">
                    {values?.currency && (
                      <span className="mr-2">{values?.currency}</span>
                    )}
                    <input
                      id="consideration"
                      data-testid="consideration"
                      type="number"
                      {...register("consideration")}
                      className={`placeholder-[#BCBBBB] ring-0 outline-none w-full pt-[10px] pb-[16px] border-b border-[#8F8F8F] pr-[74px] placeholder:text-[#BCBBBB]`}
                      placeholder="Enter Rate"
                      defaultValue={values.consideration}
                    />
                  </div>
                </InputDiv>
              </InputDivs>
              <InputDivs
                label={`Interest Computation  Days in Years Method`}
                customClass="max-w-[250px]"
              >
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.interestComputationMethod}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"interestComputationMethod"}
                    defaultValue={values?.interestComputationMethod}
                    placeholder="Select"
                    clearErrors={clearErrors}
                    options={interestComputationMethodOptions}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              <InputDivs label={"Interest Capitalization Method"}>
                <div className="w-[300px]">
                  <BorderlessSelect
                    inputError={errors?.interestCapitalizationMethod}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    inputName={"interestCapitalizationMethod"}
                    defaultValue={values?.interestCapitalizationMethod}
                    placeholder="Select"
                    clearErrors={clearErrors}
                    options={interestCapitalizationMethodOptions}
                    trigger={trigger}
                  />
                </div>
              </InputDivs>
              {values.interestCapitalizationMethod === 2 && (
                <InputDivs label={"Specify Interval"}>
                  <div className="w-[300px]">
                    <BorderlessSelect
                      inputError={errors?.interval}
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      inputName={"interval"}
                      defaultValue={values?.interval}
                      placeholder="Select"
                      clearErrors={clearErrors}
                      requiredField={false}
                      required={false}
                      options={intervalOptions}
                      trigger={trigger}
                    />
                  </div>
                </InputDivs>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </form>
  );
};
