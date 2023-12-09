import React, { useEffect, useState } from "react";
import { GlInput } from "@app/components/forms";
import { RedDot } from "@app/components/forms";
import { glMappingSchema } from "@app/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export function InputDivs({ children, label }) {
  return (
    <div className="flex gap-[10px] items-center">
      <span className="min-w-[250px] flex items-start gap-x-[1px] text-[##636363] text-base font-medium">
        {label} <RedDot />
      </span>
      <div>{children}</div>
    </div>
  );
}

export default function AccountingEntriesAndEvents({
  proceed,
  formData,
  setFormData,
  setDisabled,
}) {
  console.log(
    "🚀 ~ file: accounting-entries-and-events.tsx:25 ~ formData:",
    formData
  );
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
  // glMappingSchema
  const handleClick = (key, menu, name, subname) => {
    const data = {
      accountName: subname,
      accountId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      glAccountType: GlMappingOptions.find((i) => i.key === key)?.id,
    };

    setValue(key, subname);

    if (!mapOptions.some((i) => i.glAccountType === data.glAccountType)) {
      setMapOptions([...mapOptions, data]);
    } else {
      setMapOptions((prevMapOptions) =>
        prevMapOptions.map((i) =>
          i.glAccountType === data.glAccountType
            ? { ...i, accountName: subname, accountId: data.accountId }
            : i
        )
      );
    }
  };

  const values = getValues();

  function onProceed(d: any) {
    setFormData({ data: d, mapOptions });
    proceed();
  }

  useEffect(() => {
    // setDisabled(!isValid);
    if (mapOptions.length === 3) {
      setDisabled(false);
    }
  }, [values, mapOptions]);

  // useEffect(() => {
  //   trigger();
  // }, []);

  const handleClear = () => {
    setClearField(!clearFields);
    setMapOptions([]);
    reset();
    setClearField(!clearFields);
  };
  useEffect(() => {
    if (formData) {
    console.log("🚀 ~ file: accounting-entries-and-events.tsx:119 ~ useEffect ~ formData:", formData)
    setValue("TermDepositLiabilityAccount", formData.TermDepositLiabilityAccount)
    setValue("InterestExpenseAccount", formData.InterestExpenseAccount)
    setValue("InterestExpenseAccount", formData.InterestExpenseAccount)
    }
  }, [setValue, formData]);
  return (
    <form id="entriesandevents" onSubmit={handleSubmit(onProceed)}>
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
              onClick={handleClear}
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
                          handleClick={handleClick}
                          inputName={type.key}
                          defaultValue={formData[type.key]}
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
