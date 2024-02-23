import { Icon } from "@iconify/react";
import AddedChargeList from "./AddedChargeList";
import AddedTaxesList from "./AddedTaxesList";
import { Fragment, useEffect, useRef, useState } from "react";
import ChargeModal from "../../ChargeModal";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Messages } from "@app/constants/enums";
import { Loader } from "@app/components";
import { Failed } from "@app/components/modals";
import TaxModal from "../../TaxModal";
import ChargeAndTaxMultiselect from "./ChargeAndTaxMultiselect";

export function handleRedirect(type, navigate) {
  if (type === "tax") {
    navigate("/configuration/tax-management/create-tax/1");
  }
  if (type === "charge") {
    navigate("/configuration/charges-management/create-charge/1");
  }
}

export default ({
  setActiveTab,
  activeTab,
  tab,
  values,
  event,
  setFormData,
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
  console.log("🚀 ~ values:", values);

  const navigate = useNavigate();
  const [activeChargeId, setActiveChargeId] = useState(null);
  const { process } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const type = useRef("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [failedSubText, setFailedSubtext] = useState("");
  const [failedText, setFailedText] = useState("");

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
          onClick={() => handleTab()}
          className=" flex justify-between items-center px-6 py-[14px]"
        >
          <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
            <Icon
              icon="ph:caret-right-fill"
              className={`text-danger-500 text-sm mr-4 ${activeTab.includes(tab) && "rotate-90"
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
                      addedOptions={
                        values?.[event]?.applicableTaxes
                      }
                      setFormData={setFormData}
                      values={values}
                      event={event}
                      type={"taxes"}
                      availableOptions={taxes}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 underline"
                      onClick={() => handleRedirect("charge", navigate)}
                    >
                      Create new charge
                    </span>
                  </div>
                  {values[event]?.applicableCharges.length > 0 && (
                    <AddedChargeList
                      charges={charges}
                      selectedCharges={values[event]?.applicableCharges}
                      values={values}
                      setFormData={setFormData}
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
                      addedOptions={
                        values?.[event]?.applicableTaxes
                      }
                      setFormData={setFormData}
                      values={values}
                      event={event}
                      type={"taxes"}
                      availableOptions={taxes}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 underline"
                      onClick={() => handleRedirect("tax", navigate)}
                    >
                      Create new tax
                    </span>
                  </div>
                  {values[event]?.applicableTaxes.length > 0 && (
                    <AddedTaxesList
                      taxes={taxes}
                      selectedTaxes={values[event]?.applicableTaxes}
                      values={values}
                      setFormData={setFormData}
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
        closeModal={() => setSearchParams({ charge: null })}
      />
      <TaxModal
        id={searchParams.get("tax")}
        closeModal={() => setSearchParams({ tax: null })}
      />
    </div>
  );
};
