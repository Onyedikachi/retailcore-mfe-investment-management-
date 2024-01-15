import {
  CustomerInformation,
  FacilityDetails,
  TransactionSettings,
} from "@app/components/pages/management/book-investment";
import { Fragment } from "react";

export default ({
  step,
  handleNav,
  formData,
  setFormData,
  setDisabled,
  isSavingDraft,
  setProductDetail,setCalcDetail
}) => {
  return (
    <Fragment>
      {/* {<span>{step}</span>  } */}
      {step === 1 && (
        <span>
          <CustomerInformation
            proceed={handleNav}
            formData={formData}
            setFormData={setFormData}
            setDisabled={setDisabled}
            isSavingDraft={isSavingDraft}
          />
        </span>
      )}
      {step === 2 && (
        <span>
          <FacilityDetails
            proceed={handleNav}
            formData={formData}
            setFormData={setFormData}
            setDisabled={setDisabled}
            isSavingDraft={isSavingDraft}
            setProductDetail={setProductDetail}
            setCalcDetail={setCalcDetail}
          />
        </span>
      )}
      {step === 3 && (
        <span>
          <TransactionSettings
            proceed={handleNav}
            formData={formData}
            setFormData={setFormData}
            setDisabled={setDisabled}
            isSavingDraft={isSavingDraft}
          />
        </span>
      )}
    </Fragment>
  );
};
