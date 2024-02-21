import { Icon } from "@iconify/react";
import AddedChargeList from "./AddedChargeList";
import AddedTaxesList from "./AddedTaxesList";
import ChargesSelector from "./ChargesSelector";
import { Fragment, useEffect, useRef, useState } from "react";
import SelectTaxes from "./SelectTaxes";
import ChargeModal from "../../ChargeModal";
import { useSearchParams, useNavigate } from "react-router-dom";

export function handleRedirect(type) {
  if (type === "tax") {
    window.location.href = "/configuration/tax-management/create-tax/1";
  }
  if (type === "charge") {
    window.location.href = "/configuration/charges-management/create-charge/1";
  }
}

export function handlePageSave(value, type) {
  type.current = value
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
  taxesLoading
}) => {
  const [activeChargeId, setActiveChargeId] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
  const type = useRef("")

  return (
    <Fragment>

      <div className="mb-6">
        <div
          style={{
            boxShadow:
              "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
          }}
          className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
        >
          <div
            onClick={() => setActiveTab(tab)}
            className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]"
          >
            <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
              <Icon
                icon="ph:caret-right-fill"
                className={`text-danger-500 text-sm mr-4 ${activeTab === tab && "rotate-90"
                  }`}
              />
              {header} Charges & Taxes
            </span>
          </div>
          {activeTab === tab && (
            <div className="flex flex-col gap-4 px-[30px] py-5">
              {/* Charges */}
              <div className="relative bg-[#fff] w-full">
                <div className="flex flex-row w-full items-start">
                  <span className="w-[300px] relative">Applicable Charge(s)</span>
                  <div className="w-full flex flex-col">
                    <div className="flex flex-row">
                      <ChargesSelector
                        addedOptions={values?.[`${event}ChargesAndTaxes`]?.applicableCharges}
                        setFormData={setFormData}
                        values={values}
                        event={event}
                        type={"charges"}
                        availableOptions={charges}
                      />
                      <span className="ml-12 text-danger-500 underline" onClick={() => handlePageSave("charge", type)}>
                        Create new charge
                      </span>
                    </div>
                    {values?.[`${event}ChargesAndTaxes`].applicableCharges.length > 0 && (
                      <AddedChargeList
                        charges={charges}
                        selectedCharges={values?.[`${event}ChargesAndTaxes`]?.applicableCharges}
                        values={values}
                        setFormData={setFormData}
                        event={event}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Taxes */}
              {/* <div className="relative bg-[#fff] w-full">
                <div className="flex flex-row w-full items-start">
                  <span className="w-[300px] relative">Applicable tax(es)</span>
                  <div className="w-full flex flex-col">
                    <div className="flex flex-row">
                      <SelectTaxes
                        availableOptions={taxes}
                        addedOptions={values?.events[event].taxes}
                        setFormData={setFormData}
                        values={values}
                        event={event}
                        type={"taxes"}
                      />
                      <span className="ml-12 text-danger-500 underline" onClick={() => handlePageSave("tax", type)}>
                        Create new tax
                      </span>
                    </div>
                    {values?.events[event].taxes.length > 0 && (
                      <AddedTaxesList
                        selectedTaxes={values?.events[event].taxes}
                        values={values}
                        setFormData={setFormData}
                        event={event}
                      />
                    )}
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
      <ChargeModal id={searchParams.get("charge")}  closeModal={() => navigate(-1)}/>
    </Fragment>
  );
};
