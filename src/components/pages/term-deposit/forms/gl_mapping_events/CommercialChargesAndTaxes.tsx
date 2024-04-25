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
        <div className="w-[330px]">
          <span
            data-testid="input-div"
            className="flex items-start justify-start gap-x-[1px] text-[#636363] text-base font-medium mb-1"
          >
            {label}
            {isCompulsory && <RedDot />}
          </span>
          <span className="flex items-start gap-x-[1px] text-[#AAAAAA] text-sm font-normal max-w-[260px]">
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

export default ({
  proceed,
  formData,
  setFormData,
  setDisabled,
  initiateDraft,
}) => {
  const [activeTab, setActiveTab] = useState<any>(["issuanceChargesAndTaxes"]);
  const [filteredTabs, setFilteredTabs] = useState([]);
  function onProceed() {
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
    issuanceChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
    redemptionChargesAndTaxes: {
      applicableCharges: [],
      applicableTaxes: [],
    },
  });

  useEffect(() => {
    setDisabled(false);
  }, []);
  const prepValues = () => {
    const vals = getValues();
    const v2 = {
      issuanceChargesAndTaxes: vals.issuanceChargesAndTaxes,
      redemptionChargesAndTaxes: vals.redemptionChargesAndTaxes,
    };
    taxChargeDataOptions.filter((i) => {

    });

    setActiveTab(
      taxChargeDataOptions
        .filter(
          (i) =>
            vals[i.key]?.applicableTaxes?.length ||
            vals[i.key]?.applicableCharges?.length
        )
        .map((i) => i.key)
    );
    return vals;
  };

  useEffect(() => {
    setValues(prepValues);
  }, []);
  useEffect(() => {
    // console.log(values, formData);
    setFormData(values);
  }, [values]);

  useEffect(() => console.log(formData), [formData]);

  const taxChargeData = [
    "issuanceChargesAndTaxes",
    "redemptionChargesAndTaxes",
  ];

  const taxChargeDataOptions = [
    {
      header: "Issuance",
      key: "issuanceChargesAndTaxes",
      disabled: false,
    },
    {
      header: "Redemption",
      key: "redemptionChargesAndTaxes",
      disabled: false,
    },
  ];
  useEffect(() => {
    taxChargeData.forEach((chargeKey) => {
      setValue(chargeKey, formData[chargeKey]);
    });
  }, [setValue, formData]);

  return (
    <Fragment>
      <form
        id="liquiditysetup"
        data-testid="submit-button"
        className="grid gap-y-8"
        onSubmit={onProceed}
      >
        {taxChargeDataOptions.map((item, index) => (
          <ChargesAndTaxes
            charges={charges}
            chargesLoading={chargesLoading}
            taxes={taxes}
            taxesLoading={taxesLoading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            values={values}
            setValues={setValues}
            tab={item.key}
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
