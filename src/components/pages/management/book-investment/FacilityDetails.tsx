import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MinMaxInput from "@app/components/forms/MinMaxInput";
import {
  BondsProductFacilityDetailsModelSchema,
  CapitalizationOptions,
  CustomerCategory,
  CustomerCategoryType,
  FacilityDetailsModelSchema,
  Interval,
  IntervalOptions,
  ProductTypes,
} from "@app/constants";
import { currencyFormatter } from "@app/utils/formatCurrency";
import SearchInput from "@app/components/SearchInput";
import {
  useBookingCalcMutation,
  useGetPostProductsMutation,
  useGetProductDetailQuery,
} from "@app/api";
import BottomBarLoader from "@app/components/BottomBarLoader";
import { handleCurrencyName } from "@app/utils/handleCurrencyName";
import { BorderlessSelect } from "@app/components/forms";
import { AppContext } from "@app/utils";
import { Failed } from "@app/components/modals";
import { Messages } from "@app/constants/enums";
import { checkDocuments } from "@app/utils/checkDocunent";
import { convertToDays, convertDuration } from "@app/utils/convertToDays";
import debounce from "lodash.debounce";
import { InputDivs } from "../../term-deposit/forms/gl_mapping_events/ProductToGLMapping";
import { useParams } from "react-router-dom";
import BondsFacilityDetails from "./BondsFacilityDetails";
import TermDepositFacilityDetails from "./TermDepositFacilityDetails";
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

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })

        return {
          values,
          errors: {},
        }
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner?.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema]
  )

type FacilityDetailsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
  setDisabled?: any;
  isSavingDraft?: boolean;
  productDetail?: any;
  setProductDetail?: (e) => void;
  detailLoading?: boolean;
  preModifyRequest?: any;
};

export const handleInterestRateValues = ({
  productDetail,
  values,
  setValue,
  trigger,
}) => {
  if (productDetail?.pricingConfiguration?.interestRateRangeType === 0) {
    productDetail?.pricingConfiguration?.interestRateConfigModels?.forEach(
      (i) => {
        if (
          values.principal >= i.principalMin &&
          values.principal <= i.principalMax
        ) {
          setValue("intMin", i.min);
          setValue("intMax", i.max);
        }
      }
    );
  }
  if (productDetail?.pricingConfiguration?.interestRateRangeType === 1) {
    productDetail?.pricingConfiguration?.interestRateConfigModels?.forEach(
      (i) => {
        if (
          values.tenor >=
          convertDuration(i.tenorMin, i.tenorMinUnit, values.tenorUnit) &&
          values.tenor <=
          convertDuration(i.tenorMax, i.tenorMaxUnit, values.tenorUnit)
        ) {
          setValue("intMin", i.min);
          setValue("intMax", i.max);
        }
      }
    );
  }
  if (productDetail?.pricingConfiguration?.interestRateRangeType === 2) {
    setValue("intMin", productDetail?.pricingConfiguration?.interestRateMin);
    setValue("intMax", productDetail?.pricingConfiguration?.interestRateMax);
  }
  if (
    (values.tenor || values.principal) &&
    values.interestRate &&
    values.investmentProductId
  ) {
    trigger();
  }
};

export const handleProductDetails = ({
  productDetail,
  values,
  setValue,
  setProductDetail,
}) => {
  if (productDetail) {
    if (
      productDetail?.pricingConfiguration?.applicableTenorMinUnit ===
      productDetail?.pricingConfiguration?.applicableTenorMaxUnit
    ) {
      setValue(
        "tenorMin",
        productDetail?.pricingConfiguration?.applicableTenorMin
      );
      setValue(
        "tenorMax",
        productDetail?.pricingConfiguration?.applicableTenorMax
      );
    } else {
      setValue(
        "tenorMin",
        convertDuration(
          productDetail?.pricingConfiguration?.applicableTenorMin,
          productDetail?.pricingConfiguration?.applicableTenorMinUnit,
          values.tenorUnit
        )
      );
      setValue(
        "tenorMax",
        convertDuration(
          productDetail?.pricingConfiguration?.applicableTenorMax,
          productDetail?.pricingConfiguration?.applicableTenorMaxUnit,
          values.tenorUnit
        )
      );

    }

    setValue(
      "prinMin",
      productDetail?.pricingConfiguration?.applicablePrincipalMin
    );
    setValue(
      "prinMax",
      productDetail?.pricingConfiguration?.applicablePrincipalMax
    );

    const rangeArr =
      productDetail?.pricingConfiguration?.interestRateConfigModels[0];
    if (rangeArr) {
      if (productDetail?.pricingConfiguration?.interestRateRangeType === 0) {
        if (
          values.principal >= rangeArr.principalMin &&
          values.principal <= rangeArr.principalMax
        ) {
          setValue("intMin", rangeArr.min);
          setValue("intMax", rangeArr.max);
        }
      }

      if (productDetail?.pricingConfiguration?.interestRateRangeType === 1) {
        if (
          values.tenor >= rangeArr.tenorMin &&
          values.tenor <= rangeArr.tenorMax
        ) {
          setValue("intMin", rangeArr.min);
          setValue("intMax", rangeArr.max);
        }
      }
    }

    if (productDetail?.pricingConfiguration?.interestRateRangeType === 2) {
      setValue("intMin", productDetail?.pricingConfiguration?.interestRateMin);
      setValue("intMax", productDetail?.pricingConfiguration?.interestRateMax);
    }
  }
};

export const handleSearch = (
  value,
  data,
  setValue,
  setProductName,
  trigger,
  formData,
  setFormData
) => {
  if (data) {
    setValue("investmentProductId", data?.value);
    setValue("investmentProductName", data?.name);
    trigger("investmentProductId");
    setFormData({
      ...formData,
      facilityDetailsModel: {
        ...formData.facilityDetailsModel,
        investmentProductId: data.value,
      },
    });
  }

  setProductName(value);
};

export default function FacilityDetails({
  formData,
  setFormData,
  proceed,
  setDisabled,
  isSavingDraft,
  productDetail,
  setProductDetail,
  detailLoading,
  preModifyRequest,
}: FacilityDetailsProps) {
  const { currencies } = useContext(AppContext);

  const [mySchema, setMySchema] = useState(null);

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
    resolver: useYupValidationResolver(mySchema),
    defaultValues: formData.facilityDetailsModel,
    mode: "all",
  });
  const { investmentType } = useParams();
  const [query, setQuery] = useState("");
  const [productData, setProductData] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [balanceError, setBalanceError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validDoc, setValidDoc] = useState(null);
  const [validCurrency, setValidCurency] = useState(null);
  const [capMethodOptions, setCapMethodOptions] = useState(
    CapitalizationOptions
  );
  const values = getValues();
  const [
    getProduct,
    { data, isSuccess, isError, error, isLoading: searchLoading },
  ] = useGetPostProductsMutation();

  // Search product
  useEffect(() => {
    if (query.length) {
      getProduct({
        filter_by: "created_by_anyone",
        search: query,
        page_Size: 10000,
        status_In: [2],
        customerCategory: CustomerCategoryType[investmentType],
      });
    }
  }, [query]);

  useEffect(() => {
    if (isSuccess) {
      setProductsData(
        data.results.map((i) => {
          return {
            id: i.id,
            name: i.productName,
            value: i.id,
          };
        })
      );
    }
  }, [isError, isSuccess, searchLoading, data]);

  // Set product detail
  useEffect(() => {
    handleProductDetails({ productDetail, values, setValue, setProductDetail });
  }, [productDetail, values.tenorUnit]);

  useEffect(() => {
    setValue(
      "tenorUnit",
      productDetail?.pricingConfiguration?.applicableTenorMinUnit
    );
  }, [productDetail]);

  useEffect(() => {
    if (!values.investmentProductId) {
      setProductDetail(null);
    }

    setDisabled(!isValid || balanceError || !validDoc || !validCurrency);
    if (isValid) {
      setFormData({
        ...formData,
        facilityDetailsModel: values,
      });
    }
  }, [
    isValid,
    values.tenor,
    values.principal,
    values.interestRate,
    productDetail,
    values.investmentProductId,
    values.tenorUnit,
    validDoc,
    balanceError,
  ]);

  useEffect(() => {
    handleInterestRateValues({ productDetail, values, setValue, trigger });
  }, [
    values.tenor,
    values.principal,
    values.interestRate,
    productDetail,
    values.investmentProductId,
    values.tenorUnit,
  ]);

  useEffect(() => {
    setFormData({
      ...formData,
      facilityDetailsModel: values,
    });
  }, [
    values.tenor,
    values.principal,
    values.interestRate,
    values.capitalizationMethod,
  ]);

  useEffect(() => {
    setFormData({
      ...formData,
      facilityDetailsModel: values,
    });
  }, [isSavingDraft]);

  useEffect(() => {
    setFormData({
      ...formData,
      facilityDetailsModel: { ...formData.facilityDetailsModel, ...values },
    });
  }, [values.tenorUnit]);

  useEffect(() => {
    if (
      formData.customerBookingInfoModel?.balance <
      productDetail?.pricingConfiguration?.applicablePrincipalMin ||
      formData.customerBookingInfoModel?.balance === 0
    ) {
      setBalanceError(true);
      setShowError(true);
    } else {
      setBalanceError(false);
    }

    const validateDocs = checkDocuments(
      productDetail?.customerEligibility?.requireDocument.map((i) => i.name),
      formData?.customerProfile
    );

    setValidDoc(validateDocs?.hasAllDocuments);

    // Hanle booking options
    if (
      productDetail?.liquidation?.part_AllowPartLiquidation ||
      productDetail?.liquidation?.early_AllowEarlyLiquidation
    ) {
      setCapMethodOptions(CapitalizationOptions.filter((i) => i.value !== 0));
    } else {
      setCapMethodOptions(CapitalizationOptions);
    }
    if (
      formData?.customerBookingInfoModel?.currencyId !==
      productDetail?.productInfo?.currency &&
      formData?.customerBookingInfoModel?.currencyCode !==
      productDetail?.productInfo?.currencyCode
    ) {
      setValidCurency(false);
      setShowError(true);
    } else {
      setValidCurency(true);
    }
  }, [
    formData.customerBookingInfoModel?.balance,
    productDetail,
    formData.customerBookingInfoModel?.currencyId,
  ]);

  useEffect(() => {
    const type = 
    ProductTypes.find(
      (n) => n.id === productDetail?.productType
    )?.name
    setValue(
      "productType", type
    )

    setMySchema(type === "Bonds" ? BondsProductFacilityDetailsModelSchema : FacilityDetailsModelSchema)
    if (type === "Bonds") {
      setValue("tenorUnitMin", 1)
      setValue("tenorUnitMax", 3)
    }

  }, [productDetail?.productType])

  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={handleSubmit((d) =>
        onProceed(d, proceed, formData, setFormData, preModifyRequest)
      )}
    >
      {" "}
      <div
        data-testid="facility-details"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="flex flex-col items-start gap-y-5">
          <InputDivs
            label={"Investment product"}
            errors={errors}
            name="investmentProductId"
          >
            <div className="flex gap-[15px]">
              <div className=" w-[360px]">
                <SearchInput
                  setSearchTerm={debounce((e) => setQuery(e), 800)}
                  searchResults={productsData}
                  setSearchResults={() => { }}
                  searchLoading={searchLoading}
                  handleSearch={(value, data) =>
                    handleSearch(
                      value,
                      data,
                      setValue,
                      setProductName,
                      trigger,
                      formData,
                      setFormData
                    )
                  }
                  placeholder={"Search Investment Product"}
                  customClass="shadow-none"
                  hideBorder
                  defaultValue={
                    formData.facilityDetailsModel.investmentProductName
                  }
                />
              </div>
            </div>
            {values?.investmentProductId && !validDoc && !detailLoading && (
              <p className="text-red-600 text-sm mt-[2px]">
                Customer's documentation does not meet requirements for this
                products
              </p>
            )}
          </InputDivs>

          {detailLoading && (
            <div className="p-7 flex justify-center items-center w-full">
              <BottomBarLoader />
            </div>
          )}
          {!detailLoading && values.investmentProductId && (
            <div className="flex flex-col items-start gap-y-5">
              <InputDivs
                label={"Investment product category"}
                isCompulsory={false}
              >
                <div className="flex gap-[15px]">
                  <div className=" ">
                    <span className="text-base font-normal text-[#636363] capitalize">
                      {
                        ProductTypes.find(
                          (n) => n.id === productDetail?.productType
                        )?.name
                      }
                    </span>
                  </div>
                </div>
              </InputDivs>
              {
                ProductTypes.find(
                  (n) => n.id === productDetail?.productType
                )?.name === "Term Deposit" &&
                <TermDepositFacilityDetails
                  {...{
                    capMethodOptions, clearErrors,
                    errors, formData, productDetail,
                    register, setValue,
                    trigger, values
                  }}
                />
              }
              {
                ProductTypes.find(
                  (n) => n.id === productDetail?.productType
                )?.name === "Bonds" &&
                <BondsFacilityDetails
                  {...{
                    capMethodOptions, clearErrors,
                    errors, formData, productDetail,
                    register, setValue,
                    trigger, values
                  }}
                />
              }
            </div>
          )}
        </div>
      </div>
      {showError && productDetail && (balanceError || !validCurrency) && (
        <Failed
          text={Messages.UNABLE_TO_BOOK}
          subtext={
            balanceError
              ? Messages.INSUFFICIENT_BALANCE
              : Messages.CURRENCY_ERROR
          }
          isOpen={showError}
          setIsOpen={setShowError}
          canRetry
        />
      )}
    </form>
  );
}
