import { BorderlessSelect, FormDate, MinMaxInput } from "@app/components/forms";
import { InputDivs } from "../../term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import { Interval, IntervalOptions, intervalOptions } from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import { Fragment, useEffect } from "react";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";

export default ({
  productDetail,
  errors,
  register,
  formData,
  setValue,
  trigger,
  clearErrors,
  values,
  capMethodOptions,
}) => {
  useEffect(() => {
    console.log(values);
  }, [errors, values]);

  return (
    <Fragment>
      <InputDivs
        label={"Investment purpose"}
        isCompulsory={false}
        errors={errors}
        name="investmentPurpose"
        divClass={"!items-start"}
      >
        <div className="relative w-full">
          <textarea
            {...register("investmentPurpose", {
              maxLength: 360,
            })}
            defaultValue={formData?.facilityDetailsModel.investmentPurpose}
            id="investmentPurpose"
            data-testid="investmentPurpose"
            placeholder="Enter Investment Purpose"
            maxLength={250}
            className={`w-[360px]  min-h-[150px] rounded-md border border-[#8F8F8F] focus:outline-none px-3 py-[11px] placeholder:text-[#BCBBBB] resize-none `}
          />
        </div>
      </InputDivs>
      <InputDivs label="Available Volume">
        <div className=" w-[360px]">
          <MinMaxInput
            inputName="availableVolume"
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            defaultValue={values.availableVolume}
            type="number"
          />
        </div>
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
            minDate={new Date()}
            trigger={trigger}
            clearErrors={clearErrors}
          />
        </InputDiv>
      </InputDivs>
      <InputDivs label={"Coupon Rate"}>
        <InputDiv customClass="w-full w-[300px] ">
          <div className="relative flex items-center max-w-[642px] border-b border-[#8F8F8F]">
            <MinMaxInput
              inputName="couponRate"
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              defaultValue={values.couponRate}
              type="number"
            />
            <div className="rounded-[100px] text-[14px] mr-2 bg-[#FFE9E9]">
              Percent
            </div>
          </div>
        </InputDiv>
      </InputDivs>
      <InputDivs label={"Tenor"}>
        <div className="flex gap-[15px]">
          <div className=" w-[300px]">
            <div className="flex items-center w-full gap-[15px] justify-between">
              <div className="w-[35%]">
                <MinMaxInput
                  inputName="tenor"
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  defaultValue={formData?.facilityDetailsModel.tenor}
                  type="number"
                />
              </div>
              <div className="w-[65%]">
                <BorderlessSelect
                  inputError={errors?.tenorUnit}
                  register={register}
                  inputName={"tenorUnit"}
                  defaultValue={values?.tenorUnit}
                  options={IntervalOptions.filter((i) =>
                    [values?.tenorUnitMin, values?.tenorUnitMax].includes(
                      i.value
                    )
                  )}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  clearErrors={clearErrors}
                  placeholder="Select duration"
                />
              </div>
            </div>
          </div>
        </div>
      </InputDivs>

      <InputDivs label="Clean Price">
        <InputDiv customClass="w-full min-w-[300px]">
          <div className=" w-[360px]">
            <MinMaxInput
              inputName="cleanPrice"
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              defaultValue={values.cleanPrice}
              type="number"
            />
          </div>
        </InputDiv>
      </InputDivs>
      <InputDivs label="Accrued Interest">
        <div className=" w-[360px]">
          <MinMaxInput
            inputName="accruedInterest"
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            defaultValue={values.accruedInterest}
            type="number"
          />
        </div>
      </InputDivs>
      <InputDivs label="Dirty Price">
        <div className=" w-[360px]">
          <MinMaxInput
            inputName="dirtyPrice"
            register={register}
            errors={errors}
            setValue={setValue}
            trigger={trigger}
            clearErrors={clearErrors}
            defaultValue={values.dirtyPrice}
            type="number"
          />
        </div>
      </InputDivs>

      <InputDivs label={"Principal"}>
        <div className="flex gap-[15px]">
          <div className=" w-[360px]">
            <MinMaxInput
              currency={productDetail?.productInfo?.currencyCode}
              isCurrency
              inputName="principal"
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              defaultValue={formData?.facilityDetailsModel.principal}
            />
            <div className="text-sm text-[#AAAAAA] mt-1">
              <span>
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMin,
                  productDetail?.productInfo?.currencyCode
                )}{" "}
                -{" "}
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMax,

                  productDetail?.productInfo?.currencyCode
                )}
              </span>
            </div>
          </div>
        </div>
      </InputDivs>
      <InputDivs label={"Face Value"}>
        <div className="flex gap-[15px]">
          <div className=" w-[360px]">
            <MinMaxInput
              currency={productDetail?.productInfo?.currencyCode}
              isCurrency
              inputName="faceValue"
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              defaultValue={formData?.facilityDetailsModel.faceValue}
            />
            <div className="text-sm text-[#AAAAAA] mt-1">
              <span>
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMin,
                  productDetail?.productInfo?.currencyCode
                )}{" "}
                -{" "}
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMax,

                  productDetail?.productInfo?.currencyCode
                )}
              </span>
            </div>
          </div>
        </div>
      </InputDivs>
      <InputDivs label={"Total Consideration"}>
        <div className="flex gap-[15px]">
          <div className=" w-[360px]">
            <MinMaxInput
              currency={productDetail?.productInfo?.currencyCode}
              isCurrency
              inputName="totalConsideration"
              register={register}
              errors={errors}
              setValue={setValue}
              trigger={trigger}
              clearErrors={clearErrors}
              defaultValue={formData?.facilityDetailsModel.totalConsideration}
            />
            <div className="text-sm text-[#AAAAAA] mt-1">
              <span>
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMin,
                  productDetail?.productInfo?.currencyCode
                )}{" "}
                -{" "}
                {currencyFormatter(
                  productDetail?.pricingConfiguration?.applicablePrincipalMax,

                  productDetail?.productInfo?.currencyCode
                )}
              </span>
            </div>
          </div>
        </div>
      </InputDivs>
      <InputDivs label={"Interest Capitalization Method"}>
        <div className="flex gap-[15px]">
          <div className="w-[300px]">
            <BorderlessSelect
              inputError={errors?.capitalizationMethod}
              register={register}
              errors={errors}
              setValue={setValue}
              inputName={"capitalizationMethod"}
              labelName={""}
              defaultValue={
                formData?.facilityDetailsModel?.capitalizationMethod
              }
              placeholder="Select option"
              clearErrors={clearErrors}
              options={capMethodOptions}
              trigger={trigger}
            />
          </div>
        </div>
      </InputDivs>
      {values.capitalizationMethod === 1 && (
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
              requiredField={true}
              required={true}
              options={intervalOptions}
              trigger={trigger}
            />
          </div>
        </InputDivs>
      )}
    </Fragment>
  );
};
