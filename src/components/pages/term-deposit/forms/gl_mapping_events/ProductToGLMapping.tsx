import { Checkbox, RedDot } from "@app/components/forms";
import { GlInput } from "@app/components/forms";
import { glMappingSchema, chargesAndTaxesSchema } from "@app/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect, useState } from "react";
import ChargesAndTaxes from "./ChargesAndTaxes";
import { Icon } from "@iconify/react";
import {
  useGetApplicableChargesQuery,
  useGetApplicableTaxesQuery,
} from "@app/api";

const GlMappingOptions = [
  {
    id: 0,
    text: "Term Deposit Liability Ledger",
    key: "TermDepositLiabilityLedger",
  },
  {
    id: 1,
    text: "Interest accural ledger",
    key: "InterestAccrualLedger",
  },
  {
    id: 2,
    text: "Interest expense ledger",
    key: "InterestExpenseLedger",
  },
];

export const handleClear = (
  setClearField,
  clearFields,
  setMapOptions,
  reset
) => {
  setClearField(!clearFields);
  setMapOptions([]);
  reset();
};

export function InputDivs({
  children,
  label,
  isCompulsory = true,
  divClass = "",
  subLabel = "",
  errors,
  name,
}: {
  children: any;
  label: string;
  isCompulsory?: boolean;
  divClass?: string;
  subLabel?: string;
  errors?: any;
  name?: string;
}) {
  return (
    <div>
      <div
        className={`flex gap-x-[50px] items-center ${divClass ? divClass : ""}`}
      >
        <div className="w-[300px]">
          <span
            data-testid="input-div"
            className="flex items-start gap-x-[1px] text-[#636363] text-base font-medium mb-1"
          >
            {label} {isCompulsory && <RedDot />}
          </span>
          <span className="flex items-start gap-x-[1px] text-[#AAAAAA] text-sm font-normal">
            {subLabel}
          </span>
        </div>
        <div>
          <div className="mb-[2px]">{children}</div>
          {errors && name && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-600 text-xs">{message}</p>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export const handleClick = (
  key,
  submenu,
  setValue,
  mapOptions,
  setMapOptions,
  GlMappingOptions
) => {
  const data = {
    accountName: submenu.name,
    accountId: submenu?.id,
    glAccountType: GlMappingOptions.find((i) => i.key === key)?.id,
  };

  setValue(key, submenu?.name);

  if (!mapOptions.some((i) => i.glAccountType === data.glAccountType)) {
    setMapOptions([...mapOptions, data]);
  } else {
    setMapOptions((prevMapOptions) =>
      prevMapOptions.map((i) =>
        i.glAccountType === data.glAccountType
          ? { ...i, accountName: submenu.name, accountId: data.accountId }
          : i
      )
    );
  }
};

export default ({
  proceed,
  formData,
  setFormData,
  setDisabled,
  initiateDraft,
}) => {
  const [mapOptions, setMapOptions] = useState([]);
  const [clearFields, setClearField] = useState(false);
  const [activeTab, setActiveTab] = useState<any>([1, 2, 3, 4, 5]);
  const [filteredTabs, setFilteredTabs] = useState([]);
  function onProceed(val) {
    // setFormData(val, mapOptions);
    proceed();
  }

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    trigger,
    setValue,
    setError: assignError,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    // resolver: yupResolver(treasuryBillglMappingSchema),
    defaultValues: formData,
    mode: "all",
    // values,
  });

  const {
    data: charges,
    isLoading: chargesLoading,
    isSuccess: chargesSuccess,
  } = useGetApplicableChargesQuery();

  const {
    data: taxes,
    isLoading: taxesLoading,
    isSuccess: taxesSuccess,
  } = useGetApplicableTaxesQuery();

  const [values, setValues] = useState({
    principalDepositChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
    partLiquidationChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
    earlyLiquidationChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
    investmentLiquidationChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
  });

  const prepValues = () => {
    const vals = getValues();
    const v2 = {
      principalDepositChargesAndTaxes: vals.principalDepositChargesAndTaxes,
      partLiquidationChargesAndTaxes: vals.partLiquidationChargesAndTaxes,
      earlyLiquidationChargesAndTaxes: vals.earlyLiquidationChargesAndTaxes,
      investmentLiquidationChargesAndTaxes:
        vals.investmentLiquidationChargesAndTaxes,
    };
    return vals;
  };

  useEffect(() => {
    setValues(prepValues);
  }, []);

  useEffect(() => {

    console.log("🚀 ~ useEffect ~ values:", values)

  }, [values]);

  useEffect(() => {
    setFormData(values, mapOptions);
    return () => {
      setFormData(values, mapOptions);
    };
  }, [values, mapOptions, initiateDraft]);

  useEffect(() => {
    if (mapOptions.length === 3) {
      setDisabled(false);
    }
  }, [values, mapOptions]);
  useEffect(() => {
    setDisabled(true);
  }, []);
  const taxChargeData = [
    "principalDepositChargesAndTaxes",
    "partLiquidationChargesAndTaxes",
    "earlyLiquidationChargesAndTaxes",
    "investmentLiquidationChargesAndTaxes",
  ];
  const taxChargeDataOptions = [
    {
      header: "Principal Deposit",
      key: "principalDepositChargesAndTaxes",
      disabled: false,
    },
    {
      header: "Part Liquidation",
      key: "partLiquidationChargesAndTaxes",
      disabled:
        formData?.liquidation.part_LiquidationPenalty == 4 &&
        formData?.liquidation?.part_SpecificCharges.length,
    },
    {
      header: "Early Liquidation",
      key: "earlyLiquidationChargesAndTaxes",
      disabled:
        formData?.liquidation.early_LiquidationPenalty == 4 &&
        formData?.liquidation?.early_SpecificCharges.length,
    },
    {
      header: "Maturity Liquidation",
      key: "investmentLiquidationChargesAndTaxes",
      disabled: false,
    },
  ];
  useEffect(() => {
    if (formData?.productGlMappings?.length) {
      setMapOptions(formData?.productGlMappings);
      formData?.productGlMappings?.forEach((item: any) => {
        const key = GlMappingOptions?.find(
          (i) => item?.glAccountType === i?.id
        )?.key;

        // @ts-ignore
        setValue(key, item?.glAccountType);
      });
    }
    taxChargeData.forEach((chargeKey) => {
      setValue(chargeKey, formData[chargeKey]);
    });
  }, [setValue, formData]);

  useEffect(() => {
    let tempOptions = taxChargeDataOptions;
    if (!formData?.liquidation?.part_AllowPartLiquidation) {
      tempOptions = tempOptions.filter(
        (i) => i.key !== "partLiquidationChargesAndTaxes"
      );
    }
    if (!formData?.liquidation?.early_AllowEarlyLiquidation) {
      tempOptions = tempOptions.filter(
        (i) => i.key !== "earlyLiquidationChargesAndTaxes"
      );
    }
    setFilteredTabs(tempOptions);
  }, [
    formData?.liquidation?.part_AllowPartLiquidation,
    formData?.liquidation?.early_AllowEarlyLiquidation,
  ]);

  function handleTab() {
    if (activeTab.includes(1)) {
      setActiveTab(activeTab.filter((i) => i !== 1));
      return;
    }
    setActiveTab([...activeTab, 1]);
  }

  return (
    <Fragment>
      <form
        id="productmapping"
        data-testid="submit-button"
        className="grid gap-y-8"
        onSubmit={handleSubmit((val) => onProceed(val))}
      >
        <div>
          <div className="bg-[#fff] border border-[#EEEEEE] rounded-[6px]">
            <div className="border-b border-[#EEEEEE] flex justify-between items-center px-6 py-[14px]">
              <span onKeyDown={() => { }}
                onClick={() => handleTab()}
                className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center"
              >
                <Icon
                  icon="ph:caret-right-fill"
                  className={`text-danger-500 text-sm mr-4 ${activeTab.includes(1) && "rotate-90"
                    }`}
                />
                Product to GL Mapping <RedDot />
              </span>
              {/* <span
                className="font-normal text-sm text-danger-500 italic hover:underline"
                onClick={() =>
                  handleClear(setClearField, clearFields, setMapOptions, reset)
                }
              >
                Clear all entries
              </span> */}
            </div>
            {activeTab.includes(1) && (
              <div className="flex flex-col gap-4 px-[30px] py-5">
                <div className="flex flex-col items-start gap-y-5">
                  {GlMappingOptions.map((type) => (
                    <InputDivs key={type.text} label={type.text}>
                      <div>
                        <div className="w-[360px] relative">
                          <div className=" ">
                            <GlInput
                              handleClick={(key, submenu) =>
                                handleClick(
                                  key,
                                  submenu,
                                  setValue,
                                  mapOptions,
                                  setMapOptions,
                                  GlMappingOptions
                                )
                              }
                              inputName={type.key}
                              defaultValue={
                                mapOptions.find(
                                  (i) => i?.glAccountType === type.id
                                )?.accountName
                              }
                              register={register}
                              trigger={trigger}
                              errors={errors}
                              clearFields={clearFields}
                              placeholder="Type to search and select"
                            />
                          </div>
                        </div>
                      </div>
                    </InputDivs>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {filteredTabs.map((item, index) => (
          <ChargesAndTaxes
            charges={charges}
            chargesLoading={chargesLoading}
            taxes={taxes}
            taxesLoading={taxesLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            values={values}
            setValues={setValues}
            tab={index + 2}
            header={item.header}
            event={item.key}
            productData={formData}
            disabled={item.disabled}
            placeholder="Type to search and select"
            setValue={setValue}
          />
        ))}
      </form>
    </Fragment>
  );
};
