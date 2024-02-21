import { Icon } from "@iconify/react";
import AddedChargeList from "./AddedChargeList";
import AddedTaxesList from "./AddedTaxesList";
import ChargesSelector from "./ChargesSelector";
import { Fragment, useEffect, useRef, useState } from "react";
import SelectTaxes from "./SelectTaxes";
import ChargeModal from "../../ChargeModal";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import {
  useCreateProductMutation,
  useModifyProductMutation,
  useModifyRequestMutation,
} from "@app/api";
import { handleDraft } from "@app/pages/investment/term-deposit/create-term-deposit/handleDraft";
import { Messages } from "@app/constants/enums";
import { Loader } from "@app/components";
import { Failed } from "@app/components/modals";
import TaxModal from "../../TaxModal";

export function handleRedirect(type, navigate) {
  if (type === "tax") {
    navigate("/configuration/tax-management/create-tax/1");
  }
  if (type === "charge") {
    navigate("/configuration/charges-management/create-charge/1");
  }
}

export function handlePageSave(
  value,
  type,
  productData,
  process,
  id,
  modifyRequest,
  setIsConfirmOpen,
  modifyProduct,
  createProduct
) {
  type.current = value;
  handleDraft({
    productData,
    process,
    id,
    modifyRequest,
    setIsConfirmOpen,
    modifyProduct,
    createProduct,
  });
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
}: any) => {
  console.log("🚀 ~ productData:", productData);
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

  const [createProduct, { isLoading, isSuccess, isError, error }] =
    useCreateProductMutation();

  const [
    modifyProduct,
    {
      isLoading: modifyLoading,
      isSuccess: modifySuccess,
      isError: modifyIsError,
      error: modifyError,
    },
  ] = useModifyProductMutation();

  const [
    modifyRequest,
    {
      isLoading: modifyRequestLoading,
      isSuccess: modifyRequestSuccess,
      isError: modifyRequestIsError,
      error: modifyRequestError,
    },
  ] = useModifyRequestMutation();

  useEffect(() => {
    if (isSuccess || modifySuccess || modifyRequestSuccess) {
      handleRedirect(type, navigate);
    }
    if (isError || modifyIsError || modifyRequestIsError) {
      setFailedText(Messages.PRODUCT_DRAFT_FAILED);
      setFailedSubtext(
        error?.message?.message ||
          modifyError?.message?.message ||
          modifyRequestError?.message?.message ||
          error?.message?.Message ||
          modifyError?.message?.Message ||
          modifyRequestError?.message?.Message
      );
      setFailed(true);
    }
  }, [
    isSuccess,
    isError,
    error,
    modifyIsError,
    modifySuccess,
    modifyError,
    modifyRequestSuccess,
    modifyRequestIsError,
  ]);
  function handleTab() {
    if (activeTab === tab) {
      setActiveTab(null);
      return;
    }
    setActiveTab(tab);
  }
  return (
    <div>
      <div
        style={{
          boxShadow:
            "0px 0px 1px 0px rgba(26, 32, 36, 0.32), 0px 1px 2px 0px rgba(91, 104, 113, 0.32)",
        }}
        className="bg-[#fff] border border-[#E6E9ED] rounded-[6px]"
      >
        <div
          onClick={() => handleTab()}
          className="border-b border-[#E6E9ED] flex justify-between items-center px-6 py-[14px]"
        >
          <span className="text-[18px] flex  gap-[1px] text-[#636363] font-semibold flex-row items-center">
            <Icon
              icon="ph:caret-right-fill"
              className={`text-danger-500 text-sm mr-4 ${
                activeTab === tab && "rotate-90"
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
                      addedOptions={
                        values?.[`${event}ChargesAndTaxes`]?.applicableCharges
                      }
                      setFormData={setFormData}
                      values={values}
                      event={event}
                      type={"charges"}
                      availableOptions={charges}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 underline"
                      onClick={() =>
                        handlePageSave(
                          "charge",
                          type,
                          productData,
                          process,
                          id,
                          modifyRequest,
                          setIsConfirmOpen,
                          modifyProduct,
                          createProduct
                        )
                      }
                    >
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
            <div className="relative bg-[#fff] w-full">
              <div className="flex flex-row w-full items-start">
                <span className="w-[300px] relative">Applicable tax(es)</span>
                <div className="w-full flex flex-col">
                  <div className="flex flex-row">
                    <SelectTaxes
                      availableOptions={taxes}
                      addedOptions={values?.[`${event}ChargesAndTaxes`]?.applicableTaxes}
                      setFormData={setFormData}
                      values={values}
                      event={event}
                      type={"taxes"}
                      disabled={disabled}
                    />
                    <span
                      className="ml-12 text-danger-500 underline"
                      onClick={() =>
                        handlePageSave(
                          "tax",
                          type,
                          productData,
                          process,
                          id,
                          modifyRequest,
                          setIsConfirmOpen,
                          modifyProduct,
                          createProduct
                        )
                      }
                    >
                      Create new tax
                    </span>
                  </div>
                  {values?.[`${event}ChargesAndTaxes`].applicableTaxes.length > 0 && (
                      <AddedTaxesList
                        taxes = {taxes}
                        selectedTaxes={values?.[`${event}ChargesAndTaxes`].applicableTaxes}
                        values={values}
                        setFormData={setFormData}
                        event={event}
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
        closeModal={() => setSearchParams({charge: null})}
      />
      <TaxModal
        id={searchParams.get("tax")}
        closeModal={() => setSearchParams({tax: null})}
      />
      <Loader
        isOpen={isLoading || modifyLoading || modifyRequestLoading}
        text={"Saving"}
      />
      {isFailed && (
        <Failed
          text={failedText}
          subtext={failedSubText}
          isOpen={isFailed}
          setIsOpen={setFailed}
          canRetry
        />
      )}
    </div>
  );
};
