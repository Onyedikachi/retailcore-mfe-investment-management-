import React, { useEffect, useState } from "react";
import { GlInput } from "@app/components/forms";
import { RedDot } from "@app/components/forms";
import { glMappingSchema } from "@app/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const handleClear = (setClearField, clearFields, setMapOptions, reset) => {
  setClearField(!clearFields);
  setMapOptions([]);
  reset();
  setClearField(!clearFields);
};
export function InputDivs({ children, label }) {
  return (
    <div className="flex gap-[10px] items-center">
      <span
        data-testid="input-div"
        className="min-w-[250px] flex items-start gap-x-[1px] text-[##636363] text-base font-medium"
      >
        {label} <RedDot />
      </span>
      <div>{children}</div>
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

export function onProceed(proceed) {
  // setFormData({ data: d, mapOptions });
  proceed();
}
export default function AccountingEntriesAndEvents({
  proceed,
  formData,
  setFormData,
  setDisabled,
  initiateDraft,
}) {
  const [mapOptions, setMapOptions] = useState([]);
  const [clearFields, setClearField] = useState(false);

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
    resolver: yupResolver(glMappingSchema),
    defaultValues: {
      TermDepositLiabilityAccount: "",
      InterestAccrualAccount: "",
      InterestExpenseAccount: "",
    },
    mode: "all",
    // values,
  });

  const GlMappingOptions = [
    {
      id: 0,
      text: "Term Deposit Liability account",
      key: "TermDepositLiabilityAccount",
    },
    {
      id: 1,
      text: "Interest accural account",
      key: "InterestAccrualAccount",
    },
    {
      id: 2,
      text: "Interest expense account",
      key: "InterestExpenseAccount",
    },
  ];

  const values = getValues();

  useEffect(() => {
    setFormData({ data: formData, mapOptions });
  }, [mapOptions, initiateDraft]);

  useEffect(() => {
    if (mapOptions.length === 3) {
      setDisabled(false);
    }
  }, [values, mapOptions]);

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
  }, [setValue, formData]);
  return (
    <form
      id="entriesandevents"
      data-testid="entriesandevents"
      onSubmit={() => onProceed(proceed)}
    >
      <div>
        <div
          style={{
            boxShadow:
              "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
          }}
          className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
        >
          <div className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]">
            <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold">
              Product to GL Mapping <RedDot />
            </span>
            <span
              className="font-normal text-sm text-danger-500 italic underline"
              onClick={() =>
                handleClear(setClearField, clearFields, setMapOptions, reset)
              }
            >
              Clear all entries
            </span>
          </div>

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
                            mapOptions.find((i) => i?.glAccountType === type.id)
                              ?.accountName
                          }
                          register={register}
                          trigger={trigger}
                          errors={errors}
                          clearFields={clearFields}
                        />
                      </div>
                    </div>
                  </div>
                </InputDivs>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

