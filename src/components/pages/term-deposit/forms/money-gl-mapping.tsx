import { Checkbox, RedDot } from "@app/components/forms";
import { GlInput } from "@app/components/forms";
import { glMappingSchema, MoneyMarketGlType } from "@app/constants";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { Fragment, useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import {
  useGetApplicableChargesQuery,
  useGetApplicableTaxesQuery,
} from "@app/api";
import LedgerSelect from "@app/components/forms/LedgerSelect";
import { IoMdAddCircle } from "react-icons/io";

const GlMappingOptions = [
  {
    id: 0,
    text: "Term Deposit Liability Ledger",
    key: "TermDepositLiabilityLedger",
    sub: "",
  },
  {
    id: 1,
    text: "Interest accural ledger",
    key: "InterestAccrualLedger",
    sub: "",
  },
  {
    id: 2,
    text: "Interest expense ledger",
    key: "InterestExpenseLedger",
    sub: "",
  },
  {
    id: 3,
    text: "Prepaid asset ledger",
    key: "PrepaidAssetLedger",
    sub: "Applies when the interest is immediately paid upon booking",
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

export const handleClick = (
  key,
  submenu,
  setValue,
  mapOptions,
  setMapOptions,
  GlMappingOptions
) => {
  const data = {
    accountName: submenu.accountName,
    accountId: submenu?.accountNo,
    glAccountType: GlMappingOptions.find((i) => i.key === key)?.id,
  };

  setValue(key, submenu?.name);

  if (!mapOptions.some((i) => i.glAccountType === data.glAccountType)) {
    setMapOptions([...mapOptions, data]);
  } else {
    setMapOptions((prevMapOptions) =>
      prevMapOptions.map((i) =>
        i.glAccountType === data.glAccountType
          ? {
              ...i,
              accountName: submenu.accountName,
              accountId: data.accountId,
            }
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
  const [activeTab, setActiveTab] = useState<any>([0]);
  const [filteredTabs, setFilteredTabs] = useState([]);
  const [nerrors, setNerrors] = useState(null);
  function onProceed(formFields) {
    setFormData(formFields);
    proceed();
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
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
  const values = getValues();
  useEffect(() => {
    setDisabled(false);
  }, []);

  function handleTab(index) {
    if (activeTab.includes(index)) {
      setActiveTab(activeTab.filter((i) => i !== index));
      return;
    }
    setActiveTab([...activeTab, index]);
  }

  const [formFields, setFormFields] = useState<any>([
    {
      label: "Issue to customers",
      moneyMarketGlType: 0,
      ledgerEntryMappings: [
        {
          ledgerEntries: null,
          errors: null,
        },
      ],
    },
    {
      label: "Upfront interest payment",
      moneyMarketGlType: 1,
      ledgerEntryMappings: [
        {
          ledgerEntries: null,
          errors: null,
        },
      ],
    },
    {
      label: "Redemption at maturity",
      moneyMarketGlType: 2,
      ledgerEntryMappings: [
        {
          ledgerEntries: null,
          errors: null,
        },
      ],
    },
  ]);

  function addField(index) {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].ledgerEntryMappings.push({
      ledgerEntries: null,
      errors: null,
    });

    setFormFields(updatedFormFields);
  }

  function removeField(itemIndex, fieldIndex) {
    const updatedFormFields = [...formFields];
    updatedFormFields[itemIndex].ledgerEntryMappings.splice(fieldIndex, 1);
    setFormFields(updatedFormFields);
  }

  function handleValue(field, ledgers, itemIndex, fieldIndex) {
    const updatedFormFields = [...formFields];
    const targetField =
      updatedFormFields[itemIndex]?.ledgerEntryMappings?.[fieldIndex];
    if (targetField) {
      // Update the data property
      targetField.ledgerEntries = [...ledgers];

      // Update the state with the modified formFields
      setFormFields(updatedFormFields);
    } else {
      console.error("Field does not exist at the specified indices");
    }
  }
  useEffect(() => {

    // Update error messages whenever formFields changes
    updateErrors();
  }, [formFields]);

  function updateErrors() {
    formFields.forEach((item: any) => {
      if (item?.ledgerEntryMappings?.length) {
        item?.ledgerEntryMappings.forEach((data) => {
          if (data?.ledgerEntries?.length) {
            const checkValue = data?.ledgerEntries.some((i) => !i.ledgerCode);
            setDisabled(checkValue);
          } else {
            setDisabled(true);
          }
        });
      } else {
        setDisabled(true);
      }
    });

    // setFormFields(updatedFormFields);
  }

  return (
    <Fragment>
      <form
        id="pricingconfig"
        data-testid="submit-button"
        className="grid gap-y-8"
        onSubmit={handleSubmit(() => onProceed(formFields))}
      >
        <div className="grid gap-y-10">
          {formFields.map((tab, index) => (
            <div
              key={`index-${index.toString()}`}
              className="bg-[#fff] border border-[#EEEEEE] rounded-[6px]"
            >
              <div className="border-b border-[#EEEEEE] flex justify-between items-center px-6 py-[14px]">
                <span
                  onKeyDown={() => {}}
                  onClick={() => handleTab(index)}
                  className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center"
                >
                  <Icon
                    icon="ph:caret-right-fill"
                    className={`text-danger-500 text-sm mr-4 ${
                      activeTab.includes(index) && "rotate-90"
                    }`}
                  />
                   {MoneyMarketGlType[tab?.moneyMarketGlType]} <RedDot />
                </span>
              </div>
              {activeTab.includes(index) && (
                <div className="flex flex-col gap-4 px-[30px] py-5">
                  <div className="flex flex-col items-start gap-y-5 w-full">
                    {tab?.ledgerEntryMappings.map((field, idx) => (
                      <div key={`index+${idx}`} className="w-full">
                        <LedgerSelect
                          formData={formData}
                          register={register}
                          trigger={trigger}
                          errors={nerrors}
                          handleValue={(ledgers) =>
                            handleValue(field, ledgers, index, idx)
                          }
                          removeField={
                            tab?.ledgerEntryMappings.length === 1
                              ? null
                              : () => removeField(index, idx)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      className="flex items-center gap-4 cursor-pointer text-[##636363] ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => addField(index)}
                    >
                      <span className="text-[20px]">
                        {" "}
                        <IoMdAddCircle />
                      </span>{" "}
                      <span>Add slab</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </Fragment>
  );
};
