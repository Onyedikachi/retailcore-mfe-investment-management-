import { Icon } from "@iconify/react";
import AddedChargeList from "./AddedChargeList";
import AddedTaxesList from "./AddedTaxesList";
import { Fragment, useEffect, useRef, useState } from "react";
import ChargeModal from "../../ChargeModal";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import TaxModal from "../../TaxModal";
import ChargeAndTaxMultiselect from "./ChargeAndTaxMultiselect";

export function handleRedirect(type) {
  if (type === "tax") {
    window.location.href = `${window.location.origin}/configuration/tax-management/create-tax/1`;
  }
  if (type === "charge") {
    window.location.href = `${window.location.origin}/configuration/charges-management/create-charge/1`;
  }
}

export const closeModal = ({ type, setSearchParams }) =>
  setSearchParams((prevParams: URLSearchParams) => {
    const updatedParams = new URLSearchParams(prevParams);
    updatedParams.set(type, "");
    return updatedParams;
  })

export default ({
  setActiveTab,
  activeTab,
  tab,
  values,
  event,
  setValues,
  header,
  charges,
  chargesLoading,
  taxes,
  taxesLoading,
  productData,
  disabled,
  placeholder,
  setValue,
}: any) => {
  const navigate = useNavigate();
  const [activeChargeId, setActiveChargeId] = useState(null);
  const { process } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = useRef("");

  function handleTab() {
    if (activeTab.includes(tab)) {
      setActiveTab(activeTab.filter((i) => i !== tab));
      return;
    }
    setActiveTab([...activeTab, tab]);
  }

  return (
    <div>
      <div className="bg-[#fff] border border-[#EEEEEE] rounded-[6px]">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={() => handleTab()}
          className=" flex justify-between items-center px-6 py-[14px]"
        >
          <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
            <Icon
              icon="ph:caret-right-fill"
              className={`text-danger-500 text-sm mr-4 ${
                activeTab.includes(tab) && "rotate-90"
              }`}
            />
            {header} Charges & Taxes
          </span>
        </div>
        {activeTab.includes(tab) && (
          <div className="flex flex-col gap-4 px-[30px] py-5 border-t border-[#EEEEEE]">
            {/* Charges */}
            <div className="relative bg-[#fff] w-full">
              <div className="flex flex-row w-full items-start">
                <span className="w-[300px] relative">Applicable Charge(s)</span>
                <div className="w-full flex flex-col">
                  <div className="flex flex-row">
                    <ChargeAndTaxMultiselect
                      addedOptions={values?.[event]?.applicableCharges}
                      setValues={setValues}
                      values={values}
                      event={event}
                      type={"charges"}
                      availableOptions={charges}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 hover:underline"
                      onClick={() => handleRedirect("charge")}
                      onKeyDown={() => {}}
                    >
                      Create new charge
                    </span>
                  </div>
                  {values[event]?.applicableCharges?.length > 0 && (
                    <AddedChargeList
                      charges={charges}
                      selectedCharges={values[event]?.applicableCharges}
                      values={values}
                      setValues={setValues}
                      event={event}
                      setValue={setValue}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Taxes */}
            <div className="relative bg-[#fff] w-full">
              <div className="flex flex-row w-full items-start">
                <span className="w-[300px] relative">Applicable tax(es)</span>
                <div className="w-full flex flex-col">
                  <div className="flex flex-row">
                    <ChargeAndTaxMultiselect
                      addedOptions={values?.[event]?.applicableTaxes}
                      setValues={setValues}
                      values={values}
                      event={event}
                      type={"taxes"}
                      availableOptions={taxes}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 hover:underline"
                      onClick={() => handleRedirect("tax")}
                      onKeyDown={() => {}}
                    >
                      Create new tax
                    </span>
                  </div>
                  {values[event]?.applicableTaxes?.length > 0 && (
                    <AddedTaxesList
                      taxes={taxes}
                      selectedTaxes={values[event]?.applicableTaxes}
                      values={values}
                      setValues={setValues}
                      event={event}
                      setValue={setValue}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChargeModal
        id={searchParams.get("charge")}
        closeModal={() => closeModal({ type: "charge", setSearchParams })}
      />
      <TaxModal
        id={searchParams.get("tax")}
        closeModal={() => closeModal({ type: "tax", setSearchParams })}
      />
    </div>
  );
};
