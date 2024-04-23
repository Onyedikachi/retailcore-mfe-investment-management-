import {
  BorderlessSelect,
  FormDate,
  GlInput,
  RedDot,
} from "@app/components/forms";
import { InputDivs } from "@app/components/forms/SideLabelSearchSelect";
import { InputDiv } from "@app/components/pages/term-deposit/forms/product-information";
import { AppContext } from "@app/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AccountSelectInput from "./AccountSelectInput";
import { useGetAccountsQuery, useGetGlClassQuery } from "@app/api";

export const onProceed = (
  data,
  proceed,
  formData,
  setFormData,
  preModifyRequest
) => {
  preModifyRequest({
    ...formData,
    ...formData.facilityDetailsModel,
    accountingEntries: { ...formData.accountingEntries, ...data },
    ...formData.accountingEntries,
    ...data,
    isDraft: true,
    investmentType: "security-purchase",
  });
  
  setFormData({
    ...formData,
    ...formData.facilityDetailsModel,
    accountingEntries: { ...formData.accountingEntries, ...data },
    ...data,
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
  console.log("🚀 ~ formData:", formData);
  const {
    register,
    watch,
    clearErrors,
    setValue,
    setError,
    getValues,
    trigger,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: formData.accountingEntries,
    mode: "all",
  });

  const { glClass } = useGetGlClassQuery();

  const [entries, setEntries] = useState(formData?.accountingEntries);
  const [entriesData, setEntriesData] = useState(null);

  useEffect(() => {
    setDisabled(true);
  }, []);

  useEffect(() => {
    setDisabled(!(entries?.creditLedger && entries?.debitLedger));
  }, [entriesData]);

  const handleEntry = (key, value) => {
    const newVal = { ...entries };
    newVal[key] = value?.accountNo;
    setEntries(newVal);
    setEntriesData({ ...entriesData, ...{ [key]: value } });
  };

  useEffect(() => {
    setFormData({
      ...formData,
      accountingEntries: entries,
    });
  }, [isSavingDraft]);

  useEffect(() => {
    reset(entries);
  }, [entries]);

  return (
    <form
      id="accountingEntries"
      data-testid="submit-button"
      onSubmit={() =>
        onProceed(entries, proceed, formData, setFormData, preModifyRequest)
      }
    >
      <div
        data-testid="accounting-entries"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="mb-6 flex flex-row gap-[15px]">
          <div className="flex itemx-center gap-2 w-[300px]">
            {" "}
            <label
              htmlFor="debitLedger"
              className=" pt-[10px] min-w-[250px] flex text-base font-semibold text-[#636363]"
            >
              Debit Ledger{" "}
              <span className="flex">
                {" "}
                <RedDot />
              </span>
            </label>
          </div>
          <AccountSelectInput
            handleEntry={handleEntry}
            entryValue={entries?.debitLedger}
            inputName="debitLedger"
            placeholder="Search by account number"
            entryData={entriesData?.debitLedger}
            impact={"debit_impact_on_balance"}
            currencyCode={formData?.facilityDetailsModel?.currencyCode}
          />
        </div>
      </div>
      <div
        data-testid="accounting-entries"
        className="flex flex-col gap-4 px-[30px] py-5"
      >
        <div className="mb-6 flex flex-row gap-[15px]">
          <div className="flex itemx-center gap-2 w-[300px]">
            {" "}
            <label
              htmlFor="creditLedger"
              className=" pt-[10px] min-w-[250px] flex text-base font-semibold text-[#636363]"
            >
              Credit Ledger{" "}
              <span className="flex">
                {" "}
                <RedDot />
              </span>
            </label>
          </div>

          <AccountSelectInput
            handleEntry={handleEntry}
            entryValue={entries?.creditLedger}
            inputName="creditLedger"
            placeholder="Search by account number"
            entryData={entriesData?.creditLedger}
            impact={"credit_impact_on_balance"}
            currencyCode={formData?.facilityDetailsModel?.currencyCode}
          />
        </div>
      </div>
    </form>
  );
};
